import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";

const WhyNexEagle = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": "https://nexeagle.com/why#webpage",
        "url": "https://nexeagle.com/why",
        "name": "Why Choose NexEagle - Healthcare Operating System",
        "description": "Discover why hospitals and diagnostics choose NexEagle for cloud EMR, LIS, PACS, and billing automation.",
        "isPartOf": {
          "@id": "https://nexeagle.com/#website"
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-tech-cyan/5 to-white font-sans">
      <SEO 
        title="Why Choose NexEagle - Modern Clinical OS & Healthcare Software"
        description="Discover why hospital networks and clinics choose NexEagle's unified healthcare software suite: 1HMS, 1Rad, 1Lab, and 1Pharma. Learn about our simplified workflows, fast onboarding, and dedicated support."
        keywords="why choose nexeagle, hospital management software benefits, clinic operating system, healthcare IT platform benefits, simple clinical software"
        structuredData={structuredData}
      />
      <Navbar />
      <main className="section-shell py-16 lg:py-20">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <p className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-teal-100 text-tech-cyan text-sm font-semibold">
            Why NexEagle
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-brand-navy">Why choose NexEagle?</h1>
          <p className="text-base md:text-lg text-brand-navy/70 max-w-3xl mx-auto">
            A simpler OPD workflow, fast onboarding, and human support designed for busy clinics and hospitals.
          </p>
          <div className="flex justify-center pt-4">
            <Button asChild size="lg" className="bg-gradient-to-r from-tech-cyan to-tech-electric text-white">
              <Link to="/contact">Book a 15-minute demo</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WhyNexEagle;
