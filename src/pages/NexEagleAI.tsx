import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import WatchNexEagleAIWork from "@/components/ai/WatchNexEagleAIWork";
import { LiquidButton } from "@/components/ui/LiquidButton";
import { ArrowRight, Bot, Zap, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

const NexEagleAI = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="NexEagle AI - Intelligent Healthcare Automation" 
        description="Experience the future of radiology with NexEagle's AI Voice-to-Report and predictive healthcare analytics."
      />
      <Navbar />
      
      <main className="pt-24 pb-16">
        
        {/* Hero Section */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-brand-sky/10 to-transparent pointer-events-none"></div>
          
          <div className="container px-6 md:px-8 lg:px-12 text-center max-w-4xl mx-auto space-y-8 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-teal/30 bg-brand-teal/5 text-brand-teal">
              <Bot className="w-4 h-4" />
              <span className="text-sm font-semibold text-brand-teal">Next-Generation Healthcare AI</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-[1.1]">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-teal via-brand-sky to-brand-iris">NexEagle AI</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Transform the way your hospital operates. Our AI analyzes voice dictations, creates instant reports, and powers predictive clinical decisions.
            </p>
          </div>
        </section>

        <WatchNexEagleAIWork />

        {/* Benefits Section */}
        <section className="py-16 md:py-24">
          <div className="container px-6 md:px-8 lg:px-12">
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-card border border-border p-8 rounded-3xl text-center space-y-4 hover:border-brand-teal/50 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-brand-teal/10 text-brand-teal mx-auto flex items-center justify-center">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-xl">Instant Generation</h3>
                <p className="text-muted-foreground text-sm">Cut report turnaround time from hours to seconds with real-time dictation processing.</p>
              </div>
              
              <div className="bg-card border border-border p-8 rounded-3xl text-center space-y-4 hover:border-brand-sky/50 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-brand-sky/10 text-brand-sky mx-auto flex items-center justify-center">
                  <Bot className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-xl">High Accuracy</h3>
                <p className="text-muted-foreground text-sm">Trained on vast medical datasets to perfectly understand complex clinical terminology.</p>
              </div>
              
              <div className="bg-card border border-border p-8 rounded-3xl text-center space-y-4 hover:border-brand-iris/50 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-brand-iris/10 text-brand-iris mx-auto flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-xl">NABH Compliant</h3>
                <p className="text-muted-foreground text-sm">Automatically structures data to meet strict medical formatting and compliance standards.</p>
              </div>
            </div>

            <div className="mt-16 text-center">
              <Link to="/contact">
                <LiquidButton size="lg">
                  See AI in Action <ArrowRight className="w-5 h-5 ml-2" />
                </LiquidButton>
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default NexEagleAI;
