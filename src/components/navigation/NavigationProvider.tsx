"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { NAVIGATION_AVAILABLE, googleMapsUrl, type NavDestination } from "@/lib/navigation";

// mapbox-gl is ~200KB+ and only needed once someone actually asks for directions, so the modal
// is split into its own chunk and never rendered (or downloaded) until then.
const NavigationModal = dynamic(() => import("./NavigationModal"), { ssr: false });

interface NavigationContextValue {
  /** Opens the in-page route + turn-by-turn overlay for a destination. */
  openNavigation: (destination: NavDestination) => void;
}

const openGoogleMaps = (destination: NavDestination) =>
  window.open(googleMapsUrl(destination), "_blank", "noopener,noreferrer");

// Default value = the old behaviour (hand off to Google Maps), so a component rendered outside
// the provider -- or on a deployment with no Mapbox token -- still gets working directions.
const NavigationContext = createContext<NavigationContextValue>({ openNavigation: openGoogleMaps });

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const [destination, setDestination] = useState<NavDestination | null>(null);

  const openNavigation = useCallback((next: NavDestination) => {
    if (!NAVIGATION_AVAILABLE) {
      openGoogleMaps(next);
      return;
    }
    setDestination(next);
  }, []);

  const close = useCallback(() => setDestination(null), []);
  const value = useMemo(() => ({ openNavigation }), [openNavigation]);

  return (
    <NavigationContext.Provider value={value}>
      {children}
      {destination && <NavigationModal destination={destination} onClose={close} />}
    </NavigationContext.Provider>
  );
}

export function useNavigation(): NavigationContextValue {
  return useContext(NavigationContext);
}
