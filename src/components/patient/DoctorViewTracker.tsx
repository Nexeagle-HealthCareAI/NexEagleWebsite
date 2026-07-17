"use client";

import { useEffect } from "react";
import { reportEngagement } from "@/lib/pwaInstall";

const SESSION_KEY = "nexeagle_viewed_doctors";

// Mounted once per doctor detail page (app/doctors/[doctorSlug]/page.tsx). Fires the
// install-prompt engagement signal the moment a visitor looks at their 2nd distinct
// doctor in one session — real browsing intent, not just a single bounced pageview.
export default function DoctorViewTracker({ doctorId }: { doctorId: string }) {
  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem(SESSION_KEY);
      const viewed: string[] = raw ? JSON.parse(raw) : [];
      if (!viewed.includes(doctorId)) viewed.push(doctorId);
      window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(viewed));
      if (viewed.length >= 2) reportEngagement("doctor_view");
    } catch {
      /* sessionStorage unavailable — skip this engagement signal, booking_success still works */
    }
  }, [doctorId]);

  return null;
}
