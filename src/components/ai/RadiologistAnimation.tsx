"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Mic, BrainCircuit, FileText, CheckCircle2, ChevronDown, Printer } from 'lucide-react';
import { cn } from '@/lib/utils';

const DICTATION_TEXT = "Patient is a 45 year old male complaining of mild cough. Chest X-ray PA view reveals clear lung fields bilaterally. Cardiac silhouette is within normal limits. Both CP angles are acute. No evidence of pleural effusion or consolidation. Bony thoracic cage appears intact.";

const ANALYSIS_ITEMS = [
  { label: "Anatomy", value: "Lung Fields" },
  { label: "Status", value: "Clear bilaterally" },
  { label: "Anatomy", value: "Cardiac Silhouette" },
  { label: "Status", value: "Normal limits" },
  { label: "Anatomy", value: "CP Angles" },
  { label: "Status", value: "Acute (Normal)" },
  { label: "Condition", value: "Pleural Effusion (Negative)" }
];

const RadiologistAnimation = () => {
  const [step, setStep] = useState(1);
  const [typedText, setTypedText] = useState("");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  // Cleanup function for timeouts
  const clearAllTimeouts = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  };

  // Animation Loop Sequence
  useEffect(() => {
    const runSequence = () => {
      clearAllTimeouts();
      setStep(1);
      setTypedText("");
      let charIndex = 0;

      // Type out dictation
      intervalRef.current = setInterval(() => {
        if (charIndex < DICTATION_TEXT.length) {
          charIndex++;
          setTypedText(DICTATION_TEXT.substring(0, charIndex));
        } else {
          if (intervalRef.current) clearInterval(intervalRef.current);
          
          // Move to AI Analysis after typing is done + 1s pause
          const t1 = setTimeout(() => {
            setStep(2);
            
            // Move to Report after 3.5s of analysis
            const t2 = setTimeout(() => {
              setStep(3);
              
              // Restart sequence after 8s of showing report
              const t3 = setTimeout(runSequence, 8000);
              timeoutsRef.current.push(t3);
            }, 3500);
            timeoutsRef.current.push(t2);
          }, 1000);
          timeoutsRef.current.push(t1);
        }
      }, 30); // typing speed
    };

    runSequence();

    return clearAllTimeouts;
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-8 rounded-3xl bg-slate-50/50 border border-border shadow-xl relative overflow-hidden">
      
      <div className="flex flex-col items-center relative z-10 space-y-2">
        
        {/* Step 1: Doctor Dictates */}
        <div className={cn(
          "flex flex-col sm:flex-row items-start gap-4 sm:gap-6 w-full p-6 rounded-2xl transition-all duration-500",
          step === 1 ? "bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-brand-teal/30 border-2 scale-100" : "bg-white/60 border border-border/50 scale-[0.98] opacity-70"
        )}>
          <div className="relative flex-shrink-0 mx-auto sm:mx-0">
            <div className={cn(
              "w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center bg-brand-teal/10 border-2 border-brand-teal text-brand-teal",
              step === 1 && "animate-pulse"
            )}>
              <Mic className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>
            {step === 1 && (
              <div className="absolute inset-0 rounded-full border-2 border-brand-teal animate-ping opacity-20"></div>
            )}
          </div>
          
          <div className="flex-1 w-full space-y-3">
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <h3 className="font-bold text-lg text-foreground">1. Doctor Dictates</h3>
              {step === 1 && <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse" />}
            </div>
            
            <div className="bg-slate-100/80 rounded-xl p-4 min-h-[100px] border border-slate-200 relative">
              <p className="text-slate-700 italic font-medium leading-relaxed">
                &quot;{typedText}{step === 1 && <span className="animate-pulse">|</span>}&quot;
              </p>
              {!typedText && step === 1 && (
                <p className="text-slate-400 italic absolute top-4 left-4">Listening for audio...</p>
              )}
            </div>
          </div>
        </div>

        {/* Vertical Connector 1 */}
        <div className="h-8 sm:h-10 w-0.5 bg-border relative">
          <div className={cn(
            "absolute top-0 left-0 w-full bg-brand-teal transition-all duration-1000",
            step >= 2 ? "h-full" : "h-0"
          )}></div>
          {step >= 2 && <ChevronDown className="absolute -bottom-3 -left-2.5 w-6 h-6 text-brand-teal animate-bounce" />}
        </div>

        {/* Step 2: AI Analyzes */}
        <div className={cn(
          "flex flex-col sm:flex-row items-start gap-4 sm:gap-6 w-full p-6 rounded-2xl transition-all duration-500",
          step === 2 ? "bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-brand-sky/30 border-2 scale-100" : "bg-white/60 border border-border/50 scale-[0.98] opacity-70"
        )}>
          <div className="relative flex-shrink-0 mx-auto sm:mx-0">
            <div className={cn(
              "w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center bg-brand-sky/10 border-2 border-brand-sky text-brand-sky",
              step === 2 && "animate-pulse"
            )}>
              <BrainCircuit className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>
          </div>
          
          <div className="flex-1 w-full space-y-3">
            <h3 className="font-bold text-lg text-foreground text-center sm:text-left">2. AI Extracts Clinical Entities</h3>
            
            <div className="bg-slate-900 rounded-xl p-4 min-h-[140px] shadow-inner overflow-hidden relative">
              {step >= 2 ? (
                <div className="space-y-2 font-mono text-xs sm:text-sm">
                  {ANALYSIS_ITEMS.map((item, i) => (
                    <div 
                      key={i} 
                      className="flex items-center gap-2 opacity-0 animate-[fadeIn_0.5s_ease-out_forwards]"
                      style={{ animationDelay: `${i * 0.4}s` }}
                    >
                      <span className="text-brand-sky">{`>`}</span>
                      <span className="text-slate-400">{item.label}:</span>
                      <span className="text-emerald-400">{item.value}</span>
                    </div>
                  ))}
                  <div 
                    className="text-brand-iris/80 animate-pulse mt-4 opacity-0 animate-[fadeIn_0.5s_ease-out_forwards]"
                    style={{ animationDelay: '3s' }}
                  >
                    Structuring report to NABH standards...
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-slate-600 font-mono text-sm">
                  Waiting for input...
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Vertical Connector 2 */}
        <div className="h-8 sm:h-10 w-0.5 bg-border relative">
          <div className={cn(
            "absolute top-0 left-0 w-full bg-brand-sky transition-all duration-1000",
            step === 3 ? "h-full" : "h-0"
          )}></div>
          {step === 3 && <ChevronDown className="absolute -bottom-3 -left-2.5 w-6 h-6 text-brand-sky animate-bounce" />}
        </div>

        {/* Step 3: Report Generated (Indian Format) */}
        <div className={cn(
          "flex flex-col sm:flex-row items-start gap-4 sm:gap-6 w-full p-6 rounded-2xl transition-all duration-500",
          step === 3 ? "bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-brand-iris/30 border-2 scale-100" : "bg-white/60 border border-border/50 scale-[0.98] opacity-70"
        )}>
          <div className="relative flex-shrink-0 mx-auto sm:mx-0">
            <div className={cn(
              "w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center bg-brand-iris/10 border-2 border-brand-iris text-brand-iris",
              step === 3 && "shadow-[0_0_20px_rgba(139,92,246,0.3)]"
            )}>
              {step === 3 ? <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-brand-iris animate-[bounce_0.5s_ease-out_1]" /> : <FileText className="w-8 h-8 sm:w-10 sm:h-10" />}
            </div>
          </div>
          
          <div className="flex-1 w-full space-y-3">
            <h3 className="font-bold text-lg text-foreground text-center sm:text-left">3. Auto-Generated Radiology Report</h3>
            
            <div className="bg-white border-2 border-slate-200 rounded-lg p-6 min-h-[200px] shadow-md relative overflow-hidden font-sans">
              {step === 3 ? (
                <div className="opacity-0 animate-[fadeIn_0.8s_ease-out_forwards]">
                  
                  {/* Clinic Header */}
                  <div className="flex justify-between items-start border-b-2 border-slate-800 pb-4 mb-4">
                    <div>
                      <h4 className="font-bold text-slate-800 text-lg uppercase tracking-wide">Apex Diagnostics</h4>
                      <p className="text-xs text-slate-500">24/7 Advanced Imaging Center</p>
                    </div>
                    <Printer className="w-5 h-5 text-slate-400" />
                  </div>

                  {/* Patient Details */}
                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-700 mb-6 border-b border-slate-200 pb-4">
                    <div><span className="font-semibold">Patient Name:</span> Mr. Rahul Sharma</div>
                    <div><span className="font-semibold">Date:</span> 31-May-2026</div>
                    <div><span className="font-semibold">Age/Sex:</span> 45 Yrs / Male</div>
                    <div><span className="font-semibold">Ref Dr:</span> Dr. S. K. Patel</div>
                  </div>
                  
                  {/* Report Body */}
                  <div className="text-center mb-6">
                    <h4 className="font-bold text-slate-900 underline underline-offset-4 text-base">X-RAY CHEST (PA VIEW)</h4>
                  </div>

                  <div className="space-y-3 text-sm text-slate-800 mb-8">
                    <p><span className="font-semibold">Clinical Profile:</span> Mild cough.</p>
                    <p className="font-semibold">Observations:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Both lung fields are clear.</li>
                      <li>Cardiac silhouette is within normal limits.</li>
                      <li>Both CP angles are acute and free.</li>
                      <li>No evidence of pleural effusion or consolidation.</li>
                      <li>Bony thoracic cage appears intact.</li>
                    </ul>
                  </div>
                  
                  {/* Impression */}
                  <div className="bg-slate-50 border border-slate-200 p-3 rounded mb-8">
                    <p className="text-sm"><span className="font-bold text-slate-900">IMPRESSION:</span> <span className="font-semibold">NORMAL STUDY OF THE CHEST.</span></p>
                  </div>

                  {/* Signature */}
                  <div className="text-right text-sm">
                    <p className="font-bold text-slate-800">Dr. A. Verma</p>
                    <p className="text-slate-500 text-xs">MD (Radiodiagnosis)</p>
                    <p className="text-slate-500 text-xs">Consultant Radiologist</p>
                    <p className="text-brand-teal text-xs font-semibold mt-1 flex items-center justify-end gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Electronically Signed
                    </p>
                  </div>

                </div>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 space-y-4 p-8">
                  <div className="w-full h-3 bg-slate-100 rounded-full"></div>
                  <div className="w-3/4 h-3 bg-slate-100 rounded-full"></div>
                  <div className="w-5/6 h-3 bg-slate-100 rounded-full"></div>
                  <div className="w-1/2 h-3 bg-slate-100 rounded-full mt-4"></div>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default RadiologistAnimation;
