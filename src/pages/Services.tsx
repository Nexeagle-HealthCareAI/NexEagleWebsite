import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DeferredLiveChat from "@/components/DeferredLiveChat";
import SEO from "@/components/SEO";
import ServicesHero from "@/components/services/ServicesHero";
import ServicesOverview from "@/components/services/ServicesOverview";
import ServiceDetails from "@/components/services/ServiceDetails";
import ProcessApproach from "@/components/services/ProcessApproach";
import TechStack from "@/components/services/TechStack";
import CaseStudies from "@/components/services/CaseStudies";
import ServicesCTA from "@/components/services/ServicesCTA";

const Services = () => {
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('config', 'GA_MEASUREMENT_ID', {
        page_title: 'NexEagle Services - Product Engineering Partner',
        page_location: window.location.href,
      });
    }
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Product Engineering Services",
    "provider": {
      "@type": "Organization",
      "name": "NexEagle",
      "url": "https://nexeagle.com"
    },
    "areaServed": {
      "@type": "Country",
      "name": "India"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Product Engineering Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Product Strategy",
            "description": "Market research, product roadmap, competitive analysis, and go-to-market strategy"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Product Design",
            "description": "UI/UX design, design systems, prototyping, and user research"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Full-Stack Development",
            "description": "Web and mobile app development, API development, and cloud infrastructure"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "AI Integration",
            "description": "Machine learning, natural language processing, and AI-powered features"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "System Architecture",
            "description": "Scalable architecture, microservices, cloud infrastructure, and DevOps"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Digital Transformation",
            "description": "Legacy system modernization, process automation, and technology consulting"
          }
        }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Product Engineering Services - AI, Development, Design"
        description="Expert product engineering services for startups and businesses: Product Strategy, UI/UX Design, Full-Stack Development, AI Integration, System Architecture, and Digital Transformation. Your engineering partner for ambitious products."
        keywords="product engineering services, AI integration, digital transformation, software development services, startup engineering partner, full-stack development, product design, system architecture, technology consulting"
        structuredData={structuredData}
      />
      <Navbar />
      
      <main>
        <ServicesHero />
        <ServicesOverview />
        <ServiceDetails />
        <ProcessApproach />
        <TechStack />
        <CaseStudies />
        <ServicesCTA />
      </main>
      
      <Footer />
      <DeferredLiveChat />
    </div>
  );
};

export default Services;
