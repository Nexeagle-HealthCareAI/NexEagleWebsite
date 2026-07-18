"use client";

import { useState, useEffect } from "react";
import { Search, MapPin, Stethoscope, Mic, ChevronDown } from "lucide-react";
import { specialties } from "@/data/patient";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/lib/i18n/I18nContext";
import { translateSpecialty } from "@/lib/i18n/specialties";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

// en-IN handles Indian English + Hinglish; hi-IN/bn-IN give the speech engine a much
// better shot at actual Hindi/Bengali sentences once the UI locale says that's what
// the visitor speaks.
const SPEECH_LANG: Record<string, string> = { en: "en-IN", hi: "hi-IN", bn: "bn-IN", hinglish: "en-IN" };

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
  const { t, locale } = useTranslation();

  function scrollToDoctors() {
    document.getElementById("doctors")?.scrollIntoView({ behavior: "smooth" });
  }

  const [isListening, setIsListening] = useState(false);
  const [hasSpeechSupport, setHasSpeechSupport] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && ("SpeechRecognition" in window || "webkitSpeechRecognition" in window)) {
      setHasSpeechSupport(true);
    }
  }, []);

  const startVoiceSearch = () => {
    if (isListening || !hasSpeechSupport) return;
    
    const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognitionAPI();
    
    recognition.lang = SPEECH_LANG[locale] ?? "en-IN";
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
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6 flex flex-col items-center">
          <span className="sr-only">Find & Book Top Specialists Near You on </span>
          <span>
            Doctor{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-teal to-sky-500">
              Dekho
            </span>
          </span>
        </h1>
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-500 font-medium mb-12">
          {t("hero.subtitle")}
        </p>

        {/* ── The Floating Search Pill ── */}
        <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-2xl p-1.5 sm:p-3 rounded-[1.5rem] sm:rounded-full border border-white/60 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05),0_0_40px_-10px_rgba(20,184,166,0.1)] ring-1 ring-black/5 flex flex-col sm:flex-row items-center gap-1.5 sm:gap-0 transition-shadow duration-500 hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.08),0_0_50px_-10px_rgba(20,184,166,0.15)]">
          
          {/* Input 1: Doctor/Symptom */}
          <div className="flex-1 h-14 sm:h-16 rounded-2xl sm:rounded-l-full sm:rounded-r-none hover:bg-slate-50/50 focus-within:bg-slate-50/80 transition-colors w-full group relative">
            <div className="absolute left-5 sm:left-6 top-1/2 -translate-y-1/2 pointer-events-none">
              <Search className="w-5 h-5 text-slate-400 group-focus-within:text-brand-teal transition-colors" />
            </div>
            <input
              id="doctor-search"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && scrollToDoctors()}
              placeholder={t("hero.searchPlaceholder")}
              className="w-full h-full bg-transparent pl-12 sm:pl-14 pr-[80px] text-base text-slate-800 placeholder:text-slate-400 font-medium focus:outline-none"
            />
            
            <div className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 z-10">
              {query && (
                <button
                  onClick={() => onQueryChange("")}
                  className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-300 hover:text-slate-700 transition-colors"
                >
                  <span className="text-[10px] font-bold">✕</span>
                </button>
              )}
              <button
                onClick={() => {
                  if (!hasSpeechSupport) {
                    alert(t("hero.voiceNotSupported"));
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
                title={t("hero.voiceSearchTitle")}
              >
                <Mic className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="w-[90%] h-px sm:w-px sm:h-10 bg-slate-200 shrink-0 my-1 sm:my-0" />

          {/* Input 2: Specialty Selector (Desktop) */}
          <div className="hidden sm:flex flex-1 max-w-[280px] w-full h-16 rounded-r-full hover:bg-slate-50/50 focus-within:bg-slate-50/80 transition-colors group relative border-l border-slate-200/60">
            <div className="absolute left-6 top-1/2 -translate-y-1/2 pointer-events-none z-10">
              <Stethoscope className="w-5 h-5 text-slate-400 group-focus-within:text-brand-teal transition-colors" />
            </div>
            <Select 
              value={specialtyId || "all"} 
              onValueChange={(val) => onSpecialtyChange(val === "all" ? "" : val)}
            >
              <SelectTrigger className="w-full h-full border-0 bg-transparent pl-14 pr-6 focus:ring-0 shadow-none text-base font-medium rounded-r-full text-slate-800">
                <SelectValue placeholder={t("hero.allSpecialities")} />
              </SelectTrigger>
              <SelectContent className="max-h-[300px] z-[60]">
                <SelectItem value="all">{t("hero.allSpecialities")}</SelectItem>
                {specialties.map((s) => (
                  <SelectItem key={s.id} value={s.id}>
                    {translateSpecialty(s.id, s.name, locale)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Input 2: Specialty Selector (Mobile) */}
          <div className="sm:hidden flex-1 w-full h-14 hover:bg-slate-50/50 transition-colors group relative">
            <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
              <DrawerTrigger asChild>
                <button className="w-full h-full flex items-center justify-between px-5 text-left text-base font-medium text-slate-800 focus:outline-none">
                  <div className="flex items-center gap-3 truncate pr-4">
                    <Stethoscope className="w-5 h-5 text-slate-400 shrink-0" />
                    <span className="truncate">
                      {specialtyId 
                        ? translateSpecialty(specialtyId, specialties.find(s => s.id === specialtyId)?.name || "", locale)
                        : t("hero.allSpecialities")}
                    </span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                </button>
              </DrawerTrigger>
              <DrawerContent className="z-[100] max-h-[85vh]">
                <DrawerHeader>
                  <DrawerTitle className="text-center">{t("hero.browseAll")}</DrawerTitle>
                </DrawerHeader>
                <div className="px-4 pb-8 overflow-y-auto flex flex-col gap-1.5 mt-2">
                  <button 
                    onClick={() => { onSpecialtyChange(""); setIsDrawerOpen(false); }}
                    className={cn(
                      "text-left px-5 py-3.5 rounded-2xl text-sm font-semibold transition-colors flex items-center justify-between", 
                      !specialtyId ? "bg-teal-50 text-brand-teal" : "text-slate-600 hover:bg-slate-50"
                    )}
                  >
                    <span>{t("hero.allSpecialities")}</span>
                    {!specialtyId && <div className="w-2 h-2 rounded-full bg-brand-teal" />}
                  </button>
                  {specialties.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => { onSpecialtyChange(s.id); setIsDrawerOpen(false); }}
                      className={cn(
                        "text-left px-5 py-3.5 rounded-2xl text-sm font-semibold transition-colors flex items-center justify-between", 
                        specialtyId === s.id ? "bg-teal-50 text-brand-teal" : "text-slate-600 hover:bg-slate-50"
                      )}
                    >
                      <span>{translateSpecialty(s.id, s.name, locale)}</span>
                      {specialtyId === s.id && <div className="w-2 h-2 rounded-full bg-brand-teal" />}
                    </button>
                  ))}
                </div>
              </DrawerContent>
            </Drawer>
          </div>

          {/* Divider */}
          <div className="w-[90%] h-px sm:hidden bg-slate-200 shrink-0 my-1" />

          {/* Search Button */}
          <button
            onClick={scrollToDoctors}
            className="w-full sm:w-auto h-14 sm:h-16 px-8 sm:px-10 rounded-2xl sm:rounded-full bg-brand-teal text-white text-base sm:text-lg font-bold shadow-[0_8px_25px_-5px_rgba(20,184,166,0.4)] hover:bg-teal-500 hover:shadow-[0_12px_30px_-5px_rgba(20,184,166,0.5)] active:scale-[0.98] transition-all duration-300 shrink-0 flex items-center justify-center gap-2"
          >
            <Search className="w-5 h-5 sm:hidden" />
            <span>{t("hero.search")}</span>
          </button>
        </div>

        {/* Quick specialty chips — all specialities */}
        <div className="mt-8 hidden sm:flex flex-col items-center">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">{t("hero.browseAll")}</p>
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
                {translateSpecialty(s.id, s.name, locale)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
