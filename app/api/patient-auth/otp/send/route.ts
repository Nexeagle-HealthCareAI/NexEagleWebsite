import { NextRequest, NextResponse } from "next/server";
import { easyhmsFetch } from "@/lib/api/server";

export const dynamic = "force-dynamic";

// POST /api/patient-auth/otp/send  →  proxies POST {EASYHMS}/public/patient-auth/otp/send
export async function POST(req: NextRequest) {
  const body = await req.json();
  const r = await easyhmsFetch("/public/patient-auth/otp/send", {
    method: "POST",
    body: JSON.stringify(body),
  });
  if (r.notConfigured) {
    return NextResponse.json({ notConfigured: true });
  }
  return NextResponse.json(r.data, { status: r.status });
}
