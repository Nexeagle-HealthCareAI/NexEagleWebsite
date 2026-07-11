import { NextRequest, NextResponse } from "next/server";
import { easyhmsFetch } from "@/lib/api/server";

export const dynamic = "force-dynamic";

// POST /api/public/appointments  →  proxies POST {EASYHMS}/public/appointments
// Creates a PRE_APPOINTMENT; front-desk later confirms it and allocates a token.
export async function POST(req: NextRequest) {
  const body = await req.json();
  const r = await easyhmsFetch("/public/appointments", {
    method: "POST",
    body: JSON.stringify(body),
  });
  if (r.notConfigured) {
    return NextResponse.json({ notConfigured: true });
  }
  return NextResponse.json(r.data, { status: r.status });
}
