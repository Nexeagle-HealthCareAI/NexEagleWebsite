import type { Metadata, Viewport } from "next";
import { Providers } from "./providers";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import "@fontsource-variable/bricolage-grotesque";
import "@fontsource-variable/instrument-sans";
import LayoutWrapper from "./layout-wrapper";
import { SITE_URL, DOCTORDEKHO_URL, IS_PRODUCTION_SITE } from "@/lib/site";
import "./globals.css";


const DESCRIPTION =
  "NexEagle builds modern, AI-powered healthcare software for hospitals & clinics: 1HMS EMR, 1Rad Cloud PACS, 1Lab LIS diagnostics, and 1Pharma inventory systems.";

export const metadata: Metadata = {
  title: {
    default: "NexEagle — AI-Powered Healthcare Operating System",
    template: "%s | NexEagle"
  },
  description: DESCRIPTION,
  keywords: ["NexEagle", "1HMS", "1Rad", "1Lab", "1Pharma", "Healthcare software", "EMR", "Cloud PACS", "LIS diagnostics"],
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: "NexEagle — AI-Powered Healthcare Operating System",
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "NexEagle",
    images: [
      {
        url: "/og/home.png",
        width: 1200,
        height: 630,
        alt: "NexEagle - Healthcare AI Solutions",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NexEagle — AI-Powered Healthcare Operating System",
    description: DESCRIPTION,
    images: ["/og/home.png"],
    creator: "@nexeagle",
  },
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  // Belt-and-braces with robots.ts: a non-production host must never be indexed.
  ...(IS_PRODUCTION_SITE ? {} : { robots: { index: false, follow: false } }),
  verification: {
    // Google Search Console site-ownership check.
    google: "24K8hQuZVcT5jq6MC0ga0cNvIlVRxN1psoti8ASiuNk",
    // Bing Webmaster Tools site-ownership check.
    other: {
      "msvalidate.01": "EC6A77DDD7DD7DA18EF0724DEAABA6F3",
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1ea99b",
};

// Sitewide entity schema (NEX-9) — every page shares one @id so Google/AI crawlers resolve
// "NexEagle" to a single, consistent, verifiable entity rather than re-deriving it per page.
// Doctor Dekho (the patient portal) is its own entity on its own origin and points back here as
// its parent; subOrganization is the reverse link.
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "NexEagle",
  url: SITE_URL,
  logo: `${SITE_URL}/assets/logo.webp`,
  description:
    "NexEagle is an Indian healthcare AI company. Its Vita AI agents power 1HMS hospital management software and EMR, 1Rad cloud PACS with AI radiology reporting, 1Lab LIS, 1Pharma and Doctor Dekho for patients.",
  slogan: "AI agents for every step of the patient journey",
  knowsAbout: [
    "Hospital management software",
    "Electronic medical records",
    "AI agents in healthcare",
    "AI radiology reporting",
    "Picture archiving and communication system (PACS)",
    "Teleradiology",
    "Laboratory information system",
    "Pharmacy management software",
  ],
  areaServed: { "@type": "Country", name: "India" },
  subOrganization: {
    "@type": "Organization",
    "@id": `${DOCTORDEKHO_URL}/#organization`,
    name: "Doctor Dekho",
    url: DOCTORDEKHO_URL,
  },
  sameAs: ["https://linkedin.com/company/nexeagle"],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-8074906808",
    email: "info@nexeagle.com",
    contactType: "customer service",
    areaServed: "IN",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-IN">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="min-h-screen bg-white">
        <Providers>
          <Toaster />
          <Sonner />
          <LayoutWrapper>{children}</LayoutWrapper>
        </Providers>
      </body>
    </html>
  );
}
