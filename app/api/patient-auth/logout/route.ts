import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { easyhmsFetch } from "@/lib/api/server";
import { PATIENT_SESSION_COOKIE } from "@/lib/api/patientSession";

export const dynamic = "force-dynamic";

// POST /api/patient-auth/logout — bumps the session epoch server-side (see PatientLogoutHandler,
// real revocation, not just deleting a client-side value) and always clears the local cookie
// regardless of whether the upstream call succeeds, so the user is never stuck "logged in" here.
export async function POST(_req: NextRequest) {
  const token = cookies().get(PATIENT_SESSION_COOKIE)?.value;

  if (token) {
    try {
      await easyhmsFetch("/public/patient-auth/logout", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch {
      /* best-effort — still clear the local cookie below */
    }
  }

  const res = NextResponse.json({ success: true });
  res.cookies.delete(PATIENT_SESSION_COOKIE);
  return res;
}
