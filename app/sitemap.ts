import type { MetadataRoute } from "next";
import { easyhmsFetch } from "@/lib/api/server";
import { mapDoctors } from "@/lib/api/mappers";
import { doctors as mockDoctors, doctorSlug } from "@/data/patient";
import type { DoctorsResponseDto } from "@/lib/api/types";

const BASE_URL = "https://nexeagle.com";

const STATIC_ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1.0, changeFrequency: "daily" },
  { path: "/solutions/1hms", priority: 0.9, changeFrequency: "weekly" },
  { path: "/solutions/1rad", priority: 0.9, changeFrequency: "weekly" },
  { path: "/solutions/1lab", priority: 0.9, changeFrequency: "weekly" },
  { path: "/solutions/1pharma", priority: 0.9, changeFrequency: "weekly" },
  { path: "/ai", priority: 0.9, changeFrequency: "weekly" },
  { path: "/business", priority: 0.8, changeFrequency: "weekly" },
  { path: "/products", priority: 0.8, changeFrequency: "weekly" },
  { path: "/services", priority: 0.8, changeFrequency: "weekly" },
  { path: "/pricing", priority: 0.8, changeFrequency: "weekly" },
  { path: "/why", priority: 0.8, changeFrequency: "weekly" },
  { path: "/how-it-works", priority: 0.8, changeFrequency: "weekly" },
  { path: "/faqs", priority: 0.7, changeFrequency: "monthly" },
  { path: "/team", priority: 0.7, changeFrequency: "monthly" },
  { path: "/team/engineering", priority: 0.5, changeFrequency: "monthly" },
  { path: "/team/healthcare", priority: 0.5, changeFrequency: "monthly" },
  { path: "/team/leadership", priority: 0.5, changeFrequency: "monthly" },
  { path: "/team/product-design", priority: 0.5, changeFrequency: "monthly" },
  { path: "/careers", priority: 0.6, changeFrequency: "weekly" },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
  { path: "/security", priority: 0.6, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
];

async function listDoctorSlugs(): Promise<string[]> {
  const result = await easyhmsFetch<DoctorsResponseDto>("/public/doctors");
  if (result.notConfigured || !result.data) {
    // Local dev without the API configured — still emit mock doctor URLs so
    // the route/slug shape is exercised.
    return mockDoctors.map((d) => doctorSlug(d, d.city));
  }
  const doctors = mapDoctors(result.data.doctors);
  return doctors.map((d) => doctorSlug(d, d.city));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((r) => ({
    url: `${BASE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  let doctorEntries: MetadataRoute.Sitemap = [];
  try {
    const slugs = await listDoctorSlugs();
    doctorEntries = slugs.map((slug) => ({
      url: `${BASE_URL}/doctors/${slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    }));
  } catch {
    // Sitemap generation must never fail the build over a flaky upstream call.
  }

  return [...staticEntries, ...doctorEntries];
}
