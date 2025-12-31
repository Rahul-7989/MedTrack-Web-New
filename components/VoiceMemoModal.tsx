import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { MicIcon, VoiceProcessingIllustration, AvatarRenderer, PillIllustration } from './Illustrations';
import { UserInfo } from '../App';
import { auth, db } from '../lib/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

interface VoiceMemoModalProps {
  hubId: string;
  members: (UserInfo & { id: string })[];
  onClose: () => void;
}

type ModalState = 'PERMISSION' | 'RECORDING' | 'PROCESSING' | 'PREVIEW';

export const VoiceMemoModal: React.FC<VoiceMemoModalProps> = ({ hubId, members, onClose }) => {
  const [state, setState] = useState<ModalState>('PERMISSION');
  const [recordingTime, setRecordingTime] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const [extractedData, setExtractedData] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
      if (mediaRecorderRef.current && isRecording) {
        mediaRecorderRef.current.stop();
      }
    };
  }, [isRecording]);

  const requestMicPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      startRecording(stream);
    } catch (err) {
      setErrorMsg("We couldn't access your microphone. Please check your browser settings.");
    }
  };

  const startRecording = (stream: MediaStream) => {
    setState('RECORDING');
    setIsRecording(true);
    setRecordingTime(0);
    audioChunksRef.current = [];

    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunksRef.current.push(event.data);
      }
    };

    mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
      processAudio(audioBlob);
    };

    mediaRecorder.start();
    timerRef.current = window.setInterval(() => {
      setRecordingTime((prev) => prev + 1);
    }, 1000);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsRecording(false);
    setState('PROCESSING');
  };

  const processAudio = async (blob: Blob) => {
    try {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = async () => {
        const base64Audio = (reader.result as string).split(',')[1];
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: [
            {
              inlineData: {
                data: base64Audio,
                mimeType: 'audio/webm',
              },
            },
            {
              text: `Extract medication details from this audio memo.
              Return a JSON object with the following fields:
              - name: string (the medication name)
              - dosage: string (amount, e.g., '1 pill', '10ml')
              - time: string (HH:mm format, e.g., '09:00')
              - remarks: string (extra notes or instructions)
              - assignedToName: string (the name of the person mentioned)
              
              If information is missing, use sensible defaults (e.g., '08:00' for morning).`
            }
          ],
          config: {
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                dosage: { type: Type.STRING },
                time: { type: Type.STRING },
                remarks: { type: Type.STRING },
                assignedToName: { type: Type.STRING }
              },
              required: ['name']
            },
            systemInstruction: "You are an expert medical clerk for MedTrack. Extract precise medication data from spoken memos. If the user mentions a family member name, capture it in assignedToName."
          }
        });

        const data = JSON.parse(response.text || '{}');
        
        // Attempt to match member ID from name
        let matchedMember = members[0]?.id || '';
        if (data.assignedToName) {
          const lowerName = data.assignedToName.toLowerCase();
          const match = members.find(m => m.name.toLowerCase().includes(lowerName));
          if (match) matchedMember = match.id;
        }

        setExtractedData({ ...data, assignedTo: matchedMember });
        setState('PREVIEW');
      };
    } catch (err) {
      console.error(err);
      setErrorMsg("Something went wrong processing your voice. Try speaking more clearly.");
      setState('PERMISSION');
    }
  };

  const handleSave = async () => {
    if (!extractedData || !auth.currentUser) return;
    setLoading(true);
    try {
      await addDoc(collection(db, "medications"), {
        ...extractedData,
        hubId,
        createdBy: auth.currentUser.uid,
        createdAt: serverTimestamp(),
        lastTaken: null,
        lastNotifiedDay: '',
        notifiedOnTime: false,
        notified5Min: false,
        notified10Min: false
      });
      onClose();
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to save medication. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[160] flex items-center justify-center p-6 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-[#2E2A4A]/25 backdrop-blur-[6px]" onClick={onClose} />
      
      <div className="relative w-full max-w-xl bg-[#EFEAE3] p-10 md:p-14 rounded-[4rem] shadow-2xl border border-[#2E2A4A]/5 animate-in zoom-in-95 duration-500 overflow-hidden">
        
        {state === 'PERMISSION' && (
          <div className="text-center space-y-8 py-4">
            <div className="flex justify-center bg-white/40 p-8 rounded-[3.5rem] shadow-sm">
               {/* Friendly Illustration Placeholder */}
               <div className="relative">
                  <div className="absolute -top-4 -right-4 bg-[#E5A23C] w-8 h-8 rounded-full flex items-center justify-center text-white shadow-lg">
                    <span className="text-xs">✨</span>
                  </div>
                  <MicIcon className="w-16 h-16 text-[#4FA3B1]" />
               </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-[#2E2A4A]">Smart Voice Memo</h2>
              <p className="text-[10px] font-black text-[#4FA3B1] uppercase tracking-[0.25em]">Speak it. We’ll set it up.</p>
              <p className="text-[#6A6875] leading-relaxed max-w-sm mx-auto">
                We need access to your microphone to listen to your voice memo. We only listen when you press record.
              </p>
            </div>
            {errorMsg && <p className="text-[#E5A23C] text-sm font-bold bg-[#E5A23C]/5 py-3 rounded-2xl">{errorMsg}</p>}
            <div className="flex flex-col gap-4">
              <button onClick={requestMicPermission} className="w-full bg-[#4FA3B1] text-white py-5 rounded-full font-bold text-xl hover-lift shadow-lg">Allow Microphone</button>
              <button onClick={onClose} className="text-[#6A6875] font-black text-xs uppercase tracking-widest hover:text-[#2E2A4A] transition-colors">Maybe later</button>
            </div>
          </div>
        )}

        {state === 'RECORDING' && (
          <div className="text-center space-y-10 py-10">
            <div className="relative flex justify-center">
              <div className="absolute inset-0 bg-[#4FA3B1]/10 rounded-full animate-ping opacity-20" />
              <div className="bg-[#4FA3B1] p-14 rounded-full shadow-2xl shadow-[#4FA3B1]/40 relative z-10">
                <MicIcon className="w-16 h-16 text-white" />
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-[#4FA3B1] font-black uppercase tracking-[0.3em]">Listening...</p>
              <h2 className="text-4xl font-black text-[#2E2A4A] tabular-nums">00:{recordingTime.toString().padStart(2, '0')}</h2>
              <p className="text-[#6A6875] text-sm">Speak naturally. You can stop anytime.</p>
            </div>
            <button onClick={stopRecording} className="w-full bg-[#2E2A4A] text-white py-5 rounded-full font-bold text-xl hover-lift shadow-lg">Stop Recording</button>
          </div>
        )}

        {state === 'PROCESSING' && (
          <div className="text-center space-y-10 py-12">
            <div className="flex justify-center">
               <VoiceProcessingIllustration />
            </div>
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-[#2E2A4A]">Turning your voice into a card...</h2>
              <p className="text-[10px] font-black text-[#4FA3B1] uppercase tracking-widest opacity-60">Powered by Gemini AI</p>
            </div>
          </div>
        )}

        {state === 'PREVIEW' && extractedData && (
          <div className="space-y-10 max-h-[80vh] overflow-y-auto pr-2 custom-scrollbar">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <h2 className="text-3xl font-bold text-[#2E2A4A]">Review Draft</h2>
                <p className="text-[#6A6875] font-bold text-xs uppercase tracking-widest">Please review and confirm before adding.</p>
              </div>
            </div>

            {/* Generated Preview Card */}
            <div className="bg-white/60 p-8 rounded-[3rem] border-2 border-white shadow-sm space-y-8 group transition-all">
              <div className="flex gap-6">
                <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
                  <PillIllustration className="w-12 h-12" />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-[#6A6875] uppercase tracking-widest px-1">Medicine name</label>
                    <input 
                      type="text" value={extractedData.name} 
                      onChange={e => setExtractedData({...extractedData, name: e.target.value})}
                      className="text-2xl font-bold text-[#2E2A4A] bg-transparent border-b-2 border-transparent focus:border-[#4FA3B1]/40 focus:outline-none w-full pb-1" 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-[#6A6875] uppercase tracking-widest px-1">Dosage</label>
                    <input 
                      type="text" value={extractedData.dosage} 
                      onChange={e => setExtractedData({...extractedData, dosage: e.target.value})}
                      className="text-lg text-[#6A6875] font-semibold bg-transparent border-b-2 border-transparent focus:border-[#4FA3B1]/40 focus:outline-none w-full pb-1" 
                    />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-[#2E2A4A]/5">
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-widest text-[#6A6875] px-1">Time to take</label>
                  <input 
                    type="time" value={extractedData.time}
                    onChange={e => setExtractedData({...extractedData, time: e.target.value})}
                    className="w-full bg-white rounded-2xl px-5 py-4 text-xl font-bold text-[#2E2A4A] focus:outline-none focus:ring-4 focus:ring-[#4FA3B1]/5 transition-all" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-widest text-[#6A6875] px-1">Assigned person</label>
                  <select 
                    value={extractedData.assignedTo}
                    onChange={e => setExtractedData({...extractedData, assignedTo: e.target.value})}
                    className="w-full bg-white rounded-2xl px-5 py-4 text-sm font-bold text-[#2E2A4A] focus:outline-none focus:ring-4 focus:ring-[#4FA3B1]/5 transition-all appearance-none"
                  >
                    {members.map(m => <option key={m.id} value={m.id}>{m.name.split(' ')[0]}</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-widest text-[#6A6875] px-1">Remarks</label>
                <textarea 
                  value={extractedData.remarks}
                  onChange={e => setExtractedData({...extractedData, remarks: e.target.value})}
                  className="w-full bg-white rounded-[2rem] px-6 py-5 text-sm font-medium text-[#2E2A4A] focus:outline-none focus:ring-4 focus:ring-[#4FA3B1]/5 h-24 resize-none transition-all"
                  placeholder="e.g. Before food, with water..."
                />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <button onClick={handleSave} disabled={loading} className="w-full bg-[#4FA3B1] text-white py-6 rounded-[2rem] font-bold text-2xl hover-lift shadow-xl shadow-[#4FA3B1]/20">{loading ? 'Saving...' : 'Add this medication'}</button>
              <button onClick={onClose} className="text-[#6A6875] font-black text-xs uppercase tracking-widest text-center hover:text-[#2E2A4A] transition-colors py-2">Discard</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};