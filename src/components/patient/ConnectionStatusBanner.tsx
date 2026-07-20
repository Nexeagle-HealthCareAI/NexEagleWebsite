"use client";

import { WifiOff, Wifi, Zap } from "lucide-react";
import { useNetworkStatus } from "@/lib/hooks/useNetworkStatus";

// Site-wide "you're offline" / "slow connection" indicator — mounted once in
// app/layout.tsx. Renders nothing in the common case (online, decent connection);
// only takes up space when there's actually something to tell the patient, so it
// never costs layout shift on a normal visit. Pairs with the service worker
// (app/sw.ts): when this shows "offline", any doctor list/availability on screen is
// coming from cache, not a live fetch — this is what makes that visible instead of
// silently stale.
export default function ConnectionStatusBanner() {
  const { type, saveData } = useNetworkStatus();

  // If we don't know the network status, or it's high speed 4G (without Data Saver), hide the banner.
  if (type === "unknown" || (type === "4g" && !saveData)) return null;

  const isOffline = type === "offline";
  const isSlow = type === "2g" || type === "slow-2g";

  let bannerColor = "bg-amber-500";
  if (isOffline) bannerColor = "bg-slate-700";
  if (saveData) bannerColor = "bg-brand-teal"; // Less urgent, just informative

  return (
    <div
      role="status"
      className={`flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-white ${bannerColor}`}
    >
      {isOffline ? (
        <WifiOff className="w-3.5 h-3.5 shrink-0" />
      ) : saveData ? (
        <Zap className="w-3.5 h-3.5 shrink-0" />
      ) : (
        <Wifi className="w-3.5 h-3.5 shrink-0" />
      )}
      
      <span>
        {isOffline
          ? "You're offline — showing saved results"
          : saveData 
          ? `Data Saver Active (${type.toUpperCase()}) — optimizing images`
          : `Slow connection detected (${type.toUpperCase()}) — showing saved results while we catch up`}
      </span>
    </div>
  );
}
