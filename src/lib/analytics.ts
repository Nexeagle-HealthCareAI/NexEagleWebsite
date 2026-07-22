"use client";

const SESSION_ID_KEY = "neg_visit_session_id";

// Client-generated id persisted in localStorage — groups page views AND funnel events into one
// visit/session (search -> profile view -> booking step, login click -> otp sent -> verified),
// so the CMS Insights tab can correlate them without any server-side session store. Shared by
// AnalyticsTracker's page-view beacon and every trackEvent() call below — same id either way.
export function getOrCreateSessionId(): string {
  try {
    const existing = window.localStorage.getItem(SESSION_ID_KEY);
    if (existing) return existing;
    const created =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    window.localStorage.setItem(SESSION_ID_KEY, created);
    return created;
  } catch {
    // localStorage unavailable (private browsing, etc.) — fall back to a per-call id rather than
    // failing the beacon entirely. Events won't correlate across calls in this fallback case, but
    // they still record.
    return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }
}

export type AnalyticsEventType =
  | "login_initiated"
  | "otp_sent"
  | "otp_verified"
  | "otp_verify_failed"
  | "search_performed"
  | "doctor_profile_viewed"
  | "booking_step_reached";

interface TrackEventPayload {
  mobile?: string;
  doctorId?: string;
  specialtyId?: string;
  metadata?: Record<string, unknown>;
}

// Fire-and-forget funnel/behavior event beacon for the CMS Insights tab (Auth Funnel / Booking
// Funnel / All Searches). Never throws, never awaited by callers, never blocks rendering — same
// contract as the page-view beacon in AnalyticsTracker.tsx.
export function trackEvent(eventType: AnalyticsEventType, payload: TrackEventPayload = {}): void {
  try {
    const body = {
      eventType,
      sessionId: getOrCreateSessionId(),
      mobile: payload.mobile,
      doctorId: payload.doctorId,
      specialtyId: payload.specialtyId,
      metadataJson: payload.metadata ? JSON.stringify(payload.metadata) : undefined,
    };
    fetch("/api/track-event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      keepalive: true,
    }).catch(() => {
      // Best-effort — never fail because the beacon request threw.
    });
  } catch {
    // Best-effort — never fail because building the payload threw.
  }
}
