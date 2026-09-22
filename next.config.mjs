// Doctor Dekho (the patient portal) is a separate app on its own origin. next.config can't import
// src/lib/site.ts (TypeScript), so the same env var + default are read here -- keep them in sync.
// Env files are loaded before this file is evaluated, and Docker build-args (deploy.yml) override
// .env.production, so dev builds redirect to the DEV Doctor Dekho host.
const DOCTORDEKHO_URL = (process.env.NEXT_PUBLIC_DOCTORDEKHO_URL || "https://doctordekho.nexeagle.com").replace(/\/+$/, "");

// Path prefixes that used to be served by THIS app when it also hosted Doctor Dekho at "/".
const DOCTORDEKHO_PATH_PREFIXES = [
  "doctors",
  "specialties",
  "conditions",
  "hospitals",
  "labs",
  "health",
  "appointments",
  "profile",
];

const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
  // connect-src is exactly the set of hosts the browser talks to directly:
  //  - cms-api.nexeagle.com, https: AND wss: -- LiveChat.tsx's SignalR connection (CHAT_HUB_URL)
  //    negotiates over https: first, then upgrades to a WebSocket, and CSP enforces connect-src
  //    per-scheme (an https: entry alone does not also permit the wss: upgrade).
  //  - formsubmit.co -- the contact form (contact-client.tsx) POSTs straight to it from the
  //    browser. It was missing from this list before the split, so CSP was blocking the request.
  // The map / geocoding / object-store hosts that used to be here served the patient portal and
  // moved with it to the Doctor Dekho app.
  { key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self' https://formsubmit.co https://cms-api.nexeagle.com wss://cms-api.nexeagle.com;" }
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
    minimumCacheTTL: 86400, // 24 hours caching
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
  // Every old patient-portal URL permanently redirects to the same path on Doctor Dekho. KEEP THESE
  // INDEFINITELY: printed hospital QR posters, shared WhatsApp links and search-engine results all
  // still point at nexeagle.com/doctors/... . `permanent: true` is an HTTP 308 (method- and
  // query-preserving), which search engines treat like a 301 for ranking transfer. Query strings
  // are carried over automatically.
  async redirects() {
    return [
      // The patient search box used to be the site root; Google's SearchAction pointed at /?q=...
      { source: '/', has: [{ type: 'query', key: 'q' }], destination: `${DOCTORDEKHO_URL}/`, permanent: true },
      // The corporate home used to live at /business; it is the root now.
      { source: '/business', destination: '/', permanent: true },
      ...DOCTORDEKHO_PATH_PREFIXES.map((prefix) => ({
        source: `/${prefix}/:path*`,
        destination: `${DOCTORDEKHO_URL}/${prefix}/:path*`,
        permanent: true,
      })),
      { source: '/login', destination: `${DOCTORDEKHO_URL}/login`, permanent: true },
      // Previously-generated social-share images referenced the OG image route on this origin.
      { source: '/api/og', destination: `${DOCTORDEKHO_URL}/api/og`, permanent: true },
    ];
  },
};

export default nextConfig;
