
import React from 'react';
import { LogoIcon } from './Illustrations';

interface FooterProps {
  onNavigate: (view: 'home' | 'login' | 'signup') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#EFEAE3] py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
        <div className="space-y-4 md:col-span-2">
           <div 
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 cursor-pointer"
           >
            <LogoIcon className="w-10 h-10" />
            <span className="text-xl font-bold text-[#2E2A4A]">MedTrack</span>
          </div>
          <p className="text-[#6A6875] max-w-xs">
            MedTrack — Because “Did you take your medicine?” can sound gentle.
          </p>
        </div>
        
        <div className="space-y-4">
          <h4 className="font-bold text-[#2E2A4A] uppercase text-xs tracking-widest">Links</h4>
          <ul className="space-y-2 text-[#6A6875]">
            <li><button onClick={() => onNavigate('signup')} className="hover:text-[#4FA3B1]">Get Started</button></li>
            <li><button onClick={() => onNavigate('login')} className="hover:text-[#4FA3B1]">Login</button></li>
            <li><a href="#" className="hover:text-[#4FA3B1]">Privacy Policy</a></li>
          </ul>
        </div>
        
        <div className="space-y-4">
          <h4 className="font-bold text-[#2E2A4A] uppercase text-xs tracking-widest">Support</h4>
          <p className="text-[#6A6875]">Need help? We’re human.</p>
          <p className="text-[#4FA3B1] font-medium">support@medtrack.app</p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-[#6A6875]/10 text-center text-[#6A6875] text-sm">
        &copy; {new Date().getFullYear()} MedTrack. Built with love for families.
      </div>
    </footer>
  );
};
