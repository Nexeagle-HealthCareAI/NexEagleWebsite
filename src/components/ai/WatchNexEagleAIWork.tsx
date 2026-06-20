import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mic, 
  BrainCircuit, 
  CheckCircle2, 
  Loader2, 
  Sparkles, 
  Clock, 
  Check, 
  FileText, 
  Pill, 
  ClipboardList, 
  Activity, 
  ArrowRight, 
  RotateCcw,
  AlertCircle
} from "lucide-react";

// Use Case Data Structure
interface UseCase {
  label: string;
  badge: string;
  inputType: "speak" | "action" | "request";
  inputHeader: string;
  inputText: string;
  processingStatuses: string[];
  outputHeader: string;
  outputContent: React.ReactNode;
}

export const WatchNexEagleAIWork = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [activeStatusIdx, setActiveStatusIdx] = useState(0);
  const [showOutput, setShowOutput] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const useCases: UseCase[] = [
    {
      label: "Clinical Documentation",
      badge: "Doctor Consultation",
      inputType: "speak",
      inputHeader: "Doctor Speaking",
      inputText: "58-year-old male with uncontrolled Type 2 diabetes mellitus and hypertension. Reports progressive exertional dyspnea over the last two weeks. Blood pressure today is 168 over 96. HbA1c from last month was 8.7 percent.",
      processingStatuses: [
        "Listening...",
        "Understanding Clinical Context...",
        "Generating SOAP Note...",
        "Creating Care Plan..."
      ],
      outputHeader: "SOAP Note Generated",
      outputContent: (
        <div className="space-y-4 text-slate-800 text-xs sm:text-sm">
          <div className="border-b border-slate-100 pb-2">
            <h4 className="font-bold text-slate-400 uppercase tracking-wide text-[10px]">Chief Complaint</h4>
            <p className="font-medium text-slate-900 mt-0.5">Progressive exertional dyspnea</p>
          </div>
          <div className="border-b border-slate-100 pb-2">
            <h4 className="font-bold text-slate-400 uppercase tracking-wide text-[10px]">Assessment</h4>
            <ul className="list-disc pl-4 space-y-1 font-medium text-slate-900 mt-1">
              <li>Type 2 Diabetes Mellitus</li>
              <li>Essential Hypertension</li>
              <li className="text-amber-600 font-semibold">Possible Cardiovascular Evaluation Required</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-400 uppercase tracking-wide text-[10px]">Plan</h4>
            <div className="grid grid-cols-2 gap-2 mt-1 font-medium text-slate-900">
              <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">ECG</div>
              <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">2D Echocardiography</div>
              <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">HbA1c Follow-Up</div>
              <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">Review After 2 Weeks</div>
            </div>
          </div>
        </div>
      )
    },
    {
      label: "AI Prescription Assistant",
      badge: "Prescription Generation",
      inputType: "speak",
      inputHeader: "Doctor Speaking",
      inputText: "Prescribe Telmisartan 40 mg once daily and Metformin 500 mg twice daily after meals. Add lifestyle advice and schedule review after fourteen days.",
      processingStatuses: [
        "Listening...",
        "Generating Prescription...",
        "Checking Medication Context...",
        "Preparing Patient Instructions..."
      ],
      outputHeader: "Prescription Draft Ready",
      outputContent: (
        <div className="space-y-4 text-slate-800 text-xs sm:text-sm">
          <div className="border-b border-slate-100 pb-2">
            <h4 className="font-bold text-slate-400 uppercase tracking-wide text-[10px]">Medications</h4>
            <div className="space-y-1.5 mt-1">
              <div className="flex justify-between items-center bg-slate-50 p-2 rounded-lg border border-slate-100">
                <span className="font-semibold text-slate-900">Telmisartan 40 mg</span>
                <span className="text-xs bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-mono">Once Daily (OD)</span>
              </div>
              <div className="flex justify-between items-center bg-slate-50 p-2 rounded-lg border border-slate-100">
                <span className="font-semibold text-slate-900">Metformin 500 mg</span>
                <span className="text-xs bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-mono">Twice Daily (BD)</span>
              </div>
            </div>
          </div>
          <div className="border-b border-slate-100 pb-2">
            <h4 className="font-bold text-slate-400 uppercase tracking-wide text-[10px]">Lifestyle Advice</h4>
            <ul className="list-disc pl-4 space-y-0.5 font-medium text-slate-700 mt-1">
              <li>Low Sodium Diet</li>
              <li>Regular Exercise</li>
              <li>Daily Blood Pressure Monitoring</li>
            </ul>
          </div>
          <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 border border-emerald-100/50 p-2.5 rounded-xl text-xs font-semibold">
            <Check className="w-4 h-4" />
            <span>14-Day Follow-Up Added to Scheduler</span>
          </div>
        </div>
      )
    },
    {
      label: "Patient History Summary",
      badge: "Patient Intelligence",
      inputType: "action",
      inputHeader: "Doctor Action",
      inputText: "Summarize this patient's medical history.",
      processingStatuses: [
        "Reviewing Patient Records...",
        "Analyzing Previous Visits...",
        "Identifying Key Findings...",
        "Preparing Summary..."
      ],
      outputHeader: "Patient Summary Ready",
      outputContent: (
        <div className="space-y-4 text-slate-800 text-xs sm:text-sm">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <h4 className="font-bold text-slate-400 uppercase tracking-wide text-[9px] mb-1">Key Conditions</h4>
              <ul className="space-y-0.5 font-semibold text-slate-900 text-xs">
                <li>• Type 2 Diabetes</li>
                <li>• Hypertension</li>
                <li>• Dyslipidemia</li>
              </ul>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <h4 className="font-bold text-slate-400 uppercase tracking-wide text-[9px] mb-1">Recent Events</h4>
              <ul className="space-y-0.5 font-semibold text-slate-900 text-xs">
                <li>• 2 Admissions</li>
                <li>• 1 Emergency Visit</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-100 pt-2.5">
            <h4 className="font-bold text-slate-400 uppercase tracking-wide text-[10px]">Current Medications</h4>
            <p className="font-semibold text-slate-800 mt-0.5 text-xs">Metformin, Telmisartan, Rosuvastatin</p>
          </div>
          <div className="flex items-start gap-2.5 bg-rose-50 border border-rose-100/50 p-3 rounded-2xl text-xs text-rose-700">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Clinical Alert:</span>
              <p className="font-medium text-[11px] text-rose-600 mt-0.5">HbA1c level is above patient target range (8.7% vs &lt;7.0%).</p>
            </div>
          </div>
        </div>
      )
    },
    {
      label: "AI Radiology Reporting",
      badge: "Radiology Reporting",
      inputType: "speak",
      inputHeader: "Radiologist Speaking",
      inputText: "CT chest demonstrates bilateral patchy ground-glass opacities predominantly involving the peripheral lower lobes. No pleural effusion or pneumothorax identified.",
      processingStatuses: [
        "Listening...",
        "Extracting Findings...",
        "Structuring Report...",
        "Generating Impression..."
      ],
      outputHeader: "Radiology Report Generated",
      outputContent: (
        <div className="space-y-4 text-slate-800 text-xs sm:text-sm">
          <div className="border-b border-slate-100 pb-2">
            <h4 className="font-bold text-slate-400 uppercase tracking-wide text-[10px]">Findings</h4>
            <ul className="list-disc pl-4 space-y-1 font-medium text-slate-900 mt-1">
              <li>Bilateral peripheral ground-glass opacities involving lower lobes.</li>
              <li>No pleural effusion identified.</li>
              <li>No pneumothorax identified.</li>
            </ul>
          </div>
          <div className="bg-slate-900 text-slate-100 p-3.5 rounded-2xl border border-slate-800 shadow-inner">
            <h4 className="font-bold text-brand-sky uppercase tracking-wide text-[10px]">Impression</h4>
            <p className="font-medium text-xs sm:text-sm mt-1 text-slate-200 leading-relaxed">
              Imaging findings suggest inflammatory or infectious pulmonary process.
            </p>
          </div>
          <div className="text-right">
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
              <Check className="w-3 h-3" /> Report Ready For Review
            </span>
          </div>
        </div>
      )
    },
    {
      label: "AI Clinical Insights",
      badge: "Pre-Consultation Intelligence",
      inputType: "request",
      inputHeader: "Doctor Request",
      inputText: "Show key findings before consultation.",
      processingStatuses: [
        "Reviewing Records...",
        "Analyzing Historical Data...",
        "Identifying Risk Factors...",
        "Preparing Clinical Brief..."
      ],
      outputHeader: "Consultation Brief Ready",
      outputContent: (
        <div className="space-y-3.5 text-slate-800 text-xs sm:text-sm">
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <h4 className="font-bold text-slate-400 uppercase tracking-wide text-[9px] mb-1">Diagnoses</h4>
              <ul className="space-y-0.5 font-semibold text-slate-900">
                <li>• Type 2 Diabetes</li>
                <li>• Hypertension</li>
              </ul>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <h4 className="font-bold text-slate-400 uppercase tracking-wide text-[9px] mb-1">Investigations</h4>
              <ul className="space-y-0.5 font-semibold text-slate-900">
                <li>• HbA1c 8.7%</li>
                <li>• LDL 156 mg/dL</li>
              </ul>
            </div>
          </div>
          <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-xs">
            <span className="font-semibold text-slate-500">Pending Follow-up</span>
            <span className="font-bold text-slate-900 bg-slate-200/60 px-2.5 py-0.5 rounded-lg">Cardiology Review</span>
          </div>
          <div className="flex items-center gap-2 bg-amber-50 border border-amber-100/50 p-3 rounded-xl text-xs text-amber-800">
            <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
            <div>
              <span className="font-bold">High Priority Alert:</span>
              <p className="font-medium text-[11px] text-amber-700 mt-0.5">Poor Glycemic Control detected.</p>
            </div>
          </div>
        </div>
      )
    }
  ];

  // Stop current animations, restart loop/sub-sequence for selected index
  const startUseCaseAnimation = (idx: number) => {
    // Clear existing timers
    if (timerRef.current) clearTimeout(timerRef.current);
    if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);

    setTypedText("");
    setIsTyping(true);
    setActiveStatusIdx(0);
    setShowOutput(false);

    const useCase = useCases[idx];
    let charIdx = 0;

    // Typing speed: 22ms per char
    typingIntervalRef.current = setInterval(() => {
      if (charIdx < useCase.inputText.length) {
        charIdx++;
        setTypedText(useCase.inputText.substring(0, charIdx));
      } else {
        if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
        setIsTyping(false);

        // Transition center statuses in sequence: 700ms each status
        let statusIdx = 0;
        const tickStatus = () => {
          if (statusIdx < 3) {
            statusIdx++;
            setActiveStatusIdx(statusIdx);
            timerRef.current = setTimeout(tickStatus, 700);
          } else {
            // Done processing, show output
            setShowOutput(true);
            setActiveStatusIdx(4); // all completed

            // Hold output for 3 seconds before next use case (unless paused or finale reached)
            timerRef.current = setTimeout(() => {
              if (!isPaused) {
                setCurrentIdx((prev) => {
                  if (prev >= 5) return 0;
                  return prev + 1;
                });
              }
            }, 3000);
          }
        };

        timerRef.current = setTimeout(tickStatus, 700);
      }
    }, 22);
  };

  // Run cycle when current index changes
  useEffect(() => {
    if (currentIdx < 5) {
      startUseCaseAnimation(currentIdx);
    } else {
      // Finale State: clear typing timers
      if (timerRef.current) clearTimeout(timerRef.current);
      if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
    };
  }, [currentIdx]);

  // Handle Tab Click
  const handleTabClick = (idx: number) => {
    setIsPaused(true);
    setCurrentIdx(idx);
    startUseCaseAnimation(idx);
  };

  // Restart Demonstration Loop
  const handleRestart = () => {
    setIsPaused(false);
    setCurrentIdx(0);
  };

  // Waveform Graphic Component
  const WaveformAnimation = ({ active }: { active: boolean }) => {
    const bars = Array.from({ length: 18 });
    return (
      <div className="flex items-center gap-1 h-8 justify-center mt-2">
        {bars.map((_, i) => (
          <motion.div
            key={i}
            className="w-1 bg-brand-teal rounded-full"
            initial={{ height: 4 }}
            animate={active ? {
              height: [4, Math.random() * 24 + 6, 4]
            } : { height: 4 }}
            transition={active ? {
              duration: 0.5 + i * 0.03,
              repeat: Infinity,
              ease: "easeInOut"
            } : { duration: 0.2 }}
          />
        ))}
      </div>
    );
  };

  return (
    <section className="py-24 md:py-32 bg-slate-50/60 relative overflow-hidden border-y border-slate-200/50">
      
      {/* Background soft glows */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-brand-teal/5 rounded-full blur-[140px] pointer-events-none z-0"></div>
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-brand-sky/5 rounded-full blur-[140px] pointer-events-none z-0"></div>

      <div className="container relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Watch NexEagle AI Work
          </h2>
          <p className="text-slate-600 text-base sm:text-lg md:text-xl font-light leading-relaxed">
            From consultations and prescriptions to patient summaries and radiology reporting, NexEagle AI turns conversations into actions across the healthcare journey.
          </p>
        </div>

        {/* Tab Pills Selection */}
        {currentIdx < 5 && (
          <div className="flex justify-center mb-10 w-full">
            <div className="flex items-center gap-2 p-1.5 bg-slate-100/90 backdrop-blur-md rounded-2xl border border-slate-200/80 overflow-x-auto max-w-full scrollbar-none snap-x">
              {useCases.map((uc, idx) => (
                <button
                  key={idx}
                  onClick={() => handleTabClick(idx)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 shrink-0 snap-align-center ${
                    currentIdx === idx
                      ? "bg-white text-slate-900 shadow-sm border border-slate-200/60"
                      : "text-slate-500 hover:text-slate-900 hover:bg-white/40"
                  }`}
                >
                  {uc.label}
                </button>
              ))}
              <button
                onClick={() => handleTabClick(5)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 shrink-0 snap-align-center ${
                  currentIdx === 5
                    ? "bg-brand-teal text-white shadow-md"
                    : "text-brand-teal hover:bg-brand-teal/5"
                }`}
              >
                The Finale
              </button>
            </div>
          </div>
        )}

        <div className="relative min-h-[460px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            
            {/* WORKFLOW SIMULATOR PANEL */}
            {currentIdx < 5 ? (
              <motion.div
                key={currentIdx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 w-full max-w-6xl mx-auto"
              >
                
                {/* LEFT PANEL - INPUT */}
                <div className="md:col-span-4 rounded-3xl bg-white border border-slate-200/50 p-6 flex flex-col justify-between shadow-[0_10px_30px_-15px_rgba(0,0,0,0.03)] h-[440px]">
                  <div>
                    <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                      <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Left Panel</span>
                      <span className="bg-slate-100 border border-slate-200/60 text-slate-600 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                        {useCases[currentIdx].badge}
                      </span>
                    </div>

                    <div className="mt-5 space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="flex h-2.5 w-2.5 rounded-full bg-brand-teal animate-pulse" />
                        <h4 className="font-extrabold text-sm text-slate-800">
                          {useCases[currentIdx].inputHeader}
                        </h4>
                      </div>
                      
                      <div className="bg-slate-50/60 border border-slate-200/50 rounded-2xl p-4 min-h-[140px] shadow-inner font-light text-slate-700 italic leading-relaxed text-sm sm:text-base">
                        "{typedText}
                        {isTyping && <span className="animate-pulse text-brand-teal font-bold ml-0.5">|</span>}"
                      </div>
                    </div>
                  </div>

                  <div>
                    {useCases[currentIdx].inputType === "speak" ? (
                      <div className="pt-4 border-t border-slate-100 text-center">
                        <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Audio Feed</span>
                        <WaveformAnimation active={isTyping} />
                      </div>
                    ) : (
                      <div className="pt-4 border-t border-slate-100 text-center">
                        <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Contextual Feed</span>
                        <div className="flex items-center justify-center gap-1.5 mt-2 text-xs font-semibold text-slate-500">
                          <Activity className="w-4 h-4 text-brand-sky animate-pulse" />
                          <span>Auditing Records Log</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* CENTER PANEL - PROCESSING */}
                <div className="md:col-span-4 rounded-3xl bg-slate-900 border border-slate-800 p-6 flex flex-col justify-between shadow-xl h-[440px] text-white">
                  <div>
                    <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                      <span className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Center Panel</span>
                      <span className="bg-slate-800 text-brand-sky text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                        <BrainCircuit className="w-3.5 h-3.5" /> NexEagle AI
                      </span>
                    </div>

                    <div className="mt-8 space-y-5">
                      {useCases[currentIdx].processingStatuses.map((status, sIdx) => {
                        const isCompleted = activeStatusIdx > sIdx;
                        const isActive = activeStatusIdx === sIdx;

                        return (
                          <div 
                            key={sIdx} 
                            className={`flex items-center gap-3 transition-all duration-300 ${
                              isCompleted || isActive ? "opacity-100" : "opacity-30"
                            }`}
                          >
                            <div className="flex-shrink-0">
                              {isCompleted ? (
                                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                                  <Check className="w-3 h-3" />
                                </div>
                              ) : isActive ? (
                                <Loader2 className="w-5 h-5 text-brand-sky animate-spin" />
                              ) : (
                                <div className="w-5 h-5 rounded-full bg-slate-800 border border-slate-700" />
                              )}
                            </div>
                            <span className={`text-xs sm:text-sm font-mono tracking-tight ${
                              isActive ? "text-brand-sky font-semibold" : isCompleted ? "text-emerald-400" : "text-slate-500"
                            }`}>
                              {status}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-800 text-center">
                    <span className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Real-Time Core Engine</span>
                  </div>
                </div>

                {/* RIGHT PANEL - OUTPUT */}
                <div className="md:col-span-4 rounded-3xl bg-white border border-slate-200/50 p-6 flex flex-col justify-between shadow-[0_10px_30px_-15px_rgba(0,0,0,0.03)] h-[440px] relative overflow-hidden">
                  
                  {/* Glowing background behind output once loaded */}
                  <AnimatePresence>
                    {showOutput && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1.1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 1 }}
                        className="absolute -right-20 -top-20 w-44 h-44 bg-brand-teal/5 rounded-full blur-3xl pointer-events-none"
                      />
                    )}
                  </AnimatePresence>

                  <div className="z-10 w-full">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                      <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Right Panel</span>
                      <span className="bg-emerald-50 border border-emerald-100 text-emerald-700 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Output Generated
                      </span>
                    </div>

                    <div className="mt-5">
                      <AnimatePresence mode="wait">
                        {showOutput ? (
                          <motion.div
                            key="output"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.4 }}
                          >
                            <h3 className="font-extrabold text-sm sm:text-base text-slate-900 border-b border-slate-100 pb-2 mb-3">
                              {useCases[currentIdx].outputHeader}
                            </h3>
                            {useCases[currentIdx].outputContent}
                          </motion.div>
                        ) : (
                          <motion.div 
                            key="loading"
                            className="flex flex-col items-center justify-center h-[260px] text-slate-400 gap-2.5 font-light"
                          >
                            <Loader2 className="w-8 h-8 text-slate-300 animate-spin" />
                            <span className="text-xs">Waiting for clinical extraction...</span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  <div className="z-10 pt-4 border-t border-slate-100 text-center">
                    <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">System Output Sheet</span>
                  </div>
                </div>

              </motion.div>
            ) : (
              /* SECTION FINALE */
              <motion.div
                key="finale"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8 }}
                className="w-full max-w-4xl mx-auto rounded-[2.5rem] bg-slate-900 text-white p-8 sm:p-12 md:p-16 border border-slate-800 shadow-2xl relative overflow-hidden text-center"
              >
                
                {/* Background flow effects */}
                <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-brand-teal/10 rounded-full blur-[100px] pointer-events-none -z-10"></div>
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-brand-sky/10 rounded-full blur-[100px] pointer-events-none -z-10"></div>

                <div className="space-y-10 max-w-2xl mx-auto relative z-10">
                  <div className="space-y-6">
                    <motion.h3 
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, delay: 0.2 }}
                      className="text-2xl sm:text-3xl font-black text-brand-sky tracking-tight uppercase"
                    >
                      NexEagle AI Doesn't Sit Beside Your Workflow.
                    </motion.h3>

                    <motion.h2 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.8, delay: 1.4, ease: "easeOut" }}
                      className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight text-transparent bg-clip-text bg-gradient-to-r from-brand-teal via-brand-sky to-indigo-400"
                    >
                      It Works Inside Your Workflow.
                    </motion.h2>
                  </div>

                  {/* Staggered features lines */}
                  <div className="grid grid-cols-2 gap-4 max-w-md mx-auto pt-4 text-left font-mono text-xs sm:text-sm text-slate-300">
                    {[
                      "Across Every Consultation.",
                      "Every Report.",
                      "Every Decision.",
                      "Every Patient Journey."
                    ].map((text, sIdx) => (
                      <motion.div
                        key={sIdx}
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 2.4 + sIdx * 0.4 }}
                        className="flex items-center gap-2"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-brand-teal" />
                        <span>{text}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA Buttons */}
                  <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 4.2 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6"
                  >
                    <Link 
                      to="/contact"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-950 font-bold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-0.5"
                    >
                      <span>See NexEagle AI In Action</span>
                      <ArrowRight className="w-5 h-5 text-slate-950 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <button 
                      onClick={handleRestart}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm sm:text-base border border-slate-700 transition-all duration-300 hover:-translate-y-0.5 group"
                    >
                      <RotateCcw className="w-4 h-4 text-slate-400 group-hover:rotate-45 transition-transform" />
                      <span>Explore AI-Powered Workflows</span>
                    </button>
                  </motion.div>

                </div>

              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Bottom Autoplay Status Cue */}
        {currentIdx < 5 && isPaused && (
          <div className="flex justify-center mt-8 text-xs text-slate-400 font-semibold items-center gap-1.5">
            <button 
              onClick={handleRestart}
              className="inline-flex items-center gap-1.5 text-brand-teal hover:text-brand-teal/80 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Autoplay Paused (Restart Cycle)
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

export default WatchNexEagleAIWork;
