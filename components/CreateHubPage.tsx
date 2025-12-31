import React, { useState, useEffect } from 'react';
import { CozyHomeIllustration } from './Illustrations';
import { View, UserInfo } from '../App';
import { auth, db } from '../lib/firebase';
import { doc, setDoc, updateDoc } from 'firebase/firestore';

interface CreateHubPageProps {
  onNavigate: (view: View, data?: UserInfo) => void;
}

const generateHubCode = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Avoid ambiguous chars
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export const CreateHubPage: React.FC<CreateHubPageProps> = ({ onNavigate }) => {
  const [hubName, setHubName] = useState('');
  const [hubCode, setHubCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setHubCode(generateHubCode());
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(hubCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCreateHub = async () => {
    if (!hubName.trim() || !auth.currentUser) return;
    
    setLoading(true);
    try {
      const hubId = `hub_${Date.now()}`;
      // Create Hub Document
      await setDoc(doc(db, "hubs", hubId), {
        name: hubName,
        hubCode: hubCode,
        creatorId: auth.currentUser.uid,
        createdAt: new Date().toISOString(),
        members: [auth.currentUser.uid]
      });

      // Update User with HubId
      await updateDoc(doc(db, "users", auth.currentUser.uid), {
        hubId: hubId
      });

      onNavigate('dashboard', { name: '', gender: null, hubId: hubId });
    } catch (err) {
      console.error(err);
      alert("Failed to create hub. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#F4F1EC] flex flex-col items-center py-20 px-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Intro Section */}
      <div className="text-center space-y-8 mb-16 max-w-2xl">
        <div className="flex justify-center bg-white/30 rounded-[3rem] p-8 shadow-sm">
          <CozyHomeIllustration />
        </div>
        <div className="space-y-3">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2E2A4A] tracking-tight">
            Create your Family Hub 🏠
          </h1>
          <p className="text-xl text-[#6A6875]">
            This will be your shared space for medication care.
          </p>
          <p className="text-sm text-[#4FA3B1] font-bold uppercase tracking-widest">
            You can invite others in just a moment.
          </p>
        </div>
      </div>

      {/* Hub Details Form */}
      <div className="w-full max-w-xl bg-[#EFEAE3] p-10 md:p-14 rounded-[3rem] shadow-sm space-y-12 border border-[#2E2A4A]/5">
        <div className="space-y-8">
          <div className="space-y-4">
            <label className="text-sm font-bold text-[#2E2A4A] px-2 uppercase tracking-wider">
              Name your hub
            </label>
            <input 
              type="text" 
              value={hubName}
              onChange={(e) => setHubName(e.target.value)}
              placeholder="e.g. The Smith Family, Grandma's Team"
              className="w-full bg-[#F4F1EC] border-2 border-transparent rounded-2xl px-6 py-5 text-xl text-[#2E2A4A] placeholder-[#6A6875]/40 focus:border-[#4FA3B1]/30 focus:outline-none transition-all shadow-sm"
            />
          </div>

          {/* Hub Code Preview */}
          <div className="space-y-4">
            <label className="text-sm font-bold text-[#2E2A4A] px-2 uppercase tracking-wider">
              Your Hub Code
            </label>
            <div className="bg-[#F4F1EC] p-6 rounded-2xl flex items-center justify-between border-2 border-[#E5A23C]/20 shadow-inner group">
              <span className="text-3xl font-black text-[#E5A23C] tracking-widest font-mono">
                {hubCode}
              </span>
              <button 
                onClick={handleCopy}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-sm
                  ${copied 
                    ? 'bg-[#9DB8AD] text-white' 
                    : 'bg-white text-[#4FA3B1] hover:bg-[#4FA3B1] hover:text-white'
                  }`}
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <p className="text-xs text-[#6A6875] px-2 font-medium">
              Share this code to invite family members.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <button 
            onClick={handleCreateHub}
            disabled={!hubName.trim() || loading}
            className="w-full bg-[#4FA3B1] text-white py-6 rounded-3xl font-bold text-2xl hover-lift shadow-xl shadow-[#4FA3B1]/10 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            {loading ? 'Creating Hub...' : 'Create my Family Hub'}
          </button>
          
          <button 
            onClick={() => onNavigate('hub-selection')}
            className="w-full text-[#6A6875] font-bold text-lg hover:text-[#2E2A4A] transition-colors"
          >
            Go back
          </button>
        </div>
      </div>
    </div>
  );
};