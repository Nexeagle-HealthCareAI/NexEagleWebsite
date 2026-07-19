import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { easyhmsFetch } from "@/lib/api/server";
import { PATIENT_SESSION_COOKIE } from "@/lib/api/patientSession";

export const dynamic = "force-dynamic";

// GET /api/public/patients/me  →  proxies GET {EASYHMS}/public/patients/me
// Read-only "Personal Information" for the profile page — same httpOnly-cookie session as
// /api/public/appointments/mine.
export async function GET(_req: NextRequest) {
  const token = cookies().get(PATIENT_SESSION_COOKIE)?.value;
  if (!token) {
    return NextResponse.json({ success: false, message: "Not logged in." }, { status: 401 });
  }

  const r = await easyhmsFetch("/public/patients/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (r.notConfigured) {
    return NextResponse.json({ notConfigured: true });
  }
  if (!r.ok) {
    const res = NextResponse.json({ success: false, message: "Session expired." }, { status: r.status });
    res.cookies.delete(PATIENT_SESSION_COOKIE);
    return res;
  }

  return NextResponse.json(r.data, { status: 200 });
}
