"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "nexeagle_guest_appointments";
const STORAGE_VERSION = 1;

export interface GuestAppointmentEntry {
  appointmentId: string;
  /** The mobile number used at booking time — NOT for display, only so that logging in with a
   * WhatsApp OTP can tell "this booking is mine" from "this booking belongs to whoever last used
   * this browser" (see AppointmentsClient's merge logic) on a shared/borrowed device. */
  mobile: string;
  bookedAt: string;
}

interface StoredShape {
  version: number;
  entries: GuestAppointmentEntry[];
}

function readStorage(): GuestAppointmentEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as StoredShape | GuestAppointmentEntry[] | string[];
    // Back-compat: the original shape was a bare string[] of IDs with no mobile — those entries
    // can't be mobile-matched on login, so they're dropped rather than guessed at.
    if (Array.isArray(parsed)) return [];
    if (parsed.version === STORAGE_VERSION && Array.isArray(parsed.entries)) return parsed.entries;
    return [];
  } catch {
    return [];
  }
}

function writeStorage(entries: GuestAppointmentEntry[]): void {
  try {
    const payload: StoredShape = { version: STORAGE_VERSION, entries };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    /* best-effort — storage may be full/disabled (private browsing) */
  }
}

/** Guest-tier "my bookings" — appointments made on THIS device without logging in, looked up
 * later purely by AppointmentId (see GET /public/appointments/{id} on the backend, gated only by
 * the ID's own entropy, not any login). This is the local index of which IDs to look up. */
export function useGuestAppointments() {
  const [entries, setEntries] = useState<GuestAppointmentEntry[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setEntries(readStorage());
    setIsLoaded(true);
  }, []);

  const addAppointment = useCallback((appointmentId: string, mobile: string) => {
    setEntries((prev) => {
      if (prev.some((e) => e.appointmentId === appointmentId)) return prev;
      const next = [...prev, { appointmentId, mobile, bookedAt: new Date().toISOString() }];
      writeStorage(next);
      return next;
    });
  }, []);

  const clearAppointments = useCallback(() => {
    setEntries([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* best-effort */
    }
  }, []);

  return {
    entries,
    appointmentIds: entries.map((e) => e.appointmentId),
    hasAppointments: entries.length > 0,
    isLoaded,
    addAppointment,
    clearAppointments,
  };
}
