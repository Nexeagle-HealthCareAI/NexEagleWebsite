const ServiceDetails = () => {
  const services = [
    {
      id: "strategy",
      icon: "🎯",
      name: "Product Strategy",
      tagline: "Define what to build and why",
      description: "We help you validate ideas, understand your market, and create a clear product roadmap. Strategy before execution.",
      color: "purple",
      deliverables: [
        {
          title: "Market Research",
          items: ["Competitive analysis", "Market sizing", "Trend analysis", "Opportunity assessment"]
        },
        {
          title: "User Research",
          items: ["User interviews", "Persona development", "Journey mapping", "Pain point analysis"]
        },
        {
          title: "Product Definition",
          items: ["Feature prioritization", "MVP scope", "Success metrics", "Go-to-market strategy"]
        },
        {
          title: "Roadmap Planning",
          items: ["Release planning", "Timeline estimation", "Resource allocation", "Risk assessment"]
        }
      ],
      outcomes: [
        "Clear product vision and strategy",
        "Validated market opportunity",
        "Prioritized feature roadmap",
        "Reduced risk of building wrong product"
      ]
    },
    {
      id: "design",
      icon: "🎨",
      name: "Product Design",
      tagline: "Beautiful, functional, user-centered",
      description: "We create designs that users love and that work flawlessly. From wireframes to high-fidelity prototypes.",
      color: "blue",
      deliverables: [
        {
          title: "UX Design",
          items: ["Information architecture", "User flows", "Wireframes", "Prototypes"]
        },
        {
          title: "UI Design",
          items: ["Visual design", "Design system", "Component library", "Responsive layouts"]
        },
        {
          title: "User Testing",
          items: ["Usability testing", "A/B testing", "Feedback analysis", "Iteration"]
        },
        {
          title: "Design Handoff",
          items: ["Design specs", "Asset export", "Developer collaboration", "QA support"]
        }
      ],
      outcomes: [
        "Intuitive user experience",
        "Premium visual design",
        "Consistent design system",
        "Validated with real users"
      ]
    },
    {
      id: "development",
      icon: "💻",
      name: "Full-Stack Development",
      tagline: "Modern tech, production-ready code",
      description: "We build scalable, maintainable products using modern technologies. Clean code, best practices, and thorough testing.",
      color: "green",
      deliverables: [
        {
          title: "Frontend Development",
          items: ["React/Next.js", "TypeScript", "Responsive design", "Performance optimization"]
        },
        {
          title: "Backend Development",
          items: ["Node.js/Python/Go", "RESTful APIs", "Database design", "Authentication & security"]
        },
        {
          title: "Mobile Development",
          items: ["React Native", "iOS & Android", "Native features", "App store deployment"]
        },
        {
          title: "DevOps & Infrastructure",
          items: ["Cloud deployment", "CI/CD pipelines", "Monitoring", "Scaling"]
        }
      ],
      outcomes: [
        "Production-ready application",
        "Scalable architecture",
        "Clean, maintainable code",
        "Comprehensive documentation"
      ]
    },
    {
      id: "ai",
      icon: "🤖",
      name: "AI Integration",
      tagline: "Intelligence that creates value",
      description: "We integrate AI where it makes sense. Practical applications that solve real problems and create measurable value.",
      color: "orange",
      deliverables: [
        {
          title: "AI Strategy",
          items: ["Use case identification", "Feasibility analysis", "Data requirements", "ROI projection"]
        },
        {
          title: "Model Development",
          items: ["Data preparation", "Model training", "Performance tuning", "Validation"]
        },
        {
          title: "Integration",
          items: ["API development", "Real-time inference", "Batch processing", "Monitoring"]
        },
        {
          title: "Optimization",
          items: ["Performance tuning", "Cost optimization", "Continuous learning", "A/B testing"]
        }
      ],
      outcomes: [
        "AI-powered features",
        "Improved user experience",
        "Automated workflows",
        "Data-driven insights"
      ]
    }
  ];

  const colorClasses: Record<string, any> = {
    purple: {
      bg: "bg-purple-50",
      border: "border-purple-200",
      text: "text-purple-700",
      accent: "bg-purple-500"
    },
    blue: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-700",
      accent: "bg-blue-500"
    },
    green: {
      bg: "bg-green-50",
      border: "border-green-200",
      text: "text-green-700",
      accent: "bg-green-500"
    },
    orange: {
      bg: "bg-orange-50",
      border: "border-orange-200",
      text: "text-orange-700",
      accent: "bg-orange-500"
    }
  };

  return (
    <section className="py-24 md:py-32 bg-slate-50">
      <div className="container px-6 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto space-y-32">
          
          {services.map((service, index) => {
            const colors = colorClasses[service.color];
            const isEven = index % 2 === 0;

            return (
              <div key={service.id} id={service.id} className="scroll-mt-24">
                <div className={`grid lg:grid-cols-2 gap-12 items-start ${!isEven ? 'lg:flex-row-reverse' : ''}`}>
                  
                  {/* Service Info */}
                  <div className={`space-y-8 ${!isEven ? 'lg:order-2' : ''}`}>
                    <div>
                      <div className={`inline-flex items-center gap-3 px-5 py-2.5 rounded-full ${colors.bg} ${colors.border} border mb-6`}>
                        <span className="text-2xl">{service.icon}</span>
                        <span className={`text-sm font-semibold ${colors.text}`}>{service.name}</span>
                      </div>
                      
                      <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                        {service.tagline}
                      </h2>
                      
                      <p className="text-xl text-slate-600 leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    {/* Outcomes */}
                    <div className="space-y-3">
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900">What You Get</h3>
                      {service.outcomes.map((outcome, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className={`w-6 h-6 rounded-lg ${colors.accent} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                            <span className="text-white text-xs">✓</span>
                          </div>
                          <span className="text-slate-700">{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Deliverables Grid */}
                  <div className={`${!isEven ? 'lg:order-1' : ''}`}>
                    <div className="grid sm:grid-cols-2 gap-6">
                      {service.deliverables.map((deliverable, idx) => (
                        <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200 hover:shadow-lg transition-shadow">
                          <h4 className="text-lg font-bold text-slate-900 mb-4">{deliverable.title}</h4>
                          <ul className="space-y-2">
                            {deliverable.items.map((item, itemIdx) => (
                              <li key={itemIdx} className="flex items-start gap-2 text-sm text-slate-600">
                                <span className={`w-1.5 h-1.5 rounded-full ${colors.accent} mt-1.5 flex-shrink-0`}></span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
};

export default ServiceDetails;
