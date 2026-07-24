import type { Metadata, Viewport } from "next";
import { Providers } from "./providers";
import CursorGlow from "@/components/ui/CursorGlow";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Inter, Poppins } from "next/font/google";
import LayoutWrapper from "./layout-wrapper";
import ConnectionStatusBanner from "@/components/patient/ConnectionStatusBanner";
import InstallAppPrompt from "@/components/patient/InstallAppPrompt";
import LaunchSplash from "@/components/patient/LaunchSplash";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap"
});

export const metadata: Metadata = {
  title: {
    default: "NexEagle — AI-Powered Healthcare Operating System",
    template: "%s | NexEagle"
  },
  description: "NexEagle builds modern, AI-powered healthcare software for hospitals & clinics: 1HMS EMR, 1Rad Cloud PACS, 1Lab LIS diagnostics, and 1Pharma inventory systems.",
  keywords: ["NexEagle", "1HMS", "1Rad", "1Lab", "1Pharma", "Healthcare software", "EMR", "Cloud PACS", "LIS diagnostics", "Doctor Dekho", "find doctors near me"],
  metadataBase: new URL("https://nexeagle.com"),
  openGraph: {
    title: "NexEagle — AI-Powered Healthcare Operating System",
    description: "NexEagle builds modern, AI-powered healthcare software for hospitals & clinics: 1HMS EMR, 1Rad Cloud PACS, 1Lab LIS diagnostics, and 1Pharma inventory systems.",
    url: "https://nexeagle.com",
    siteName: "NexEagle",
    images: [
      {
        url: "/assets/logo.webp",
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
    description: "NexEagle builds modern, AI-powered healthcare software for hospitals & clinics: 1HMS EMR, 1Rad Cloud PACS, 1Lab LIS diagnostics, and 1Pharma inventory systems.",
    images: ["/assets/logo.webp"],
    creator: "@nexeagle",
  },
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Doctor Dekho",
  },
  verification: {
    // Google Search Console site-ownership check.
    google: "24K8hQuZVcT5jq6MC0ga0cNvIlVRxN1psoti8ASiuNk",
    // Bing Webmaster Tools site-ownership check.
    other: {
      "msvalidate.01": "EC6A77DDD7DD7DA18EF0724DEAABA6F3",
    },
  },
};

// Installable PWA: standalone display + brand theme-color for the Android status
// bar / splash screen.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1ea99b",
};

// Sitewide entity schema (NEX-9) — every page shares one @id so Google/AI
// crawlers resolve "NexEagle" to a single, consistent, verifiable entity
// rather than re-deriving it per page.
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalOrganization",
  "@id": "https://nexeagle.com/#organization",
  name: "NexEagle",
  url: "https://nexeagle.com",
  logo: "https://nexeagle.com/assets/logo.webp",
  description:
    "NexEagle connects patients with verified doctors across its network of hospitals for online appointment booking.",
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
    <html lang="en-IN" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <link rel="preconnect" href="https://1hms-api.nexeagle.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://1hms-api.nexeagle.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="min-h-screen bg-white">
        <Providers>
          <LaunchSplash />
          <CursorGlow />
          <Toaster />
          <Sonner />
          <ConnectionStatusBanner />
          <LayoutWrapper>{children}</LayoutWrapper>
          <InstallAppPrompt />
        </Providers>
      </body>
    </html>
  );
}
