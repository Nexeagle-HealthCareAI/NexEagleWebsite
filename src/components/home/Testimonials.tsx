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

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Dr. Neelesh Kapoor",
    degree: "MD (Internal Medicine)",
    specialty: "Senior Consultant",
    hospital: "Kapoor Clinic, Delhi",
    text: "Transitioning from paper prescriptions to NEXEAGLE EMR was incredibly smooth. The smart EMR templates save me at least 2 hours every day during busy OPD hours.",
    initials: "NK",
    watermark: (
      <svg className="absolute right-4 bottom-4 w-28 h-28 text-brand-teal/5 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        {/* Stethoscope */}
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a4 4 0 00-4 4v4a4 4 0 008 0V6a4 4 0 00-4-4zm0 12v6m0 0a3 3 0 11-6 0m6 0a3 3 0 106 0" />
      </svg>
    )
  },
  {
    id: 2,
    name: "Dr. Ravi Prakash",
    degree: "MBBS, D.Ortho",
    specialty: "Orthopedic Surgeon",
    hospital: "Bone & Joint Centre, Bangalore",
    text: "With NEXEAGLE 1Rad integrated directly into my consultation room, I can view patient X-rays instantly. It has completely eliminated diagnostic wait times.",
    initials: "RP",
    watermark: (
      <svg className="absolute right-4 bottom-4 w-28 h-28 text-brand-teal/5 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        {/* Joint / Bone Geometry */}
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4h4v4H4zm12 12h4v4h-4zM6 8v8m12-8v8M8 12h8" />
      </svg>
    )
  },
  {
    id: 3,
    name: "Dr. Sanjana S. N.",
    degree: "MD, DGO",
    specialty: "Consultant Gynecologist",
    hospital: "Maternal Care Hospital, Mumbai",
    text: "NEXEAGLE's patient scheduling and automated follow-ups have revolutionized our patient retention. The notes module is highly customizable for maternity workflows.",
    initials: "SS",
    watermark: (
      <svg className="absolute right-4 bottom-4 w-28 h-28 text-brand-teal/5 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        {/* Double Heart */}
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    )
  },
  {
    id: 4,
    name: "Dr. Advait Kulkarni",
    degree: "DM (Neurology)",
    specialty: "Consultant Neurologist",
    hospital: "NeuroHealth Clinic, Pune",
    text: "The multi-facility operation support of NEXEAGLE allows me to manage my city hospital and outpatient center seamlessly from one unified dashboard.",
    initials: "AK",
    watermark: (
      <svg className="absolute right-4 bottom-4 w-28 h-28 text-brand-teal/5 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        {/* Brain / Neural Circuit */}
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM12 6v12M6 12h12" />
      </svg>
    )
  },
  {
    id: 5,
    name: "Dr. Pritee Mehta",
    degree: "MBBS, MD",
    specialty: "Consultant Pediatrician",
    hospital: "Little Stars Clinic, Ahmedabad",
    text: "Immunization tracking and growth charts in NEXEAGLE are incredibly helpful. The automated billing module is extremely fast, making checkout stress-free.",
    initials: "PM",
    watermark: (
      <svg className="absolute right-4 bottom-4 w-28 h-28 text-brand-teal/5 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        {/* Star / Sparkle */}
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l1.912 5.886h6.19l-5.007 3.638 1.912 5.886-5.007-3.638-5.007 3.638 1.912-5.886-5.007-3.638h6.19z" />
      </svg>
    )
  },
  {
    id: 6,
    name: "Dr. Tabish Noori",
    degree: "MBBS, MD (Radiology)",
    specialty: "Chief Radiologist",
    hospital: "Advanced Diagnostics, Kolkata",
    text: "The DICOM viewer and PACS integration in NEXEAGLE 1Rad are world-class. Writing and signing off on radiology reports is three times faster now.",
    initials: "TN",
    watermark: (
      <svg className="absolute right-4 bottom-4 w-28 h-28 text-brand-teal/5 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        {/* Radiology / Scan Waves */}
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 12a8 8 0 0116 0m-14 0a6 6 0 0112 0m-10 0a4 4 0 018 0" />
      </svg>
    )
  },
  {
    id: 7,
    name: "Dr. G. Ramesh",
    degree: "MD, DM (Cardiology)",
    specialty: "Interventional Cardiologist",
    hospital: "HeartCare Foundation, Hyderabad",
    text: "Clinical decision support and drug interaction warnings in NEXEAGLE EMR provide an extra layer of patient safety. It's an essential tool for cardiology.",
    initials: "GR",
    watermark: (
      <svg className="absolute right-4 bottom-4 w-28 h-28 text-brand-teal/5 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        {/* Heartbeat ECG Line */}
        <path strokeLinecap="round" strokeLinejoin="round" d="M2 12h3l2-7l3 14l2-10l2 3h10" />
      </svg>
    )
  },
  {
    id: 8,
    name: "Dr. K. S. Iyengar",
    degree: "MD, FNB (Critical Care)",
    specialty: "ICU Director",
    hospital: "Fortis Hospitals, Chennai",
    text: "NEXEAGLE has completely digitized our ICU flowsheets and lab integrations. Real-time patient alerts on vitals help our critical care team respond instantly.",
    initials: "KI",
    watermark: (
      <svg className="absolute right-4 bottom-4 w-28 h-28 text-brand-teal/5 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        {/* Shield with Medical Cross */}
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zm-3-10h6m-3-3v6" />
      </svg>
    )
  },
];

export const Testimonials = () => {
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

        {/* KPIs */}
        <div className="flex justify-center items-center gap-12 mt-8 select-none">
          <div className="flex flex-col items-center">
            <span className="text-4xl sm:text-5xl font-black text-brand-teal tracking-tight">10+</span>
            <span className="text-[10px] sm:text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">1HMS</span>
          </div>
          <div className="w-px h-10 bg-slate-200" />
          <div className="flex flex-col items-center">
            <span className="text-4xl sm:text-5xl font-black text-brand-sky tracking-tight">5+</span>
            <span className="text-[10px] sm:text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">1Rad</span>
          </div>
        </div>
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
