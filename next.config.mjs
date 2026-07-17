import withSerwistInit from "@serwist/next";

const withSerwist = withSerwistInit({
  swSrc: "app/sw.ts",
  swDest: "public/sw.js",
  disable: process.env.NODE_ENV === "development",
  // Don't force a full page reload the instant connectivity returns — the patient
  // could be mid-way through the booking form when a flaky connection flickers back;
  // React Query's own refetchOnReconnect already gets fresh data without discarding it.
  reloadOnOnline: false,
  // Only precache the small PWA icon set at install time, NOT the rest of public/ —
  // public/assets/ holds ~15MB of marketing images (Background.png alone is 6MB+),
  // and force-downloading those on a 2G connection before the visitor has even asked
  // for them would defeat the entire point of this feature. Those images still get
  // cached, just opportunistically at runtime as each page is actually visited (see
  // defaultCache's image rule in app/sw.ts).
  globPublicPatterns: ["icons/**/*.png", "favicon.ico"],
  // The /offline fallback (see app/sw.ts's `fallbacks` option) must be precached
  // upfront to be available with zero network at all — a fresh revision string each
  // build keeps it from going stale forever after the first install.
  additionalPrecacheEntries: [{ url: "/offline", revision: String(Date.now()) }],
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // During migration, ignore TypeScript and ESLint build errors
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default withSerwist(nextConfig);
