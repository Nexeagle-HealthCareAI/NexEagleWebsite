import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users, Bot, FlaskConical, Scan, Pill, Receipt, ShieldCheck,
} from "lucide-react";

interface ModuleConfig {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  color: string;
  glowColor: string;
  features: string[];
  events: string[];
  /** Percentage position within the aspect-ratio container */
  x: number;
  y: number;
}

const modules: ModuleConfig[] = [
  {
    id: "patient",
    title: "Patient Management",
    icon: Users,
    color: "from-teal-500 to-emerald-400",
    glowColor: "rgba(20, 184, 166, 0.4)",
    features: ["Registration", "Appointments"],
    events: ["New Patient Registered", "Appointment Confirmed"],
    x: 15,
    y: 16,
  },
  {
    id: "ai",
    title: "AI Documentation",
    icon: Bot,
    color: "from-sky-500 to-blue-600",
    glowColor: "rgba(56, 189, 248, 0.4)",
    features: ["Voice Scribe", "SOAP Notes"],
    events: ["Clinical Note Generated", "AI Summary Created"],
    x: 85,
    y: 16,
  },
  {
    id: "lab",
    title: "Laboratory",
    icon: FlaskConical,
    color: "from-indigo-500 to-purple-600",
    glowColor: "rgba(99, 102, 241, 0.4)",
    features: ["Sample Tracking", "Reports"],
    events: ["Sample Collected", "Lab Report Ready"],
    x: 15,
    y: 50,
  },
  {
    id: "radiology",
    title: "Radiology",
    icon: Scan,
    color: "from-teal-500 to-cyan-500",
    glowColor: "rgba(20, 184, 166, 0.4)",
    features: ["PACS", "DICOM Viewer"],
    events: ["Scan Uploaded", "Radiology Report Ready"],
    x: 85,
    y: 50,
  },
  {
    id: "pharmacy",
    title: "Pharmacy",
    icon: Pill,
    color: "from-sky-500 to-indigo-500",
    glowColor: "rgba(56, 189, 248, 0.4)",
    features: ["Inventory", "Dispensing"],
    events: ["Prescription Processed", "Medicine Dispensed"],
    x: 15,
    y: 84,
  },
  {
    id: "billing",
    title: "Billing & Revenue",
    icon: Receipt,
    color: "from-indigo-500 to-pink-500",
    glowColor: "rgba(99, 102, 241, 0.4)",
    features: ["Claims", "Revenue"],
    events: ["Invoice Generated", "Claim Submitted"],
    x: 85,
    y: 84,
  },
];

export const ConnectedEcosystem = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animStep, setAnimStep] = useState<"glowing" | "pulse" | "sync" | "idle">("glowing");
  const [currentEvent, setCurrentEvent] = useState("");
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    const active = modules[activeIndex] || modules[0];
    if (active?.events?.length > 0) {
      setCurrentEvent(active.events[Math.floor(Math.random() * active.events.length)]);
    }
    setAnimStep("glowing");
    setIsSyncing(false);

    const t1 = setTimeout(() => setAnimStep("pulse"), 600);
    const t2 = setTimeout(() => { setAnimStep("sync"); setIsSyncing(true); }, 1800);
    const t3 = setTimeout(() => { setAnimStep("idle"); setIsSyncing(false); }, 2800);
    const t4 = setTimeout(() => setActiveIndex((p) => (p + 1) % modules.length), 3500);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [activeIndex]);

  const activeModule = modules[activeIndex] || modules[0];
  const activeGlow = activeModule.glowColor.replace("0.4", "1");
  const ActiveIcon = activeModule.icon;

  return (
    <div className="relative w-full flex flex-col justify-center items-center">

      {/* ================================================================== */}
      {/* GRID LAYOUT — visible on md+ (Tablet & Desktop)                   */}
      {/* aspect-ratio keeps proportions; % widths scale cards fluidly       */}
      {/* ================================================================== */}
      <div
        className="relative hidden md:block w-full md:max-w-2xl lg:max-w-none mx-auto"
        style={{ aspectRatio: "1.4" }}
      >
        {/* SVG connection overlay */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <defs>
            <radialGradient id="eco-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={activeGlow} stopOpacity="0.15" />
              <stop offset="100%" stopColor={activeGlow} stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Central glow */}
          <circle cx="50%" cy="50%" r="100" fill="url(#eco-glow)" />

          {/* Lines + data pulses */}
          {modules.map((mod, idx) => {
            const isActive = idx === activeIndex;
            return (
              <g key={`line-${mod.id}`}>
                <line
                  x1={`${mod.x}%`} y1={`${mod.y}%`}
                  x2="50%" y2="50%"
                  stroke={isActive ? activeGlow : "rgba(226, 232, 240, 0.4)"}
                  strokeWidth={isActive ? 2.5 : 1.5}
                  className="transition-colors duration-500"
                />
                {isActive && animStep === "pulse" && (
                  <>
                    <motion.line
                      x1={`${mod.x}%`} y1={`${mod.y}%`}
                      x2="50%" y2="50%"
                      stroke={activeGlow} strokeWidth="3.5"
                      strokeDasharray="10 10"
                      animate={{ strokeDashoffset: [-40, 40] }}
                      transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                    />
                    <motion.circle
                      r="5" fill={activeGlow}
                      initial={{ cx: `${mod.x}%`, cy: `${mod.y}%`, opacity: 0 }}
                      animate={{ cx: "50%", cy: "50%", opacity: [0, 1, 1, 0] }}
                      transition={{ duration: 1.2, ease: "easeInOut" }}
                      style={{ filter: `drop-shadow(0 0 6px ${activeGlow})` }}
                    />
                  </>
                )}
              </g>
            );
          })}
        </svg>

        {/* ---- Center Platform Hub ---- */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[32%] max-w-[240px] z-10">
          <div
            className={`w-full rounded-[1.5rem] lg:rounded-[2rem] p-3 lg:p-5 bg-white/50 backdrop-blur-2xl border-2 transition-all duration-700 flex flex-col items-center text-center select-none shadow-2xl gap-2 ${
              isSyncing
                ? "border-brand-sky shadow-brand-sky/20 scale-105"
                : "border-slate-200/80 shadow-slate-100"
            }`}
          >
            <div className="relative">
              {isSyncing && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-sky opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-sky" />
                </span>
              )}
              <div
                className={`w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-gradient-to-br from-brand-teal via-brand-sky to-brand-iris flex items-center justify-center text-white shadow-lg shadow-brand-sky/25 transition-transform duration-500 ${
                  isSyncing ? "scale-110 rotate-6" : ""
                }`}
              >
                <ShieldCheck className="w-5 h-5 lg:w-7 lg:h-7 text-white" />
              </div>
            </div>
            <div>
              <h3 className="text-sm lg:text-base font-black text-slate-800 tracking-tight leading-tight">
                NexEagle OS
              </h3>
              <p className="text-[8px] lg:text-[10px] uppercase tracking-widest font-bold text-muted-foreground mt-0.5">
                Central Platform
              </p>
            </div>
          </div>
        </div>

        {/* ---- Module Cards ---- */}
        {modules.map((mod, idx) => {
          const isActive = idx === activeIndex;
          const Icon = mod.icon;

          return (
            <div
              key={mod.id}
              style={{
                left: `${mod.x}%`,
                top: `${mod.y}%`,
                transform: "translate(-50%, -50%)",
              }}
              className="absolute z-20 w-[28%] max-w-[210px] overflow-visible"
            >
              {/* Event Bubble */}
              <AnimatePresence>
                {isActive && animStep !== "idle" && animStep !== "sync" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: -40, scale: 1 }}
                    exit={{ opacity: 0, y: -15, scale: 0.95 }}
                    className="absolute left-1/2 -translate-x-1/2 bg-slate-900/90 text-white text-[10px] lg:text-xs px-2 py-1 lg:px-3 lg:py-1.5 rounded-full border border-white/20 shadow-xl whitespace-nowrap z-30 font-semibold flex items-center gap-1.5"
                  >
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                    </span>
                    {currentEvent}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Glassmorphism Card */}
              <div
                style={{
                  boxShadow: isActive ? `0 8px 30px ${mod.glowColor}` : undefined,
                }}
                className={`p-2.5 lg:p-3.5 rounded-xl lg:rounded-2xl bg-white/40 backdrop-blur-xl border-2 transition-all duration-500 select-none ${
                  isActive
                    ? "border-slate-300 scale-105"
                    : "border-white/20 shadow-lg"
                }`}
              >
                <div className="flex items-center gap-2 lg:gap-3">
                  <div
                    className={`w-7 h-7 lg:w-9 lg:h-9 rounded-lg flex-shrink-0 flex items-center justify-center bg-gradient-to-br ${mod.color} text-white shadow-md`}
                  >
                    <Icon className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-[10px] lg:text-xs font-bold text-slate-800 leading-tight">
                      {mod.title}
                    </h4>
                    <div className="hidden lg:flex gap-1 mt-0.5">
                      {mod.features.slice(0, 2).map((feat) => (
                        <span
                          key={feat}
                          className="text-[7px] font-medium text-slate-500 bg-white/50 border border-white/30 px-1 py-px rounded"
                        >
                          {feat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ================================================================== */}
      {/* MOBILE LAYOUT (< 768px)                                           */}
      {/* ================================================================== */}
      <div className="w-full flex flex-col gap-6 md:hidden items-center py-6 px-4">

        {/* Central OS Node */}
        <div
          className={`w-full max-w-sm rounded-[2rem] p-5 bg-white/50 backdrop-blur-2xl border-2 transition-all duration-500 shadow-xl flex items-center gap-4 ${
            isSyncing
              ? "border-brand-sky shadow-brand-sky/10"
              : "border-slate-200/80 shadow-slate-100"
          }`}
        >
          <div
            className={`w-12 h-12 rounded-xl bg-gradient-to-br from-brand-teal via-brand-sky to-brand-iris flex items-center justify-center text-white shadow-md transition-transform ${
              isSyncing ? "scale-110" : ""
            }`}
          >
            <ShieldCheck className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-black text-slate-800 tracking-tight leading-none">
              NexEagle OS
            </h3>
            <span className="text-[9px] uppercase tracking-widest font-bold text-slate-400 mt-1 block">
              Connected Platform
            </span>
          </div>
          {isSyncing && (
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-sky opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-sky" />
            </span>
          )}
        </div>

        {/* Dynamic event text */}
        <div className="h-6 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {animStep !== "idle" && animStep !== "sync" && (
              <motion.div
                key={currentEvent}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="text-xs font-semibold text-brand-sky flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-brand-sky animate-pulse" />
                {currentEvent}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Rotating Active Card Display */}
        <div className="w-full max-w-sm h-32 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeModule.id}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 p-5 rounded-[2rem] bg-white/40 backdrop-blur-xl border border-slate-200 shadow-lg flex flex-col justify-between"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br ${activeModule.color} text-white`}
                >
                  <ActiveIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800 leading-tight">
                    {activeModule.title}
                  </h4>
                  <p className="text-[10px] text-slate-500 mt-0.5">
                    Active Module Pipeline
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                {activeModule.features.map((feat) => (
                  <span
                    key={feat}
                    className="text-[9px] font-medium text-slate-600 bg-white/50 border border-white/30 px-2 py-0.5 rounded-md"
                  >
                    {feat}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
