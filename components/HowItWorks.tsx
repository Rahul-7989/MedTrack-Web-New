
import React from 'react';

const StepCard: React.FC<{ num: string, title: string, desc: string }> = ({ num, title, desc }) => (
  <div className="bg-[#EFEAE3] p-6 rounded-3xl min-w-[200px] flex-1 hover-lift border-t-4 border-[#4FA3B1] shadow-sm">
    <div className="text-3xl font-bold text-[#4FA3B1]/20 mb-2">{num}</div>
    <h3 className="text-lg font-bold text-[#2E2A4A] mb-1">{title}</h3>
    <p className="text-sm text-[#6A6875] leading-snug">{desc}</p>
  </div>
);

export const HowItWorks: React.FC = () => {
  return (
    <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-[#2E2A4A] mb-10 text-center uppercase tracking-wider text-[#4FA3B1]">How MedTrack Works</h2>
      <div className="flex flex-col md:flex-row gap-6 overflow-x-auto pb-6 scrollbar-hide">
        <StepCard num="01" title="Create" desc="Set up your account in under a minute." />
        <StepCard num="02" title="Organize" desc="Keep everything in one place." />
        <StepCard num="03" title="Add Care" desc="Add medicines for anyone you care about." />
        <StepCard num="04" title="One Tap" desc="Took the medicine? Tap “Taken”." />
        <StepCard num="05" title="Relax" desc="MedTrack keeps track for you." />
      </div>
    </section>
  );
};
