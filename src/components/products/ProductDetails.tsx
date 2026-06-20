const ProductDetails = () => {
  const products = [
    {
      id: "1hms",
      icon: "🏥",
      name: "1HMS",
      tagline: "Hospital Management System",
      description: "Complete hospital operations in one platform. From patient registration to discharge, manage everything seamlessly.",
      color: "blue",
      features: [
        {
          title: "Patient Management",
          items: ["Electronic health records", "Patient portal", "Medical history", "Document management"]
        },
        {
          title: "Appointments & Scheduling",
          items: ["Online booking", "Queue management", "Doctor schedules", "Automated reminders"]
        },
        {
          title: "Billing & Insurance",
          items: ["Invoice generation", "Insurance claims", "Payment tracking", "Financial reports"]
        },
        {
          title: "Clinical Workflows",
          items: ["E-prescriptions", "Lab orders", "Radiology requests", "Treatment plans"]
        }
      ],
      benefits: [
        "Reduce administrative overhead by 40%",
        "Improve patient satisfaction scores",
        "Streamline billing and reduce errors",
        "Complete audit trail for compliance"
      ]
    },
    {
      id: "1rad",
      icon: "📸",
      name: "1Rad",
      tagline: "Radiology & Imaging Platform",
      description: "AI-powered radiology platform with DICOM viewer, automated reporting, and intelligent diagnosis assistance.",
      color: "purple",
      features: [
        {
          title: "DICOM Viewer",
          items: ["Multi-modality support", "3D reconstruction", "Measurement tools", "Annotation system"]
        },
        {
          title: "AI-Assisted Diagnosis",
          items: ["Anomaly detection", "Pattern recognition", "Comparison analysis", "Confidence scoring"]
        },
        {
          title: "Report Generation",
          items: ["Template library", "Voice dictation", "Auto-population", "Digital signatures"]
        },
        {
          title: "Workflow Management",
          items: ["Study routing", "Priority queuing", "Radiologist assignment", "Quality assurance"]
        }
      ],
      benefits: [
        "Reduce reporting time by 50%",
        "Improve diagnostic accuracy with AI",
        "Faster turnaround for critical cases",
        "Seamless integration with PACS"
      ]
    },
    {
      id: "1lab",
      icon: "🔬",
      name: "1Lab",
      tagline: "Diagnostics & Lab Workflow",
      description: "End-to-end lab management from sample collection to result delivery. Quality control built in.",
      color: "green",
      features: [
        {
          title: "Sample Management",
          items: ["Barcode tracking", "Chain of custody", "Storage management", "Expiry alerts"]
        },
        {
          title: "Test Workflows",
          items: ["Test catalog", "Protocol management", "Equipment integration", "Result validation"]
        },
        {
          title: "Quality Control",
          items: ["QC protocols", "Calibration tracking", "Proficiency testing", "Audit logs"]
        },
        {
          title: "Result Delivery",
          items: ["Auto-reporting", "Critical alerts", "Patient portal", "Doctor notifications"]
        }
      ],
      benefits: [
        "Eliminate sample mix-ups",
        "Reduce TAT by 30%",
        "Ensure quality compliance",
        "Real-time result tracking"
      ]
    },
    {
      id: "1pharma",
      icon: "💊",
      name: "1Pharma",
      tagline: "Pharmacy & Inventory System",
      description: "Smart pharmacy management with inventory optimization, prescription tracking, and supply chain integration.",
      color: "orange",
      features: [
        {
          title: "Inventory Management",
          items: ["Stock tracking", "Expiry management", "Reorder automation", "Batch tracking"]
        },
        {
          title: "Prescription Processing",
          items: ["E-prescription integration", "Drug interaction checks", "Dosage validation", "Substitution suggestions"]
        },
        {
          title: "Supply Chain",
          items: ["Vendor management", "Purchase orders", "Receiving & QC", "Return management"]
        },
        {
          title: "Billing & Insurance",
          items: ["Insurance verification", "Co-pay calculation", "Claims submission", "Payment reconciliation"]
        }
      ],
      benefits: [
        "Reduce stock-outs by 80%",
        "Minimize expired inventory",
        "Improve prescription accuracy",
        "Optimize working capital"
      ]
    }
  ];

  const colorClasses = {
    blue: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-700",
      accent: "bg-blue-500",
      gradient: "from-blue-50 to-white"
    },
    purple: {
      bg: "bg-purple-50",
      border: "border-purple-200",
      text: "text-purple-700",
      accent: "bg-purple-500",
      gradient: "from-purple-50 to-white"
    },
    green: {
      bg: "bg-green-50",
      border: "border-green-200",
      text: "text-green-700",
      accent: "bg-green-500",
      gradient: "from-green-50 to-white"
    },
    orange: {
      bg: "bg-orange-50",
      border: "border-orange-200",
      text: "text-orange-700",
      accent: "bg-orange-500",
      gradient: "from-orange-50 to-white"
    }
  };

  return (
    <section className="py-24 md:py-32 bg-slate-50">
      <div className="container px-6 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto space-y-32">
          
          {products.map((product, index) => {
            const colors = colorClasses[product.color as keyof typeof colorClasses];
            const isEven = index % 2 === 0;

            return (
              <div key={product.id} id={product.id} className="scroll-mt-24">
                <div className={`grid lg:grid-cols-2 gap-12 items-start ${!isEven ? 'lg:flex-row-reverse' : ''}`}>
                  
                  {/* Product Info */}
                  <div className={`space-y-8 ${!isEven ? 'lg:order-2' : ''}`}>
                    <div>
                      <div className={`inline-flex items-center gap-3 px-5 py-2.5 rounded-full ${colors.bg} ${colors.border} border mb-6`}>
                        <span className="text-2xl">{product.icon}</span>
                        <span className={`text-sm font-semibold ${colors.text}`}>{product.name}</span>
                      </div>
                      
                      <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                        {product.tagline}
                      </h2>
                      
                      <p className="text-xl text-slate-600 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    {/* Benefits */}
                    <div className="space-y-3">
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900">Key Benefits</h3>
                      {product.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className={`w-6 h-6 rounded-lg ${colors.accent} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                            <span className="text-white text-xs">✓</span>
                          </div>
                          <span className="text-slate-700">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Features Grid */}
                  <div className={`${!isEven ? 'lg:order-1' : ''}`}>
                    <div className="grid sm:grid-cols-2 gap-6">
                      {product.features.map((feature, idx) => (
                        <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200 hover:shadow-lg transition-shadow">
                          <h4 className="text-lg font-bold text-slate-900 mb-4">{feature.title}</h4>
                          <ul className="space-y-2">
                            {feature.items.map((item, itemIdx) => (
                              <li key={itemIdx} className="flex items-start gap-2 text-sm text-slate-600">
                                <span className={`w-1.5 h-1.5 rounded-full ${colors.accent} mt-1.5 flex-shrink-0`}></span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
