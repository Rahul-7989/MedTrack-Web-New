
import React from 'react';
import { FamilyIllustration } from './Illustrations';

interface HeroProps {
  onGetStarted: () => void;
  onLogin: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onGetStarted, onLogin }) => {
  return (
    <section className="py-12 md:py-20 px-6 md:px-12 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
      <div className="space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold text-[#2E2A4A] leading-tight">
            MedTrack<br />
            <span className="text-[#4FA3B1]">Because care works better together.</span>
          </h1>
          <p className="text-lg text-[#6A6875] max-w-lg leading-relaxed">
            A family-centered medication companion that helps people take medicines on time — with gentle reminders, shared responsibility, and friendly AI support.
          </p>
          <p className="text-md font-medium text-[#E5A23C]">
            Not alarms that shout. Not apps that scare. Just care that feels human.
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={onGetStarted}
            className="bg-[#4FA3B1] text-[#F4F1EC] px-8 py-4 rounded-2xl font-bold text-lg hover-lift shadow-lg"
          >
            Get Started
          </button>
          <button 
            onClick={onLogin}
            className="border-2 border-[#4FA3B1] text-[#4FA3B1] px-8 py-4 rounded-2xl font-bold text-lg hover:bg-[#4FA3B1] hover:text-[#F4F1EC] transition-all"
          >
            Login
          </button>
        </div>
      </div>
      
      <div className="flex justify-center md:justify-end">
        <div className="w-full max-w-md bg-[#EFEAE3] rounded-[40px] p-8 relative overflow-hidden shadow-xl border-4 border-[#F4F1EC]">
          <FamilyIllustration />
        </div>
      </div>
    </section>
  );
};
