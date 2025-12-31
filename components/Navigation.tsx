
import React from 'react';
import { LogoIcon, AvatarRenderer } from './Illustrations';
import { View, UserInfo } from '../App';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';

interface NavigationProps {
  onNavigate: (view: View) => void;
  currentView: View;
  userInfo: UserInfo;
}

export const Navigation: React.FC<NavigationProps> = ({ onNavigate, currentView, userInfo }) => {
  // Ensure the user profile is shown in all authenticated/pending states
  const showProfile = ['hub-selection', 'email-verification', 'create-hub', 'join-hub', 'dashboard', 'waiting-approval', 'profile'].includes(currentView);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onNavigate('home');
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#F4F1EC] shadow-sm py-4 px-6 md:px-12 flex items-center justify-between border-b border-[#EFEAE3]">
      <div className="flex items-center gap-3">
        {/* Logo */}
        <div 
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 group cursor-pointer transition-transform hover:scale-105 active:scale-95"
        >
          <LogoIcon className="w-12 h-12" />
          <span className="text-2xl font-bold text-[#2E2A4A] tracking-tight">MedTrack</span>
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        {!showProfile ? (
          <>
            <button 
              onClick={() => onNavigate('login')}
              className={`font-semibold transition-colors text-sm uppercase tracking-widest ${currentView === 'login' ? 'text-[#4FA3B1]' : 'text-[#2E2A4A] hover:text-[#4FA3B1]'}`}
            >
              Login
            </button>
            <button 
              onClick={() => onNavigate('signup')}
              className="bg-[#4FA3B1] text-[#F4F1EC] px-6 py-3 rounded-full font-bold text-sm uppercase tracking-widest hover-lift shadow-lg shadow-[#4FA3B1]/10"
            >
              Get Started
            </button>
          </>
        ) : (
          <div className="relative group">
            {/* Profile Cluster Trigger */}
            <div className="flex items-center gap-4 bg-[#EFEAE3] pr-5 pl-2 py-2 rounded-2xl shadow-sm border border-[#2E2A4A]/5 cursor-default transition-all group-hover:shadow-md">
              <div className="w-10 h-10 rounded-xl overflow-hidden shadow-inner bg-white">
                <AvatarRenderer gender={userInfo.gender} index={userInfo.avatarIndex} className="w-full h-full" />
              </div>
              <div className="flex items-center gap-3">
                <span className="font-bold text-[#2E2A4A] text-base">
                  {userInfo.name?.split(' ')[0] || 'Friend'}
                </span>
                <svg 
                  className={`w-4 h-4 text-[#6A6875] transition-transform duration-500 group-hover:rotate-180`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Dropdown Menu */}
            <div className="absolute right-0 top-full pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-50">
              <div className="w-56 bg-white rounded-[2rem] shadow-2xl border border-[#2E2A4A]/5 py-4 overflow-hidden">
                <div className="px-6 py-3 mb-2 border-b border-[#F4F1EC]">
                  <p className="text-[10px] font-black text-[#6A6875] uppercase tracking-[0.2em] opacity-60">Account</p>
                </div>
                <button 
                  onClick={() => onNavigate('profile')}
                  className={`w-full flex items-center gap-4 px-6 py-4 text-sm font-bold transition-all ${currentView === 'profile' ? 'bg-[#F4F1EC] text-[#4FA3B1]' : 'text-[#2E2A4A] hover:bg-[#F4F1EC] hover:text-[#4FA3B1]'}`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Your Profile
                </button>
                <div className="mx-6 my-2 border-t-2 border-[#F4F1EC]" />
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-4 px-6 py-4 text-sm font-bold text-[#E5A23C] hover:bg-[#E5A23C]/5 transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Log Out
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
