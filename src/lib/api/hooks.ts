"use client";

// ─────────────────────────────────────────────────────────────────────────────
// React Query hooks for the patient portal. They call our own /api/public/*
// proxy routes (which attach the hospital key server-side), then map the raw
// DTOs into the UI's Doctor / window shapes.
//
// When the upstream API isn't configured yet, the proxy returns
// `{ notConfigured: true }` and these hooks surface `notConfigured` so callers
// can fall back to the local mock data in src/data/patient.ts.
// ─────────────────────────────────────────────────────────────────────────────

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Doctor } from "@/data/patient";
import {
  mapAvailability,
  mapBookingReference,
  mapDoctors,
  type AvailabilityResult,
} from "./mappers";
import type { CreateAppointmentRequest, ReviewDto, SubmitReviewRequest } from "./types";

async function getJson(url: string): Promise<any> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}

// ── Doctors ──────────────────────────────────────────────────────────────────
export interface DoctorsResult {
  doctors: Doctor[];
  notConfigured: boolean;
}

// `seed` is server-fetched, already-filtered doctor data (see src/lib/api/server.ts's
// getAllDoctors + src/lib/filters/doctorLocation.ts) passed down as a prop from a
// page.tsx Server Component. Seeding `initialData` makes the FIRST render (server AND
// client hydration pass) show real doctors immediately, instead of an empty array
// while the client's own live re-fetch is still in flight.
export function useDoctors(seed?: DoctorsResult) {
  return useQuery<DoctorsResult>({
    queryKey: ["public", "doctors"],
    queryFn: async () => {
      const json = await getJson("/api/public/doctors");
      if (json?.notConfigured) return { doctors: [], notConfigured: true };
      // Accept either a bare array or { doctors: [...] }.
      const list = Array.isArray(json) ? json : json?.doctors ?? json?.data;
      return { doctors: mapDoctors(list), notConfigured: false };
    },
    initialData: seed,
    staleTime: 5 * 60 * 1000,
  });
}

// ── Availability ─────────────────────────────────────────────────────────────
export interface AvailabilityQuery extends AvailabilityResult {
  notConfigured: boolean;
}

export function useDoctorAvailability(doctorId: string | undefined, date: string | undefined) {
  return useQuery<AvailabilityQuery>({
    queryKey: ["public", "availability", doctorId, date],
    enabled: Boolean(doctorId && date),
    queryFn: async () => {
      const json = await getJson(
        `/api/public/doctors/${doctorId}/availability?date=${date}`
      );
      if (json?.notConfigured) return { isAvailable: false, windows: [], notConfigured: true };
      return { ...mapAvailability(json), notConfigured: false };
    },
  });
}

// ── Create appointment ───────────────────────────────────────────────────────
export interface CreateAppointmentResult {
  reference: string | null;
  notConfigured: boolean;
}

export function useCreateAppointment() {
  return useMutation<CreateAppointmentResult, Error, CreateAppointmentRequest>({
    mutationFn: async (body) => {
      const res = await fetch("/api/public/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error(`Booking failed: ${res.status}`);
      const json = await res.json();
      if (json?.notConfigured) return { reference: null, notConfigured: true };
      return { reference: mapBookingReference(json), notConfigured: false };
    },
  });
}

// ── Reviews ──────────────────────────────────────────────────────────────────
export interface ReviewsResult {
  reviews: ReviewDto[];
  averageRating: number;
  reviewCount: number;
  notConfigured: boolean;
}

export function useDoctorReviews(doctorId: string | undefined) {
  return useQuery<ReviewsResult>({
    queryKey: ["public", "reviews", doctorId],
    enabled: Boolean(doctorId),
    queryFn: async () => {
      const json = await getJson(`/api/public/doctors/${doctorId}/reviews`);
      if (json?.notConfigured) return { reviews: [], averageRating: 0, reviewCount: 0, notConfigured: true };
      return {
        reviews: json?.reviews ?? [],
        averageRating: json?.averageRating ?? 0,
        reviewCount: json?.reviewCount ?? 0,
        notConfigured: false,
      };
    },
  });
}

export function useSubmitReview(doctorId: string | undefined) {
  const queryClient = useQueryClient();
  return useMutation<{ success: boolean; reviewId: string | null; notConfigured: boolean }, Error, SubmitReviewRequest>({
    mutationFn: async (body) => {
      const res = await fetch(`/api/public/doctors/${doctorId}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      if (json?.notConfigured) return { success: false, reviewId: null, notConfigured: true };
      if (!res.ok || !json?.success) throw new Error(json?.message || `Review submission failed: ${res.status}`);
      return { success: true, reviewId: json?.reviewId ?? null, notConfigured: false };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["public", "reviews", doctorId] });
    },
  });
}

// Attaches a comment to a review already submitted via useSubmitReview — the reviewId returned
// from that call is the only thing needed (no login, matches the "anyone can submit" model).
export function useUpdateReviewComment(doctorId: string | undefined) {
  const queryClient = useQueryClient();
  return useMutation<{ success: boolean }, Error, { reviewId: string; comment: string }>({
    mutationFn: async ({ reviewId, comment }) => {
      const res = await fetch(`/api/public/doctors/${doctorId}/reviews/${reviewId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comment }),
      });
      const json = await res.json();
      if (!res.ok || !json?.success) throw new Error(json?.message || `Comment update failed: ${res.status}`);
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["public", "reviews", doctorId] });
    },
  });
}

export function useMarkReviewHelpful(doctorId: string | undefined) {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: async (reviewId) => {
      const res = await fetch(`/api/public/doctors/${doctorId}/reviews/${reviewId}/helpful`, {
        method: "POST",
      });
      if (!res.ok) throw new Error(`Marking helpful failed: ${res.status}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["public", "reviews", doctorId] });
    },
  });
}

// ── AI search fallback ──────────────────────────────────────────────────────
// Interprets free-text/voice-transcribed search into { specialtyId, city, keywords } —
// see app/api/search/parse/route.ts. Only meant to be called when the plain keyword
// search (DoctorDirectory.tsx) comes up empty; notConfigured lets the caller degrade to
// "no results" silently when ANTHROPIC_API_KEY isn't set, same convention as the other
// notConfigured-aware hooks above.
export interface SmartSearchIntent {
  specialtyId: string | null;
  city: string | null;
  keywords: string[];
  notConfigured: boolean;
}

export function useSmartSearch() {
  return useMutation<SmartSearchIntent, Error, string>({
    mutationFn: async (query) => {
      const res = await fetch("/api/search/parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const json = await res.json();
      if (json?.notConfigured) return { specialtyId: null, city: null, keywords: [], notConfigured: true };
      if (!res.ok) throw new Error(json?.error || `Search interpretation failed: ${res.status}`);
      return {
        specialtyId: json?.specialtyId ?? null,
        city: json?.city ?? null,
        keywords: Array.isArray(json?.keywords) ? json.keywords : [],
        notConfigured: false,
      };
    },
  });
}
