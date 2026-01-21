
import React from 'react';

export const Introduction: React.FC = () => {
  const teamMembers = [
    "Rahul C",
    "Ravi Kiran K",
    "Aarifa P",
    "Lakshmi Keerthi G"
  ];

  return (
    <section className="py-16 px-6 max-w-5xl mx-auto space-y-16">
      {/* Existing Value Proposition */}
      <div className="text-center space-y-6 max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold text-[#2E2A4A]">
          MedTrack helps families manage medicines together — not alone.
        </h2>
        <div className="space-y-4 text-[#6A6875] text-lg">
          <p>You add medicines. We remind gently.</p>
          <p>If someone forgets, the family knows — calmly, not critically.</p>
        </div>
        <div className="pt-8 flex justify-center">
          <svg width="120" height="20" viewBox="0 0 120 20" fill="none">
            <path d="M10 10C30 10 30 10 50 10C70 10 70 10 90 10C110 10 110 10 130 10" stroke="#9DB8AD" strokeWidth="4" strokeLinecap="round" strokeDasharray="8 12" />
          </svg>
        </div>
      </div>

      {/* New Team Section */}
      <div className="bg-[#EFEAE3] p-10 md:p-14 rounded-[4rem] shadow-sm border border-[#2E2A4A]/5 animate-in fade-in slide-in-from-bottom-6 duration-1000">
        <div className="text-center space-y-8">
          <div className="space-y-3">
            <h3 className="text-2xl md:text-3xl font-bold text-[#2E2A4A]">
              🌱 The People Behind MedTrack
            </h3>
            <p className="text-[#6A6875] text-lg max-w-2xl mx-auto leading-relaxed">
              MedTrack is built with care by a small team that believes managing medicines should feel calm, simple, and human.
            </p>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] font-black text-[#4FA3B1] uppercase tracking-[0.4em]">
              Team Members
            </h4>
            <div className="flex flex-wrap justify-center gap-4">
              {teamMembers.map((member, index) => (
                <div 
                  key={index} 
                  className="bg-white/60 backdrop-blur-sm px-8 py-4 rounded-[2rem] border border-white shadow-sm hover-lift transition-all cursor-default"
                >
                  <span className="text-sm font-bold text-[#2E2A4A] tracking-tight">{member}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-8 border-t border-[#2E2A4A]/5">
            <p className="text-xs font-bold text-[#E5A23C] uppercase tracking-[0.2em] italic">
              Designed and built with empathy, not complexity.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
