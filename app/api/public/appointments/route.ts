import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { easyhmsFetch } from "@/lib/api/server";
import { PATIENT_SESSION_COOKIE } from "@/lib/api/patientSession";

export const dynamic = "force-dynamic";

// POST /api/public/appointments  →  proxies POST {EASYHMS}/public/appointments
// Creates a PRE_APPOINTMENT; front-desk later confirms it and allocates a token.
// Forwards the patient session token when present so the backend can tell a logged-in booking
// apart from a guest one (see Appointments.BookedByMobile) — entirely optional, a visitor with no
// session (or an expired one) still books fine as a guest, same as before this existed.
export async function POST(req: NextRequest) {
  const body = await req.json();
  const token = cookies().get(PATIENT_SESSION_COOKIE)?.value;
  const r = await easyhmsFetch("/public/appointments", {
    method: "POST",
    body: JSON.stringify(body),
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
  if (r.notConfigured) {
    return NextResponse.json({ notConfigured: true });
  }
  return NextResponse.json(r.data, { status: r.status });
}
