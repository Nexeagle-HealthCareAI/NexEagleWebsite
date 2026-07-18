import { NextRequest, NextResponse } from "next/server";
import { easyhmsFetch } from "@/lib/api/server";

export const dynamic = "force-dynamic";

// GET /api/public/appointments/[id]  →  proxies GET {EASYHMS}/public/appointments/{id}
// Guest "my booking" lookup — the AppointmentId itself (an unguessable GUID) is the only gate,
// no login required. See GetPublicAppointmentHandler on the backend for why the response is
// deliberately minimal (no patient name/mobile/reason-for-visit).
export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const r = await easyhmsFetch(`/public/appointments/${encodeURIComponent(params.id)}`);
  if (r.notConfigured) {
    return NextResponse.json({ notConfigured: true });
  }
  return NextResponse.json(r.data, { status: r.status });
}
