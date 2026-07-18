// Server-only — cookie config for the patient login session (WhatsApp OTP, "Doctor Dekho").
//
// httpOnly so client-side JS (and therefore any XSS on the site) can never read the token
// directly — only server route handlers can, which is why every authenticated call goes through
// an app/api/** proxy rather than the browser holding the JWT itself. 30-day maxAge matches the
// expiry easyHMSAPI's JwtAuthService bakes into the token itself; a session can still be revoked
// early via /api/patient-auth/logout (bumps SessionEpoch server-side).
export const PATIENT_SESSION_COOKIE = "nexeagle_patient_session";
const PATIENT_SESSION_MAX_AGE = 60 * 60 * 24 * 30;

export const patientSessionCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: PATIENT_SESSION_MAX_AGE,
};
