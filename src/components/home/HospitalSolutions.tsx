import React, { useState, useEffect, useRef } from "react";
import { 
  Mic, Users, Bed, Stethoscope, Pill, FlaskConical, Receipt, LayoutDashboard,
  Play, RotateCcw, CheckCircle2, Activity, TrendingUp, AlertTriangle, Shield,
  Loader2
} from "lucide-react";

const HospitalSolutions = () => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoPlayTimer = useRef<NodeJS.Timeout | null>(null);

  // Feature Playgrounds States
  
  // 1. AI Voice Scribe State
  const [scribeState, setScribeState] = useState<"idle" | "listening" | "compiling" | "ready">("idle");
  const [scribeText, setScribeText] = useState("");
  const scribeSpeechSteps = [
    "Listening... Doctor dictating...",
    "Doctor: Patient is Rahul Sharma, 42 years old male.",
    "Doctor: High fever for three days, dry throat and cough.",
    "Doctor: Prescribe Paracetamol 650mg TDS after meals.",
    "Doctor: Also advise Amoxicillin 500mg BD for five days.",
    "NexEagle AI: Transcribing & structuring EMR..."
  ];

  // 2. Patient 360° State
  const [patientTab, setPatientTab] = useState<"vitals" | "labs" | "meds">("vitals");
  const [heartRate, setHeartRate] = useState(72);

  // 3. IPD Bed Allocation State
  const [beds, setBeds] = useState([
    { id: "B-101", room: "Ward 1A", occupied: true, patient: "Anil Kumar" },
    { id: "B-102", room: "Ward 1A", occupied: false, patient: "" },
    { id: "B-103", room: "Ward 1A", occupied: true, patient: "Sunita Roy" },
    { id: "B-104", room: "Ward 1B", occupied: false, patient: "" },
    { id: "Deluxe-201", room: "Private Deluxe", occupied: true, patient: "Meera Sen" },
    { id: "Deluxe-202", room: "Private Deluxe", occupied: false, patient: "" },
    { id: "ICU-301", room: "ICU Floor 3", occupied: true, patient: "Rajesh Gupta" },
    { id: "ICU-302", room: "ICU Floor 3", occupied: false, patient: "" }
  ]);
  const [ipdAlert, setIpdAlert] = useState("");

  // 4. OPD Queue State
  const [opdToken, setOpdToken] = useState(24);
  const [opdQueue, setOpdQueue] = useState([
    { token: 25, patient: "Vikram Rathore", status: "Waiting" },
    { token: 26, patient: "Priya Das", status: "Waiting" },
    { token: 27, patient: "Amit Singhal", status: "Waiting" }
  ]);
  const [opdCallLog, setOpdCallLog] = useState("Patient #24 in Cabin");

  // 5. Pharmacy stock state
  const [amoxStock, setAmoxStock] = useState(85);
  const [isAutoPoTriggered, setIsAutoPoTriggered] = useState(false);

  // 6. Lab scanner state
  const [scanState, setScanState] = useState<"idle" | "scanning" | "done">("idle");
  const [labState, setLabState] = useState<"idle" | "processing" | "ready">("idle");

  // 7. Billing claim state
  const [billingType, setBillingType] = useState<"opd" | "ipd" | "others">("opd");
  const [claimStatus, setClaimStatus] = useState<"draft" | "processing" | "approved">("draft");

  // 8. Analytics Chart metric
  const [analyticsMetric, setAnalyticsMetric] = useState<"patients" | "revenue" | "wait">("revenue");

  // Simulations Functions
  const runVoiceSimulation = () => {
    setScribeState("listening");
    setScribeText("");
    
    let step = 0;
    const interval = setInterval(() => {
      if (step < scribeSpeechSteps.length) {
        setScribeText(scribeSpeechSteps[step]);
        if (step === 5) {
          setScribeState("compiling");
        }
        step++;
      } else {
        clearInterval(interval);
        setScribeState("ready");
      }
    }, 1200);
  };

  const handleBedClick = (id: string) => {
    setBeds(prev => prev.map(bed => {
      if (bed.id === id) {
        const nextOccupied = !bed.occupied;
        const patientName = nextOccupied ? "Arun Sharma (Simulated)" : "";
        setIpdAlert(`${id} state changed: ${nextOccupied ? "Admitted " + patientName : "Discharged"}`);
        return { ...bed, occupied: nextOccupied, patient: patientName };
      }
      return bed;
    }));
  };

  const callNextOPD = () => {
    if (opdQueue.length > 0) {
      const nextPat = opdQueue[0];
      setOpdToken(nextPat.token);
      setOpdCallLog(`Token #${nextPat.token} (${nextPat.patient}) Called to Cabin 1`);
      setOpdQueue(prev => {
        const newQueue = prev.slice(1);
        const randomNames = ["Rohan Roy", "Kiran Devi", "Deepak Verma", "Jaspreet Singh"];
        const nextRandomToken = prev[prev.length - 1].token + 1;
        const newPatient = {
          token: nextRandomToken,
          patient: randomNames[Math.floor(Math.random() * randomNames.length)],
          status: "Waiting"
        };
        return [...newQueue, newPatient];
      });
    }
  };

  const runDICOMScan = () => {
    setScanState("scanning");
    setTimeout(() => {
      setScanState("done");
    }, 2500);
  };

  const runLabTest = () => {
    setLabState("processing");
    setTimeout(() => {
      setLabState("ready");
    }, 2000);
  };

  const runInsuranceClaim = () => {
    setClaimStatus("processing");
    setTimeout(() => {
      setClaimStatus("approved");
    }, 2000);
  };

  // 1HMS Features Definition Array (Declared before useEffect hooks reference it)
  const features = [
    {
      id: "voice",
      icon: <Mic className="w-5 h-5" />,
      title: "AI Voice Scribe",
      shortTitle: "AI Voice",
      desc: "Convert doctor-patient conversations to structured prescriptions instantly. Supports 10+ Indian languages.",
      color: "text-brand-teal",
      bg: "bg-brand-teal/10",
      benefits: [
        "Eliminates 90% of paperwork for clinicians",
        "Supports multi-lingual dictation and medical shorthand",
        "Directly updates patient history and inventory stocks"
      ],
      preview: (
        <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-5 h-full flex flex-col justify-between font-sans text-xs text-slate-700 relative overflow-hidden select-none shadow-sm animate-[fadeIn_0.3s_ease-out]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-teal/5 rounded-full blur-[40px] pointer-events-none"></div>
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${scribeState === "listening" ? "bg-red-500 animate-ping" : "bg-brand-teal"}`} />
              <span className="text-slate-900 font-bold">NexEagle AI Voice Scribe</span>
            </div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Module 1.0</span>
          </div>

          <div className="my-5 flex-1 flex flex-col justify-center min-h-[160px] space-y-4">
            {scribeState === "idle" && (
              <div className="text-center py-6 space-y-3">
                <p className="text-slate-500 text-sm">Experience real-time AI transcription</p>
                <button 
                  onClick={runVoiceSimulation}
                  className="px-5 py-2.5 bg-brand-teal text-white rounded-full text-xs font-bold hover:bg-brand-teal/90 transition-colors flex items-center gap-2 mx-auto shadow-md shadow-brand-teal/20"
                >
                  <Play className="w-3.5 h-3.5 fill-current" /> Simulate Dictation
                </button>
              </div>
            )}

            {(scribeState === "listening" || scribeState === "compiling") && (
              <div className="space-y-4">
                <div className="bg-white p-3.5 rounded-xl border border-slate-200 flex items-center justify-between shadow-xs">
                  <span className="text-slate-600 font-mono text-[11px] leading-relaxed">{scribeText}</span>
                  {scribeState === "listening" && (
                    <div className="flex gap-1 items-end h-4 pb-0.5 shrink-0">
                      <span className="w-1 bg-red-400 animate-[float_1s_infinite_alternate]" style={{ height: "40%" }} />
                      <span className="w-1 bg-red-400 animate-[float_0.8s_infinite_alternate]" style={{ height: "80%" }} />
                      <span className="w-1 bg-red-400 animate-[float_1.2s_infinite_alternate]" style={{ height: "50%" }} />
                      <span className="w-1 bg-red-400 animate-[float_0.9s_infinite_alternate]" style={{ height: "90%" }} />
                    </div>
                  )}
                </div>
                <p className="text-[10px] text-slate-400 text-center animate-pulse">AI is parsing medical descriptors...</p>
              </div>
            )}

            {scribeState === "ready" && (
              <div className="space-y-3 animate-[fadeIn_0.4s_ease-out_forwards]">
                <div className="bg-emerald-50 p-2.5 rounded-lg border border-emerald-100 text-[10px] text-emerald-700 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                  <span>EMR parsed & auto-linked with Pharmacy inventory.</span>
                </div>
                <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-2 shadow-xs">
                  <div className="flex justify-between border-b border-slate-100 pb-1 text-[9px] text-slate-400 font-bold uppercase">
                    <span>Rx Medication</span>
                    <span>Dosage</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-800 font-medium">
                    <span>Paracetamol 650mg</span>
                    <span>TDS (After Meal)</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-800 font-medium">
                    <span>Amoxicillin 500mg</span>
                    <span>BD (5 Days)</span>
                  </div>
                </div>
                <button 
                  onClick={() => setScribeState("idle")}
                  className="text-slate-400 hover:text-slate-600 transition-colors text-[10px] font-bold flex items-center gap-1 mx-auto font-sans"
                >
                  <RotateCcw className="w-3 h-3" /> Reset Demo
                </button>
              </div>
            )}
          </div>
          
          <div className="text-[9px] text-brand-teal font-bold text-center border-t border-slate-200/80 pt-2.5">
            100% SECURE • HIPAA COMPLIANT DIGITAL EMR
          </div>
        </div>
      )
    },
    {
      id: "patient",
      icon: <Users className="w-5 h-5" />,
      title: "Patient 360° View",
      shortTitle: "Patient 360°",
      desc: "Complete patient history, vitals, medications, and treatment plans in one unified dashboard.",
      color: "text-brand-sky",
      bg: "bg-brand-sky/10",
      accentHex: "#38bdf8",
      benefits: [
        "Visual timeline of all previous clinical encounters",
        "Real-time vitals integration from ICU and wards",
        "Unified records for cross-department doctor reference"
      ],
      preview: (
        <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-5 h-full flex flex-col justify-between font-sans text-xs text-slate-700 relative select-none shadow-sm animate-[fadeIn_0.3s_ease-out]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-sky/5 rounded-full blur-[40px] pointer-events-none"></div>
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-brand-sky" />
              <span className="text-slate-900 font-bold">Unified Patient Portal</span>
            </div>
            <span className="text-[10px] bg-brand-sky/20 text-brand-sky px-2 py-0.5 rounded font-bold">UID: #4208</span>
          </div>

          <div className="flex gap-2 my-3">
            {(["vitals", "labs", "meds"] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setPatientTab(tab)}
                className={`flex-1 py-1 rounded-lg border text-[10px] font-bold uppercase transition-all duration-355 ${
                  patientTab === tab 
                    ? "bg-brand-sky text-slate-950 border-brand-sky" 
                    : "bg-white border-slate-200 text-slate-500 hover:text-slate-800"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex-1 flex flex-col justify-center min-h-[140px]">
            {patientTab === "vitals" && (
              <div className="space-y-3 py-1 animate-[fadeIn_0.3s_ease-out_forwards]">
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200 text-center shadow-xs">
                    <span className="text-[9px] text-slate-400 font-semibold block">Heart Rate</span>
                    <p className="text-emerald-600 text-base font-black mt-1 flex items-center justify-center gap-0.5">
                      <Activity className="w-3.5 h-3.5 animate-pulse" /> {heartRate}
                    </p>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200 text-center shadow-xs">
                    <span className="text-[9px] text-slate-400 font-semibold block">Blood Press</span>
                    <p className="text-slate-800 text-base font-black mt-1">120/80</p>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200 text-center shadow-xs">
                    <span className="text-[9px] text-slate-400 font-semibold block">SpO2</span>
                    <p className="text-slate-800 text-base font-black mt-1">98%</p>
                  </div>
                </div>
                <div className="h-10 bg-white rounded-lg border border-slate-200 overflow-hidden relative shadow-xs">
                  <svg className="w-full h-full stroke-brand-sky stroke-2 fill-none" viewBox="0 0 100 20">
                    <path d="M 0 10 L 20 10 L 25 2 L 30 18 L 35 10 L 55 10 L 60 2 L 65 18 L 70 10 L 100 10" />
                  </svg>
                </div>
              </div>
            )}

            {patientTab === "labs" && (
              <div className="space-y-2 py-1 animate-[fadeIn_0.3s_ease-out_forwards] text-[10px]">
                <div className="bg-white p-2 rounded-lg border border-slate-200 flex justify-between shadow-xs">
                  <span className="text-slate-500">HbA1c (Diabetes)</span>
                  <span className="text-amber-600 font-bold">6.2% (Pre-diabetic)</span>
                </div>
                <div className="bg-white p-2 rounded-lg border border-slate-200 flex justify-between shadow-xs">
                  <span className="text-slate-500">Total Cholesterol</span>
                  <span className="text-emerald-600 font-bold">172 mg/dL (Normal)</span>
                </div>
                <div className="bg-white p-2 rounded-lg border border-slate-200 flex justify-between shadow-xs">
                  <span className="text-slate-500">CBC Panel</span>
                  <span className="text-emerald-600 font-bold">Delivered</span>
                </div>
              </div>
            )}

            {patientTab === "meds" && (
              <div className="space-y-2 py-1 animate-[fadeIn_0.3s_ease-out_forwards] text-[10px]">
                <div className="bg-white p-2 rounded border border-slate-200 flex justify-between text-slate-800 font-medium shadow-xs">
                  <span>Tab. Telmisartan 40mg</span>
                  <span className="text-slate-400">1 OD (Morning)</span>
                </div>
                <div className="bg-white p-2 rounded border border-slate-200 flex justify-between text-slate-800 font-medium shadow-xs">
                  <span>Tab. Metformin 500mg</span>
                  <span className="text-slate-400">1 BD (After Meal)</span>
                </div>
              </div>
            )}
          </div>

          <div className="text-[9px] text-slate-400 text-center border-t border-slate-200/80 pt-2.5">
            PATIENT PORTAL • SYNCED WITH NABH EHR TIMELINE
          </div>
        </div>
      )
    },
    {
      id: "ipd",
      icon: <Bed className="w-5 h-5" />,
      title: "IPD & Ward Management",
      shortTitle: "IPD & Ward",
      desc: "Real-time bed occupancy, room allocation, nursing notes, and discharge planning automation.",
      color: "text-brand-iris",
      bg: "bg-brand-iris/10",
      accentHex: "#818cf8",
      benefits: [
        "Live occupancy map of all floors, wings, and ICU units",
        "One-click discharge automation and billing settlement",
        "Integrated nursing checklists and doctor round logging"
      ],
      preview: (
        <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-5 h-full flex flex-col justify-between font-sans text-xs text-slate-700 relative select-none shadow-sm animate-[fadeIn_0.3s_ease-out]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-iris/5 rounded-full blur-[40px] pointer-events-none"></div>
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <Bed className="w-4 h-4 text-brand-iris" />
              <span className="text-slate-900 font-bold">IPD Occupancy Map</span>
            </div>
            <span className="text-[10px] text-brand-iris font-bold">
              Occupied: {beds.filter(b => b.occupied).length}/8 Beds
            </span>
          </div>

          <div className="my-3">
            <p className="text-[9px] text-slate-400 text-center mb-2">Click any bed card to admit / discharge a patient</p>
            <div className="grid grid-cols-4 gap-2">
              {beds.map(bed => (
                <button
                  key={bed.id}
                  onClick={() => handleBedClick(bed.id)}
                  className={`p-2 rounded-lg border text-center transition-all shadow-xs ${
                    bed.occupied
                      ? "bg-rose-50 border-rose-200 text-rose-700 hover:bg-rose-100"
                      : "bg-emerald-50 border-emerald-250 text-emerald-700 hover:bg-emerald-100"
                  }`}
                >
                  <p className="text-[9px] font-bold">{bed.id}</p>
                  <span className="text-[8px] uppercase tracking-wider block font-bold mt-1">
                    {bed.occupied ? "Occup" : "Vacant"}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="h-9 flex items-center justify-center font-sans">
            {ipdAlert ? (
              <p className="text-[10px] text-brand-iris font-semibold animate-pulse">{ipdAlert}</p>
            ) : (
              <p className="text-[10px] text-slate-400">Interactive live admission logs</p>
            )}
          </div>

          <div className="text-[9px] text-slate-400 text-center border-t border-slate-200/80 pt-2">
            INTEGRATED WARD STATUS • NURSING DASHBOARD OVERVIEW
          </div>
        </div>
      )
    },
    {
      id: "opd",
      icon: <Stethoscope className="w-5 h-5" />,
      title: "OPD Management",
      shortTitle: "OPD Queue",
      desc: "Queue management, appointment scheduling, token generation, and consultation workflows.",
      color: "text-brand-teal",
      bg: "bg-brand-teal/10",
      accentHex: "#0ea5e9",
      benefits: [
        "Auto-generates token numbers for walking patients",
        "Synchronized digital displays in doctor cabins",
        "Directly calculates average wait-times per clinic department"
      ],
      preview: (
        <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-5 h-full flex flex-col justify-between font-sans text-xs text-slate-700 relative select-none shadow-sm animate-[fadeIn_0.3s_ease-out]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-teal/5 rounded-full blur-[40px] pointer-events-none"></div>
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-brand-teal" />
              <span className="text-slate-900 font-bold">OPD Live Queue Board</span>
            </div>
            <span className="text-[10px] text-slate-500">Cabin #1</span>
          </div>

          <div className="my-3 space-y-2.5">
            <div className="flex items-center justify-between bg-brand-teal/5 border border-brand-teal/20 p-2.5 rounded-xl shadow-xs">
              <div className="space-y-0.5">
                <span className="text-[8px] text-brand-teal uppercase font-bold tracking-wider">Current Doctor Cabin</span>
                <p className="text-slate-950 font-bold text-xs">Token #{opdToken}</p>
              </div>
              <span className="text-[9px] bg-brand-teal/20 text-brand-teal px-2 py-0.5 rounded font-black animate-pulse uppercase">Consulting</span>
            </div>

            <div className="space-y-1.5">
              <span className="text-[9px] text-slate-400 uppercase tracking-wider font-bold">Waitlist Queue</span>
              {opdQueue.slice(0, 2).map((item, index) => (
                <div key={index} className="flex justify-between items-center bg-white p-2 rounded-lg border border-slate-200 text-[10px] shadow-xs">
                  <span className="text-slate-700">Token #{item.token} - {item.patient}</span>
                  <span className="text-slate-400">Est. {6 + index * 8} mins</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-1 font-sans">
              <p className="text-[9px] text-emerald-600 font-semibold">{opdCallLog}</p>
              <button
                onClick={callNextOPD}
                className="px-3 py-1 bg-brand-teal text-white rounded-lg text-[9px] font-bold hover:bg-brand-teal/90 transition-colors shadow-xs"
              >
                Call Next Token
              </button>
            </div>
          </div>

          <div className="text-[9px] text-slate-400 text-center border-t border-slate-200/80 pt-2">
            PATIENT FLOW STABILIZATION • ZERO CLINIC WAIT PROTOCOL
          </div>
        </div>
      )
    },
    {
      id: "pharma",
      icon: <Pill className="w-5 h-5" />,
      title: "Pharmacy Integration",
      shortTitle: "Pharmacy",
      desc: "Inventory management, auto-reorder, GST billing, and direct prescription integration.",
      color: "text-brand-sky",
      bg: "bg-brand-sky/10",
      accentHex: "#38bdf8",
      benefits: [
        "Bridges clinic prescription directly to dispensing desk",
        "Tracks batches, expiries, and reorder levels automatically",
        "Saves pharmaceutical inventory overheads via JIT triggers"
      ],
      preview: (
        <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-5 h-full flex flex-col justify-between font-sans text-xs text-slate-700 relative select-none shadow-sm animate-[fadeIn_0.3s_ease-out]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-sky/5 rounded-full blur-[40px] pointer-events-none"></div>
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <Pill className="w-4 h-4 text-brand-sky" />
              <span className="text-slate-900 font-bold">Pharmacy Inventory</span>
            </div>
            <span className="text-[10px] text-slate-400">System PO Sync</span>
          </div>

          <div className="my-3 space-y-3 font-sans">
            <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-2 shadow-xs">
              <div className="flex justify-between items-center text-[10px] text-slate-550">
                <span>Active Drug: Amoxicillin 500mg</span>
                <span className={amoxStock <= 30 ? "text-rose-600 font-bold" : "text-emerald-600 font-bold"}>
                  Stock: {amoxStock} tabs
                </span>
              </div>
              
              <input
                type="range"
                min="0"
                max="150"
                value={amoxStock}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setAmoxStock(val);
                  if (val <= 30) {
                    setIsAutoPoTriggered(true);
                  } else {
                    setIsAutoPoTriggered(false);
                  }
                }}
                className="w-full accent-brand-sky bg-slate-200 rounded-lg appearance-none h-1.5 cursor-pointer"
              />
              <p className="text-[8px] text-slate-400 text-center">Slide to simulate dispensing stock drop</p>
            </div>

            <div className="h-10 flex items-center justify-center">
              {isAutoPoTriggered ? (
                <div className="w-full bg-rose-50 border border-rose-200 p-2 rounded-lg flex items-center gap-2 text-rose-700 text-[9px] animate-[fadeIn_0.3s_ease-out_forwards] shadow-xs">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0 animate-bounce text-rose-500" />
                  <span>Low Stock! Auto-PO sent to distributor for 500 units.</span>
                </div>
              ) : (
                <p className="text-[10px] text-slate-400">System keeps safety stocks at minimum buffer</p>
              )}
            </div>
          </div>

          <div className="text-[9px] text-slate-400 text-center border-t border-slate-200/80 pt-2">
            AUTONOMOUS PURCHASE ORDER GENERATION SYSTEM
          </div>
        </div>
      )
    },
    {
      id: "lab",
      icon: <FlaskConical className="w-5 h-5" />,
      title: "1Lab Diagnostics",
      shortTitle: "1Lab",
      desc: "Barcode-driven sample tracking, automated machine interfaces, secure reporting, and digital signatures.",
      color: "text-brand-iris",
      bg: "bg-brand-iris/10",
      accentHex: "#818cf8",
      benefits: [
        "Eliminates manual entry errors with bidirectional LIS interfacing",
        "Barcoded lab sample routing with real-time milestone validation",
        "Reports auto-dispatched directly to patients via SMS & WhatsApp"
      ],
      preview: (
        <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-5 h-full flex flex-col justify-between font-sans text-xs text-slate-700 relative select-none shadow-sm animate-[fadeIn_0.3s_ease-out]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-iris/5 rounded-full blur-[40px] pointer-events-none"></div>
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <FlaskConical className="w-4 h-4 text-brand-iris" />
              <span className="text-slate-900 font-bold">1Lab Laboratory Info System</span>
            </div>
            <span className="text-[10px] text-slate-400">LIS v2.0</span>
          </div>

          <div className="my-3 flex-1 flex flex-col justify-center min-h-[140px]">
            {labState === "idle" && (
              <div className="text-center py-4 space-y-3 font-sans">
                <div className="w-16 h-16 border border-dashed border-slate-300 rounded-xl flex items-center justify-center mx-auto text-slate-400 bg-white shadow-xs font-bold text-[10px]">
                  CBC / LFT
                </div>
                <button
                  onClick={runLabTest}
                  className="px-4 py-2 bg-brand-iris text-white rounded-lg text-[10px] font-bold hover:bg-brand-iris/90 transition-colors mx-auto shadow-xs"
                >
                  Analyze Blood Sample
                </button>
              </div>
            )}

            {labState === "processing" && (
              <div className="space-y-3 py-2 font-sans relative">
                <div className="w-20 h-20 bg-slate-900 rounded-xl border border-slate-800 mx-auto overflow-hidden relative shadow-md flex items-center justify-center">
                  <div className="w-full h-full opacity-35 bg-[radial-gradient(#818cf8_1px,transparent_1.5px)] bg-[size:6px_6px]" />
                  <Loader2 className="w-6 h-6 text-brand-iris animate-spin absolute" />
                </div>
                <p className="text-[10px] text-slate-400 text-center animate-pulse">Running machine interface analysis...</p>
              </div>
            )}

            {labState === "ready" && (
              <div className="space-y-2 py-1 animate-[fadeIn_0.3s_ease-out_forwards] font-sans">
                <div className="bg-emerald-50 border border-emerald-100 p-2 rounded-lg text-emerald-700 text-[10px] flex items-center gap-2 shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Sample processed. Results uploaded to EMR.</span>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-slate-200 font-mono text-[9px] space-y-1 shadow-xs">
                  <div className="flex justify-between"><span className="text-slate-400">Hemoglobin:</span><span className="text-slate-800 font-bold">14.2 g/dL (Normal)</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">WBC Count:</span><span className="text-slate-800 font-bold">6,500 /cumm</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Status:</span><span className="text-emerald-600 font-bold">Approved</span></div>
                </div>
                <button
                  onClick={() => setLabState("idle")}
                  className="text-[10px] text-slate-400 hover:text-slate-600 transition-colors block mx-auto pt-1 font-bold"
                >
                  Reset Test
                </button>
              </div>
            )}
          </div>

          <div className="text-[9px] text-slate-400 text-center border-t border-slate-200/80 pt-2">
            BIDIRECTIONAL LIS INTEGRATION
          </div>
        </div>
      )
    },
    {
      id: "radiology",
      icon: <Activity className="w-5 h-5" />,
      title: "1Rad Cloud PACS",
      shortTitle: "1Rad PACS",
      desc: "Ultra-fast zero-footprint web DICOM viewer, smart worklists, and secure reporting for modern radiology.",
      color: "text-brand-sky",
      bg: "bg-brand-sky/10",
      accentHex: "#38bdf8",
      benefits: [
        "FDA-approved web DICOM viewer works on any device and browser",
        "Unlimited cloud archiving with HIPAA-compliant file storage",
        "Direct EMR routing allows diagnostic access inside OPD consults"
      ],
      preview: (
        <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-5 h-full flex flex-col justify-between font-sans text-xs text-slate-700 relative select-none shadow-sm animate-[fadeIn_0.3s_ease-out]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-sky/5 rounded-full blur-[40px] pointer-events-none"></div>
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-brand-sky" />
              <span className="text-slate-900 font-bold">1Rad Cloud PACS Viewer</span>
            </div>
            <span className="text-[10px] text-slate-400">DICOM v3.0</span>
          </div>

          <div className="my-3 flex-1 flex flex-col justify-center min-h-[140px]">
            {scanState === "idle" && (
              <div className="text-center py-4 space-y-3 font-sans">
                <div className="w-16 h-16 border border-dashed border-slate-300 rounded-xl flex items-center justify-center mx-auto text-slate-400 bg-white shadow-xs font-bold text-[10px]">
                  CT / X-RAY
                </div>
                <button
                  onClick={runDICOMScan}
                  className="px-4 py-2 bg-brand-sky text-white rounded-lg text-[10px] font-bold hover:bg-brand-sky/90 transition-colors mx-auto shadow-xs"
                >
                  Analyze Chest X-Ray
                </button>
              </div>
            )}

            {scanState === "scanning" && (
              <div className="space-y-3 py-2 font-sans relative">
                <div className="w-20 h-20 bg-slate-900 rounded-xl border border-slate-800 mx-auto overflow-hidden relative shadow-md">
                  <div className="absolute inset-x-0 h-0.5 bg-brand-sky shadow-lg shadow-brand-sky/80 animate-[float_1.5s_infinite_alternate]" />
                  <div className="w-full h-full opacity-35 bg-[radial-gradient(#38bdf8_1px,transparent_1.5px)] bg-[size:6px_6px]" />
                </div>
                <p className="text-[10px] text-slate-400 text-center animate-pulse">Running AI diagnostic sweeps...</p>
              </div>
            )}

            {scanState === "done" && (
              <div className="space-y-2 py-1 animate-[fadeIn_0.3s_ease-out_forwards] font-sans">
                <div className="bg-emerald-50 border border-emerald-100 p-2 rounded-lg text-emerald-700 text-[10px] flex items-center gap-2 shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>PACS scanned. AI draft generated.</span>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-slate-200 font-mono text-[9px] space-y-1 shadow-xs">
                  <div className="flex justify-between"><span className="text-slate-400">Lungs:</span><span className="text-slate-800 font-bold">Clear (Infection 0%)</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Cardiomegaly:</span><span className="text-slate-800 font-bold">Negative</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">AI Confidence:</span><span className="text-brand-sky font-bold">99.8%</span></div>
                </div>
                <button
                  onClick={() => setScanState("done")}
                  className="text-[10px] text-slate-400 hover:text-slate-600 transition-colors block mx-auto pt-1 font-bold"
                >
                  Reset Scanner
                </button>
              </div>
            )}
          </div>

          <div className="text-[9px] text-slate-400 text-center border-t border-slate-200/80 pt-2">
            AI-DRIVEN CLOUD PACS IMAGING
          </div>
        </div>
      )
    },
    {
      id: "billing",
      icon: <Receipt className="w-5 h-5" />,
      title: "Billing & Revenue",
      shortTitle: "Billing",
      desc: "Insurance claims, payment tracking, TPA integration, and financial analytics.",
      color: "text-brand-teal",
      bg: "bg-brand-teal/10",
      accentHex: "#0ea5e9",
      benefits: [
        "Direct link to national health insurance claim portals",
        "Calculates TPA deductions and patients' copays live",
        "Full transparent ledgers for patients and audits"
      ],
      preview: (
        <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-5 h-full flex flex-col justify-between font-sans text-xs text-slate-700 relative select-none shadow-sm animate-[fadeIn_0.3s_ease-out]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-teal/5 rounded-full blur-[40px] pointer-events-none"></div>
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <Receipt className="w-4 h-4 text-brand-teal" />
              <span className="text-slate-900 font-bold">TPA & Claims Ledger</span>
            </div>
            <span className="text-[10px] text-slate-400">Bill ID: #829</span>
          </div>

          {/* Sub tabs for OPD, IPD, and Others billing detail */}
          <div className="flex gap-1.5 my-2">
            {(["opd", "ipd", "others"] as const).map(type => (
              <button
                key={type}
                onClick={() => {
                  setBillingType(type);
                  setClaimStatus("draft");
                }}
                className={`flex-1 py-1 rounded text-[8px] font-black uppercase transition-all duration-200 border ${
                  billingType === type
                    ? "bg-brand-teal text-white border-brand-teal shadow-xs"
                    : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
                }`}
              >
                {type === "others" ? "Others" : type + " Bill"}
              </button>
            ))}
          </div>

          <div className="flex-1 flex flex-col justify-center min-h-[115px]">
            {billingType === "opd" && (
              <div className="bg-white p-2 rounded-lg border border-slate-200 font-mono text-[9px] space-y-1 shadow-xs animate-[fadeIn_0.2s_ease-out]">
                <div className="flex justify-between text-slate-450"><span className="text-slate-400">OPD Consultation Fee:</span><span className="text-slate-800">₹600.00</span></div>
                <div className="flex justify-between text-slate-450"><span className="text-slate-400">ECG Diagnostic Test:</span><span className="text-slate-800">₹1,200.00</span></div>
                <div className="flex justify-between text-slate-450 pb-1 border-b border-slate-100"><span className="text-slate-400">Registration Fee:</span><span className="text-slate-800">₹100.00</span></div>
                <div className="flex justify-between pt-0.5 font-bold text-[10px]"><span className="text-slate-600">Gross Total:</span><span className="text-slate-900">₹1,900.00</span></div>
              </div>
            )}

            {billingType === "ipd" && (
              <div className="bg-white p-2 rounded-lg border border-slate-200 font-mono text-[9px] space-y-1 shadow-xs animate-[fadeIn_0.2s_ease-out]">
                <div className="flex justify-between text-slate-450"><span className="text-slate-400">Deluxe Room Rent (2D):</span><span className="text-slate-800">₹12,000.00</span></div>
                <div className="flex justify-between text-slate-450"><span className="text-slate-400">General Nursing Care:</span><span className="text-slate-800">₹2,500.00</span></div>
                <div className="flex justify-between text-slate-450 pb-1 border-b border-slate-100"><span className="text-slate-400">Surgeon & OT Charges:</span><span className="text-slate-800">₹45,000.00</span></div>
                <div className="flex justify-between pt-0.5 font-bold text-[10px]"><span className="text-slate-600">Gross Total:</span><span className="text-slate-900">₹59,500.00</span></div>
              </div>
            )}

            {billingType === "others" && (
              <div className="bg-white p-2 rounded-lg border border-slate-200 font-mono text-[9px] space-y-1 shadow-xs animate-[fadeIn_0.2s_ease-out]">
                <div className="flex justify-between text-slate-450"><span className="text-slate-400">Pharmacy Medication:</span><span className="text-slate-800">₹1,450.00</span></div>
                <div className="flex justify-between text-slate-450"><span className="text-slate-400">CBC Lab Panel:</span><span className="text-slate-800">₹450.00</span></div>
                <div className="flex justify-between text-slate-450 pb-1 border-b border-slate-100"><span className="text-slate-400">Chest X-Ray Scan:</span><span className="text-slate-800">₹1,200.00</span></div>
                <div className="flex justify-between pt-0.5 font-bold text-[10px]"><span className="text-slate-600">Gross Total:</span><span className="text-slate-900">₹3,100.00</span></div>
              </div>
            )}
          </div>

          <div className="h-9 flex items-center justify-center font-sans mt-1.5">
            {claimStatus === "draft" && (
              <button
                onClick={runInsuranceClaim}
                className="px-3.5 py-1.5 bg-brand-teal text-white rounded-lg text-[9px] font-bold hover:bg-brand-teal/90 transition-colors shadow-xs"
              >
                Verify Insurance Pre-Auth
              </button>
            )}

            {claimStatus === "processing" && (
              <div className="flex items-center gap-2 text-[10px] text-slate-400">
                <RotateCcw className="w-3.5 h-3.5 animate-spin text-brand-teal" />
                <span>Connecting to NHCX Gateway...</span>
              </div>
            )}

            {claimStatus === "approved" && (
              <div className="w-full bg-emerald-50 border border-emerald-100 p-2 rounded-lg flex items-center justify-center gap-2 text-emerald-700 text-[10px] animate-[fadeIn_0.3s_ease-out_forwards] shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 animate-bounce" />
                <span className="font-bold">Pre-Auth Approved. Claims synchronized!</span>
              </div>
            )}
          </div>

          <div className="text-[9px] text-slate-400 text-center border-t border-slate-200/80 pt-2 font-sans font-bold">
            INTEGRATED WITH AYUSHMAN BHARAT NHCX PROTOCOL
          </div>
        </div>
      )
    },
    {
      id: "analytics",
      icon: <LayoutDashboard className="w-5 h-5" />,
      title: "Analytics Dashboard",
      shortTitle: "Analytics",
      desc: "Real-time insights on revenue, patient flow, department performance, and KPIs.",
      color: "text-brand-iris",
      bg: "bg-brand-iris/10",
      accentHex: "#818cf8",
      benefits: [
        "Aggregates clinical logs into clean, executive charts",
        "Predicts hospital peak traffic hours to balance staff allocation",
        "Tracks department-wise drug margins and cost patterns"
      ],
      preview: (
        <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-5 h-full flex flex-col justify-between font-sans text-xs text-slate-700 relative select-none shadow-sm animate-[fadeIn_0.3s_ease-out]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-iris/5 rounded-full blur-[40px] pointer-events-none"></div>
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <LayoutDashboard className="w-4 h-4 text-brand-iris" />
              <span className="text-slate-900 font-bold">Executive Analytics</span>
            </div>
            <span className="text-[10px] text-slate-400">Live KPIs</span>
          </div>

          <div className="flex gap-2 my-2">
            {(["revenue", "patients", "wait"] as const).map(item => (
              <button
                key={item}
                onClick={() => setAnalyticsMetric(item)}
                className={`flex-1 py-1 rounded text-[9px] font-bold uppercase transition-all duration-300 ${
                  analyticsMetric === item 
                    ? "bg-brand-iris text-slate-950 border-brand-iris" 
                    : "bg-white border border-slate-200 text-slate-500 hover:text-slate-800"
                }`}
              >
                {item === "wait" ? "Wait Time" : item}
              </button>
            ))}
          </div>

          <div className="flex-1 flex flex-col justify-center min-h-[120px] font-sans">
            {analyticsMetric === "revenue" && (
              <div className="space-y-2 animate-[fadeIn_0.3s_ease-out_forwards]">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-slate-500">Daily Pharmacy Outflow</span>
                  <span className="text-slate-800 font-bold">₹1,42,850.00</span>
                </div>
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-slate-500">IPD Core Collection</span>
                  <span className="text-slate-800 font-bold">₹4,20,500.00</span>
                </div>
                <div className="bg-white p-2 rounded border border-slate-200 text-[10px] flex justify-between items-center shadow-xs">
                  <span className="text-slate-500">Total Net Revenue</span>
                  <span className="text-emerald-600 font-bold flex items-center gap-1"><TrendingUp className="w-3.5 h-3.5" /> +14.2%</span>
                </div>
              </div>
            )}

            {analyticsMetric === "patients" && (
              <div className="space-y-2 animate-[fadeIn_0.3s_ease-out_forwards]">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-slate-500">OPD Registrations</span>
                  <span className="text-slate-800 font-bold">184 Patients</span>
                </div>
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-slate-500">IPD Admissions</span>
                  <span className="text-slate-800 font-bold">12 Patients</span>
                </div>
                <div className="bg-white p-2 rounded border border-slate-200 text-[10px] flex justify-between items-center shadow-xs">
                  <span className="text-slate-500">Discharges Done</span>
                  <span className="text-brand-iris font-bold">9 Patients</span>
                </div>
              </div>
            )}

            {analyticsMetric === "wait" && (
              <div className="space-y-2 animate-[fadeIn_0.3s_ease-out_forwards]">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-slate-500">General OPD Queue</span>
                  <span className="text-slate-800 font-bold">12.4 minutes</span>
                </div>
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-slate-500">Lab Diagnostic Results</span>
                  <span className="text-slate-800 font-bold">26.8 minutes</span>
                </div>
                <div className="bg-white p-2 rounded border border-slate-200 text-[10px] flex justify-between items-center shadow-xs">
                  <span className="text-slate-500">TPA Claims Clearing</span>
                  <span className="text-emerald-600 font-bold">8.5 minutes</span>
                </div>
              </div>
            )}
          </div>

          <div className="text-[9px] text-slate-400 text-center border-t border-slate-200/80 pt-2">
            DATA SYNCED WITH CLOUD ANALYTICS SERVER
          </div>
        </div>
      )
    }
  ];

  // Auto-play Interval setup (6 seconds per feature) - Placed after features array is declared
  useEffect(() => {
    if (!isPaused) {
      autoPlayTimer.current = setInterval(() => {
        setSelectedIdx(prev => (prev + 1) % features.length);
      }, 6000);
    }
    return () => {
      if (autoPlayTimer.current) {
        clearInterval(autoPlayTimer.current);
      }
    };
  }, [isPaused]);

  // Handle manual selection - pauses autoplay briefly
  const handleFeatureSelect = (idx: number) => {
    setSelectedIdx(idx);
    setIsPaused(true);
    // Auto-resume after 10 seconds of no interaction
    setTimeout(() => {
      setIsPaused(false);
    }, 10000);
  };



  return (
    <div className="relative">
      <style>{`
        @keyframes progress-bar {
          from { width: 0%; }
          to { width: 100%; }
        }
        .animate-progress {
          animation: progress-bar 6000ms linear forwards;
        }
      `}</style>

      {/* Features Section */}
      <section 
        className="py-16 md:py-20 relative overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="container mx-auto px-6 md:px-8 lg:px-12 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">
              Powerful Features for<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-teal to-brand-sky">Modern Hospitals</span>
            </h2>
            <p className="text-base text-slate-600 font-light max-w-2xl mx-auto">
              Auto-cycling slideshow cockpit. Click any department below or hover to pause and run manual simulations.
            </p>
          </div>

          {/* Horizontal Mini Tabs (Above the display card) - 9 Columns layout */}
          <div className="max-w-6xl mx-auto mb-8">
            <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2">
              {features.map((feature, idx) => {
                const isActive = idx === selectedIdx;
                return (
                  <button
                    key={feature.id}
                    onClick={() => handleFeatureSelect(idx)}
                    className={`flex flex-col items-center justify-between p-3.5 rounded-xl border text-center transition-all duration-300 relative overflow-hidden h-[95px] select-none ${
                      isActive
                        ? "bg-white border-brand-teal shadow-[0_4px_20px_rgba(45,212,191,0.12)] -translate-y-1 text-slate-900"
                        : "bg-white/60 hover:bg-white border-slate-200/80 text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                      isActive ? "bg-brand-teal/10 text-brand-teal" : "bg-slate-100 text-slate-400"
                    }`}>
                      {feature.icon}
                    </div>
                    <span className="text-[10px] font-bold leading-tight font-sans mt-2 block w-full truncate">
                      {feature.shortTitle}
                    </span>

                    {/* Mini Progress bar inside active tab card */}
                    {isActive && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-100 overflow-hidden">
                        <div 
                          key={selectedIdx} // Force animation restart
                          className="h-full bg-brand-teal animate-progress"
                          style={{ animationPlayState: isPaused ? "paused" : "running" }}
                          onAnimationEnd={() => {
                            if (!isPaused) {
                              setSelectedIdx(prev => (prev + 1) % features.length);
                            }
                          }}
                        />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Unified Display Cockpit Card (Below the tabs) */}
          <div className="max-w-6xl mx-auto">
            <div className="bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-3xl p-6 md:p-8 lg:p-10 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch min-h-[460px]">
              
              {/* Left Column: Feature Details */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-teal/10 text-brand-teal flex items-center justify-center">
                      {features[selectedIdx].icon}
                    </div>
                    <span className="text-[10px] uppercase font-black text-brand-teal tracking-widest bg-brand-teal/5 px-2.5 py-1 rounded-full">
                      Core Module
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight">
                    {features[selectedIdx].title}
                  </h3>
                  <p className="text-sm md:text-base text-slate-600 leading-relaxed font-light">
                    {features[selectedIdx].desc}
                  </p>
                </div>

                <div className="space-y-2.5">
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">Key Capabilities:</span>
                  <ul className="space-y-2">
                    {features[selectedIdx].benefits.map((benefit, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5 text-xs text-slate-600">
                        <CheckCircle2 className="w-4 h-4 text-brand-teal shrink-0 mt-0.5" />
                        <span className="font-sans leading-relaxed">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column: Live Interactive Simulation Playground Monitor */}
              <div className="lg:col-span-7 flex flex-col justify-center bg-slate-100/50 border border-slate-200/60 rounded-2xl p-4 md:p-6 shadow-inner relative overflow-hidden select-none">
                {/* Visual grid background inside monitor */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:14px_14px] pointer-events-none"></div>
                
                <div className="relative z-10 w-full h-full flex flex-col justify-center">
                  {features[selectedIdx].preview}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>


    </div>
  );
};

export default HospitalSolutions;
