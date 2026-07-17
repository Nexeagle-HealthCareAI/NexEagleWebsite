// ─────────────────────────────────────────────────────────────────────────────
// DTO shapes for the EasyHMS public API, confirmed against the live backend
// (EasyHMSAPI.Api/Controllers/PublicController.cs + its response models):
//   GET  /public/doctors                              -> GetPublicDoctorsResponseModel
//   GET  /public/doctors/{doctorId}/availability?date= -> GetPublicDoctorAvailabilityResponseModel
//   POST /public/appointments                          -> PublicBookAppointmentRequestModel / …ResponseModel
// These are exact, not guesses — if the backend contract changes, update here.
//
// The directory is platform-wide: /public/doctors returns doctors from every
// hospital that has opted into public listing (Hospital.IsPubliclyListed), not one
// hospital scoped by the API key — hence hospitalId/hospitalName/city/state below.
// ─────────────────────────────────────────────────────────────────────────────

// Public-safe field set only — no license/registration/internal scheduling data.
export interface DoctorDto {
  doctorId: string;
  fullName?: string | null;
  photoUrl?: string | null;
  qualification?: string | null;
  experienceYears?: number | null;
  bio?: string | null;
  departmentName?: string | null;
  specializations?: string[] | null;
  languages?: string[] | null;
  hospitalId: string;
  hospitalName?: string | null;
  // Full street-level address as entered on the hospital's own profile — previously missing
  // from this DTO, so doctor cards could only ever show "City, State".
  address?: string | null;
  city?: string | null;
  state?: string | null;
  pincode?: string | null;
  // GPS pin for a "get directions" link — inherited from the hospital, since a doctor
  // doesn't have their own address.
  latitude?: number | null;
  longitude?: number | null;
  // Computed from real, patient-submitted DoctorReviews — undefined/0 when the doctor
  // has no reviews yet.
  rating?: number | null;
  reviewCount?: number | null;
  // OPD_CONSULT DoctorFees.Amount at this doctor's hospital — null when no active fee is
  // configured, in which case the UI falls back to "Accepting patients".
  fee?: number | null;
}

export interface DoctorsResponseDto {
  success: boolean;
  message?: string | null;
  doctors: DoctorDto[];
}

// "Is the doctor generally working this day" only — no granular open-slot list,
// since a public booking is a preferred-date/time request, not a claimed slot.
export interface ShiftDto {
  name?: string | null;
  startTime?: string | null; // "HH:mm:ss"
  endTime?: string | null;
}

export interface AvailabilityDto {
  success: boolean;
  message?: string | null;
  isAvailable: boolean;
  reason?: string | null;
  shifts: ShiftDto[];
}

export interface CreateAppointmentResponseDto {
  success: boolean;
  message?: string | null;
  appointmentId?: string | null;
  patientId?: string | null;
}

// Matches GetPublicDoctorReviewsResponseModel / PublicReviewItem. comment is optional — a
// quick "tap a star" rating has none until (optionally) attached via updateReviewComment.
export interface ReviewDto {
  reviewId: string;
  authorName?: string | null;
  rating: number;
  comment?: string | null;
  helpfulCount: number;
  createdAt: string; // ISO
}

export interface ReviewsResponseDto {
  success: boolean;
  message?: string | null;
  reviews: ReviewDto[];
  averageRating: number;
  reviewCount: number;
}

// Body sent to POST /public/doctors/{doctorId}/reviews — matches SubmitDoctorReviewRequestModel.
// DoctorId/IpAddress come from the URL/connection server-side, never sent from here. comment is
// optional — a quick star/emoji tap submits rating-only.
export interface SubmitReviewRequest {
  authorName?: string;
  rating: number;
  comment?: string;
  // Only sent by the post-booking rating flow (already collects a phone number for
  // booking, NOT OTP-verified) — hashed server-side, used as a soft one-rating-per-doctor
  // guard for that flow. Never sent by the anonymous doctor-page quick-rate flow.
  patientMobile?: string;
}

export interface SubmitReviewResponseDto {
  success: boolean;
  message?: string | null;
  reviewId?: string | null;
}

// Body sent to PATCH /public/doctors/{doctorId}/reviews/{reviewId} — matches
// UpdateReviewCommentRequestModel. Attaches a comment to an already-submitted rating-only
// review; the reviewId is the only "ownership" proof, same trust model as submitting.
export interface UpdateReviewCommentRequest {
  comment: string;
}

export interface UpdateReviewCommentResponseDto {
  success: boolean;
  message?: string | null;
}

export interface MarkReviewHelpfulResponseDto {
  success: boolean;
  message?: string | null;
  helpfulCount: number;
}

// Body sent to POST /public/appointments — matches PublicBookAppointmentRequestModel.
// HospitalId/IpAddress are resolved server-side by the backend from the API key /
// connection, never sent from here.
export interface CreateAppointmentRequest {
  doctorId: string;
  patient: {
    fullName: string;
    mobile: string;
    age?: number;
    ageUnit?: string;
    sex?: string;
    // Optional — same GuardianName/GuardianRelation fields the hospital-side PatientForm
    // already collects (PatientRegistration.GuardianName/GuardianRelation). guardianRelation
    // is only meaningful (and only sent) alongside a non-empty guardianName.
    guardianName?: string;
    guardianRelation?: string;
  };
  preferredDate: string; // YYYY-MM-DD
  preferredTime?: string; // "HH:mm:ss", optional/non-binding
  reason?: string;
  // Booking-attribution metadata — only knowable client-side.
  referrerUrl?: string;
  utmCampaign?: string;
}
