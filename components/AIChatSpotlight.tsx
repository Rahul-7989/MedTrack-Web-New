
import React from 'react';
import { ChatBubblesIllustration } from './Illustrations';

export const AIChatSpotlight: React.FC = () => {
  return (
    <section className="py-20 px-6 md:px-12 max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
      <div className="space-y-6">
        <h2 className="text-4xl font-bold text-[#2E2A4A]">Meet your MedTrack AI — CareMate : your quiet helper.</h2>
        <div className="space-y-4">
          <div className="bg-[#EFEAE3] p-4 rounded-2xl border-l-4 border-[#4FA3B1] shadow-sm italic text-[#2E2A4A]">
            “What happens if I miss this dose?”
          </div>
          <div className="bg-[#EFEAE3] p-4 rounded-2xl border-l-4 border-[#E5A23C] shadow-sm italic text-[#2E2A4A]">
            “Before or after food?”
          </div>
          <div className="bg-[#EFEAE3] p-4 rounded-2xl border-l-4 border-[#9DB8AD] shadow-sm italic text-[#2E2A4A]">
            “Why is this tablet important?”
          </div>
        </div>
        <p className="text-[#6A6875] font-medium text-sm">
          Not a doctor. Just a really good listener.
        </p>
      </div>
      
      <div className="flex justify-center">
        <div className="w-full max-w-sm">
          <ChatBubblesIllustration />
        </div>
      </div>
    </section>
  );
};
