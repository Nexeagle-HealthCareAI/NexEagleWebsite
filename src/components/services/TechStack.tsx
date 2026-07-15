const TechStack = () => {
  const technologies = [
    {
      category: "Frontend",
      icon: "🎨",
      color: "blue",
      techs: [
        { name: "React", description: "UI library" },
        { name: "Next.js", description: "React framework" },
        { name: "TypeScript", description: "Type safety" },
        { name: "Tailwind CSS", description: "Styling" }
      ]
    },
    {
      category: "Backend",
      icon: "⚙️",
      color: "green",
      techs: [
        { name: "Node.js", description: "JavaScript runtime" },
        { name: "Python", description: "AI & data" },
        { name: "Go", description: "High performance" },
        { name: "GraphQL", description: "API layer" }
      ]
    },
    {
      category: "Database",
      icon: "💾",
      color: "purple",
      techs: [
        { name: "PostgreSQL", description: "Relational DB" },
        { name: "MongoDB", description: "Document DB" },
        { name: "Redis", description: "Caching" },
        { name: "Elasticsearch", description: "Search" }
      ]
    },
    {
      category: "Cloud & DevOps",
      icon: "☁️",
      color: "orange",
      techs: [
        { name: "AWS", description: "Cloud platform" },
        { name: "Docker", description: "Containerization" },
        { name: "Kubernetes", description: "Orchestration" },
        { name: "GitHub Actions", description: "CI/CD" }
      ]
    },
    {
      category: "AI & ML",
      icon: "🤖",
      color: "pink",
      techs: [
        { name: "TensorFlow", description: "ML framework" },
        { name: "PyTorch", description: "Deep learning" },
        { name: "OpenAI", description: "LLM integration" },
        { name: "Hugging Face", description: "NLP models" }
      ]
    },
    {
      category: "Mobile",
      icon: "📱",
      color: "indigo",
      techs: [
        { name: "React Native", description: "Cross-platform" },
        { name: "Swift", description: "iOS native" },
        { name: "Kotlin", description: "Android native" },
        { name: "Flutter", description: "Google framework" }
      ]
    }
  ];

  const colorClasses: Record<string, string> = {
    blue: "from-blue-500 to-blue-600",
    green: "from-green-500 to-green-600",
    purple: "from-purple-500 to-purple-600",
    orange: "from-orange-500 to-orange-600",
    pink: "from-pink-500 to-pink-600",
    indigo: "from-indigo-500 to-indigo-600"
  };

  return (
    <section className="py-24 md:py-32 bg-slate-50">
      <div className="container px-6 md:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="text-center space-y-6 mb-20">
            <p className="text-sm font-semibold uppercase tracking-wider text-purple-600">Technology Stack</p>
            
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
              Modern tech.<br />
              Production-ready.
            </h2>
            
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We use proven technologies that scale. The right tool for the right job.
            </p>
          </div>

          {/* Tech Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {technologies.map((category, index) => (
              <div key={index} className="p-8 rounded-2xl bg-white border border-slate-200 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorClasses[category.color]} flex items-center justify-center`}>
                    <span className="text-2xl">{category.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{category.category}</h3>
                </div>
                
                <div className="space-y-3">
                  {category.techs.map((tech, idx) => (
                    <div key={idx} className="flex justify-between items-center pb-3 border-b border-slate-100 last:border-0 last:pb-0">
                      <span className="font-semibold text-slate-900">{tech.name}</span>
                      <span className="text-sm text-slate-500">{tech.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Approach */}
          <div className="mt-20 p-10 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 text-white">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h3 className="text-3xl font-bold">Technology agnostic.<br />Results focused.</h3>
              <p className="text-xl text-slate-300 leading-relaxed">
                We don&apos;t force technologies. We choose the best stack for your specific needs, team, and goals.
                Modern, proven, and scalable.
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <div className="px-6 py-3 rounded-full bg-white/10 border border-white/20 text-sm font-medium">
                  Scalable Architecture
                </div>
                <div className="px-6 py-3 rounded-full bg-white/10 border border-white/20 text-sm font-medium">
                  Clean Code
                </div>
                <div className="px-6 py-3 rounded-full bg-white/10 border border-white/20 text-sm font-medium">
                  Best Practices
                </div>
                <div className="px-6 py-3 rounded-full bg-white/10 border border-white/20 text-sm font-medium">
                  Comprehensive Testing
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TechStack;
