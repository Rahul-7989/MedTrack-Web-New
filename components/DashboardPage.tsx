
import React, { useEffect, useState, useRef } from 'react';
import { 
  AvatarRenderer, 
  DeclineIllustration, 
  EmptyShelfIllustration,
  PillIllustration,
  MicIcon,
} from './Illustrations';
import { DashboardFooter } from './DashboardFooter';
import { VoiceMemoModal } from './VoiceMemoModal';
import { View, UserInfo } from '../App';
import { auth, db } from '../lib/firebase';
import { 
  doc, 
  collection, 
  query, 
  where, 
  getDocs, 
  onSnapshot, 
  updateDoc, 
  arrayUnion, 
  arrayRemove, 
  addDoc, 
  deleteDoc,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';

interface HubData {
  name: string;
  hubCode: string;
  members: string[];
  pendingMembers?: string[];
  creatorId: string;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  time: string;
  assignedTo: string;
  createdBy: string;
  remarks?: string;
  imageUrl?: string;
  hubId: string;
  lastTaken?: Timestamp | null;
  lastNotifiedDay?: string; 
  notifiedOnTime?: boolean;
  notified5Min?: boolean;
  notified10Min?: boolean;
}

interface DashboardPageProps {
  hubId: string;
  onNavigate: (view: View) => void;
}

/**
 * Redesigned Background: Soft, low-contrast organic shapes suggesting care and rhythm.
 */
const DashboardBackground = () => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-[0.07]">
    <svg className="absolute w-full h-full" viewBox="0 0 1000 1000" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M-100 200C100 150 400 300 600 100C800 -100 1100 50 1100 300V1000H-100V200Z" fill="#4FA3B1" />
      <circle cx="850" cy="150" r="150" fill="#E5A23C" />
      <path d="M1000 800C800 750 700 950 500 900C300 850 200 1050 0 1000" stroke="#9DB8AD" strokeWidth="120" strokeLinecap="round" />
      <circle cx="150" cy="600" r="100" fill="#E5A23C" />
      <rect x="750" y="450" width="250" height="250" rx="125" fill="#4FA3B1" />
      <path d="M500 400C500 350 450 300 400 300C350 300 300 350 300 400C300 500 500 650 500 650C500 650 700 500 700 400C700 350 650 300 600 300C550 300 500 350 500 400Z" fill="#9DB8AD" />
    </svg>
  </div>
);

const DigitalClock: React.FC<{ onTimeUpdate: (date: Date) => void }> = ({ onTimeUpdate }) => {
  const [permission, setPermission] = useState<'idle' | 'allowed' | 'denied'>('idle');
  const [time, setTime] = useState(new Date());
  const [location, setLocation] = useState<string>('');
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setIsTransitioning(true);
      setTimeout(() => {
        setTime(now);
        onTimeUpdate(now);
        setIsTransitioning(false);
      }, 300);
    }, 10000);
    return () => clearInterval(timer);
  }, [onTimeUpdate]);

  const handleAllowLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          setPermission('allowed');
          try {
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}&zoom=10`);
            const data = await res.json();
            const city = data.address.city || data.address.town || data.address.village || data.address.suburb;
            const country = data.address.country;
            if (city && country) {
              setLocation(`${city}, ${country}`);
            } else {
              setLocation('Local Time');
            }
          } catch (e) {
            setLocation('Local Time');
          }
        },
        () => setPermission('denied')
      );
    } else {
      setPermission('denied');
    }
  };

  const hours = time.getHours();
  const displayHours = hours % 12 || 12;
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedDate = time.toLocaleDateString([], { weekday: 'short', day: 'numeric', month: 'short' }).toUpperCase();

  return (
    <div className="relative overflow-hidden h-full min-h-[180px] rounded-[4rem] bg-[#EFEAE3] shadow-inner border border-black/5 group hover:shadow-md transition-all duration-500 animate-in fade-in duration-1000">
      {permission === 'idle' ? (
        <div className="flex flex-col items-center justify-center h-full p-8 text-center space-y-4">
          <p className="text-xl font-black text-[#2E2A4A] tracking-tighter opacity-30">--:--</p>
          <button onClick={handleAllowLocation} className="bg-[#4FA3B1]/10 text-[#4FA3B1] px-6 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-[#4FA3B1] hover:text-white transition-all">Allow Location</button>
        </div>
      ) : (
        <div className="flex flex-col h-full py-8 px-10 relative">
          <div className="flex justify-center md:justify-end mb-auto">
            <span className="text-[10px] font-black text-[#4FA3B1] tracking-[0.2em] opacity-60">
              {formattedDate}
            </span>
          </div>

          <div className={`flex items-baseline justify-center gap-2 transition-opacity duration-500 ${isTransitioning ? 'opacity-40' : 'opacity-100'}`}>
            <h2 className="text-5xl md:text-6xl font-black text-[#2E2A4A] tracking-[-0.05em] tabular-nums">
              {displayHours}<span className="opacity-20 mx-0.5">:</span>{minutes}
            </h2>
            <span className="text-sm md:text-base font-black text-[#6A6875]/40 uppercase tracking-widest">
              {ampm}
            </span>
          </div>

          <div className="mt-auto flex justify-center md:justify-start">
            <p className="text-[9px] font-black text-[#6A6875]/40 uppercase tracking-[0.2em] truncate max-w-full">
              {permission === 'allowed' ? location || 'Locating...' : 'Using device time'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export const DashboardPage: React.FC<DashboardPageProps> = ({ hubId, onNavigate }) => {
  const [hubData, setHubData] = useState<HubData | null>(null);
  const [memberProfiles, setMemberProfiles] = useState<(UserInfo & { id: string })[]>([]);
  const [pendingProfiles, setPendingProfiles] = useState<(UserInfo & { id: string })[]>([]);
  const [medications, setMedications] = useState<Medication[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [declineTarget, setDeclineTarget] = useState<(UserInfo & { id: string }) | null>(null);
  
  const [isMedModalOpen, setIsMedModalOpen] = useState(false);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [editingMed, setEditingMed] = useState<Medication | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Medication | null>(null);
  const [showPermissionAlert, setShowPermissionAlert] = useState(false);

  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    if (!hubId) return;

    const unsubscribeHub = onSnapshot(doc(db, "hubs", hubId), async (hubSnap) => {
      if (hubSnap.exists()) {
        const data = hubSnap.data() as HubData;
        setHubData(data);
        
        if (data.members && data.members.length > 0) {
          const membersQuery = query(collection(db, "users"), where("__name__", "in", data.members));
          const membersSnap = await getDocs(membersQuery);
          setMemberProfiles(membersSnap.docs.map(doc => ({ ...doc.data() as UserInfo, id: doc.id })));
        }
        
        if (auth.currentUser?.uid === data.creatorId && data.pendingMembers && data.pendingMembers.length > 0) {
          const pendingQuery = query(collection(db, "users"), where("__name__", "in", data.pendingMembers));
          const pendingSnap = await getDocs(pendingQuery);
          setPendingProfiles(pendingSnap.docs.map(doc => ({ ...doc.data() as UserInfo, id: doc.id })));
        } else {
          setPendingProfiles([]);
        }
      }
    });

    const medsQuery = query(collection(db, "medications"), where("hubId", "==", hubId));
    const unsubscribeMeds = onSnapshot(medsQuery, (snapshot) => {
      const medsData = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Medication));
      medsData.sort((a, b) => a.time.localeCompare(b.time));
      setMedications(medsData);
      setLoading(false);
    });

    return () => {
      unsubscribeHub();
      unsubscribeMeds();
    };
  }, [hubId]);

  const handleAccept = async (userId: string) => {
    if (!hubId) return;
    try {
      await updateDoc(doc(db, "hubs", hubId), {
        members: arrayUnion(userId),
        pendingMembers: arrayRemove(userId)
      });
      await updateDoc(doc(db, "users", userId), { hubId: hubId, pendingHubId: null });
    } catch (err) { console.error(err); }
  };

  const handleDecline = async (userId: string) => {
    if (!hubId) return;
    try {
      await updateDoc(doc(db, "hubs", hubId), { pendingMembers: arrayRemove(userId) });
      await updateDoc(doc(db, "users", userId), { pendingHubId: null });
      setDeclineTarget(null);
    } catch (err) { console.error(err); }
  };

  const toggleTaken = async (med: Medication) => {
    const isTaken = med.lastTaken && med.lastTaken.toDate().toDateString() === new Date().toDateString();
    try {
      await updateDoc(doc(db, "medications", med.id), { 
        lastTaken: isTaken ? null : serverTimestamp(),
        notifiedOnTime: !isTaken, notified5Min: !isTaken, notified10Min: !isTaken
      });
    } catch (err) { console.error(err); }
  };

  const handleDeleteMed = async (medId: string) => {
    if (!medId) return;
    try {
      await deleteDoc(doc(db, "medications", medId));
      setDeleteTarget(null);
    } catch (err) { console.error(err); }
  };

  const handleCopy = () => {
    if (hubData?.hubCode) {
      navigator.clipboard.writeText(hubData.hubCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-[#F4F1EC] p-8 text-[#6A6875] font-medium italic">Setting the board...</div>;
  }

  const currentUserName = memberProfiles.find(m => m.id === auth.currentUser?.uid)?.name || "Friend";

  return (
    <div className="min-h-screen bg-[#F4F1EC] flex flex-col relative">
      <DashboardBackground />

      <div className="flex-1 relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 pt-12 pb-24 space-y-12">
          
          {/* Top Section - Hub Info & Clock */}
          <div className="flex flex-col md:flex-row md:items-stretch justify-between gap-8">
            <div className="flex flex-col justify-center space-y-6">
              <div className="space-y-1 text-center md:text-left">
                <span className="text-[10px] font-black text-[#4FA3B1] uppercase tracking-[0.3em] opacity-60">Family Hub</span>
                <h1 className="text-5xl font-bold text-[#2E2A4A] tracking-tight">{hubData?.name}</h1>
              </div>
              <div className="flex items-center gap-4 bg-[#EFEAE3] px-6 py-3 rounded-full w-fit mx-auto md:mx-0 border border-black/5 shadow-inner">
                <span className="text-[10px] font-black text-[#6A6875] uppercase tracking-widest">Code</span>
                <span className="text-2xl font-black text-[#E5A23C] font-mono tracking-widest">{hubData?.hubCode}</span>
                <button onClick={handleCopy} className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${copied ? 'bg-[#9DB8AD] text-white' : 'bg-white text-[#4FA3B1] hover:bg-[#4FA3B1] hover:text-white shadow-sm'}`}>
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>
            <div className="w-full md:w-80">
              <DigitalClock onTimeUpdate={setCurrentTime} />
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-4 justify-center md:justify-start">
            <button 
              onClick={() => { setEditingMed(null); setIsMedModalOpen(true); }}
              className="bg-[#4FA3B1] text-white px-8 py-4 rounded-[2rem] font-bold text-lg hover-lift shadow-lg shadow-[#4FA3B1]/20 transition-all flex items-center gap-3"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" /></svg>
              Add Medication
            </button>
            <button 
              onClick={() => setIsVoiceModalOpen(true)}
              className="bg-white/60 backdrop-blur-sm text-[#4FA3B1] px-8 py-4 rounded-[2rem] border border-[#4FA3B1]/10 hover-lift shadow-sm flex items-center gap-3 font-bold group"
            >
              <MicIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Smart Voice Memo</span>
            </button>
          </div>

          {/* THE MEDICATION BOARD SURFACE */}
          <section className="bg-[#EFEAE3] rounded-[4rem] p-8 md:p-14 shadow-inner border border-black/5 min-h-[500px] relative">
            <div className="flex items-center justify-between mb-10 border-b border-black/5 pb-4 px-2">
              <div className="space-y-1">
                <h2 className="text-xs font-black text-[#6A6875] uppercase tracking-[0.4em] opacity-40">Medications</h2>
                <p className="text-[10px] font-bold text-[#4FA3B1] uppercase tracking-[0.2em]">Today's schedule</p>
              </div>
              <div className="flex gap-2">
                {memberProfiles.slice(0, 5).map(m => (
                  <div key={m.id} className="w-8 h-8 rounded-xl overflow-hidden border-2 border-white shadow-sm" title={m.name}>
                    <AvatarRenderer gender={m.gender} index={m.avatarIndex} className="w-full h-full" />
                  </div>
                ))}
              </div>
            </div>

            {medications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 opacity-30">
                <EmptyShelfIllustration />
                <p className="mt-8 font-black text-[#6A6875] uppercase tracking-widest text-xs">The board is clear</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {medications.map((med) => (
                  <MedicationCard 
                    key={med.id} med={med} currentTime={currentTime}
                    assignedMember={memberProfiles.find(m => m.id === med.assignedTo)}
                    onEdit={() => {
                      if (med.createdBy === auth.currentUser?.uid) { setEditingMed(med); setIsMedModalOpen(true); } 
                      else { setShowPermissionAlert(true); }
                    }}
                    onDelete={() => {
                      if (med.createdBy === auth.currentUser?.uid) { setDeleteTarget(med); } 
                      else { setShowPermissionAlert(true); }
                    }}
                    onToggleTaken={() => toggleTaken(med)}
                  />
                ))}
              </div>
            )}
          </section>

          {/* Family Members Section */}
          <section className="bg-white/40 backdrop-blur-sm p-10 rounded-[4rem] border border-white shadow-sm space-y-8">
            <div className="space-y-1 border-b border-[#2E2A4A]/5 pb-4">
              <h3 className="text-[10px] font-black text-[#6A6875] uppercase tracking-[0.4em] opacity-60">Family Hub Members</h3>
              <p className="text-[9px] font-bold text-[#4FA3B1] uppercase tracking-[0.2em]">Everyone in {hubData?.name}</p>
            </div>
            <div className="flex flex-wrap gap-4">
              {memberProfiles.map(member => (
                <div key={member.id} className="flex items-center gap-3 bg-[#EFEAE3]/80 pr-4 pl-2 py-2 rounded-2xl shadow-sm border border-white transition-transform hover:-translate-y-0.5">
                  <div className="w-10 h-10 rounded-xl overflow-hidden shadow-inner bg-white flex-shrink-0">
                    <AvatarRenderer gender={member.gender} index={member.avatarIndex} className="w-full h-full" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-bold text-[#2E2A4A] truncate max-w-[140px] leading-tight">{member.name}</span>
                    <span className="text-[8px] font-black text-[#4FA3B1] uppercase tracking-[0.15em] mt-0.5">
                      {member.id === hubData?.creatorId ? 'Creator' : 'Member'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Pending Approvals */}
          {pendingProfiles.length > 0 && auth.currentUser?.uid === hubData?.creatorId && (
            <div className="bg-[#E5A23C]/5 p-8 rounded-[3.5rem] border border-[#E5A23C]/10 space-y-6">
              <h3 className="text-xs font-black text-[#E5A23C] uppercase tracking-[0.3em]">Join Requests</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {pendingProfiles.map(p => (
                  <div key={p.id} className="bg-white/80 backdrop-blur-sm p-4 rounded-3xl flex items-center gap-4 shadow-sm">
                    <div className="w-10 h-10 rounded-xl overflow-hidden bg-[#F4F1EC]">
                      <AvatarRenderer gender={p.gender} index={p.avatarIndex} className="w-full h-full" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-[#2E2A4A] text-xs truncate">{p.name}</p>
                      <div className="flex gap-2 mt-2">
                        <button onClick={() => handleAccept(p.id)} className="flex-1 bg-[#4FA3B1] text-white py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest">Approve</button>
                        <button onClick={() => setDeclineTarget(p)} className="flex-1 bg-black/5 text-[#6A6875] py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest">Reject</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <DashboardFooter userName={currentUserName} />

      {/* Modals */}
      {isMedModalOpen && <MedicationModal hubId={hubId} members={memberProfiles} existingMed={editingMed} onClose={() => { setIsMedModalOpen(false); setEditingMed(null); }} />}
      {isVoiceModalOpen && <VoiceMemoModal hubId={hubId} members={memberProfiles} onClose={() => setIsVoiceModalOpen(false)} />}
      
      {deleteTarget && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-[#2E2A4A]/20 backdrop-blur-[4px]" onClick={() => setDeleteTarget(null)} />
          <div className="relative w-full max-w-sm bg-[#EFEAE3] p-10 rounded-[4rem] shadow-2xl text-center space-y-8 animate-in zoom-in-95 duration-500">
            <h2 className="text-2xl font-bold text-[#2E2A4A]">Remove note?</h2>
            <div className="flex flex-col gap-3">
              <button onClick={() => setDeleteTarget(null)} className="w-full bg-[#4FA3B1] text-white py-4 rounded-full font-bold text-xs uppercase tracking-widest">Wait, keep it</button>
              <button onClick={() => deleteTarget && handleDeleteMed(deleteTarget.id)} className="w-full bg-[#6A6875]/10 text-[#6A6875] py-4 rounded-full font-bold text-xs uppercase tracking-widest">Delete</button>
            </div>
          </div>
        </div>
      )}

      {showPermissionAlert && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-[#2E2A4A]/20 backdrop-blur-[4px]" onClick={() => setShowPermissionAlert(false)} />
          <div className="relative w-full max-w-sm bg-[#EFEAE3] p-10 rounded-[4rem] shadow-2xl text-center space-y-6">
            <h2 className="text-xl font-bold text-[#2E2A4A]">Ownership</h2>
            <p className="text-sm text-[#6A6875]">Only the person who added this care note can change it.</p>
            <button onClick={() => setShowPermissionAlert(false)} className="w-full bg-[#4FA3B1] text-white py-4 rounded-full font-bold text-sm uppercase tracking-widest">Got it</button>
          </div>
        </div>
      )}

      {declineTarget && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-[#2E2A4A]/20 backdrop-blur-[4px]" onClick={() => setDeclineTarget(null)} />
          <div className="relative w-full max-w-sm bg-[#EFEAE3] p-10 rounded-[4rem] shadow-2xl text-center space-y-8">
            <div className="flex justify-center opacity-40"><DeclineIllustration /></div>
            <h2 className="text-2xl font-bold text-[#2E2A4A]">Decline Request?</h2>
            <div className="flex flex-col gap-3">
              <button onClick={() => setDeclineTarget(null)} className="w-full bg-[#4FA3B1] text-white py-4 rounded-full font-black text-xs uppercase tracking-widest">Keep Pending</button>
              <button onClick={() => declineTarget && handleDecline(declineTarget.id)} className="w-full bg-[#E5A23C] text-white py-4 rounded-full font-black text-xs uppercase tracking-widest">Decline</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * COMPACT MEDICATION CARD: REDESIGNED
 */
const MedicationCard: React.FC<any> = ({ med, currentTime, assignedMember, onEdit, onDelete, onToggleTaken }) => {
  const isTakenToday = med.lastTaken && med.lastTaken.toDate().toDateString() === currentTime.toDateString();
  const [h, m] = med.time.split(':').map(Number);
  const medDate = new Date(currentTime);
  medDate.setHours(h, m, 0, 0);
  const isPastTime = currentTime > medDate;
  const isOwner = med.createdBy === auth.currentUser?.uid;

  return (
    <div className={`relative bg-[#F4F1EC] p-6 rounded-[2.5rem] shadow-sm border border-white hover:shadow-md transition-all duration-300 group overflow-hidden ${isTakenToday ? 'opacity-50 grayscale-[0.3]' : 'hover-lift'}`}>
      
      {/* Edit/Delete Icons - Hover Only */}
      {isOwner && (
        <div className="absolute top-4 right-4 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={onEdit} className="p-2 bg-white/80 rounded-lg text-[#6A6875] hover:text-[#4FA3B1] transition-all"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
          <button onClick={onDelete} className="p-2 bg-white/80 rounded-lg text-[#6A6875] hover:text-[#E5A23C] transition-all"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
        </div>
      )}

      {/* Row 1: Header (Icon, Name, Dosage) */}
      <div className="flex gap-4 mb-4">
        <div className="w-14 h-14 bg-white rounded-2xl flex-shrink-0 flex items-center justify-center shadow-inner border border-black/5 overflow-hidden">
          {med.imageUrl ? <img src={med.imageUrl} alt={med.name} className="w-full h-full object-cover" /> : <PillIllustration className="w-8 h-8" />}
        </div>
        <div className="flex-1 space-y-0.5 pt-1">
          <h3 className="text-base font-bold text-[#2E2A4A] leading-tight truncate">{med.name}</h3>
          <p className="text-[10px] text-[#6A6875] font-bold uppercase tracking-widest inline-block">{med.dosage}</p>
        </div>
      </div>

      {/* Row 2: Info (Time, Assigned) */}
      <div className="flex items-center justify-between mb-5 border-t border-black/5 pt-4">
        <div className="flex items-center gap-1.5 text-[#4FA3B1]">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span className="text-sm font-black tracking-tight">{med.time}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg overflow-hidden bg-white border border-white">
            <AvatarRenderer gender={assignedMember?.gender} index={assignedMember?.avatarIndex} className="w-full h-full" />
          </div>
          <span className="text-[9px] font-black text-[#6A6875] uppercase tracking-widest">{assignedMember?.name?.split(' ')[0]}</span>
        </div>
      </div>

      {/* Row 3: Action (Compact Taken Button) */}
      <div className="flex justify-end">
        <button 
          onClick={onToggleTaken} 
          className={`px-6 py-2.5 rounded-full font-black text-[10px] uppercase tracking-widest transition-all flex items-center gap-2 shadow-sm active:scale-95 ${isTakenToday ? 'bg-[#9DB8AD] text-white' : 'bg-[#4FA3B1] text-white hover:shadow-md'}`}
        >
          {isTakenToday ? (
            <>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></svg>
              Taken
            </>
          ) : (
            'Mark Taken'
          )}
        </button>
      </div>

      {/* Past Time Indicator */}
      {isPastTime && !isTakenToday && (
        <div className="absolute left-0 bottom-0 top-0 w-1 bg-[#E5A23C] opacity-60" />
      )}
    </div>
  );
};

interface MedicationModalProps {
  hubId: string;
  members: (UserInfo & { id: string })[];
  existingMed: Medication | null;
  onClose: () => void;
}

const MedicationModal: React.FC<MedicationModalProps> = ({ hubId, members, existingMed, onClose }) => {
  const [name, setName] = useState(existingMed?.name || '');
  const [dosage, setDosage] = useState(existingMed?.dosage || '');
  const [time, setTime] = useState(existingMed?.time || '08:00');
  const [assignedTo, setAssignedTo] = useState(existingMed?.assignedTo || members[0]?.id || '');
  const [remarks, setRemarks] = useState(existingMed?.remarks || '');
  const [imageUrl, setImageUrl] = useState(existingMed?.imageUrl || '');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImageUrl(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!name.trim() || !dosage.trim() || !assignedTo || !auth.currentUser) return;
    setLoading(true);
    const data = { 
      name, dosage, time, assignedTo, remarks, imageUrl, hubId, updatedAt: serverTimestamp(),
      lastNotifiedDay: '', notifiedOnTime: false, notified5Min: false, notified10Min: false
    };
    try {
      if (existingMed) {
        if (existingMed.createdBy !== auth.currentUser.uid) return;
        await updateDoc(doc(db, "medications", existingMed.id), data);
      } else {
        await addDoc(collection(db, "medications"), { ...data, createdBy: auth.currentUser.uid, createdAt: serverTimestamp(), lastTaken: null });
      }
      onClose();
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-6 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-[#2E2A4A]/30 backdrop-blur-[4px]" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-[#EFEAE3] p-10 md:p-14 rounded-[4rem] shadow-2xl border border-[#2E2A4A]/5 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-500">
        <div className="flex justify-between items-start mb-10">
          <div><h2 className="text-3xl font-bold text-[#2E2A4A]">{existingMed ? 'Update Note' : 'Add Note'}</h2><p className="text-xs font-black text-[#6A6875] uppercase tracking-widest opacity-40">Family Care Detail</p></div>
          <button onClick={onClose} className="p-3 bg-white/50 rounded-full hover:bg-white transition-all"><svg className="w-6 h-6 text-[#2E2A4A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg></button>
        </div>
        <div className="space-y-8">
          <div onClick={() => fileInputRef.current?.click()} className="group relative h-48 bg-[#F4F1EC] rounded-[3rem] border-2 border-dashed border-black/5 flex items-center justify-center cursor-pointer hover:border-[#4FA3B1]/20 transition-all overflow-hidden shadow-inner">
            {imageUrl ? <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" /> : <div className="text-center opacity-30"><PillIllustration className="w-12 h-12 mx-auto" /><p className="text-[9px] font-black uppercase tracking-widest pt-2">Attach Photo</p></div>}
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2"><label className="text-[9px] font-black uppercase tracking-[0.3em] px-2 text-[#6A6875]">Medicine Name</label><input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-[#F4F1EC] rounded-2xl px-6 py-4 text-lg font-bold text-[#2E2A4A] focus:outline-none" /></div>
            <div className="space-y-2"><label className="text-[9px] font-black uppercase tracking-[0.3em] px-2 text-[#6A6875]">Dosage</label><input type="text" value={dosage} onChange={(e) => setDosage(e.target.value)} className="w-full bg-[#F4F1EC] rounded-2xl px-6 py-4 text-lg font-bold text-[#2E2A4A] focus:outline-none" /></div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2"><label className="text-[9px] font-black uppercase tracking-[0.3em] px-2 text-[#6A6875]">Time</label><input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="w-full bg-[#F4F1EC] rounded-2xl px-6 py-4 text-lg font-bold text-[#2E2A4A] focus:outline-none" /></div>
            <div className="space-y-2"><label className="text-[9px] font-black uppercase tracking-[0.3em] px-2 text-[#6A6875]">Member</label><select value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} className="w-full bg-[#F4F1EC] rounded-2xl px-6 py-4 text-sm font-bold text-[#2E2A4A] focus:outline-none appearance-none">{members.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}</select></div>
          </div>
        </div>
        <div className="flex flex-col gap-4 pt-10 mt-10 border-t border-black/5">
          <button onClick={handleSave} disabled={loading} className="w-full bg-[#4FA3B1] text-white py-6 rounded-[2.5rem] font-bold text-xl hover-lift shadow-xl shadow-[#4FA3B1]/20">{loading ? 'Saving...' : 'Confirm Care Note'}</button>
          <button onClick={onClose} className="text-[#6A6875] font-black text-[10px] uppercase tracking-widest text-center py-2">Discard</button>
        </div>
      </div>
    </div>
  );
};
