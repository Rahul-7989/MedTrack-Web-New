import React, { useState } from 'react';
import { VerificationEnvelopeIllustration } from './Illustrations';
import { auth, db } from '../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { UserInfo } from '../App';

interface EmailVerificationPageProps {
  pendingData: UserInfo | null;
  onVerified: () => void;
}

export const EmailVerificationPage: React.FC<EmailVerificationPageProps> = ({ pendingData, onVerified }) => {
  const [checking, setChecking] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const checkStatus = async () => {
    setChecking(true);
    setErrorMsg(null);
    try {
      // Reload the user profile to get the latest emailVerified status
      if (auth.currentUser) {
        await auth.currentUser.reload();
        if (auth.currentUser.emailVerified) {
          // Create User Doc in Firestore
          if (pendingData) {
            await setDoc(doc(db, "users", auth.currentUser.uid), {
              name: pendingData.name,
              gender: pendingData.gender,
              email: auth.currentUser.email,
              createdAt: new Date().toISOString(),
              hubId: null
            });
          }
          onVerified();
        } else {
          setErrorMsg("We need to confirm your email first. Once verified, you can continue right away.");
        }
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Something went wrong. Please try again in a moment.");
    } finally {
      setChecking(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center py-20 px-6 animate-in fade-in zoom-in-95 duration-700">
      <div className="w-full max-w-md bg-[#EFEAE3] p-12 md:p-16 rounded-[4rem] shadow-sm text-center space-y-10 border border-[#2E2A4A]/5">
        
        {/* Visual: Floating Envelope */}
        <div className="flex justify-center">
          <div className="bg-white/40 p-10 rounded-[3rem] shadow-sm animate-bounce duration-[3000ms] transition-transform">
            <VerificationEnvelopeIllustration />
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-[#2E2A4A] tracking-tight">
            Check your inbox 📩
          </h1>
          <div className="space-y-2">
            <p className="text-[#6A6875] text-lg leading-relaxed">
              We’ve sent a verification link to your email.
            </p>
            <p className="text-[#4FA3B1] font-medium">
              Just one click, and you’re all set.
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="space-y-6">
          {errorMsg && (
            <div className="bg-[#E5A23C]/10 border-l-4 border-[#E5A23C] p-4 rounded-xl animate-in slide-in-from-top-2 duration-300">
              <p className="text-[#E5A23C] font-semibold text-sm leading-snug">{errorMsg}</p>
            </div>
          )}

          <button 
            onClick={checkStatus}
            disabled={checking}
            className="w-full bg-[#4FA3B1] text-white py-6 rounded-3xl font-bold text-xl hover-lift shadow-xl shadow-[#4FA3B1]/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {checking ? 'Checking status...' : 'I’ve verified my email'}
          </button>

          <p className="text-xs text-[#6A6875]/70 italic">
            It helps us keep your family’s space safe.
          </p>
        </div>
      </div>
    </div>
  );
};