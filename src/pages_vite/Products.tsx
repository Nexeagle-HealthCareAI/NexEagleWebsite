import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DeferredLiveChat from "@/components/DeferredLiveChat";
import ProductsHero from "@/components/products/ProductsHero";
import EcosystemOverview from "@/components/products/EcosystemOverview";
import ProductDetails from "@/components/products/ProductDetails";
import IntegrationSection from "@/components/products/IntegrationSection";
import TechnicalSpecs from "@/components/products/TechnicalSpecs";
import ProductsCTA from "@/components/products/ProductsCTA";
import SEO from "@/components/SEO";

const Products = () => {
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('config', 'GA_MEASUREMENT_ID', {
        page_title: 'NexEagle Products - Healthcare Ecosystem',
        page_location: window.location.href,
      });
    }
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "SoftwareApplication",
        "position": 1,
        "name": "1HMS - Hospital Management System",
        "applicationCategory": "HealthApplication",
        "operatingSystem": "Web",
        "description": "Complete hospital management system with patient records, appointments, billing, and insurance management",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "ratingCount": "50"
        }
      },
      {
        "@type": "SoftwareApplication",
        "position": 2,
        "name": "1Rad - Radiology Platform",
        "applicationCategory": "HealthApplication",
        "operatingSystem": "Web",
        "description": "Advanced radiology platform with DICOM viewer, AI-assisted diagnosis, and automated report generation",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock"
        }
      },
      {
        "@type": "SoftwareApplication",
        "position": 3,
        "name": "1Lab - Laboratory Management",
        "applicationCategory": "HealthApplication",
        "operatingSystem": "Web",
        "description": "Comprehensive lab management system with sample tracking, test workflows, and quality control",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock"
        }
      },
      {
        "@type": "SoftwareApplication",
        "position": 4,
        "name": "1Pharma - Pharmacy System",
        "applicationCategory": "HealthApplication",
        "operatingSystem": "Web",
        "description": "Complete pharmacy management with inventory control, prescription tracking, and supply chain management",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock"
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Healthcare Products - 1HMS, 1Rad, 1Lab, 1Pharma"
        description="Integrated healthcare ecosystem: Hospital Management (1HMS), Radiology Platform (1Rad), Lab Management (1Lab), and Pharmacy System (1Pharma). HIPAA compliant, AI-powered, and built for modern healthcare."
        keywords="hospital management system, radiology software, lab management system, pharmacy software, healthcare ecosystem, HIPAA compliant, medical software, healthcare technology, integrated healthcare platform"
        structuredData={structuredData}
      />
      <Navbar />
      
      <main>
        <ProductsHero />
        <EcosystemOverview />
        <ProductDetails />
        <IntegrationSection />
        <TechnicalSpecs />
        <ProductsCTA />
      </main>
      
      <Footer />
      <DeferredLiveChat />
    </div>
  );
};

export default Products;
