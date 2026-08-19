import React, { useState, useEffect, useMemo, useRef } from 'react';
import './App.css';
import Login from './Login.jsx'; // Agar Login ki file kisi aur folder mein hai toh path theek kar lena
import clickAudio from './assets/click.mp3';
import levelUpAudio from './assets/level-up.mp3';
import penaltyAudio from './assets/warning-alarm.mp3';
import buyAudio from './assets/coins-to-table.mp3';
 
// ================= ICONS =================
const IconEdit = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>;
const IconMoon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>;
const IconCheck = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>;
const IconFire = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="#ef4444"><path d="M12 2c0 0-4.5 3.5-4.5 8.5a4.5 4.5 0 0 0 1.22 3.08C7.34 12 7 10.5 7 10.5c-3 3-3 6.5-1 9 2.5 3 7.5 3 10.5 0 2.5-2.5 2.5-6.5-1-9.5 0 0 .5 1.5.28 3.08A4.5 4.5 0 0 0 16.5 10.5C16.5 5.5 12 2 12 2z"></path></svg>;
const NavDash = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>;
const NavQuest = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>;
const NavStats = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>;
const NavSkills = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>;
const NavCal = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>;
const NavAchieve = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>;
const NavShop = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>;
const NavSet = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>;

const StatArm = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>;
const StatRun = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>;
const StatHeart = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>;
const StatBrain = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>;
const StatEye = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>;

const TaskBook = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>;
const TaskDumbbell = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6.5 6.5h11"></path><path d="M6.5 17.5h11"></path><path d="m10.4 10.4 3.2 3.2"></path><path d="m13.6 10.4-3.2 3.2"></path><path d="m3.3 8.6 2.8 2.8"></path><path d="m17.9 12.6 2.8 2.8"></path></svg>;
const TaskPages = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><path d="M14 2v6h6"></path><path d="M16 13H8"></path><path d="M16 17H8"></path><path d="M10 9H8"></path></svg>;
const TaskMeditate = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 8v8"></path><path d="M8 12h8"></path></svg>;
const TaskDrop = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path></svg>;
const TaskRun = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>;

const SystemLogo = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ filter: 'drop-shadow(0 0 8px #8b5cf6)' }}>
    <path d="M12 1.5 L22.5 12 L12 22.5 L1.5 12 Z" fill="#8b5cf6" />
  </svg>
);

const SystemWing = ({ flip, isPenalty }) => (
  <svg width="100" height="20" viewBox="0 0 140 20" fill="none" style={{ transform: flip ? 'scaleX(-1)' : 'none', filter: `drop-shadow(0 0 6px ${isPenalty ? '#ef4444' : 'rgba(139, 92, 246, 0.6)'})` }}>
    <line x1="0" y1="10" x2="125" y2="10" stroke={`url(#wing-gradient-${isPenalty ? 'red' : 'purple'})`} strokeWidth="1.5" />
    <path d="M130 7.5 L132.5 10 L130 12.5 L127.5 10 Z" fill={isPenalty ? '#ef4444' : '#8b5cf6'} />
    <defs>
      <linearGradient id="wing-gradient-purple" x1="0" y1="10" x2="125" y2="10" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0" />
        <stop offset="100%" stopColor="#8b5cf6" stopOpacity="1" />
      </linearGradient>
      <linearGradient id="wing-gradient-red" x1="0" y1="10" x2="125" y2="10" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#ef4444" stopOpacity="0" />
        <stop offset="100%" stopColor="#ef4444" stopOpacity="1" />
      </linearGradient>
    </defs>
  </svg>
);

const getDynamicIcon = (name) => {
  switch(name) {
    case 'dumbbell': return <TaskDumbbell />;
    case 'book': return <TaskBook />;
    case 'pages': return <TaskPages />;
    case 'meditate': return <TaskMeditate />;
    case 'drop': return <TaskDrop />;
    case 'run': return <TaskRun />;
    default: return <TaskBook />;
  }
};

const btnClaim = { background: '#8b5cf6', border: 'none', color: '#fff', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.65rem', fontWeight: 'bold', boxShadow: '0 0 8px #8b5cf6' };
const badgeDone = { color: '#22c55e', fontSize: '0.75rem', fontWeight: 'bold', letterSpacing: '1px' };

const modalOverlay = { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(2, 2, 5, 0.85)', backdropFilter: 'blur(10px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999, animation: 'fadeIn 0.3s ease-out' };
const modalContent = { background: 'linear-gradient(180deg, rgba(12,10,22,0.9) 0%, rgba(20,15,40,0.9) 100%)', border: '2px solid #8b5cf6', borderRadius: '8px', padding: '50px 80px', textAlign: 'center', boxShadow: '0 0 50px rgba(139, 92, 246, 0.5)', transform: 'scale(1)', animation: 'popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)' };
const scrollableContainerStyle = { maxHeight: 'calc(100vh - 350px)', overflowY: 'auto', paddingRight: '5px', scrollbarWidth: 'thin', scrollbarColor: '#8b5cf6 transparent' };


export default function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [resetTimer, setResetTimer] = useState("00:00:00");
  
  const [activePage, setActivePage] = useState('DASHBOARD');
  const [activeTab, setActiveTab] = useState('WEEKLY'); 
  const [isBackendLive, setIsBackendLive] = useState(false);
  const [showPenaltyAlert, setShowPenaltyAlert] = useState(false);
  
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [showRankUp, setShowRankUp] = useState(false);
  const prevLevelRef = useRef(1);
  const prevRankRef = useRef("E");

  const PENALTY_MAX_REQ = 15;

  const [player, setPlayer] = useState({
    name: "SUNG JINWOO", nameChangesLeft: 3, title: "The Disciplined", level: 1, currentXP: 0, requiredXP: 500, 
    gold: 0, inventory: [], 
    rank: "E", nextRank: "D", availableAP: 0, streakDays: 0, penaltyActive: 0, penaltyProgress: 0,
    stats: { strength: 10, agility: 10, vitality: 10, intelligence: 10, perception: 10 }
    
  });

  const [dailyTasks, setDailyTasks] = useState([]);
  const [quests, setQuests] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
  return localStorage.getItem('is_logged_in') === 'true';
});
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  

  // ================= SYSTEM AUDIO & VOICE ASSISTANT =================
  // ================= OFFLINE SYSTEM VOICE =================
  const speakSystemMessage = (text) => {
    if (!text || !window.speechSynthesis) return;
    window.speechSynthesis.cancel(); // پہلے سے چل رہی آواز کو روکے گا
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.volume = 0.8;
    utterance.rate = 1.0;
    utterance.pitch = 0.8;
    window.speechSynthesis.speak(utterance);
  };

  // ================= SYSTEM AUDIO =================
  const playSystemSound = (type) => {
    let audioFile = "";
    if (type === 'click') audioFile = clickAudio;
    if (type === 'level_up') audioFile = levelUpAudio;
    if (type === 'penalty') audioFile = penaltyAudio;
    if (type === 'buy') audioFile = buyAudio;

    if (audioFile) {
      const sound = new Audio(audioFile);
      sound.volume = 0.5;
      sound.play().catch(e => console.log("Audio blocked"));
    }
  };

  // ================= SYSTEM WELCOME GREETING =================
  useEffect(() => {
    if (!isAuthenticated) return; // 🛑 لاگ ان نہ ہو تو یہ ایفیکٹ نہ چلے

    const handleFirstClick = () => {
      // دونوں ڈائیلاگز کو ملا کر ایک کر دیا گیا ہے
      speakSystemMessage("System online. Welcome to the Solo Leveling System. Prepare for absolute discipline, Hunter.");
      window.removeEventListener('click', handleFirstClick);
    };

    window.addEventListener('click', handleFirstClick);
    return () => window.removeEventListener('click', handleFirstClick);
  }, [isAuthenticated]);

  // ================= FETCH & SYNC =================
  // ================= FETCH & SYNC =================
  useEffect(() => {
    if (!isAuthenticated) return; // 🛑 لاگ ان نہ ہو تو بیک گراؤنڈ ڈیٹا فیچ نہ ہو
    const fetchPlayerData = async () => {
      try {
        const playerId = localStorage.getItem('player_id') || 1; 
        const playerName = localStorage.getItem('solo_player_name') || "Hunter";

        const response = await fetch(`https://solo-leveling-project-hazel.vercel.app/player/${playerId}?name=${playerName}`);
        
        if (response.ok) {
          const dbData = await response.json();
          
          if (dbData.error) {
            console.error("System Error:", dbData.error);
            return;
          }

          setPlayer(prev => ({ ...prev, ...dbData }));
          
          prevLevelRef.current = dbData.level;
          prevRankRef.current = dbData.rank;

          setDailyTasks(dbData.dailyTasks);
          setQuests(dbData.centerQuests);
          
          // 🛑 PENALTY ZONE LOGIC 🛑
          if(dbData.penaltyActive === 1) {
            setActiveTab('PENALTY');
            setShowPenaltyAlert(true);
            speakSystemMessage("System Alert! Penalty Zone Activated.");

            // ==== NAYA EMAIL TRIGGER ====
            const playerEmail = localStorage.getItem('solo_player_email');
            const today = new Date().toDateString();
            const penaltyMailSent = localStorage.getItem(`penalty_mail_sent_${today}`);

            // Check karega ke kya aaj penalty ki mail pehle ja chuki hai?
            if (playerEmail && !penaltyMailSent) {
              fetch('https://solo-leveling-project-hazel.vercel.app/system/penalty-active', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ name: playerName, email: playerEmail })
              }).catch(err => console.log("Email System Error:", err));

              // System ko bata diya ke aaj ki mail chali gayi hai
              localStorage.setItem(`penalty_mail_sent_${today}`, 'true');
              console.log("System: Penalty Email Sent!");
            }
            // ============================
          }
          setIsBackendLive(true);
        }
      } catch (error) { setIsBackendLive(false); }
    };
    fetchPlayerData();
  }, [isAuthenticated]);

  const syncWithDatabase = (updatedPlayer, updatedTasks, updatedQuests) => {
    // 🛑 ڈیٹا سیو کرتے وقت بھی اسی ہنٹر کی ID جائے گی
    const playerId = localStorage.getItem('player_id') || 1; 

    fetch(`https://solo-leveling-project-hazel.vercel.app/player/update/${playerId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: updatedPlayer.name, nameChangesLeft: updatedPlayer.nameChangesLeft,
        level: updatedPlayer.level, currentXP: updatedPlayer.currentXP, requiredXP: updatedPlayer.requiredXP,
        gold: updatedPlayer.gold, inventory: updatedPlayer.inventory || [],
        availableAP: updatedPlayer.availableAP, streakDays: updatedPlayer.streakDays, penaltyActive: updatedPlayer.penaltyActive,
        penaltyProgress: updatedPlayer.penaltyProgress,
        stats: updatedPlayer.stats, dailyTasks: updatedTasks, centerQuests: updatedQuests
      })
    });
  };
  // ================= LOGIC FUNCTIONS =================
  const addXP = (amount, currentPlayer) => {
    let newLevel = currentPlayer.level;
    let newXp = currentPlayer.currentXP + amount;
    let newReqXP = currentPlayer.requiredXP;
    let newAP = currentPlayer.availableAP;

    while (newXp >= newReqXP) {
      newLevel += 1; 
      newXp -= newReqXP;
      
      // 🎯 SLOW & HARDCORE PROGRESSION FORMULA
      // Har level par required XP mein thoda sa azafa hoga (ya multiplier bhi laga sakte ho)
      newReqXP = Math.floor(newReqXP * 1.05 + 50); 
      
      newAP += 3; // Har level par 3 Stat Points milenge (Balanced)
    }
    
    if (newXp < 0) newXp = 0; 
    
    return { 
      ...currentPlayer, 
      level: newLevel, 
      currentXP: newXp, 
      requiredXP: newReqXP, 
      availableAP: newAP 
    };
  };

  const addStatPoint = (statKey) => {
    if (player.availableAP > 0) {
      playSystemSound('click');
      speakSystemMessage(`Stat ${statKey} increased.`);
      const updatedPlayer = {
        ...player, availableAP: player.availableAP - 1,
        stats: { ...player.stats, [statKey]: player.stats[statKey] + 1 }
      };
      setPlayer(updatedPlayer);
      syncWithDatabase(updatedPlayer, dailyTasks, quests);
    }
  };

  const toggleDailyTask = (taskId) => {
    playSystemSound('click');
    let updatedTasks = [];
    let updatedQuests = [...quests];
    let finalPlayerState = { ...player };

    setDailyTasks(prevTasks => {
      updatedTasks = prevTasks.map(task => {
        if (task.id === taskId) {
          const isNowComplete = !task.isComplete;
          finalPlayerState = addXP(isNowComplete ? task.xpReward : -task.xpReward, finalPlayerState);
          
          finalPlayerState.gold += isNowComplete ? task.goldReward : -task.goldReward;
          if (finalPlayerState.gold < 0) finalPlayerState.gold = 0;

          if (isNowComplete) { speakSystemMessage(`${task.title} completed!`); } 
          else { speakSystemMessage(`${task.title} unchecked.`); }
          
          // NAYA LOGIC: Har Task Check hone par MAIN, WEEKLY, aur EVENT quest ki progress barhegi!
          updatedQuests = updatedQuests.map(q => {
            if (!q.isClaimed) {
              let newProg = q.progress + (isNowComplete ? 1 : -1);
              if (newProg < 0) newProg = 0;
              if (newProg > q.maxProgress) newProg = q.maxProgress;
              return { ...q, progress: newProg };
            }
            return q;
          });

          return { ...task, isComplete: isNowComplete, currentProgress: isNowComplete ? task.maxProgress : 0 };
        }
        return task;
      });
      
      const allTasksCompleted = updatedTasks.every(t => t.isComplete);
      if (allTasksCompleted && updatedTasks.length > 0) {
        speakSystemMessage("All tasks completed! Thank you so much, Hunter. Consistency is the key.");
        
        // 🛑 NEW EMAIL TRIGGER LOGIC 🛑
        const playerEmail = localStorage.getItem('solo_player_email');
        const playerName = localStorage.getItem('solo_player_name');
        
        if (playerEmail) {
            fetch('https://solo-leveling-project-hazel.vercel.app/quest/daily-complete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: playerName, email: playerEmail })
            }).catch(err => console.log("Email System Error:", err));
        }
        // 🛑 ===================== 🛑
      }

      setQuests(updatedQuests);
      setPlayer(finalPlayerState);
      syncWithDatabase(finalPlayerState, updatedTasks, updatedQuests);
      return updatedTasks;
    });
  };

  const claimQuestReward = (questId) => {
    playSystemSound('level_up');
    speakSystemMessage("Quest reward claimed!");
    let finalPlayerState = { ...player };
    const updatedQuests = quests.map(q => {
      if (q.id === questId && q.progress >= q.maxProgress && !q.isClaimed) {
        finalPlayerState = addXP(q.xpReward, finalPlayerState);
        finalPlayerState.gold += q.goldReward; 
        return { ...q, isClaimed: true };
      }
      return q;
    });
    setQuests(updatedQuests);
    setPlayer(finalPlayerState);
    syncWithDatabase(finalPlayerState, dailyTasks, updatedQuests);
  };

  const incrementPenaltyTask = () => {
    playSystemSound('click');
    let newProg = player.penaltyProgress + 1;
    speakSystemMessage(`Penalty progress ${newProg} of ${PENALTY_MAX_REQ}`);
    if (newProg >= PENALTY_MAX_REQ) {
      playSystemSound('level_up');
      speakSystemMessage("Survival successful! System returning to online mode.");
      const updatedPlayer = { ...player, penaltyActive: 0, streakDays: 0, penaltyProgress: 0 };
      setPlayer(updatedPlayer);
      setActiveTab('WEEKLY');
      syncWithDatabase(updatedPlayer, dailyTasks, quests);
    } else {
      const updatedPlayer = { ...player, penaltyProgress: newProg };
      setPlayer(updatedPlayer);
      syncWithDatabase(updatedPlayer, dailyTasks, quests);
    }
  };

  const handleNameEdit = () => {
    playSystemSound('click');
    if (player.nameChangesLeft <= 0) {
      speakSystemMessage("Name change limit exhausted.");
      alert("⚠️ You have used all 3 of your name changes. This name is now permanent in the System.");
      return;
    }
    const newName = prompt(`Enter your new Hunter Name\n\n⚠️ You can only change your name ${player.nameChangesLeft} more times!`, player.name);
    
    if (newName && newName.trim() !== "" && newName !== player.name) {
      const updatedPlayer = { 
        ...player, 
        name: newName.trim().toUpperCase(), 
        nameChangesLeft: player.nameChangesLeft - 1 
      };
      setPlayer(updatedPlayer);
      syncWithDatabase(updatedPlayer, dailyTasks, quests);
      speakSystemMessage(`Hunter name updated to ${newName.trim()}`);
    }
  };

  const buyShopItem = (cost, itemName) => {
    if (player.gold >= cost) {
      playSystemSound('buy');
      speakSystemMessage(`${itemName} purchased and added to inventory.`);
      const newItem = { id: Date.now(), name: itemName };
      const updatedPlayer = { ...player, gold: player.gold - cost, inventory: [...player.inventory, newItem] };
      setPlayer(updatedPlayer);
      syncWithDatabase(updatedPlayer, dailyTasks, quests);
    } else {
      playSystemSound('click');
      speakSystemMessage("Insufficient gold.");
    }
  };

  const useInventoryItem = (itemId, itemName) => {
    playSystemSound('level_up');
    speakSystemMessage(`${itemName} consumed. Buff activated!`);
    
    const updatedInventory = player.inventory.filter(item => item.id !== itemId);
    const updatedPlayer = { ...player, inventory: updatedInventory };
    setPlayer(updatedPlayer);
    syncWithDatabase(updatedPlayer, dailyTasks, quests);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date(); setCurrentTime(now);
      const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
      const diff = tomorrow - now;
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24).toString().padStart(2, '0');
      const m = Math.floor((diff / 1000 / 60) % 60).toString().padStart(2, '0');
      const s = Math.floor((diff / 1000) % 60).toString().padStart(2, '0');
      setResetTimer(`${h}:${m}:${s}`);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const formattedDate = currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  const filteredQuests = quests.filter(quest => quest.category === activeTab);
  const currentMonthYear = currentTime.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }).toUpperCase();
  const weekDayLabels = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  const currentDayIndex = currentTime.getDay() === 0 ? 6 : currentTime.getDay() - 1;

  const currentWeekDays = useMemo(() => {
    const days = [];
    const date = new Date(currentTime);
    const distanceToMonday = date.getDay() === 0 ? 6 : date.getDay() - 1; 
    const monday = new Date(date); monday.setDate(date.getDate() - distanceToMonday);
    for (let i = 0; i < 7; i++) {
      const d = new Date(monday); d.setDate(monday.getDate() + i); days.push(d);
    }
    return days;
  }, [currentTime]);

  const getDayStatus = (dateStr) => {
    const checkDate = new Date(dateStr); checkDate.setHours(0,0,0,0);
    const today = new Date(currentTime); today.setHours(0,0,0,0);
    if (checkDate.getTime() === today.getTime()) return 'prog'; 
    if (checkDate.getTime() < today.getTime()) return 'miss';   
    return null; 
  };

  const getStatBarWidth = (val) => { return Math.min((val / (val + 100)) * 100, 100); };

  const handleNavClick = (pageName) => {
    playSystemSound('click');
    setActivePage(pageName);
  };

  // ================= PAGE RENDERS =================
  const renderDashboard = () => (
    <>
      <div className="glass-panel hero-container" style={{boxShadow: player.penaltyActive ? 'inset 0 0 80px rgba(239, 68, 68, 0.4)' : ''}}>
        <div className="hero-top-row">
          {player.penaltyActive ? (
              <div style={{ color: '#ef4444', fontSize: '1.2rem', fontWeight: 'bold' }}>⚠️ COMPLETE PENALTY TASK TO SURVIVE ⚠️</div>
          ) : (
              <div className="h-quote">'"The difference between ordinary and extraordinary is that little extra."'</div>
          )}
          
          <div className="h-status">
            <div className="h-stat-badge" style={{ borderColor: isBackendLive ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)', color: isBackendLive ? '#22c55e' : '#ef4444' }}>
              <div className="h-dot" style={{ backgroundColor: isBackendLive ? '#22c55e' : '#ef4444' }}></div> 
              {isBackendLive ? 'ONLINE' : 'OFFLINE'}
            </div>
            <div style={{display: 'flex', gap: '10px'}}>
               <div className="h-stat-badge" style={{ borderColor: '#fbbf24', color: '#fbbf24', marginTop: '8px', background: 'rgba(251, 191, 36, 0.1)' }}>
                 AP: {player.availableAP}
               </div>
               <div className="h-stat-badge" style={{ borderColor: '#fbbf24', color: '#fbbf24', marginTop: '8px', background: 'rgba(251, 191, 36, 0.1)', boxShadow: '0 0 10px rgba(251, 191, 36, 0.4)' }}>
                 🟡 {player.gold} G
               </div>
            </div>
          </div>
        </div>
        
        <div className="hero-stats-bar">
          {['strength', 'agility', 'vitality', 'intelligence', 'perception'].map(stat => (
            <div className="stat-item" key={stat}>
              <div className="stat-name">
                {stat === 'strength' && <StatArm />}
                {stat === 'agility' && <StatRun />}
                {stat === 'vitality' && <StatHeart />}
                {stat === 'intelligence' && <StatBrain />}
                {stat === 'perception' && <StatEye />}
                {stat.toUpperCase()}
                {player.availableAP > 0 && (
                  <span onClick={() => addStatPoint(stat)} style={{color: '#fbbf24', cursor: 'pointer', marginLeft: '6px', fontSize: '1.2rem', fontWeight: 'bold', textShadow: '0 0 5px #fbbf24'}}>+</span>
                )}
              </div>
              <div className="stat-val">{player.stats[stat]}</div>
              <div className="stat-line-bg"><div className="stat-line-fill" style={{width: `${getStatBarWidth(player.stats[stat])}%`, background: player.penaltyActive ? '#ef4444' : '', boxShadow: player.penaltyActive ? '0 0 5px #ef4444' : ''}}></div></div>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-panel quests-container">
        <div className="q-tabs-row">
          <div className="q-tab title">ACTIVE QUESTS</div>
          {(player.penaltyActive ? ['PENALTY TASK'] : ['WEEKLY', 'MAIN', 'EVENT']).map((tab) => (
            <div key={tab} className={`q-tab ${activeTab === tab || (player.penaltyActive && tab === 'PENALTY TASK') ? 'active' : ''}`} 
                 onClick={() => { playSystemSound('click'); !player.penaltyActive && setActiveTab(tab); }} 
                 style={{borderColor: player.penaltyActive ? '#ef4444' : '', color: player.penaltyActive ? '#ef4444' : ''}}>
              {tab}
            </div>
          ))}
        </div>

        <div className="q-list">
          {player.penaltyActive ? (
            <div className="q-row" style={{background: 'rgba(239, 68, 68, 0.05)', borderLeft: '3px solid #ef4444'}}>
                <div className="q-left">
                  <div className="q-icon-box" style={{borderColor: '#ef4444', background: 'rgba(239, 68, 68, 0.15)'}}>
                    <span style={{color: '#ef4444'}}>💀</span>
                  </div>
                  <div style={{width: '100%'}}>
                    <div className="q-info">
                      <h4>Penalty Quest: Survival</h4>
                      <p>Run 15 km to survive. You must complete this to restore the System!</p>
                    </div>
                    <div className="q-prog-bg">
                      <div className="q-prog-fill" style={{width: `${(player.penaltyProgress / PENALTY_MAX_REQ) * 100}%`, background: '#ef4444', boxShadow: `0 0 5px #ef4444`}}></div>
                      <div className="q-prog-txt">{player.penaltyProgress} / {PENALTY_MAX_REQ} km</div>
                    </div>
                  </div>
                </div>
                <div className="q-right">
                  <button onClick={incrementPenaltyTask} style={{background: 'transparent', color: '#ef4444', border: '1px solid #ef4444', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold'}}>
                    PROGRESS (+1)
                  </button>
                </div>
            </div>
          ) : filteredQuests.length > 0 ? (
            filteredQuests.map((quest) => (
              <div className="q-row" key={quest.id} style={{ opacity: quest.isClaimed ? 0.6 : 1 }}>
                <div className="q-left">
                  <div className="q-icon-box" style={{borderColor: quest.color, background: `${quest.color}15`}}>
                    <span style={{color: quest.color}}>{quest.icon}</span>
                  </div>
                  <div style={{width: '100%'}}>
                    <div className="q-info">
                      <h4 style={{ textDecoration: quest.isClaimed ? 'line-through' : 'none' }}>{quest.title}</h4>
                      <p>{quest.description}</p>
                    </div>
                    <div className="q-prog-bg">
                      <div className="q-prog-fill" style={{width: `${(quest.progress / quest.maxProgress) * 100}%`, background: quest.color, boxShadow: `0 0 5px ${quest.color}`}}></div>
                      <div className="q-prog-txt">{quest.progress} / {quest.maxProgress}</div>
                    </div>
                  </div>
                </div>
                <div className="q-right" style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '5px'}}>
                  {quest.isClaimed ? (
                    <span style={badgeDone}>COMPLETED</span>
                  ) : quest.progress >= quest.maxProgress ? (
                    <button style={{...btnClaim, background: quest.color, boxShadow: `0 0 8px ${quest.color}`}} onClick={() => claimQuestReward(quest.id)}>
                      CLAIM REWARD
                    </button>
                  ) : (
                    <span style={{color: '#8b8b99', fontSize: '0.75rem', fontStyle: 'italic'}}>Auto-tracks</span>
                  )}
                  <div style={{display: 'flex', gap: '15px', marginTop: '4px'}}>
                    <div style={{color: quest.color}}>XP {quest.xpReward.toLocaleString()}</div>
                    <div style={{color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '5px'}}>🟡 {quest.goldReward.toLocaleString()}</div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div style={{color: '#8b8b99', textAlign: 'center', marginTop: '20px'}}>No active quests in this category.</div>
          )}
        </div>
      </div>
    </>
  );

  const renderQuests = () => (
    <div className="glass-panel" style={{height: '600px', display: 'flex', flexDirection: 'column'}}>
      <h3 style={{color: '#8b5cf6', letterSpacing: '2px', borderBottom: '1px solid rgba(139, 92, 246, 0.3)', paddingBottom: '10px', marginBottom: '20px'}}>ALL QUEST LOGS</h3>
      <div style={{overflowY: 'auto', paddingRight: '10px', flex: 1}}>
        {quests.map((quest) => (
          <div className="q-row" key={quest.id} style={{ marginBottom: '15px', background: 'rgba(12, 10, 22, 0.6)', padding: '15px', borderRadius: '8px', border: `1px solid ${quest.color}` }}>
            <div className="q-left">
              <div className="q-icon-box" style={{borderColor: quest.color, background: `${quest.color}15`}}>
                <span style={{color: quest.color}}>{quest.icon}</span>
              </div>
              <div style={{width: '100%'}}>
                <div className="q-info">
                  <span style={{fontSize: '0.7rem', color: quest.color, fontWeight: 'bold', letterSpacing: '1px'}}>{quest.category}</span>
                  <h4>{quest.title}</h4>
                  <p>{quest.description}</p>
                </div>
                <div className="q-prog-bg">
                  <div className="q-prog-fill" style={{width: `${(quest.progress / quest.maxProgress) * 100}%`, background: quest.color, boxShadow: `0 0 5px ${quest.color}`}}></div>
                  <div className="q-prog-txt">{quest.progress} / {quest.maxProgress}</div>
                </div>
              </div>
            </div>
            <div className="q-right">
               <div style={{color: quest.color, fontWeight: 'bold'}}>XP {quest.xpReward}</div>
               <div style={{color: '#fbbf24', fontWeight: 'bold'}}>🟡 {quest.goldReward}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderStats = () => {
    // Derived Stats Calculation
    const hp = player.stats.vitality * 25 + (player.level * 10);
    const mp = player.stats.intelligence * 20 + (player.level * 5);
    const combatPower = (player.level * 50) + (player.stats.strength * 5) + (player.stats.intelligence * 5) + (player.stats.agility * 3) + (player.stats.vitality * 4) + (player.stats.perception * 3);

    return (
      <div className="glass-panel" style={{height: '600px', display: 'flex', flexDirection: 'column'}}>
        <h3 style={{color: '#8b5cf6', letterSpacing: '2px', borderBottom: '1px solid rgba(139, 92, 246, 0.3)', paddingBottom: '10px', marginBottom: '20px'}}>DETAILED STATISTICS</h3>
        
        <div style={{overflowY: 'auto', paddingRight: '10px', flex: 1}}>
          {/* Main Info */}
          <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '20px', textAlign: 'center'}}>
            <div style={{flex: 1, padding: '15px', background: 'rgba(139, 92, 246, 0.1)', borderRadius: '8px', marginRight: '10px', border: '1px solid rgba(139, 92, 246, 0.3)'}}>
              <div style={{color: '#8b8b99', fontSize: '0.8rem'}}>TOTAL XP</div>
              <div style={{color: '#8b5cf6', fontSize: '1.5rem', fontWeight: 'bold'}}>{player.currentXP}</div>
            </div>
            <div style={{flex: 1, padding: '15px', background: 'rgba(251, 191, 36, 0.1)', borderRadius: '8px', marginRight: '10px', border: '1px solid rgba(251, 191, 36, 0.3)'}}>
              <div style={{color: '#8b8b99', fontSize: '0.8rem'}}>RANK</div>
              <div style={{color: '#fbbf24', fontSize: '1.5rem', fontWeight: 'bold'}}>{player.rank}</div>
            </div>
            <div style={{flex: 1, padding: '15px', background: 'rgba(34, 197, 94, 0.1)', borderRadius: '8px', border: '1px solid rgba(34, 197, 94, 0.3)'}}>
              <div style={{color: '#8b8b99', fontSize: '0.8rem'}}>LEVEL</div>
              <div style={{color: '#22c55e', fontSize: '1.5rem', fontWeight: 'bold'}}>{player.level}</div>
            </div>
          </div>

          {/* Combat Power & Health/Mana */}
          <div style={{background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '20px', borderRadius: '8px', marginBottom: '20px', textAlign: 'center'}}>
            <h4 style={{color: '#ef4444', letterSpacing: '3px', margin: '0 0 10px 0'}}>ESTIMATED COMBAT POWER (CP)</h4>
            <div style={{fontSize: '2.5rem', fontWeight: 'bold', color: '#f8fafc', textShadow: '0 0 15px rgba(239, 68, 68, 0.5)'}}>{combatPower.toLocaleString()}</div>
            
            <div style={{display: 'flex', justifyContent: 'center', gap: '30px', marginTop: '15px'}}>
               <div><span style={{color: '#22c55e', fontWeight: 'bold'}}>HP:</span> <span style={{color: '#f8fafc'}}>{hp} / {hp}</span></div>
               <div><span style={{color: '#3b82f6', fontWeight: 'bold'}}>MP:</span> <span style={{color: '#f8fafc'}}>{mp} / {mp}</span></div>
            </div>
          </div>

          {/* Base Stats Bar */}
          <h4 style={{color: '#f8fafc', marginBottom: '15px'}}>BASE ATTRIBUTES</h4>
          <div className="hero-stats-bar">
            {['strength', 'agility', 'vitality', 'intelligence', 'perception'].map(stat => (
              <div className="stat-item" key={stat} style={{padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.05)'}}>
                <div className="stat-name" style={{fontSize: '0.9rem'}}>{stat.toUpperCase()}</div>
                <div className="stat-val" style={{fontSize: '1.1rem', color: '#f8fafc'}}>{player.stats[stat]}</div>
                <div className="stat-line-bg" style={{height: '8px'}}><div className="stat-line-fill" style={{height: '8px', width: `${getStatBarWidth(player.stats[stat])}%`, background: '#8b5cf6'}}></div></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderSkills = () => (
    <div className="glass-panel" style={{height: '600px', display: 'flex', flexDirection: 'column'}}>
      <h3 style={{color: '#8b5cf6', letterSpacing: '2px', borderBottom: '1px solid rgba(139, 92, 246, 0.3)', paddingBottom: '10px', marginBottom: '20px'}}>SKILL TREE</h3>
      <div style={{overflowY: 'auto', paddingRight: '10px', flex: 1}}>
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px'}}>
             
             {/* Dynamic Locked/Unlocked Skills Based on Stats */}
             {[
               {name: "Sprint", cond: true, req: "None", desc: "Increases task completion speed by 10%.", level: 1},
               {name: "Bloodlust", cond: true, req: "None", desc: "Grants 5% bonus XP on Gym tasks.", level: 1},
               {name: "Programmer's Focus", cond: player.stats.intelligence >= 15, req: "Intelligence &gt; 15", desc: "Zero distractions during coding blocks.", level: 2},
               {name: "Iron Body", cond: player.stats.strength >= 20, req: "Strength &gt; 20", desc: "Reduces fatigue from physical tasks.", level: 1},
               {name: "Mind Palace", cond: player.stats.intelligence >= 25, req: "Intelligence &gt; 25", desc: "Boosts memory retention by 15%.", level: 1},
               
               {name: "Vital Strike", cond: player.stats.strength >= 30, req: "Strength &gt; 30", desc: "Critical hits on heavy tasks (Bonus XP).", level: 1},
               {name: "Dagger Arts", cond: player.stats.agility >= 30, req: "Agility &gt; 30", desc: "Mastery over swift short tasks.", level: 1},
               {name: "Sense Danger", cond: player.stats.perception >= 30, req: "Perception &gt; 30", desc: "Early warnings before missing a streak.", level: 1},
               
               {name: "Stealth", cond: player.stats.agility >= 40, req: "Agility &gt; 40", desc: "Ability to work completely unnoticed.", level: 2},
               {name: "Longevity", cond: player.stats.vitality >= 40, req: "Vitality &gt; 40", desc: "Need less sleep to fully recover HP.", level: 1},
               
               {name: "Shadow Extraction", cond: player.stats.intelligence >= 50 && player.level >= 40, req: "Intelligence &gt; 50 & Lvl 40", desc: "Arise. Automate repetitive digital tasks.", level: 3},
               {name: "Ruler's Authority", cond: player.stats.perception >= 50, req: "Perception &gt; 50", desc: "Absolute control over your environment.", level: 3},
               {name: "Colossal Strength", cond: player.stats.strength >= 60, req: "Strength &gt; 60", desc: "Lift ungodly amounts of weight.", level: 3},
               {name: "Monarch's Domain", cond: player.stats.intelligence >= 70, req: "Intelligence &gt; 70", desc: "Time seems to slow down while you focus.", level: "MAX"}
             ].map(s => (
                <div key={s.name} style={{padding: '20px', background: s.cond ? 'rgba(34, 197, 94, 0.1)' : 'rgba(255, 255, 255, 0.02)', border: s.cond ? '1px solid rgba(34, 197, 94, 0.4)' : '1px dashed rgba(255, 255, 255, 0.2)', borderRadius: '8px', opacity: s.cond ? 1 : 0.5}}>
                    <h4 style={{color: s.cond ? '#22c55e' : '#f8fafc', margin: '0 0 10px 0'}}>{s.name} {!s.cond && <span style={{fontSize:'0.7rem', color:'#ef4444'}}>LOCKED</span>}</h4>
                    <p style={{color: '#8b8b99', fontSize: '0.85rem', margin: '0 0 8px 0'}}>{s.desc}</p>
                    <p style={{color: s.cond ? '#22c55e' : '#ef4444', fontSize: '0.75rem', fontWeight: 'bold', margin: 0}}>{s.cond ? `Skill Unlocked! (Lvl ${s.level})` : `Req: ${s.req}`}</p>
                </div>
             ))}
          </div>
      </div>
    </div>
  );

  const renderCalendar = () => {
    // Dynamic Calendar Logic
    const year = currentTime.getFullYear();
    const month = currentTime.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // 0 = Sunday, 1 = Monday. We want Monday to be the first column
    let firstDay = new Date(year, month, 1).getDay();
    firstDay = firstDay === 0 ? 6 : firstDay - 1; 

    const blanks = Array.from({ length: firstDay }, (_, i) => i);
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const currentDay = currentTime.getDate();

    return (
      <div className="glass-panel" style={{height: '600px', display: 'flex', flexDirection: 'column'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(139, 92, 246, 0.3)', paddingBottom: '10px', marginBottom: '20px'}}>
           <h3 style={{color: '#8b5cf6', letterSpacing: '2px', margin: 0}}>HUNTER'S LOG</h3>
           <div style={{color: '#f8fafc', fontWeight: 'bold', letterSpacing: '2px'}}>
              {currentTime.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }).toUpperCase()}
           </div>
        </div>

        {/* Calendar Grid Header */}
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '10px', textAlign: 'center', marginBottom: '15px'}}>
           {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map(d => (
             <div key={d} style={{color: '#8b8b99', fontSize: '0.8rem', fontWeight: 'bold'}}>{d}</div>
           ))}
        </div>

        {/* Calendar Days */}
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '10px', flex: 1, overflowY: 'auto', paddingRight: '5px', paddingBottom: '10px'}}>
           {blanks.map(b => (
             <div key={`blank-${b}`} style={{padding: '15px', background: 'transparent'}}></div>
           ))}
           
           {days.map(d => {
              const isToday = d === currentDay;
              const isPast = d < currentDay;
              // Agar pichla din streak ke andar hai to usko 'Cleared' dikhao
              const isCleared = isPast && (currentDay - d <= player.streakDays);

              let bg = 'rgba(255, 255, 255, 0.02)';
              let border = '1px solid rgba(255, 255, 255, 0.05)';
              let textColor = '#8b8b99';

              if (isToday) {
                 bg = player.penaltyActive ? 'rgba(239, 68, 68, 0.2)' : 'rgba(139, 92, 246, 0.2)';
                 border = player.penaltyActive ? '1px solid #ef4444' : '1px solid #8b5cf6';
                 textColor = '#f8fafc';
              } else if (isCleared) {
                 bg = 'rgba(34, 197, 94, 0.1)';
                 border = '1px solid rgba(34, 197, 94, 0.3)';
                 textColor = '#22c55e';
              }

              return (
                <div key={d} style={{padding: '15px 5px', background: bg, border: border, borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', boxShadow: isToday ? '0 0 15px rgba(139,92,246,0.3)' : 'none'}}>
                  <span style={{color: textColor, fontWeight: 'bold', fontSize: '1.3rem'}}>{d}</span>
                  
                  {isCleared && <span style={{fontSize: '0.6rem', color: '#22c55e', marginTop: '5px', fontWeight: 'bold', letterSpacing: '1px'}}>CLEAR</span>}
                  {isToday && <span style={{fontSize: '0.6rem', color: player.penaltyActive ? '#ef4444' : '#8b5cf6', marginTop: '5px', fontWeight: 'bold', letterSpacing: '1px'}}>TODAY</span>}
                  {isPast && !isCleared && <span style={{fontSize: '0.6rem', color: '#ef4444', marginTop: '5px', fontWeight: 'bold', letterSpacing: '1px'}}>MISSED</span>}
                </div>
              )
           })}
        </div>

        {/* Monthly Progress Bar */}
        <div style={{marginTop: '15px', background: 'rgba(12, 10, 22, 0.6)', padding: '20px', borderRadius: '8px', border: '1px solid rgba(139, 92, 246, 0.2)'}}>
           <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '8px'}}>
              <span style={{color: '#f8fafc', fontSize: '0.9rem', fontWeight: 'bold'}}>Current Consistency Streak</span>
              <span style={{color: '#fbbf24', fontWeight: 'bold', fontSize: '1.2rem'}}>🔥 {player.streakDays} Days</span>
           </div>
           <div style={{height: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '5px', overflow: 'hidden'}}>
              <div style={{height: '100%', width: `${Math.min((player.streakDays / 30) * 100, 100)}%`, background: 'linear-gradient(90deg, #fbbf24, #f59e0b)', boxShadow: '0 0 10px #fbbf24'}}></div>
           </div>
           <p style={{color: '#8b8b99', fontSize: '0.75rem', marginTop: '10px', textAlign: 'center', margin: '10px 0 0 0'}}>Reach 30 days to unlock the Discipline Master achievement.</p>
        </div>
      </div>
    );
  };

  const renderAchievements = () => (
    <div className="glass-panel" style={{height: '600px', display: 'flex', flexDirection: 'column'}}>
      <h3 style={{color: '#8b5cf6', letterSpacing: '2px', borderBottom: '1px solid rgba(139, 92, 246, 0.3)', paddingBottom: '10px', marginBottom: '20px'}}>ACHIEVEMENTS & MILESTONES</h3>
      <div style={{overflowY: 'auto', paddingRight: '10px', flex: 1}}>
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px'}}>
             {[
               {title: "First Awakening", desc: "Complete your first task.", cond: true, icon: "🔥"},
               {title: "The First Step", desc: "Reach Level 10.", cond: player.level >= 10, icon: "🌱"},
               {title: "Hunter's Ascent", desc: "Reach Level 25.", cond: player.level >= 25, icon: "⚔️"},
               {title: "National Level Hunter", desc: "Reach Level 75.", cond: player.level >= 75, icon: "🌍"},
               {title: "Monarch", desc: "Reach Level 100.", cond: player.level >= 100, icon: "👑"},
               
               {title: "Iron Will", desc: "Reach a 7-Day Streak.", cond: player.streakDays >= 7, icon: "📅"},
               {title: "Discipline Master", desc: "Reach a 30-Day Streak.", cond: player.streakDays >= 30, icon: "⏳"},
               {title: "Unbreakable", desc: "Reach a 100-Day Streak.", cond: player.streakDays >= 100, icon: "💎"},
               
               {title: "Gym Rat", desc: "Reach Strength 30.", cond: player.stats.strength >= 30, icon: "🏋️"},
               {title: "Absolute Strength", desc: "Reach Strength 60.", cond: player.stats.strength >= 60, icon: "💪"},
               
               {title: "Code Master", desc: "Reach Intelligence 30.", cond: player.stats.intelligence >= 30, icon: "💻"},
               {title: "Absolute Intellect", desc: "Reach Intelligence 60.", cond: player.stats.intelligence >= 60, icon: "🧠"},
               
               {title: "Assassin's Pace", desc: "Reach Agility 50.", cond: player.stats.agility >= 50, icon: "⚡"},
               {title: "Tank's Vitality", desc: "Reach Vitality 50.", cond: player.stats.vitality >= 50, icon: "🛡️"},
               {title: "Ruler's Eyes", desc: "Reach Perception 50.", cond: player.stats.perception >= 50, icon: "👁️"},
               
               {title: "Early Bird", desc: "Complete Fajr for 7 days.", cond: player.streakDays >= 7, icon: "🌅"},
               {title: "Relentless", desc: "Recover from a Penalty.", cond: player.penaltyProgress >= 15, icon: "🩸"},
               {title: "Shadow Lord", desc: "Unlock Shadow Extraction.", cond: player.stats.intelligence >= 50 && player.level >= 40, icon: "🌑"},
               
               {title: "Wealthy Hunter", desc: "Accumulate 10,000 Gold.", cond: player.gold >= 10000, icon: "💰"},
               {title: "Millionaire", desc: "Accumulate 50,000 Gold.", cond: player.gold >= 50000, icon: "🏦"}
             ].map((ach, idx) => (
                <div key={idx} style={{textAlign: 'center', padding: '20px', background: ach.cond ? 'rgba(251, 191, 36, 0.1)' : 'rgba(255, 255, 255, 0.02)', border: ach.cond ? '1px solid rgba(251, 191, 36, 0.5)' : '1px dashed rgba(255, 255, 255, 0.2)', borderRadius: '8px', opacity: ach.cond ? 1 : 0.4}}>
                    <div style={{fontSize: '3rem', marginBottom: '10px', filter: ach.cond ? 'none' : 'grayscale(100%)'}}>{ach.icon}</div>
                    <h5 style={{color: ach.cond ? '#fbbf24' : '#f8fafc', margin: '0 0 5px 0'}}>{ach.title}</h5>
                    <p style={{fontSize: '0.75rem', color: '#8b8b99', margin: 0}}>{ach.desc}</p>
                </div>
             ))}
          </div>
      </div>
    </div>
  );

  const renderShop = () => (
    <div className="glass-panel" style={{height: '600px', display: 'flex', flexDirection: 'column'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(139, 92, 246, 0.3)', paddingBottom: '10px', marginBottom: '20px'}}>
         <h3 style={{color: '#8b5cf6', letterSpacing: '2px', margin: 0}}>SYSTEM STORE & INVENTORY</h3>
         <div style={{background: 'rgba(251, 191, 36, 0.2)', padding: '5px 15px', borderRadius: '20px', border: '1px solid #fbbf24', color: '#fbbf24', fontWeight: 'bold'}}>
             Balance: 🟡 {player.gold} G
         </div>
      </div>
      
      <div style={{display: 'flex', gap: '20px', flex: 1, overflow: 'hidden'}}>
        {/* SHOP ITEMS */}
        <div style={{flex: 2, overflowY: 'auto', paddingRight: '10px'}}>
          <h4 style={{color: '#f8fafc', marginBottom: '15px'}}>MERCHANT'S WARES</h4>
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px'}}>
             {[
               {name: "Health Potion", desc: "Consume to allow 1 cheat meal guilt-free.", cost: 500, color: "#ef4444"},
               {name: "System Recovery", desc: "Take a day off, save your streak.", cost: 2000, color: "#3b82f6"},
               {name: "Dopamine Scroll", desc: "1 Hour of Anime/Gaming.", cost: 300, color: "#10b981"},
               {name: "Premium Elixir", desc: "Buy a fancy coffee outside.", cost: 150, color: "#8b5cf6"},
               {name: "Skip Gym Ticket", desc: "Legally skip gym without penalty.", cost: 1000, color: "#f97316"},
               {name: "Double XP Token", desc: "Double XP for tomorrow's tasks.", cost: 1500, color: "#fbbf24"},
               {name: "Sleep Elixir", desc: "Sleep in for 2 extra hours guilt-free.", cost: 800, color: "#a855f7"},
               {name: "Movie Night Pass", desc: "Watch a full movie, no penalties.", cost: 1200, color: "#06b6d4"},
               {name: "Fast Food Scroll", desc: "Order your favorite junk food.", cost: 700, color: "#f43f5e"},
               {name: "Developer's Tool", desc: "Buy a premium software/plugin.", cost: 2500, color: "#6366f1"},
               {name: "Monarch's Wardrobe", desc: "Buy a new piece of clothing.", cost: 3000, color: "#d946ef"},
               {name: "Tech Gadget Fund", desc: "Transfer to real-life tech savings.", cost: 5000, color: "#ec4899"}
             ].map(item => (
                <div key={item.name} style={{padding: '15px', background: `${item.color}15`, border: `1px solid ${item.color}50`, borderRadius: '8px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                    <div>
                      <h4 style={{color: item.color, margin: '0 0 5px 0', fontSize: '1rem'}}>{item.name}</h4>
                      <p style={{color: '#8b8b99', fontSize: '0.75rem', margin: '0 0 10px 0'}}>{item.desc}</p>
                    </div>
                    <button onClick={() => buyShopItem(item.cost, item.name)} style={{background: player.gold >= item.cost ? 'rgba(251, 191, 36, 0.2)' : 'rgba(255,255,255,0.05)', border: player.gold >= item.cost ? '1px solid #fbbf24' : '1px solid gray', color: player.gold >= item.cost ? '#fbbf24' : 'gray', padding: '6px', borderRadius: '4px', cursor: player.gold >= item.cost ? 'pointer' : 'not-allowed', fontWeight: 'bold'}}>
                        BUY 🟡 {item.cost}
                    </button>
                </div>
             ))}
          </div>
        </div>

        {/* INVENTORY */}
        <div style={{flex: 1, background: 'rgba(255,255,255,0.02)', borderLeft: '1px solid rgba(139, 92, 246, 0.2)', paddingLeft: '20px', overflowY: 'auto'}}>
          <h4 style={{color: '#8b5cf6', marginBottom: '15px'}}>YOUR BAG</h4>
          {player.inventory.length === 0 ? (
             <p style={{color: '#8b8b99', fontSize: '0.8rem', fontStyle: 'italic'}}>Inventory is empty. Buy items from the store to use them here.</p>
          ) : (
             player.inventory.map(item => (
               <div key={item.id} style={{padding: '10px', background: 'rgba(139, 92, 246, 0.1)', border: '1px solid #8b5cf6', borderRadius: '6px', marginBottom: '10px'}}>
                  <div style={{color: '#f8fafc', fontSize: '0.9rem', marginBottom: '5px'}}>{item.name}</div>
                  <button onClick={() => useInventoryItem(item.id, item.name)} style={{background: '#8b5cf6', color: '#fff', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.7rem', width: '100%', fontWeight: 'bold'}}>
                     USE ITEM
                  </button>
               </div>
             ))
          )}
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="glass-panel" style={{height: '600px', display: 'flex', flexDirection: 'column'}}>
      <h3 style={{color: '#8b5cf6', letterSpacing: '2px', borderBottom: '1px solid rgba(139, 92, 246, 0.3)', paddingBottom: '10px', marginBottom: '20px'}}>SYSTEM & ACCOUNT SETTINGS</h3>
      
      <div style={{overflowY: 'auto', paddingRight: '10px'}}>
        <h4 style={{color: '#f8fafc', marginBottom: '10px'}}>ACCOUNT DETAILS</h4>
        <div style={{display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '30px'}}>
           <div style={{display: 'flex', justifyContent: 'space-between', padding: '15px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)'}}>
              <div style={{color: '#8b8b99'}}>Logged in as</div>
              <div style={{color: '#f8fafc', fontWeight: 'bold'}}>{player.name}</div>
           </div>
           <div style={{display: 'flex', justifyContent: 'space-between', padding: '15px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)'}}>
              <div style={{color: '#8b8b99'}}>Name Changes Left</div>
              <div style={{color: player.nameChangesLeft > 0 ? '#22c55e' : '#ef4444', fontWeight: 'bold'}}>{player.nameChangesLeft} / 3</div>
           </div>
        </div>

        <h4 style={{color: '#f8fafc', marginBottom: '10px'}}>PREFERENCES</h4>
        <div style={{display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '30px'}}>
           <div style={{display: 'flex', justifyContent: 'space-between', padding: '15px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px'}}>
              <div style={{color: '#f8fafc'}}>System Voice AI</div>
              <div style={{color: '#22c55e', fontWeight: 'bold'}}>ONLINE</div>
           </div>
           <div style={{display: 'flex', justifyContent: 'space-between', padding: '15px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px'}}>
              <div style={{color: '#f8fafc'}}>Email Automations</div>
              <div style={{color: '#22c55e', fontWeight: 'bold'}}>ACTIVE</div>
           </div>
           <div style={{display: 'flex', justifyContent: 'space-between', padding: '15px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px'}}>
              <div style={{color: '#f8fafc'}}>App Version</div>
              <div style={{color: '#8b5cf6', fontWeight: 'bold'}}>v2.1.0 (Solo Leveling)</div>
           </div>
        </div>

        {/* 🎯 یہ رہا 100% ورکنگ لاگ آؤٹ بٹن */}
        <button 
          onClick={() => {
            console.log("Logout button clicked!"); // فریقین چیک کرنے کے لیے
            setShowLogoutConfirm(true);
          }}
          style={{
            width: '100%', 
            background: 'rgba(239, 68, 68, 0.15)', 
            border: '1px solid #ef4444', 
            color: '#ef4444', 
            padding: '15px', 
            borderRadius: '8px', 
            fontWeight: 'bold', 
            cursor: 'pointer',
            fontFamily: 'Orbitron, sans-serif',
            letterSpacing: '2px',
            boxShadow: '0 0 15px rgba(239, 68, 68, 0.2)'
          }}
        >
          LOGOUT SYSTEM
        </button>
      </div>
    </div>
  );

  const renderCenterColumn = () => {
    switch(activePage) {
      case 'DASHBOARD': return renderDashboard();
      case 'QUESTS': return renderQuests();
      case 'STATS': return renderStats();
      case 'SKILLS': return renderSkills();
      case 'CALENDAR': return renderCalendar();
      case 'ACHIEVEMENTS': return renderAchievements();
      case 'SHOP': return renderShop();
      case 'SETTINGS': return renderSettings();
      default: return renderDashboard();
    }
  };
  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }
  

  return (
    <div className="app-wrapper" style={{ boxShadow: player.penaltyActive ? 'inset 0 0 150px rgba(239, 68, 68, 0.15)' : 'none', transition: 'all 0.5s ease' }}>
      
      {/* ================= MODALS ================= */}
      {showPenaltyAlert && (
        <div style={modalOverlay}>
          <div style={{...modalContent, borderColor: '#ef4444', boxShadow: '0 0 80px rgba(239, 68, 68, 0.6)'}}>
            <h1 style={{fontSize: '3rem', color: '#ef4444', textShadow: '0 0 30px #ef4444', margin: 0, letterSpacing: '3px'}}>⚠️ SYSTEM ALERT ⚠️</h1>
            <p style={{fontSize: '1.3rem', color: '#e2e8f0', marginTop: '15px'}}>You failed to complete yesterday's quests.</p>
            <p style={{fontSize: '1.1rem', color: '#ef4444', fontWeight: 'bold', marginTop: '5px'}}>Penalty zone activated! Please press Acknowledge and Enter.</p>
            <button 
              onClick={() => { playSystemSound('penalty'); setShowPenaltyAlert(false); speakSystemMessage("Penalty zone active. Complete survival tasks to restore system."); }} 
              style={{ marginTop: '25px', background: '#ef4444', color: '#fff', border: 'none', padding: '12px 30px', fontSize: '1rem', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer', boxShadow: '0 0 15px #ef4444' }}
            >ACKNOWLEDGE & ENTER</button>
          </div>
        </div>
      )}

      {showLevelUp && (
        <div style={modalOverlay}>
          <div style={modalContent}>
            <h1 style={{fontSize: '4rem', color: '#8b5cf6', textShadow: '0 0 30px #8b5cf6', margin: 0, letterSpacing: '5px'}}>LEVEL UP!</h1>
            <p style={{fontSize: '1.5rem', color: '#e2e8f0', marginTop: '10px'}}>You have reached Level {player.level}</p>
            <p style={{fontSize: '1rem', color: '#fbbf24', marginTop: '5px'}}>+5 Stat Points Acquired</p>
          </div>
        </div>
      )}

      {showRankUp && (
        <div style={modalOverlay}>
          <div style={{...modalContent, borderColor: '#fbbf24', boxShadow: '0 0 80px rgba(251, 191, 36, 0.6)'}}>
            <h1 style={{fontSize: '3.5rem', color: '#fbbf24', textShadow: '0 0 30px #fbbf24', margin: 0, letterSpacing: '5px'}}>RANK ASCENSION</h1>
            <p style={{fontSize: '2rem', color: '#e2e8f0', marginTop: '10px'}}>You are now <span style={{fontWeight: 'bold', color: '#fbbf24', fontSize: '3rem'}}>{player.rank}</span> Rank</p>
          </div>
        </div>
      )}
      {/* ================= LOGOUT CONFIRMATION MODAL ================= */}
      {showLogoutConfirm && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          background: 'rgba(2, 6, 23, 0.85)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <div style={{
            background: 'rgba(4, 12, 30, 0.95)',
            border: '1px solid #ef4444',
            boxShadow: '0 0 40px rgba(239, 68, 68, 0.4), inset 0 0 20px rgba(239, 68, 68, 0.2)',
            padding: '40px',
            borderRadius: '6px',
            width: '90%',
            maxWidth: '420px',
            textAlign: 'center',
            fontFamily: 'Orbitron, sans-serif'
          }}>
            <h1 style={{ fontSize: '1.8rem', color: '#ef4444', textShadow: '0 0 20px #ef4444', margin: '0 0 15px 0', letterSpacing: '2px' }}>
              ⚠️ SYSTEM ALERT ⚠️
            </h1>
            <p style={{ fontSize: '1rem', color: '#cbd5e1', marginBottom: '30px', letterSpacing: '1px', lineHeight: '1.5' }}>
              Are you sure you want to disconnect and exit the system?
            </p>
            
            <div style={{ display: 'flex', gap: '15px' }}>
              <button 
                onClick={() => {
                  localStorage.removeItem('is_logged_in');
                  setIsAuthenticated(false);
                  setShowLogoutConfirm(false);
                }}
                style={{
                  flex: 1,
                  background: 'rgba(239, 68, 68, 0.2)',
                  border: '1px solid #ef4444',
                  color: '#ef4444',
                  padding: '12px',
                  fontWeight: 'bold',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontFamily: 'Orbitron, sans-serif',
                  letterSpacing: '2px',
                  boxShadow: '0 0 15px rgba(239, 68, 68, 0.3)',
                  transition: 'all 0.3s'
                }}
                onMouseOver={(e) => e.target.style.background = 'rgba(239, 68, 68, 0.4)'}
                onMouseOut={(e) => e.target.style.background = 'rgba(239, 68, 68, 0.2)'}
              >
                YES
              </button>
              
              <button 
                onClick={() => setShowLogoutConfirm(false)}
                style={{
                  flex: 1,
                  background: 'rgba(30, 41, 59, 0.6)',
                  border: '1px solid rgba(109, 124, 255, 0.4)',
                  color: '#93c5fd',
                  padding: '12px',
                  fontWeight: 'bold',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontFamily: 'Orbitron, sans-serif',
                  letterSpacing: '2px',
                  transition: 'all 0.3s'
                }}
                onMouseOver={(e) => e.target.style.border = '1px solid #6d7cff'}
                onMouseOut={(e) => e.target.style.border = '1px solid rgba(109, 124, 255, 0.4)'}
              >
                NO
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= LEFT SIDEBAR ================= */}
      <aside className="left-col">
        <div className="logo-row">
          <SystemLogo />
          <div className="logo-text">
            <h1 style={{color: player.penaltyActive ? '#ef4444' : '#f8fafc', transition: '0.3s'}}>SOLO LEVELING</h1>
            <p>SYSTEM</p>
          </div>
        </div>

        <div className="glass-panel profile-panel" style={{borderColor: player.penaltyActive ? '#ef4444' : ''}}>
          <div className="prof-top">
            <div className="prof-avatar" style={{borderColor: player.penaltyActive ? '#ef4444' : '', boxShadow: player.penaltyActive ? '0 0 15px rgba(239, 68, 68, 0.4)' : ''}}></div>
            <div className="prof-info">
              <div className="prof-name">
                 {player.name} 
                 <span onClick={handleNameEdit} style={{color: player.nameChangesLeft > 0 ? '#8b5cf6' : '#8b8b99', marginLeft: '6px', cursor: player.nameChangesLeft > 0 ? 'pointer' : 'not-allowed'}}>
                    <IconEdit />
                 </span>
              </div>
              <div className="prof-title" style={{color: player.penaltyActive ? '#ef4444' : ''}}>{player.title}</div>
              <div className="prof-lvl-lbl">LEVEL</div>
              <div className="prof-lvl-val" style={{color: player.penaltyActive ? '#ef4444' : '', textShadow: player.penaltyActive ? '0 0 15px #ef4444' : ''}}>{player.level}</div>
            </div>
          </div>
          <div className="prof-xp">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            {player.currentXP.toLocaleString()} / {player.requiredXP.toLocaleString()} XP
          </div>
        </div>

        <div className="glass-panel rank-panel">
          <div className="rank-left">
            <h4 style={{color: player.penaltyActive ? '#ef4444' : ''}}>RANK</h4>
            <p>Next Rank: {player.nextRank}</p>
          </div>
          <div className="rank-right" style={{color: player.penaltyActive ? '#ef4444' : '', textShadow: player.penaltyActive ? '0 0 20px #ef4444' : ''}}>{player.rank}</div>
        </div>

        <div className="glass-panel nav-panel">
          <div className={`nav-item ${activePage === 'DASHBOARD' ? 'active' : ''}`} onClick={() => handleNavClick('DASHBOARD', "Dashboard active")}><NavDash /> DASHBOARD</div>
          <div className={`nav-item ${activePage === 'QUESTS' ? 'active' : ''}`} onClick={() => handleNavClick('QUESTS', "Quest logs opened")}><NavQuest /> QUESTS</div>
          <div className={`nav-item ${activePage === 'STATS' ? 'active' : ''}`} onClick={() => handleNavClick('STATS', "Displaying player statistics")}><NavStats /> STATS</div>
          <div className={`nav-item ${activePage === 'SKILLS' ? 'active' : ''}`} onClick={() => handleNavClick('SKILLS', "Skill tree accessed")}><NavSkills /> SKILLS</div>
          <div className={`nav-item ${activePage === 'CALENDAR' ? 'active' : ''}`} onClick={() => handleNavClick('CALENDAR', "Calendar synchronized")}><NavCal /> CALENDAR</div>
          <div className={`nav-item ${activePage === 'ACHIEVEMENTS' ? 'active' : ''}`} onClick={() => handleNavClick('ACHIEVEMENTS', "Viewing milestones")}><NavAchieve /> ACHIEVEMENTS</div>
          <div className={`nav-item ${activePage === 'SHOP' ? 'active' : ''}`} onClick={() => handleNavClick('SHOP', "System shop opened")}><NavShop /> SHOP</div>
          <div className={`nav-item ${activePage === 'SETTINGS' ? 'active' : ''}`} onClick={() => handleNavClick('SETTINGS', "System configurations")}><NavSet /> SETTINGS</div>
        </div>

        <div className="footer-panel">
          <div className="foot-sys-lbl">SYSTEM NOTIFICATION</div>
          <div className="foot-msg">
            {player.penaltyActive ? (
              <span style={{color: '#ef4444', fontWeight: 'bold'}}>WARNING: You failed yesterday's quests. Penalty activated!</span>
            ) : (
              <>Welcome back, {player.name}.<br/><span style={{color: '#8b5cf6'}}>You have {dailyTasks.filter(t => !t.isComplete).length} tasks to complete today.</span></>
            )}
          </div>
          <div className="foot-bottom">
            <div className="foot-time">
              <h3>{formattedTime}</h3>
              <p>{formattedDate}</p>
            </div>
            <IconMoon />
          </div>
        </div>
      </aside>

      {/* ================= CENTER COLUMN ================= */}
      <main className="center-col">
        <div className="sys-header" style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <SystemWing isPenalty={player.penaltyActive} />
          <h2 className="sys-title-text" style={{
              textShadow: player.penaltyActive ? '0 0 20px #ef4444, 0 0 40px #ef4444' : '',
              color: player.penaltyActive ? '#ef4444' : '#f8fafc',
              fontSize: player.penaltyActive ? '2.2rem' : '2rem',
              letterSpacing: '8px',
              margin: '0 20px',
              whiteSpace: 'nowrap',
              transition: 'all 0.3s ease'
          }}>
            {player.penaltyActive ? "PENALTY ZONE" : "SYSTEM"}
          </h2>
          <SystemWing flip={true} isPenalty={player.penaltyActive} />
        </div>
        
        {renderCenterColumn()}

      </main>

      {/* ================= RIGHT SIDEBAR ================= */}
      
      <aside className={`right-col ${activePage !== 'DASHBOARD' ? 'mobile-hidden' : ''}`}>
        <div className="glass-panel daily-tasks-panel">
          <div className="box-header">
            <div className="bh-title" style={{color: player.penaltyActive ? '#ef4444' : ''}}>DAILY QUESTS</div>
            {!player.penaltyActive && <div className="bh-sub" style={{textTransform: 'none'}}>Resets in {resetTimer}</div>}
          </div>
          
          <div style={scrollableContainerStyle}>
            {dailyTasks.map(task => (
              <div className="task-row" key={task.id}>
                <div className="t-left">
                  <div className="t-icon" style={{color: player.penaltyActive ? '#ef4444' : ''}}>{getDynamicIcon(task.icon)}</div>
                  <div>
                    <div className="t-name">{task.title}</div>
                    <div className="t-sub" style={{color: task.isComplete ? (player.penaltyActive ? '#ef4444' : '#8b5cf6') : '#8b8b99', fontSize: '0.75rem'}}>
                      {task.description}
                    </div>
                  </div>
                </div>
                <div className="t-right">
                  <div className="t-reward">XP {task.xpReward}<br/><span style={{color: '#fbbf24'}}>🟡 {task.goldReward}</span></div>
                  <div 
                    className={`t-check ${task.isComplete ? 'done' : ''}`} 
                    onClick={() => toggleDailyTask(task.id)}
                    style={{cursor: 'pointer', borderColor: task.isComplete ? (player.penaltyActive ? '#ef4444' : '#8b5cf6') : '', background: task.isComplete && player.penaltyActive ? 'rgba(239, 68, 68, 0.15)' : ''}}
                  >
                    {task.isComplete && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={player.penaltyActive ? "#ef4444" : "#8b5cf6"} strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="split-boxes">
          <div className="glass-panel lvl-panel">
            <div className="bh-title">LEVEL PROGRESS</div>
            <div>
              <div className="lvl-nums">
                <div className="lvl-cur" style={{color: player.penaltyActive ? '#ef4444' : ''}}>{player.level}</div>
                <div className="lvl-nxt">{player.level + 1}</div>
              </div>
              <div className="lvl-bar"><div className="lvl-bar-fill" style={{width: `${(player.currentXP / player.requiredXP) * 100}%`, background: player.penaltyActive ? '#ef4444' : '', boxShadow: player.penaltyActive ? '0 0 5px #ef4444' : ''}}></div></div>
              <div className="lvl-desc">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                {player.currentXP.toLocaleString()} / {player.requiredXP.toLocaleString()} XP
              </div>
            </div>
          </div>
          
          <div className="glass-panel rnk-panel">
            <div className="rnk-title">CURRENT RANK</div>
            <div className="rnk-letter" style={{color: player.penaltyActive ? '#ef4444' : '', textShadow: player.penaltyActive ? '0 0 15px #ef4444' : ''}}>{player.rank}</div>
            <div className="rnk-sub">Next Rank: {player.nextRank}</div>
          </div>
        </div>

        <div className="glass-panel streak-panel" style={{borderColor: player.penaltyActive ? '#ef4444' : ''}}>
          <div className="bh-title" style={{marginBottom: '18px'}}>STREAK</div>
          <div className="strk-head">
            <IconFire />
            <div className="strk-txt">
              <h3 style={{color: player.penaltyActive ? '#ef4444' : ''}}>{player.penaltyActive ? 'STREAK BROKEN' : `${player.streakDays} DAYS`}</h3>
              <p>{player.penaltyActive ? 'Survive to restart!' : 'Consistency is Key!'}</p>
            </div>
          </div>
          <div className="strk-days">
            {weekDayLabels.map((dayLabel, index) => {
              let statusClass = "future"; 
              if (index < currentDayIndex) statusClass = "miss"; 
              else if (index === currentDayIndex) statusClass = player.penaltyActive ? "miss" : ""; 
              
              return (
                <div key={index} className={`s-day ${statusClass}`}>
                  {dayLabel.charAt(0)}
                </div>
              );
            })}
          </div>
        </div>

      </aside>
    </div>
  );
}
