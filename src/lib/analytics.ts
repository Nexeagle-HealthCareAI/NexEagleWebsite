"use client";

const SESSION_ID_KEY = "neg_visit_session_id";

// Client-generated id persisted in localStorage — groups page views into one visit/session so the
// CMS "Site Visits" report can correlate them without any server-side session store. Used by
// AnalyticsTracker's page-view beacon. (The funnel-event tracking — trackEvent / recordLead — is
// patient-portal-only and lives in the Doctor Dekho app.)
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
    // failing the beacon entirely.
    return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }
}
