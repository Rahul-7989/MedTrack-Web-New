
import React from 'react';

const GenerationCard: React.FC<{ title: string, desc: string, icon: string }> = ({ title, desc, icon }) => (
  <div className="bg-[#EFEAE3] p-8 rounded-3xl hover-lift space-y-4 shadow-sm border border-[#E5A23C]/20">
    <div className="text-4xl">{icon}</div>
    <h3 className="text-xl font-bold text-[#2E2A4A]">{title}</h3>
    <p className="text-[#6A6875]">{desc}</p>
  </div>
);

export const Generations: React.FC = () => {
  return (
    <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-[#2E2A4A] mb-12 text-center">Made for every generation</h2>
      <div className="grid md:grid-cols-3 gap-8">
        <GenerationCard 
          icon="👵"
          title="For Elders"
          desc="Simple screens and voice input. No confusing sub-menus or tiny buttons."
        />
        <GenerationCard 
          icon="👨‍👩‍👧"
          title="For Families"
          desc="Peace of mind without constant checking. Just know everyone is okay."
        />
        <GenerationCard 
          icon="🧤"
          title="For Caretakers"
          desc="Awareness without overwhelm. Manage multiple schedules from one dashboard."
        />
      </div>
    </section>
  );
};
