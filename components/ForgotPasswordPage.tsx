
import React, { useState } from 'react';
import { VerificationEnvelopeIllustration, NeutralAvatar } from './Illustrations';
import { auth } from '../lib/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import { View } from '../App';

interface ForgotPasswordPageProps {
  onNavigate: (view: View) => void;
}

export const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    setError(null);

    try {
      await sendPasswordResetEmail(auth, email);
      setSubmitted(true);
    } catch (err: any) {
      console.error(err);
      // We still show the confirmation state or a gentle error to avoid user enumeration
      // but if something critical fails, we let them know
      setError("Something went wrong. Please check your email and try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-6 animate-in fade-in duration-700">
        <div className="w-full max-w-md bg-[#EFEAE3] p-12 md:p-16 rounded-[4rem] shadow-sm text-center space-y-10 border border-[#2E2A4A]/5">
          <div className="flex justify-center">
            <div className="bg-white/40 p-10 rounded-[3rem] shadow-sm animate-bounce duration-[3000ms]">
              <VerificationEnvelopeIllustration />
            </div>
          </div>
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-[#2E2A4A] tracking-tight">
              Check your email 📬
            </h1>
            <p className="text-[#6A6875] text-lg leading-relaxed">
              If an account exists for this email, you’ll receive a password reset link shortly.
            </p>
            <p className="text-xs text-[#6A6875]/70 italic">
              It may take a minute. Please check spam if you don’t see it.
            </p>
          </div>
          <button 
            onClick={() => onNavigate('login')}
            className="w-full bg-[#4FA3B1] text-white py-5 rounded-full font-bold text-xl hover-lift shadow-xl shadow-[#4FA3B1]/10 transition-all"
          >
            Back to login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center py-16 px-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="w-full max-w-lg bg-[#EFEAE3] p-10 md:p-16 rounded-[4rem] shadow-sm border border-[#2E2A4A]/5 space-y-12">
        <div className="text-center space-y-6">
          <div className="flex justify-center mb-4">
             <div className="w-32 h-32 bg-white/50 rounded-[2.5rem] flex items-center justify-center">
                <NeutralAvatar className="w-20 h-20 opacity-80" />
             </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#2E2A4A]">Let’s help you sign back in</h2>
          <p className="text-[#6A6875] text-lg leading-relaxed">
            Enter your email and we’ll send you a link to reset your password.
          </p>
        </div>

        <form onSubmit={handleReset} className="space-y-8">
          <div className="space-y-6">
            {error && (
              <div className="bg-[#E5A23C]/10 border-l-4 border-[#E5A23C] p-4 rounded-xl">
                <p className="text-[#E5A23C] font-semibold text-sm leading-relaxed">{error}</p>
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#2E2A4A] px-2">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="w-full bg-[#F4F1EC] border-none rounded-2xl px-6 py-5 text-lg text-[#2E2A4A] placeholder-[#6A6875]/40 focus:ring-2 focus:ring-[#4FA3B1]/20 focus:outline-none transition-all shadow-sm"
              />
            </div>
          </div>

          <div className="space-y-6">
            <button 
              type="submit"
              disabled={loading || !email.trim()}
              className="w-full bg-[#4FA3B1] text-white py-5 rounded-full font-bold text-xl hover-lift shadow-xl shadow-[#4FA3B1]/10 disabled:opacity-50 transition-all"
            >
              {loading ? 'Sending link...' : 'Send reset link'}
            </button>
            
            <div className="text-center space-y-4">
              <p className="text-xs text-[#6A6875] italic">
                If this email exists, we’ll send a reset link.
              </p>
              <button 
                type="button"
                onClick={() => onNavigate('login')}
                className="text-[#6A6875] font-bold hover:text-[#2E2A4A] transition-colors border-b-2 border-transparent hover:border-[#6A6875]/20 pb-0.5"
              >
                Back to login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
