import type { MetadataRoute } from "next";
import { easyhmsFetch } from "@/lib/api/server";
import { mapDoctors } from "@/lib/api/mappers";
import { doctors as mockDoctors, doctorSlug, specialties, CITIES, AREAS_BY_CITY } from "@/data/patient";
import { medicalArticles } from "@/data/wiki";
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
  let pseoEntries: MetadataRoute.Sitemap = [];

  try {
    const slugs = await listDoctorSlugs();
    doctorEntries = slugs.map((slug) => ({
      url: `${BASE_URL}/doctors/${slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    }));

    // Generate Programmatic SEO links (Specialties, Cities, Conditions)
    const conditionSet = new Set<string>();
    for (const d of mockDoctors) {
      for (const f of d.focusAreas) {
        conditionSet.add(f.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""));
      }
    }

    const conditions = Array.from(conditionSet);

    for (const s of specialties) {
      pseoEntries.push({
        url: `${BASE_URL}/specialties/${s.id}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.8,
      });
      for (const c of CITIES) {
        pseoEntries.push({
          url: `${BASE_URL}/specialties/${s.id}/${c.id}`,
          lastModified: now,
          changeFrequency: "weekly",
          priority: 0.8,
        });

        const areas = AREAS_BY_CITY[c.id] || [];
        for (const a of areas) {
          const areaSlug = a.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
          pseoEntries.push({
            url: `${BASE_URL}/specialties/${s.id}/${c.id}/${areaSlug}`,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 0.9, // Higher priority for hyper-local intent
          });
        }
      }
    }

    for (const cond of conditions) {
      for (const c of CITIES) {
        pseoEntries.push({
          url: `${BASE_URL}/conditions/${cond}/${c.id}`,
          lastModified: now,
          changeFrequency: "weekly",
          priority: 0.8,
        });
        
        const areas = AREAS_BY_CITY[c.id] || [];
        for (const a of areas) {
          const areaSlug = a.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
          pseoEntries.push({
            url: `${BASE_URL}/conditions/${cond}/${c.id}/${areaSlug}`,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 0.9, // Higher priority for hyper-local intent
          });
        }
      }
    }

    // Generate Hospital paths
    const hospitalSet = new Set<string>();
    for (const d of mockDoctors) {
      if (d.hospitalName) {
        hospitalSet.add(d.hospitalName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""));
      }
    }

    for (const hospital of Array.from(hospitalSet)) {
      pseoEntries.push({
        url: `${BASE_URL}/hospitals/${hospital}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }

    // Generate Health Wiki paths
    for (const article of medicalArticles) {
      pseoEntries.push({
        url: `${BASE_URL}/health/conditions/${article.id}`,
        lastModified: article.updatedAt ? new Date(article.updatedAt) : now,
        changeFrequency: "monthly",
        priority: 0.8, // High priority for YMYL informational content
      });
    }

  } catch {
    // Sitemap generation must never fail the build over a flaky upstream call.
  }

  return [...staticEntries, ...doctorEntries, ...pseoEntries];
}
