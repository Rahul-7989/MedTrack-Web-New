import React from 'react';
import { CreateHubIllustration, JoinHubIllustration } from './Illustrations';
import { View } from '../App';

interface HubSelectionPageProps {
  userName: string;
  onNavigate: (view: View) => void;
}

export const HubSelectionPage: React.FC<HubSelectionPageProps> = ({ userName, onNavigate }) => {
  const firstName = userName.split(' ')[0];

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#F4F1EC] flex flex-col items-center py-20 px-6 animate-in fade-in zoom-in-95 duration-1000">
      {/* Welcome Section */}
      <div className="text-center space-y-4 mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-[#2E2A4A] tracking-tight">
          Welcome, {firstName}! 🎉
        </h1>
        <div className="space-y-2">
          <p className="text-xl text-[#4FA3B1] font-medium">Let’s set up your family space.</p>
          <p className="text-[#6A6875] text-lg">MedTrack works best when care is shared.</p>
        </div>
        <p className="text-sm text-[#E5A23C] font-semibold pt-2">
          Don’t worry — this part is easy 🙂
        </p>
      </div>

      {/* Cards Section */}
      <div className="grid md:grid-cols-2 gap-10 w-full max-w-5xl">
        {/* Create Hub Card */}
        <div 
          onClick={() => onNavigate('create-hub')}
          className="group bg-[#EFEAE3] p-10 rounded-[3rem] shadow-sm hover-lift cursor-pointer flex flex-col items-center text-center space-y-8 border-2 border-transparent hover:border-[#4FA3B1]/20"
        >
          <div className="bg-white/50 p-6 rounded-[2.5rem]">
            <CreateHubIllustration />
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-[#2E2A4A]">Create a Family Hub</h3>
              <p className="text-[#6A6875] leading-relaxed">Start a shared space for your family’s care.</p>
            </div>
            <p className="text-sm text-[#6A6875]/70 italic">You’ll get a unique code to invite others.</p>
          </div>
          <button className="w-full bg-[#4FA3B1] text-white py-5 rounded-2xl font-bold text-xl shadow-lg shadow-[#4FA3B1]/10 group-hover:scale-[1.02] transition-transform">
            Create Hub
          </button>
        </div>

        {/* Join Hub Card */}
        <div 
          onClick={() => onNavigate('join-hub')}
          className="group bg-[#EFEAE3] p-10 rounded-[3rem] shadow-sm hover-lift cursor-pointer flex flex-col items-center text-center space-y-8 border-2 border-transparent hover:border-[#E5A23C]/20"
        >
          <div className="bg-white/50 p-6 rounded-[2.5rem]">
            <JoinHubIllustration />
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-[#2E2A4A]">Join a Family Hub</h3>
              <p className="text-[#6A6875] leading-relaxed">Enter a hub code to join your family.</p>
            </div>
            <p className="text-sm text-[#6A6875]/70 italic">Someone’s already waiting for you.</p>
          </div>
          <button className="w-full border-2 border-[#E5A23C] text-[#E5A23C] bg-white/40 py-5 rounded-2xl font-bold text-xl group-hover:bg-[#E5A23C] group-hover:text-white transition-all">
            Join Hub
          </button>
        </div>
      </div>

      {/* Micro-copy footer */}
      <div className="mt-16 text-center">
        <p className="text-[#6A6875] font-medium opacity-60">
          You can always switch or create another hub later.
        </p>
      </div>
    </div>
  );
};