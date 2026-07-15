import { NextRequest, NextResponse } from "next/server";
import { easyhmsFetch } from "@/lib/api/server";

export const dynamic = "force-dynamic";

// GET /api/public/doctors/{doctorId}/availability?date=YYYY-MM-DD
//   →  proxies GET {EASYHMS}/public/doctors/{doctorId}/availability?date=…
export async function GET(
  req: NextRequest,
  { params }: { params: { doctorId: string } }
) {
  const date = req.nextUrl.searchParams.get("date") ?? "";
  const r = await easyhmsFetch(
    `/public/doctors/${encodeURIComponent(params.doctorId)}/availability?date=${encodeURIComponent(date)}`
  );
  if (r.notConfigured) {
    return NextResponse.json({ notConfigured: true });
  }
  return NextResponse.json(r.data, { status: r.status });
}
