
import React from 'react';
import { WaitingIllustration } from './Illustrations';
import { View } from '../App';
import { auth, db } from '../lib/firebase';
import { updateDoc, doc, arrayRemove } from 'firebase/firestore';

interface WaitingApprovalPageProps {
  onNavigate: (view: View) => void;
  pendingHubId?: string | null;
}

export const WaitingApprovalPage: React.FC<WaitingApprovalPageProps> = ({ onNavigate, pendingHubId }) => {
  const handleCancel = async () => {
    if (!auth.currentUser || !pendingHubId) return;
    try {
      await updateDoc(doc(db, "hubs", pendingHubId), {
        pendingMembers: arrayRemove(auth.currentUser.uid)
      });
      await updateDoc(doc(db, "users", auth.currentUser.uid), {
        pendingHubId: null
      });
      onNavigate('hub-selection');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#F4F1EC] flex flex-col items-center justify-center py-20 px-6 animate-in fade-in zoom-in-95 duration-700">
      <div className="w-full max-w-lg bg-[#EFEAE3] p-12 md:p-16 rounded-[4rem] shadow-sm text-center space-y-12 border border-[#2E2A4A]/5">
        
        <div className="flex justify-center">
          <div className="bg-white/40 p-10 rounded-[3rem] shadow-sm animate-pulse duration-[3000ms]">
            <WaitingIllustration />
          </div>
        </div>

        <div className="space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold text-[#2E2A4A] tracking-tight">
            Waiting for approval ⏳
          </h1>
          <div className="space-y-3">
            <p className="text-[#6A6875] text-lg leading-relaxed">
              We’ve sent a request to the hub creator.
              <br />You’ll be added as soon as they approve.
            </p>
            <p className="text-[#4FA3B1] font-bold italic opacity-80">
              You can keep this page open — we’ll take you there automatically.
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-[#6A6875]/10">
          <button 
            onClick={handleCancel}
            className="text-[#E5A23C] font-black text-sm uppercase tracking-[0.2em] hover:text-[#2E2A4A] transition-colors"
          >
            Cancel Request
          </button>
        </div>
      </div>

      <div className="mt-12 text-center max-w-xs opacity-40">
        <p className="text-[10px] font-black text-[#6A6875] uppercase tracking-widest leading-relaxed">
          Safety First: Hub members must be approved by the hub creator.
        </p>
      </div>
    </div>
  );
};
