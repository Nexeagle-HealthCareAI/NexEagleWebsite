"use client";

import { Search, CalendarCheck, CheckCircle2 } from "lucide-react";
import { useTranslation } from "@/lib/i18n/I18nContext";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function HowItWorks() {
  const { t } = useTranslation();

  const steps = [
    {
      title: t("howItWorks.step1Title"),
      desc: t("howItWorks.step1Desc"),
      color: "text-brand-teal",
      bg: "bg-teal-50",
      border: "border-teal-100",
      icon: (
        <motion.div 
          animate={{ scale: [1, 1.1, 1], rotate: [0, -5, 5, 0] }} 
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        >
          <Search className="w-7 h-7 text-brand-teal" />
        </motion.div>
      )
    },
    {
      title: t("howItWorks.step2Title"),
      desc: t("howItWorks.step2Desc"),
      color: "text-sky-500",
      bg: "bg-sky-50",
      border: "border-sky-100",
      icon: (
        <motion.div 
          animate={{ y: [0, -4, 0] }} 
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", delay: 0.5 }}
        >
          <CalendarCheck className="w-7 h-7 text-sky-500" />
        </motion.div>
      )
    },
    {
      title: t("howItWorks.step3Title"),
      desc: t("howItWorks.step3Desc"),
      color: "text-green-500",
      bg: "bg-green-50",
      border: "border-green-100",
      icon: (
        <motion.div 
          animate={{ scale: [1, 1.15, 1] }} 
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay: 1 }}
        >
          <CheckCircle2 className="w-7 h-7 text-green-500" />
        </motion.div>
      )
    },
  ];

  return (
    <section className="bg-slate-50 border-y border-slate-200 py-12 sm:py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t("howItWorks.heading")}
            </h2>
            <p className="mt-2 text-slate-500 text-sm sm:text-base font-medium">
              Book your appointment in 3 simple steps.
            </p>
          </div>

          {/* Compact Card */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 p-5 sm:p-8 relative">
            
            {/* The vertical connection line */}
            <div className="absolute left-[3.25rem] sm:left-[4rem] top-12 bottom-12 w-0.5 bg-slate-100 hidden sm:block" />

            <div className="space-y-6 sm:space-y-8 relative z-10">
              {steps.map((s, i) => (
                <div key={s.title} className="flex gap-4 sm:gap-6 items-start group">
                  
                  {/* Left: Icon Block */}
                  <div className={cn(
                    "w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-2xl sm:rounded-[1.5rem] border flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:shadow-md bg-white relative z-10",
                    s.bg, s.border
                  )}>
                    {s.icon}
                    
                    {/* Badge */}
                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center shadow-sm">
                      {i + 1}
                    </div>
                  </div>

                  {/* Right: Text Block */}
                  <div className="pt-1 sm:pt-3">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug mb-1">
                      {s.title}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed max-w-sm">
                      {s.desc}
                    </p>
                  </div>

                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
