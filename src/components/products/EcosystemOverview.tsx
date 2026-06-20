const EcosystemOverview = () => {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="container px-6 md:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="text-center space-y-6 mb-20">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">The Ecosystem</p>
            
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
              Everything connects.<br />
              Everything works together.
            </h2>
            
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our products share data, workflows, and intelligence. No more disconnected systems. No more manual data entry.
            </p>
          </div>

          {/* Ecosystem Diagram */}
          <div className="relative">
            
            {/* Central Hub */}
            <div className="flex justify-center mb-16">
              <div className="relative">
                <div className="w-56 h-56 rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 flex items-center justify-center shadow-2xl shadow-blue-900/30 border-2 border-blue-500/20">
                  <div className="text-center text-white">
                    <p className="font-bold text-2xl text-white mb-2">NexEagle</p>
                    <p className="text-base text-blue-100 font-medium">Healthcare OS</p>
                  </div>
                </div>
                {/* Glow */}
                <div className="absolute inset-0 rounded-3xl bg-blue-500/30 blur-2xl -z-10"></div>
              </div>
            </div>

            {/* Connection Lines */}
            <div className="absolute top-28 left-1/2 w-px h-32 bg-gradient-to-b from-blue-300 to-transparent -translate-x-1/2 hidden lg:block"></div>
            <div className="absolute top-28 left-1/2 w-px h-32 bg-gradient-to-t from-blue-300 to-transparent -translate-x-1/2 translate-y-56 hidden lg:block"></div>
            <div className="absolute top-1/2 left-1/2 w-64 h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent -translate-x-1/2 -translate-y-1/2 hidden lg:block"></div>
            <div className="absolute top-1/2 left-1/2 w-64 h-px bg-gradient-to-l from-transparent via-blue-300 to-transparent translate-x-1/2 -translate-y-1/2 hidden lg:block"></div>

            {/* Products Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* 1HMS */}
              <div className="group relative">
                <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-white border-2 border-blue-100 hover:border-blue-300 transition-all duration-300 hover:shadow-xl">
                  <div className="w-16 h-16 rounded-2xl bg-blue-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <span className="text-3xl">🏥</span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">1HMS</h3>
                  <p className="text-sm text-slate-600 mb-4">Hospital Management</p>
                  <div className="space-y-2 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                      <span>Patient records</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                      <span>Appointments</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                      <span>Billing & claims</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 1Rad */}
              <div className="group relative">
                <div className="p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-white border-2 border-purple-100 hover:border-purple-300 transition-all duration-300 hover:shadow-xl">
                  <div className="w-16 h-16 rounded-2xl bg-purple-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <span className="text-3xl">📸</span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">1Rad</h3>
                  <p className="text-sm text-slate-600 mb-4">Radiology Platform</p>
                  <div className="space-y-2 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                      <span>DICOM viewer</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                      <span>AI diagnosis</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                      <span>Report generation</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 1Lab */}
              <div className="group relative">
                <div className="p-8 rounded-2xl bg-gradient-to-br from-green-50 to-white border-2 border-green-100 hover:border-green-300 transition-all duration-300 hover:shadow-xl">
                  <div className="w-16 h-16 rounded-2xl bg-green-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <span className="text-3xl">🔬</span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">1Lab</h3>
                  <p className="text-sm text-slate-600 mb-4">Lab Management</p>
                  <div className="space-y-2 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                      <span>Sample tracking</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                      <span>Test workflows</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                      <span>Quality control</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 1Pharma */}
              <div className="group relative">
                <div className="p-8 rounded-2xl bg-gradient-to-br from-orange-50 to-white border-2 border-orange-100 hover:border-orange-300 transition-all duration-300 hover:shadow-xl">
                  <div className="w-16 h-16 rounded-2xl bg-orange-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <span className="text-3xl">💊</span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">1Pharma</h3>
                  <p className="text-sm text-slate-600 mb-4">Pharmacy System</p>
                  <div className="space-y-2 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                      <span>Inventory mgmt</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                      <span>Prescription tracking</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                      <span>Supply chain</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Benefits */}
          <div className="grid md:grid-cols-3 gap-8 mt-20 pt-16 border-t border-slate-200">
            <div className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔄</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Seamless Data Flow</h3>
              <p className="text-slate-600 text-sm">Patient data flows automatically between all systems. No manual entry.</p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Real-Time Updates</h3>
              <p className="text-slate-600 text-sm">Changes in one system instantly reflect everywhere. Always in sync.</p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Single Source of Truth</h3>
              <p className="text-slate-600 text-sm">One unified database. No data silos. Complete visibility.</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default EcosystemOverview;
