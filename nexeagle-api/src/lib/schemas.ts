import { z } from "zod";

/**
 * Single source of truth for the payload shapes exchanged between:
 *   website  ->  this relay API  ->  1HMS platform
 * These schemas double as the documented 1HMS integration contract (see README).
 */

// A doctor as exposed to the website (and as expected back from 1HMS when
// DOCTOR_SOURCE=onehms).
export const doctorSchema = z.object({
  id: z.string(),
  name: z.string(),
  specialty: z.string(),
  // Qualifications / area of expertise, e.g. "MBBS, MD (Cardiology)".
  qualifications: z.string().optional().default(""),
  location: z.string(),
  clinic: z.string().optional().default(""),
  photo: z.string().optional(),
  experienceYears: z.number().optional(),
  languages: z.array(z.string()).optional().default([]),
  fee: z.number().optional(),
  // Social proof shown on the doctor card.
  rating: z.number().min(0).max(5).optional(),
  reviewCount: z.number().int().min(0).optional(),
  patientsTreated: z.number().int().min(0).optional(),
  // Slots are ISO-like time labels the patient can pick, e.g. "10:00-10:30".
  availableSlots: z.array(z.string()).default([]),
});

export type Doctor = z.infer<typeof doctorSchema>;

export const doctorsSchema = z.array(doctorSchema);

// Booking submitted by a patient on the website.
export const appointmentInputSchema = z.object({
  doctorId: z.string().min(1),
  doctorName: z.string().min(1),
  specialty: z.string().default(""),
  location: z.string().default(""),
  clinic: z.string().optional().default(""),
  patient: z.object({
    name: z.string().min(1, "Name is required"),
    phone: z.string().min(6, "A valid phone number is required"),
    email: z.string().email("A valid email is required"),
  }),
  preferredDate: z.string().min(1, "Preferred date is required"), // YYYY-MM-DD
  preferredSlot: z.string().min(1, "Preferred slot is required"),
  reason: z.string().max(2000).optional().default(""),
});

export type AppointmentInput = z.infer<typeof appointmentInputSchema>;

// The exact payload forwarded to 1HMS (input + server-added fields).
export type OneHmsAppointment = AppointmentInput & {
  source: "nexeagle-website";
  createdAt: string;
};

// General site feedback.
export const feedbackInputSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("A valid email is required"),
  category: z.string().default("general"),
  rating: z.number().int().min(1).max(5).optional(),
  message: z.string().min(1, "Message is required").max(4000),
});

export type FeedbackInput = z.infer<typeof feedbackInputSchema>;
