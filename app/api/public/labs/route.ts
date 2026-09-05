import { NextRequest, NextResponse } from "next/server";
import { easyhmsFetch } from "@/lib/api/server";

export const dynamic = "force-dynamic";

// GET /api/public/labs?page=&pageSize=&city=&state=&search=&labId=
//   →  proxies GET {EASYHMS}/public/labs with the same query string, passed through
//   verbatim -- mirrors app/api/public/doctors/route.ts exactly.
// Public, anonymous, identical-for-every-caller data (see GetPublicLabsHandler's own
// cache) -- safe for a CDN/edge proxy to cache. 30s roughly matches the backend's own
// per-filter-combo in-memory cache TTL.
const CACHE_CONTROL = "public, s-maxage=30, stale-while-revalidate=120";

export async function GET(req: NextRequest) {
  const qs = req.nextUrl.search; // includes the leading "?" (or "" if no params)
  const r = await easyhmsFetch(`/public/labs${qs}`);
  if (r.notConfigured) {
    return NextResponse.json({ notConfigured: true, labs: [], page: 1, pageSize: 24, totalCount: 0 });
  }
  return NextResponse.json(r.data, { status: r.status, headers: { "Cache-Control": CACHE_CONTROL } });
}
