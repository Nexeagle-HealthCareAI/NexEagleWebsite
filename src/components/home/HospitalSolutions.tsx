import React from "react";
import { 
  Mic, Users, Bed, Stethoscope, Pill, FlaskConical, Receipt, Shield, LayoutDashboard,
  Activity, FileText, Heart, Calendar, ClipboardList
} from "lucide-react";

const HospitalSolutions = () => {
  const features = [
    {
      icon: <Mic className="w-6 h-6" />,
      title: "AI Voice Scribe",
      desc: "Convert doctor-patient conversations to structured prescriptions instantly. Supports 10+ Indian languages.",
      color: "text-brand-teal",
      bg: "bg-brand-teal/10"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Patient 360° View",
      desc: "Complete patient history, vitals, medications, and treatment plans in one unified dashboard.",
      color: "text-brand-sky",
      bg: "bg-brand-sky/10"
    },
    {
      icon: <Bed className="w-6 h-6" />,
      title: "IPD & Ward Management",
      desc: "Real-time bed occupancy, room allocation, nursing notes, and discharge planning automation.",
      color: "text-brand-iris",
      bg: "bg-brand-iris/10"
    },
    {
      icon: <Stethoscope className="w-6 h-6" />,
      title: "OPD Management",
      desc: "Queue management, appointment scheduling, token generation, and consultation workflows.",
      color: "text-brand-teal",
      bg: "bg-brand-teal/10"
    },
    {
      icon: <Pill className="w-6 h-6" />,
      title: "Pharmacy Integration",
      desc: "Inventory management, auto-reorder, GST billing, and direct prescription integration.",
      color: "text-brand-sky",
      bg: "bg-brand-sky/10"
    },
    {
      icon: <FlaskConical className="w-6 h-6" />,
      title: "Lab & Radiology",
      desc: "Sample tracking, report generation, PACS integration, and automated result publishing.",
      color: "text-brand-iris",
      bg: "bg-brand-iris/10"
    },
    {
      icon: <Receipt className="w-6 h-6" />,
      title: "Billing & Revenue",
      desc: "Insurance claims, payment tracking, TPA integration, and financial analytics.",
      color: "text-brand-teal",
      bg: "bg-brand-teal/10"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "NABH Compliance",
      desc: "Automated documentation and audit trails for seamless NABH accreditation.",
      color: "text-brand-sky",
      bg: "bg-brand-sky/10"
    },
    {
      icon: <LayoutDashboard className="w-6 h-6" />,
      title: "Analytics Dashboard",
      desc: "Real-time insights on revenue, patient flow, department performance, and KPIs.",
      color: "text-brand-iris",
      bg: "bg-brand-iris/10"
    }
  ];

  const modules = [
    { icon: <Users className="w-6 h-6" />, name: "Registration" },
    { icon: <Stethoscope className="w-6 h-6" />, name: "OPD" },
    { icon: <Bed className="w-6 h-6" />, name: "IPD" },
    { icon: <Activity className="w-6 h-6" />, name: "Emergency" },
    { icon: <Pill className="w-6 h-6" />, name: "Pharmacy" },
    { icon: <FlaskConical className="w-6 h-6" />, name: "Laboratory" },
    { icon: <FileText className="w-6 h-6" />, name: "Radiology" },
    { icon: <Heart className="w-6 h-6" />, name: "Nursing" },
    { icon: <Calendar className="w-6 h-6" />, name: "Appointments" },
    { icon: <Receipt className="w-6 h-6" />, name: "Billing" },
    { icon: <ClipboardList className="w-6 h-6" />, name: "EMR" },
    { icon: <Shield className="w-6 h-6" />, name: "Claims" }
  ];

  return (
    <div className="bg-background">
      {/* Features Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="container px-6 md:px-8 lg:px-12 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight">
              Powerful Features for<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-teal to-brand-sky">Modern Hospitals</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to run a world-class hospital, in one platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((feature, idx) => (
              <div 
                key={idx}
                className="group p-8 rounded-2xl bg-card border border-border hover:border-brand-teal/50 hover:shadow-lg hover:shadow-brand-teal/5 transition-all duration-300 relative overflow-hidden"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-colors ${feature.bg} ${feature.color}`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {feature.desc}
                </p>
                <div className="absolute inset-0 bg-gradient-to-br from-brand-teal/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modules Grid Section */}
      <section className="py-16 bg-slate-50 border-t border-border/50">
        <div className="container px-6 md:px-8 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">15+ Integrated Modules</h2>
            <p className="text-muted-foreground">
              All departments connected in one seamless ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
            {modules.map((mod, idx) => (
              <div 
                key={idx}
                className="flex flex-col items-center justify-center p-6 gap-4 rounded-2xl bg-white border border-border shadow-sm hover:shadow-md hover:border-brand-sky/30 transition-all duration-300 group cursor-default"
              >
                <div className="text-slate-400 group-hover:text-brand-sky transition-colors">
                  {mod.icon}
                </div>
                <h4 className="text-sm font-semibold text-slate-700 group-hover:text-slate-900 transition-colors">
                  {mod.name}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HospitalSolutions;
