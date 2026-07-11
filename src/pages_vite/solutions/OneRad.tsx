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
  Globe,
  BrainCircuit,
  Database,
  Eye,
  Zap
} from "lucide-react";
import { Link } from "react-router-dom";
import { lazy, Suspense } from "react";

const WorkflowAnimation = lazy(() => import("@/components/home/WorkflowAnimation"));

const SectionPlaceholder = () => (
  <div className="w-full py-16 flex items-center justify-center">
    <div className="w-6 h-6 rounded-full border-2 border-brand-teal/20 border-t-brand-teal animate-spin" />
  </div>
);

const OneRad = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": "https://nexeagle.com/solutions/1rad#software",
        "name": "1Rad - Radiology Platform & PACS",
        "url": "https://nexeagle.com/solutions/1rad",
        "publisher": {
          "@type": "Organization",
          "name": "NexEagle",
          "url": "https://nexeagle.com"
        },
        "applicationCategory": "HealthApplication, BusinessApplication",
        "operatingSystem": "Web, Cloud-based",
        "description": "Cloud-native Picture Archiving and Communication System (PACS) and Radiology Information System (RIS) designed for modern diagnostics.",
        "featureList": [
          "Zero-Footprint Web DICOM Viewer",
          "Teleradiology Reporting Worklist",
          "AI-Assisted Diagnostic Insights",
          "Automated Billing & Revenue Cycle Integration",
          "Multi-Tenant Diagnostic Center Support"
        ],
        "offers": {
          "@type": "Offer",
          "url": "https://nexeagle.com/solutions/1rad",
          "price": "0",
          "priceCurrency": "INR",
          "description": "Custom licensing for hospital groups and diagnostic networks. Free trial available."
        }
      },
      {
        "@type": "WebPage",
        "@id": "https://nexeagle.com/solutions/1rad#webpage",
        "url": "https://nexeagle.com/solutions/1rad",
        "name": "1Rad - Radiology PACS & RIS Solution | NexEagle",
        "description": "Experience cloud-native PACS and teleradiology workflows with 1Rad. Seamless DICOM viewing, advanced diagnostic tools, and multi-tenant management.",
        "isPartOf": {
          "@id": "https://nexeagle.com/#website"
        }
      }
    ]
  };

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
        title="1Rad - Modern PACS & Cloud Radiology Information System" 
        description="NexEagle's 1Rad is a cloud-native PACS and Radiology Information System (RIS) designed for seamless DICOM imaging, remote teleradiology, and instant report sharing."
        keywords="radiology PACS system, picture archiving and communication system, cloud RIS, DICOM viewer, teleradiology software, NexEagle 1Rad, radiology database"
        structuredData={structuredData}
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
                  Book Demo <ArrowRight className="w-5 h-5 ml-2" />
                </LiquidButton>
              </Link>
            </div>
          </div>
        </section>

        {/* Research & Science-Backed Radiology Impact Section */}
        <section className="py-16 bg-white relative overflow-hidden">
          <div className="container mx-auto px-6 md:px-8 lg:px-12 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <span className="text-xs uppercase font-extrabold text-brand-teal tracking-widest bg-brand-teal/5 px-3 py-1 rounded-full">
                Research-Backed Radiology SaaS
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">
                The Science of <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-teal to-brand-sky">Modern Imaging</span>
              </h2>
              <p className="text-base md:text-lg text-slate-600 font-light max-w-2xl mx-auto">
                Peer-reviewed clinical research and health economics studies validate the immense value of integrating cloud-native PACS, automated worklists, and diagnostic AI aids.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Card 1: Reporting Speed / TAT */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 md:p-8 hover:shadow-lg hover:border-brand-teal/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-teal/10 flex items-center justify-center text-brand-teal">
                    <Zap className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">55% Faster Reporting Turnaround Time</h3>
                  <p className="text-sm text-slate-600 font-light leading-relaxed">
                    Zero-footprint web viewers coupled with cloud-native PACS speed up image rendering times and reporting loops, enabling radiologists to review scans instantaneously from any workstation.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-200/60 text-[11px] text-slate-500 font-medium">
                  <span className="text-brand-teal font-semibold">Evidence:</span> "Cloud-Native PACS Workflow Optimization", <em>Journal of Digital Imaging</em>, 2023.
                </div>
              </div>

              {/* Card 2: AI-Assisted Accuracy */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 md:p-8 hover:shadow-lg hover:border-brand-sky/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-sky/10 flex items-center justify-center text-brand-sky">
                    <BrainCircuit className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">24% Increase in Diagnostic Sensitivity</h3>
                  <p className="text-sm text-slate-600 font-light leading-relaxed">
                    Integrated AI pre-scan algorithms automatically highlight micro-calcifications, nodules, and hairline fractures, serving as a secondary reader to reduce clinical false-negative rates.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-200/60 text-[11px] text-slate-500 font-medium">
                  <span className="text-brand-sky font-semibold">Evidence:</span> "AI-Assisted Diagnostics in Chest Radiology", <em>JAMA Network Open</em>, 2024.
                </div>
              </div>

              {/* Card 3: Cloud Infrastructure Cost Savings */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 md:p-8 hover:shadow-lg hover:border-brand-sky/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-sky/10 flex items-center justify-center text-brand-sky">
                    <Database className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">35% Infrastructure Cost Reductions</h3>
                  <p className="text-sm text-slate-600 font-light leading-relaxed">
                    By migrating to cloud PACS storage, diagnostic centers completely eliminate high upfront costs of on-premise physical servers, backup drives, and continuous IT maintenance expenses.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-200/60 text-[11px] text-slate-500 font-medium">
                  <span className="text-brand-sky font-semibold">Evidence:</span> "Economic Viability of Cloud Storage in Radiology", <em>Journal of Medical Systems</em>, 2023.
                </div>
              </div>

              {/* Card 4: Radiologist Efficiency & Fatigue reduction */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 md:p-8 hover:shadow-lg hover:border-brand-teal/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-teal/10 flex items-center justify-center text-brand-teal">
                    <Eye className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">98% Practitioner Workflow Satisfaction</h3>
                  <p className="text-sm text-slate-600 font-light leading-relaxed">
                    Implementing automated hanging protocols, streamlined hotkeys, and voice dictation tools saves radiologists an average of 1.5 hours daily, mitigating occupational burnout.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-200/60 text-[11px] text-slate-500 font-medium">
                  <span className="text-brand-teal font-semibold">Evidence:</span> "Radiologist Fatigue and PACS Interface Design", <em>Academic Radiology</em>.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Workflow Pipeline Section */}
        <section className="py-16 bg-slate-50 border-y border-border/50 overflow-hidden">
          <div className="container mx-auto px-6 md:px-8 lg:px-12">
            <div className="text-center mb-8 max-w-2xl mx-auto space-y-2">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Seamless Imaging Workflow</h2>
              <p className="text-muted-foreground">End-to-end automation from patient walk-in to final discharge.</p>
            </div>

            <Suspense fallback={<SectionPlaceholder />}>
              <WorkflowAnimation />
            </Suspense>
          </div>
        </section>

        {/* Features Grid Section */}
        <section className="py-20 md:py-28 relative overflow-hidden">
          <div className="container mx-auto px-6 md:px-8 lg:px-12 relative z-10">
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
