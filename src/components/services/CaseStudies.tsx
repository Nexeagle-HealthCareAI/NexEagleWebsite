const CaseStudies = () => {
  const cases = [
    {
      client: "Healthcare Startup",
      industry: "Healthcare",
      challenge: "Build a telemedicine platform from scratch in 3 months",
      solution: "Full-stack development with video consultation, e-prescriptions, and payment integration",
      results: [
        "Launched in 12 weeks",
        "10K+ consultations in first month",
        "99.9% uptime",
        "4.8/5 user rating"
      ],
      tech: ["React", "Node.js", "PostgreSQL", "AWS"]
    },
    {
      client: "FinTech Company",
      industry: "Financial Services",
      challenge: "Modernize legacy banking system and add AI-powered fraud detection",
      solution: "Microservices architecture with ML-based fraud detection and real-time monitoring",
      results: [
        "80% reduction in fraud",
        "3x faster transactions",
        "Zero downtime migration",
        "50% cost reduction"
      ],
      tech: ["Python", "TensorFlow", "Kubernetes", "MongoDB"]
    },
    {
      client: "E-commerce Platform",
      industry: "Retail",
      challenge: "Scale platform to handle 10x traffic during sales events",
      solution: "Cloud-native architecture with auto-scaling, caching, and performance optimization",
      results: [
        "Handled 100K concurrent users",
        "Page load < 1 second",
        "Zero crashes during peak",
        "40% cost optimization"
      ],
      tech: ["Next.js", "Go", "Redis", "AWS"]
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="container px-6 md:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="text-center space-y-6 mb-20">
            <p className="text-sm font-semibold uppercase tracking-wider text-purple-600">Case Studies</p>
            
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
              Real projects.<br />
              Real results.
            </h2>
            
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              See how we've helped startups and businesses build and scale their products.
            </p>
          </div>

          {/* Case Studies */}
          <div className="space-y-12">
            {cases.map((study, index) => (
              <div key={index} className="p-10 rounded-3xl bg-slate-50 border border-slate-200 hover:shadow-xl transition-shadow">
                <div className="grid lg:grid-cols-[2fr_3fr] gap-10">
                  
                  {/* Left: Overview */}
                  <div className="space-y-6">
                    <div>
                      <div className="inline-block px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 text-sm font-semibold mb-4">
                        {study.industry}
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-2">{study.client}</h3>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-900 mb-2">Challenge</h4>
                      <p className="text-slate-600">{study.challenge}</p>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-900 mb-2">Solution</h4>
                      <p className="text-slate-600">{study.solution}</p>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-900 mb-3">Tech Stack</h4>
                      <div className="flex flex-wrap gap-2">
                        {study.tech.map((tech, idx) => (
                          <span key={idx} className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-sm font-medium text-slate-700">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right: Results */}
                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-900 mb-6">Results</h4>
                    <div className="grid sm:grid-cols-2 gap-6">
                      {study.results.map((result, idx) => (
                        <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                              <span className="text-green-600 text-sm">✓</span>
                            </div>
                            <p className="text-slate-900 font-semibold leading-relaxed">{result}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <p className="text-slate-600 mb-6">Want to see more case studies?</p>
            <a 
              href="mailto:info@nexeagle.com" 
              className="inline-flex items-center gap-2 text-purple-600 font-semibold hover:text-purple-700 transition-colors"
            >
              Request detailed case studies
              <span>→</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
