const Culture = () => {
  const perks = [
    {
      icon: "🚀",
      title: "Ownership & Impact",
      description: "Work on products that matter. See your code in production serving real users."
    },
    {
      icon: "📚",
      title: "Learning & Growth",
      description: "Continuous learning budget. Conference tickets. Online courses. Books."
    },
    {
      icon: "⚖️",
      title: "Work-Life Balance",
      description: "Flexible hours. Remote-friendly. No unnecessary meetings. Focus time protected."
    },
    {
      icon: "💰",
      title: "Competitive Compensation",
      description: "Market-rate salaries. Performance bonuses. Equity options for early team members."
    },
    {
      icon: "🏥",
      title: "Health & Wellness",
      description: "Health insurance. Mental health support. Gym membership. Annual health checkups."
    },
    {
      icon: "🎯",
      title: "Modern Tools",
      description: "Latest MacBooks. Cloud credits. Premium software. Whatever you need to do your best work."
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="container px-6 md:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="text-center space-y-6 mb-20">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">Culture & Benefits</p>
            
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
              Built for builders.<br />
              Made for makers.
            </h2>
            
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We create an environment where talented people can do their best work.
            </p>
          </div>

          {/* Perks Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {perks.map((perk, index) => (
              <div 
                key={index}
                className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-300 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center mb-4">
                  <span className="text-2xl">{perk.icon}</span>
                </div>
                
                <h3 className="text-lg font-bold text-slate-900 mb-2">{perk.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{perk.description}</p>
              </div>
            ))}
          </div>

          {/* Culture Principles */}
          <div className="p-10 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 text-white">
            <h3 className="text-2xl font-bold mb-8 text-center">How We Work</h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Async First</h4>
                    <p className="text-sm text-slate-300">Written communication. Deep work time. Fewer meetings.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Outcome Focused</h4>
                    <p className="text-sm text-slate-300">We measure results, not hours. Ship quality work, own your time.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Transparent</h4>
                    <p className="text-sm text-slate-300">Open roadmaps. Shared metrics. Everyone knows the big picture.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Continuous Learning</h4>
                    <p className="text-sm text-slate-300">Learn new tech. Experiment. Share knowledge. Grow together.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">High Standards</h4>
                    <p className="text-sm text-slate-300">Quality code. Thoughtful design. Products we're proud of.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Respectful</h4>
                    <p className="text-sm text-slate-300">Diverse perspectives. Constructive feedback. Psychological safety.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Culture;
