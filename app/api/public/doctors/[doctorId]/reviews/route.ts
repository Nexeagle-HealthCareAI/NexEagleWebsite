import { NextRequest, NextResponse } from "next/server";
import { easyhmsFetch } from "@/lib/api/server";

export const dynamic = "force-dynamic";

// GET /api/public/doctors/{doctorId}/reviews  →  proxies GET {EASYHMS}/public/doctors/{doctorId}/reviews
export async function GET(
  _req: NextRequest,
  { params }: { params: { doctorId: string } }
) {
  const r = await easyhmsFetch(`/public/doctors/${encodeURIComponent(params.doctorId)}/reviews`);
  if (r.notConfigured) {
    return NextResponse.json({ notConfigured: true });
  }
  return NextResponse.json(r.data, { status: r.status });
}

// POST /api/public/doctors/{doctorId}/reviews  →  proxies POST {EASYHMS}/public/doctors/{doctorId}/reviews
export async function POST(
  req: NextRequest,
  { params }: { params: { doctorId: string } }
) {
  const body = await req.json();
  const r = await easyhmsFetch(`/public/doctors/${encodeURIComponent(params.doctorId)}/reviews`, {
    method: "POST",
    body: JSON.stringify(body),
  });
  if (r.notConfigured) {
    return NextResponse.json({ notConfigured: true });
  }
  return NextResponse.json(r.data, { status: r.status });
}
