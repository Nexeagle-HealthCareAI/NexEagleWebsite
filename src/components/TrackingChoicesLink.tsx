"use client";

import { openConsentChoices } from "@/lib/analytics";

// Footer link that reopens the consent banner (the footer itself is a server component).
export default function TrackingChoicesLink({ className }: { className?: string }) {
  return (
    <button type="button" onClick={openConsentChoices} className={className}>
      Tracking choices
    </button>
  );
}
