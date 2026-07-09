import type { Doctor } from "@/data/doctors";
import { FALLBACK_DOCTORS } from "@/data/doctors";

const API_BASE_URL =
  (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/$/, "") ||
  "http://localhost:4000";

async function postJson<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    let message = "Request failed. Please try again.";
    try {
      const data = await res.json();
      if (data?.error) message = data.error;
    } catch {
      /* keep default */
    }
    throw new Error(message);
  }

  return res.json() as Promise<T>;
}

/**
 * Fetch the doctor directory from the backend. The backend decides whether the
 * list comes from 1HMS or the manual seed (DOCTOR_SOURCE toggle). Falls back to
 * a small bundled list only if the backend can't be reached.
 */
export async function getDoctors(): Promise<Doctor[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/doctors`);
    if (!res.ok) throw new Error(`Failed to load doctors (${res.status})`);
    const data = (await res.json()) as { doctors: Doctor[] };
    return data.doctors ?? [];
  } catch (err) {
    console.warn("[api] getDoctors falling back to bundled list:", err);
    return FALLBACK_DOCTORS;
  }
}

export interface AppointmentPayload {
  doctorId: string;
  doctorName: string;
  specialty: string;
  location: string;
  clinic?: string;
  patient: { name: string; phone: string; email: string };
  preferredDate: string;
  preferredSlot: string;
  reason?: string;
}

export interface AppointmentResponse {
  id: string;
  status: string;
  forwardedToOneHms: boolean;
}

export function createAppointment(payload: AppointmentPayload) {
  return postJson<AppointmentResponse>("/api/appointments", payload);
}

export interface FeedbackPayload {
  name: string;
  email: string;
  category: string;
  rating?: number;
  message: string;
}

export function submitFeedback(payload: FeedbackPayload) {
  return postJson<{ id: string; status: string }>("/api/feedback", payload);
}
