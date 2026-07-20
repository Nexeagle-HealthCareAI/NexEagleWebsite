"use client";

import { useEffect } from "react";

type Props = {
  title: string;
};

const SESSION_ID_KEY = "neg_visit_session_id";

// Client-generated id persisted in localStorage — groups page views into one visit/session so the
// CMS "Site Visits" report can distinguish unique visitors from raw page-view counts. Not a
// cookie/tracking-consent concern: it carries no PII, just an opaque random id.
function getOrCreateSessionId(): string {
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
    // localStorage unavailable (private browsing, etc.) — fall back to a per-page-load id rather
    // than failing the beacon entirely.
    return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }
}

export default function AnalyticsTracker({ title }: Props) {
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("config", "GA_MEASUREMENT_ID", {
        page_title: title,
        page_location: window.location.href,
      });
    }

    // Fire-and-forget page-view beacon for the CMS "Site Visits" report — never blocks rendering,
    // never surfaces an error to the visitor.
    try {
      const params = new URLSearchParams(window.location.search);
      const payload = {
        pagePath: window.location.pathname,
        referrerUrl: document.referrer || null,
        utmSource: params.get("utm_source"),
        utmMedium: params.get("utm_medium"),
        utmCampaign: params.get("utm_campaign"),
        userAgent: navigator.userAgent,
        sessionId: getOrCreateSessionId(),
      };
      fetch("/api/track-visit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch(() => {
        // Best-effort — never fail because the beacon request threw.
      });
    } catch {
      // Best-effort — never fail because building the payload threw.
    }
  }, [title]);
  return null;
}
