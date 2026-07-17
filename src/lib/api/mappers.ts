// ─────────────────────────────────────────────────────────────────────────────
// Map raw EasyHMS DTOs → the UI's Doctor / availability shapes.
//
// The UI components only ever read the mapped types (from src/data/patient.ts),
// so if the backend field names differ, this is the ONLY file to adjust.
// ─────────────────────────────────────────────────────────────────────────────

import type { Doctor, Specialty } from "@/data/patient";
import { specialties } from "@/data/patient";
import type {
  AvailabilityDto,
  DoctorDto,
  CreateAppointmentResponseDto,
} from "./types";

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

function initialsFrom(name: string): string {
  const parts = name.replace(/^Dr\.?\s*/i, "").trim().split(/\s+/);
  return (parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "");
}

function hashIndex(seed: string, len: number): number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return h % len;
}

/** Match a free-text department/specialization string to one of our taxonomy ids. */
function matchSpecialtyId(name: string): { id: string; label: string } {
  const norm = name.trim().toLowerCase();
  const found: Specialty | undefined = specialties.find(
    (s) => s.name.toLowerCase() === norm || s.id === norm || norm.includes(s.id)
  );
  if (found) return { id: found.id, label: found.name };
  return { id: norm.replace(/\s+/g, "-") || "other", label: name };
}

// Maps dbo.MedicalSpecialities.PatientFacingCategory (see seed_medical_specialities.sql) to
// our local Specialty.id — an authoritative alternative to matchSpecialtyId's fuzzy
// department-name guessing, used whenever a doctor has a primary speciality linked on their
// profile. Two DB categories ("Gastroenterologist" / "GI/Surgical Gastroenterologist") fold
// into the one "gastroenterology" tile, since patients don't search medical-vs-surgical GI
// separately.
const PATIENT_CATEGORY_TO_SPECIALTY_ID: Record<string, string> = {
  "General Physician": "general",
  "Paediatrician": "pediatrics",
  "Gynaecologist": "gynecology",
  "Dermatologist (Skin)": "dermatology",
  "ENT Specialist": "ent",
  "Ophthalmologist (Eye)": "ophthalmology",
  "Orthopaedic Surgeon (Bone)": "orthopedics",
  "Cardiologist (Heart)": "cardiology",
  "Neurologist": "neurology",
  "Neurosurgeon": "neurosurgery",
  "Psychiatrist": "psychiatry",
  "Urologist": "urology",
  "Gastroenterologist": "gastroenterology",
  "GI/Surgical Gastroenterologist": "gastroenterology",
  "Pulmonologist (Chest/Lungs)": "pulmonology",
  "Oncologist (Cancer)": "oncology",
  "Nephrologist (Kidney)": "nephrology",
  "Endocrinologist (Hormones/Diabetes)": "endocrinology",
  "Rheumatologist": "rheumatology",
  "Plastic Surgeon": "plasticsurgery",
  "Vascular Surgeon": "vascularsurgery",
  "Cardiothoracic Surgeon": "cardiothoracicsurgery",
  "Anaesthesiologist": "anesthesiology",
  "Radiologist": "radiology",
  "Pathologist": "pathology",
  "Emergency Medicine Specialist": "emergencymedicine",
  "Physiotherapist / Rehab": "physiotherapy",
  "Geriatrician": "geriatrics",
  "Sports Medicine Specialist": "sportsmedicine",
  "General Surgeon": "generalsurgery",
};

/** Resolve a doctor's specialtyId/label — prefers the authoritative MedicalSpeciality link
 * (primaryMedicalSpecialityCategory) when the doctor has one, falling back to fuzzy-matching
 * departmentName/specializations for doctors who don't (the vast majority, until hospitals
 * adopt the new "Primary Speciality" picker on the doctor profile form). */
function resolveSpecialty(dto: DoctorDto): { id: string; label: string } {
  const category = dto.primaryMedicalSpecialityCategory?.trim();
  const specialtyId = category ? PATIENT_CATEGORY_TO_SPECIALTY_ID[category] : undefined;
  if (specialtyId) {
    const matched = specialties.find((s) => s.id === specialtyId);
    return { id: specialtyId, label: dto.primaryMedicalSpecialityPatientFacingName?.trim() || matched?.name || category! };
  }
  const specialtyRaw = dto.departmentName?.trim() || dto.specializations?.[0] || "General Physician";
  return matchSpecialtyId(specialtyRaw);
}

export function mapDoctor(dto: DoctorDto): Doctor {
  const id = String(dto.doctorId);
  const name = dto.fullName?.trim() || "Doctor";
  const { id: specialtyId, label: specialty } = resolveSpecialty(dto);

  return {
    id,
    name,
    photo: dto.photoUrl ?? undefined,
    gradient: GRADIENTS[hashIndex(id, GRADIENTS.length)],
    initials: initialsFrom(name).toUpperCase() || "DR",
    specialtyId,
    specialty,
    qualifications: dto.qualification ?? "",
    experienceYears: dto.experienceYears ?? 0,
    about: dto.bio ?? "",
    focusAreas: dto.specializations ?? [],
    verified: true,
    promoted: false,

    // The real public API doesn't return per-doctor patient counts or sub-locality (area) —
    // left undefined/empty so the UI hides these sections instead of showing fake zero values —
    // see DoctorCard.tsx's conditional rendering. hospitalName/address/city/state/pincode/
    // languages/latitude/longitude/rating/reviewCount/fee ARE real, backed by the hospital's
    // own profile / actual submitted DoctorReviews / DoctorFees.
    rating: dto.rating ?? undefined,
    reviewCount: dto.reviewCount ?? undefined,
    patientsServed: undefined,
    recommendationPct: undefined,
    waitTimeMins: undefined,
    fee: dto.fee ?? undefined,
    hospitalName: dto.hospitalName ?? undefined,
    address: dto.address ?? undefined,
    city: dto.city ?? "",
    state: dto.state ?? "",
    pincode: dto.pincode ?? undefined,
    area: "",
    clinic: "",
    languages: dto.languages ?? [],
    latitude: dto.latitude ?? undefined,
    longitude: dto.longitude ?? undefined,
    nextAvailable: "",
  };
}

export function mapDoctors(list: DoctorDto[] | undefined): Doctor[] {
  return (list ?? []).map(mapDoctor);
}

export interface AvailabilityWindow {
  /** Display label, e.g. "Morning (09:00 – 13:00)". */
  label: string;
  /** Raw "HH:mm:ss" shift start, for preferredTime — undefined for the mock fallback. */
  startTime?: string;
}

export interface AvailabilityResult {
  isAvailable: boolean;
  reason?: string;
  windows: AvailabilityWindow[];
}

const formatTime = (t?: string | null) => (t ? t.slice(0, 5) : "");

/** Normalise the availability response into display-ready shift windows. */
export function mapAvailability(dto: AvailabilityDto | undefined): AvailabilityResult {
  if (!dto) return { isAvailable: false, windows: [] };

  const windows = (dto.shifts ?? [])
    .filter((s) => s.startTime && s.endTime)
    .map((s) => {
      const label = s.name?.trim();
      const range = `${formatTime(s.startTime)} – ${formatTime(s.endTime)}`;
      return { label: label ? `${label} (${range})` : range, startTime: s.startTime ?? undefined };
    });

  return { isAvailable: dto.isAvailable, reason: dto.reason ?? undefined, windows };
}

/** Pull a display booking reference out of the create-appointment response. */
export function mapBookingReference(dto: CreateAppointmentResponseDto | undefined): string | null {
  if (!dto) return null;
  const ref = dto.appointmentId ?? dto.patientId;
  return ref !== undefined && ref !== null ? String(ref) : null;
}
