import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// The corporate site's pages only. Doctor pages, specialty/condition/hospital/lab pages and the
// health wiki are in the Doctor Dekho app's own sitemap (doctordekho.nexeagle.com/sitemap.xml).
const STATIC_ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/solutions/1hms", priority: 0.9, changeFrequency: "weekly" },
  { path: "/solutions/1rad", priority: 0.9, changeFrequency: "weekly" },
  { path: "/solutions/1lab", priority: 0.9, changeFrequency: "weekly" },
  { path: "/solutions/1pharma", priority: 0.9, changeFrequency: "weekly" },
  { path: "/ai", priority: 0.9, changeFrequency: "weekly" },
  { path: "/products", priority: 0.8, changeFrequency: "weekly" },
  { path: "/services", priority: 0.8, changeFrequency: "weekly" },
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

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return STATIC_ROUTES.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
