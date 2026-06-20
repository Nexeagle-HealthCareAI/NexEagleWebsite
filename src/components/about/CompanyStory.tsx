import { useState, useEffect } from "react";

const CompanyStory = () => {
  const targetText = "world-class engineering.";
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const handleTyping = () => {
      if (!isDeleting) {
        // Typing phase
        if (typedText.length < targetText.length) {
          setTypedText((prev) => prev + targetText.charAt(prev.length));
        } else {
          // Pause at the end before erasing
          timer = setTimeout(() => setIsDeleting(true), 2500);
        }
      } else {
        // Erasing phase
        if (typedText.length > 0) {
          setTypedText((prev) => prev.slice(0, -1));
        } else {
          // Pause briefly at the start before typing again
          timer = setTimeout(() => setIsDeleting(false), 500);
        }
      }
    };

    // Control speed
    const speed = isDeleting ? 40 : 80;
    timer = setTimeout(handleTyping, speed);

    return () => clearTimeout(timer);
  }, [typedText, isDeleting]);

  const pillars = [
    {
      num: "01",
      title: "Built by Doctors & Engineers",
      desc: "We are clinicians who understand system code, and developers who understand clinical schedules. We bridge the critical gap between medicine and technology."
    },
    {
      num: "02",
      title: "Eliminating operational bottlenecks",
      desc: "We build to solve documentation fatigue, patient consult friction, and administrative delays that have historically slowed down medical care."
    },
    {
      num: "03",
      title: "Cohesive Operating Systems",
      desc: "We don't design isolated features. We engineer unified networks (1HMS, 1Rad, 1Lab, 1Pharma) to ensure healthcare data works in perfect harmony."
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden select-none">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-teal/5 pointer-events-none rounded-full blur-[140px] z-0"></div>

      <div className="container px-6 md:px-8 lg:px-12 max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Who We Are Title & Sub-headline (5 cols) */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Who We Are.
            </h2>
            
            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
              Bridging clinical expertise <br />
              with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-teal to-brand-sky inline-flex items-center">
                {typedText}
                <span className="text-brand-sky animate-[pulse_1.2s_infinite] ml-0.5 font-light">|</span>
              </span>
            </h3>
          </div>

          {/* Right Column: Numbers/Pillars List (7 cols) - Pure Text Blocks */}
          <div className="lg:col-span-7 space-y-12">
            {pillars.map((pillar, idx) => (
              <div key={idx} className="flex gap-6 items-start border-l border-slate-100 pl-6 relative">
                <span className="text-sm font-extrabold text-brand-teal tracking-wider select-none pt-1 shrink-0">
                  {pillar.num}
                </span>
                <div className="space-y-2">
                  <h4 className="text-lg md:text-xl font-extrabold text-slate-900">
                    {pillar.title}
                  </h4>
                  <p className="text-sm md:text-base text-slate-600 leading-relaxed font-normal">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default CompanyStory;
