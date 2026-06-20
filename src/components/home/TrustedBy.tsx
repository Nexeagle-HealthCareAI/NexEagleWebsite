import React from "react";
import { Stethoscope, Plus, Activity, Heart, Microscope, Shield } from "lucide-react";

const TrustedBy = () => {
  const clients = [
    { name: "AppleTree Clinic", icon: <Stethoscope className="w-5 h-5 text-brand-teal" /> },
    { name: "The Family Clinic", icon: <Heart className="w-5 h-5 text-brand-sky" /> },
    { name: "Diamond Hospital", icon: <Activity className="w-5 h-5 text-brand-iris" /> },
    { name: "Dr. Lathiya Skin", icon: <Plus className="w-5 h-5 text-brand-teal" /> },
    { name: "Pulse Speciality", icon: <Microscope className="w-5 h-5 text-brand-sky" /> },
    { name: "Navayu Healthcare", icon: <Shield className="w-5 h-5 text-brand-iris" /> }
  ];

  // Duplicate to ensure seamless scrolling
  const duplicatedClients = [...clients, ...clients, ...clients, ...clients];

  return (
    <section className="py-12 bg-background border-t border-border/40 overflow-hidden">
      <div className="container mx-auto px-4 text-center mb-8">
        <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          Trusted by Leading Healthcare Providers
        </p>
      </div>

      <div className="relative flex overflow-x-hidden group">
        {/* Left and Right Fade Gradients */}
        <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"></div>

        <div className="flex animate-marquee group-hover:[animation-play-state:paused] whitespace-nowrap">
          {duplicatedClients.map((client, idx) => (
            <div 
              key={idx} 
              className="flex items-center gap-2 mx-8 px-6 py-3 rounded-xl bg-card border border-border shadow-sm hover:shadow-md hover:border-brand-teal/50 transition-all duration-300"
            >
              {client.icon}
              <span className="font-bold text-foreground">{client.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
