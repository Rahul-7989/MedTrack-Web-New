import React from 'react';
import { RequestDeclinedIllustration } from './Illustrations';
import { View } from '../App';

interface RequestDeclinedPageProps {
  onNavigate: (view: View) => void;
}

export const RequestDeclinedPage: React.FC<RequestDeclinedPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#F4F1EC] flex flex-col items-center justify-center py-20 px-6 animate-in fade-in slide-in-from-bottom-6 duration-1000">
      <div className="w-full max-w-lg bg-[#EFEAE3] p-12 md:p-16 rounded-[4rem] shadow-sm text-center space-y-12 border border-[#2E2A4A]/5">
        
        {/* Visual Section */}
        <div className="flex justify-center">
          <div className="bg-white/40 p-10 rounded-[3rem] shadow-sm animate-in zoom-in duration-700">
            <RequestDeclinedIllustration />
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold text-[#2E2A4A] tracking-tight">
            Request not approved
          </h1>
          <div className="space-y-3">
            <p className="text-[#6A6875] text-lg leading-relaxed">
              The family hub creator didn’t approve your request to join.
            </p>
            <p className="text-[#4FA3B1] font-bold italic opacity-80">
              This might be a mistake — you can try again using the same hub code.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4 pt-6 border-t border-[#6A6875]/10">
          <button 
            onClick={() => onNavigate('join-hub')}
            className="w-full bg-[#4FA3B1] text-[#F4F1EC] py-5 rounded-full font-bold text-xl hover-lift shadow-xl shadow-[#4FA3B1]/10 transition-all active:scale-95"
          >
            Try again
          </button>
          
          <button 
            onClick={() => onNavigate('hub-selection')}
            className="text-[#6A6875] font-black text-sm uppercase tracking-[0.2em] hover:text-[#2E2A4A] transition-colors"
          >
            Go back
          </button>
        </div>

        {/* Optional Micro-copy */}
        <div className="pt-4">
          <p className="text-[10px] text-[#6A6875]/40 font-black uppercase tracking-widest leading-relaxed">
            You won’t see any hub information unless you’re approved.
          </p>
        </div>
      </div>

      <div className="mt-12 text-center max-w-xs opacity-40">
        <p className="text-[10px] font-black text-[#6A6875] uppercase tracking-widest leading-relaxed">
          MedTrack • Caring Together, Gently.
        </p>
      </div>
    </div>
  );
};