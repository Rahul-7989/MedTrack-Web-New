
import React, { useState, useEffect } from 'react';
import { AvatarRenderer } from './Illustrations';
import { auth, db } from '../lib/firebase';
import { doc, updateDoc, getDoc, arrayRemove, deleteDoc } from 'firebase/firestore';
import { sendPasswordResetEmail, signOut, sendEmailVerification } from 'firebase/auth';
import { View, UserInfo } from '../App';

interface ProfilePageProps {
  onNavigate: (view: View) => void;
  userInfo: UserInfo;
}

const GENDER_OPTIONS = [
  { id: 'male', label: 'Male', icon: '👤' },
  { id: 'female', label: 'Female', icon: '👤' },
  { id: 'other', label: 'Other', icon: '🌈' },
  { id: 'private', label: 'Prefer not to say', icon: '🚫' },
];

export const ProfilePage: React.FC<ProfilePageProps> = ({ onNavigate, userInfo }) => {
  // Local state for all fields to allow "Save Changes" to be explicit
  const [name, setName] = useState(userInfo.name || '');
  const [gender, setGender] = useState(userInfo.gender || 'private');
  const [age, setAge] = useState<number | null>(userInfo.age ?? null);
  const [avatarIndex, setAvatarIndex] = useState(userInfo.avatarIndex || 0);
  const [notificationsEnabled, setNotificationsEnabled] = useState(userInfo.notificationsEnabled ?? true);
  const [familyAlertsEnabled, setFamilyAlertsEnabled] = useState(userInfo.familyAlertsEnabled ?? true);
  const [useDeviceTime, setUseDeviceTime] = useState(false); // UI only state
  
  const [hubName, setHubName] = useState('Loading...');
  const [joinDate, setJoinDate] = useState<string | null>(null);
  const [isCreator, setIsCreator] = useState(false);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [resending, setResending] = useState(false);

  useEffect(() => {
    if (!userInfo.hubId) {
      setHubName('Not in a hub');
      return;
    }

    const fetchHubInfo = async () => {
      const hubSnap = await getDoc(doc(db, "hubs", userInfo.hubId!));
      if (hubSnap.exists()) {
        const data = hubSnap.data();
        setHubName(data.name);
        setIsCreator(data.creatorId === auth.currentUser?.uid);
        if (data.createdAt) {
          const date = new Date(data.createdAt);
          setJoinDate(date.toLocaleDateString(undefined, { month: 'long', year: 'numeric' }));
        }
      }
    };
    fetchHubInfo();
  }, [userInfo.hubId]);

  /**
   * Saves all changes permanently to the user's profile database.
   */
  const handleSaveChanges = async () => {
    if (!auth.currentUser) return;
    setSaving(true);
    try {
      const updates = {
        name,
        gender,
        age,
        avatarIndex,
        notificationsEnabled,
        familyAlertsEnabled
      };
      await updateDoc(doc(db, "users", auth.currentUser.uid), updates);
      setFeedback("All changes saved permanently.");
      setTimeout(() => setFeedback(null), 3000);
    } catch (err) {
      console.error(err);
      setFeedback("Failed to save changes. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  /**
   * Resends verification email.
   */
  const handleResendVerification = async () => {
    if (!auth.currentUser) return;
    setResending(true);
    try {
      await sendEmailVerification(auth.currentUser);
      setFeedback("Verification link sent to your inbox.");
      setTimeout(() => setFeedback(null), 5000);
    } catch (err) {
      console.error(err);
      setFeedback("Could not resend link. Please try again later.");
    } finally {
      setResending(false);
    }
  };

  /**
   * Password reset logic.
   */
  const handleChangePassword = async () => {
    if (!auth.currentUser?.email) return;
    try {
      await sendPasswordResetEmail(auth, auth.currentUser.email);
      setFeedback("Check your email for the reset link.");
      setTimeout(() => setFeedback(null), 5000);
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * Leave Hub logic: 
   * - Creator: Deletes the hub document entirely.
   * - Member: Removes user from hub's member list.
   * - Both: Clears hubId from user profile and redirects to hub selection.
   */
  const handleLeaveHub = async () => {
    if (!auth.currentUser || !userInfo.hubId) return;
    
    const message = isCreator 
      ? "As the creator, leaving will permanently DELETE this Family Hub for everyone. Continue?" 
      : "Are you sure you want to leave this family hub?";
      
    const confirmed = window.confirm(message);
    if (!confirmed) return;

    setSaving(true);
    try {
      const userRef = doc(db, "users", auth.currentUser.uid);
      const hubRef = doc(db, "hubs", userInfo.hubId);

      if (isCreator) {
        // Delete the hub document permanently
        await deleteDoc(hubRef);
      } else {
        // Just remove this member from the hub list
        await updateDoc(hubRef, { members: arrayRemove(auth.currentUser.uid) });
      }

      // Clear hubId on the user's profile
      await updateDoc(userRef, { hubId: null });
      
      setFeedback(isCreator ? "Hub deleted successfully." : "You've left the hub.");
      
      // Redirect to hub selection page
      onNavigate('hub-selection');
    } catch (err) {
      console.error(err);
      setFeedback("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const cycleAvatar = () => {
    setAvatarIndex((prev) => (prev + 1) % 11);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#F4F1EC] pb-24 animate-in fade-in duration-700">
      <div className="max-w-3xl mx-auto px-6 pt-16 space-y-12">
        
        {/* Navigation back */}
        <div className="flex justify-start">
          <button 
            onClick={() => onNavigate('dashboard')}
            className="flex items-center gap-3 bg-[#EFEAE3] px-6 py-3 rounded-full text-[11px] font-black text-[#4FA3B1] uppercase tracking-[0.2em] hover:bg-white transition-all shadow-sm group"
          >
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Dashboard
          </button>
        </div>

        {/* 👤 PROFILE IDENTITY SECTION (TOP) */}
        <section className="flex flex-col items-center space-y-10 text-center">
          <div className="relative group">
            <div className="bg-white p-3 rounded-[3.5rem] shadow-sm overflow-hidden ring-8 ring-[#EFEAE3] transition-transform hover:scale-105 duration-500">
              <AvatarRenderer gender={gender} index={avatarIndex} className="w-36 h-36" />
            </div>
            <button 
              onClick={cycleAvatar}
              className="mt-6 flex items-center gap-2 mx-auto bg-white/50 px-5 py-2 rounded-full text-[10px] font-black text-[#4FA3B1] uppercase tracking-[0.2em] hover:bg-white hover:text-[#2E2A4A] transition-all shadow-sm active:scale-95"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
              Change Illustration
            </button>
          </div>

          <div className="space-y-4 w-full max-w-sm">
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center gap-3">
                <input 
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="text-4xl font-bold text-[#2E2A4A] bg-transparent text-center focus:outline-none focus:bg-white/40 rounded-2xl px-4 py-1 transition-all"
                />
                <span className="shrink-0 bg-[#4FA3B1] text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm">
                  {isCreator ? 'Creator' : 'Member'}
                </span>
              </div>
              <p className="text-xs text-[#6A6875] font-medium opacity-60">This is how family members see you.</p>
            </div>
          </div>
        </section>

        {/* 📧 ACCOUNT DETAILS SECTION */}
        <section className="bg-[#EFEAE3] p-10 rounded-[4rem] space-y-8 shadow-sm border border-black/5">
          <div className="flex items-center gap-3 border-b border-black/5 pb-4">
            <span className="text-xl">📧</span>
            <h3 className="text-xs font-black text-[#2E2A4A] uppercase tracking-[0.3em] opacity-40">Account Details</h3>
          </div>
          
          <div className="grid gap-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <p className="text-[10px] font-black text-[#6A6875] uppercase tracking-[0.2em]">Email Address</p>
                <div className="flex items-center gap-4">
                   <p className="text-xl font-bold text-[#2E2A4A]">{auth.currentUser?.email}</p>
                   {auth.currentUser?.emailVerified ? (
                     <span className="bg-[#9DB8AD]/20 text-[#9DB8AD] px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest">✅ Verified</span>
                   ) : (
                     <div className="flex items-center gap-3">
                        <span className="bg-[#E5A23C]/10 text-[#E5A23C] px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest">⏳ Not Verified</span>
                        <button 
                          onClick={handleResendVerification}
                          disabled={resending}
                          className="text-[9px] font-black text-[#4FA3B1] uppercase tracking-widest border-b-2 border-[#4FA3B1]/20 hover:border-[#4FA3B1] transition-all"
                        >
                          {resending ? 'Sending...' : 'Resend link'}
                        </button>
                     </div>
                   )}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-black/5">
              <div className="space-y-4">
                <p className="text-[10px] font-black text-[#6A6875] uppercase tracking-[0.2em]">Security</p>
                <button 
                  onClick={handleChangePassword}
                  className="flex items-center gap-3 bg-white/60 px-6 py-4 rounded-3xl text-sm font-bold text-[#4FA3B1] hover:bg-white transition-all shadow-sm active:scale-95"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 🎂 PERSONAL DETAILS SECTION */}
        <section className="bg-[#EFEAE3] p-10 rounded-[4rem] space-y-12 shadow-sm border border-black/5">
          <div className="flex items-center gap-3 border-b border-black/5 pb-4">
            <span className="text-xl">🎂</span>
            <h3 className="text-xs font-black text-[#2E2A4A] uppercase tracking-[0.3em] opacity-40">Personal Details</h3>
          </div>
          
          <div className="space-y-8">
            <div className="space-y-6">
              <label className="text-[10px] font-black text-[#6A6875] uppercase tracking-[0.2em]">Gender</label>
              <div className="flex flex-wrap gap-3">
                {GENDER_OPTIONS.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => {
                      setGender(option.id);
                    }}
                    className={`px-8 py-4 rounded-[2rem] text-sm font-bold transition-all border-2
                      ${gender === option.id 
                        ? 'border-[#4FA3B1] bg-[#4FA3B1] text-white shadow-lg shadow-[#4FA3B1]/20' 
                        : 'border-transparent bg-[#F4F1EC] text-[#2E2A4A] hover:bg-white'
                      }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex justify-between items-end px-2">
                 <label className="text-[10px] font-black text-[#6A6875] uppercase tracking-[0.2em]">Age</label>
                 <span className="text-2xl font-black text-[#4FA3B1]">{age === null ? 'Not set' : age}</span>
              </div>
              <div className="bg-[#F4F1EC] p-8 rounded-[3rem] shadow-inner space-y-4">
                 <input 
                    type="range"
                    min="0"
                    max="100"
                    value={age ?? 30}
                    onChange={(e) => setAge(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <p className="text-[10px] text-[#6A6875]/50 font-bold uppercase tracking-[0.15em] text-center">Used only to make reminders feel right.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ⏰ TIME & LOCATION SECTION */}
        <section className="bg-[#EFEAE3] p-10 rounded-[4rem] space-y-8 shadow-sm border border-black/5">
          <div className="flex items-center gap-3 border-b border-black/5 pb-4">
            <span className="text-xl">⏰</span>
            <h3 className="text-xs font-black text-[#2E2A4A] uppercase tracking-[0.3em] opacity-40">Time & Location</h3>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-start justify-between gap-6 p-6 bg-[#F4F1EC] rounded-3xl">
              <div className="space-y-1">
                <p className="text-sm font-bold text-[#2E2A4A]">Clock Source</p>
                <p className="text-xs text-[#6A6875] leading-relaxed">
                  {useDeviceTime ? "Using device time only." : "Using local time (based on your location)."}
                  <br />
                  <span className="opacity-60 italic text-[10px]">This affects how times appear on your dashboard.</span>
                </p>
              </div>
              <div className="relative inline-block w-12 h-6 cursor-pointer" onClick={() => setUseDeviceTime(!useDeviceTime)}>
                <div className={`w-full h-full rounded-full transition-colors duration-300 ${useDeviceTime ? 'bg-[#4FA3B1]' : 'bg-black/10'}`} />
                <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${useDeviceTime ? 'translate-x-6' : ''}`} />
              </div>
            </div>
          </div>
        </section>

        {/* 🔔 NOTIFICATION PREFERENCES */}
        <section className="bg-[#EFEAE3] p-10 rounded-[4rem] space-y-8 shadow-sm border border-black/5">
          <div className="flex items-center gap-3 border-b border-black/5 pb-4">
            <span className="text-xl">🔔</span>
            <h3 className="text-xs font-black text-[#2E2A4A] uppercase tracking-[0.3em] opacity-40">Notifications</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-6 bg-[#F4F1EC] rounded-3xl">
              <div className="space-y-1">
                <p className="text-sm font-bold text-[#2E2A4A]">Medication Reminders</p>
                <p className="text-xs text-[#6A6875]">Get reminders when it’s time to take medicine.</p>
              </div>
              <div className="relative inline-block w-12 h-6 cursor-pointer" onClick={() => {
                setNotificationsEnabled(!notificationsEnabled);
              }}>
                <div className={`w-full h-full rounded-full transition-colors duration-300 ${notificationsEnabled ? 'bg-[#4FA3B1]' : 'bg-black/10'}`} />
                <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${notificationsEnabled ? 'translate-x-6' : ''}`} />
              </div>
            </div>

            <div className="flex items-center justify-between p-6 bg-[#F4F1EC] rounded-3xl">
              <div className="space-y-1">
                <p className="text-sm font-bold text-[#2E2A4A]">Family Alerts</p>
                <p className="text-xs text-[#6A6875]">Let family know if a dose is missed.</p>
              </div>
              <div className="relative inline-block w-12 h-6 cursor-pointer" onClick={() => {
                setFamilyAlertsEnabled(!familyAlertsEnabled);
              }}>
                <div className={`w-full h-full rounded-full transition-colors duration-300 ${familyAlertsEnabled ? 'bg-[#4FA3B1]' : 'bg-black/10'}`} />
                <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${familyAlertsEnabled ? 'translate-x-6' : ''}`} />
              </div>
            </div>
          </div>
        </section>

        {/* 🏠 FAMILY HUB INFO */}
        <section className="bg-[#EFEAE3] p-10 rounded-[4rem] space-y-6 shadow-sm border border-black/5">
          <div className="flex items-center gap-3 border-b border-black/5 pb-4">
            <span className="text-xl">🏠</span>
            <h3 className="text-xs font-black text-[#2E2A4A] uppercase tracking-[0.3em] opacity-40">Family Hub Info</h3>
          </div>
          <div className="space-y-6">
            <div className="bg-[#F4F1EC] p-6 rounded-3xl space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-sm font-bold text-[#2E2A4A]">{hubName}</p>
                <span className="text-[10px] font-black text-[#4FA3B1] uppercase tracking-widest">{isCreator ? 'Owner' : 'Member'}</span>
              </div>
              {joinDate && <p className="text-[10px] font-bold text-[#6A6875] uppercase tracking-widest opacity-60">Caring together since {joinDate}</p>}
              {isCreator && (
                <p className="text-xs text-[#4FA3B1] font-medium pt-2 border-t border-black/5">
                  ✨ You’re the creator of this hub.
                </p>
              )}
            </div>
            
            <button 
              onClick={handleLeaveHub}
              className="text-[10px] font-black text-[#E5A23C] uppercase tracking-[0.2em] border-b-2 border-[#E5A23C]/20 hover:border-[#E5A23C] transition-all"
            >
              Leave Family Hub
            </button>
          </div>
        </section>

        {/* 🔐 PRIVACY & SAFETY SECTION */}
        <section className="text-center p-8 bg-black/5 rounded-[3rem] border border-black/5">
          <div className="flex items-center justify-center gap-3 mb-2">
            <svg className="w-4 h-4 text-[#9DB8AD]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm0 18.09c-3.69-.97-6.27-4.83-6-8.89V6.3l6-2.25 6 2.25v4.9c.27 4.06-2.31 7.92-6 8.89z" /></svg>
            <h4 className="text-[10px] font-black text-[#2E2A4A] uppercase tracking-[0.3em] opacity-60">Privacy & Safety</h4>
          </div>
          <p className="text-[10px] text-[#6A6875] font-medium italic">Your personal details are visible only inside your family hub.</p>
        </section>

        {/* 💾 SAVE & EXIT SECTION */}
        <div className="pt-10 flex flex-col items-center gap-6">
           <button 
             onClick={handleSaveChanges}
             disabled={saving}
             className="w-full max-w-sm bg-[#4FA3B1] text-white py-6 rounded-[2.5rem] font-bold text-xl hover-lift shadow-xl shadow-[#4FA3B1]/20 disabled:opacity-50 transition-all flex items-center justify-center gap-3"
           >
             {saving ? 'Saving...' : (
               <>
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                 Save Changes
               </>
             )}
           </button>

           <button 
             onClick={async () => {
               await signOut(auth);
               onNavigate('home');
             }}
             className="text-[#6A6875]/60 font-black text-sm uppercase tracking-[0.4em] py-5 px-16 rounded-[2.5rem] bg-[#EFEAE3]/50 hover:bg-[#EFEAE3] hover:text-[#2E2A4A] transition-all shadow-sm"
           >
             Sign Out
           </button>
           <p className="text-[10px] font-black text-[#6A6875] uppercase tracking-[0.3em] opacity-20">MedTrack • Gently caring since {new Date().getFullYear()}</p>
        </div>
      </div>

      {/* Floating Feedback Toast */}
      {feedback && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-[#2E2A4A] text-[#F4F1EC] px-10 py-5 rounded-full shadow-2xl animate-in slide-in-from-bottom-6 duration-500 z-[200] border border-white/10 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#4FA3B1] animate-pulse" />
          <p className="text-sm font-bold tracking-tight">{feedback}</p>
        </div>
      )}
    </div>
  );
};
