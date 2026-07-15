"use client";

import { useState, useEffect } from "react";
import { Search, MapPin, Stethoscope, Mic } from "lucide-react";
import { specialties } from "@/data/patient";
import { cn } from "@/lib/utils";

interface PatientHeroProps {
  query: string;
  onQueryChange: (q: string) => void;
  specialtyId: string;
  onSpecialtyChange: (id: string) => void;
}

export default function PatientHero({
  query,
  onQueryChange,
  specialtyId,
  onSpecialtyChange,
}: PatientHeroProps) {
  function scrollToDoctors() {
    document.getElementById("doctors")?.scrollIntoView({ behavior: "smooth" });
  }

  const [isListening, setIsListening] = useState(false);
  const [hasSpeechSupport, setHasSpeechSupport] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && ("SpeechRecognition" in window || "webkitSpeechRecognition" in window)) {
      setHasSpeechSupport(true);
    }
  }, []);

  const startVoiceSearch = () => {
    if (isListening || !hasSpeechSupport) return;
    
    const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognitionAPI();
    
    // en-IN perfectly handles Indian English and Hinglish vernacular phrases
    recognition.lang = "en-IN"; 
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsListening(true);
    
    recognition.onresult = (event: any) => {
      // Compile all interim and final results from this session
      const fullText = Array.from(event.results)
        .map((res: any) => res[0].transcript)
        .join('');
        
      onQueryChange(fullText);

      // Check if the engine has finalized the phrase
      const isFinal = Array.from(event.results).some((res: any) => res.isFinal);
      
      if (isFinal) {
        // Wait a half-second for the user to read the final text, then auto-search
        setTimeout(() => {
          scrollToDoctors();
        }, 500);
      }
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };

    recognition.onend = () => setIsListening(false);

    recognition.start();
  };

  return (
    <section className="relative overflow-hidden bg-white pt-16 pb-24 sm:pt-24 sm:pb-32">
      {/* ── Background Mesh Gradient ── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-teal-100/40 blur-[100px] mix-blend-multiply" />
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-sky-100/50 blur-[100px] mix-blend-multiply" />
        <div className="absolute bottom-[-10%] left-[20%] w-[60%] h-[40%] rounded-full bg-brand-sand/40 blur-[120px] mix-blend-multiply" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Title */}
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6">
          Doctor{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-teal to-sky-500">
            Dekho
          </span>
        </h1>
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-500 font-medium mb-12">
          Find the care you deserve. Book verified top specialists near you instantly. No login, no app downloads—just seamless healthcare access.
        </p>

        {/* ── The Floating Search Pill ── */}
        <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-2xl p-1.5 sm:p-3 rounded-[1.5rem] sm:rounded-full border border-white/60 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05),0_0_40px_-10px_rgba(20,184,166,0.1)] ring-1 ring-black/5 flex flex-col sm:flex-row items-center gap-1.5 sm:gap-0 transition-shadow duration-500 hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.08),0_0_50px_-10px_rgba(20,184,166,0.15)]">
          
          {/* Input 1: Doctor/Symptom */}
          <div className="flex-1 flex items-center h-14 sm:h-16 px-5 sm:px-6 rounded-2xl sm:rounded-l-full sm:rounded-r-none hover:bg-slate-50/50 focus-within:bg-slate-50/80 transition-colors w-full group relative">
            <Search className="w-5 h-5 text-slate-400 shrink-0 group-focus-within:text-brand-teal transition-colors" />
            <input
              id="doctor-search"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && scrollToDoctors()}
              placeholder="Doctor, hospital, or symptom..."
              className="w-full min-w-0 bg-transparent px-4 text-base text-slate-800 placeholder:text-slate-400 font-medium focus:outline-none"
            />
            {query && (
              <button
                onClick={() => onQueryChange("")}
                className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-300 hover:text-slate-700 transition-colors mr-1"
              >
                <span className="text-[10px] font-bold">✕</span>
              </button>
            )}
            
            <button
              onClick={() => {
                if (!hasSpeechSupport) {
                  alert("Voice search is not supported in this browser. Please try Chrome, Edge, or Safari.");
                  return;
                }
                startVoiceSearch();
              }}
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all active:scale-[0.90]",
                isListening 
                  ? "bg-rose-100 text-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.4)] animate-pulse" 
                  : "bg-slate-100 text-slate-500 hover:bg-brand-teal/10 hover:text-brand-teal"
              )}
              title="Search by voice"
            >
              <Mic className="w-5 h-5" />
            </button>
          </div>

          <div className="hidden sm:block w-px h-10 bg-slate-200 shrink-0" />

          {/* Input 2: Specialty Selector */}
          <div className="flex-1 sm:max-w-[280px] w-full flex items-center h-14 sm:h-16 px-5 sm:px-6 rounded-2xl sm:rounded-none hover:bg-slate-50/50 focus-within:bg-slate-50/80 transition-colors group relative">
            <Stethoscope className="w-5 h-5 text-slate-400 shrink-0 group-focus-within:text-brand-teal transition-colors" />
            <select
              id="specialty-filter"
              value={specialtyId}
              onChange={(e) => onSpecialtyChange(e.target.value)}
              className="w-full min-w-0 bg-transparent px-4 text-base text-slate-800 font-medium focus:outline-none cursor-pointer appearance-none"
            >
              <option value="">All Specialities</option>
              {specialties.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
            {/* Custom dropdown arrow to replace default appearance-none */}
            <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-4 h-4 text-slate-400 group-hover:text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Search Button */}
          <button
            onClick={scrollToDoctors}
            className="w-full sm:w-auto h-14 sm:h-16 px-8 sm:px-10 rounded-2xl sm:rounded-full bg-brand-teal text-white text-base sm:text-lg font-bold shadow-[0_8px_25px_-5px_rgba(20,184,166,0.4)] hover:bg-teal-500 hover:shadow-[0_12px_30px_-5px_rgba(20,184,166,0.5)] active:scale-[0.98] transition-all duration-300 shrink-0 flex items-center justify-center gap-2"
          >
            <Search className="w-5 h-5 sm:hidden" />
            <span>Search</span>
          </button>
        </div>

        {/* Quick specialty chips — all specialities */}
        <div className="mt-8 flex flex-col items-center">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Browse All Specialities</p>
          <div className="flex flex-wrap justify-center gap-2.5">
            {specialties.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  onSpecialtyChange(specialtyId === s.id ? "" : s.id);
                  scrollToDoctors();
                }}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 border backdrop-blur-sm",
                  specialtyId === s.id
                    ? "bg-slate-900 border-slate-900 text-white shadow-md shadow-slate-900/20"
                    : "bg-white/60 border-slate-200/60 text-slate-600 hover:bg-white hover:border-brand-teal/30 hover:text-brand-teal hover:shadow-sm"
                )}
              >
                {s.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
