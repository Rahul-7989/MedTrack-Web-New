
import React from 'react';

const TrustCard: React.FC<{ title: string, desc: string }> = ({ title, desc }) => (
  <div className="bg-[#EFEAE3] p-6 rounded-2xl shadow-sm border-l-4 border-[#9DB8AD]">
    <h4 className="font-bold text-[#2E2A4A] mb-2">{title}</h4>
    <p className="text-sm text-[#6A6875]">{desc}</p>
  </div>
);

export const Privacy: React.FC = () => {
  return (
    <section className="py-20 px-6 md:px-12 bg-[#EFEAE3]/50">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-[#2E2A4A]">Privacy & Trust</h2>
          <p className="text-[#6A6875]">Your health data is yours. We just help you use it.</p>
        </div>
        <div className="grid sm:grid-cols-3 gap-6">
          <TrustCard 
            title="Family-Only Data"
            desc="Information stays inside your hub. Encrypted and secured."
          />
          <TrustCard 
            title="No Ads"
            desc="Care is not a business model. Your attention is yours."
          />
          <TrustCard 
            title="You’re in Control"
            desc="Share only what you choose with who you trust."
          />
        </div>
      </div>
    </section>
  );
};
