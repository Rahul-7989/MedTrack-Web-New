
import React from 'react';

export const Introduction: React.FC = () => {
  return (
    <section className="py-16 px-6 text-center max-w-4xl mx-auto space-y-6">
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
    </section>
  );
};
