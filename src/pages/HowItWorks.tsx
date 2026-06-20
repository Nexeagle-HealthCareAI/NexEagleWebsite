import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";

const HowItWorks = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://nexeagle.com/how-it-works#webpage",
        "url": "https://nexeagle.com/how-it-works",
        "name": "How It Works - Fast Onboarding & Deployment | NexEagle",
        "description": "Learn how easy it is to go live with NexEagle's clinic and hospital management tools. In under 24 hours, we set up your OPD, train your staff, and configure your automated billing.",
        "isPartOf": {
          "@id": "https://nexeagle.com/#website"
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-tech-cyan/5 to-white font-sans">
      <SEO 
        title="How It Works - Fast Onboarding & Onboarding Guide"
        description="Learn how easy it is to go live with NexEagle's clinic and hospital management tools. In under 24 hours, we set up your OPD, train your staff, and configure your automated billing."
        keywords="hospital software onboarding, clinic ERP deployment, NexEagle setup, go live clinical software"
        structuredData={structuredData}
      />
      <Navbar />
      <main className="section-shell py-16 lg:py-20">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <p className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-teal-100 text-tech-cyan text-sm font-semibold">
            How it works
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-brand-navy">Go live in a day</h1>
          <p className="text-base md:text-lg text-brand-navy/70 max-w-3xl mx-auto">
            We set up your OPD, train staff, and enable reminders so you can start seeing patients without paperwork chaos.
          </p>
          <div className="flex justify-center pt-4">
            <Button asChild size="lg" className="bg-gradient-to-r from-tech-cyan to-tech-electric text-white">
              <Link to="/contact">Schedule onboarding</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorks;
