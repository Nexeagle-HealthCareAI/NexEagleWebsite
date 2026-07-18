import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { easyhmsFetch } from "@/lib/api/server";
import { PATIENT_SESSION_COOKIE } from "@/lib/api/patientSession";

export const dynamic = "force-dynamic";

// GET /api/public/appointments/mine  →  proxies GET {EASYHMS}/public/appointments/mine
// Doubles as the client's "am I logged in" check — the frontend calls this on load and treats a
// 401 as logged-out, rather than maintaining separate login-state logic on top of this call.
export async function GET(_req: NextRequest) {
  const token = cookies().get(PATIENT_SESSION_COOKIE)?.value;
  if (!token) {
    return NextResponse.json({ loggedIn: false, appointments: [] }, { status: 401 });
  }

  const r = await easyhmsFetch("/public/appointments/mine", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (r.notConfigured) {
    return NextResponse.json({ notConfigured: true });
  }
  if (!r.ok) {
    // Token invalid/expired/revoked — clear the stale cookie so the client doesn't keep retrying.
    const res = NextResponse.json({ loggedIn: false, appointments: [] }, { status: r.status });
    res.cookies.delete(PATIENT_SESSION_COOKIE);
    return res;
  }

  return NextResponse.json({ loggedIn: true, ...(r.data as object) }, { status: 200 });
}
