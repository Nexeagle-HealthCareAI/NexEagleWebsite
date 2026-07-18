"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "nexeagle_guest_appointments";

export function useGuestAppointments() {
  const [appointmentIds, setAppointmentIds] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setAppointmentIds(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to parse guest appointments from local storage", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Add a new appointment ID
  const addAppointmentId = useCallback((id: string) => {
    setAppointmentIds((prev) => {
      // Prevent duplicates
      if (prev.includes(id)) return prev;
      
      const next = [...prev, id];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  // Clear all appointments (useful for logout/testing)
  const clearAppointments = useCallback(() => {
    setAppointmentIds([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    appointmentIds,
    hasAppointments: appointmentIds.length > 0,
    isLoaded,
    addAppointmentId,
    clearAppointments
  };
}
