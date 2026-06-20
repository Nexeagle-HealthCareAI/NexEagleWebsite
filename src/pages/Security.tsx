import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Shield, Lock, Eye, Server, AlertTriangle, CheckCircle, FileCheck, Users, Database, Key, Activity, Bell } from "lucide-react";

const Security = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Security & Compliance",
    "description": "Enterprise-grade security for healthcare data. HIPAA compliant, ISO 27001 certified, SOC 2 Type II audited",
    "publisher": {
      "@type": "Organization",
      "name": "NexEagle",
      "certification": [
        "HIPAA Compliant",
        "ISO 27001 Certified",
        "SOC 2 Type II",
        "GDPR Compliant"
      ]
    }
  };
  const certifications = [
    {
      name: "HIPAA",
      description: "Health Insurance Portability and Accountability Act compliant",
      status: "Certified"
    },
    {
      name: "GDPR",
      description: "General Data Protection Regulation compliant",
      status: "Compliant"
    },
    {
      name: "ISO 27001",
      description: "Information Security Management System",
      status: "Certified"
    },
    {
      name: "SOC 2 Type II",
      description: "Service Organization Control 2 audit",
      status: "Certified"
    }
  ];

  const securityFeatures = [
    {
      icon: Lock,
      title: "Data Encryption",
      description: "End-to-end encryption for data in transit and at rest",
      details: [
        "AES-256 encryption for data at rest",
        "TLS 1.3 for data in transit",
        "Encrypted database backups",
        "Secure key management with HSM"
      ]
    },
    {
      icon: Key,
      title: "Access Control",
      description: "Multi-layered authentication and authorization",
      details: [
        "Multi-factor authentication (MFA)",
        "Role-based access control (RBAC)",
        "Single Sign-On (SSO) support",
        "Session management and timeout"
      ]
    },
    {
      icon: Server,
      title: "Infrastructure Security",
      description: "Enterprise-grade cloud infrastructure",
      details: [
        "AWS/Azure secure cloud hosting",
        "DDoS protection and WAF",
        "Network segmentation and isolation",
        "Regular security patches and updates"
      ]
    },
    {
      icon: Eye,
      title: "Monitoring & Logging",
      description: "24/7 security monitoring and audit trails",
      details: [
        "Real-time threat detection",
        "Comprehensive audit logging",
        "SIEM integration",
        "Automated alerting system"
      ]
    },
    {
      icon: Database,
      title: "Data Protection",
      description: "Robust data backup and recovery",
      details: [
        "Automated daily backups",
        "Point-in-time recovery",
        "Geographic redundancy",
        "Disaster recovery plan (RTO < 4 hours)"
      ]
    },
    {
      icon: Users,
      title: "Application Security",
      description: "Secure development lifecycle",
      details: [
        "Regular penetration testing",
        "Vulnerability scanning",
        "Secure code reviews",
        "OWASP Top 10 compliance"
      ]
    }
  ];

  const practices = [
    {
      icon: FileCheck,
      title: "Security Audits",
      description: "Regular third-party security assessments and penetration testing to identify and address vulnerabilities."
    },
    {
      icon: Users,
      title: "Employee Training",
      description: "Mandatory security awareness training for all employees with annual refresher courses."
    },
    {
      icon: Shield,
      title: "Incident Response",
      description: "24/7 security operations center with documented incident response procedures."
    },
    {
      icon: Activity,
      title: "Continuous Monitoring",
      description: "Real-time monitoring of systems, networks, and applications for security threats."
    },
    {
      icon: Lock,
      title: "Vendor Management",
      description: "Rigorous security assessment of all third-party vendors and service providers."
    },
    {
      icon: Bell,
      title: "Breach Notification",
      description: "Commitment to notify affected parties within 72 hours of any confirmed data breach."
    }
  ];

  const hipaaCompliance = [
    {
      title: "Administrative Safeguards",
      items: [
        "Security management process",
        "Assigned security responsibility",
        "Workforce security and training",
        "Information access management",
        "Security awareness and training",
        "Security incident procedures"
      ]
    },
    {
      title: "Physical Safeguards",
      items: [
        "Facility access controls",
        "Workstation use and security",
        "Device and media controls",
        "Secure data center facilities",
        "Environmental controls",
        "Physical access logging"
      ]
    },
    {
      title: "Technical Safeguards",
      items: [
        "Access control mechanisms",
        "Audit controls and logging",
        "Integrity controls",
        "Person or entity authentication",
        "Transmission security",
        "Encryption and decryption"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Security & Compliance - HIPAA, ISO 27001, SOC 2"
        description="Enterprise-grade security for healthcare data. HIPAA compliant, ISO 27001 certified, SOC 2 Type II audited. Learn about our comprehensive security measures, data encryption, compliance standards, and 24/7 monitoring."
        keywords="HIPAA compliant, ISO 27001, SOC 2, healthcare security, data encryption, compliance certifications, healthcare data protection, enterprise security, GDPR compliant, security audit"
        structuredData={structuredData}
      />
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="container px-6 md:px-8 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-semibold mb-6">
              <Shield className="w-4 h-4" />
              <span>Enterprise Security</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
              Security & Compliance
            </h1>
            <p className="text-xl text-slate-600 mb-8">
              Your data security is our top priority. We implement industry-leading security measures to protect your sensitive information.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              {certifications.map((cert, index) => (
                <div key={index} className="px-4 py-2 bg-white border-2 border-slate-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="font-semibold text-slate-900">{cert.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Statement */}
      <section className="py-12 border-b border-slate-200">
        <div className="container px-6 md:px-8 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
              <p className="text-slate-700 leading-relaxed">
                At NexEagle, security is not an afterthought—it's built into every layer of our products and services. We understand the critical nature of healthcare data and the trust our clients place in us. Our comprehensive security program ensures that your data is protected with enterprise-grade security measures, compliance with healthcare regulations, and continuous monitoring.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Grid */}
      <section className="py-20 bg-slate-50">
        <div className="container px-6 md:px-8 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Certifications & Compliance
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                We maintain the highest standards of security and compliance certifications
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {certifications.map((cert, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 border-2 border-slate-200 hover:border-blue-500 transition-all hover:shadow-lg">
                  <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-4">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {cert.name}
                  </h3>
                  <p className="text-sm text-slate-600 mb-3">
                    {cert.description}
                  </p>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                    <div className="w-2 h-2 rounded-full bg-green-600" />
                    {cert.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-20">
        <div className="container px-6 md:px-8 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Security Features
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Multi-layered security architecture protecting your data at every level
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {securityFeatures.map((feature, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 border border-slate-200 hover:border-blue-500 transition-all hover:shadow-lg">
                  <div className="w-14 h-14 rounded-xl bg-blue-600 flex items-center justify-center mb-6">
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 mb-6">
                    {feature.description}
                  </p>
                  <ul className="space-y-2">
                    {feature.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HIPAA Compliance */}
      <section className="py-20 bg-slate-50">
        <div className="container px-6 md:px-8 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-6">
                <Shield className="w-4 h-4" />
                <span>Healthcare Compliance</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                HIPAA Compliance
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Our healthcare products are designed and operated in full compliance with HIPAA regulations
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {hipaaCompliance.map((category, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 border border-slate-200">
                  <h3 className="text-xl font-bold text-slate-900 mb-6">
                    {category.title}
                  </h3>
                  <ul className="space-y-3">
                    {category.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle className="w-3 h-3 text-blue-600" />
                        </div>
                        <span className="text-sm text-slate-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
              <div className="flex items-start gap-4">
                <Shield className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Business Associate Agreement (BAA)</h4>
                  <p className="text-slate-700 leading-relaxed">
                    We sign Business Associate Agreements with all healthcare clients to ensure HIPAA compliance. Our BAA outlines our responsibilities in protecting Protected Health Information (PHI) and our commitment to maintaining the highest security standards.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Practices */}
      <section className="py-20">
        <div className="container px-6 md:px-8 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Security Practices
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Comprehensive security program with continuous improvement
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {practices.map((practice, index) => (
                <div key={index} className="bg-white rounded-xl p-6 border border-slate-200 hover:border-blue-500 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mb-4">
                    <practice.icon className="w-6 h-6 text-slate-700" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {practice.title}
                  </h3>
                  <p className="text-sm text-slate-600">
                    {practice.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Incident Response */}
      <section className="py-20 bg-slate-50">
        <div className="container px-6 md:px-8 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 text-red-700 text-sm font-semibold mb-6">
                <AlertTriangle className="w-4 h-4" />
                <span>Emergency Response</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Incident Response Plan
              </h2>
              <p className="text-lg text-slate-600">
                We maintain a comprehensive incident response plan to quickly address any security concerns
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-slate-200">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 font-bold text-blue-600">
                    1
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">Detection & Analysis</h3>
                    <p className="text-slate-600">
                      24/7 monitoring systems detect potential security incidents. Our security team immediately analyzes the threat level and scope.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 font-bold text-blue-600">
                    2
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">Containment & Eradication</h3>
                    <p className="text-slate-600">
                      Immediate action to contain the incident, prevent further damage, and eliminate the threat from our systems.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 font-bold text-blue-600">
                    3
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">Recovery & Notification</h3>
                    <p className="text-slate-600">
                      Restore affected systems and notify impacted parties within 72 hours as required by regulations.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 font-bold text-blue-600">
                    4
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">Post-Incident Review</h3>
                    <p className="text-slate-600">
                      Comprehensive analysis of the incident to improve our security measures and prevent future occurrences.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg">
              <div className="flex items-start gap-4">
                <Bell className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Report a Security Concern</h4>
                  <p className="text-slate-700 leading-relaxed mb-3">
                    If you discover a security vulnerability or have concerns about the security of our systems, please report it immediately to our security team.
                  </p>
                  <a href="mailto:security@nexeagle.com" className="text-blue-600 hover:text-blue-700 font-semibold">
                    security@nexeagle.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Data Protection */}
      <section className="py-20">
        <div className="container px-6 md:px-8 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Data Protection & Privacy
              </h2>
              <p className="text-lg text-slate-600">
                Your data is protected with multiple layers of security
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 border border-slate-200">
                <Database className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Data Residency
                </h3>
                <p className="text-slate-600 mb-4">
                  Your data is stored in secure, geographically distributed data centers with full redundancy. We offer data residency options to meet regional compliance requirements.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm text-slate-600">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Geographic redundancy</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm text-slate-600">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Regional data centers</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm text-slate-600">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Compliance with local laws</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-8 border border-slate-200">
                <Lock className="w-12 h-12 text-green-600 mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Data Retention
                </h3>
                <p className="text-slate-600 mb-4">
                  We retain your data only as long as necessary for service delivery and compliance. Healthcare data is retained according to medical record retention requirements.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm text-slate-600">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Configurable retention policies</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm text-slate-600">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Secure data deletion</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm text-slate-600">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Audit trail maintenance</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="container px-6 md:px-8 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 md:p-12 border border-slate-200 shadow-sm">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-2">
                    Security Questions?
                  </h2>
                  <p className="text-slate-600 leading-relaxed">
                    Our security team is here to answer your questions and address any concerns.
                  </p>
                </div>
              </div>
              
              <div className="ml-18 space-y-4">
                <div>
                  <p className="text-sm font-semibold text-slate-500 mb-1">Security Team</p>
                  <a href="mailto:security@nexeagle.com" className="text-lg text-blue-600 hover:text-blue-700 font-medium">
                    security@nexeagle.com
                  </a>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-500 mb-1">Privacy Officer</p>
                  <a href="mailto:privacy@nexeagle.com" className="text-lg text-blue-600 hover:text-blue-700 font-medium">
                    privacy@nexeagle.com
                  </a>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-500 mb-1">General Inquiries</p>
                  <a href="mailto:info@nexeagle.com" className="text-lg text-blue-600 hover:text-blue-700 font-medium">
                    info@nexeagle.com
                  </a>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-slate-200">
                <p className="text-sm text-slate-600">
                  For urgent security matters or to report a vulnerability, please contact our security team immediately. We take all security reports seriously and will respond within 24 hours.
                </p>
              </div>
            </div>

            {/* Related Links */}
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <Link 
                to="/privacy" 
                className="text-slate-600 hover:text-slate-900 font-medium transition-colors"
              >
                Privacy Policy
              </Link>
              <span className="text-slate-300">•</span>
              <Link 
                to="/terms" 
                className="text-slate-600 hover:text-slate-900 font-medium transition-colors"
              >
                Terms of Service
              </Link>
              <span className="text-slate-300">•</span>
              <Link 
                to="/contact" 
                className="text-slate-600 hover:text-slate-900 font-medium transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Security;
