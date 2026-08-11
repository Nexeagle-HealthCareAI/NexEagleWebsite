import { NextRequest, NextResponse } from "next/server";
import { easyhmsFetch } from "@/lib/api/server";

export const dynamic = "force-dynamic";

// POST /api/leads  →  proxies POST {EASYHMS}/public/leads
// Fire-and-forget hospital-scoped marketing-lead beacon (see src/lib/analytics.ts's
// recordLead) — same trusted-proxy IP mechanism as /api/track-event. Always returns 200
// regardless of upstream outcome.
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    await easyhmsFetch("/public/leads", {
      method: "POST",
      body: JSON.stringify(body),
    });
  } catch {
    // Best-effort — never fail the request because the upstream call threw.
  }
  return NextResponse.json({ ok: true });
}
