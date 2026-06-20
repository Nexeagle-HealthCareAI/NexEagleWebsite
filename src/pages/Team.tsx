import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import AboutHero from "@/components/about/AboutHero";
import CompanyStory from "@/components/about/CompanyStory";
import MissionVision from "@/components/about/MissionVision";
import TeamSection from "@/components/about/TeamSection";
import AboutCTA from "@/components/about/AboutCTA";

const Team = () => {
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('config', 'GA_MEASUREMENT_ID', {
        page_title: 'About NexEagle - Software Development Company',
        page_location: window.location.href,
      });
    }
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "mainEntity": {
      "@type": "Organization",
      "name": "NexEagle",
      "url": "https://nexeagle.com",
      "description": "Software development company specializing in healthcare. We build custom software for any industry and healthcare products that work.",
      "founder": [
        {
          "@type": "Person",
          "name": "Md Tasquil Noori",
          "jobTitle": "Tech Lead"
        }
      ],
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Kolkata",
        "addressCountry": "IN"
      }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="About NexEagle - Software Development Company | Healthcare Specialists"
        description="NexEagle is a software development company specializing in healthcare. We build custom software for any industry and healthcare products (1HMS, 1Rad, 1Lab, 1Pharma) used by hospitals and clinics."
        keywords="software development company, custom software development, healthcare software, hospital management system, medical software developers, NexEagle team"
        structuredData={structuredData}
      />
      <Navbar />
      
      <main>
        <AboutHero />
        <CompanyStory />
        <MissionVision />
        <TeamSection />
        <AboutCTA />
      </main>
      
      <Footer />
    </div>
  );
};

export default Team;
