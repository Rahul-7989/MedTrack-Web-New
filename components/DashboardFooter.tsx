import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

interface DashboardFooterProps {
  userName: string;
}

export const DashboardFooter: React.FC<DashboardFooterProps> = ({ userName }) => {
  const [dailyLine, setDailyLine] = useState("One small tablet. One big habit.");
  const [isLoadingLine, setIsLoadingLine] = useState(false);

  useEffect(() => {
    const fetchDailyLine = async () => {
      const today = new Date().toDateString();
      const cached = localStorage.getItem('medtrack_daily_line');
      const cachedDate = localStorage.getItem('medtrack_daily_date');

      if (cached && cachedDate === today) {
        setDailyLine(cached);
        return;
      }

      setIsLoadingLine(true);
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: "Generate a single, short, gentle, medication-related care line. Tone: Friendly, human, no guilt, no jokes about illness. Max 12 words. Examples: 'Your future self just smiled.', 'Care is a habit, not a hassle.', 'Small tablets. Big commitment.'",
          config: { 
            systemInstruction: "You are the warm, human voice of MedTrack. You provide gentle, lighthearted encouragement for family health routines.",
            temperature: 0.9 
          }
        });
        const newLine = response.text?.trim() || "Care is a routine, not a reminder.";
        setDailyLine(newLine);
        localStorage.setItem('medtrack_daily_line', newLine);
        localStorage.setItem('medtrack_daily_date', today);
      } catch (e) {
        console.error("Failed to generate care line", e);
      } finally {
        setIsLoadingLine(false);
      }
    };

    fetchDailyLine();
  }, []);

  return (
    <footer className="w-full bg-[#EFEAE3] mt-auto pt-10 pb-8 px-6 md:px-12 rounded-t-[3.5rem] shadow-[0_-10px_30px_-15px_rgba(46,42,74,0.05)] border-t border-[#2E2A4A]/5 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* 1️⃣ LEFT ZONE: DAILY CARE LINE */}
        <div className="flex-1 flex justify-center md:justify-start order-2 md:order-1">
          <div className="bg-white/60 backdrop-blur-md p-1.5 pr-5 rounded-full flex items-center gap-3 shadow-sm border border-white hover-lift transition-all duration-500 cursor-default">
            {/* Quote Icon Capsule */}
            <div className="bg-[#E5A23C]/10 p-2.5 rounded-full text-[#E5A23C] shrink-0">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21L14.017 18C14.017 16.8954 13.1216 16 12.017 16H8.01703V14H12.017C14.2262 14 16.017 15.7909 16.017 18V21H14.017ZM10.017 21V18C10.017 16.8954 9.1216 16 8.01703 16H4.01703V14H8.01703C10.2262 14 12.017 15.7909 12.017 18V21H10.017ZM12.017 12C9.80789 12 8.01703 10.2091 8.01703 8C8.01703 5.79086 9.80789 4 12.017 4C14.2262 4 16.017 5.79086 16.017 8C16.017 10.2091 14.2262 12 12.017 12Z" />
              </svg>
            </div>
            
            <p className="text-sm font-bold text-[#2E2A4A] tracking-tight leading-relaxed">
              {isLoadingLine ? "Gathering a nice thought..." : dailyLine}
            </p>
          </div>
        </div>

        {/* 2️⃣ CENTER ZONE: QUICK LINKS */}
        <div className="flex items-center gap-10 justify-center order-1 md:order-2">
          <button className="text-[10px] font-black text-[#6A6875] uppercase tracking-[0.25em] hover:text-[#4FA3B1] transition-all hover:underline underline-offset-8">Support</button>
          <button className="text-[10px] font-black text-[#6A6875] uppercase tracking-[0.25em] hover:text-[#4FA3B1] transition-all hover:underline underline-offset-8">Privacy</button>
          <button className="text-[10px] font-black text-[#6A6875] uppercase tracking-[0.25em] hover:text-[#4FA3B1] transition-all hover:underline underline-offset-8">Terms</button>
        </div>

        {/* 3️⃣ RIGHT ZONE: APP INFO & STATUS */}
        <div className="flex-1 flex flex-col items-center md:items-end gap-1.5 order-3">
          <div className="flex items-center gap-3">
            <span className="text-xs font-black text-[#2E2A4A] tracking-tighter uppercase opacity-80">MedTrack</span>
            <div className="w-1 h-1 rounded-full bg-[#6A6875]/20" />
            <span className="text-[9px] font-bold text-[#6A6875]/40 tracking-widest">v1.0</span>
          </div>
          <div className="flex items-center gap-2.5 bg-[#F4F1EC]/60 px-3 py-1 rounded-full border border-white/40 shadow-sm">
            <div className="w-2 h-2 rounded-full bg-[#9DB8AD] animate-pulse shadow-[0_0_8px_rgba(157,184,173,0.5)]" />
            <span className="text-[9px] font-bold text-[#6A6875] uppercase tracking-[0.15em] opacity-60">All systems calm</span>
          </div>
        </div>
      </div>

      {/* Trust Micro-copy */}
      <div className="mt-10 pt-6 border-t border-[#2E2A4A]/5 text-center">
        <p className="text-[9px] font-black text-[#6A6875]/30 uppercase tracking-[0.4em]">
          Your data stays within your family hub. Carefully kept for {userName.split(' ')[0]}.
        </p>
      </div>
    </footer>
  );
};