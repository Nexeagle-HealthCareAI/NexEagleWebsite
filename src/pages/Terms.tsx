import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { FileText, Scale, AlertCircle, CheckCircle, XCircle, Shield } from "lucide-react";

const Terms = () => {
  const lastUpdated = "April 19, 2026";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Terms of Service",
    "description": "NexEagle Terms of Service - Legal terms and conditions for using our healthcare products and engineering services",
    "publisher": {
      "@type": "Organization",
      "name": "NexEagle"
    },
    "dateModified": lastUpdated
  };

  const sections = [
    {
      icon: FileText,
      title: "Acceptance of Terms",
      content: [
        {
          text: "By accessing or using NexEagle's services, including our healthcare products (1HMS, 1Rad, 1Lab, 1Pharma) and product engineering services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any part of these terms, you may not use our services."
        },
        {
          text: "These terms constitute a legally binding agreement between you (either an individual or an entity) and NexEagle. We reserve the right to modify these terms at any time, and your continued use of our services after such modifications constitutes acceptance of the updated terms."
        }
      ]
    },
    {
      icon: CheckCircle,
      title: "Services Description",
      content: [
        {
          subtitle: "Healthcare Products",
          text: "NexEagle provides integrated healthcare management software including hospital management (1HMS), radiology and imaging (1Rad), laboratory workflow (1Lab), and pharmacy management (1Pharma) systems. These products are designed to streamline healthcare operations and improve patient care delivery."
        },
        {
          subtitle: "Product Engineering Services",
          text: "We offer product strategy, product design, full-stack development, AI integration, system architecture, and digital transformation services to startups and businesses. Our services are provided on a project basis, dedicated team model, or staff augmentation arrangement as agreed in separate service agreements."
        },
        {
          subtitle: "Service Availability",
          text: "We strive to maintain 99.9% uptime for our healthcare products. However, we do not guarantee uninterrupted access and reserve the right to modify, suspend, or discontinue any part of our services with reasonable notice, except in cases of emergency maintenance or security concerns."
        }
      ]
    },
    {
      icon: Scale,
      title: "User Responsibilities",
      content: [
        {
          subtitle: "Account Security",
          text: "You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must immediately notify us of any unauthorized use of your account or any other breach of security."
        },
        {
          subtitle: "Acceptable Use",
          text: "You agree to use our services only for lawful purposes and in accordance with these terms. You must not use our services to transmit any harmful code, engage in unauthorized access, violate any laws, infringe intellectual property rights, or interfere with the proper functioning of our systems."
        },
        {
          subtitle: "Healthcare Compliance",
          text: "If you use our healthcare products, you agree to comply with all applicable healthcare regulations including HIPAA, local medical practice laws, and patient privacy requirements. You are responsible for obtaining necessary patient consents and maintaining appropriate clinical practices."
        },
        {
          subtitle: "Data Accuracy",
          text: "You are responsible for the accuracy, quality, and legality of the data you input into our systems. For healthcare products, you must ensure that all clinical data entered is accurate and complete, as this information may be used for patient care decisions."
        }
      ]
    },
    {
      icon: Shield,
      title: "Intellectual Property",
      content: [
        {
          subtitle: "NexEagle Property",
          text: "All content, features, and functionality of our services, including but not limited to software, text, graphics, logos, icons, images, audio clips, and data compilations, are the exclusive property of NexEagle and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws."
        },
        {
          subtitle: "License Grant",
          text: "Subject to your compliance with these terms, we grant you a limited, non-exclusive, non-transferable, revocable license to access and use our services for your internal business purposes. This license does not include any right to resell, redistribute, or create derivative works from our services."
        },
        {
          subtitle: "Your Content",
          text: "You retain all rights to the data and content you submit to our services. By submitting content, you grant us a worldwide, non-exclusive, royalty-free license to use, store, and process your content solely for the purpose of providing and improving our services."
        },
        {
          subtitle: "Feedback",
          text: "If you provide us with any feedback, suggestions, or ideas about our services, you grant us the right to use such feedback without any obligation to you, including the right to incorporate it into our products and services."
        }
      ]
    },
    {
      icon: AlertCircle,
      title: "Payment Terms",
      content: [
        {
          subtitle: "Fees and Billing",
          text: "Fees for our services are specified in your service agreement or subscription plan. All fees are exclusive of applicable taxes, which you are responsible for paying. We reserve the right to change our fees with 30 days' notice for subscription services."
        },
        {
          subtitle: "Payment Methods",
          text: "We accept payment via credit card, bank transfer, or other methods as agreed. For subscription services, you authorize us to charge your payment method automatically on each billing cycle. For project-based services, payment terms are specified in the statement of work."
        },
        {
          subtitle: "Late Payment",
          text: "If payment is not received by the due date, we reserve the right to suspend access to our services until payment is received. Late payments may incur interest charges at the rate of 1.5% per month or the maximum rate permitted by law, whichever is lower."
        },
        {
          subtitle: "Refunds",
          text: "Subscription fees are generally non-refundable. For project-based services, refund terms are specified in the service agreement. We may provide refunds at our discretion for unused portions of prepaid services if you cancel within the first 30 days."
        }
      ]
    },
    {
      icon: XCircle,
      title: "Termination",
      content: [
        {
          subtitle: "Termination by You",
          text: "You may terminate your account at any time by providing written notice. For subscription services, termination will be effective at the end of the current billing period. You remain responsible for all fees incurred prior to termination."
        },
        {
          subtitle: "Termination by Us",
          text: "We may suspend or terminate your access to our services immediately, without prior notice, if you breach these terms, fail to pay fees when due, or if we believe your use poses a security risk or violates applicable laws. We will provide notice when reasonably possible."
        },
        {
          subtitle: "Effect of Termination",
          text: "Upon termination, your right to use our services will immediately cease. We will provide you with a reasonable opportunity (typically 30 days) to export your data. After this period, we may delete your data in accordance with our data retention policies, except where required by law to retain it."
        },
        {
          subtitle: "Survival",
          text: "Provisions regarding intellectual property, confidentiality, limitation of liability, indemnification, and dispute resolution will survive termination of these terms."
        }
      ]
    }
  ];

  const warranties = [
    {
      title: "Service Warranties",
      items: [
        "We warrant that our services will perform substantially in accordance with our documentation",
        "We will use commercially reasonable efforts to maintain service availability",
        "We maintain appropriate security measures to protect your data",
        "Our healthcare products are designed to support HIPAA compliance when properly configured"
      ]
    },
    {
      title: "Disclaimer of Warranties",
      items: [
        "Services are provided \"as is\" and \"as available\" without warranties of any kind",
        "We do not warrant that services will be uninterrupted, error-free, or completely secure",
        "We do not provide medical advice or make clinical decisions - users are responsible for all clinical judgments",
        "We disclaim all implied warranties including merchantability, fitness for a particular purpose, and non-infringement"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Terms of Service"
        description="NexEagle Terms of Service. Legal terms and conditions for using our healthcare products (1HMS, 1Rad, 1Lab, 1Pharma) and product engineering services."
        keywords="terms of service, legal terms, service agreement, terms and conditions, user agreement, healthcare software terms"
        structuredData={structuredData}
      />
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="container px-6 md:px-8 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-6">
              <Scale className="w-4 h-4" />
              <span>Legal</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
              Terms of Service
            </h1>
            <p className="text-xl text-slate-600 mb-8">
              Please read these terms carefully before using NexEagle's services.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
              <FileText className="w-4 h-4" />
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
                These Terms of Service ("Terms") govern your access to and use of NexEagle's healthcare products and product engineering services. By using our services, you enter into a binding legal agreement with NexEagle. Please read these terms carefully and contact us if you have any questions.
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
                      {item.subtitle && (
                        <h3 className="text-xl font-semibold text-slate-900 mb-3">
                          {item.subtitle}
                        </h3>
                      )}
                      <p className="text-slate-600 leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Warranties Section */}
            <div className="scroll-mt-24" id="warranties">
              <div className="flex items-start gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-2">
                    Warranties and Disclaimers
                  </h2>
                </div>
              </div>
              
              <div className="ml-16 space-y-8">
                {warranties.map((warranty, index) => (
                  <div key={index}>
                    <h3 className="text-xl font-semibold text-slate-900 mb-4">
                      {warranty.title}
                    </h3>
                    <ul className="space-y-3">
                      {warranty.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                            index === 0 ? 'bg-green-100' : 'bg-amber-100'
                          }`}>
                            {index === 0 ? (
                              <CheckCircle className="w-3 h-3 text-green-600" />
                            ) : (
                              <AlertCircle className="w-3 h-3 text-amber-600" />
                            )}
                          </div>
                          <span className="text-slate-600 leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Limitation of Liability */}
            <div className="scroll-mt-24" id="liability">
              <div className="flex items-start gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-2">
                    Limitation of Liability
                  </h2>
                </div>
              </div>
              
              <div className="ml-16 space-y-4">
                <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg">
                  <p className="text-slate-700 leading-relaxed font-medium mb-2">
                    IMPORTANT: PLEASE READ THIS SECTION CAREFULLY
                  </p>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    This section limits our liability to you. Some jurisdictions do not allow certain limitations of liability, so some of these limitations may not apply to you.
                  </p>
                </div>
                
                <p className="text-slate-600 leading-relaxed">
                  To the maximum extent permitted by law, NexEagle shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, use, goodwill, or other intangible losses, resulting from:
                </p>
                
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Your access to or use of or inability to access or use our services</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Any conduct or content of any third party on our services</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Any content obtained from our services</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Unauthorized access, use, or alteration of your transmissions or content</span>
                  </li>
                </ul>

                <p className="text-slate-600 leading-relaxed">
                  Our total liability to you for all claims arising from or relating to these terms or our services shall not exceed the greater of (a) the amount you paid us in the 12 months preceding the claim, or (b) $1,000 USD.
                </p>

                <p className="text-slate-600 leading-relaxed">
                  <strong>Healthcare Services Disclaimer:</strong> Our healthcare products are tools to assist healthcare providers. We do not provide medical advice, diagnosis, or treatment. Healthcare providers are solely responsible for all clinical decisions and patient care. We are not liable for any medical outcomes or clinical decisions made using our products.
                </p>
              </div>
            </div>

            {/* Indemnification */}
            <div className="scroll-mt-24" id="indemnification">
              <div className="flex items-start gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-2">
                    Indemnification
                  </h2>
                </div>
              </div>
              
              <div className="ml-16 space-y-4">
                <p className="text-slate-600 leading-relaxed">
                  You agree to indemnify, defend, and hold harmless NexEagle, its officers, directors, employees, agents, and affiliates from and against any claims, liabilities, damages, losses, and expenses, including reasonable attorneys' fees, arising out of or in any way connected with:
                </p>
                
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Your access to or use of our services</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Your violation of these terms</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Your violation of any third-party rights, including intellectual property or privacy rights</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Any content or data you submit to our services</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Any clinical decisions or patient care provided using our healthcare products</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Dispute Resolution */}
            <div className="scroll-mt-24" id="disputes">
              <div className="flex items-start gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0">
                  <Scale className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-2">
                    Dispute Resolution
                  </h2>
                </div>
              </div>
              
              <div className="ml-16 space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">
                    Governing Law
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    These terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions. The courts of Kolkata, India shall have exclusive jurisdiction over any disputes arising from these terms.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">
                    Informal Resolution
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    Before filing a formal dispute, you agree to contact us at legal@nexeagle.com and attempt to resolve the dispute informally. We will attempt to resolve the dispute through good faith negotiations for at least 30 days.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">
                    Arbitration
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    If we cannot resolve a dispute informally, any dispute shall be resolved through binding arbitration in accordance with the Arbitration and Conciliation Act, 1996 of India. The arbitration shall be conducted in Kolkata, India, in English.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">
                    Class Action Waiver
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    You agree that any dispute resolution proceedings will be conducted only on an individual basis and not in a class, consolidated, or representative action.
                  </p>
                </div>
              </div>
            </div>

            {/* General Provisions */}
            <div className="scroll-mt-24" id="general">
              <div className="flex items-start gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-2">
                    General Provisions
                  </h2>
                </div>
              </div>
              
              <div className="ml-16 space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">
                    Entire Agreement
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    These terms, together with our Privacy Policy and any service-specific agreements, constitute the entire agreement between you and NexEagle regarding our services and supersede all prior agreements.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">
                    Severability
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    If any provision of these terms is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary, and the remaining provisions will remain in full force and effect.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">
                    Waiver
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    No waiver of any term of these terms shall be deemed a further or continuing waiver of such term or any other term, and our failure to assert any right or provision under these terms shall not constitute a waiver of such right or provision.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">
                    Assignment
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    You may not assign or transfer these terms or your rights hereunder without our prior written consent. We may assign these terms without restriction. Any attempted assignment in violation of this section shall be void.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">
                    Force Majeure
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    We shall not be liable for any failure or delay in performance due to circumstances beyond our reasonable control, including acts of God, war, terrorism, riots, embargoes, acts of civil or military authorities, fire, floods, accidents, pandemics, strikes, or shortages of transportation, facilities, fuel, energy, labor, or materials.
                  </p>
                </div>
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
                  <Scale className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-2">
                    Questions About These Terms?
                  </h2>
                  <p className="text-slate-600 leading-relaxed">
                    If you have any questions about these Terms of Service, please contact our legal team:
                  </p>
                </div>
              </div>
              
              <div className="ml-18 space-y-4">
                <div>
                  <p className="text-sm font-semibold text-slate-500 mb-1">Legal Inquiries</p>
                  <a href="mailto:legal@nexeagle.com" className="text-lg text-blue-600 hover:text-blue-700 font-medium">
                    legal@nexeagle.com
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

export default Terms;
