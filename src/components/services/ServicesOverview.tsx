const ServicesOverview = () => {
  const offerings = [
    {
      icon: "🎯",
      title: "Product Strategy",
      description: "Define what to build and why. Market research, user insights, and product roadmap.",
      color: "purple"
    },
    {
      icon: "🎨",
      title: "Product Design",
      description: "User-centered design that looks premium and works flawlessly across all devices.",
      color: "blue"
    },
    {
      icon: "⚙️",
      title: "System Architecture",
      description: "Scalable, secure systems designed for growth from day one.",
      color: "indigo"
    },
    {
      icon: "💻",
      title: "Full-Stack Development",
      description: "Modern tech stack. Clean code. Production-ready from first deployment.",
      color: "green"
    },
    {
      icon: "🤖",
      title: "AI Integration",
      description: "Practical AI that solves real problems. Intelligence built into products.",
      color: "orange"
    },
    {
      icon: "🚀",
      title: "Digital Transformation",
      description: "Modernize legacy systems. Move to cloud. Scale your operations.",
      color: "pink"
    }
  ];

  const colorClasses: Record<string, string> = {
    purple: "from-purple-500 to-purple-600",
    blue: "from-blue-500 to-blue-600",
    indigo: "from-indigo-500 to-indigo-600",
    green: "from-green-500 to-green-600",
    orange: "from-orange-500 to-orange-600",
    pink: "from-pink-500 to-pink-600"
  };

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="container px-6 md:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="text-center space-y-6 mb-20">
            <p className="text-sm font-semibold uppercase tracking-wider text-purple-600">What We Do</p>
            
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
              End-to-end product<br />
              engineering services.
            </h2>
            
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              From initial concept to market launch and beyond. We handle the entire product lifecycle.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {offerings.map((service, index) => (
              <div 
                key={index}
                className="group p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-300 hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${colorClasses[service.color]} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-3xl">{service.icon}</span>
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                <p className="text-slate-600 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>

          {/* Value Props */}
          <div className="grid md:grid-cols-3 gap-8 mt-20 pt-16 border-t border-slate-200">
            <div className="text-center">
              <div className="text-4xl font-bold text-slate-900 mb-2">10+</div>
              <div className="text-sm text-slate-600">Years Combined Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-slate-900 mb-2">50+</div>
              <div className="text-sm text-slate-600">Projects Delivered</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-slate-900 mb-2">95%</div>
              <div className="text-sm text-slate-600">Client Satisfaction</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
