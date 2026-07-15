import { NextRequest, NextResponse } from "next/server";
import { easyhmsFetch } from "@/lib/api/server";

export const dynamic = "force-dynamic";

// POST /api/public/doctors/{doctorId}/reviews/{reviewId}/helpful
//   →  proxies POST {EASYHMS}/public/doctors/{doctorId}/reviews/{reviewId}/helpful
export async function POST(
  _req: NextRequest,
  { params }: { params: { doctorId: string; reviewId: string } }
) {
  const r = await easyhmsFetch(
    `/public/doctors/${encodeURIComponent(params.doctorId)}/reviews/${encodeURIComponent(params.reviewId)}/helpful`,
    { method: "POST" }
  );
  if (r.notConfigured) {
    return NextResponse.json({ notConfigured: true });
  }
  return NextResponse.json(r.data, { status: r.status });
}
