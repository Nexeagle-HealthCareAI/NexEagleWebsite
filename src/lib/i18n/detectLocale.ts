import type { Locale } from "./types";

// Auto-detection only ever picks en/hi/bn — there is no BCP-47 tag a real browser
// sends for Hinglish, so it's reachable only by an explicit tap on the toggle,
// never assumed on a first visit.
export function detectBrowserLocale(): Locale {
  if (typeof navigator === "undefined") return "en";
  const candidates = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const raw of candidates) {
    const lang = raw?.toLowerCase() ?? "";
    if (lang.startsWith("bn")) return "bn";
    if (lang.startsWith("hi")) return "hi";
    if (lang.startsWith("en")) return "en";
  }
  return "en";
}
