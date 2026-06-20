import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { LiquidButton } from "@/components/ui/LiquidButton";
import { 
  ArrowRight, 
  MonitorPlay, 
  Receipt, 
  Building2, 
  ShieldCheck, 
  Users, 
  Globe
} from "lucide-react";
import { Link } from "react-router-dom";
import WorkflowAnimation from "@/components/home/WorkflowAnimation";

const OneRad = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = [
    {
      icon: <MonitorPlay className="w-6 h-6" />,
      title: "Advanced DICOM Viewer",
      desc: "Web-based, zero-footprint viewer with multi-modality support, hanging protocols, and advanced measurement tools.",
      color: "text-brand-teal",
      bg: "bg-brand-teal/10"
    },
    {
      icon: <Receipt className="w-6 h-6" />,
      title: "Billing Automation",
      desc: "Seamlessly integrate imaging workflows with automated invoicing, TPA claims, and revenue tracking.",
      color: "text-brand-sky",
      bg: "bg-brand-sky/10"
    },
    {
      icon: <Building2 className="w-6 h-6" />,
      title: "Multi-Tenant Architecture",
      desc: "Manage multiple diagnostic centers, branches, and modalities from a single centralized dashboard.",
      color: "text-brand-iris",
      bg: "bg-brand-iris/10"
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Enterprise Security",
      desc: "HIPAA and NABH compliant data storage, end-to-end encryption, and role-based access controls.",
      color: "text-brand-teal",
      bg: "bg-brand-teal/10"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Referred Management",
      desc: "Track referring doctors, automate commission payouts, and provide dedicated portals for physicians.",
      color: "text-brand-sky",
      bg: "bg-brand-sky/10"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Work From Anywhere",
      desc: "Teleradiology ready. Enable radiologists to report securely from any location, on any device.",
      color: "text-brand-iris",
      bg: "bg-brand-iris/10"
    }
  ];



  return (
    <div className="min-h-screen bg-background font-sans">
      <SEO 
        title="1Rad - See the Unseen" 
        description="Modern medical SaaS landing page for 1Rad PACS."
      />
      <Navbar />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          {/* Decorative background blur */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-brand-teal/10 via-brand-sky/10 to-transparent blur-3xl -z-10 rounded-full pointer-events-none"></div>

          <div className="container px-6 md:px-8 lg:px-12 text-center max-w-5xl mx-auto space-y-8">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-tight leading-tight">
              See the Unseen with <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-teal to-brand-sky">1Rad PACS</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              A futuristic, cloud-native Radiology Information and Picture Archiving System designed for modern diagnostic centers and teleradiology networks.
            </p>
            <div className="flex justify-center gap-4 pt-4">
              <Link to="/contact">
                <LiquidButton size="lg">
                  Explore 1Rad <ArrowRight className="w-5 h-5 ml-2" />
                </LiquidButton>
              </Link>
            </div>
          </div>
        </section>

        {/* Workflow Pipeline Section */}
        <section className="py-16 bg-slate-50 border-y border-border/50 overflow-hidden">
          <div className="container px-6 md:px-8 lg:px-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Seamless Imaging Workflow</h2>
              <p className="text-muted-foreground mt-2">End-to-end automation from patient walk-in to final discharge.</p>
            </div>

            <WorkflowAnimation />
          </div>
        </section>

        {/* Features Grid Section */}
        <section className="py-20 md:py-28 relative overflow-hidden">
          <div className="container px-6 md:px-8 lg:px-12 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight">
                Enterprise Features for<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-sky to-brand-iris">Modern Radiology</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {features.map((feature, idx) => (
                <div 
                  key={idx}
                  className="group p-8 rounded-3xl bg-white/60 backdrop-blur-xl border border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-xl hover:shadow-brand-teal/10 hover:border-brand-teal/30 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden futuristic-card"
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors ${feature.bg} ${feature.color}`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">{feature.title}</h3>
                  <p className="text-slate-500 leading-relaxed text-sm">
                    {feature.desc}
                  </p>
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-teal/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      
      <Footer />
    </div>
  );
};

export default OneRad;
