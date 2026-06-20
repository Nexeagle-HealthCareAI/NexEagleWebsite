import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustedBy from "@/components/home/TrustedBy";

import ProductEcosystem from "@/components/home/ProductEcosystem";
import HealthcareChallenges from "@/components/home/HealthcareChallenges";
import VisionSection from "@/components/home/VisionSection";
import Footer from "@/components/Footer";
import LiveChat from "@/components/LiveChat";
import SEO from "@/components/SEO";

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

        <HealthcareChallenges />
        <ProductEcosystem />
        {/*<VisionSection />*/}
      </main>
      
      <Footer />
      <LiveChat />
    </div>
  );
};

export default Index;
