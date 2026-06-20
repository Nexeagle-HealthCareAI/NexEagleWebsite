const CoreValues = () => {
  const values = [
    {
      icon: "🎯",
      title: "Product First",
      description: "We think like product companies, not service providers. Every decision is about creating long-term value.",
      color: "blue"
    },
    {
      icon: "🏥",
      title: "Healthcare Expertise",
      description: "Deep domain knowledge in healthcare. We understand the workflows, compliance, and what actually works.",
      color: "green"
    },
    {
      icon: "⚙️",
      title: "System Design",
      description: "We design systems, not just features. Architecture, scalability, and maintainability from day one.",
      color: "purple"
    },
    {
      icon: "🤖",
      title: "AI-Powered",
      description: "Intelligence built into products where it creates real value. Not AI for the sake of AI.",
      color: "orange"
    },
    {
      icon: "⚡",
      title: "Speed + Quality",
      description: "Fast iteration without compromising on quality. We ship production-ready products, not prototypes.",
      color: "indigo"
    },
    {
      icon: "🤝",
      title: "True Partnership",
      description: "We're not just contractors. We become your extended team, invested in your long-term success.",
      color: "pink"
    }
  ];

  const colorClasses: Record<string, string> = {
    blue: "from-blue-500 to-blue-600",
    green: "from-green-500 to-green-600",
    purple: "from-purple-500 to-purple-600",
    orange: "from-orange-500 to-orange-600",
    indigo: "from-indigo-500 to-indigo-600",
    pink: "from-pink-500 to-pink-600"
  };

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="container px-6 md:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="text-center space-y-6 mb-20">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">Core Values</p>
            
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
              What drives us.<br />
              What defines us.
            </h2>
            
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              These aren't just words on a wall. They guide every decision we make and every product we build.
            </p>
          </div>

          {/* Values Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                className="group p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-300 hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${colorClasses[value.color]} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-3xl">{value.icon}</span>
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-3">{value.title}</h3>
                <p className="text-slate-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default CoreValues;
