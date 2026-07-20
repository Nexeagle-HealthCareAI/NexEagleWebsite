import { NextRequest, NextResponse } from "next/server";
import { easyhmsFetch } from "@/lib/api/server";

export const dynamic = "force-dynamic";

// POST /api/track-event  →  proxies POST {EASYHMS}/public/track-event
// Fire-and-forget funnel/behavior event beacon (see src/lib/analytics.ts) — same trusted-proxy IP
// mechanism as /api/track-visit. Always returns 200 regardless of upstream outcome.
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    await easyhmsFetch("/public/track-event", {
      method: "POST",
      body: JSON.stringify(body),
    });
  } catch {
    // Best-effort — never fail the request because the upstream call threw.
  }
  return NextResponse.json({ ok: true });
}
