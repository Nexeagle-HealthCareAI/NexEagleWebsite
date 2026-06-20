const WhyNexEagle = () => {
  const differentiators = [
    {
      number: "01",
      title: "We Understand Your Business right",
      description: "We don't just write code. We learn your business, understand your challenges, and build software that actually helps."
    },
    {
      number: "02",
      title: "Healthcare Specialists",
      description: "We've built complete healthcare systems. We know the industry, regulations, and what works in real hospitals."
    },
    {
      number: "03",
      title: "Any Industry Welcome",
      description: "Healthcare is our specialty, but we build software for retail, education, logistics, finance, and any business."
    },
    {
      number: "04",
      title: "Fast & Affordable",
      description: "We build custom software faster and cheaper than traditional agencies. Quality code, reasonable prices."
    },
    {
      number: "05",
      title: "Built to Last",
      description: "We build software that grows with your business. Easy to update, easy to maintain, built for the long term."
    },
    {
      number: "06",
      title: "Your Success Partner",
      description: "We're not just developers. We're your technology partner, invested in making your business succeed."
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-slate-50 to-white">
      <div className="container px-6 md:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="text-center space-y-6 mb-20">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">Why Choose Us</p>
            
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
              Built different.<br />
              Built for the long term.
            </h2>
          </div>

          {/* Differentiators Grid */}
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
            {differentiators.map((item, index) => (
              <div key={index} className="relative">
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="text-5xl font-bold text-slate-200">{item.number}</div>
                  </div>
                  <div className="pt-2">
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">{item.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 pt-16 border-t border-slate-200">
            <div className="text-center">
              <div className="text-4xl font-bold text-slate-900 mb-2">4</div>
              <div className="text-sm text-slate-600">Healthcare Products</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-slate-900 mb-2">100+</div>
              <div className="text-sm text-slate-600">Custom Projects</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-slate-900 mb-2">50+</div>
              <div className="text-sm text-slate-600">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-slate-900 mb-2">24/7</div>
              <div className="text-sm text-slate-600">Support Available</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyNexEagle;
