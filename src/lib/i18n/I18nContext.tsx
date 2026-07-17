"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { en, type TranslationKey } from "./dictionaries/en";
import { hi } from "./dictionaries/hi";
import { bn } from "./dictionaries/bn";
import { hinglish } from "./dictionaries/hinglish";
import { detectBrowserLocale } from "./detectLocale";
import { DEFAULT_LOCALE, type Locale } from "./types";

const DICTIONARIES: Record<Locale, Record<TranslationKey, string>> = { en, hi, bn, hinglish };
const STORAGE_KEY = "nexeagle_locale";

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey, vars?: Record<string, string | number>) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  // Deliberately fixed at "en" for the server render AND the client's hydration
  // pass — reading localStorage/navigator.language here instead would render
  // different text than the server sent and break hydration (same class of issue
  // next-themes solves the same way). The real preference is applied a moment
  // later in the effect below, once we're safely past hydration; that's the one
  // accepted "flash to English then swap" trade-off of doing this without full
  // server-side locale routing (which would mean restructuring every one of the
  // 1000+ SEO pages behind a [locale] segment — a much bigger, separate project).
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY) as Locale | null;
      if (saved && DICTIONARIES[saved]) {
        setLocaleState(saved);
        return;
      }
    } catch {
      /* localStorage unavailable — fall through to browser-language detection */
    }
    setLocaleState(detectBrowserLocale());
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* best-effort persistence only */
    }
  }, []);

  const t = useCallback(
    (key: TranslationKey, vars?: Record<string, string | number>) => {
      const dict = DICTIONARIES[locale] ?? en;
      let str = dict[key] ?? en[key] ?? key;
      if (vars) {
        for (const [k, v] of Object.entries(vars)) {
          str = str.replaceAll(`{${k}}`, String(v));
        }
      }
      return str;
    },
    [locale]
  );

  const value = useMemo(() => ({ locale, setLocale, t }), [locale, setLocale, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useTranslation(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useTranslation must be used within an I18nProvider");
  return ctx;
}
