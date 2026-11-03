import React from "react";
import { Quote } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  degree: string;
  specialty: string;
  hospital: string;
  text: string;
  initials: string;
  watermark: React.ReactNode;
}

// Only REAL, permission-granted quotes from live customers go here (e.g. Sparsh Hospital,
// Glisan Super Speciality Hospital, AG Smart Scan). The section hides itself while this is empty.
// The previous placeholder quotes were removed: they named hospitals/doctors that are not customers.
const testimonials: Testimonial[] = [];

export const Testimonials = () => {
  if (testimonials.length === 0) return null;
  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-gradient-to-b from-white to-slate-50 overflow-hidden relative select-none">
      {/* Decorative Background Accents */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-brand-teal/5 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-brand-sky/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="container mx-auto px-6 md:px-8 lg:px-12 mb-16 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight mb-4">
          What Doctors Say About Us
        </h2>
        
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-600 font-light leading-relaxed">
          See how leading clinicians and healthcare professionals across India utilize NEXEAGLE to digitize operations and elevate patient care.
        </p>
      </div>

      {/* Sliding Marquee Wrapper (Single Row Layout) */}
      <div className="flex flex-col gap-6 w-full relative">
        <div className="flex overflow-x-hidden w-full relative group">
          {/* Infinite marquee scrolling row */}
          <div className="flex gap-6 animate-[marquee_50s_linear_infinite] hover:[animation-play-state:paused] whitespace-nowrap py-4">
            {/* Render Testimonials twice for seamless looping */}
            {[...testimonials, ...testimonials].map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                className="w-[26rem] bg-white/90 backdrop-blur-md border border-slate-200/50 shadow-soft hover:shadow-hover hover:-translate-y-1 transition-all duration-300 rounded-3xl p-7 flex flex-col justify-between whitespace-normal relative overflow-hidden group"
              >
                {/* Subtle Health Sector Watermark Background */}
                {item.watermark}
                
                {/* Card Top / Quote Icon */}
                <div className="relative z-10">
                  <div className="flex items-center mb-5">
                    <div className="p-2 bg-brand-teal/5 rounded-xl text-brand-teal">
                      <Quote className="w-5 h-5 fill-brand-teal/10" />
                    </div>
                  </div>
                  
                  {/* Testimonial Quote */}
                  <p className="text-slate-700 font-light leading-relaxed mb-6 text-[15px] sm:text-base pr-4">
                    &quot;{item.text}&quot;
                  </p>
                </div>

                {/* Doctor details */}
                <div className="border-t border-slate-100 pt-4 flex items-center gap-4 relative z-10">
                  {/* Doctor Avatar */}
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-sky/20 to-brand-teal/20 border border-brand-teal/15 flex items-center justify-center text-brand-teal font-extrabold text-sm tracking-wide shrink-0">
                    {item.initials}
                  </div>
                  {/* Doctor Info */}
                  <div className="flex flex-col min-w-0">
                    <span className="font-bold text-slate-900 text-sm sm:text-base leading-snug truncate">
                      {item.name}
                    </span>
                    <span className="text-xs text-brand-teal font-semibold truncate">
                      {item.degree}
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium leading-relaxed truncate">
                      {item.specialty} — {item.hospital}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
