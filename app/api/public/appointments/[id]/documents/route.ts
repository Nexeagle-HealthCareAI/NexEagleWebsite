import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { easyhmsFetch } from "@/lib/api/server";
import { PATIENT_SESSION_COOKIE } from "@/lib/api/patientSession";

export const dynamic = "force-dynamic";

// GET /api/public/appointments/[id]/documents  →  proxies GET {EASYHMS}/public/appointments/{id}/documents
// Login-gated like /mine — the backend re-checks that this mobile actually owns the appointment
// before returning any documents, so a guessed/adjacent id can't leak someone else's reports.
export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const token = cookies().get(PATIENT_SESSION_COOKIE)?.value;
  if (!token) {
    return NextResponse.json({ success: false, message: "Please log in again.", documents: [] }, { status: 401 });
  }

  const r = await easyhmsFetch(`/public/appointments/${encodeURIComponent(params.id)}/documents`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (r.notConfigured) {
    return NextResponse.json({ notConfigured: true });
  }
  return NextResponse.json(r.data, { status: r.status });
}
