
import React, { useState, useRef } from 'react';
import { JoinHubIllustration } from './Illustrations';
import { View, UserInfo } from '../App';
import { auth, db } from '../lib/firebase';
import { collection, query, where, getDocs, updateDoc, doc, arrayUnion } from 'firebase/firestore';

interface JoinHubPageProps {
  onNavigate: (view: View, data?: UserInfo) => void;
}

export const JoinHubPage: React.FC<JoinHubPageProps> = ({ onNavigate }) => {
  const [code, setCode] = useState<string[]>(new Array(6).fill(''));
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<{ text: string; type: 'invalid' | 'expired' } | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (value: string, index: number) => {
    const char = value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(-1);
    const newCode = [...code];
    newCode[index] = char;
    setCode(newCode);
    setErrorMsg(null);

    if (char && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleJoin = async () => {
    const fullCode = code.join('');
    if (fullCode.length !== 6 || !auth.currentUser) return;

    setLoading(true);
    setErrorMsg(null);

    try {
      const hubsRef = collection(db, "hubs");
      const q = query(hubsRef, where("hubCode", "==", fullCode));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setErrorMsg({ 
          text: "That code doesn’t seem right. Please check and try again.", 
          type: 'invalid' 
        });
      } else {
        const hubDoc = querySnapshot.docs[0];
        const hubId = hubDoc.id;
        const hubData = hubDoc.data();

        if (hubData.status === 'archived') {
          setErrorMsg({ 
            text: "This hub code is no longer active. Ask your family member for a new one.", 
            type: 'expired' 
          });
          setLoading(false);
          return;
        }

        // Add to pending members
        await updateDoc(doc(db, "hubs", hubId), {
          pendingMembers: arrayUnion(auth.currentUser.uid)
        });

        // Set pending status for user
        await updateDoc(doc(db, "users", auth.currentUser.uid), {
          pendingHubId: hubId
        });

        onNavigate('waiting-approval', { pendingHubId: hubId } as any);
      }
    } catch (err) {
      console.error(err);
      setErrorMsg({ 
        text: "We’re having a little trouble connecting. Please try again.", 
        type: 'invalid' 
      });
    } finally {
      setLoading(false);
    }
  };

  const isComplete = code.every(char => char !== '');

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#F4F1EC] flex flex-col items-center py-12 md:py-20 px-6 animate-in fade-in slide-in-from-bottom-6 duration-1000">
      <div className="text-center space-y-8 mb-16 max-w-2xl">
        <div className="flex justify-center">
          <div className="bg-[#EFEAE3] p-10 rounded-[4rem] shadow-sm animate-pulse duration-[4000ms]">
            <JoinHubIllustration />
          </div>
        </div>
        <div className="space-y-3">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2E2A4A] tracking-tight">
            Join a Family Hub 🤝
          </h1>
          <div className="space-y-1">
            <p className="text-xl text-[#6A6875] font-medium leading-relaxed">
              Someone shared a hub code with you.
            </p>
            <p className="text-sm text-[#4FA3B1] font-bold uppercase tracking-[0.2em] pt-1">
              You’re just one step away.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full max-w-xl bg-[#EFEAE3] p-10 md:p-14 rounded-[3.5rem] shadow-sm space-y-12 border border-[#2E2A4A]/5 relative">
        <div className="space-y-10 text-center">
          <label className="text-xs font-black text-[#2E2A4A] uppercase tracking-[0.25em] block">
            🔑 Enter Hub Code
          </label>
          
          <div className="flex justify-center gap-2 md:gap-3 lg:gap-4 mx-auto w-full">
            {code.map((char, index) => (
              <input
                key={index}
                ref={el => { inputRefs.current[index] = el; }}
                type="text"
                maxLength={1}
                value={char}
                onChange={e => handleChange(e.target.value, index)}
                onKeyDown={e => handleKeyDown(e, index)}
                className="w-10 h-14 md:w-16 md:h-20 bg-[#F4F1EC] border-3 border-transparent text-center text-2xl md:text-3xl font-black text-[#2E2A4A] rounded-2xl focus:border-[#E5A23C]/50 focus:bg-white focus:outline-none transition-all shadow-sm font-mono"
                aria-label={`Digit ${index + 1}`}
              />
            ))}
          </div>

          <p className="text-xs text-[#6A6875] font-bold italic opacity-60">
            Hub codes are 6 characters long.
          </p>

          <div className="h-4">
            {errorMsg && (
              <p className="text-[#E5A23C] font-bold text-sm leading-relaxed animate-in fade-in slide-in-from-top-1 duration-500">
                {errorMsg.text}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-8">
          <button 
            onClick={handleJoin}
            disabled={!isComplete || loading}
            className="w-full bg-[#4FA3B1] text-[#F4F1EC] py-6 rounded-3xl font-bold text-2xl hover-lift shadow-xl shadow-[#4FA3B1]/20 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95"
          >
            {loading ? 'Sending Request...' : 'Join Family Hub'}
          </button>
          
          <div className="text-center space-y-8">
            <p className="text-[11px] text-[#6A6875] font-bold px-6 leading-relaxed opacity-60 uppercase tracking-widest">
              You won’t see anything until you’re accepted into the hub.
            </p>
            
            <button 
              onClick={() => onNavigate('hub-selection')}
              className="text-[#6A6875] font-black text-sm uppercase tracking-[0.2em] hover:text-[#2E2A4A] transition-colors border-b-2 border-transparent hover:border-[#6A6875]/20 pb-1"
            >
              Go back
            </button>
          </div>
        </div>
      </div>

      <div className="mt-16 text-center">
        <p className="text-[#6A6875]/50 text-[10px] font-bold uppercase tracking-[0.3em]">
          Trust in Care • Privacy in Heart
        </p>
      </div>
    </div>
  );
};
