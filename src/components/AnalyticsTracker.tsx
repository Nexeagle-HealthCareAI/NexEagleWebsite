"use client";

import { useEffect } from "react";
import { getOrCreateSessionId } from "@/lib/analytics";

type Props = {
  title: string;
};

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
