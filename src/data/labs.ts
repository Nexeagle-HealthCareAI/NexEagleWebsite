// ─────────────────────────────────────────────────────────────────────────────
// Pathology lab directory model — mirrors src/data/patient.ts's Doctor shape and
// slug/directions helpers, but deliberately smaller: no booking/availability/fee/
// review fields, since a lab listing is discoverability only (see the plan's Out
// of Scope). Backed by GET /public/labs (LabDto, src/lib/api/types.ts).
// ─────────────────────────────────────────────────────────────────────────────

export interface Lab {
  id: string;
  hospitalId: string;
  name: string;
  description?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  latitude?: number;
  longitude?: number;
  registrationNumber?: string;
  contactPhone?: string;
  contactEmail?: string;
  testCategories: string[];
}

// Local/dev convenience only, mirroring src/data/patient.ts's mockDoctors -- used when
// EASYHMS_API_BASE_URL isn't set (see src/lib/api/server.ts's getAllLabs), never in production.
export const mockLabs: Lab[] = [
  {
    id: "mock-lab-1",
    hospitalId: "mock-hospital-1",
    name: "Sunrise Diagnostics Lab",
    description: "Full-service pathology lab offering routine and specialized diagnostic testing.",
    address: "12 MG Road",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560001",
    registrationNumber: "KA-LAB-00123",
    contactPhone: "+91 90000 00000",
    testCategories: ["Hematology", "Biochemistry", "Microbiology"],
  },
  {
    id: "mock-lab-2",
    hospitalId: "mock-hospital-2",
    name: "City Care Pathology Centre",
    description: "NABL-accredited diagnostics with same-day reports for most tests.",
    address: "45 Park Street",
    city: "Kolkata",
    state: "West Bengal",
    pincode: "700016",
    registrationNumber: "WB-LAB-00456",
    contactPhone: "+91 90000 11111",
    testCategories: ["Hematology", "Serology", "Radiology"],
  },
];

/** Builds a readable, SEO-friendly slug for a lab's detail page URL, e.g. "sunrise-diagnostics-mumbai--<id>". */
export function labSlug(lab: Pick<Lab, "id" | "name">, city?: string): string {
  const parts = [lab.name, city].filter(Boolean) as string[];
  const words = parts
    .join(" ")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return `${words}--${lab.id}`;
}

/** Recover the real lab id from a slug built by labSlug(). */
export function parseLabIdFromSlug(slug: string): string {
  const idx = slug.lastIndexOf("--");
  return idx === -1 ? slug : slug.slice(idx + 2);
}

// Google Maps "get directions" link — same scheme as getDirectionsUrl in src/data/patient.ts.
// Prefers the lab's own GPS pin; falls back to a text search on name + address/city/state.
export function getLabDirectionsUrl(lab: Pick<Lab, "latitude" | "longitude" | "name" | "address" | "city" | "state">): string | null {
  if (lab.latitude != null && lab.longitude != null) {
    return `https://www.google.com/maps/dir/?api=1&destination=${lab.latitude},${lab.longitude}`;
  }
  const query = [lab.name, lab.address, lab.city, lab.state].filter(Boolean).join(", ");
  if (!query) return null;
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}`;
}
