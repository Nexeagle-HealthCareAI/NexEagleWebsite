import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, Quote, ChevronRight, RotateCcw, Sparkles } from "lucide-react";

// 1. STAKEHOLDER VISUAL ILLUSTRATIONS (PREMIUM CUSTOM SVGS)

const DoctorIllustration = () => (
  <div className="relative w-full aspect-square max-w-[240px] mx-auto flex items-center justify-center">
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <defs>
        <linearGradient id="docGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0d9488" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.2" />
        </linearGradient>
        <radialGradient id="glowDoc" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0d9488" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#0d9488" stopOpacity="0" />
        </radialGradient>
      </defs>
      
      {/* Background glow */}
      <circle cx="100" cy="100" r="80" fill="url(#glowDoc)" />
      
      {/* Outer pulsing ring */}
      <circle 
        cx="100" 
        cy="100" 
        r="70" 
        fill="none" 
        stroke="url(#docGrad)" 
        strokeWidth="1.5" 
        strokeDasharray="6 6"
        className="animate-[spin_40s_linear_infinite]"
      />
      
      {/* Doctor profile shape silhouette */}
      <path 
        d="M60 150 C60 125, 75 115, 100 115 C125 115, 140 125, 140 150 Z" 
        fill="url(#docGrad)" 
        className="opacity-70"
      />
      <circle cx="100" cy="80" r="22" fill="url(#docGrad)" />

      {/* Floating Stethoscope */}
      <motion.g
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <path 
          d="M88 85 C83 75, 75 75, 75 85 C75 96, 100 108, 100 114" 
          fill="none" 
          stroke="#0d9488" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
        />
        <path 
          d="M112 85 C117 75, 125 75, 125 85 C125 96, 100 108, 100 114" 
          fill="none" 
          stroke="#0d9488" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
        />
        <circle cx="100" cy="116" r="3" fill="#0d9488" />
      </motion.g>
      
      {/* Floating Clipboard paper representing docs */}
      <motion.g
        initial={{ x: 120, y: 50, opacity: 0.8 }}
        animate={{ y: [50, 42, 50], rotate: [0, 3, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <rect x="125" y="45" width="35" height="45" rx="4" fill="white" stroke="#e2e8f0" strokeWidth="1" />
        <line x1="131" y1="55" x2="154" y2="55" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="131" y1="62" x2="148" y2="62" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="131" y1="69" x2="152" y2="69" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="131" y1="76" x2="142" y2="76" stroke="#0d9488" strokeWidth="1.5" strokeLinecap="round" />
        
        {/* Red exclamation dot representing burden */}
        <circle cx="152" cy="76" r="2" fill="#ef4444" />
      </motion.g>
    </svg>
  </div>
);

const AdminIllustration = () => (
  <div className="relative w-full aspect-square max-w-[240px] mx-auto flex items-center justify-center">
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <defs>
        <linearGradient id="adminGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0.2" />
        </linearGradient>
        <radialGradient id="glowAdmin" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
        </radialGradient>
      </defs>
      
      {/* Background glow */}
      <circle cx="100" cy="100" r="80" fill="url(#glowAdmin)" />
      
      {/* Broken connection line 1 */}
      <path d="M78 65 H108" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" />
      <path d="M92 60 L97 65 L92 70" fill="none" stroke="#ef4444" strokeWidth="1.5" />
      
      {/* Broken connection line 2 */}
      <path d="M128 112 V132" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" />
      <text x="133" y="127" fill="#ef4444" fontSize="11" fontWeight="bold">?</text>
      
      {/* Step 1 Node */}
      <g transform="translate(35, 50)">
        <rect x="0" y="0" width="40" height="30" rx="6" fill="white" stroke="#e2e8f0" strokeWidth="1.5" />
        <text x="20" y="18" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#64748b">Check-in</text>
        <circle cx="40" cy="15" r="3.5" fill="#22c55e" />
      </g>
      
      {/* Step 2 Node */}
      <g transform="translate(110, 80)">
        <rect x="0" y="0" width="40" height="30" rx="6" fill="white" stroke="#e2e8f0" strokeWidth="1.5" />
        <text x="20" y="18" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#64748b">Consult</text>
        <circle cx="40" cy="15" r="3.5" fill="#3b82f6" />
      </g>
      
      {/* Step 3 Node */}
      <g transform="translate(50, 135)">
        <rect x="0" y="0" width="40" height="30" rx="6" fill="white" stroke="#e2e8f0" strokeWidth="1.5" />
        <text x="20" y="18" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#64748b">Billing</text>
        <circle cx="0" cy="15" r="3.5" fill="#ef4444" />
      </g>
      
      {/* Disconnected systems warning cloud */}
      <motion.g
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        transform="translate(130, 30)"
      >
        <circle cx="15" cy="15" r="18" fill="url(#adminGrad)" className="opacity-75" />
        <path d="M15 8 V16 M15 20 H15.01" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      </motion.g>
    </svg>
  </div>
);

const CeoIllustration = () => (
  <div className="relative w-full aspect-square max-w-[240px] mx-auto flex items-center justify-center">
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <defs>
        <linearGradient id="volGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0.5" />
        </linearGradient>
        <radialGradient id="glowCeo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#64748b" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#64748b" stopOpacity="0" />
        </radialGradient>
      </defs>
      
      <circle cx="100" cy="100" r="80" fill="url(#glowCeo)" />
      
      {/* Grid Lines */}
      <line x1="40" y1="140" x2="160" y2="140" stroke="#cbd5e1" strokeWidth="1" />
      <line x1="40" y1="100" x2="160" y2="100" stroke="#f1f5f9" strokeWidth="1" />
      <line x1="40" y1="60" x2="160" y2="60" stroke="#f1f5f9" strokeWidth="1" />
      
      {/* Volume Bar/Area (Rising) */}
      <path d="M40 140 L40 110 L70 95 L100 80 L130 65 L160 45 L160 140 Z" fill="url(#volGrad)" />
      <path d="M40 110 L70 95 L100 80 L130 65 L160 45" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />
      <text x="162" y="42" fill="#10b981" fontSize="8" fontWeight="bold">Patient Vol</text>
      
      {/* Operational Efficiency Line (Flat/Decaying) */}
      <motion.path 
        d="M40 115 L70 120 L100 118 L130 125 L160 128" 
        fill="none" 
        stroke="#ef4444" 
        strokeWidth="2" 
        strokeLinecap="round"
        animate={{ y: [0, 2, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <text x="135" y="138" fill="#ef4444" fontSize="8" fontWeight="bold">Efficiency</text>
      
      {/* Expanding gap red highlight */}
      <path d="M160 45 V128" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 3" />
      <circle cx="160" cy="128" r="3" fill="#ef4444" />
      <circle cx="160" cy="45" r="3" fill="#10b981" />
      
      {/* Gap indicator tag */}
      <motion.g
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        transform="translate(105, 80)"
      >
        <rect x="-28" y="-10" width="56" height="18" rx="4" fill="#fef2f2" stroke="#fca5a5" strokeWidth="1" />
        <text x="0" y="2" textAnchor="middle" fontSize="7.5" fontWeight="extrabold" fill="#b91c1c">GAP WIDENS</text>
      </motion.g>
    </svg>
  </div>
);

const LabIllustration = () => (
  <div className="relative w-full aspect-square max-w-[240px] mx-auto flex items-center justify-center">
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <defs>
        <linearGradient id="labGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#c084fc" stopOpacity="0.2" />
        </linearGradient>
        <radialGradient id="glowLab" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
        </radialGradient>
      </defs>
      
      <circle cx="100" cy="100" r="80" fill="url(#glowLab)" />
      
      {/* Chemistry Beaker */}
      <g transform="translate(50, 60)">
        <path d="M25 0 H35 V15 L55 55 C60 62, 55 70, 45 70 H15 C5 70, 0 62, 5 55 L25 15 Z" fill="url(#labGrad)" stroke="#7c3aed" strokeWidth="2" />
        
        {/* Bubbles */}
        <motion.circle cx="15" cy="45" r="2.5" fill="white" opacity="0.8" animate={{ y: [45, 15], opacity: [0.8, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.2 }} />
        <motion.circle cx="35" cy="55" r="3" fill="white" opacity="0.8" animate={{ y: [55, 20], opacity: [0.8, 0] }} transition={{ duration: 2.5, repeat: Infinity, delay: 0.8 }} />
        <motion.circle cx="25" cy="30" r="2" fill="white" opacity="0.8" animate={{ y: [30, 5], opacity: [0.8, 0] }} transition={{ duration: 1.8, repeat: Infinity, delay: 1.4 }} />
      </g>
      
      {/* Waiting / Delay Clock Symbol */}
      <motion.g
        animate={{ rotate: [0, 4, -4, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        transform="translate(130, 80)"
      >
        <circle cx="20" cy="20" r="22" fill="white" stroke="#e2e8f0" strokeWidth="1.5" />
        <circle cx="20" cy="20" r="18" fill="#f5f3ff" />
        
        {/* Clock Hands */}
        <line x1="20" y1="20" x2="20" y2="10" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" />
        <motion.line 
          x1="20" 
          y1="20" 
          x2="29" 
          y2="20" 
          stroke="#ef4444" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          style={{ originX: "20px", originY: "20px" }}
        />
        
        {/* Status tag */}
        <rect x="2" y="28" width="36" height="12" rx="3" fill="#fef2f2" stroke="#fca5a5" strokeWidth="0.8" />
        <text x="20" y="37" textAnchor="middle" fontSize="6.5" fontWeight="black" fill="#b91c1c">DELAYED</text>
      </motion.g>
    </svg>
  </div>
);

const RadiologyIllustration = () => (
  <div className="relative w-full aspect-square max-w-[240px] mx-auto flex items-center justify-center">
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <defs>
        <linearGradient id="radGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#0891b2" stopOpacity="0.2" />
        </linearGradient>
        <radialGradient id="glowRad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
        </radialGradient>
      </defs>
      
      <circle cx="100" cy="100" r="80" fill="url(#glowRad)" />
      
      {/* Scanner circular ring representation */}
      <circle cx="100" cy="100" r="55" fill="none" stroke="#e2e8f0" strokeWidth="4" />
      <motion.circle 
        cx="100" 
        cy="100" 
        r="55" 
        fill="none" 
        stroke="url(#radGrad)" 
        strokeWidth="2.5" 
        strokeDasharray="40 180"
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />
      
      {/* MRI preview plate in the center */}
      <g transform="translate(75, 75)">
        <rect x="0" y="0" width="50" height="50" rx="8" fill="white" stroke="#e2e8f0" strokeWidth="1.5" />
        <rect x="5" y="5" width="40" height="40" rx="4" fill="#0891b2" fillOpacity="0.05" />
        
        {/* Chest cage/spine silhouette lines */}
        <path d="M25 10 V40" stroke="#0891b2" strokeWidth="1.5" strokeOpacity="0.3" />
        <path d="M15 15 C20 18, 30 18, 35 15" fill="none" stroke="#0891b2" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.6" />
        <path d="M13 22 C18 25, 32 25, 37 22" fill="none" stroke="#0891b2" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.6" />
        <path d="M12 29 C18 32, 32 32, 38 29" fill="none" stroke="#0891b2" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.6" />
        
        {/* Scan line animation */}
        <motion.line 
          x1="4" 
          y1="5" 
          x2="46" 
          y2="5" 
          stroke="#06b6d4" 
          strokeWidth="1.5"
          animate={{ y: [0, 40, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </g>
      
      {/* Warning disconnected arrow */}
      <g transform="translate(135, 125)">
        <rect x="-10" y="-10" width="20" height="20" rx="4" fill="#fef2f2" stroke="#fca5a5" strokeWidth="1" />
        <text x="0" y="4" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#ef4444">!</text>
      </g>
    </svg>
  </div>
);

const OperationsIllustration = () => (
  <div className="relative w-full aspect-square max-w-[240px] mx-auto flex items-center justify-center">
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <defs>
        <linearGradient id="opsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#34d399" stopOpacity="0.2" />
        </linearGradient>
        <radialGradient id="glowOps" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
        </radialGradient>
      </defs>
      
      <circle cx="100" cy="100" r="80" fill="url(#glowOps)" />
      
      {/* Central Hub */}
      <circle cx="100" cy="100" r="10" fill="#10b981" />
      <circle cx="100" cy="100" r="6" fill="white" />
      
      {/* Department Nodes connected by dashed lines */}
      {/* Node 1: Clinical */}
      <line x1="100" y1="100" x2="100" y2="45" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />
      <circle cx="100" cy="45" r="10" fill="white" stroke="#e2e8f0" strokeWidth="1.5" />
      <circle cx="100" cy="45" r="7" fill="#10b981" />
      <text x="100" y="30" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#64748b">Clinical</text>
      
      {/* Node 2: Financial */}
      <line x1="100" y1="100" x2="148" y2="128" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />
      <circle cx="148" cy="128" r="10" fill="white" stroke="#e2e8f0" strokeWidth="1.5" />
      <circle cx="148" cy="128" r="7" fill="#3b82f6" />
      <text x="148" y="145" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#64748b">Financial</text>
      
      {/* Node 3: Diagnostics (Disconnected / Question Mark!) */}
      <motion.line 
        x1="100" 
        y1="100" 
        x2="52" 
        y2="128" 
        stroke="#ef4444" 
        strokeWidth="1.5" 
        strokeDasharray="3 3"
        animate={{ strokeOpacity: [1, 0.4, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <circle cx="52" cy="128" r="10" fill="#fef2f2" stroke="#fca5a5" strokeWidth="1.5" />
      <text x="52" y="131" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#ef4444">?</text>
      <text x="52" y="145" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#ef4444">Diagnostics</text>

      {/* Radar sweep */}
      <motion.line 
        x1="100" 
        y1="100" 
        x2="135" 
        y2="65" 
        stroke="#10b981" 
        strokeWidth="2" 
        animate={{ rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        style={{ originX: "100px", originY: "100px" }}
      />
    </svg>
  </div>
);

// 2. DATA MODELS

interface Stakeholder {
  role: string;
  tabLabel: string;
  question: string;
  insight: string;
  badgeStyle: string;
  textColor: string;
  illustration: React.ComponentType;
}

const stakeholders: Stakeholder[] = [
  {
    role: "Doctor",
    tabLabel: "Doctor",
    question: "Why am I spending more time documenting than treating patients?",
    insight: "Administrative tasks continue to consume valuable clinical time, reducing focus on patient care.",
    badgeStyle: "bg-teal-50 text-teal-700 border-teal-100/80",
    textColor: "text-teal-600",
    illustration: DoctorIllustration
  },
  {
    role: "Hospital Administrator",
    tabLabel: "Administrator",
    question: "Why do we still need multiple systems to manage a single patient journey?",
    insight: "Disconnected systems create inefficiencies, duplicate work and fragmented experiences.",
    badgeStyle: "bg-blue-50 text-blue-700 border-blue-100/80",
    textColor: "text-blue-600",
    illustration: AdminIllustration
  },
  {
    role: "Hospital CEO",
    tabLabel: "CEO",
    question: "Patient volumes are growing. Why isn't operational efficiency improving with them?",
    insight: "Growth without connected workflows often increases complexity instead of productivity.",
    badgeStyle: "bg-slate-100 text-slate-800 border-slate-200/80",
    textColor: "text-slate-800",
    illustration: CeoIllustration
  },
  {
    role: "Lab Director",
    tabLabel: "Lab Director",
    question: "Why are clinicians still waiting for reports that should already be available?",
    insight: "Disconnected diagnostic workflows can delay critical information and decision-making.",
    badgeStyle: "bg-purple-50 text-purple-700 border-purple-100/80",
    textColor: "text-purple-600",
    illustration: LabIllustration
  },
  {
    role: "Radiology Head",
    tabLabel: "Radiology Head",
    question: "Why does imaging data still feel disconnected from the rest of patient care?",
    insight: "Clinical decisions improve when imaging workflows integrate seamlessly with care delivery.",
    badgeStyle: "bg-cyan-50 text-cyan-700 border-cyan-100/80",
    textColor: "text-cyan-600",
    illustration: RadiologyIllustration
  },
  {
    role: "Healthcare Operations Manager",
    tabLabel: "Operations",
    question: "Why can't I get a complete picture of what's happening across departments?",
    insight: "Leaders need real-time visibility across clinical, operational and financial workflows.",
    badgeStyle: "bg-emerald-50 text-emerald-700 border-emerald-100/80",
    textColor: "text-emerald-600",
    illustration: OperationsIllustration
  }
];

export const HealthcareChallenges = () => {
  // Title Animation State
  const [titleIndex, setTitleIndex] = useState(0);
  const [hasRevealedContent, setHasRevealedContent] = useState(false);
  const titleWords = [
    "Disconnected?", 
    "Manual?", 
    "Fragmented?", 
    "Complex?", 
    "Siloed?", 
    "Reactive?"
  ];
  const isFinalTitleState = titleIndex >= 6;
  const isExpandedTitleState = titleIndex === 7;

  // Simulator State
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Title Rotation Cycle
  useEffect(() => {
    if (titleIndex === 7) {
      // Hold "Now Connected with NexEagle." for 8 seconds, then reset to 0 to loop continuously
      const timeout = setTimeout(() => {
        setTitleIndex(0);
      }, 8000);
      return () => clearTimeout(timeout);
    }

    if (titleIndex === 6) {
      // Step 7: Now Connected. (1.5s pause) -> transitions to Step 8 (Now Connected with NexEagle.)
      const timeout = setTimeout(() => {
        setTitleIndex(7);
        setHasRevealedContent(true); // Persist revealed flag for content below
      }, 1500);
      return () => clearTimeout(timeout);
    }

    const interval = setInterval(() => {
      setTitleIndex((prev) => {
        if (prev >= 5) {
          clearInterval(interval);
          return 6; // advance to Step 7
        }
        return prev + 1;
      });
    }, 2400); // Cycles every 2.4 seconds (2s pause + 400ms transition)

    return () => clearInterval(interval);
  }, [titleIndex]);

  // Stakeholder Auto-rotation effect
  useEffect(() => {
    // Only run stakeholder simulation if content has been revealed and not paused
    if (!hasRevealedContent || isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => {
        if (prev >= 6) {
          if (timerRef.current) clearInterval(timerRef.current);
          return 6;
        }
        return prev + 1;
      });
    }, 4500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isExpandedTitleState, isPaused, activeIndex]);

  const handleTabClick = (index: number) => {
    setIsPaused(true); // Stop auto-play when user manually clicks
    setActiveIndex(index);
  };

  const handleResetDemo = () => {
    setIsPaused(false);
    setActiveIndex(0);
  };

  // Transition variants
  const titleWordVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const } 
    },
    exit: { 
      opacity: 0, 
      y: -20, 
      transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const } 
    }
  };

  const contentVariants = {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
    exit: { opacity: 0, y: -12, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const } }
  };

  return (
    <section id="challenges" className="py-24 md:py-32 bg-gradient-to-b from-white via-slate-50/40 to-white relative overflow-hidden">
      
      {/* Background radial glows */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-brand-teal/5 rounded-full blur-[160px] pointer-events-none z-0"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-brand-sky/5 rounded-full blur-[160px] pointer-events-none z-0"></div>

      {/* Background soft lines mapping */}
      <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none">
        <svg className="w-full h-full opacity-30" viewBox="0 0 1000 500" preserveAspectRatio="none">
          <defs>
            <linearGradient id="titleLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.05" />
              <stop offset="50%" stopColor="#0d9488" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.05" />
            </linearGradient>
          </defs>
          <motion.path 
            d="M -50 160 Q 250 110 500 160 T 1050 160" 
            fill="none" 
            stroke="url(#titleLineGrad)" 
            strokeWidth="1.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isFinalTitleState ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{ duration: 2.2, ease: "easeOut" }}
          />
          <motion.path 
            d="M -50 240 Q 200 320 500 240 T 1050 240" 
            fill="none" 
            stroke="url(#titleLineGrad)" 
            strokeWidth="1.2"
            strokeDasharray="5 5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isFinalTitleState ? { pathLength: 1, opacity: 0.6 } : { pathLength: 0, opacity: 0 }}
            transition={{ duration: 2.5, ease: "easeOut", delay: 0.3 }}
          />
        </svg>
      </div>

      <div className="container mx-auto relative z-10 px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="max-w-5xl mx-auto">
          {/* APPLE/LINEAR STYLE ANIMATED TITLE SECTION */}
          <div className="text-center space-y-6 mb-16 relative">
            {/* Static & Cycled Headline Container */}
            <div className="space-y-1">
              <AnimatePresence mode="wait">
                {titleIndex < 6 && (
                  <motion.h2
                    key="static-title"
                    initial={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10, transition: { duration: 0.3 } }}
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-tight"
                  >
                    Why Is Healthcare Still
                  </motion.h2>
                )}
              </AnimatePresence>
              
              <div className="h-[52px] sm:h-[68px] md:h-[84px] flex items-center justify-center relative mt-1">
                {/* Connected Glow behind the final word */}
                <AnimatePresence>
                  {isFinalTitleState && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{ opacity: 1, scale: 1.1 }}
                      exit={{ opacity: 0, scale: 0.7 }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="absolute w-[300px] h-[70px] bg-brand-teal/20 rounded-full blur-[25px] -z-10"
                    />
                  )}
                </AnimatePresence>
                
                <AnimatePresence mode="wait">
                  {titleIndex < 6 ? (
                    <motion.span
                      key={titleIndex}
                      variants={titleWordVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900 bg-clip-text text-transparent font-extrabold"
                    >
                      {titleWords[titleIndex]}
                    </motion.span>
                  ) : (
                    <motion.div
                      key="final-reveal"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="flex items-center justify-center flex-wrap text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight select-none py-4"
                    >
                      <span className="bg-gradient-to-r from-teal-500 to-teal-700 bg-clip-text text-transparent drop-shadow-sm font-black">
                        Now Connected
                      </span>

                      <AnimatePresence>
                        {titleIndex === 7 && (
                          <motion.span
                            initial={{ opacity: 0, width: 0, x: 20 }}
                            animate={{ opacity: 1, width: "auto", x: 0 }}
                            transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.2 }}
                            className="overflow-hidden flex items-center whitespace-nowrap"
                          >
                            <span className="text-slate-800 ml-3 sm:ml-4 font-extrabold">with</span>
                            <span className="bg-gradient-to-r from-brand-teal via-brand-sky to-indigo-500 bg-clip-text text-transparent ml-3 sm:ml-4 font-black drop-shadow-sm">
                              NexEagle.
                            </span>
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Supporting Text & CTAs (Fades in when expanded title state is reached) */}
            <AnimatePresence>
              {hasRevealedContent && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
                  className="space-y-8 max-w-3xl mx-auto pt-4"
                >
                  <p className="text-base sm:text-lg md:text-xl text-slate-600 font-light leading-relaxed">
                    NexEagle brings hospitals, diagnostics, radiology, pharmacy, billing and AI-powered clinical workflows together through one connected healthcare platform.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                    <a 
                      href="#challenges-story"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-brand-teal hover:bg-brand-teal/90 text-white font-bold text-sm sm:text-base shadow-lg shadow-brand-teal/15 hover:shadow-xl transition-all duration-300 group hover:-translate-y-0.5"
                    >
                      <span>See How NexEagle Connects Healthcare Operations</span>
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-white/80 group-hover:translate-x-1 transition-transform" />
                    </a>
                    
                    <a 
                      href="#ecosystem"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm sm:text-base border border-slate-200/80 shadow-sm transition-all duration-300 hover:-translate-y-0.5"
                    >
                      <span>Explore Solutions</span>
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* DETAILED STAKEHOLDER STORYTELLING SECTION (REVEALED IN PARALLEL OR AFTER TITLES) */}
          <AnimatePresence>
            {hasRevealedContent && (
              <motion.div
                id="challenges-story"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 1.2, ease: [0.16, 1, 0.3, 1] as const }}
                className="pt-16 border-t border-slate-100"
              >
                <div className="text-center mb-8 w-full flex flex-col items-center justify-center">
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight text-center w-full">
                    Struggles Healthcare Leaders Face Every Day
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 font-light mt-1 text-center mx-auto block w-full">
                    Select a stakeholder below to explore their operational questions and NexEagle insights.
                  </p>
                </div>

                {/* Navigation Horizontal Pills */}
                <div className="flex justify-center mb-8 w-full">
                  <div className="flex items-center gap-2 p-1.5 bg-slate-100/80 backdrop-blur-md rounded-2xl border border-slate-200/60 overflow-x-auto max-w-full scrollbar-none snap-x">
                    {stakeholders.map((sh, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleTabClick(idx)}
                        className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 shrink-0 snap-align-center ${
                          activeIndex === idx
                            ? "bg-white text-slate-900 shadow-sm border border-slate-200/40"
                            : "text-slate-500 hover:text-slate-900 hover:bg-white/40"
                        }`}
                      >
                        {sh.tabLabel}
                      </button>
                    ))}
                    
                    <button
                      onClick={() => handleTabClick(6)}
                      className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 shrink-0 snap-align-center ${
                        activeIndex === 6
                          ? "bg-brand-teal text-white shadow-md"
                          : "text-brand-teal hover:bg-brand-teal/5"
                      }`}
                    >
                      The Summary
                    </button>
                  </div>
                </div>

                {/* Central Glassmorphism Card */}
                <div className="relative w-full rounded-[2.5rem] bg-white/40 backdrop-blur-xl border border-slate-200/50 shadow-[0_32px_64px_rgba(0,0,0,0.02)] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent pointer-events-none z-0"></div>
                  
                  <div className="relative z-10 p-8 sm:p-12 md:p-16 min-h-[420px] flex items-center justify-center">
                    <AnimatePresence mode="wait">
                      
                      {/* STATE 1-6: STAKEHOLDER ROTATION */}
                      {activeIndex < 6 ? (
                        <motion.div
                          key={activeIndex}
                          variants={contentVariants}
                          initial="initial"
                          animate="animate"
                          exit="exit"
                          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full"
                        >
                          {/* Left Column: Role, Question & Insight */}
                          <div className="lg:col-span-7 space-y-6 text-left">
                            <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full border ${stakeholders[activeIndex].badgeStyle}`}>
                              {stakeholders[activeIndex].role}
                            </span>
                            
                            <div className="relative">
                              <Quote className="absolute -left-6 -top-3 w-8 h-8 text-slate-200/60 -z-10" />
                              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                                {stakeholders[activeIndex].question}
                              </h3>
                            </div>
                            
                            <div className="h-px w-16 bg-slate-200"></div>
                            
                            <p className="text-slate-600 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-xl">
                              {stakeholders[activeIndex].insight}
                            </p>
                          </div>

                          {/* Right Column: Premium Custom Animated Illustration */}
                          <div className="lg:col-span-5 flex items-center justify-center">
                            {React.createElement(stakeholders[activeIndex].illustration)}
                          </div>
                        </motion.div>
                      ) : (
                        
                        // STATE 7: SUMMARY FINALE
                        <motion.div
                          key="finale"
                          variants={contentVariants}
                          initial="initial"
                          animate="animate"
                          exit="exit"
                          className="w-full text-center max-w-2xl mx-auto py-6"
                        >
                          <div className="space-y-8">
                            <motion.p 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.6, delay: 0.2 }}
                              className="text-slate-500 text-sm sm:text-base font-semibold uppercase tracking-wider"
                            >
                              These challenges often have one thing in common.
                            </motion.p>
                            
                            <motion.h3 
                              initial={{ opacity: 0, y: 15 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.7, delay: 1.4 }}
                              className="text-3xl sm:text-4xl md:text-5xl font-black text-rose-600 tracking-tight leading-tight"
                            >
                              Disconnected Healthcare Operations
                            </motion.h3>

                            <motion.div 
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: 1 }}
                              transition={{ duration: 0.5, delay: 2.2 }}
                              className="h-px w-24 bg-slate-200 mx-auto"
                            />
                            
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.8, delay: 2.8 }}
                              className="space-y-8"
                            >
                              <h4 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-teal to-brand-sky tracking-tight">
                                NexEagle Connects Them.
                              </h4>
                              
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 3.8 }}
                                className="pt-2"
                              >
                                <a 
                                  href="#ecosystem"
                                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:px-8 sm:py-4 rounded-2xl bg-brand-teal hover:bg-brand-teal/90 text-white font-bold text-sm sm:text-base shadow-lg shadow-brand-teal/15 hover:shadow-xl transition-all duration-300 group hover:-translate-y-0.5"
                                >
                                  <span>See How NexEagle Connects Healthcare Workflows</span>
                                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-white/80 group-hover:translate-x-1 transition-transform" />
                                </a>
                              </motion.div>
                            </motion.div>

                            {isPaused && (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.6 }}
                                transition={{ delay: 5 }}
                                className="pt-4"
                              >
                                <button 
                                  onClick={handleResetDemo}
                                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-slate-600 transition-colors"
                                >
                                  <RotateCcw className="w-3.5 h-3.5" />
                                  Restart Auto-rotation
                                </button>
                              </motion.div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  {/* Progress Line */}
                  {!isPaused && activeIndex < 6 && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-100">
                      <motion.div 
                        key={activeIndex}
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 4.5, ease: "linear" }}
                        className="h-full bg-brand-teal"
                      />
                    </div>
                  )}
                </div>

              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
};

export default HealthcareChallenges;
