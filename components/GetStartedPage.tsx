
import React, { useState } from 'react';
import { GetStartedIllustration } from './Illustrations';
import { auth } from '../lib/firebase';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { View } from '../App';

interface GetStartedPageProps {
  onNavigate: (view: View, data?: { name: string, gender: string | null }) => void;
}

const GENDER_OPTIONS = [
  { id: 'male', label: 'Male', icon: '👤' },
  { id: 'female', label: 'Female', icon: '👤' },
  { id: 'other', label: 'Other', icon: '🌈' },
  { id: 'private', label: 'Prefer not to say', icon: '🚫' },
];

export const GetStartedPage: React.FC<GetStartedPageProps> = ({ onNavigate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState<string | null>(null);
  const [age, setAge] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Send verification email immediately
      if (userCredential.user) {
        await sendEmailVerification(userCredential.user);
      }

      // Navigate to verification screen
      onNavigate('email-verification', { name, gender });
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/email-already-in-use') {
        setError("This email is already registered.");
      } else if (err.code === 'auth/weak-password') {
        setError("Password should be at least 6 characters.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] py-16 px-6 md:px-12 flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Top — Friendly Intro */}
      <div className="text-center space-y-8 mb-16 max-w-2xl">
        <div className="flex justify-center">
          <GetStartedIllustration />
        </div>
        <div className="space-y-3">
          <h2 className="text-4xl md:text-5xl font-bold text-[#2E2A4A]">Let’s set things up 🌱</h2>
          <p className="text-xl text-[#6A6875]">One small step toward caring better.</p>
        </div>
      </div>

      {/* Form Section */}
      <form onSubmit={handleSignup} className="w-full max-w-xl bg-[#EFEAE3] p-10 md:p-14 rounded-[3rem] shadow-sm space-y-12">
        <div className="space-y-8">
          {error && (
            <div className="bg-[#E5A23C]/10 border-l-4 border-[#E5A23C] p-4 rounded-xl animate-in slide-in-from-top-2 duration-300">
              <p className="text-[#E5A23C] font-semibold text-sm">{error}</p>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-bold text-[#2E2A4A] px-2">Full Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="What should we call you?"
              required
              className="w-full bg-[#F4F1EC] border-none rounded-2xl px-6 py-5 text-lg text-[#2E2A4A] placeholder-[#6A6875]/40 focus:ring-2 focus:ring-[#4FA3B1]/20 focus:outline-none transition-all"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-bold text-[#2E2A4A] px-2">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Where can we reach you?"
              required
              className="w-full bg-[#F4F1EC] border-none rounded-2xl px-6 py-5 text-lg text-[#2E2A4A] placeholder-[#6A6875]/40 focus:ring-2 focus:ring-[#4FA3B1]/20 focus:outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-[#2E2A4A] px-2">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Something secure (we won’t peek)"
              required
              className="w-full bg-[#F4F1EC] border-none rounded-2xl px-6 py-5 text-lg text-[#2E2A4A] placeholder-[#6A6875]/40 focus:ring-2 focus:ring-[#4FA3B1]/20 focus:outline-none transition-all"
            />
          </div>

          {/* Gender Selection */}
          <div className="space-y-4">
            <label className="text-sm font-bold text-[#2E2A4A] px-2">
              Gender <span className="text-[#6A6875] font-normal">(optional, helps us personalize gently)</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              {GENDER_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setGender(option.id)}
                  className={`flex items-center gap-3 px-4 py-4 rounded-2xl text-sm font-semibold transition-all border-2
                    ${gender === option.id 
                      ? 'border-[#4FA3B1] bg-[#4FA3B1]/10 text-[#4FA3B1] shadow-sm' 
                      : 'border-transparent bg-[#F4F1EC] text-[#2E2A4A] hover:bg-[#F4F1EC]/80 hover:scale-[1.02]'
                    }`}
                >
                  <span className="text-xl" role="img" aria-hidden="true">{option.icon}</span>
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Age Selection */}
          <div className="space-y-4">
            <label className="text-sm font-bold text-[#2E2A4A] px-2">
              Age <span className="text-[#6A6875] font-normal">(optional — helps reminders feel right)</span>
            </label>
            <div className="bg-[#F4F1EC] p-8 rounded-[2.5rem] space-y-6">
              <div className="flex justify-between items-end">
                <span className="text-3xl font-bold text-[#4FA3B1]">
                  {age === null ? 'Age: Skip' : `Age: ${age}${age === 100 ? '+' : ''}`}
                </span>
                {age !== null && (
                  <button 
                    type="button" 
                    onClick={() => setAge(null)}
                    className="text-xs font-bold text-[#E5A23C] uppercase tracking-widest bg-[#EFEAE3] px-4 py-2 rounded-full hover:bg-white transition-all hover:shadow-sm"
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="relative pt-2">
                <input 
                  type="range"
                  min="0"
                  max="100"
                  value={age ?? 30}
                  onChange={(e) => setAge(parseInt(e.target.value))}
                  className={`w-full h-3 bg-[#EFEAE3] rounded-full appearance-none cursor-pointer transition-opacity ${age === null ? 'opacity-40' : 'opacity-100'}`}
                />
                <div className="flex justify-between mt-4 text-[10px] text-[#6A6875]/60 font-bold uppercase tracking-widest px-1">
                  <span>0</span>
                  <span>50</span>
                  <span>100+</span>
                </div>
              </div>
            </div>
            <p className="text-xs text-[#6A6875] px-2 italic">
              Used only to make things simpler — never to judge.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-[#4FA3B1] text-[#F4F1EC] py-6 rounded-3xl font-bold text-2xl hover-lift shadow-xl shadow-[#4FA3B1]/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {loading ? 'Setting things up...' : 'Create my account'}
          </button>
          
          <div className="text-center">
            <button 
              type="button"
              onClick={() => onNavigate('login')}
              className="text-[#6A6875] font-medium"
            >
              Already have an account? <span className="text-[#E5A23C] font-bold border-b-2 border-[#E5A23C]/20">Log in</span>
            </button>
          </div>
        </div>

        <div className="pt-6 border-t border-[#6A6875]/10 flex items-center justify-center gap-2 text-[#6A6875]/70 text-sm">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          No spam. No ads. Just care.
        </div>
      </form>
    </div>
  );
};
