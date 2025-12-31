
import React, { useState } from 'react';
import { LoginIllustration } from './Illustrations';
import { auth, db } from '../lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { View, UserInfo } from '../App';

interface LoginPageProps {
  onNavigate: (view: View, data?: UserInfo) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        
        if (userDoc.exists()) {
          const userData = userDoc.data() as UserInfo;
          
          if (userData.hubId) {
            onNavigate('dashboard', userData);
          } else if (userData.pendingHubId) {
            onNavigate('waiting-approval', userData);
          } else {
            onNavigate('hub-selection', userData);
          }
        } else {
          onNavigate('hub-selection', { name: 'Friend', gender: null });
        }
      }
    } catch (err: any) {
      console.error(err);
      setError("We couldn’t sign you in.\nThe email or password doesn’t seem to match. Try Again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col md:flex-row animate-in fade-in duration-700">
      <div className="w-full md:w-[40%] bg-[#EFEAE3] flex flex-col justify-center items-center p-12 text-center md:text-left">
        <div className="max-w-xs space-y-8">
          <LoginIllustration />
          <div className="space-y-2">
            <h2 className="text-4xl font-bold text-[#2E2A4A]">Welcome back</h2>
            <p className="text-2xl text-[#4FA3B1] font-medium">Someone’s glad you’re here.</p>
          </div>
          <p className="text-[#6A6875] text-sm italic">
            Let’s continue caring — together.
          </p>
        </div>
      </div>

      <div className="w-full md:w-[60%] flex items-center justify-center p-8 md:p-24 bg-[#F4F1EC]">
        <div className="w-full max-w-md space-y-12">
          <form onSubmit={handleLogin} className="space-y-8">
            <div className="space-y-6">
              {error && (
                <div className="bg-[#E5A23C]/10 border-l-4 border-[#E5A23C] p-4 rounded-xl animate-in slide-in-from-top-2 duration-300 whitespace-pre-line">
                  <p className="text-[#E5A23C] font-semibold text-sm leading-relaxed">{error}</p>
                </div>
              )}
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#2E2A4A] px-2">Email Address</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@family.com"
                  required
                  className="w-full bg-[#EFEAE3] border-none rounded-2xl px-6 py-4 text-lg text-[#2E2A4A] placeholder-[#6A6875]/50 focus:ring-2 focus:ring-[#4FA3B1]/20 focus:outline-none transition-all shadow-sm"
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center px-2">
                  <label className="text-sm font-bold text-[#2E2A4A]">Password</label>
                  <button 
                    type="button" 
                    onClick={() => onNavigate('forgot-password')}
                    className="text-xs font-bold text-[#4FA3B1] hover:text-[#2E2A4A] transition-colors uppercase tracking-widest"
                  >
                    Forgot Password?
                  </button>
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-[#EFEAE3] border-none rounded-2xl px-6 py-4 text-lg text-[#2E2A4A] placeholder-[#6A6875]/50 focus:ring-2 focus:ring-[#4FA3B1]/20 focus:outline-none transition-all shadow-sm"
                />
              </div>
            </div>

            <div className="space-y-4">
              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-[#4FA3B1] text-[#F4F1EC] py-5 rounded-full font-bold text-xl hover-lift shadow-lg shadow-[#4FA3B1]/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {loading ? 'Logging in...' : 'Log in'}
              </button>
              <div className="text-center">
                <button 
                  type="button"
                  onClick={() => onNavigate('signup')}
                  className="text-[#6A6875] hover:text-[#4FA3B1] transition-colors font-medium"
                >
                  New here? <span className="text-[#E5A23C] font-bold border-b-2 border-[#E5A23C]/20">Get started</span>
                </button>
              </div>
            </div>
          </form>

          <p className="text-center text-[#6A6875]/60 text-sm italic">
            We don’t rush. Take your time.
          </p>
        </div>
      </div>
    </div>
  );
};
