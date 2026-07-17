/// <reference lib="webworker" />

// ─────────────────────────────────────────────────────────────────────────────
// Service worker for the low-bandwidth "instant app shell" PWA feature.
//
// Precache (install-time, always downloaded): only the Next.js build's hashed
// JS/CSS/font chunks (self.__SW_MANIFEST) + the tiny PWA icon set + the /offline
// fallback page — see next.config.mjs's globPublicPatterns, which deliberately
// excludes the ~15MB of marketing images in public/assets. Everything else is
// cached opportunistically at runtime, as the visitor actually browses to it —
// never force-downloaded up front, which is the whole point on a 2G/3G link.
//
// Runtime caching (as the visitor browses): our two rules below run BEFORE
// @serwist/next's `defaultCache` and add a short networkTimeoutSeconds, which
// defaultCache's own page/API rules omit — without one, a stalled request on a
// slow connection hangs the whole navigation instead of instantly falling back
// to the last-cached copy. defaultCache still handles everything else (static
// JS/CSS/fonts/images) with its own CacheFirst/StaleWhileRevalidate rules.
// ─────────────────────────────────────────────────────────────────────────────

import { defaultCache } from "@serwist/next/worker";
import type { PrecacheEntry, RuntimeCaching, SerwistGlobalConfig } from "serwist";
import { CacheableResponsePlugin, ExpirationPlugin, NetworkFirst, Serwist } from "serwist";

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

const runtimeCaching: RuntimeCaching[] = [
  // Public API reads (doctor list / availability / reviews, proxied via
  // app/api/public/*). Mutations (POST/PATCH bookings & reviews) are untouched —
  // Workbox route matching here only ever applies to GET. 30 min max age: stale
  // availability is worse than a stale marketing page, so this expires faster
  // than defaultCache's generic 24h "apis" bucket would.
  {
    matcher: ({ sameOrigin, url, request }) =>
      sameOrigin && request.method === "GET" && url.pathname.startsWith("/api/public/"),
    handler: new NetworkFirst({
      cacheName: "nexeagle-public-api",
      networkTimeoutSeconds: 4,
      plugins: [
        new CacheableResponsePlugin({ statuses: [0, 200] }),
        new ExpirationPlugin({ maxEntries: 200, maxAgeSeconds: 30 * 60, maxAgeFrom: "last-used" }),
      ],
    }),
  },
  // Full-page HTML navigations (first load / hard refresh / typed URL).
  {
    matcher: ({ request, url, sameOrigin }) =>
      sameOrigin && !url.pathname.startsWith("/api/") && request.headers.get("Content-Type")?.includes("text/html") === true,
    handler: new NetworkFirst({
      cacheName: "nexeagle-pages",
      networkTimeoutSeconds: 3,
      plugins: [new ExpirationPlugin({ maxEntries: 60, maxAgeSeconds: 24 * 60 * 60 })],
    }),
  },
  // Client-side next/link navigations (RSC payload fetch) between already-loaded pages.
  {
    matcher: ({ request, url, sameOrigin }) =>
      sameOrigin && !url.pathname.startsWith("/api/") && request.headers.get("RSC") === "1",
    handler: new NetworkFirst({
      cacheName: "nexeagle-pages-rsc",
      networkTimeoutSeconds: 3,
      plugins: [new ExpirationPlugin({ maxEntries: 60, maxAgeSeconds: 24 * 60 * 60 })],
    }),
  },
  ...defaultCache,
];

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching,
  fallbacks: {
    entries: [
      {
        url: "/offline",
        matcher: ({ request }) => request.destination === "document",
      },
    ],
  },
});

serwist.addEventListeners();
