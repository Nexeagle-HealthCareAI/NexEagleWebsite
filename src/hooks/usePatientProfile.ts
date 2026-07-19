"use client";

import { useQuery } from "@tanstack/react-query";

export interface PatientProfile {
  success: boolean;
  message?: string;
  fullName?: string | null;
  age?: number | null;
  ageUnit?: string | null;
  sex?: string | null;
  email?: string | null;
  guardianName?: string | null;
  guardianRelation?: string | null;
}

async function fetchPatientProfile(): Promise<PatientProfile> {
  const res = await fetch("/api/public/patients/me");
  return res.json();
}

/** Read-only "Personal Information" — only meaningful once logged in, so callers should gate
 * `enabled` on usePatientAuth().isLoggedIn rather than fetching this on every page load. */
export function usePatientProfile(enabled: boolean) {
  return useQuery({
    queryKey: ["patient-auth", "profile"],
    queryFn: fetchPatientProfile,
    enabled,
    staleTime: 60_000,
    retry: false,
  });
}
