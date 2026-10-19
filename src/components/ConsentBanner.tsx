"use client";

import { useEffect, useState } from "react";
import { getConsentChoice, setConsentChoice, OPEN_CONSENT_EVENT, type ConsentChoice } from "@/lib/analytics";

// Notice + opt-out (decided 2026-10-19): tracking runs unless the visitor declines. Shown until the
// visitor makes a choice, and again from the footer's "Tracking choices" link. Both buttons are
// equally prominent on purpose.
export default function ConsentBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(getConsentChoice() === null);
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_CONSENT_EVENT, reopen);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen);
  }, []);

  if (!open) return null;

  const choose = (choice: ConsentChoice) => {
    setConsentChoice(choice);
    setOpen(false);
  };

  return (
    <div
      role="region"
      aria-label="Tracking choices"
      className="fixed inset-x-3 bottom-4 z-[60] rounded-2xl border border-slate-200 bg-white p-4 text-[13px] leading-relaxed text-slate-700 shadow-lg sm:left-4 sm:right-auto sm:max-w-md"
    >
      <p>We record how this site is used (pages visited, the page that sent you and your approximate
        location) to improve it. IP addresses are shortened before storage and visit data is deleted
        after 12 months. You can decline.</p>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => choose("accepted")}
          className="rounded-full border border-slate-900 bg-slate-900 px-4 py-1.5 font-semibold text-white"
        >
          OK
        </button>
        <button
          type="button"
          onClick={() => choose("declined")}
          className="rounded-full border border-slate-900 bg-white px-4 py-1.5 font-semibold text-slate-900"
        >
          Decline
        </button>
        <a href="/privacy#website-analytics" className="ml-auto text-slate-500 underline">
          Privacy policy
        </a>
      </div>
    </div>
  );
}
