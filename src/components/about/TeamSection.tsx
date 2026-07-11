"use client";

import { useState, useEffect } from "react";
import { Linkedin, Sparkles, ArrowUpRight } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  credential: string;
  focus: string;
  category: "Founding Team" | "Medical & Research" | "Product & Engineering";
  departments: string[]; // for multi-filter mapping
  image?: string;
  linkedin?: string;
}

interface TeamSectionProps {
  defaultFilter?: string;
  showHeader?: boolean;
}

const TeamSection = ({ defaultFilter = "All", showHeader = true }: TeamSectionProps) => {
  const [activeFilter, setActiveFilter] = useState(defaultFilter);

  useEffect(() => {
    setActiveFilter(defaultFilter);
  }, [defaultFilter]);

  const teamMembers: TeamMember[] = [
    {
      name: "Md Tasquil Noori",
      role: "Co-Founder & Tech Lead",
      credential: "BTech, NIT Warangal",
      focus: "Product architecture, clinical database scale, and system integrations.",
      category: "Founding Team",
      departments: ["Founding Team", "Product & Engineering"],
      image: "/assets/Tasquil_Noori.webp",
      linkedin: "https://www.linkedin.com/in/md-tasquil-noori-82bb441b8/"
    },
    {
      name: "Dr Md Taquedis Noori",
      role: "Co-Founder & Medical Advisor",
      credential: "MS, MCh Urology (IPGMER and SSKM Hospital)",
      focus: "Clinical workflows validation, healthcare compliance, and smart triage.",
      category: "Founding Team",
      departments: ["Founding Team", "Medical & Research"],
      image: "/assets/Taquedis Noori.webp",
      linkedin: "https://www.linkedin.com/in/md-taquedis-noori-59368525b/"
    },
    {
      name: "Md Aquib",
      role: "Co-Founder & Product Manager",
      credential: "IIT Bombay Alumni",
      focus: "Product strategy, OPD patient-journey UX, and healthcare adoption models.",
      category: "Founding Team",
      departments: ["Founding Team", "Product & Engineering"],
      linkedin: "https://www.linkedin.com/in/mdaquibnoori/"
    },
    {
      name: "Dr Md Tabish Noori",
      role: "Healthcare Research Advisor",
      credential: "Research Fellow, Imperial College London",
      focus: "Data science verification, medical research methodologies, and clinical studies.",
      category: "Founding Team",
      departments: ["Founding Team", "Medical & Research"],
      image: "/assets/Tabish Noori.webp",
      linkedin: "https://www.linkedin.com/in/md-tabish-noori-16a815a5/"
    }
  ];

  const filters = [
    { label: "All Team", value: "All" },
    { label: "Founding Team", value: "Founding Team" },
    { label: "Medical & Research", value: "Medical & Research" },
    { label: "Product & Engineering", value: "Product & Engineering" }
  ];

  // Filter team members based on the departments array
  const filteredMembers = activeFilter === "All"
    ? teamMembers
    : teamMembers.filter(member => member.departments.includes(activeFilter));

  const getInitials = (name: string) =>
    name
      .split(" ")
      .filter(Boolean)
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 3);

  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden select-none">
      
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-teal/2 pointer-events-none rounded-full blur-[160px] z-0"></div>

      <div className="container relative z-10 px-6 md:px-8 lg:px-12 max-w-6xl mx-auto">
        
        {showHeader && (
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Meet the <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-teal to-brand-sky">NexEaglians.</span>
            </h2>
            
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-light">
              We are a dedicated group of clinicians, engineers, and product builders working together to design the future of digital healthcare.
            </p>
          </div>
        )}

        {/* Filters bar */}
        {showHeader && (
          <div className="flex flex-wrap justify-center gap-2.5 mb-16 max-w-2xl mx-auto bg-slate-50 p-1.5 rounded-full border border-slate-200/80">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeFilter === filter.value
                    ? "bg-white text-slate-900 shadow-md border border-slate-200/50"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        )}

        {/* Members Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
          {filteredMembers.map((person, index) => (
            <div 
              key={index}
              className="group relative p-8 rounded-3xl bg-white border border-slate-200/80 hover:border-brand-teal/40 hover:shadow-[0_12px_30px_rgba(20,184,166,0.06)] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image / Initial Avatar */}
                <div className="relative w-28 h-28 rounded-2xl overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 mb-6 mx-auto border border-slate-200/60 shadow-xs flex items-center justify-center">
                  {person.image ? (
                    <img
                      src={person.image}
                      alt={person.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      style={{ objectPosition: person.name === "Md Tasquil Noori" ? "50% 5%" : "50% 50%" }}
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-brand-teal/5 to-brand-sky/10 flex items-center justify-center text-3xl font-extrabold text-brand-teal relative group-hover:scale-105 transition-transform duration-500">
                      <div className="absolute inset-0.5 rounded-2xl bg-white flex items-center justify-center">
                        {getInitials(person.name)}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Person details */}
                <div className="text-center space-y-3">
                  <div className="space-y-1">
                    <h4 className="text-xl font-bold text-slate-900 group-hover:text-brand-teal transition-colors duration-200">
                      {person.name}
                    </h4>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      {person.role}
                    </p>
                  </div>

                  {/* Credentials badge */}
                  <div className="inline-block">
                    <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold border border-brand-teal/20 bg-brand-teal/5 text-brand-teal">
                      {person.credential}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-light px-2">
                    {person.focus}
                  </p>
                </div>
              </div>

              {/* Card Footer: Social Actions */}
              {person.linkedin && (
                <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-center">
                  <a 
                    href={person.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-brand-teal transition-colors duration-200"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>Professional Bio</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TeamSection;
