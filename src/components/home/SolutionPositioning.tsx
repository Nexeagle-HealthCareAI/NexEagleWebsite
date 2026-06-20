const SolutionPositioning = () => {
  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-slate-50 to-white">
      <div className="container px-6 md:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center space-y-6 mb-20">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">Our Solution</p>
            
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
              We build custom software for your business.<br />
              Fast, affordable, and exactly what you need.
            </h2>
          </div>

          {/* Solution Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Left: Own Products */}
            <div className="p-10 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-lg transition-shadow duration-300">
              <div className="space-y-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                  <span className="text-2xl">🏥</span>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">Healthcare Products</h3>
                  <p className="text-slate-600 leading-relaxed mb-6">
                    We built our own healthcare software suite. Hospitals, clinics, labs, and pharmacies use our products daily.
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2"></div>
                      <div>
                        <p className="font-semibold text-slate-900">1HMS</p>
                        <p className="text-sm text-slate-600">Complete hospital management</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2"></div>
                      <div>
                        <p className="font-semibold text-slate-900">1Rad</p>
                        <p className="text-sm text-slate-600">Radiology with AI assistance</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2"></div>
                      <div>
                        <p className="font-semibold text-slate-900">1Lab</p>
                        <p className="text-sm text-slate-600">Lab management system</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2"></div>
                      <div>
                        <p className="font-semibold text-slate-900">1Pharma</p>
                        <p className="text-sm text-slate-600">Pharmacy inventory system</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Engineering Services */}
            <div className="p-10 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-lg transition-shadow duration-300">
              <div className="space-y-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                  <span className="text-2xl">⚡</span>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">Custom Software Development</h3>
                  <p className="text-slate-600 leading-relaxed mb-6">
                    We build software tailored to your business needs. Any industry, any requirement, any scale.
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2"></div>
                      <div>
                        <p className="font-semibold text-slate-900">Understand Your Needs</p>
                        <p className="text-sm text-slate-600">We learn your business first</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2"></div>
                      <div>
                        <p className="font-semibold text-slate-900">Design the Solution</p>
                        <p className="text-sm text-slate-600">Custom-built for your workflow</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2"></div>
                      <div>
                        <p className="font-semibold text-slate-900">Build & Deploy</p>
                        <p className="text-sm text-slate-600">Fast development, quality code</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2"></div>
                      <div>
                        <p className="font-semibold text-slate-900">Support & Grow</p>
                        <p className="text-sm text-slate-600">We're with you long-term</p>
                      </div>
                    </div>
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

export default SolutionPositioning;
