
import React from 'react';
import { FamilyIcon, HeartIcon, UsersIcon, SparklesIcon } from './Illustrations';

const FeatureCard: React.FC<{ icon: React.ReactNode, title: string, desc: string }> = ({ icon, title, desc }) => (
  <div className="bg-[#EFEAE3] p-8 rounded-3xl hover-lift space-y-4 shadow-sm">
    <div className="w-16 h-16 bg-[#F4F1EC] rounded-2xl flex items-center justify-center text-[#4FA3B1]">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-[#2E2A4A]">{title}</h3>
    <p className="text-[#6A6875]">{desc}</p>
  </div>
);

export const WhyMedTrack: React.FC = () => {
  return (
    <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-bold text-[#2E2A4A]">What makes MedTrack different</h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <FeatureCard 
          icon={<FamilyIcon />}
          title="Family First"
          desc="Medicines are managed together, not in isolation."
        />
        <FeatureCard 
          icon={<HeartIcon />}
          title="Gentle Reminders"
          desc="Nudges before panic — always respectful."
        />
        <FeatureCard 
          icon={<UsersIcon />}
          title="Shared Awareness"
          desc="Missed a dose? Loved ones are informed calmly."
        />
        <FeatureCard 
          icon={<SparklesIcon />}
          title="Simple by Design"
          desc="Clear, calm, and easy for every age group."
        />
      </div>
    </section>
  );
};
