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

const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
  { key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://nexeagle-dev.in-south1-objectstore.e2enetworks.net; connect-src 'self' https://api.bigdatacloud.net https://router.project-osrm.org https://1hms-api.nexeagle.com;" }
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion', '@radix-ui/react-icons'],
  },
  images: {
    minimumCacheTTL: 86400, // 24 hours caching for avatars
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nexeagle-dev.in-south1-objectstore.e2enetworks.net",
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

export default withSerwist(nextConfig);
