import type { Metadata } from "next";
import { Providers } from "./providers";
import CursorGlow from "@/components/ui/CursorGlow";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Inter, Poppins } from "next/font/google";
import LayoutWrapper from "./layout-wrapper";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: {
    default: "NexEagle — AI-Powered Healthcare Operating System",
    template: "%s | NexEagle"
  },
  description: "NexEagle builds modern, AI-powered healthcare software for hospitals & clinics: 1HMS EMR, 1Rad Cloud PACS, 1Lab LIS diagnostics, and 1Pharma inventory systems.",
  keywords: ["NexEagle", "Healthcare software", "EMR", "Cloud PACS", "LIS diagnostics", "Doctor Dekho", "find doctors near me"],
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
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NexEagle — AI-Powered Healthcare Operating System",
    description: "NexEagle builds modern, AI-powered healthcare software for hospitals & clinics: 1HMS EMR, 1Rad Cloud PACS, 1Lab LIS diagnostics, and 1Pharma inventory systems.",
    images: ["/assets/logo.webp"],
    creator: "@nexeagle",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="min-h-screen bg-white">
        <Providers>
          <CursorGlow />
          <Toaster />
          <Sonner />
          <LayoutWrapper>{children}</LayoutWrapper>
        </Providers>
      </body>
    </html>
  );
}
