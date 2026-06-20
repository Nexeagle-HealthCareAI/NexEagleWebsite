const IntegrationSection = () => {
  const integrations = [
    {
      category: "Healthcare Standards",
      items: [
        { name: "HL7 FHIR", description: "Healthcare data exchange" },
        { name: "DICOM", description: "Medical imaging standard" },
        { name: "ICD-10", description: "Diagnosis coding" },
        { name: "LOINC", description: "Lab test codes" }
      ]
    },
    {
      category: "Third-Party Systems",
      items: [
        { name: "PACS", description: "Picture archiving" },
        { name: "LIS", description: "Lab information systems" },
        { name: "Insurance APIs", description: "Claims processing" },
        { name: "Payment Gateways", description: "Online payments" }
      ]
    },
    {
      category: "Communication",
      items: [
        { name: "SMS Gateway", description: "Patient notifications" },
        { name: "Email", description: "Reports & alerts" },
        { name: "WhatsApp", description: "Appointment reminders" },
        { name: "Push Notifications", description: "Mobile alerts" }
      ]
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="container px-6 md:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="text-center space-y-6 mb-20">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">Integrations</p>
            
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
              Works with your<br />
              existing systems.
            </h2>
            
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Built on open standards. Integrates with healthcare systems, payment gateways, and communication platforms.
            </p>
          </div>

          {/* Integration Categories */}
          <div className="grid md:grid-cols-3 gap-8">
            {integrations.map((category, index) => (
              <div key={index} className="space-y-6">
                <h3 className="text-lg font-bold text-slate-900">{category.category}</h3>
                <div className="space-y-4">
                  {category.items.map((item, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-300 transition-colors">
                      <p className="font-semibold text-slate-900 mb-1">{item.name}</p>
                      <p className="text-sm text-slate-600">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default IntegrationSection;
