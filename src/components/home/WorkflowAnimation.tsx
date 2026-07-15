"use client";

import React, { useState, useEffect } from 'react';
import { 
  UserPlus, 
  Cloud, 
  Mic, 
  Receipt, 
  Heart,
  CheckCircle2
} from 'lucide-react';
import { cn } from '@/lib/utils';

const steps = [
  { 
    id: 1, 
    icon: UserPlus, 
    title: "Patient Registered", 
    desc: "User registered quickly at the front desk. 🏥",
    color: "text-brand-sky",
    bg: "bg-brand-sky"
  },
  { 
    id: 2, 
    icon: Cloud, 
    title: "Scan & Auto-Transfer", 
    desc: "SCAN completed. Images auto transfer to 1Rad instantly. ⚡",
    color: "text-brand-teal",
    bg: "bg-brand-teal"
  },
  { 
    id: 3, 
    icon: Mic, 
    title: "Smart Reporting", 
    desc: "Doctor reports using traditional keyboard or AI voice dictation. 🎙️⌨️",
    color: "text-brand-iris",
    bg: "bg-brand-iris"
  },
  { 
    id: 4, 
    icon: Receipt, 
    title: "Auto-Bill Generation", 
    desc: "Bill has been generated and finalized automatically. 💳🧾",
    color: "text-brand-sky",
    bg: "bg-brand-sky"
  },
  { 
    id: 5, 
    icon: Heart, 
    title: "Trust & Network", 
    desc: "Seamless process builds deep trust and a strong healthcare network. 🤝🌐",
    color: "text-brand-teal",
    bg: "bg-brand-teal"
  }
];

const WorkflowAnimation = () => {
  const [activeStep, setActiveStep] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev % steps.length) + 1);
    }, 4000); // 4 seconds per step
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto py-12 relative">
      
      {/* Connecting Line Background */}
      <div className="absolute top-[80px] left-[10%] right-[10%] h-1.5 bg-slate-200 rounded-full hidden lg:block z-0">
        {/* Animated Progress Line */}
        <div 
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-brand-sky via-brand-teal to-brand-iris transition-all duration-1000 ease-in-out rounded-full"
          style={{ width: `${((activeStep - 1) / (steps.length - 1)) * 100}%` }}
        >
          {/* Glowing head of the line */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_15px_rgba(20,184,166,0.8)] animate-pulse border-2 border-brand-teal"></div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-between relative z-10 gap-12 lg:gap-4">
        {steps.map((step, index) => {
          const isActive = step.id === activeStep;
          const isPast = step.id < activeStep;
          const Icon = step.icon;

          return (
            <div key={step.id} className="flex flex-col items-center relative w-full lg:w-1/5 group">
              
              {/* Icon Node */}
              <div 
                className={cn(
                  "w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-500 relative cursor-pointer",
                  isActive 
                    ? `${step.bg} text-white shadow-[0_10px_30px_rgba(20,184,166,0.3)] scale-110 -translate-y-2` 
                    : isPast 
                      ? "bg-white border-2 border-slate-200 text-slate-400" 
                      : "bg-white border-2 border-slate-100 text-slate-300 scale-95"
                )}
                onClick={() => setActiveStep(step.id)}
              >
                <Icon className={cn("w-8 h-8 transition-all", isActive && "animate-pulse")} />
                
                {/* Success Checkmark for past steps */}
                {isPast && (
                  <div className="absolute -bottom-2 -right-2 bg-white rounded-full">
                    <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                  </div>
                )}
              </div>

              {/* Title & Description Card */}
              <div className={cn(
                "mt-6 text-center transition-all duration-500 absolute lg:static top-24 w-64 lg:w-full",
                isActive ? "opacity-100 translate-y-0" : "opacity-0 lg:opacity-100 translate-y-4 lg:translate-y-0"
              )}>
                <h4 className={cn(
                  "font-bold text-lg mb-2 transition-colors",
                  isActive ? step.color : "text-slate-500 lg:text-slate-600"
                )}>
                  {step.title}
                </h4>
                
                {/* Detailed Description Card (Visible only when active on desktop, or always visible on mobile if active) */}
                <div className={cn(
                  "bg-white p-4 rounded-xl shadow-lg border border-slate-100 text-sm text-slate-600 transition-all duration-500 relative",
                  isActive ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none lg:h-0 lg:overflow-hidden lg:p-0 lg:border-none lg:shadow-none lg:mt-0"
                )}>
                  {/* Speech bubble pointer */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-t border-l border-slate-100 rotate-45 hidden lg:block"></div>
                  {step.desc}
                </div>
              </div>

              {/* Mobile Connector */}
              {index < steps.length - 1 && (
                <div className="lg:hidden h-12 w-1 bg-slate-200 mt-32 relative rounded-full">
                  <div 
                    className="absolute top-0 left-0 w-full bg-brand-teal transition-all duration-1000"
                    style={{ height: isPast ? '100%' : '0%' }}
                  ></div>
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default WorkflowAnimation;
