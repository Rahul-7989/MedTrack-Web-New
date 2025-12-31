
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { UserInfo } from '../App';
import { AvatarRenderer } from './Illustrations';

interface Message {
  role: 'user' | 'bot';
  text: string;
}

interface CareMateProps {
  userInfo: UserInfo;
  medications: any[];
}

const SUGGESTIONS = [
  "What happens if I miss a dose?",
  "Should this be taken after food?",
  "Why is this medicine important?",
  "Is it okay to take it late?"
];

export const CareMate: React.FC<CareMateProps> = ({ userInfo, medications }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ 
        role: 'bot', 
        text: `Hi ${userInfo.name.split(' ')[0]} 👋\nI’m CareMate.\nYou can ask me anything about your medicines — I’ll explain it simply.` 
      }]);
    }
    scrollToBottom();
  }, [isOpen, messages]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', text };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setShowSuggestions(false);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const medsContext = medications.map(m => `- ${m.name}: ${m.dosage} at ${m.time} (Instructions: ${m.remarks || 'None'})`).join('\n');
      
      const systemInstruction = `You are CareMate, a friendly and supportive family medication companion for MedTrack. 
      Your tone is calm, human, and reassuring, not clinical or robotic.
      User Profile: Name: ${userInfo.name}, Age: ${userInfo.age || 'Not set'}, Gender: ${userInfo.gender || 'Not specified'}.
      Current Hub Medications:\n${medsContext}

      RULES:
      1. Use the user's name and medication details to personalize responses.
      2. Explain things in simple, non-overwhelming language.
      3. CRITICAL: Never provide a medical diagnosis.
      4. CRITICAL: Never suggest stopping or changing prescribed medication.
      5. CRITICAL: Never give emergency instructions.
      6. If you are unsure or the question is serious, always gently encourage the user to consult their doctor.
      7. Use "Rahul" logic: "Since this medicine is for you, ${userInfo.name.split(' ')[0]}, it's best taken after food."
      8. Do not use white in your UI descriptions, stick to the MedTrack palette (Cream: #F4F1EC, Sand: #EFEAE3, Teal: #4FA3B1, Amber: #E5A23C).
      9. Keep it brief and respectful.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: text,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const botText = response.text || "I'm sorry, I couldn't quite understand that. Could you try rephrasing?";
      setMessages(prev => [...prev, { role: 'bot', text: botText }]);
    } catch (error) {
      console.error("CareMate Error:", error);
      setMessages(prev => [...prev, { role: 'bot', text: "I'm having a little trouble connecting right now. Please check with your doctor for any urgent medication questions." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-8 right-8 w-16 h-16 rounded-full flex items-center justify-center shadow-2xl z-[100] transition-all duration-300 hover:scale-110 active:scale-95 ${isOpen ? 'bg-[#2E2A4A] text-white' : 'bg-[#4FA3B1] text-white animate-pulse-slow'}`}
        title="Ask CareMate"
      >
        {isOpen ? (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
        ) : (
          <div className="relative">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#E5A23C] rounded-full border-2 border-[#4FA3B1]" />
          </div>
        )}
      </button>

      {/* Chat Panel */}
      <div className={`fixed top-0 right-0 h-full w-full md:w-[400px] bg-[#F4F1EC] shadow-2xl z-[90] transition-transform duration-500 ease-in-out border-l border-[#2E2A4A]/5 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Header */}
        <div className="p-6 bg-[#EFEAE3] flex items-center justify-between border-b border-[#2E2A4A]/5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#4FA3B1]/10 rounded-2xl flex items-center justify-center">
              <AvatarRenderer gender="other" index={0} className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#2E2A4A]">CareMate</h3>
              <p className="text-[10px] font-black text-[#4FA3B1] uppercase tracking-widest">Here to help, gently</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="p-2 text-[#6A6875] hover:text-[#2E2A4A] transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth">
          {showDisclaimer && (
            <div className="bg-[#E5A23C]/5 border border-[#E5A23C]/20 p-4 rounded-3xl relative animate-in fade-in slide-in-from-top-2 duration-500">
              <button onClick={() => setShowDisclaimer(false)} className="absolute top-3 right-3 text-[#E5A23C] opacity-50 hover:opacity-100">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
              <div className="flex gap-3">
                <span className="text-xl">💡</span>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-[#E5A23C] uppercase tracking-[0.2em]">Friendly Reminder</p>
                  <p className="text-xs text-[#6A6875] leading-relaxed">CareMate provides general information, not medical advice. Always consult a doctor for serious concerns.</p>
                </div>
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
              <div className={`max-w-[85%] px-5 py-4 rounded-[2rem] text-sm leading-relaxed shadow-sm ${msg.role === 'user' ? 'bg-[#4FA3B1] text-white rounded-tr-none' : 'bg-[#EFEAE3] text-[#2E2A4A] rounded-tl-none border border-[#2E2A4A]/5'}`}>
                {msg.text.split('\n').map((t, idx) => <p key={idx} className={idx > 0 ? 'mt-2' : ''}>{t}</p>)}
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start animate-pulse">
              <div className="bg-[#EFEAE3] px-6 py-4 rounded-[2rem] rounded-tl-none border border-[#2E2A4A]/5 flex gap-1">
                <div className="w-1.5 h-1.5 bg-[#4FA3B1] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-1.5 h-1.5 bg-[#4FA3B1] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-1.5 h-1.5 bg-[#4FA3B1] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input & Suggestions */}
        <div className="p-6 space-y-4 bg-white/20 backdrop-blur-sm">
          {showSuggestions && (
            <div className="flex flex-wrap gap-2">
              {SUGGESTIONS.map((s, i) => (
                <button 
                  key={i} 
                  onClick={() => handleSendMessage(s)}
                  className="px-4 py-2 bg-white text-[#4FA3B1] border border-[#4FA3B1]/20 rounded-full text-[11px] font-bold hover:bg-[#4FA3B1] hover:text-white transition-all shadow-sm"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
          
          <div className="relative group">
            <input 
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
              placeholder="Ask about your medicine..."
              className="w-full bg-[#EFEAE3] border-2 border-transparent focus:border-[#4FA3B1]/20 rounded-[2rem] pl-6 pr-14 py-5 text-sm text-[#2E2A4A] focus:outline-none focus:bg-white transition-all shadow-inner"
            />
            <button 
              onClick={() => handleSendMessage(inputValue)}
              disabled={!inputValue.trim() || isLoading}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-[#4FA3B1] text-white rounded-2xl hover:bg-[#2E2A4A] transition-colors disabled:opacity-30 disabled:cursor-not-allowed shadow-md"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 12h14M12 5l7 7-7 7" /></svg>
            </button>
          </div>
          <p className="text-[9px] text-center text-[#6A6875] font-bold uppercase tracking-widest opacity-40 pb-2">Powered by CareMate AI</p>
        </div>
      </div>

      <style>{`
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); box-shadow: 0 10px 30px -10px rgba(79, 163, 177, 0.4); }
          50% { transform: scale(1.05); box-shadow: 0 15px 40px -10px rgba(79, 163, 177, 0.6); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s infinite ease-in-out;
        }
      `}</style>
    </>
  );
};
