// ─────────────────────────────────────────────────────────────────────────────
// Server-only helper for talking to the EasyHMS public API.
//
// ⚠️  Import this ONLY from route handlers (app/api/**) and Server Components
//     (page.tsx files with no "use client"). It reads the secret API key from
//     env, which must never reach the browser bundle.
// ─────────────────────────────────────────────────────────────────────────────

import { unstable_cache } from "next/cache";
import type { Doctor } from "@/data/patient";
import { doctors as mockDoctors } from "@/data/patient";
import { mapDoctor, mapDoctors } from "./mappers";
import type { DoctorsResponseDto } from "./types";

const BASE_URL = process.env.EASYHMS_API_BASE_URL ?? "";
// Optional — the public API doesn't require a key (see PublicApiKeyFilter). Only set this if
// this deployment's traffic should be identified/revocable separately from anonymous callers.
const API_KEY = process.env.EASYHMS_API_KEY ?? "";
const KEY_HEADER = process.env.EASYHMS_API_KEY_HEADER ?? "X-Api-Key";

/** True once the API root is configured in env — a key is optional. */
export function isConfigured(): boolean {
  return Boolean(BASE_URL);
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
      ...(API_KEY ? { [KEY_HEADER]: API_KEY } : {}),
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

export interface GetDoctorByIdResult {
  doctor: Doctor | null;
  notConfigured: boolean;
}

// No single-doctor public backend endpoint exists yet (only the full-directory
// list) — fetch the directory server-side and find the match. Fine at today's
// directory size; if the platform-wide directory grows large, this is the spot
// to swap in a dedicated GET /public/doctors/{id} backend endpoint instead.
export async function getDoctorById(doctorId: string): Promise<GetDoctorByIdResult> {
  const result = await easyhmsFetch<DoctorsResponseDto>("/public/doctors");
  if (result.notConfigured) return { doctor: null, notConfigured: true };

  const dto = result.data?.doctors?.find((d) => d.doctorId === doctorId);
  return { doctor: dto ? mapDoctor(dto) : null, notConfigured: false };
}

// ─────────────────────────────────────────────────────────────────────────────
// getAllDoctors — the shared doctor-directory fetch for SERVER-RENDERED listing
// pages (homepage, /specialties/**, /conditions/**, /hospitals/**). This is
// what puts real doctor names/links into the raw HTML those pages send, so a
// non-JS crawler sees content instead of an empty client shell.
//
// Deliberately NOT the same code path as the client's live re-fetch
// (`/api/public/doctors` → easyhmsFetch, which stays `no-store`/force-dynamic
// on purpose). easyhmsFetch's own `cache: "no-store"` would otherwise force
// every one of the ~400 statically generated pages to hit the upstream API
// once each at build/render time — unstable_cache caches the RESULT of this
// function in Next's persistent Data Cache instead, independent of the inner
// fetch's own cache mode, so all of them share one upstream call per
// `revalidate` window (also what makes `export const revalidate` on those
// pages meaningful downstream, once it's added there).
// ─────────────────────────────────────────────────────────────────────────────
export interface AllDoctorsResult {
  doctors: Doctor[];
  notConfigured: boolean;
}

const fetchAllDoctorsCached = unstable_cache(
  async (): Promise<AllDoctorsResult> => {
    if (!isConfigured()) {
      if (process.env.NODE_ENV === "production") {
        // A missing EASYHMS_API_BASE_URL here would otherwise silently ship
        // mock doctor data on every one of the ~400 real production pages —
        // fail the build/request loudly instead.
        throw new Error(
          "getAllDoctors: EASYHMS_API_BASE_URL is not set. Refusing to silently " +
            "build/serve real listing pages with mock doctor data in production " +
            "— set EASYHMS_API_BASE_URL and retry."
        );
      }
      // Local/dev convenience: keep the app runnable without the real API.
      return { doctors: mockDoctors, notConfigured: true };
    }

    const result = await easyhmsFetch<DoctorsResponseDto>("/public/doctors");
    if (result.notConfigured || !result.data) {
      return { doctors: mockDoctors, notConfigured: true };
    }
    return { doctors: mapDoctors(result.data.doctors), notConfigured: false };
  },
  ["public-doctors"],
  { revalidate: 3600, tags: ["doctors"] }
);

export async function getAllDoctors(): Promise<AllDoctorsResult> {
  return fetchAllDoctorsCached();
}
