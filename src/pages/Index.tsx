import { useEffect, lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustedBy from "@/components/home/TrustedBy";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

// Lazy-loaded below-the-fold components
const HealthcareChallenges = lazy(() => import("@/components/home/HealthcareChallenges"));
const FeaturesSection = lazy(() => import("@/components/home/FeaturesSection"));
const ProductEcosystem = lazy(() => import("@/components/home/ProductEcosystem"));
const Testimonials = lazy(() => import("@/components/home/Testimonials"));
const DeferredLiveChat = lazy(() => import("@/components/DeferredLiveChat"));

const SectionPlaceholder = () => (
  <div className="w-full py-16 flex items-center justify-center">
    <div className="w-6 h-6 rounded-full border-2 border-brand-teal/20 border-t-brand-teal animate-spin" />
  </div>
);

const Index = () => {
  useEffect(() => {
    // Add analytics tracking for page views
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('config', 'GA_MEASUREMENT_ID', {
        page_title: 'NexEagle - We Build Systems, Not Just Software',
        page_location: window.location.href,
      });
    }
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "NexEagle",
    "description": "Health Tech Software development company building custom solutions for any industry, specializing in healthcare systems",
    "url": "https://nexeagle.com",
    "logo": "https://nexeagle.com/assets/logo.webp",
    "foundingDate": "2020",
    "founders": [
      {
        "@type": "Person",
        "name": "Tasquil Noori"
      }
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Kolkata",
      "addressCountry": "IN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+918074906808",
      "email": "info@nexeagle.com",
      "contactType": "customer service",
      "availableLanguage": ["English", "Hindi"]
    },
    "sameAs": [
      "https://linkedin.com/company/nexeagle"
    ],
    "makesOffer": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "SoftwareApplication",
          "name": "1HMS - Hospital Management System",
          "applicationCategory": "HealthApplication",
          "operatingSystem": "Web"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "SoftwareApplication",
          "name": "1Rad - Radiology Platform",
          "applicationCategory": "HealthApplication",
          "operatingSystem": "Web"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "SoftwareApplication",
          "name": "1Lab - Laboratory Management",
          "applicationCategory": "HealthApplication",
          "operatingSystem": "Web"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "SoftwareApplication",
          "name": "1Pharma - Pharmacy System",
          "applicationCategory": "HealthApplication",
          "operatingSystem": "Web"
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="We Build Custom Software Based on Your Needs"
        description="NexEagle is a software development company that builds custom solutions for any industry. We specialize in healthcare with products like 1HMS, 1Rad, 1Lab, and 1Pharma."
        keywords="custom software development, healthcare software, hospital management system, software development company, custom application development, bespoke software, tailored software solutions"
        structuredData={structuredData}
      />
      <Navbar />
      
      <main>
        <Hero />
        <TrustedBy />

        <Suspense fallback={<SectionPlaceholder />}>
          <HealthcareChallenges />
        </Suspense>
        <Suspense fallback={<SectionPlaceholder />}>
          <FeaturesSection />
        </Suspense>
        <Suspense fallback={<SectionPlaceholder />}>
          <ProductEcosystem />
        </Suspense>
        <Suspense fallback={<SectionPlaceholder />}>
          <Testimonials />
        </Suspense>
      </main>
      
      <Footer />
      <Suspense fallback={null}>
        <DeferredLiveChat />
      </Suspense>
    </div>
  );
};

export default Index;
