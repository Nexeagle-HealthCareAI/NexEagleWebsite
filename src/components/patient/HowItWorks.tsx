"use client";

import { Search, CalendarCheck, Stethoscope } from "lucide-react";
import { useTranslation } from "@/lib/i18n/I18nContext";

export default function HowItWorks() {
  const { t } = useTranslation();

  const steps = [
    {
      icon: <Search className="w-5 h-5" />,
      title: t("howItWorks.step1Title"),
      desc: t("howItWorks.step1Desc"),
    },
    {
      icon: <CalendarCheck className="w-5 h-5" />,
      title: t("howItWorks.step2Title"),
      desc: t("howItWorks.step2Desc"),
    },
    {
      icon: <Stethoscope className="w-5 h-5" />,
      title: t("howItWorks.step3Title"),
      desc: t("howItWorks.step3Desc"),
    },
  ];

  return (
    <section className="bg-slate-50/70 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-center text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          {t("howItWorks.heading")}
        </h2>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-5">
          {steps.map((s, i) => (
            <div
              key={s.title}
              className="relative bg-white rounded-3xl border border-slate-200/70 p-6 shadow-sm"
            >
              <span className="absolute top-5 right-5 text-4xl font-black text-slate-100 select-none">
                {i + 1}
              </span>
              <div className="w-11 h-11 rounded-2xl bg-teal-50 text-brand-teal flex items-center justify-center">
                {s.icon}
              </div>
              <h3 className="mt-4 font-bold text-slate-900">{s.title}</h3>
              <p className="mt-1 text-sm text-slate-500 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
