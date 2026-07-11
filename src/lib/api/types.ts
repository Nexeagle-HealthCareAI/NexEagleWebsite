// ─────────────────────────────────────────────────────────────────────────────
// Raw DTO shapes returned by the EasyHMS public API.
//
// These are best-effort guesses — the mappers (mappers.ts) read several possible
// field names so the UI keeps working regardless of exact casing. Once you have
// the real Swagger shapes, tighten these types and trim the fallbacks.
// ─────────────────────────────────────────────────────────────────────────────

export interface DoctorDto {
  id?: string | number;
  doctorId?: string | number;
  name?: string;
  fullName?: string;
  photo?: string;
  photoUrl?: string;
  imageUrl?: string;

  specialty?: string;
  speciality?: string;
  department?: string;

  qualification?: string;
  qualifications?: string;

  experienceYears?: number;
  experience?: number;

  // Promotion / KPI fields (may be absent — mapper falls back to 0/omit).
  rating?: number;
  reviewCount?: number;
  ratingCount?: number;
  patientsServed?: number;
  recommendationPct?: number;
  waitTimeMins?: number;

  consultationFee?: number;
  fee?: number;

  city?: string;
  state?: string;
  area?: string;
  clinic?: string;
  clinicName?: string;

  languages?: string[] | string;
  focusAreas?: string[] | string;

  verified?: boolean;
  nextAvailable?: string;

  [key: string]: unknown;
}

export interface AvailabilityDto {
  doctorId?: string | number;
  date?: string;
  isWorking?: boolean;
  available?: boolean;
  // The API may express windows as plain strings or shift objects.
  windows?: string[];
  slots?: string[];
  shifts?: Array<{ label?: string; name?: string; start?: string; end?: string }>;
  [key: string]: unknown;
}

export interface CreateAppointmentResponseDto {
  id?: string | number;
  appointmentId?: string | number;
  preAppointmentId?: string | number;
  reference?: string;
  referenceNo?: string;
  bookingId?: string;
  status?: string;
  [key: string]: unknown;
}

/** Body we send to POST /public/appointments. Align keys with the backend. */
export interface CreateAppointmentRequest {
  doctorId: string;
  date: string; // YYYY-MM-DD
  window: string; // selected 1-hour arrival window
  patient: {
    name: string;
    phone: string;
    age: string;
    gender: string;
    reason: string;
  };
}
