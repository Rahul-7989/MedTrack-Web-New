
import React from 'react';

interface FinalCTAProps {
  onGetStarted: () => void;
  onLogin: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onGetStarted, onLogin }) => {
  return (
    <section className="py-24 px-6 text-center max-w-4xl mx-auto space-y-10">
      <h2 className="text-4xl md:text-5xl font-bold text-[#2E2A4A]">
        Ready to care smarter?
      </h2>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button 
          onClick={onGetStarted}
          className="bg-[#4FA3B1] text-[#F4F1EC] px-10 py-5 rounded-2xl font-bold text-xl hover-lift shadow-xl w-full sm:w-auto"
        >
          Get Started
        </button>
        <button 
          onClick={onLogin}
          className="bg-transparent text-[#2E2A4A] px-10 py-5 rounded-2xl font-bold text-xl hover:bg-[#EFEAE3] transition-colors w-full sm:w-auto"
        >
          Login
        </button>
      </div>
    </section>
  );
};
