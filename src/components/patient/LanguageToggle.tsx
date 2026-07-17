"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { useTranslation } from "@/lib/i18n/I18nContext";
import { LOCALES } from "@/lib/i18n/types";
import { cn } from "@/lib/utils";

// Persistent language switcher — lives in PatientTopBar's top-right corner. Shows
// each option in its OWN script (हिंदी / বাংলা / English / Hinglish) rather than
// English labels describing them, since someone who can't read Devanagari or
// Bangla still needs to recognize their own language by sight, not by reading
// an English word about it. Switching is instant — just swaps which dictionary
// t() reads from, no page reload/navigation (see I18nContext.tsx).
export default function LanguageToggle() {
  const { locale, setLocale, t } = useTranslation();
  const [open, setOpen] = useState(false);
  const current = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={t("language.choose")}
        aria-expanded={open}
        className="flex items-center justify-center min-w-[2.25rem] h-9 px-2.5 rounded-full border border-slate-200/60 bg-white/60 backdrop-blur-md text-sm font-bold text-slate-700 hover:border-brand-teal/40 hover:text-brand-teal transition-colors"
      >
        {current.shortLabel}
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-label="Close"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 cursor-default"
          />
          <div className="absolute top-full right-0 mt-3 w-48 bg-white/95 backdrop-blur-xl border border-slate-200/60 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] z-50 py-2 ring-1 ring-black/5">
            <p className="px-4 pb-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wide">
              {t("language.choose")}
            </p>
            {LOCALES.map((l) => (
              <button
                key={l.code}
                type="button"
                onClick={() => {
                  setLocale(l.code);
                  setOpen(false);
                }}
                className={cn(
                  "w-full flex items-center justify-between gap-2 text-left px-4 py-2.5 text-sm transition-colors duration-150",
                  l.code === locale
                    ? "text-brand-teal bg-teal-50/60 font-bold"
                    : "text-slate-600 font-medium hover:bg-slate-50"
                )}
              >
                <span>{l.nativeLabel}</span>
                {l.code === locale && <Check className="w-4 h-4 shrink-0" />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
