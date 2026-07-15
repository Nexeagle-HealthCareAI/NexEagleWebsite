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
  city?: string | null;
  state?: string | null;
  // GPS pin for a "get directions" link — inherited from the hospital, since a doctor
  // doesn't have their own address.
  latitude?: number | null;
  longitude?: number | null;
  // Computed from real, patient-submitted DoctorReviews — undefined/0 when the doctor
  // has no reviews yet.
  rating?: number | null;
  reviewCount?: number | null;
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

// Matches GetPublicDoctorReviewsResponseModel / PublicReviewItem.
export interface ReviewDto {
  reviewId: string;
  authorName?: string | null;
  rating: number;
  comment: string;
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
// DoctorId/IpAddress come from the URL/connection server-side, never sent from here.
export interface SubmitReviewRequest {
  authorName?: string;
  rating: number;
  comment: string;
}

export interface SubmitReviewResponseDto {
  success: boolean;
  message?: string | null;
  reviewId?: string | null;
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
  };
  preferredDate: string; // YYYY-MM-DD
  preferredTime?: string; // "HH:mm:ss", optional/non-binding
  reason?: string;
  // Booking-attribution metadata — only knowable client-side.
  referrerUrl?: string;
  utmCampaign?: string;
}
