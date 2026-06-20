const MissionVision = () => {
  return (
    <section className="py-24 md:py-32 bg-slate-50">
      <div className="container px-6 md:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="text-center space-y-6 mb-16">
            <p className="text-sm font-semibold uppercase tracking-wider text-teal-600">Why Choose Us</p>
            
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
              What makes us different.
            </h2>
            
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We're not just coders. We're your software partner who understands your business.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Differentiator 1 */}
            <div className="p-8 rounded-2xl bg-white border border-slate-200 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center mb-6">
                <span className="text-2xl">🎯</span>
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 mb-3">We Understand Your Business</h3>
              
              <p className="text-slate-600 leading-relaxed">
                We don't just write code. We take time to understand your business, your problems, 
                and what you actually need. Then we build software that solves those problems.
              </p>
            </div>

            {/* Differentiator 2 */}
            <div className="p-8 rounded-2xl bg-white border border-slate-200 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center mb-6">
                <span className="text-2xl">🏥</span>
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 mb-3">Healthcare Expertise</h3>
              
              <p className="text-slate-600 leading-relaxed">
                We've built healthcare products used by real hospitals. We understand medical workflows, 
                compliance, and what works in clinical settings. This expertise helps all our projects.
              </p>
            </div>

            {/* Differentiator 3 */}
            <div className="p-8 rounded-2xl bg-white border border-slate-200 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center mb-6">
                <span className="text-2xl">👨‍🏫</span>
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 mb-3">We Train Your Team</h3>
              
              <p className="text-slate-600 leading-relaxed">
                We don't just deliver software and disappear. We train your staff until they become experts. 
                We're available 24/7 for support. We're your long-term partner.
              </p>
            </div>

            {/* Differentiator 4 */}
            <div className="p-8 rounded-2xl bg-white border border-slate-200 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center mb-6">
                <span className="text-2xl">⚡</span>
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 mb-3">Fast & Reliable</h3>
              
              <p className="text-slate-600 leading-relaxed">
                Our healthcare products set up in 48 hours. Our custom software projects deliver on time. 
                We move fast without cutting corners.
              </p>
            </div>

            {/* Differentiator 5 */}
            <div className="p-8 rounded-2xl bg-white border border-slate-200 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center mb-6">
                <span className="text-2xl">🔧</span>
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 mb-3">Built to Last</h3>
              
              <p className="text-slate-600 leading-relaxed">
                We build software that's maintainable, scalable, and secure. Clean code. Good architecture. 
                Software that works today and grows with your business.
              </p>
            </div>

            {/* Differentiator 6 */}
            <div className="p-8 rounded-2xl bg-white border border-slate-200 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center mb-6">
                <span className="text-2xl">💬</span>
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 mb-3">Clear Communication</h3>
              
              <p className="text-slate-600 leading-relaxed">
                No technical jargon. No surprises. We explain things in plain language. You always know 
                what's happening with your project.
              </p>
            </div>

          </div>

          {/* Belief Statement */}
          <div className="mt-16 p-10 rounded-3xl bg-gradient-to-br from-teal-600 to-teal-700 text-center">
            <blockquote className="text-2xl md:text-3xl font-light text-white leading-relaxed">
              "We build software based on what you need.<br />
              Not what we want to sell you."
            </blockquote>
          </div>

        </div>
      </div>
    </section>
  );
};

export default MissionVision;
