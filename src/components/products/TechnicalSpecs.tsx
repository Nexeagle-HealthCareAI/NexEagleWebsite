const TechnicalSpecs = () => {
  const specs = [
    {
      category: "Infrastructure",
      icon: "☁️",
      items: [
        { label: "Cloud Platform", value: "AWS / Azure / GCP" },
        { label: "Deployment", value: "Multi-region, High availability" },
        { label: "Uptime SLA", value: "99.9% guaranteed" },
        { label: "Backup", value: "Automated daily backups" }
      ]
    },
    {
      category: "Security",
      icon: "🔒",
      items: [
        { label: "Data Encryption", value: "AES-256 at rest, TLS 1.3 in transit" },
        { label: "Authentication", value: "Multi-factor, SSO, SAML" },
        { label: "Compliance", value: "HIPAA, GDPR ready" },
        { label: "Audit Logs", value: "Complete activity tracking" }
      ]
    },
    {
      category: "Performance",
      icon: "⚡",
      items: [
        { label: "Response Time", value: "< 200ms average" },
        { label: "Concurrent Users", value: "10,000+ supported" },
        { label: "Data Processing", value: "Real-time updates" },
        { label: "Scalability", value: "Auto-scaling enabled" }
      ]
    },
    {
      category: "Technology Stack",
      icon: "💻",
      items: [
        { label: "Frontend", value: "React, TypeScript, Next.js" },
        { label: "Backend", value: "Node.js, Python, Go" },
        { label: "Database", value: "PostgreSQL, MongoDB, Redis" },
        { label: "AI/ML", value: "TensorFlow, PyTorch" }
      ]
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-slate-50">
      <div className="container px-6 md:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="text-center space-y-6 mb-20">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">Technical Specifications</p>
            
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
              Enterprise-grade<br />
              infrastructure.
            </h2>
            
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Built on modern cloud infrastructure with security, scalability, and performance at the core.
            </p>
          </div>

          {/* Specs Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {specs.map((spec, index) => (
              <div key={index} className="p-8 rounded-2xl bg-white border border-slate-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center">
                    <span className="text-2xl">{spec.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{spec.category}</h3>
                </div>
                
                <div className="space-y-4">
                  {spec.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-start gap-4 pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                      <span className="text-sm font-medium text-slate-600">{item.label}</span>
                      <span className="text-sm font-semibold text-slate-900 text-right">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Compliance Badges */}
          <div className="mt-16 p-10 rounded-3xl bg-white border border-slate-200">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Compliance & Certifications</h3>
              <p className="text-slate-600">Built to meet healthcare industry standards</p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6">
              <div className="px-8 py-4 rounded-xl bg-slate-50 border border-slate-200">
                <p className="text-sm font-semibold text-slate-900">HIPAA</p>
                <p className="text-xs text-slate-600">Compliant</p>
              </div>
              <div className="px-8 py-4 rounded-xl bg-slate-50 border border-slate-200">
                <p className="text-sm font-semibold text-slate-900">GDPR</p>
                <p className="text-xs text-slate-600">Ready</p>
              </div>
              <div className="px-8 py-4 rounded-xl bg-slate-50 border border-slate-200">
                <p className="text-sm font-semibold text-slate-900">ISO 27001</p>
                <p className="text-xs text-slate-600">Certified</p>
              </div>
              <div className="px-8 py-4 rounded-xl bg-slate-50 border border-slate-200">
                <p className="text-sm font-semibold text-slate-900">SOC 2</p>
                <p className="text-xs text-slate-600">Type II</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TechnicalSpecs;
