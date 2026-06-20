import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Mic, BrainCircuit, ShieldCheck, CalendarClock, ArrowRight, Check, AlertTriangle, Shield, Calendar, Users, Eye } from "lucide-react";

interface Feature {
  id: number;
  title: string;
  shortTitle: string;
  description: string;
  icon: React.ReactNode;
  accentColor: string;
}

const features: Feature[] = [
  {
    id: 1,
    title: "Speak Naturally, Save 2+ Hours Daily",
    shortTitle: "Voice-Powered EMR",
    description: "No more typing or writing after patient visits. Simply speak your diagnosis in your preferred language, and our smart voice AI instantly structures your words into digital prescriptions in seconds.",
    icon: <Mic className="w-5 h-5" />,
    accentColor: "text-brand-teal bg-brand-teal/10 border-brand-teal/20",
  },
  {
    id: 2,
    title: "Smarter Decisions with Clinical AI",
    shortTitle: "Clinical AI Copilot",
    description: "Get instant patient summaries, quick access to past medical histories, and automatic alerts on drug-to-drug interactions. It’s like having an intelligent clinical copilot right beside you.",
    icon: <BrainCircuit className="w-5 h-5" />,
    accentColor: "text-brand-sky bg-brand-sky/10 border-brand-sky/20",
  },
  {
    id: 3,
    title: "Instant ABDM & ABHA Access",
    shortTitle: "ABDM Integration",
    description: "Connect to India's national digital health ecosystem in one click. Instantly generate ABHA IDs for your patients, safely access unified medical histories, and process insurance claims faster.",
    icon: <ShieldCheck className="w-5 h-5" />,
    accentColor: "text-indigo-600 bg-indigo-50 border-indigo-100",
  },
  {
    id: 4,
    title: "Manage Your Clinic & Hospital Effortlessly",
    shortTitle: "Analytics & KPIs",
    description: "Maintain complete control over your facility's operations. Access real-time analytics, track daily KPIs, monitor outpatient queues, and optimize healthcare delivery from one central dashboard.",
    icon: <CalendarClock className="w-5 h-5" />,
    accentColor: "text-amber-600 bg-amber-50 border-amber-100",
  },
];

export const FeaturesSection = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [dictationText, setDictationText] = useState("");
  const [isTypingDone, setIsTypingDone] = useState(false);

  // Typing effect for the EMR Voice Dictation tab simulation
  useEffect(() => {
    if (activeTab !== 0) {
      setDictationText("");
      setIsTypingDone(false);
      return;
    }

    const fullText = "Patient presenting with mild hypertension. Advised low sodium diet and prescribed Amlodipine 5mg once daily after breakfast.";
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setDictationText(fullText.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsTypingDone(true);
        clearInterval(interval);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [activeTab]);

  return (
    <section id="features" className="py-20 lg:py-28 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden select-none">
      {/* Background elements */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-brand-teal/5 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-brand-sky/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="container relative z-10 px-6 md:px-8 lg:px-12 max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight mb-4 font-display">
            The Complete OS for Clinical Care
          </h2>
          
          <p className="text-base sm:text-lg text-slate-600 font-light leading-relaxed">
            Experience how NEXEAGLE simplifies the patient journey, saves valuable time, and provides intelligent support to doctors.
          </p>
        </div>

        {/* Stepper Panel Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Column: Interactive Stepper Buttons */}
          <div className="lg:col-span-5 flex flex-col gap-4 justify-center">
            {features.map((item, idx) => {
              const isActive = activeTab === idx;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(idx)}
                  className={`text-left p-6 rounded-3xl border transition-all duration-300 relative group flex gap-4 ${
                    isActive 
                      ? "bg-white border-slate-200 shadow-soft" 
                      : "bg-transparent border-transparent hover:bg-slate-100/50"
                  }`}
                >
                  {/* Left Active Line Indicator */}
                  {isActive && (
                    <div className="absolute left-0 top-6 bottom-6 w-1 rounded-r-full bg-brand-teal" />
                  )}

                  {/* Icon */}
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${item.accentColor}`}>
                    {item.icon}
                  </div>

                  {/* Text Details */}
                  <div className="space-y-2">
                    <span className={`text-[10px] uppercase font-bold tracking-widest ${isActive ? "text-brand-teal" : "text-slate-400"}`}>
                      {item.shortTitle}
                    </span>
                    <h3 className={`text-base sm:text-lg font-bold leading-tight font-display ${isActive ? "text-slate-900" : "text-slate-500 group-hover:text-slate-800"}`}>
                      {item.title}
                    </h3>
                    {isActive && (
                      <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed pt-1">
                        {item.description}
                      </p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Dynamic Mockup Screen Showcase */}
          <div className="lg:col-span-7 flex items-center">
            <div className="w-full bg-slate-950 border border-slate-900 rounded-[2rem] p-6 sm:p-8 shadow-[0_30px_100px_rgba(0,0,0,0.15)] relative overflow-hidden min-h-[380px] flex flex-col justify-between">
              {/* Outer Glow Effect */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-teal/5 rounded-full blur-[80px] pointer-events-none" />
              
              {/* Top Bar of Mockup */}
              <div className="flex justify-between items-center pb-4 border-b border-slate-900 mb-6">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1 bg-slate-900/50 px-3 py-1 rounded-full border border-slate-900">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-teal animate-pulse" />
                  <span>NEXEAGLE OS Simulation</span>
                </div>
              </div>

              {/* Showcase Screen Contents */}
              <div className="grow flex flex-col justify-center relative">
                
                {/* 1. Voice Dictation Simulation */}
                {activeTab === 0 && (
                  <div className="space-y-5 animate-[fadeIn_0.3s_ease-out]">
                    <div className="flex items-center gap-3 p-3 bg-brand-teal/10 rounded-2xl border border-brand-teal/15 w-fit">
                      <div className="w-6 h-6 rounded-full bg-brand-teal flex items-center justify-center text-white animate-pulse">
                        <Mic className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[10px] sm:text-xs font-bold text-brand-teal uppercase tracking-wider">Listening to Doctor...</span>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 min-h-[100px] flex flex-col justify-center">
                      <p className="text-sm text-slate-300 font-mono leading-relaxed">
                        {dictationText}
                        {!isTypingDone && <span className="animate-pulse text-brand-teal">|</span>}
                      </p>
                    </div>

                    {isTypingDone && (
                      <div className="p-4 bg-emerald-950/20 border border-emerald-900/40 rounded-2xl animate-[fadeIn_0.5s_ease-out] flex gap-3.5 items-start">
                        <Check className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
                        <div className="space-y-1">
                          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Prescription Coded Automatically</span>
                          <p className="text-slate-400 text-xs font-light">Diagnosed: <strong className="text-slate-200">Hypertension (ICD-10 I10)</strong> | Treatment: <strong className="text-slate-200">Amlodipine (5mg) 1-0-0</strong></p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* 2. Clinical AI Copilot Simulation */}
                {activeTab === 1 && (
                  <div className="space-y-5 animate-[fadeIn_0.3s_ease-out]">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex gap-4 items-center">
                      <div className="w-10 h-10 rounded-xl bg-brand-sky/15 text-brand-sky flex items-center justify-center shrink-0 border border-brand-sky/10">
                        <BrainCircuit className="w-5 h-5" />
                      </div>
                      <div className="space-y-1 min-w-0">
                        <span className="text-xs font-bold text-slate-200 block truncate">Amit Sharma, Male (48y)</span>
                        <p className="text-[10px] text-slate-500 leading-none">History: Gastritis, Cardiac Arrhythmia</p>
                      </div>
                    </div>

                    <div className="p-4 bg-rose-950/25 border border-rose-900/30 rounded-2xl flex gap-3.5 items-start">
                      <AlertTriangle className="w-5 h-5 text-rose-500 mt-0.5 shrink-0" />
                      <div className="space-y-1">
                        <span className="text-xs font-bold text-rose-500 uppercase tracking-wider block">Drug Interaction Risk Detected</span>
                        <p className="text-slate-400 text-xs font-light leading-relaxed">
                          Patient is currently taking <strong className="text-slate-300">Beta-Blockers</strong>. Auto-suggested prescription <strong className="text-slate-300">NSAIDs</strong> interacts and may reduce efficacy.
                        </p>
                      </div>
                    </div>

                    <div className="p-3 bg-brand-sky/5 border border-brand-sky/15 rounded-xl flex gap-2.5 items-center">
                      <span className="w-2 h-2 rounded-full bg-brand-sky animate-ping" />
                      <span className="text-[10px] font-bold text-brand-sky uppercase tracking-wider">AI Copilot Recommendation: Switch to Paracetamol 650mg.</span>
                    </div>
                  </div>
                )}

                {/* 3. ABDM Integration Simulation */}
                {activeTab === 2 && (
                  <div className="space-y-4 animate-[fadeIn_0.3s_ease-out]">
                    <div className="max-w-sm mx-auto bg-gradient-to-br from-indigo-950/60 to-slate-900 border border-indigo-900/50 rounded-3xl p-5 shadow-2xl relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-[20px] pointer-events-none" />
                      
                      <div className="flex justify-between items-start mb-6">
                        <div className="space-y-0.5">
                          <span className="text-[8px] font-extrabold text-indigo-400 uppercase tracking-widest">Government of India</span>
                          <span className="text-[10px] font-bold text-slate-200 block">ABHA Card Wallet</span>
                        </div>
                        <Shield className="w-6 h-6 text-indigo-400" />
                      </div>

                      <div className="space-y-3 pt-2">
                        <div className="flex justify-between border-b border-slate-800 pb-2">
                          <span className="text-[10px] text-slate-500 uppercase">Patient Name</span>
                          <span className="text-[11px] font-semibold text-slate-200">Amit Kumar Sharma</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-800 pb-2">
                          <span className="text-[10px] text-slate-500 uppercase">ABHA Address</span>
                          <span className="text-[11px] font-mono font-semibold text-brand-teal">amitsharma@abha</span>
                        </div>
                        <div className="flex justify-between pb-1">
                          <span className="text-[10px] text-slate-500 uppercase">ABHA Number</span>
                          <span className="text-[11px] font-mono font-semibold text-slate-200">14-1234-5678-9012</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-center items-center gap-2 text-xs font-bold text-emerald-400 bg-emerald-950/20 border border-emerald-900/40 py-2.5 rounded-2xl w-fit mx-auto px-6">
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>Linked & Verified with National Health Registry</span>
                    </div>
                  </div>
                )}

                {/* 4. Queue & OPD Flow Simulation */}
                {activeTab === 3 && (
                  <div className="space-y-4 animate-[fadeIn_0.3s_ease-out]">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pb-1 flex justify-between items-center border-b border-slate-900">
                      <span>Real-time Operations Dashboard</span>
                      <span className="text-brand-sky">Analytics & KPIs</span>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-3">
                      <div className="p-3 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col justify-center">
                        <span className="text-[8px] font-bold text-slate-500 uppercase tracking-wider">OPD Patients</span>
                        <div className="flex items-baseline gap-1.5 mt-1">
                          <span className="text-base sm:text-lg font-extrabold text-slate-200">142</span>
                          <span className="text-[8px] font-bold text-emerald-400">+12%</span>
                        </div>
                      </div>

                      <div className="p-3 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col justify-center">
                        <span className="text-[8px] font-bold text-slate-500 uppercase tracking-wider">Avg Wait Time</span>
                        <div className="flex items-baseline gap-1.5 mt-1">
                          <span className="text-base sm:text-lg font-extrabold text-slate-200">14m</span>
                          <span className="text-[8px] font-bold text-emerald-400">-3m</span>
                        </div>
                      </div>

                      <div className="p-3 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col justify-center">
                        <span className="text-[8px] font-bold text-slate-500 uppercase tracking-wider">Total Billing</span>
                        <div className="flex items-baseline gap-1.5 mt-1">
                          <span className="text-base sm:text-lg font-extrabold text-slate-200">₹78.4K</span>
                          <span className="text-[8px] font-bold text-emerald-400">+8%</span>
                        </div>
                      </div>
                    </div>

                    {/* Chart simulation */}
                    <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
                      <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider block">OPD Distribution by Department</span>
                      
                      {/* Progress Bar 1 */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px]">
                          <span className="text-slate-400">Cardiology</span>
                          <span className="font-semibold text-slate-200">45 Patients (32%)</span>
                        </div>
                        <div className="h-1.5 bg-slate-950 rounded-full overflow-hidden">
                          <div className="h-full bg-brand-teal rounded-full" style={{ width: "70%" }} />
                        </div>
                      </div>

                      {/* Progress Bar 2 */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px]">
                          <span className="text-slate-400">Radiology</span>
                          <span className="font-semibold text-slate-200">30 Patients (21%)</span>
                        </div>
                        <div className="h-1.5 bg-slate-950 rounded-full overflow-hidden">
                          <div className="h-full bg-brand-sky rounded-full" style={{ width: "55%" }} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              </div>

              {/* Bottom Learn More link in Showcase */}
              <div className="border-t border-slate-900 pt-6 mt-6 flex flex-col sm:flex-row justify-between items-center gap-4 bg-brand-teal/5 p-4 rounded-2xl border border-brand-teal/10">
                <span className="text-[11px] font-medium text-slate-400 tracking-wide">
                  Want to explore more detailed clinical features?
                </span>
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 text-xs font-bold text-white bg-brand-teal px-4 py-2 rounded-xl hover:bg-brand-teal/90 transition-all shadow-[0_4px_15px_rgba(27,122,103,0.25)] group/learn shrink-0"
                >
                  <span>Explore Full Details in Our Blog</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/learn:translate-x-1" />
                </Link>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default FeaturesSection;
