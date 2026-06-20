const CompanyStory = () => {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="container px-6 md:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="text-center space-y-6 mb-16">
            <p className="text-sm font-semibold uppercase tracking-wider text-teal-600">Who We Are</p>
            
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
              Your software partner.<br />
              Not just developers.
            </h2>
            
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              We're a software development company that actually understands your business. 
              We build what you need, train your team, and stick around to help.
            </p>
          </div>

          {/* Story Content - 3 Column Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">We Listen First</h3>
              <p className="text-slate-600 leading-relaxed">
                Before writing a single line of code, we take time to understand your business, 
                your problems, and what success looks like for you.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">We Build Fast</h3>
              <p className="text-slate-600 leading-relaxed">
                Our healthcare products set up in 48 hours. Our custom projects deliver on time. 
                We move quickly without cutting corners.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">We Stay With You</h3>
              <p className="text-slate-600 leading-relaxed">
                We train your team until they're experts. We provide 24/7 support. 
                We're your long-term partner, not a one-time vendor.
              </p>
            </div>
          </div>

          {/* What We Do */}
          <div className="pt-16 border-t border-slate-200">
            <h3 className="text-3xl font-bold text-slate-900 mb-4 text-center">What We Do</h3>
            <p className="text-lg text-slate-600 text-center mb-12 max-w-2xl mx-auto">
              Two ways we can help your business
            </p>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Custom Software */}
              <div className="p-10 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 text-white">
                <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center mb-6">
                  <span className="text-3xl">💻</span>
                </div>
                <h4 className="text-2xl font-bold mb-4">Custom Software Development</h4>
                <p className="text-slate-300 leading-relaxed mb-6 text-lg">
                  Need software built for your business? We build custom web apps, mobile apps, 
                  and business systems for any industry.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-teal-400 mt-1">✓</span>
                    <span className="text-slate-300">Web and mobile applications</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-teal-400 mt-1">✓</span>
                    <span className="text-slate-300">Business management systems</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-teal-400 mt-1">✓</span>
                    <span className="text-slate-300">E-commerce platforms</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-teal-400 mt-1">✓</span>
                    <span className="text-slate-300">API integrations & automation</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-teal-400 mt-1">✓</span>
                    <span className="text-slate-300">Whatever your business needs</span>
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-white/10">
                  <p className="text-sm text-slate-400">Industries we work with:</p>
                  <p className="text-slate-300 mt-2">Healthcare • Retail • Education • Finance • Manufacturing • Any Industry</p>
                </div>
              </div>

              {/* Healthcare Products */}
              <div className="p-10 rounded-3xl bg-gradient-to-br from-teal-600 to-teal-700 text-white">
                <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center mb-6">
                  <span className="text-3xl">🏥</span>
                </div>
                <h4 className="text-2xl font-bold mb-4">Healthcare Products</h4>
                <p className="text-teal-100 leading-relaxed mb-6 text-lg">
                  Run a hospital or clinic? Use our ready-made healthcare products. 
                  Works offline. Setup in 48 hours. Full training included.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-white mt-1">✓</span>
                    <span className="text-teal-50"><strong>1HMS</strong> - Complete hospital management</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-white mt-1">✓</span>
                    <span className="text-teal-50"><strong>1Rad</strong> - Radiology & imaging centers</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-white mt-1">✓</span>
                    <span className="text-teal-50"><strong>1Lab</strong> - Laboratory management</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-white mt-1">✓</span>
                    <span className="text-teal-50"><strong>1Pharma</strong> - Pharmacy management</span>
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-white/10">
                  <p className="text-sm text-teal-100">Perfect for:</p>
                  <p className="text-white mt-2">Clinics • Hospitals • Diagnostic Centers • Pharmacies</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center p-8 rounded-2xl bg-slate-50 border border-slate-200">
            <p className="text-lg text-slate-900 font-semibold mb-2">
              Not sure which one you need?
            </p>
            <p className="text-slate-600">
              Talk to us. We'll help you figure out the best solution for your business.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CompanyStory;
