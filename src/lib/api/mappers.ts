// ─────────────────────────────────────────────────────────────────────────────
// Map raw EasyHMS DTOs → the UI's Doctor / window shapes.
//
// The UI components only ever read the mapped types (from src/data/patient.ts),
// so if the backend field names differ, this is the ONLY file to adjust.
// ─────────────────────────────────────────────────────────────────────────────

import type { Doctor, Specialty } from "@/data/patient";
import { specialties } from "@/data/patient";
import type { AvailabilityDto, DoctorDto, CreateAppointmentResponseDto } from "./types";

const GRADIENTS = [
  "from-teal-500 to-emerald-500",
  "from-rose-500 to-red-500",
  "from-amber-500 to-orange-500",
  "from-fuchsia-500 to-purple-500",
  "from-sky-500 to-blue-500",
  "from-pink-500 to-rose-500",
  "from-indigo-500 to-violet-500",
  "from-violet-500 to-purple-500",
];

function pick<T>(...vals: (T | undefined | null)[]): T | undefined {
  return vals.find((v) => v !== undefined && v !== null) ?? undefined;
}

function toArray(v: string[] | string | undefined): string[] {
  if (Array.isArray(v)) return v;
  if (typeof v === "string") return v.split(",").map((s) => s.trim()).filter(Boolean);
  return [];
}

function initialsFrom(name: string): string {
  const parts = name.replace(/^Dr\.?\s*/i, "").trim().split(/\s+/);
  return (parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "");
}

function hashIndex(seed: string, len: number): number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return h % len;
}

/** Match a free-text specialty string to one of our taxonomy ids. */
function matchSpecialtyId(name: string): { id: string; label: string } {
  const norm = name.trim().toLowerCase();
  const found: Specialty | undefined = specialties.find(
    (s) => s.name.toLowerCase() === norm || s.id === norm || norm.includes(s.id)
  );
  if (found) return { id: found.id, label: found.name };
  return { id: norm.replace(/\s+/g, "-") || "other", label: name };
}

export function mapDoctor(dto: DoctorDto): Doctor {
  const id = String(pick(dto.id, dto.doctorId) ?? crypto.randomUUID());
  const name = pick(dto.name, dto.fullName) ?? "Doctor";
  const specialtyRaw = pick(dto.specialty, dto.speciality, dto.department) ?? "General Physician";
  const { id: specialtyId, label: specialty } = matchSpecialtyId(specialtyRaw);

  return {
    id,
    name,
    photo: pick(dto.photo, dto.photoUrl, dto.imageUrl),
    gradient: GRADIENTS[hashIndex(id, GRADIENTS.length)],
    initials: initialsFrom(name).toUpperCase() || "DR",
    specialtyId,
    specialty,
    qualifications: pick(dto.qualification, dto.qualifications) ?? "",
    experienceYears: pick(dto.experienceYears, dto.experience) ?? 0,

    rating: dto.rating ?? 0,
    reviewCount: pick(dto.reviewCount, dto.ratingCount) ?? 0,
    patientsServed: dto.patientsServed ?? 0,
    recommendationPct: dto.recommendationPct ?? 0,
    waitTimeMins: dto.waitTimeMins ?? 0,

    fee: pick(dto.consultationFee, dto.fee) ?? 0,
    // Keep city+state together — never resolve/match on city name alone (see
    // the CityOption note in src/data/patient.ts).
    city: dto.city ?? "",
    state: dto.state ?? "",
    area: dto.area ?? "",
    clinic: pick(dto.clinic, dto.clinicName) ?? "",
    languages: toArray(dto.languages),
    nextAvailable: dto.nextAvailable ?? "",
    verified: dto.verified ?? true,
    promoted: false,
    about: "",
    focusAreas: toArray(dto.focusAreas),
  };
}

export function mapDoctors(list: DoctorDto[] | undefined): Doctor[] {
  return (list ?? []).map(mapDoctor);
}

export interface AvailabilityResult {
  isWorking: boolean;
  windows: string[];
}

/** Normalise the availability response into arrival-window strings. */
export function mapAvailability(dto: AvailabilityDto | undefined): AvailabilityResult {
  if (!dto) return { isWorking: false, windows: [] };

  let windows: string[] = [];
  if (Array.isArray(dto.windows)) windows = dto.windows;
  else if (Array.isArray(dto.slots)) windows = dto.slots;
  else if (Array.isArray(dto.shifts)) {
    windows = dto.shifts.map((s) =>
      pick(s.label, s.name) ??
      (s.start && s.end ? `${s.start} – ${s.end}` : "")
    ).filter(Boolean);
  }

  const isWorking = pick(dto.isWorking, dto.available) ?? windows.length > 0;
  return { isWorking, windows };
}

/** Pull a display booking reference out of the create-appointment response. */
export function mapBookingReference(dto: CreateAppointmentResponseDto | undefined): string | null {
  if (!dto) return null;
  const ref = pick(dto.reference, dto.referenceNo, dto.bookingId, dto.preAppointmentId, dto.appointmentId, dto.id);
  return ref !== undefined ? String(ref) : null;
}
