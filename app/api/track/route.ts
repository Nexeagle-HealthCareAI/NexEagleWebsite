import { NextRequest, NextResponse } from "next/server";
import { easyhmsFetch } from "@/lib/api/server";

export const dynamic = "force-dynamic";

// POST /api/track  ->  batched page-view beacons from src/lib/analytics.ts ({ visits: [...] }),
// fanned out server-side to {EASYHMS}/public/track-visit. The corporate site records page views
// only, so any events/leads in a batch are ignored. Sizes are capped; the old
// single-beacon routes stay for clients still running a cached older build. Always 200: a visitor
// must never see an error because analytics recording had a bad moment.
const LIMITS = { visits: 5 } as const;
const UPSTREAM = { visits: "/public/track-visit" } as const;

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<Record<keyof typeof LIMITS, unknown>>;
    const calls: Promise<unknown>[] = [];
    for (const kind of Object.keys(LIMITS) as (keyof typeof LIMITS)[]) {
      const items = Array.isArray(body?.[kind]) ? (body[kind] as unknown[]) : [];
      for (const item of items.slice(0, LIMITS[kind])) {
        if (item && typeof item === "object") {
          calls.push(easyhmsFetch(UPSTREAM[kind], { method: "POST", body: JSON.stringify(item) }));
        }
      }
    }
    await Promise.allSettled(calls);
  } catch {
    // Best-effort — malformed body or upstream failure never surfaces to the visitor.
  }
  return NextResponse.json({ ok: true });
}
