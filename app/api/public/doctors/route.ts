import { NextRequest, NextResponse } from "next/server";
import { easyhmsFetch } from "@/lib/api/server";

export const dynamic = "force-dynamic";

// GET /api/public/doctors?page=&pageSize=&city=&state=&specialtyCategory=&search=
//   →  proxies GET {EASYHMS}/public/doctors with the same query string, passed through
//   verbatim — the paginated/filtered browsing UI (useDoctors' useInfiniteQuery) and the
//   pageSize=2000 "give me everything" SSR calls (server.ts) both rely on this forwarding
//   exactly as sent, rather than this route re-deriving or defaulting anything itself.
// Public, anonymous, identical-for-every-caller data (see GetPublicDoctorsHandler's own
// comment) — safe for a CDN/edge proxy to cache. 30s roughly matches the backend's own
// per-filter-combo in-memory cache TTL, so this rarely serves anything the origin
// wouldn't have answered from cache anyway; stale-while-revalidate covers the gap while a
// fresh copy is fetched, and complements rather than fights the existing service worker's
// NetworkFirst caching for /api/public/* in app/sw.ts (that one's about offline/slow-network
// resilience in the browser, this one's about not re-hitting the origin on every request).
const CACHE_CONTROL = "public, s-maxage=30, stale-while-revalidate=120";

export async function GET(req: NextRequest) {
  const qs = req.nextUrl.search; // includes the leading "?" (or "" if no params)
  const r = await easyhmsFetch(`/public/doctors${qs}`);
  if (r.notConfigured) {
    return NextResponse.json({ notConfigured: true, doctors: [], page: 1, pageSize: 24, totalCount: 0 });
  }
  return NextResponse.json(r.data, { status: r.status, headers: { "Cache-Control": CACHE_CONTROL } });
}
