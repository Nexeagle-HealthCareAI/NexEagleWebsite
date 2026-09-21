"use client";

import React from "react";
import { TooltipProvider } from "@/components/ui/tooltip";

// The corporate site needs no data-fetching/i18n/navigation providers -- those (react-query with
// a persisted cache, the language context, the in-app navigation modal) moved to the Doctor Dekho
// app along with the patient portal.
export function Providers({ children }: { children: React.ReactNode }) {
  return <TooltipProvider>{children}</TooltipProvider>;
}
