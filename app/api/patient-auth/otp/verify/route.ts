import { NextRequest, NextResponse } from "next/server";
import { easyhmsFetch } from "@/lib/api/server";
import { PATIENT_SESSION_COOKIE, patientSessionCookieOptions } from "@/lib/api/patientSession";

export const dynamic = "force-dynamic";

interface PatientOtpVerifyResponse {
  success: boolean;
  message: string;
  accessToken?: string | null;
  mobile?: string | null;
}

// POST /api/patient-auth/otp/verify  →  proxies POST {EASYHMS}/public/patient-auth/otp/verify
// On success, the JWT is set as an httpOnly cookie here and stripped from the JSON body — it
// never reaches client-side JS, only server route handlers can read it (see patientSession.ts).
export async function POST(req: NextRequest) {
  const body = await req.json();
  const r = await easyhmsFetch<PatientOtpVerifyResponse>("/public/patient-auth/otp/verify", {
    method: "POST",
    body: JSON.stringify(body),
  });
  if (r.notConfigured) {
    return NextResponse.json({ notConfigured: true });
  }

  const { accessToken, ...safeBody } = r.data ?? { success: false, message: "Verification failed." };
  const res = NextResponse.json(safeBody, { status: r.status });

  if (r.ok && accessToken) {
    res.cookies.set(PATIENT_SESSION_COOKIE, accessToken, patientSessionCookieOptions);
  }

  return res;
}
