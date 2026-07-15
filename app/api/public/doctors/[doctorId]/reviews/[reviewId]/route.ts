import { NextRequest, NextResponse } from "next/server";
import { easyhmsFetch } from "@/lib/api/server";

export const dynamic = "force-dynamic";

// PATCH /api/public/doctors/{doctorId}/reviews/{reviewId}
//   →  proxies PATCH {EASYHMS}/public/doctors/{doctorId}/reviews/{reviewId}
// Attaches a comment to an already-submitted rating-only review.
export async function PATCH(
  req: NextRequest,
  { params }: { params: { doctorId: string; reviewId: string } }
) {
  const body = await req.json();
  const r = await easyhmsFetch(
    `/public/doctors/${encodeURIComponent(params.doctorId)}/reviews/${encodeURIComponent(params.reviewId)}`,
    { method: "PATCH", body: JSON.stringify(body) }
  );
  if (r.notConfigured) {
    return NextResponse.json({ notConfigured: true });
  }
  return NextResponse.json(r.data, { status: r.status });
}
