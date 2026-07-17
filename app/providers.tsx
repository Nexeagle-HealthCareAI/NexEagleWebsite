"use client";

import React, { useState } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { I18nProvider } from "@/lib/i18n/I18nContext";

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000,
            gcTime: ONE_DAY_MS,
            // Attempt the fetch regardless of navigator.onLine — that flag is
            // unreliable on flaky Indian mobile networks (often wrong in both
            // directions), so let the actual request/timeout decide instead of
            // pausing queries outright. Falls back to cached data either way.
            networkMode: "offlineFirst",
            retry: 1,
            refetchOnWindowFocus: false,
          },
          mutations: { networkMode: "offlineFirst" },
        },
      })
  );

  // localStorage-backed cache persistence — lets the last-fetched doctor list/
  // availability render instantly on a fresh page load (before any network
  // round-trip completes), not just on remount within the same session. Only
  // available client-side; SSR falls back to a plain, unpersisted provider below
  // (same context shape either way, so no hydration mismatch).
  const [persister] = useState(() =>
    typeof window !== "undefined"
      ? createSyncStoragePersister({ storage: window.localStorage, key: "nexeagle-query-cache" })
      : undefined
  );

  if (!persister) {
    return (
      <QueryClientProvider client={queryClient}>
        <I18nProvider>
          <TooltipProvider>{children}</TooltipProvider>
        </I18nProvider>
      </QueryClientProvider>
    );
  }

  return (
    <PersistQueryClientProvider client={queryClient} persistOptions={{ persister, maxAge: ONE_DAY_MS }}>
      <I18nProvider>
        <TooltipProvider>{children}</TooltipProvider>
      </I18nProvider>
    </PersistQueryClientProvider>
  );
}
