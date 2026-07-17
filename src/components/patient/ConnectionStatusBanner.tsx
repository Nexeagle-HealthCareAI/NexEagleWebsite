"use client";

import { useEffect, useState } from "react";
import { WifiOff, Wifi } from "lucide-react";

type ConnectionState = "online" | "offline" | "slow";

// Network Information API — Chrome/Android only (not in the DOM lib types, and Safari
// never shipped it), so this is read defensively and treated as absent everywhere else.
interface NetworkInformation extends EventTarget {
  effectiveType?: "slow-2g" | "2g" | "3g" | "4g";
}

function readState(): ConnectionState {
  if (typeof navigator === "undefined") return "online";
  if (!navigator.onLine) return "offline";
  const conn = (navigator as Navigator & { connection?: NetworkInformation }).connection;
  if (conn?.effectiveType === "slow-2g" || conn?.effectiveType === "2g") return "slow";
  return "online";
}

// Site-wide "you're offline" / "slow connection" indicator — mounted once in
// app/layout.tsx. Renders nothing in the common case (online, decent connection);
// only takes up space when there's actually something to tell the patient, so it
// never costs layout shift on a normal visit. Pairs with the service worker
// (app/sw.ts): when this shows "offline", any doctor list/availability on screen is
// coming from cache, not a live fetch — this is what makes that visible instead of
// silently stale.
export default function ConnectionStatusBanner() {
  const [state, setState] = useState<ConnectionState>("online");

  useEffect(() => {
    setState(readState());
    const update = () => setState(readState());

    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    const conn = (navigator as Navigator & { connection?: NetworkInformation }).connection;
    conn?.addEventListener?.("change", update);

    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
      conn?.removeEventListener?.("change", update);
    };
  }, []);

  if (state === "online") return null;

  const offline = state === "offline";

  return (
    <div
      role="status"
      className={`flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-white ${
        offline ? "bg-slate-700" : "bg-amber-500"
      }`}
    >
      {offline ? <WifiOff className="w-3.5 h-3.5 shrink-0" /> : <Wifi className="w-3.5 h-3.5 shrink-0" />}
      <span>
        {offline
          ? "You're offline — showing saved results"
          : "Slow connection detected — showing saved results while we catch up"}
      </span>
    </div>
  );
}
