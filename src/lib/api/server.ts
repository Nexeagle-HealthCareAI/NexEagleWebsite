// ─────────────────────────────────────────────────────────────────────────────
// Server-only helper for talking to the EasyHMS public API.
//
// ⚠️  Import this ONLY from route handlers (app/api/**). It reads the secret API
//     key from env, which must never reach the browser bundle.
// ─────────────────────────────────────────────────────────────────────────────

const BASE_URL = process.env.EASYHMS_API_BASE_URL ?? "";
const API_KEY = process.env.EASYHMS_API_KEY ?? "";
const KEY_HEADER = process.env.EASYHMS_API_KEY_HEADER ?? "X-Api-Key";

/** True once both the API root and a key are configured in env. */
export function isConfigured(): boolean {
  return Boolean(BASE_URL && API_KEY);
}

export interface UpstreamResult<T = unknown> {
  ok: boolean;
  status: number;
  /** When the upstream env isn't set yet, so callers can fall back to mock data. */
  notConfigured: boolean;
  data: T | null;
}

/** Fetch a path off the EasyHMS API root with the hospital key attached. */
export async function easyhmsFetch<T = unknown>(
  path: string,
  init?: RequestInit
): Promise<UpstreamResult<T>> {
  if (!isConfigured()) {
    return { ok: false, status: 503, notConfigured: true, data: null };
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      [KEY_HEADER]: API_KEY,
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });

  let data: T | null = null;
  try {
    data = (await res.json()) as T;
  } catch {
    /* non-JSON or empty body */
  }

  return { ok: res.ok, status: res.status, data, notConfigured: false };
}
