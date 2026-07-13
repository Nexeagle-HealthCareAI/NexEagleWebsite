"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Clock, Briefcase, Mail, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  skills: string[];
  description: string;
  requirements: string[];
}

export default function CareersClient() {
  const [expandedJob, setExpandedJob] = useState<string | null>(null);

  const jobs: Job[] = [
    {
      id: "ai-engineer",
      title: "AI Engineer",
      department: "Engineering",
      location: "Kolkata / Remote",
      type: "Full-time",
      experience: "2-4 years",
      skills: ["Python", "NLP", "LLMs", "RAG", "Vector Databases"],
      description: "Help build and scale NexEagle AI, our virtual clinical assistant that automates EMR documentation, ambient voice scribing, and smart triaging.",
      requirements: [
        "Strong experience with Python and deep learning frameworks.",
        "Hands-on expertise with Large Language Models (LLMs), prompt engineering, and Retrieval-Augmented Generation (RAG).",
        "Experience deploying machine learning models in secure, production cloud environments.",
        "Interest or experience in healthcare IT standards is a major plus."
      ]
    },
    {
      id: "digital-marketing",
      title: "Digital Marketing Specialist",
      department: "Growth & Marketing",
      location: "Kolkata / Remote",
      type: "Full-time",
      experience: "1-3 years",
      skills: ["SEO", "B2B Growth", "Content Strategy", "Performance Ads", "Analytics"],
      description: "Lead growth, brand outreach, and user acquisition across hospitals, clinical networks, and diagnostic laboratories in India.",
      requirements: [
        "Proven experience in B2B SaaS growth, lead generation, and performance marketing.",
        "Strong copywriter capable of crafting educational content for medical professionals.",
        "Proficiency with SEO tools, Google Analytics, and running targeted LinkedIn/email campaigns.",
        "Understanding of the clinical IT or healthtech landscape is highly preferred."
      ]
    }
  ];

  const toggleJob = (id: string) => {
    setExpandedJob(expandedJob === id ? null : id);
  };

  return (
    <main className="pt-32 pb-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 bg-gradient-to-b from-teal-50/30 via-white to-white select-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-teal/5 pointer-events-none rounded-full blur-[140px] z-0"></div>
        
        <div className="container relative z-10 px-6 md:px-8 lg:px-12 max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
            Build the future of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-teal to-brand-sky">healthcare technology.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-light leading-relaxed">
            We are a team of engineers and doctors building clinical operating systems (1HMS, 1Rad, 1Lab, 1Pharma) that eliminate operational friction and respect clinician time.
          </p>
        </div>
      </section>

      {/* Jobs List Section */}
      <section className="container px-6 md:px-8 lg:px-12 max-w-4xl mx-auto mt-8 relative z-10 select-none">
        <div className="space-y-4">
          <div className="border-b border-slate-100 pb-4 mb-8">
            <h2 className="text-2xl font-extrabold text-slate-900">Open Positions</h2>
            <p className="text-sm text-slate-500 mt-1">Select a role below to view requirements and apply.</p>
          </div>

          <div className="space-y-6">
            {jobs.map((job) => {
              const isExpanded = expandedJob === job.id;
              return (
                <div
                  key={job.id}
                  className={`p-6 md:p-8 rounded-3xl border transition-all duration-300 ${
                    isExpanded 
                      ? "bg-slate-50/50 border-brand-teal/30 shadow-md" 
                      : "bg-white border-slate-200/80 hover:border-brand-teal/30 hover:shadow-sm"
                  }`}
                >
                  {/* Header Row */}
                  <div 
                    className="flex justify-between items-start gap-4 cursor-pointer"
                    onClick={() => toggleJob(job.id)}
                  >
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2">
                        <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-teal/5 text-brand-teal border border-brand-teal/10">
                          {job.department}
                        </span>
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-slate-900 group-hover:text-brand-teal">
                        {job.title}
                      </h3>
                      
                      {/* Meta Tags */}
                      <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-500 font-medium">
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          {job.type}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Briefcase className="w-3.5 h-3.5" />
                          {job.experience}
                        </span>
                      </div>
                    </div>

                    <button className="text-slate-400 hover:text-brand-teal p-1 mt-1">
                      {isExpanded ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
                    </button>
                  </div>

                  {/* Collapsible Details */}
                  {isExpanded && (
                    <div className="mt-6 pt-6 border-t border-slate-200/60 space-y-6 animate-[fadeIn_0.2s_ease-out]">
                      <div className="space-y-2">
                        <h4 className="text-sm font-extrabold uppercase text-slate-400 tracking-wider">About the Role</h4>
                        <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                          {job.description}
                        </p>
                      </div>

                      {/* Skills */}
                      <div className="space-y-2.5">
                        <h4 className="text-sm font-extrabold uppercase text-slate-400 tracking-wider">Key Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {job.skills.map((skill) => (
                            <span key={skill} className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Requirements */}
                      <div className="space-y-3">
                        <h4 className="text-sm font-extrabold uppercase text-slate-400 tracking-wider">Requirements</h4>
                        <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600 leading-relaxed">
                          {job.requirements.map((req, i) => (
                            <li key={i}>{req}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Apply CTA */}
                      <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                        <a 
                          href={`mailto:info@nexeagle.com?subject=Application for ${job.title}&body=Hi team, I would like to apply for the ${job.title} position...`}
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-teal hover:bg-brand-teal/90 text-white rounded-full text-sm font-semibold shadow-md shadow-brand-teal/10 transition-colors"
                        >
                          <Mail className="w-4 h-4" />
                          <span>Apply via Email</span>
                        </a>
                        <Button asChild variant="outline" className="w-full sm:w-auto rounded-full border-slate-200 text-slate-700 hover:bg-slate-50">
                          <Link href="/contact">
                            <span>Ask Questions</span>
                            <ArrowRight className="w-4 h-4 ml-1.5" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* General Application Banner */}
      <section className="container px-6 md:px-8 lg:px-12 max-w-4xl mx-auto mt-16 select-none">
        <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl font-bold text-slate-900">Don&apos;t see a perfect fit?</h3>
            <p className="text-sm text-slate-500 max-w-lg leading-relaxed">
              We are always excited to meet clinicians who code, developers interested in healthcare, and growth specialists. Drop us your resume!
            </p>
          </div>
          <a 
            href="mailto:info@nexeagle.com?subject=General Application"
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-700 rounded-full text-sm font-semibold shadow-xs transition-colors shrink-0"
          >
            <span>General Application</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </main>
  );
}
