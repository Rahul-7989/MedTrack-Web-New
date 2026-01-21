
import React from 'react';
import { AIChatIcon, SummaryIcon, VoiceIcon } from './Illustrations';

const AICard: React.FC<{ icon: React.ReactNode, title: string, desc: string }> = ({ icon, title, desc }) => (
  <div className="bg-[#EFEAE3] p-8 rounded-[2rem] hover-lift text-center space-y-4 shadow-md border-b-4 border-[#9DB8AD]">
    <div className="flex justify-center">{icon}</div>
    <h3 className="text-2xl font-bold text-[#2E2A4A]">{title}</h3>
    <p className="text-[#6A6875]">{desc}</p>
  </div>
);

export const AIPower: React.FC = () => {
  return (
    <section className="py-20 px-6 md:px-12 bg-[#F4F1EC]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 flex flex-col items-center gap-4 text-center">
           <div className="px-4 py-1 rounded-full bg-[#E5A23C]/10 text-[#E5A23C] font-bold text-sm tracking-widest uppercase">
             Powered by Friendly AI
           </div>
           <h2 className="text-4xl font-bold text-[#2E2A4A]">Intelligent care, human heart</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <AICard 
            icon={<AIChatIcon />}
            title="CareMate AI Chatbot"
            desc="Ask about medicines anytime — no Googling. Friendly, fast, and clear."
          />
          <AICard 
            icon={<SummaryIcon />}
            title="Weekly Care Summary"
            desc="Understand habits in simple human language. No complicated charts."
          />
          <AICard 
            icon={<VoiceIcon />}
            title="Voice Input"
            desc="Add medicines just by speaking. Perfect for all generations."
          />
        </div>
      </div>
    </section>
  );
};
