// ─────────────────────────────────────────────────────────────────────────────
// Pure doctor-filtering helpers — no "use client", no React import — so they're
// importable from both a Server Component (rendering real, pre-filtered content
// for SEO) and the existing client DoctorDirectory (whose own `baseFiltered`
// useMemo applies the identical location/specialty match on top of live
// geolocation/free-text/AI-search filtering, which can't be precomputed).
//
// Filtering an already-filtered list by the same criteria is idempotent, so
// having both layers apply this filter is safe, not a source of drift.
// ─────────────────────────────────────────────────────────────────────────────

import type { Doctor } from "@/data/patient";

export interface LocationFilter {
  specialtyId?: string;
  city?: string;
  state?: string;
  area?: string;
}

/** City/state/area/specialty match — the non-coords, non-free-text portion of
 * what DoctorDirectory's `baseFiltered` already does. */
export function filterDoctorsByLocation(doctors: Doctor[], filter: LocationFilter): Doctor[] {
  let list = doctors;

  if (filter.city) {
    list = list.filter(
      (d) => d.city === filter.city && (!filter.state || d.state === filter.state)
    );
    if (filter.area) {
      list = list.filter((d) => d.area === filter.area);
    }
  }

  if (filter.specialtyId) {
    list = list.filter((d) => d.specialtyId === filter.specialtyId);
  }

  return list;
}

/** Same slugify used inline across the pSEO pages (hospitals, conditions) —
 * kept here too so the hospital/condition filters below match by construction. */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Matches doctors whose hospitalName slugifies to the given route param. */
export function filterDoctorsByHospital(doctors: Doctor[], hospitalSlug: string): Doctor[] {
  return doctors.filter((d) => d.hospitalName && slugify(d.hospitalName) === hospitalSlug);
}

/** Matches doctors who list a focus area slugifying to the given condition param. */
export function filterDoctorsByCondition(doctors: Doctor[], conditionSlug: string): Doctor[] {
  return doctors.filter((d) => d.focusAreas.some((f) => slugify(f) === conditionSlug));
}
