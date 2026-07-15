"use client";

import React, { useState, useEffect } from "react";
import { 
  Stethoscope, Bed, FlaskConical, Receipt, Activity, CheckCircle2, ChevronRight, Play, RotateCcw
} from "lucide-react";
import { cn } from "@/lib/utils";

// Custom type for lucide-react icons
type LucideIconType = React.ComponentType<{ className?: string }>;

interface Step {
  id: number;
  title: string;
  desc: string;
  activeNodes: string[]; // Nodes highlighted in this step
  flowPaths: number[]; // Index of SVG paths that should show active pulse
  details: {
    action: string;
    impact: string;
    modulesUsed: string[];
  };
}

const steps: Step[] = [
  {
    id: 1,
    title: "1. Patient Check-In & OPD Consult",
    desc: "Patient walks into OPD. Token is called, EMR created via AI Voice Scribe in 1HMS Core.",
    activeNodes: ["opd", "hub"],
    flowPaths: [0], // OPD -> Hub
    details: {
      action: "OPD Check-in & AI Prescription drafting",
      impact: "Token generated instantly. Doctor dictation auto-fills clinical notes.",
      modulesUsed: ["OPD Queue", "EMR Portal", "NexEagle AI Scribe"]
    }
  },
  {
    id: 2,
    title: "2. Integrated Lab Orders (1Lab)",
    desc: "Doctor orders diagnostic tests. Sample is registered and analyzed in 1Lab, reports auto-publish back to 1HMS Core.",
    activeNodes: ["hub", "lab"],
    flowPaths: [1], // Hub <-> Lab
    details: {
      action: "Lab request routing & automated result sync",
      impact: "Zero paperwork. Lab reports publish directly into the patient's EMR timeline.",
      modulesUsed: ["1Lab Management", "Barcoding", "Result Dispatcher"]
    }
  },
  {
    id: 3,
    title: "3. Integrated Radiology Scans (1Rad)",
    desc: "Radiology scan (X-Ray/CT) ordered. Images load instantly in 1Rad DICOM viewer and link back to 1HMS EMR.",
    activeNodes: ["hub", "rad"],
    flowPaths: [2], // Hub <-> Rad
    details: {
      action: "Radiology scan routing & cloud PACS syncing",
      impact: "Zero-footprint web viewer loads DICOM images in 1 click inside the consult cabin.",
      modulesUsed: ["1Rad Cloud PACS", "DICOM Viewer", "AI Scan Sweeper"]
    }
  },
  {
    id: 4,
    title: "4. Ward Admission & Care (IPD)",
    desc: "Patient admitted to Ward or ICU. Bed occupancy updated, nursing round notes log directly in EMR.",
    activeNodes: ["hub", "ipd"],
    flowPaths: [3], // Hub -> IPD
    details: {
      action: "Ward bed allocation & inpatient vitals logging",
      impact: "Real-time floor occupancy maps. Automated checklists ensure NABH compliance.",
      modulesUsed: ["IPD Allocation", "OT Management", "Nursing Checklists"]
    }
  },
  {
    id: 5,
    title: "5. Auto-Billing & Settlement",
    desc: "All OPD, IPD, Pharmacy, and Lab charges compile. Claim sent to TPA gateway, auto-bill cleared.",
    activeNodes: ["ipd", "billing", "hub"],
    flowPaths: [4, 3], // IPD -> Hub -> Billing
    details: {
      action: "Unified ledger compilation & TPA Claim verification",
      impact: "One-click bill generation. Pre-authorizations processed in minutes via NHCX integration.",
      modulesUsed: ["Auto-Billing Ledger", "NHCX Insurance Gateway", "Discharge Planner"]
    }
  }
];

const HMSWorkflowAnimation = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play steps
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setActiveStep(prev => (prev % steps.length) + 1);
      }, 4500);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleStepClick = (stepId: number) => {
    setActiveStep(stepId);
    setIsAutoPlaying(false);
    // Resume autoplay after 12 seconds of no clicks
    setTimeout(() => {
      setIsAutoPlaying(true);
    }, 12000);
  };

  const activeStepData = steps[activeStep - 1];

  // Helper to check if a node is active in the current step
  const isNodeActive = (nodeId: string) => {
    return activeStepData.activeNodes.includes(nodeId);
  };

  // Helper to check if a path is active in the current step
  const isPathActive = (pathIdx: number) => {
    return activeStepData.flowPaths.includes(pathIdx);
  };

  // Node position coordinates for SVG
  const coordinates = {
    hub: { x: 300, y: 170 },
    billing: { x: 300, y: 55 },
    opd: { x: 120, y: 112 },
    lab: { x: 480, y: 112 },
    rad: { x: 480, y: 228 },
    ipd: { x: 120, y: 228 }
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-6 font-sans relative">
      <style>{`
        @keyframes pulse-flow {
          0% {
            stroke-dashoffset: 60;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
        .animate-flow-dash {
          stroke-dasharray: 8 12;
          animation: pulse-flow 1.5s linear infinite;
        }
      `}</style>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Side: SVG Interactive Diagram (7 columns) */}
        <div className="lg:col-span-7 bg-white/70 backdrop-blur-md rounded-3xl border border-slate-200/80 shadow-lg p-6 flex flex-col justify-center relative select-none h-[420px]">
          <div className="absolute top-4 left-6 flex items-center gap-2">
            <span className={cn("w-2 h-2 rounded-full", isAutoPlaying ? "bg-emerald-500 animate-pulse" : "bg-amber-500")} />
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              {isAutoPlaying ? "Autoplay Mode Active" : "Interactive Mode"}
            </span>
          </div>

          <svg className="w-full h-full min-h-[300px]" viewBox="0 0 600 340">
            {/* SVG Connecting Paths */}
            
            {/* Path 0: OPD <-> Hub */}
            <line 
              x1={coordinates.opd.x} y1={coordinates.opd.y} 
              x2={coordinates.hub.x} y2={coordinates.hub.y} 
              className={cn("stroke-2 transition-all duration-500", isPathActive(0) ? "stroke-brand-teal/30" : "stroke-slate-200")} 
            />
            {isPathActive(0) && (
              <line 
                x1={coordinates.opd.x} y1={coordinates.opd.y} 
                x2={coordinates.hub.x} y2={coordinates.hub.y} 
                className="stroke-brand-teal stroke-[3px] animate-flow-dash" 
              />
            )}

            {/* Path 1: Lab <-> Hub */}
            <line 
              x1={coordinates.hub.x} y1={coordinates.hub.y} 
              x2={coordinates.lab.x} y2={coordinates.lab.y} 
              className={cn("stroke-2 transition-all duration-500", isPathActive(1) ? "stroke-brand-iris/30" : "stroke-slate-200")} 
            />
            {isPathActive(1) && (
              <line 
                x1={coordinates.hub.x} y1={coordinates.hub.y} 
                x2={coordinates.lab.x} y2={coordinates.lab.y} 
                className="stroke-brand-iris stroke-[3px] animate-flow-dash" 
              />
            )}

            {/* Path 2: Rad <-> Hub */}
            <line 
              x1={coordinates.hub.x} y1={coordinates.hub.y} 
              x2={coordinates.rad.x} y2={coordinates.rad.y} 
              className={cn("stroke-2 transition-all duration-500", isPathActive(2) ? "stroke-brand-sky/30" : "stroke-slate-200")} 
            />
            {isPathActive(2) && (
              <line 
                x1={coordinates.hub.x} y1={coordinates.hub.y} 
                x2={coordinates.rad.x} y2={coordinates.rad.y} 
                className="stroke-brand-sky stroke-[3px] animate-flow-dash" 
              />
            )}

            {/* Path 3: IPD <-> Hub */}
            <line 
              x1={coordinates.ipd.x} y1={coordinates.ipd.y} 
              x2={coordinates.hub.x} y2={coordinates.hub.y} 
              className={cn("stroke-2 transition-all duration-500", isPathActive(3) ? "stroke-brand-teal/30" : "stroke-slate-200")} 
            />
            {isPathActive(3) && (
              <line 
                x1={coordinates.ipd.x} y1={coordinates.ipd.y} 
                x2={coordinates.hub.x} y2={coordinates.hub.y} 
                className="stroke-brand-teal stroke-[3px] animate-flow-dash" 
              />
            )}

            {/* Path 4: Billing <-> Hub */}
            <line 
              x1={coordinates.hub.x} y1={coordinates.hub.y} 
              x2={coordinates.billing.x} y2={coordinates.billing.y} 
              className={cn("stroke-2 transition-all duration-500", isPathActive(4) ? "stroke-brand-sky/30" : "stroke-slate-200")} 
            />
            {isPathActive(4) && (
              <line 
                x1={coordinates.hub.x} y1={coordinates.hub.y} 
                x2={coordinates.billing.x} y2={coordinates.billing.y} 
                className="stroke-brand-sky stroke-[3px] animate-flow-dash" 
              />
            )}

            {/* SVG Interactive Nodes Group */}

            {/* Central Node: 1HMS Core */}
            <g id="hms-hub-node" className="cursor-pointer group" onClick={() => handleStepClick(1)}>
              <circle 
                cx={coordinates.hub.x} cy={coordinates.hub.y} r="38" 
                className={cn("transition-all duration-500 shadow-md", 
                  isNodeActive("hub") 
                    ? "fill-brand-teal stroke-brand-teal/35 stroke-[8px] scale-105" 
                    : "fill-white stroke-slate-250 stroke-2 hover:stroke-slate-350"
                )}
              />
              <text 
                x={coordinates.hub.x} y={coordinates.hub.y - 2.5} 
                className={cn("text-[9px] font-black text-center font-sans tracking-wide", isNodeActive("hub") ? "fill-white" : "fill-slate-700")}
                textAnchor="middle"
              >
                1HMS
              </text>
              <text 
                x={coordinates.hub.x} y={coordinates.hub.y + 9.5} 
                className={cn("text-[8px] text-center font-sans font-bold opacity-75", isNodeActive("hub") ? "fill-white" : "fill-slate-400")}
                textAnchor="middle"
              >
                CORE HUB
              </text>
            </g>

            {/* Spoke 1: OPD Node */}
            <g id="hms-opd-node" className="cursor-pointer" onClick={() => handleStepClick(1)}>
              <circle 
                cx={coordinates.opd.x} cy={coordinates.opd.y} r="28" 
                className={cn("transition-all duration-500", 
                  isNodeActive("opd") 
                    ? "fill-white stroke-brand-teal stroke-[3px] shadow-[0_0_15px_rgba(20,184,166,0.25)]" 
                    : "fill-white stroke-slate-200 stroke-2 hover:border-slate-300"
                )}
              />
              <foreignObject 
                x={coordinates.opd.x - 12} y={coordinates.opd.y - 12} width="24" height="24"
              >
                <div className={cn("w-full h-full flex items-center justify-center transition-colors", isNodeActive("opd") ? "text-brand-teal" : "text-slate-400")}>
                  <Stethoscope className="w-5 h-5" />
                </div>
              </foreignObject>
              <text x={coordinates.opd.x} y={coordinates.opd.y + 40} className="text-[10px] font-bold fill-slate-700 font-sans" textAnchor="middle">
                OPD Management
              </text>
            </g>

            {/* Spoke 2: 1Lab Node */}
            <g id="hms-lab-node" className="cursor-pointer" onClick={() => handleStepClick(2)}>
              <circle 
                cx={coordinates.lab.x} cy={coordinates.lab.y} r="28" 
                className={cn("transition-all duration-500", 
                  isNodeActive("lab") 
                    ? "fill-white stroke-brand-iris stroke-[3px] shadow-[0_0_15px_rgba(129,140,248,0.25)]" 
                    : "fill-white stroke-slate-200 stroke-2 hover:border-slate-300"
                )}
              />
              <foreignObject 
                x={coordinates.lab.x - 12} y={coordinates.lab.y - 12} width="24" height="24"
              >
                <div className={cn("w-full h-full flex items-center justify-center transition-colors", isNodeActive("lab") ? "text-brand-iris" : "text-slate-400")}>
                  <FlaskConical className="w-5 h-5" />
                </div>
              </foreignObject>
              <text x={coordinates.lab.x} y={coordinates.lab.y + 40} className="text-[10px] font-bold fill-slate-700 font-sans" textAnchor="middle">
                1Lab Diagnostics
              </text>
            </g>

            {/* Spoke 3: 1Rad Node */}
            <g id="hms-rad-node" className="cursor-pointer" onClick={() => handleStepClick(3)}>
              <circle 
                cx={coordinates.rad.x} cy={coordinates.rad.y} r="28" 
                className={cn("transition-all duration-500", 
                  isNodeActive("rad") 
                    ? "fill-white stroke-brand-sky stroke-[3px] shadow-[0_0_15px_rgba(56,189,248,0.25)]" 
                    : "fill-white stroke-slate-200 stroke-2 hover:border-slate-300"
                )}
              />
              <foreignObject 
                x={coordinates.rad.x - 12} y={coordinates.rad.y - 12} width="24" height="24"
              >
                <div className={cn("w-full h-full flex items-center justify-center transition-colors", isNodeActive("rad") ? "text-brand-sky" : "text-slate-400")}>
                  <Activity className="w-5 h-5" />
                </div>
              </foreignObject>
              <text x={coordinates.rad.x} y={coordinates.rad.y + 40} className="text-[10px] font-bold fill-slate-700 font-sans" textAnchor="middle">
                1Rad PACS Scans
              </text>
            </g>

            {/* Spoke 4: IPD Node */}
            <g id="hms-ipd-node" className="cursor-pointer" onClick={() => handleStepClick(4)}>
              <circle 
                cx={coordinates.ipd.x} cy={coordinates.ipd.y} r="28" 
                className={cn("transition-all duration-500", 
                  isNodeActive("ipd") 
                    ? "fill-white stroke-brand-teal stroke-[3px] shadow-[0_0_15px_rgba(20,184,166,0.25)]" 
                    : "fill-white stroke-slate-200 stroke-2 hover:border-slate-300"
                )}
              />
              <foreignObject 
                x={coordinates.ipd.x - 12} y={coordinates.ipd.y - 12} width="24" height="24"
              >
                <div className={cn("w-full h-full flex items-center justify-center transition-colors", isNodeActive("ipd") ? "text-brand-teal" : "text-slate-400")}>
                  <Bed className="w-5 h-5" />
                </div>
              </foreignObject>
              <text x={coordinates.ipd.x} y={coordinates.ipd.y + 40} className="text-[10px] font-bold fill-slate-700 font-sans" textAnchor="middle">
                IPD & Wards
              </text>
            </g>

            {/* Spoke 5: Billing Node */}
            <g id="hms-billing-node" className="cursor-pointer" onClick={() => handleStepClick(5)}>
              <circle 
                cx={coordinates.billing.x} cy={coordinates.billing.y} r="28" 
                className={cn("transition-all duration-500", 
                  isNodeActive("billing") 
                    ? "fill-white stroke-brand-sky stroke-[3px] shadow-[0_0_15px_rgba(56,189,248,0.25)]" 
                    : "fill-white stroke-slate-200 stroke-2 hover:border-slate-300"
                )}
              />
              <foreignObject 
                x={coordinates.billing.x - 12} y={coordinates.billing.y - 12} width="24" height="24"
              >
                <div className={cn("w-full h-full flex items-center justify-center transition-colors", isNodeActive("billing") ? "text-brand-sky" : "text-slate-400")}>
                  <Receipt className="w-5 h-5" />
                </div>
              </foreignObject>
              <text x={coordinates.billing.x} y={coordinates.billing.y - 38} className="text-[10px] font-bold fill-slate-700 font-sans" textAnchor="middle">
                Auto-Billing
              </text>
            </g>
          </svg>
        </div>

        {/* Right Side: Step Controller & Action Logs (5 columns) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex flex-col gap-2">
            {steps.map(step => (
              <button
                key={step.id}
                id={`hms-flow-step-${step.id}`}
                onClick={() => handleStepClick(step.id)}
                className={cn(
                  "w-full text-left p-3.5 rounded-xl border transition-all duration-300 flex items-center justify-between shadow-xs",
                  step.id === activeStep
                    ? "bg-white border-brand-teal shadow-[0_4px_15px_rgba(20,184,166,0.08)] scale-[1.02]"
                    : "bg-white/60 border-slate-200/80 text-slate-500 hover:bg-white hover:text-slate-700"
                )}
              >
                <span className="text-xs font-bold font-sans truncate">{step.title}</span>
                <ChevronRight className={cn("w-4 h-4 transition-transform", step.id === activeStep ? "text-brand-teal translate-x-1" : "text-slate-300")} />
              </button>
            ))}
          </div>

          {/* Active Step Details Sheet */}
          <div className="bg-white/90 border border-slate-200 shadow-md rounded-2xl p-5 space-y-3.5 min-h-[170px] animate-[fadeIn_0.3s_ease-out]">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <span className="text-[9px] uppercase font-black text-brand-teal tracking-widest bg-brand-teal/5 px-2.5 py-0.5 rounded-full">
                Workflow Action
              </span>
              <span className="text-[10px] text-slate-400 font-bold uppercase font-mono">Step {activeStep} / 5</span>
            </div>
            
            <p className="text-xs text-slate-700 font-medium leading-relaxed">
              {activeStepData.desc}
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2 text-[10px] border-t border-slate-100">
              <div>
                <span className="text-slate-400 font-semibold block">Key Integration:</span>
                <span className="text-slate-800 font-bold block mt-0.5 truncate">{activeStepData.details.action}</span>
              </div>
              <div>
                <span className="text-slate-400 font-semibold block">Impact Result:</span>
                <span className="text-slate-800 font-bold block mt-0.5">{activeStepData.details.impact}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1.5">
              {activeStepData.details.modulesUsed.map((modName, mIdx) => (
                <span key={mIdx} className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[9px] font-semibold border border-slate-200/50">
                  {modName}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HMSWorkflowAnimation;
