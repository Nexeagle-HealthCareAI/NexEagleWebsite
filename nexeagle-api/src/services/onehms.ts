import { config, isOneHmsConfigured } from "../config.js";
import {
  doctorsSchema,
  type Doctor,
  type OneHmsAppointment,
} from "../lib/schemas.js";

/**
 * The single integration point with the 1HMS platform.
 *
 * While 1HMS has no API yet, both functions degrade gracefully: reads fall back
 * to the caller's manual list and writes are logged. When 1HMS is ready, set
 * ONEHMS_API_URL / ONEHMS_API_KEY and these will call the real endpoints with
 * no changes required on the website side.
 */

function authHeaders(): Record<string, string> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (config.oneHms.apiKey) headers["X-Api-Key"] = config.oneHms.apiKey;
  return headers;
}

/** GET {ONEHMS_API_URL}/doctors — used when DOCTOR_SOURCE=onehms. */
export async function fetchDoctorsFromOneHMS(): Promise<Doctor[]> {
  if (!isOneHmsConfigured()) {
    console.warn(
      "[1HMS] DOCTOR_SOURCE=onehms but ONEHMS_API_URL is not set — returning empty list. " +
        "Set ONEHMS_API_URL or switch DOCTOR_SOURCE=manual."
    );
    return [];
  }

  const res = await fetch(`${config.oneHms.apiUrl}/doctors`, {
    headers: authHeaders(),
  });
  if (!res.ok) {
    throw new Error(`1HMS doctors fetch failed: ${res.status} ${res.statusText}`);
  }
  const data = await res.json();
  // Validate/normalize so a bad upstream shape can't crash the website.
  return doctorsSchema.parse(data);
}

export type NotifyResult =
  | { forwarded: true }
  | { forwarded: false; reason: string };

/** POST {ONEHMS_API_URL}/appointments — always attempted on a new booking. */
export async function notifyOneHMS(
  appointment: OneHmsAppointment
): Promise<NotifyResult> {
  if (!isOneHmsConfigured()) {
    console.info(
      "[1HMS] Not configured — booking stored locally, not forwarded:",
      appointment.doctorName,
      "for",
      appointment.patient.name
    );
    return { forwarded: false, reason: "1HMS not configured" };
  }

  const res = await fetch(`${config.oneHms.apiUrl}/appointments`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(appointment),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `1HMS appointment forward failed: ${res.status} ${res.statusText} ${text}`
    );
  }
  console.info("[1HMS] Booking forwarded for", appointment.doctorName);
  return { forwarded: true };
}
