"use client";

import { Check, Globe, ChevronDown } from "lucide-react";
import { useTranslation } from "@/lib/i18n/I18nContext";
import { LOCALES } from "@/lib/i18n/types";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Persistent language switcher — lives in PatientTopBar's top-right corner. Shows
// each option in its OWN script (हिंदी / বাংলা / English / Hinglish) rather than
// English labels describing them, since someone who can't read Devanagari or
// Bangla still needs to recognize their own language by sight, not by reading
// an English word about it. Switching is instant — just swaps which dictionary
// t() reads from, no page reload/navigation (see I18nContext.tsx).
export default function LanguageToggle() {
  const { locale, setLocale, t } = useTranslation();
  const current = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          aria-label={t("language.choose")}
          className="flex items-center justify-center gap-1 sm:gap-1.5 h-10 px-2.5 sm:px-4 rounded-full border border-slate-200/60 bg-white/80 backdrop-blur-md text-sm font-semibold text-slate-700 hover:border-brand-teal/40 hover:text-brand-teal hover:bg-white hover:shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-brand-teal/20"
        >
          <Globe className="w-4 h-4 text-brand-teal shrink-0" />
          <span className="hidden sm:inline">{current.nativeLabel}</span>
          <span className="sm:hidden">{current.shortLabel}</span>
          <ChevronDown className="w-3.5 h-3.5 opacity-50 shrink-0" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48 p-1.5 rounded-2xl border-slate-100 shadow-xl shadow-teal-900/5 z-[100]">
        <p className="px-3 pb-2 pt-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wide">
          {t("language.choose")}
        </p>
        {LOCALES.map((l) => (
          <DropdownMenuItem
            key={l.code}
            onClick={() => setLocale(l.code)}
            className={cn(
              "w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl text-sm transition-all cursor-pointer",
              l.code === locale
                ? "text-brand-teal bg-teal-50/80 font-bold"
                : "text-slate-600 font-medium hover:bg-slate-50 focus:bg-slate-50"
            )}
          >
            <div className="flex flex-col items-start leading-tight">
              <span>{l.nativeLabel}</span>
              {l.code !== "en" && <span className="text-[10px] opacity-70 font-normal">{l.englishLabel}</span>}
            </div>
            {l.code === locale && <Check className="w-4 h-4 shrink-0" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
