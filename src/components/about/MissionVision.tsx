import React from "react";

const MissionVision = () => {
  const values = [
    {
      title: "Clinician Empathy",
      desc: "We build with deep respect for doctor-patient time. Every second saved on manual EMR data entry is returned directly to patient care."
    },
    {
      title: "Highest Integrity",
      desc: "Healthcare systems demand absolute reliability. Secure databases, user compliance, and patient data safety are built into our core foundation."
    },
    {
      title: "Execution Speed",
      desc: "Fast iteration, responsive support, and instant deployments. We deliver product setups in 48 hours and continuously refine on user feedback."
    },
    {
      title: "Unified Ecosystem",
      desc: "We think in systems, not features. Every clinical module (1HMS, 1Rad, 1Lab, 1Pharma) works in harmony to form a single source of truth."
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-slate-50 relative overflow-hidden select-none border-y border-slate-200/50">
      
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-teal/5 rounded-full blur-[120px] pointer-events-none z-0"></div>
      
      <div className="container relative z-10 px-6 md:px-8 lg:px-12 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Vision & Mission (5 cols) */}
          <div className="lg:col-span-5 space-y-10 text-left">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                Value & Vision.
              </h2>
            </div>
            
            <div className="space-y-8">
              <div className="space-y-2 relative overflow-hidden">
                <div className="font-extrabold text-slate-900 text-lg md:text-xl">
                  Our Vision
                </div>
                <p className="text-sm md:text-base text-slate-600 leading-relaxed font-normal">
                  To build the clinical OS that connects medical providers, diagnostic networks, and AI assistants—eliminating clinician fatigue and maximizing patient outcomes.
                </p>
              </div>

              <div className="space-y-2 relative overflow-hidden">
                <div className="font-extrabold text-slate-900 text-lg md:text-xl">
                  Our Mission
                </div>
                <p className="text-sm md:text-base text-slate-600 leading-relaxed font-normal">
                  Empowering clinicians with real-time dictation reports, unified records, and intelligent checklists to deliver high-quality, mistake-free care.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Core Values Grid (7 cols) - Pure Text Blocks */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-12 pt-2">
            {values.map((val, idx) => (
              <div key={idx} className="space-y-2.5">
                <h3 className="text-lg md:text-xl font-extrabold text-slate-900">{val.title}</h3>
                <p className="text-sm md:text-base text-slate-600 leading-relaxed font-normal">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default MissionVision;
