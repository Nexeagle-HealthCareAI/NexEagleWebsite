import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HospitalSolutions from "@/components/home/HospitalSolutions";
import SEO from "@/components/SEO";
import { LiquidButton } from "@/components/ui/LiquidButton";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const OneHMS = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="1HMS - Hospital Management System" 
        description="Comprehensive Hospital Management System for modern healthcare facilities."
      />
      <Navbar />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="container px-6 md:px-8 lg:px-12 text-center max-w-4xl mx-auto space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground">
              <span className="text-brand-teal">1HMS</span> - Complete Hospital Management
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              India's leading AI-powered hospital software with NABH compliance automation, voice scribe, and 15+ integrated modules.
            </p>
            <div className="flex justify-center gap-4 pt-4">
              <Link to="/contact">
                <LiquidButton size="lg">
                  Book Free Demo <ArrowRight className="w-5 h-5 ml-2" />
                </LiquidButton>
              </Link>
            </div>
          </div>
        </section>

        {/* Content Section (Using the component created earlier) */}
        <HospitalSolutions />
      </main>
      
      <Footer />
    </div>
  );
};

export default OneHMS;
