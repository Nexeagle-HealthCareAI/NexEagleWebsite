import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const OneLab = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SEO title="1Lab - Laboratory System" description="Advanced Laboratory Information System" />
      <Navbar />
      <main className="pt-24 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            <span className="text-brand-iris">1Lab</span>
          </h1>
          <p className="text-xl text-muted-foreground">Laboratory Management System page coming soon...</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OneLab;
