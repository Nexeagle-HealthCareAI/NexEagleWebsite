import type { MetadataRoute } from "next";

// Native Next.js manifest route — served at /manifest.webmanifest. Makes the patient
// booking portal installable ("Add to Home Screen") and is what tells Android/Chrome
// this is a PWA at all. theme_color/background_color match --brand-teal (src/index.css).
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "NexEagle — Doctor Dekho",
    short_name: "Doctor Dekho",
    description: "Find and book doctors near you, even on a slow connection.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#1ea99b",
    orientation: "portrait-primary",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/icon-maskable-192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
      { src: "/icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
