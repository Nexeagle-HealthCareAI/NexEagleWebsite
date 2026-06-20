const ProcessApproach = () => {
  const phases = [
    {
      number: "01",
      phase: "Discovery",
      title: "Understand & Align",
      duration: "1-2 weeks",
      description: "We start by deeply understanding your business, users, and goals. Define success metrics and align on vision.",
      activities: [
        "Stakeholder interviews",
        "User research",
        "Technical assessment",
        "Project planning"
      ]
    },
    {
      number: "02",
      phase: "Strategy & Design",
      title: "Plan & Prototype",
      duration: "2-4 weeks",
      description: "Create product strategy, design user experience, and build interactive prototypes. Validate before building.",
      activities: [
        "Product roadmap",
        "UX/UI design",
        "Prototyping",
        "User testing"
      ]
    },
    {
      number: "03",
      phase: "Development",
      title: "Build & Iterate",
      duration: "8-16 weeks",
      description: "Agile development with 2-week sprints. Regular demos, feedback loops, and continuous deployment.",
      activities: [
        "Sprint planning",
        "Development",
        "Code reviews",
        "Testing & QA"
      ]
    },
    {
      number: "04",
      phase: "Launch & Scale",
      title: "Deploy & Optimize",
      duration: "Ongoing",
      description: "Launch to production, monitor performance, gather user feedback, and continuously improve.",
      activities: [
        "Production deployment",
        "Performance monitoring",
        "User feedback",
        "Optimization"
      ]
    }
  ];

  const principles = [
    {
      icon: "🎯",
      title: "Product Mindset",
      description: "We think like product companies, not contractors. Every decision is about long-term value."
    },
    {
      icon: "🔄",
      title: "Agile & Iterative",
      description: "2-week sprints, regular demos, continuous feedback. Ship fast, learn faster."
    },
    {
      icon: "🤝",
      title: "True Partnership",
      description: "We become your extended team. Transparent communication, shared goals, mutual success."
    },
    {
      icon: "📊",
      title: "Data-Driven",
      description: "Decisions backed by data and user insights. Measure everything, optimize continuously."
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="container px-6 md:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="text-center space-y-6 mb-20">
            <p className="text-sm font-semibold uppercase tracking-wider text-purple-600">Our Process</p>
            
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
              How we work<br />
              with you.
            </h2>
            
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              A proven process refined over 50+ projects. Transparent, collaborative, and results-focused.
            </p>
          </div>

          {/* Process Timeline */}
          <div className="space-y-8 mb-20">
            {phases.map((phase, index) => (
              <div key={index} className="relative">
                {/* Connector Line */}
                {index < phases.length - 1 && (
                  <div className="absolute left-8 top-20 w-0.5 h-full bg-slate-200 -z-10"></div>
                )}
                
                <div className="flex gap-8">
                  {/* Phase Number */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold text-lg">
                      {phase.number}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 pb-12">
                    <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-300 hover:shadow-lg transition-all">
                      <div className="flex flex-wrap items-center gap-4 mb-4">
                        <span className="text-sm font-semibold text-purple-600 uppercase tracking-wider">{phase.phase}</span>
                        <span className="px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-medium text-slate-600">
                          {phase.duration}
                        </span>
                      </div>
                      
                      <h3 className="text-2xl font-bold text-slate-900 mb-3">{phase.title}</h3>
                      <p className="text-slate-600 mb-6 leading-relaxed">{phase.description}</p>
                      
                      <div className="grid sm:grid-cols-2 gap-3">
                        {phase.activities.map((activity, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm text-slate-700">
                            <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                            <span>{activity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Principles */}
          <div className="pt-16 border-t border-slate-200">
            <h3 className="text-2xl font-bold text-slate-900 mb-12 text-center">Our Principles</h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {principles.map((principle, index) => (
                <div key={index} className="text-center">
                  <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">{principle.icon}</span>
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">{principle.title}</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">{principle.description}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProcessApproach;
