import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// The corporate site's pages only. Doctor pages, specialty/condition/hospital/lab pages and the
// health wiki are in the Doctor Dekho app's own sitemap (doctordekho.nexeagle.com/sitemap.xml).
// `updated` is the date the page's CONTENT last changed (not the build time): bump it when you
// change what a page says, so search engines can trust lastmod.
const STATIC_ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; updated: string }[] = [
  { path: "/", priority: 1.0, changeFrequency: "weekly", updated: "2026-10-31" },
  { path: "/solutions/1hms", priority: 0.9, changeFrequency: "weekly", updated: "2026-10-31" },
  { path: "/solutions/1rad", priority: 0.9, changeFrequency: "weekly", updated: "2026-10-31" },
  { path: "/solutions/1lab", priority: 0.9, changeFrequency: "weekly", updated: "2026-10-31" },
  { path: "/solutions/1pharma", priority: 0.9, changeFrequency: "weekly", updated: "2026-10-31" },
  { path: "/ai", priority: 0.9, changeFrequency: "weekly", updated: "2026-10-31" },
  { path: "/for/doctors", priority: 0.9, changeFrequency: "monthly", updated: "2026-11-01" },
  { path: "/for/hospitals", priority: 0.9, changeFrequency: "monthly", updated: "2026-11-01" },
  { path: "/for/diagnostic-centres", priority: 0.9, changeFrequency: "monthly", updated: "2026-11-01" },
  { path: "/for/labs-pharmacies", priority: 0.8, changeFrequency: "monthly", updated: "2026-11-01" },
  { path: "/customers", priority: 0.8, changeFrequency: "monthly", updated: "2026-10-31" },
  { path: "/trust", priority: 0.7, changeFrequency: "monthly", updated: "2026-10-31" },
  { path: "/guides", priority: 0.7, changeFrequency: "monthly", updated: "2026-10-31" },
  { path: "/guides/abdm-milestones", priority: 0.6, changeFrequency: "monthly", updated: "2026-10-29" },
  { path: "/guides/nabh-digital-health", priority: 0.6, changeFrequency: "monthly", updated: "2026-10-29" },
  { path: "/guides/dhis-incentive", priority: 0.6, changeFrequency: "monthly", updated: "2026-10-29" },
  { path: "/products", priority: 0.8, changeFrequency: "weekly", updated: "2026-10-31" },
  { path: "/services", priority: 0.8, changeFrequency: "weekly", updated: "2026-10-31" },
  { path: "/why", priority: 0.8, changeFrequency: "weekly", updated: "2026-10-29" },
  { path: "/how-it-works", priority: 0.8, changeFrequency: "weekly", updated: "2026-10-29" },
  { path: "/faqs", priority: 0.7, changeFrequency: "monthly", updated: "2026-10-29" },
  { path: "/team", priority: 0.7, changeFrequency: "monthly", updated: "2026-10-29" },
  { path: "/careers", priority: 0.6, changeFrequency: "weekly", updated: "2026-10-29" },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly", updated: "2026-11-01" },
  { path: "/security", priority: 0.6, changeFrequency: "monthly", updated: "2026-10-29" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly", updated: "2026-10-29" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly", updated: "2026-10-29" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return STATIC_ROUTES.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: r.updated,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
