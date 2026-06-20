import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Shield, Lock, Eye, FileText, Mail, Clock } from "lucide-react";

const Privacy = () => {
  const lastUpdated = "April 19, 2026";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Privacy Policy",
    "description": "NexEagle Privacy Policy - Learn how we protect your data in compliance with HIPAA, GDPR, and other regulations",
    "publisher": {
      "@type": "Organization",
      "name": "NexEagle"
    },
    "dateModified": lastUpdated
  };

  const sections = [
    {
      icon: FileText,
      title: "Information We Collect",
      content: [
        {
          subtitle: "Information You Provide",
          text: "When you use our services, contact us, or create an account, we collect information such as your name, email address, phone number, company name, and any other information you choose to provide."
        },
        {
          subtitle: "Automatically Collected Information",
          text: "We automatically collect certain information about your device, including IP address, browser type, operating system, referring URLs, and information about your usage of our services through cookies and similar technologies."
        },
        {
          subtitle: "Healthcare Data",
          text: "For our healthcare products (1HMS, 1Rad, 1Lab, 1Pharma), we process protected health information (PHI) in accordance with HIPAA regulations and applicable healthcare privacy laws. This data is handled with the highest security standards."
        }
      ]
    },
    {
      icon: Eye,
      title: "How We Use Your Information",
      content: [
        {
          subtitle: "Service Delivery",
          text: "We use your information to provide, maintain, and improve our products and services, process transactions, and provide customer support."
        },
        {
          subtitle: "Communication",
          text: "We may use your contact information to send you technical notices, updates, security alerts, and administrative messages about our services."
        },
        {
          subtitle: "Product Development",
          text: "We analyze usage patterns to improve our products, develop new features, and enhance user experience. All analytics are performed on aggregated, anonymized data."
        },
        {
          subtitle: "Legal Compliance",
          text: "We may use your information to comply with legal obligations, enforce our terms of service, and protect the rights and safety of NexEagle and our users."
        }
      ]
    },
    {
      icon: Lock,
      title: "Data Security",
      content: [
        {
          subtitle: "Security Measures",
          text: "We implement industry-standard security measures including encryption at rest and in transit (AES-256, TLS 1.3), regular security audits, access controls, and continuous monitoring to protect your data."
        },
        {
          subtitle: "Compliance Standards",
          text: "Our systems are designed to comply with HIPAA, GDPR, ISO 27001, and SOC 2 Type II standards. We undergo regular third-party security assessments and maintain comprehensive security documentation."
        },
        {
          subtitle: "Data Breach Protocol",
          text: "In the unlikely event of a data breach, we will notify affected users within 72 hours and take immediate action to secure systems and prevent further unauthorized access."
        }
      ]
    },
    {
      icon: Shield,
      title: "Data Sharing and Disclosure",
      content: [
        {
          subtitle: "Service Providers",
          text: "We may share your information with trusted third-party service providers who assist us in operating our services, such as cloud hosting providers, payment processors, and analytics services. All providers are bound by strict confidentiality agreements."
        },
        {
          subtitle: "Business Transfers",
          text: "If NexEagle is involved in a merger, acquisition, or sale of assets, your information may be transferred. We will provide notice before your information is transferred and becomes subject to a different privacy policy."
        },
        {
          subtitle: "Legal Requirements",
          text: "We may disclose your information if required by law, court order, or governmental request, or when we believe disclosure is necessary to protect our rights, your safety, or the safety of others."
        },
        {
          subtitle: "No Sale of Data",
          text: "We do not sell, rent, or trade your personal information to third parties for marketing purposes."
        }
      ]
    }
  ];

  const rights = [
    {
      title: "Access",
      description: "Request a copy of the personal information we hold about you"
    },
    {
      title: "Correction",
      description: "Request correction of inaccurate or incomplete information"
    },
    {
      title: "Deletion",
      description: "Request deletion of your personal information, subject to legal obligations"
    },
    {
      title: "Portability",
      description: "Request transfer of your data to another service provider"
    },
    {
      title: "Opt-Out",
      description: "Opt out of marketing communications at any time"
    },
    {
      title: "Restriction",
      description: "Request restriction of processing of your personal information"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Privacy Policy"
        description="NexEagle Privacy Policy. Learn how we collect, use, and protect your information in compliance with HIPAA, GDPR, ISO 27001, and other data protection regulations."
        keywords="privacy policy, data protection, HIPAA compliance, GDPR, data privacy, healthcare data security, personal information protection"
        structuredData={structuredData}
      />
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="container px-6 md:px-8 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-6">
              <Shield className="w-4 h-4" />
              <span>Legal</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-slate-600 mb-8">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
              <Clock className="w-4 h-4" />
              <span>Last updated: {lastUpdated}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 border-b border-slate-200">
        <div className="container px-6 md:px-8 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
              <p className="text-slate-700 leading-relaxed">
                NexEagle ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our healthcare products (1HMS, 1Rad, 1Lab, 1Pharma) and product engineering services. By using our services, you agree to the collection and use of information in accordance with this policy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <section className="py-20">
        <div className="container px-6 md:px-8 lg:px-12">
          <div className="max-w-4xl mx-auto space-y-16">
            {sections.map((section, index) => (
              <div key={index} className="scroll-mt-24" id={section.title.toLowerCase().replace(/\s+/g, '-')}>
                <div className="flex items-start gap-4 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0">
                    <section.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-2">
                      {section.title}
                    </h2>
                  </div>
                </div>
                
                <div className="space-y-6 ml-16">
                  {section.content.map((item, idx) => (
                    <div key={idx}>
                      <h3 className="text-xl font-semibold text-slate-900 mb-3">
                        {item.subtitle}
                      </h3>
                      <p className="text-slate-600 leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Your Rights Section */}
            <div className="scroll-mt-24" id="your-rights">
              <div className="flex items-start gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-2">
                    Your Rights
                  </h2>
                </div>
              </div>
              
              <div className="ml-16">
                <p className="text-slate-600 leading-relaxed mb-8">
                  Depending on your location, you may have certain rights regarding your personal information:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  {rights.map((right, index) => (
                    <div key={index} className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">
                        {right.title}
                      </h3>
                      <p className="text-sm text-slate-600">
                        {right.description}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="text-slate-600 leading-relaxed mt-6">
                  To exercise any of these rights, please contact us at{" "}
                  <a href="mailto:privacy@nexeagle.com" className="text-blue-600 hover:text-blue-700 font-medium">
                    privacy@nexeagle.com
                  </a>
                </p>
              </div>
            </div>

            {/* Cookies Section */}
            <div className="scroll-mt-24" id="cookies">
              <div className="flex items-start gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-2">
                    Cookies and Tracking
                  </h2>
                </div>
              </div>
              
              <div className="ml-16 space-y-4">
                <p className="text-slate-600 leading-relaxed">
                  We use cookies and similar tracking technologies to track activity on our services and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our services.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Types of cookies we use:
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-600">
                  <li><strong>Essential Cookies:</strong> Required for the operation of our services</li>
                  <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our services</li>
                  <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                  <li><strong>Marketing Cookies:</strong> Track your activity to deliver relevant advertisements (with your consent)</li>
                </ul>
              </div>
            </div>

            {/* Data Retention */}
            <div className="scroll-mt-24" id="data-retention">
              <div className="flex items-start gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-2">
                    Data Retention
                  </h2>
                </div>
              </div>
              
              <div className="ml-16 space-y-4">
                <p className="text-slate-600 leading-relaxed">
                  We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. Healthcare data is retained in accordance with applicable medical record retention laws and HIPAA requirements.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  When we no longer need your information, we will securely delete or anonymize it in accordance with our data retention policy and applicable regulations.
                </p>
              </div>
            </div>

            {/* International Transfers */}
            <div className="scroll-mt-24" id="international-transfers">
              <div className="flex items-start gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-2">
                    International Data Transfers
                  </h2>
                </div>
              </div>
              
              <div className="ml-16 space-y-4">
                <p className="text-slate-600 leading-relaxed">
                  Your information may be transferred to and maintained on servers located outside of your country where data protection laws may differ. We ensure that all international transfers comply with applicable data protection laws and implement appropriate safeguards such as Standard Contractual Clauses.
                </p>
              </div>
            </div>

            {/* Children's Privacy */}
            <div className="scroll-mt-24" id="childrens-privacy">
              <div className="flex items-start gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-2">
                    Children's Privacy
                  </h2>
                </div>
              </div>
              
              <div className="ml-16 space-y-4">
                <p className="text-slate-600 leading-relaxed">
                  Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you are a parent or guardian and believe your child has provided us with personal information, please contact us, and we will delete such information.
                </p>
              </div>
            </div>

            {/* Changes to Policy */}
            <div className="scroll-mt-24" id="changes">
              <div className="flex items-start gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-2">
                    Changes to This Policy
                  </h2>
                </div>
              </div>
              
              <div className="ml-16 space-y-4">
                <p className="text-slate-600 leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. For material changes, we will provide prominent notice or obtain consent as required by law.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  We encourage you to review this Privacy Policy periodically for any changes.
                </p>
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
                  <Mail className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-2">
                    Contact Us
                  </h2>
                  <p className="text-slate-600 leading-relaxed">
                    If you have any questions about this Privacy Policy or our data practices, please contact us:
                  </p>
                </div>
              </div>
              
              <div className="ml-18 space-y-4">
                <div>
                  <p className="text-sm font-semibold text-slate-500 mb-1">Email</p>
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
                <div>
                  <p className="text-sm font-semibold text-slate-500 mb-1">Phone</p>
                  <a href="tel:+918074906808" className="text-lg text-slate-900 font-medium">
                    +91 8074906808
                  </a>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-500 mb-1">Address</p>
                  <p className="text-lg text-slate-900">
                    NexEagle<br />
                    Kolkata, India
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-slate-200">
                <p className="text-sm text-slate-500">
                  For HIPAA-related inquiries or to report a potential privacy breach, please contact our Privacy Officer at{" "}
                  <a href="mailto:privacy@nexeagle.com" className="text-blue-600 hover:text-blue-700 font-medium">
                    privacy@nexeagle.com
                  </a>
                </p>
              </div>
            </div>

            {/* Related Links */}
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <Link 
                to="/terms" 
                className="text-slate-600 hover:text-slate-900 font-medium transition-colors"
              >
                Terms of Service
              </Link>
              <span className="text-slate-300">•</span>
              <Link 
                to="/security" 
                className="text-slate-600 hover:text-slate-900 font-medium transition-colors"
              >
                Security
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

export default Privacy;
