import { NextResponse } from "next/server";
import { easyhmsFetch } from "@/lib/api/server";

export const dynamic = "force-dynamic";

// GET /api/public/doctors  →  proxies GET {EASYHMS}/public/doctors
export async function GET() {
  const r = await easyhmsFetch("/public/doctors");
  if (r.notConfigured) {
    return NextResponse.json({ notConfigured: true, doctors: [] });
  }
  return NextResponse.json(r.data, { status: r.status });
}
