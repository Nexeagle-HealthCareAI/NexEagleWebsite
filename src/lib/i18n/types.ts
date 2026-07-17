export type Locale = "en" | "hi" | "bn" | "hinglish";

export interface LocaleMeta {
  code: Locale;
  /** Shown on the toggle in the language's OWN script, so someone who can't read
   * the other three scripts can still recognize their own language by sight. */
  nativeLabel: string;
  /** Compact badge shown on the closed toggle button. */
  shortLabel: string;
  /** English label for universal understanding */
  englishLabel: string;
}

export const LOCALES: LocaleMeta[] = [
  { code: "en", nativeLabel: "English", englishLabel: "English", shortLabel: "EN" },
  { code: "hi", nativeLabel: "हिंदी", englishLabel: "Hindi", shortLabel: "HI" },
  { code: "bn", nativeLabel: "বাংলা", englishLabel: "Bengali", shortLabel: "BN" },
  { code: "hinglish", nativeLabel: "Hinglish", englishLabel: "Hinglish", shortLabel: "HG" },
];

export const DEFAULT_LOCALE: Locale = "en";
