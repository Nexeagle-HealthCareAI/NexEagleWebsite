export type Locale = "en" | "hi" | "bn" | "hinglish";

export interface LocaleMeta {
  code: Locale;
  /** Shown on the toggle in the language's OWN script, so someone who can't read
   * the other three scripts can still recognize their own language by sight. */
  nativeLabel: string;
  /** Compact badge shown on the closed toggle button. */
  shortLabel: string;
}

export const LOCALES: LocaleMeta[] = [
  { code: "en", nativeLabel: "English", shortLabel: "A" },
  { code: "hi", nativeLabel: "हिंदी", shortLabel: "अ" },
  { code: "bn", nativeLabel: "বাংলা", shortLabel: "অ" },
  { code: "hinglish", nativeLabel: "Hinglish", shortLabel: "Hg" },
];

export const DEFAULT_LOCALE: Locale = "en";
