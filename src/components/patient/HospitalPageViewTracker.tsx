"use client";

import { useEffect } from "react";
import { recordLead } from "@/lib/analytics";

// Mounted once per hospital landing page (app/hospitals/[hospital]/page.tsx). Fires a
// Lead Generation (easyHMSWeb) "HospitalPageView" beacon -- a "broader signal" lead per this
// requirement's scope, since viewing a hospital's own page is a real signal of interest even
// without typing a name search.
export default function HospitalPageViewTracker({ hospitalId }: { hospitalId?: string }) {
  useEffect(() => {
    if (!hospitalId) return;
    recordLead({ hospitalId, leadType: "HospitalPageView" });
  }, [hospitalId]);

  return null;
}
