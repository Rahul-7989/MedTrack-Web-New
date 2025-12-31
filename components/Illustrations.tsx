
import React from 'react';

// Common Rounded Styles
const colors = {
  teal: "#4FA3B1",
  amber: "#E5A23C",
  sage: "#9DB8AD",
  indigo: "#2E2A4A",
  sand: "#EFEAE3",
  cream: "#F4F1EC"
};

/**
 * CareMate Chat Icon: A gentle symbolic robot head.
 * Recreation of the provided image: yellow head, dark faceplate, cyan eyes, teal headphones.
 */
export const CareMateChatIcon: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Headphones Band */}
    <path 
      d="M15 50 C15 35 30 18 50 18 C70 18 85 35 85 50" 
      stroke="#3A7E8A" 
      strokeWidth="10" 
      strokeLinecap="round" 
    />
    
    {/* Head Base (Yellow) */}
    <path 
      d="M50 25 C30 25 20 40 20 60 C20 80 35 90 50 90 C65 90 80 80 80 60 C80 40 70 25 50 25Z" 
      fill="#FDFD96" 
    />
    
    {/* Faceplate (Dark) */}
    <rect x="25" y="45" width="50" height="30" rx="15" fill="#2E2A4A" />
    
    {/* Headphones Cushions (Teal) */}
    <rect x="8" y="45" width="14" height="28" rx="7" fill="#3A7E8A" />
    <rect x="78" y="45" width="14" height="28" rx="7" fill="#3A7E8A" />
    
    {/* Smiling Eyes (Cyan Arcs) */}
    <path 
      d="M35 58 Q42 50 49 58" 
      stroke="#80DEEA" 
      strokeWidth="5" 
      strokeLinecap="round" 
    />
    <path 
      d="M51 58 Q58 50 65 58" 
      stroke="#80DEEA" 
      strokeWidth="5" 
      strokeLinecap="round" 
    />
    
    {/* Highlight for depth */}
    <path 
      d="M35 30 Q50 28 65 30" 
      stroke="white" 
      strokeWidth="4" 
      strokeLinecap="round" 
      opacity="0.3"
    />
  </svg>
);

/**
 * Custom LogoIcon based on the user-provided image.
 */
export const LogoIcon: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <g transform="translate(42, 45) rotate(-45)">
      <rect x="-20" y="-45" width="40" height="90" rx="20" stroke={colors.teal} strokeWidth="10" />
      <line x1="-20" y1="0" x2="20" y2="0" stroke={colors.teal} strokeWidth="10" />
    </g>
    <path d="M38 72 L58 92 L96 52" stroke={colors.amber} strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const MicIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    <line x1="12" y1="19" x2="12" y2="23" />
    <line x1="8" y1="23" x2="16" y2="23" />
  </svg>
);

export const VoiceProcessingIllustration = () => (
  <svg viewBox="0 0 200 160" fill="none" className="w-48 h-auto">
    <circle cx="100" cy="80" r="40" fill={colors.teal} opacity="0.1">
      <animate attributeName="r" values="40;45;40" dur="2s" repeatCount="indefinite" />
    </circle>
    <path d="M70 80 Q85 60 100 80 T130 80" stroke={colors.teal} strokeWidth="4" strokeLinecap="round">
      <animate attributeName="d" values="M70 80 Q85 60 100 80 T130 80;M70 80 Q85 100 100 80 T130 80;M70 80 Q85 60 100 80 T130 80" dur="1s" repeatCount="indefinite" />
    </path>
    <path d="M80 95 Q100 75 120 95" stroke={colors.amber} strokeWidth="3" strokeLinecap="round" opacity="0.6">
      <animate attributeName="d" values="M80 95 Q100 75 120 95;M80 95 Q100 115 120 95;M80 95 Q100 75 120 95" dur="1.5s" repeatCount="indefinite" />
    </path>
  </svg>
);

export const MedicationIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={className}>
    <path d="M12 2L12 22" strokeLinecap="round" />
    <rect x="7" y="2" width="10" height="20" rx="5" strokeLinecap="round" />
    <path d="M7 12H17" strokeLinecap="round" />
  </svg>
);

export const PillIllustration: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    <g transform="rotate(-45, 50, 50)">
      <rect x="25" y="10" width="50" height="80" rx="25" fill={colors.teal} />
      <rect x="25" y="50" width="50" height="40" rx="0 0 25 25" fill={colors.sage} opacity="0.3" />
      <line x1="25" y1="50" x2="75" y2="50" stroke="white" strokeWidth="4" opacity="0.5" />
    </g>
  </svg>
);

export const EmptyShelfIllustration = () => (
  <svg viewBox="0 0 240 200" fill="none" className="w-64 h-auto opacity-40">
    <path d="M20 160 H220" stroke={colors.indigo} strokeWidth="4" strokeLinecap="round" />
    <path d="M40 100 H200" stroke={colors.indigo} strokeWidth="4" strokeLinecap="round" />
    <path d="M60 40 H180" stroke={colors.indigo} strokeWidth="4" strokeLinecap="round" />
    <rect x="100" y="70" width="15" height="30" rx="4" fill={colors.teal} opacity="0.2" />
    <circle cx="140" cy="85" r="8" fill={colors.amber} opacity="0.2" />
  </svg>
);

const AvatarBase: React.FC<{ className?: string, bg: string, children: React.ReactNode }> = ({ className, bg, children }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    <rect width="100" height="100" fill={bg} rx="30" />
    <circle cx="50" cy="40" r="22" fill={colors.indigo} opacity="0.1" />
    {children}
  </svg>
);

export const MaleAvatar: React.FC<{ className?: string }> = ({ className }) => (
  <AvatarBase className={className} bg="#DDE5E7">
    <path d="M50 18 C40 18 32 26 32 36 L32 44 C32 54 40 62 50 62 C60 62 68 54 68 44 L68 36 C68 26 60 18 50 18 Z" fill="#F3D5C0" />
    <path d="M50 16 C38 16 30 24 30 34 L30 40 L70 40 L70 34 C70 24 62 16 50 16 Z" fill={colors.indigo} />
    <rect x="20" y="72" width="60" height="40" rx="15" fill={colors.teal} />
  </AvatarBase>
);

export const MaleAvatar1: React.FC<{ className?: string }> = ({ className }) => (
  <AvatarBase className={className} bg="#E5EDF0">
    <path d="M50 18 C40 18 32 26 32 36 L32 44 C32 54 40 62 50 62 C60 62 68 54 68 44 L68 36 C68 26 60 18 50 18 Z" fill="#EAD7C6" />
    <path d="M30 35 Q50 10 70 35" stroke={colors.indigo} strokeWidth="12" strokeLinecap="round" fill="none" />
    <rect x="42" y="38" width="16" height="4" rx="2" fill={colors.indigo} />
    <rect x="20" y="72" width="60" height="40" rx="15" fill={colors.sage} />
  </AvatarBase>
);

export const MaleAvatar2: React.FC<{ className?: string }> = ({ className }) => (
  <AvatarBase className={className} bg="#EFEAE3">
    <path d="M50 18 C40 18 32 26 32 36 L32 44 C32 54 40 62 50 62 C60 62 68 54 68 44 L68 36 C68 26 60 18 50 18 Z" fill="#F3D5C0" />
    <circle cx="50" cy="18" r="14" fill="#D1D5DB" />
    <rect x="20" y="72" width="60" height="40" rx="15" fill={colors.amber} />
    <path d="M40 45 Q50 55 60 45" stroke={colors.indigo} strokeWidth="2" strokeLinecap="round" fill="none" />
  </AvatarBase>
);

export const MaleAvatar3: React.FC<{ className?: string }> = ({ className }) => (
  <AvatarBase className={className} bg="#F4F1EC">
    <path d="M50 18 C40 18 32 26 32 36 L32 44 C32 54 40 62 50 62 C60 62 68 54 68 44 L68 36 C68 26 60 18 50 18 Z" fill="#D2B48C" />
    <path d="M35 15 L65 15 L75 35 L25 35 Z" fill={colors.teal} />
    <rect x="20" y="72" width="60" height="40" rx="15" fill={colors.indigo} opacity="0.4" />
  </AvatarBase>
);

export const MaleAvatar4: React.FC<{ className?: string }> = ({ className }) => (
  <AvatarBase className={className} bg="#DEE5E7">
    <path d="M50 18 C40 18 32 26 32 36 L32 44 C32 54 40 62 50 62 C60 62 68 54 68 44 L68 36 C68 26 60 18 50 18 Z" fill="#F3D5C0" />
    <path d="M30 30 Q50 20 70 30" stroke={colors.amber} strokeWidth="8" strokeLinecap="round" fill="none" />
    <rect x="35" y="42" width="12" height="12" rx="6" stroke={colors.teal} strokeWidth="2" fill="none" />
    <rect x="53" y="42" width="12" height="12" rx="6" stroke={colors.teal} strokeWidth="2" fill="none" />
    <line x1="47" y1="48" x2="53" y2="48" stroke={colors.teal} strokeWidth="2" />
    <rect x="20" y="72" width="60" height="40" rx="15" fill={colors.teal} />
  </AvatarBase>
);

export const MaleAvatar5: React.FC<{ className?: string }> = ({ className }) => (
  <AvatarBase className={className} bg="#E5EDF0">
    <path d="M50 18 C40 18 32 26 32 36 L32 44 C32 54 40 62 50 62 C60 62 68 54 68 44 L68 36 C68 26 60 18 50 18 Z" fill="#EAD7C6" />
    <path d="M32 55 Q50 70 68 55" fill={colors.indigo} opacity="0.6" />
    <rect x="20" y="72" width="60" height="40" rx="15" fill={colors.sage} />
  </AvatarBase>
);

export const MaleAvatar6: React.FC<{ className?: string }> = ({ className }) => (
  <AvatarBase className={className} bg="#F4F1EC">
    <path d="M50 18 C40 18 32 26 32 36 L32 44 C32 54 40 62 50 62 C60 62 68 54 68 44 L68 36 C68 26 60 18 50 18 Z" fill="#F3D5C0" />
    <path d="M30 40 L70 40 L60 15 L40 15 Z" fill={colors.amber} />
    <rect x="20" y="72" width="60" height="40" rx="15" fill={colors.indigo} opacity="0.2" />
  </AvatarBase>
);

export const MaleAvatar7: React.FC<{ className?: string }> = ({ className }) => (
  <AvatarBase className={className} bg="#DDE5E7">
    <path d="M50 18 C40 18 32 26 32 36 L32 44 C32 54 40 62 50 62 C60 62 68 54 68 44 L68 36 C68 26 60 18 50 18 Z" fill="#EAD7C6" />
    <rect x="30" y="16" width="40" height="15" rx="7" fill={colors.indigo} />
    <rect x="20" y="72" width="60" height="40" rx="15" fill={colors.teal} />
  </AvatarBase>
);

export const MaleAvatar8: React.FC<{ className?: string }> = ({ className }) => (
  <AvatarBase className={className} bg="#F7EBE8">
    <path d="M50 18 C40 18 32 26 32 36 L32 44 C32 54 40 62 50 62 C60 62 68 54 68 44 L68 36 C68 26 60 18 50 18 Z" fill="#F3D5C0" />
    <circle cx="35" cy="30" r="8" fill={colors.indigo} />
    <circle cx="50" cy="22" r="8" fill={colors.indigo} />
    <circle cx="65" cy="30" r="8" fill={colors.indigo} />
    <rect x="20" y="72" width="60" height="40" rx="15" fill={colors.sage} />
  </AvatarBase>
);

export const MaleAvatar9: React.FC<{ className?: string }> = ({ className }) => (
  <AvatarBase className={className} bg="#EFEAE3">
    <path d="M50 18 C40 18 32 26 32 36 L32 44 C32 54 40 62 50 62 C60 62 68 54 68 44 L68 36 C68 26 60 18 50 18 Z" fill="#D2B48C" />
    <rect x="35" y="15" width="30" height="10" rx="5" fill={colors.amber} />
    <rect x="20" y="72" width="60" height="40" rx="15" fill={colors.amber} opacity="0.6" />
  </AvatarBase>
);

export const MaleAvatar10: React.FC<{ className?: string }> = ({ className }) => (
  <AvatarBase className={className} bg="#DDE5E7">
    <path d="M50 30 C42 30 35 36 35 44 L35 50 C35 58 42 65 50 65 C58 65 65 58 65 50 L65 44 C65 36 58 30 50 30 Z" fill="#F3D5C0" />
    <path d="M50 28 C40 28 32 35 32 45 L68 45 C68 35 60 28 50 28 Z" fill={colors.indigo} />
    <rect x="25" y="75" width="50" height="30" rx="15" fill={colors.teal} />
  </AvatarBase>
);

export const FemaleAvatar: React.FC<{ className?: string }> = ({ className }) => (
  <AvatarBase className={className} bg="#F7EBE8">
    <path d="M50 18 C40 18 32 26 32 36 L32 44 C32 54 40 62 50 62 C60 62 68 54 68 44 L68 36 C68 26 60 18 50 18 Z" fill="#F8E2D2" />
    <path d="M50 14 C35 14 25 24 25 38 L25 55 L75 55 L75 38 C75 24 65 14 50 14 Z" fill={colors.amber} />
    <rect x="20" y="72" width="60" height="40" rx="15" fill={colors.sage} />
  </AvatarBase>
);

export const FemaleAvatar1: React.FC<{ className?: string }> = ({ className }) => (
  <AvatarBase className={className} bg="#EFEAE3">
    <path d="M50 18 C40 18 32 26 32 36 L32 44 C32 54 40 62 50 62 C60 62 68 54 68 44 L68 36 C68 26 60 18 50 18 Z" fill="#EAD7C6" />
    <circle cx="50" cy="14" r="12" fill="#D1D5DB" />
    <path d="M30 14 Q50 10 70 14" stroke="#D1D5DB" strokeWidth="8" strokeLinecap="round" fill="none" />
    <rect x="20" y="72" width="60" height="40" rx="15" fill={colors.teal} />
  </AvatarBase>
);

export const FemaleAvatar2: React.FC<{ className?: string }> = ({ className }) => (
  <AvatarBase className={className} bg="#F4F1EC">
    <path d="M50 18 C40 18 32 26 32 36 L32 44 C32 54 40 62 50 62 C60 62 68 54 68 44 L68 36 C68 26 60 18 50 18 Z" fill="#F8E2D2" />
    <circle cx="40" cy="45" r="5" stroke={colors.amber} strokeWidth="2" fill="none" />
    <circle cx="60" cy="45" r="5" stroke={colors.amber} strokeWidth="2" fill="none" />
    <line x1="45" y1="45" x2="55" y2="45" stroke={colors.amber} strokeWidth="2" />
    <path d="M25 30 Q50 15 75 30" stroke={colors.indigo} strokeWidth="12" strokeLinecap="round" fill="none" />
    <rect x="20" y="72" width="60" height="40" rx="15" fill={colors.amber} />
  </AvatarBase>
);

export const FemaleAvatar3: React.FC<{ className?: string }> = ({ className }) => (
  <AvatarBase className={className} bg="#DDE5E7">
    <path d="M50 18 C40 18 32 26 32 36 L32 44 C32 54 40 62 50 62 C60 62 68 54 68 44 L68 36 C68 26 60 18 50 18 Z" fill="#F8E2D2" />
    <path d="M25 15 L75 15 L85 65 L15 65 Z" fill={colors.sage} opacity="0.6" />
    <path d="M25 15 Q50 10 75 15" stroke={colors.sage} strokeWidth="4" strokeLinecap="round" fill="none" />
    <rect x="20" y="72" width="60" height="40" rx="15" fill={colors.teal} />
  </AvatarBase>
);

export const FemaleAvatar4: React.FC<{ className?: string }> = ({ className }) => (
  <AvatarBase className={className} bg="#F7EBE8">
    <path d="M50 18 C40 18 32 26 32 36 L32 44 C32 54 40 62 50 62 C60 62 68 54 68 44 L68 36 C68 26 60 18 50 18 Z" fill="#F8E2D2" />
    <path d="M30 18 C25 18 20 25 20 35 L20 60 L80 60 L80 35 C80 25 75 18 70 18 Z" fill={colors.indigo} opacity="0.8" />
    <rect x="20" y="72" width="60" height="40" rx="15" fill={colors.sage} />
  </AvatarBase>
);

export const FemaleAvatar5: React.FC<{ className?: string }> = ({ className }) => (
  <AvatarBase className={className} bg="#EFEAE3">
    <path d="M50 18 C40 18 32 26 32 36 L32 44 C32 54 40 62 50 62 C60 62 68 54 68 44 L68 36 C68 26 60 18 50 18 Z" fill="#EAD7C6" />
    <circle cx="35" cy="25" r="8" fill={colors.indigo} />
    <circle cx="50" cy="18" r="8" fill={colors.indigo} />
    <circle cx="65" cy="25" r="8" fill={colors.indigo} />
    <rect x="20" y="72" width="60" height="40" rx="15" fill={colors.amber} />
  </AvatarBase>
);

export const FemaleAvatar6: React.FC<{ className?: string }> = ({ className }) => (
  <AvatarBase className={className} bg="#F4F1EC">
    <path d="M50 18 C40 18 32 26 32 36 L32 44 C32 54 40 62 50 62 C60 62 68 54 68 44 L68 36 C68 26 60 18 50 18 Z" fill="#F8E2D2" />
    <path d="M30 30 Q50 20 70 30" stroke={colors.amber} strokeWidth="10" strokeLinecap="round" fill="none" />
    <rect x="20" y="72" width="60" height="40" rx="15" fill={colors.teal} />
  </AvatarBase>
);

export const FemaleAvatar7: React.FC<{ className?: string }> = ({ className }) => (
  <AvatarBase className={className} bg="#DEE5E7">
    <path d="M50 18 C40 18 32 26 32 36 L32 44 C32 54 40 62 50 62 C60 62 68 54 68 44 L68 36 C68 26 60 18 50 18 Z" fill="#F8E2D2" />
    <rect x="20" y="75" width="60" height="15" rx="7" fill={colors.sage} />
    <path d="M25 35 Q50 10 75 35" stroke={colors.sage} strokeWidth="8" strokeLinecap="round" fill="none" />
    <rect x="20" y="72" width="60" height="40" rx="15" fill={colors.indigo} opacity="0.3" />
  </AvatarBase>
);

export const FemaleAvatar8: React.FC<{ className?: string }> = ({ className }) => (
  <AvatarBase className={className} bg="#F7EBE8">
    <path d="M50 18 C40 18 32 26 32 36 L32 44 C32 54 40 62 50 62 C60 62 68 54 68 44 L68 36 C68 26 60 18 50 18 Z" fill="#F8E2D2" />
    <path d="M25 40 Q50 0 75 40" stroke={colors.indigo} strokeWidth="12" strokeLinecap="round" fill="none" />
    <rect x="20" y="72" width="60" height="40" rx="15" fill={colors.teal} />
  </AvatarBase>
);

export const FemaleAvatar9: React.FC<{ className?: string }> = ({ className }) => (
  <AvatarBase className={className} bg="#F4F1EC">
    <path d="M50 18 C40 18 32 26 32 36 L32 44 C32 54 40 62 50 62 C60 62 68 54 68 44 L68 36 C68 26 60 18 50 18 Z" fill="#EAD7C6" />
    <rect x="40" y="10" width="20" height="10" rx="5" fill={colors.amber} />
    <rect x="20" y="72" width="60" height="40" rx="15" fill={colors.amber} opacity="0.4" />
  </AvatarBase>
);

export const FemaleAvatar10: React.FC<{ className?: string }> = ({ className }) => (
  <AvatarBase className={className} bg="#F7EBE8">
    <path d="M50 30 C42 30 35 36 35 44 L35 50 C35 58 42 65 50 65 C58 65 65 58 65 50 L65 44 C65 36 58 30 50 30 Z" fill="#F8E2D2" />
    <circle cx="28" cy="45" r="10" fill={colors.amber} />
    <circle cx="72" cy="45" r="10" fill={colors.amber} />
    <path d="M35 35 Q50 25 65 35" stroke={colors.amber} strokeWidth="6" strokeLinecap="round" fill="none" />
    <rect x="25" y="75" width="50" height="30" rx="15" fill={colors.sage} />
  </AvatarBase>
);

export const NeutralAvatar: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    <rect width="100" height="100" fill={colors.sand} rx="30" />
    <circle cx="50" cy="40" r="22" fill={colors.indigo} opacity="0.1" />
    <path d="M50 18 C40 18 32 26 32 36 L32 44 C32 54 40 62 50 62 C60 62 68 54 68 44 L68 36 C68 26 60 18 50 18 Z" fill="#EAD7C6" />
    <path d="M30 30 Q50 10 70 30" stroke={colors.indigo} strokeWidth="8" strokeLinecap="round" />
    <rect x="20" y="72" width="60" height="40" rx="15" fill={colors.indigo} opacity="0.3" />
  </svg>
);

export const MALE_AVATARS = [
  MaleAvatar, MaleAvatar1, MaleAvatar2, MaleAvatar3, MaleAvatar4, 
  MaleAvatar5, MaleAvatar6, MaleAvatar7, MaleAvatar8, MaleAvatar9, MaleAvatar10
];

export const FEMALE_AVATARS = [
  FemaleAvatar, FemaleAvatar1, FemaleAvatar2, FemaleAvatar3, FemaleAvatar4, 
  FemaleAvatar5, FemaleAvatar6, FemaleAvatar7, FemaleAvatar8, FemaleAvatar9, FemaleAvatar10
];

export const AvatarRenderer: React.FC<{ gender: string | null, index?: number, className?: string }> = ({ gender, index = 0, className }) => {
  const safeIndex = Math.max(0, Math.min(index, 10));
  if (gender === 'male') {
    const Component = MALE_AVATARS[safeIndex];
    return <Component className={className} />;
  }
  if (gender === 'female') {
    const Component = FEMALE_AVATARS[safeIndex];
    return <Component className={className} />;
  }
  return <NeutralAvatar className={className} />;
};

export const EmptyStateIllustration = () => (
  <svg viewBox="0 0 240 200" fill="none" className="w-64 h-auto drop-shadow-sm">
    <rect x="30" y="50" width="180" height="130" rx="24" fill={colors.sand} stroke={colors.indigo} strokeWidth="3" />
    <path d="M30 80 H210" stroke={colors.indigo} strokeWidth="2" strokeDasharray="6 8" opacity="0.3" />
    <path d="M30 110 H210" stroke={colors.indigo} strokeWidth="2" strokeDasharray="6 8" opacity="0.3" />
    <path d="M30 140 H210" stroke={colors.indigo} strokeWidth="2" strokeDasharray="6 8" opacity="0.3" />
    <g className="animate-bounce" style={{ animationDuration: '3s' }}>
      <rect x="160" y="20" width="20" height="50" rx="10" fill={colors.teal} />
      <path d="M160 45 H180" stroke="#F4F1EC" strokeWidth="2" />
      <circle cx="166" cy="32" r="1.5" fill="white" />
      <circle cx="174" cy="32" r="1.5" fill="white" />
    </g>
    <circle cx="70" cy="70" r="12" fill={colors.amber} opacity="0.6" />
    <circle cx="105" cy="70" r="12" fill={colors.sage} opacity="0.6" />
    <path d="M120 155c0-5 5-10 10-10s10 5 10 10c0 10-10 15-10 15s-10-5-10-15z" fill={colors.amber} opacity="0.4" />
  </svg>
);

export const WaitingIllustration = () => (
  <svg viewBox="0 0 200 160" fill="none" className="w-48 h-auto">
    {/* Calm Person Sitting */}
    <rect x="70" y="80" width="60" height="50" rx="20" fill={colors.sage} opacity="0.3" />
    <circle cx="100" cy="65" r="20" fill={colors.sage} />
    <path d="M85 65 Q100 75 115 65" stroke="white" strokeWidth="3" strokeLinecap="round" />
    {/* Floating Elements */}
    <g className="animate-bounce" style={{ animationDuration: '4s' }}>
      <circle cx="160" cy="40" r="15" fill={colors.teal} />
      <path d="M152 40h16" stroke="white" strokeWidth="3" strokeLinecap="round" />
    </g>
    <g className="animate-pulse" style={{ animationDuration: '5s' }}>
      <circle cx="40" cy="50" r="12" fill={colors.amber} opacity="0.4" />
      <path d="M40 45v10" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </g>
    {/* Door/Home Background */}
    <path d="M40 140 H160" stroke={colors.indigo} strokeWidth="2" opacity="0.1" />
  </svg>
);

export const DeclineIllustration = () => (
  <svg viewBox="0 0 200 160" fill="none" className="w-48 h-auto">
    {/* Character with gentle expression */}
    <circle cx="100" cy="60" r="25" fill={colors.sage} opacity="0.2" />
    <circle cx="100" cy="55" r="18" fill={colors.sage} />
    <path d="M92 55 Q100 62 108 55" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
    {/* Gentle Shield/Pause Symbol */}
    <g className="animate-pulse" style={{ animationDuration: '4s' }}>
      <path d="M100 90 L130 100 V130 Q100 150 70 130 V100 Z" fill={colors.teal} opacity="0.15" />
      <path d="M100 90 L130 100 V130 Q100 150 70 130 V100 Z" stroke={colors.teal} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="100" cy="120" r="10" fill="white" opacity="0.5" />
      <rect x="97" y="114" width="6" height="12" rx="2" fill={colors.teal} />
    </g>
    <path d="M60 150 H140" stroke={colors.indigo} strokeWidth="2" opacity="0.1" strokeLinecap="round" />
  </svg>
);

export const RequestDeclinedIllustration = () => (
  <svg viewBox="0 0 200 160" fill="none" className="w-48 h-auto">
    {/* Character standing thoughtfully */}
    <rect x="85" y="80" width="30" height="50" rx="15" fill={colors.sage} opacity="0.3" />
    <circle cx="100" cy="65" r="20" fill={colors.sage} />
    <path d="M95 65 Q100 70 105 65" stroke="white" strokeWidth="2" strokeLinecap="round" />
    
    {/* Gentle Pause/Envelope Symbol */}
    <g className="animate-bounce" style={{ animationDuration: '5s' }}>
      <rect x="130" y="40" width="40" height="30" rx="8" fill={colors.sand} stroke={colors.amber} strokeWidth="2" />
      <path d="M130 40L150 55L170 40" stroke={colors.amber} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="175" cy="40" r="10" fill={colors.amber} />
      <path d="M175 35v10" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
    </g>
    
    <path d="M50 140 H150" stroke={colors.indigo} strokeWidth="2" opacity="0.1" strokeLinecap="round" />
  </svg>
);

export const CreateHubIllustration = () => (
  <svg viewBox="0 0 200 160" fill="none" className="w-48 h-auto">
    <rect x="50" y="60" width="100" height="80" rx="15" fill={colors.teal} />
    <path d="M40 70L100 20L160 70" stroke={colors.teal} strokeWidth="12" strokeLinecap="round" />
    <rect x="85" y="100" width="30" height="40" rx="5" fill="white" opacity="0.4" />
    <path d="M160 30C160 25 155 20 150 20C145 20 140 25 140 30C140 40 160 55 160 55C160 55 180 40 180 30C180 25 175 20 170 20C165 20 160 25 160 30Z" fill={colors.amber} />
    <circle cx="70" cy="90" r="8" fill="white" opacity="0.6" />
    <circle cx="100" cy="80" r="10" fill="white" opacity="0.6" />
    <circle cx="130" cy="90" r="8" fill="white" opacity="0.6" />
  </svg>
);

export const CozyHomeIllustration = () => (
  <svg viewBox="0 0 240 180" fill="none" className="w-64 h-auto">
    <rect x="40" y="70" width="160" height="100" rx="20" fill={colors.teal} opacity="0.2" />
    <rect x="60" y="80" width="120" height="90" rx="15" fill={colors.teal} />
    <path d="M40 90L120 20L200 90" stroke={colors.teal} strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="80" y="100" width="25" height="25" rx="4" fill="white" opacity="0.4" />
    <rect x="135" y="100" width="25" height="25" rx="4" fill="white" opacity="0.4" />
    <rect x="105" y="135" width="30" height="35" rx="4" fill={colors.sand} />
    <circle cx="130" cy="155" r="2" fill={colors.indigo} />
    <g opacity="0.6">
      <path d="M70 170 L70 155 Q70 145 80 145 Q90 145 90 155 L90 170" fill="white" />
      <circle cx="80" cy="140" r="8" fill="white" />
      <path d="M150 170 L150 150 Q150 140 160 140 Q170 140 170 150 L170 170" fill="white" />
      <circle cx="160" cy="135" r="8" fill="white" />
    </g>
    <path d="M200 40C200 35 195 30 190 30C185 30 180 35 180 40C180 50 200 65 200 65C200 65 220 50 220 40C220 35 215 30 210 30C205 30 200 35 200 40Z" fill={colors.amber} />
    <path d="M30 60C30 57 27 54 24 54C21 54 18 57 18 60C18 66 30 75 30 75C30 75 42 66 42 60C42 57 39 54 36 54C33 54 30 57 30 60Z" fill={colors.sage} />
  </svg>
);

export const JoinHubIllustration = () => (
  <svg viewBox="0 0 200 160" fill="none" className="w-48 h-auto">
    <circle cx="60" cy="80" r="30" fill={colors.amber} opacity="0.2" />
    <circle cx="140" cy="80" r="40" fill={colors.teal} opacity="0.2" />
    <path d="M85 95Q100 110 115 95" stroke={colors.indigo} strokeWidth="8" strokeLinecap="round" fill="none" />
    <g transform="translate(100, 80) rotate(45)">
      <rect x="-25" y="-10" width="50" height="20" rx="10" stroke={colors.amber} strokeWidth="6" />
    </g>
    <circle cx="50" cy="70" r="12" fill={colors.amber} />
    <circle cx="150" cy="65" r="15" fill={colors.teal} />
    <rect x="110" y="110" width="40" height="25" rx="5" fill={colors.sand} />
    <text x="118" y="128" fill={colors.indigo} style={{fontSize: '10px', fontWeight: 'bold'}}>#HUB</text>
  </svg>
);

export const LoginIllustration = () => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-48 h-48 drop-shadow-md">
    <circle cx="100" cy="100" r="90" fill={colors.sage} opacity="0.1" />
    <rect x="60" y="50" width="80" height="100" rx="40" fill={colors.teal} />
    <circle cx="85" cy="80" r="5" fill="white" />
    <circle cx="115" cy="80" r="5" fill="white" />
    <path d="M80 110Q100 130 120 110" stroke="white" strokeWidth="6" strokeLinecap="round" />
    <g transform="translate(140, 40) rotate(15)">
      <rect width="50" height="70" rx="15" fill="white" />
      <rect x="10" y="10" width="30" height="20" rx="5" fill={colors.amber} opacity="0.4" />
      <rect x="10" y="40" width="20" height="4" rx="2" fill={colors.indigo} opacity="0.1" />
      <rect x="10" y="50" width="30" height="4" rx="2" fill={colors.indigo} opacity="0.1" />
    </g>
  </svg>
);

export const GetStartedIllustration = () => (
  <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-sm px-10">
    <circle cx="150" cy="140" r="40" fill={colors.teal} />
    <circle cx="210" cy="150" r="45" fill={colors.amber} />
    <circle cx="260" cy="170" r="30" fill={colors.sage} />
    <g transform="translate(50, 40) rotate(-10)">
       <rect width="40" height="40" rx="10" fill={colors.sand} stroke={colors.teal} strokeWidth="2" />
       <path d="M12 20h16M20 12v16" stroke={colors.teal} strokeWidth="3" strokeLinecap="round" />
    </g>
    <g transform="translate(300, 50) rotate(15)">
       <rect width="45" height="45" rx="12" fill={colors.sand} stroke={colors.amber} strokeWidth="2" />
       <path d="M15 22l5 5l10-10" stroke={colors.amber} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    <g transform="translate(320, 160)">
       <circle r="15" fill={colors.sage} opacity="0.5" />
       <path d="M-5 0h10M0 -5v10" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </g>
  </svg>
);

export const FamilyIllustration = () => (
  <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
    <rect x="50" y="200" width="300" height="100" rx="40" fill={colors.sage} opacity="0.3" />
    <circle cx="120" cy="150" r="40" fill={colors.amber} />
    <path d="M120 190V250" stroke={colors.indigo} strokeWidth="20" strokeLinecap="round" />
    <path d="M110 140Q120 130 130 140" stroke={colors.indigo} strokeWidth="4" strokeLinecap="round" />
    <circle cx="200" cy="130" r="45" fill={colors.teal} />
    <path d="M200 175V250" stroke={colors.indigo} strokeWidth="25" strokeLinecap="round" />
    <circle cx="280" cy="170" r="30" fill={colors.sage} />
    <path d="M280 200V250" stroke={colors.indigo} strokeWidth="15" strokeLinecap="round" />
    <rect x="300" y="40" width="60" height="80" rx="12" fill={colors.sand} stroke={colors.teal} strokeWidth="2" />
    <circle cx="330" cy="65" r="10" fill={colors.amber} />
    <rect x="315" y="85" width="30" height="4" rx="2" fill={colors.indigo} opacity="0.2" />
    <rect x="315" y="95" width="20" height="4" rx="2" fill={colors.indigo} opacity="0.2" />
  </svg>
);

export const FamilyIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

export const HeartIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);

export const UsersIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

export const SparklesIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3 1.912 5.886L20 10.8l-6.088 1.912L12 18.6l-1.912-5.888L4 10.8l6.088-1.914L12 3Z" />
    <path d="M5 3l.637 1.961L7.6 5.6l-1.963.639L5 8.2l-.637-1.961L2.4 5.6l1.963-.639L5 3Z" />
  </svg>
);

export const AIChatIcon = () => (
  <svg width="80" height="80" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="45" fill={colors.teal} opacity="0.1" />
    <rect x="30" y="35" width="40" height="30" rx="10" fill={colors.teal} />
    <circle cx="42" cy="45" r="3" fill="white" />
    <circle cx="58" cy="45" r="3" fill="white" />
    <path d="M45 55Q50 58 55 55" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const SummaryIcon = () => (
  <svg width="80" height="80" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="45" fill={colors.amber} opacity="0.1" />
    <rect x="30" y="30" width="40" height="40" rx="8" stroke={colors.amber} strokeWidth="4" fill="none" />
    <path d="M40 45h20M40 55h15" stroke={colors.amber} strokeWidth="4" strokeLinecap="round" />
  </svg>
);

export const VoiceIcon = () => (
  <svg width="80" height="80" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="45" fill={colors.sage} opacity="0.1" />
    <rect x="42" y="30" width="16" height="30" rx="8" fill={colors.sage} />
    <path d="M35 50Q35 65 50 65Q65 65 65 50" stroke={colors.sage} strokeWidth="4" fill="none" strokeLinecap="round" />
    <path d="M50 65v10M40 75h20" stroke={colors.sage} strokeWidth="4" strokeLinecap="round" />
  </svg>
);

export const ChatBubblesIllustration = () => (
  <svg viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
    <rect x="20" y="40" width="200" height="80" rx="20" fill={colors.sand} />
    <path d="M40 120L20 140V120H40Z" fill={colors.sand} />
    <text x="40" y="85" fill={colors.indigo} style={{fontSize: '14px', fontWeight: 500}}>Is this taken daily?</text>
    
    <rect x="80" y="160" width="200" height="80" rx="20" fill={colors.teal} />
    <path d="M260 240L280 260V240H260Z" fill={colors.teal} />
    <text x="100" y="205" fill="white" style={{fontSize: '14px', fontWeight: 500}}>Yes, usually after breakfast!</text>
  </svg>
);

export const VerificationEnvelopeIllustration = () => (
  <svg viewBox="0 0 200 160" fill="none" className="w-48 h-auto">
    <rect x="30" y="40" width="140" height="100" rx="10" fill={colors.teal} />
    <path d="M30 40L100 90L170 40" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
    <circle cx="160" cy="110" r="25" fill={colors.amber} />
    <path d="M150 110 L158 118 L175 102" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
