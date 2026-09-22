// ─────────────────────────────────────────────────────────────────────────────
// Server-only helper for talking to the EasyHMS public API.
//
// This site only uses it for the fire-and-forget page-view beacon (app/api/track-visit). The
// patient-facing doctor/lab/appointment calls live in the separate Doctor Dekho app now.
//
// ⚠️  Import this ONLY from route handlers (app/api/**) and Server Components
//     (page.tsx files with no "use client"). It reads the secret API key from
//     env, which must never reach the browser bundle.
// ─────────────────────────────────────────────────────────────────────────────

import { headers } from "next/headers";

const BASE_URL = process.env.EASYHMS_API_BASE_URL ?? "";
// Optional — the public API doesn't require a key (see PublicApiKeyFilter). Only set this if
// this deployment's traffic should be identified/revocable separately from anonymous callers.
const API_KEY = process.env.EASYHMS_API_KEY ?? "";
const KEY_HEADER = process.env.EASYHMS_API_KEY_HEADER ?? "X-Api-Key";
// Optional — lets easyHMSAPI's rate limiters see each real visitor's IP instead of this app's own
// container IP (every call here is server-to-server; see TrustedProxyIpResolver on the API side
// for why that distinction matters). Must match Internal:ProxyForwardingSecret there exactly, or
// the forwarded IP is simply ignored — nothing breaks either way if this is left unset.
const PROXY_SECRET = process.env.EASYHMS_TRUSTED_PROXY_SECRET ?? "";

/** True once the API root is configured in env — a key is optional. */
export function isConfigured(): boolean {
  return Boolean(BASE_URL);
}

/** Best-effort real visitor IP from the INCOMING request to this app. headers() only works inside
 * an actual request scope — returns null (never throws) when called from somewhere without one. */
function resolveVisitorIp(): string | null {
  try {
    const h = headers();
    const forwardedFor = h.get("x-forwarded-for");
    if (forwardedFor) return forwardedFor.split(",")[0].trim();
    return h.get("cf-connecting-ip") || h.get("x-real-ip") || null;
  } catch {
    return null;
  }
}

export interface UpstreamResult<T = unknown> {
  ok: boolean;
  status: number;
  /** When the upstream env isn't set yet. */
  notConfigured: boolean;
  data: T | null;
}

const NETWORK_RETRY_ATTEMPTS = 3;
const NETWORK_RETRY_DELAY_MS = 500;

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Fetch a path off the EasyHMS API root with the hospital key attached. */
export async function easyhmsFetch<T = unknown>(
  path: string,
  init?: RequestInit
): Promise<UpstreamResult<T>> {
  if (!isConfigured()) {
    return { ok: false, status: 503, notConfigured: true, data: null };
  }

  const visitorIp = PROXY_SECRET ? resolveVisitorIp() : null;

  let res: Response | undefined;
  for (let attempt = 1; attempt <= NETWORK_RETRY_ATTEMPTS; attempt++) {
    try {
      res = await fetch(`${BASE_URL}${path}`, {
        ...init,
        headers: {
          "Content-Type": "application/json",
          ...(API_KEY ? { [KEY_HEADER]: API_KEY } : {}),
          ...(PROXY_SECRET && visitorIp
            ? { "X-Internal-Proxy-Secret": PROXY_SECRET, "X-Forwarded-Client-Ip": visitorIp }
            : {}),
          ...(init?.headers ?? {}),
        },
        cache: "no-store",
      });
      break;
    } catch {
      // Network-level failure (DNS, connection timeout/refused, TLS) -- as opposed to a
      // non-2xx HTTP response, which is handled below via res.ok. Retried a couple times with
      // a short backoff; a persistent outage exhausts all attempts and reports the same shape
      // as a failed HTTP response.
      if (attempt === NETWORK_RETRY_ATTEMPTS) {
        return { ok: false, status: 0, notConfigured: false, data: null };
      }
      await delay(NETWORK_RETRY_DELAY_MS * attempt);
    }
  }

  let data: T | null = null;
  try {
    data = (await res!.json()) as T;
  } catch {
    /* non-JSON or empty body */
  }

  return { ok: res!.ok, status: res!.status, data, notConfigured: false };
}
