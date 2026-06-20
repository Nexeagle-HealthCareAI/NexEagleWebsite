const ServicesCapabilities = () => {
  const services = [
    {
      icon: "🎯",
      title: "Product Strategy",
      description: "From market research to product-market fit. We help you define what to build and why.",
      capabilities: ["Market analysis", "User research", "Product roadmap", "Go-to-market strategy"]
    },
    {
      icon: "🎨",
      title: "Product Design",
      description: "User-centered design that looks premium and works flawlessly across all devices.",
      capabilities: ["UX/UI design", "Design systems", "Prototyping", "User testing"]
    },
    {
      icon: "⚙️",
      title: "System Architecture",
      description: "Scalable, secure, and maintainable systems designed for growth from day one.",
      capabilities: ["Cloud architecture", "Microservices", "API design", "Database design"]
    },
    {
      icon: "💻",
      title: "Full-Stack Development",
      description: "Modern tech stack. Clean code. Production-ready from the first deployment.",
      capabilities: ["React/Next.js", "Node.js/Python", "Mobile apps", "DevOps & CI/CD"]
    },
    {
      icon: "🤖",
      title: "AI Integration",
      description: "Practical AI that solves real problems. Not AI for the sake of AI.",
      capabilities: ["ML models", "NLP & automation", "Computer vision", "Predictive analytics"]
    },
    {
      icon: "🚀",
      title: "Digital Transformation",
      description: "Modernize legacy systems. Move to cloud. Scale your operations.",
      capabilities: ["Legacy migration", "Cloud adoption", "Process automation", "Team training"]
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="container px-6 md:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="text-center space-y-6 mb-20">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">Engineering Services</p>
            
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
              Your engineering partner<br />
              for ambitious products.
            </h2>
            
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We work with startups and businesses to design, build, and scale digital products that matter.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className="group p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-300 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl">{service.icon}</span>
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">{service.description}</p>
                
                <div className="space-y-2">
                  {service.capabilities.map((capability, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                      <div className="w-1 h-1 rounded-full bg-blue-500"></div>
                      <span>{capability}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default ServicesCapabilities;
