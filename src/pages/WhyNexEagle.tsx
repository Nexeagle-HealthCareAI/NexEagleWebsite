import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const WhyNexEagle = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-tech-cyan/5 to-white">
      <Navbar />
      <main className="section-shell py-16 lg:py-20">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <p className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-teal-100 text-tech-cyan text-sm font-semibold">
            Why easyHMS
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-brand-navy">Why choose easyHMS?</h1>
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
