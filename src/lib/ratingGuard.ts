// ─────────────────────────────────────────────────────────────────────────────
// Client-side "have I already rated this doctor" guard, backed by localStorage.
//
// This is the PRIMARY defense against accidental double-rating (revisiting a doctor's
// page, or booking the same doctor twice, and tapping a star again without realizing
// it already counted) — not a security boundary. Clearing localStorage or switching
// browsers/devices bypasses it entirely; that's an accepted trade-off, matching the
// rest of the review system's "anyone can submit, no login" design. The post-booking
// rating flow layers a server-side (unverified mobile hash) guard on top of this — see
// SubmitDoctorReviewHandler — as a second, independent line of defense for that one flow.
// ─────────────────────────────────────────────────────────────────────────────

const KEY_PREFIX = "nexeagle_rated_";

/** The star rating (1-5) this browser already submitted for a doctor, or null if none. */
export function getSavedRating(doctorId: string): number | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY_PREFIX + doctorId);
    if (!raw) return null;
    const n = Number(raw);
    return Number.isFinite(n) && n >= 1 && n <= 5 ? n : null;
  } catch {
    // localStorage unavailable (private browsing, disabled storage, etc.) — degrade to
    // "not rated yet" rather than throwing.
    return null;
  }
}

/** Record that this browser just rated a doctor, so the picker doesn't show again. */
export function markRated(doctorId: string, rating: number): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY_PREFIX + doctorId, String(rating));
  } catch {
    /* best-effort */
  }
}
