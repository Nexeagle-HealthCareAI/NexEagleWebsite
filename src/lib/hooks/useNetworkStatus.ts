"use client";

import { useEffect, useState } from "react";

export type NetworkType = "4g" | "3g" | "2g" | "slow-2g" | "offline" | "unknown";

interface NetworkInformation extends EventTarget {
  effectiveType?: NetworkType;
  saveData?: boolean;
}

export function getNetworkStatus(): { type: NetworkType; saveData: boolean } {
  if (typeof navigator === "undefined") return { type: "unknown", saveData: false };
  if (!navigator.onLine) return { type: "offline", saveData: false };
  
  const conn = (navigator as Navigator & { connection?: NetworkInformation }).connection;
  if (conn && conn.effectiveType) {
    return { type: conn.effectiveType, saveData: !!conn.saveData };
  }
  
  return { type: "unknown", saveData: false };
}

export function useNetworkStatus() {
  const [status, setStatus] = useState<{ type: NetworkType; saveData: boolean }>({ type: "unknown", saveData: false });

  useEffect(() => {
    setStatus(getNetworkStatus());
    const update = () => setStatus(getNetworkStatus());

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

  return status;
}
