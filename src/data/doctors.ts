// Shared doctor types for the appointment-booking UI.
// The real list is served by the nexeagle-api backend via getDoctors().
// The fallback below is only used if the backend is unreachable during dev,
// so the directory page still renders something instead of an empty screen.

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  qualifications?: string;
  location: string;
  clinic?: string;
  photo?: string;
  experienceYears?: number;
  languages?: string[];
  fee?: number;
  rating?: number;
  reviewCount?: number;
  patientsTreated?: number;
  availableSlots: string[];
}

export const FALLBACK_DOCTORS: Doctor[] = [
  {
    id: "doc-anita-sharma",
    name: "Dr. Anita Sharma",
    specialty: "Cardiology",
    qualifications: "MBBS, MD, DM (Cardiology)",
    location: "Kolkata",
    clinic: "Care Heart Institute",
    experienceYears: 14,
    languages: ["English", "Hindi", "Bengali"],
    fee: 800,
    rating: 4.8,
    reviewCount: 326,
    patientsTreated: 12400,
    availableSlots: ["09:30-10:00", "10:00-10:30", "11:00-11:30", "16:00-16:30"],
  },
  {
    id: "doc-meera-nair",
    name: "Dr. Meera Nair",
    specialty: "Pediatrics",
    qualifications: "MBBS, MD (Pediatrics)",
    location: "Bengaluru",
    clinic: "Little Steps Children's Hospital",
    experienceYears: 12,
    languages: ["English", "Kannada", "Malayalam"],
    fee: 700,
    rating: 4.9,
    reviewCount: 412,
    patientsTreated: 15800,
    availableSlots: ["09:00-09:30", "09:30-10:00", "12:00-12:30", "15:00-15:30"],
  },
];
