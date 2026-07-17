// ─────────────────────────────────────────────────────────────────────────────
// Custom "Add to Home Screen" install prompt — support library.
//
// Chrome/Android won't let a site force an install; the browser fires
// `beforeinstallprompt` (which we must preventDefault() to suppress its own tiny
// banner) and hands us a one-shot event whose .prompt() we can only call from a
// real user gesture. iOS Safari never fires that event at all — there is no
// programmatic install there, only the manual Share → "Add to Home Screen" flow,
// so it's judged by platform/browser detection instead and shown instructions,
// not a button. Same "guard, don't fake it" shape as ratingGuard.ts.
// ─────────────────────────────────────────────────────────────────────────────

export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
  prompt(): Promise<void>;
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
    appinstalled: Event;
  }
}

export function isStandalone(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia?.("(display-mode: standalone)").matches === true ||
    (window.navigator as Navigator & { standalone?: boolean }).standalone === true
  );
}

// iPadOS 13+ reports its UA as "Macintosh" — maxTouchPoints is what distinguishes
// a real Mac (0) from an iPad pretending to be one.
export function isIosSafari(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  const isIos = /iPad|iPhone|iPod/.test(ua) || (ua.includes("Macintosh") && navigator.maxTouchPoints > 1);
  const isSafari = /Safari/.test(ua) && !/CriOS|FxiOS|EdgiOS|OPiOS/.test(ua);
  return isIos && isSafari;
}

export const ENGAGEMENT_EVENT = "nexeagle:engagement";
export type EngagementReason = "booking_success" | "doctor_view";

/** Fired from a high-intent moment (booking confirmed, browsing multiple doctors) — see
 * BookingPanel.tsx / DoctorViewTracker.tsx. InstallAppPrompt listens and decides whether
 * to actually surface the prompt. */
export function reportEngagement(reason: EngagementReason): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(ENGAGEMENT_EVENT, { detail: reason }));
}

const META_KEY = "nexeagle_install_prompt_meta";
const MAX_SHOWS = 3;
const DISMISS_COOLDOWN_MS = 14 * 24 * 60 * 60 * 1000; // 14 days

interface InstallPromptMeta {
  shownCount: number;
  lastShownAt?: number;
  dismissedAt?: number;
  installed?: boolean;
}

function readMeta(): InstallPromptMeta {
  if (typeof window === "undefined") return { shownCount: 0 };
  try {
    const raw = window.localStorage.getItem(META_KEY);
    return raw ? (JSON.parse(raw) as InstallPromptMeta) : { shownCount: 0 };
  } catch {
    return { shownCount: 0 };
  }
}

function writeMeta(meta: InstallPromptMeta): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(META_KEY, JSON.stringify(meta));
  } catch {
    /* best-effort */
  }
}

/** Never-installed, not over the total-shows cap, and not still inside a post-dismiss cooldown. */
export function canShowInstallPrompt(): boolean {
  const meta = readMeta();
  if (meta.installed) return false;
  if (meta.shownCount >= MAX_SHOWS) return false;
  if (meta.dismissedAt && Date.now() - meta.dismissedAt < DISMISS_COOLDOWN_MS) return false;
  return true;
}

export function recordShown(): void {
  const meta = readMeta();
  writeMeta({ ...meta, shownCount: meta.shownCount + 1, lastShownAt: Date.now() });
}

export function recordDismissed(): void {
  writeMeta({ ...readMeta(), dismissedAt: Date.now() });
}

export function recordInstalled(): void {
  writeMeta({ ...readMeta(), installed: true });
}
