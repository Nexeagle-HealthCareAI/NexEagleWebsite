import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { 
  Check, 
  ArrowRight, 
  Clock, 
  Shield, 
  Zap, 
  Users, 
  Building2, 
  Activity,
  Stethoscope,
  X,
  CheckCircle2
} from "lucide-react";
import { Link } from "react-router-dom";

const Pricing = () => {
  const [selectedCategory, setSelectedCategory] = useState<"clinics" | "hospitals" | "diagnostics">("hospitals");

  // Pricing plans based on category
  const pricingPlans = {
    clinics: [
      {
        name: "Clinic Starter",
        price: "₹999",
        period: "/doctor/month",
        description: "Perfect for small clinics and solo practitioners",
        icon: Stethoscope,
        features: [
          "Up to 50 patients/day",
          "Appointment scheduling",
          "Digital prescriptions",
          "Patient records",
          "Basic billing",
          "Works offline",
          "Mobile app access",
          "WhatsApp notifications",
          "We train your staff until they become experts"
        ],
        cta: "Start Free Trial",
        popular: false
      },
      {
        name: "Hospital Growth",
        price: "₹2,499",
        period: "/month",
        description: "For growing clinics and multi-doctor practices",
        icon: Building2,
        features: [
          "Up to 2 doctors included",
          "Unlimited patients",
          "OPD management",
          "IPD management",
          "Lab management (1Lab)",
          "Pharmacy management (1Pharma)",
          "Appointment scheduling",
          "Digital prescriptions",
          "Advanced reports",
          "We train your staff until they become experts",
          "24/7 support",
          "Works offline"
        ],
        cta: "Book a Demo",
        popular: true
      },
      {
        name: "Enterprise",
        price: "Custom",
        period: "pricing",
        description: "Custom software built for your specific needs",
        icon: Building2,
        features: [
          "Everything in Hospital Growth, plus:",
          "Custom features built for you",
          "Any software you need",
          "Unlimited doctors",
          "Multi-location support",
          "Custom integrations",
          "Dedicated account manager",
          "Priority development",
          "White-label options",
          "API access",
          "We train your staff until they become experts",
          "24/7 priority support"
        ],
        cta: "Contact Sales",
        popular: false
      }
    ],
    hospitals: [
      {
        name: "Hospital Growth",
        price: "₹2,499",
        period: "/month",
        description: "Complete hospital management system",
        icon: Building2,
        features: [
          "Up to 2 doctors included",
          "Unlimited patients",
          "Multiple departments",
          "OPD management",
          "IPD management",
          "Lab management (1Lab)",
          "Pharmacy management (1Pharma)",
          "Bed management",
          "Billing & insurance",
          "Staff management",
          "We train your staff until they become experts",
          "Advanced analytics",
          "24/7 priority support"
        ],
        cta: "Book a Demo",
        popular: true
      },
      {
        name: "Radiology (1Rad)",
        price: "₹4,999",
        period: "/month",
        description: "Advanced radiology and imaging center management",
        icon: Activity,
        features: [
          "DICOM viewer",
          "Image storage",
          "Report templates",
          "Radiologist workflow",
          "Patient portal",
          "Referring doctor portal",
          "Billing integration",
          "PACS integration",
          "Cloud backup",
          "Mobile access",
          "We train your staff until they become experts"
        ],
        cta: "Book a Demo",
        popular: false
      }
    ],
    diagnostics: [
      {
        name: "Lab Management (1Lab)",
        price: "₹499",
        period: "/month add-on",
        description: "Complete laboratory information system",
        icon: Activity,
        features: [
          "Sample tracking",
          "Test management",
          "Result entry",
          "Report generation",
          "Quality control",
          "Inventory management",
          "Barcode support",
          "Integration with HMS",
          "We train your staff until they become experts"
        ],
        cta: "Add to Plan",
        popular: false
      },
      {
        name: "Pharmacy (1Pharma)",
        price: "₹599",
        period: "/month add-on",
        description: "Pharmacy and inventory management",
        icon: Users,
        features: [
          "Medicine inventory",
          "Expiry tracking",
          "Billing integration",
          "Supplier management",
          "Purchase orders",
          "Stock alerts",
          "Batch tracking",
          "Integration with HMS",
          "We train your staff until they become experts"
        ],
        cta: "Add to Plan",
        popular: false
      }
    ]
  };

  const beforeAfter = [
    {
      before: "Paper registers getting lost",
      after: "All records safe in cloud"
    },
    {
      before: "Patients waiting 30+ minutes",
      after: "See patients in 5 minutes"
    },
    {
      before: "Revenue leakage from billing errors",
      after: "Every rupee tracked automatically"
    },
    {
      before: "No internet = no work",
      after: "Works perfectly offline"
    }
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Book a Demo",
      description: "Talk to us for 15 minutes. We'll show you how it works.",
      icon: Users
    },
    {
      step: "2",
      title: "Setup in 48 Hours",
      description: "We set everything up. You just need to start using it.",
      icon: Zap
    },
    {
      step: "3",
      title: "Start Using",
      description: "Your team gets trained. Support available 24/7.",
      icon: CheckCircle2
    }
  ];

  const testimonials = [
    {
      quote: "We were drowning in paper. Now everything is organized. Best decision we made.",
      author: "Dr. Rajesh Kumar",
      role: "Clinic Owner, Jaipur",
      problem: "Paper chaos"
    },
    {
      quote: "Patients used to wait 45 minutes. Now it's under 10 minutes. They're much happier.",
      author: "Dr. Priya Sharma",
      role: "Multi-specialty Hospital, Indore",
      problem: "Long wait times"
    },
    {
      quote: "We were losing money on billing mistakes. Now every transaction is tracked perfectly.",
      author: "Dr. Amit Patel",
      role: "Diagnostic Center, Surat",
      problem: "Revenue leakage"
    }
  ];

  const faqs = [
    {
      question: "Do I need internet to use this?",
      answer: "No! Our software works offline. When internet comes back, everything syncs automatically. Perfect for tier 2/3 cities."
    },
    {
      question: "How long does setup take?",
      answer: "48 hours. We do everything - installation, data migration, training. You just start using it."
    },
    {
      question: "What if I need help?",
      answer: "Call us anytime. 24/7 support included. We speak Hindi, English, and regional languages."
    },
    {
      question: "Can I try before buying?",
      answer: "Yes! 30-day free trial. No credit card needed. Full access to all features."
    },
    {
      question: "What if I'm not tech-savvy?",
      answer: "That's okay! We train your entire team. The software is designed to be simple - if you can use WhatsApp, you can use this."
    },
    {
      question: "Is my patient data safe?",
      answer: "100% safe. Bank-level encryption. Daily backups. Your data is stored in secure Indian data centers."
    },
    {
      question: "Can I cancel anytime?",
      answer: "Yes, no long-term contracts. Cancel anytime. We'll help you export all your data."
    },
    {
      question: "Do you have discounts?",
      answer: "Yes! Annual plans get 2 months free. Special pricing for government hospitals and rural clinics."
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "NexEagle Healthcare Software",
    "description": "Hospital and clinic management software. Works offline. Setup in 48 hours. ₹999 per doctor per month.",
    "offers": [
      {
        "@type": "Offer",
        "name": "Per Doctor Pricing",
        "price": "999",
        "priceCurrency": "INR",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": "999",
          "priceCurrency": "INR",
          "unitText": "MONTH"
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Pricing - Hospital & Clinic Software | Setup in 48 Hours"
        description="Simple pricing for hospital and clinic management software. ₹999 per doctor per month. Works offline. Setup in 48 hours. Free trial available."
        keywords="hospital software pricing, clinic management software cost, HMS pricing India, affordable hospital software, clinic software price, per doctor pricing"
        structuredData={structuredData}
      />
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="container px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-teal-100 text-teal-700 text-xs sm:text-sm font-semibold mb-4 sm:mb-6">
              <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Setup in 48 hours</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 sm:mb-6 px-2">
              Run Your Clinic or Hospital Without Chaos
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed mb-6 sm:mb-8 px-2">
              Simple software that works offline. No technical knowledge needed. 
              <span className="block mt-2 font-semibold text-teal-600">Start using in 48 hours.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
              <Button asChild size="lg" className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white text-base sm:text-lg px-6 sm:px-8 h-12 sm:h-14">
                <Link to="/contact">
                  Book Free Demo
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                </Link>
              </Button>
              <p className="text-xs sm:text-sm text-slate-600">
                ✓ 30-day free trial • ✓ No credit card needed
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Plan Selector */}
      <section className="py-8 sm:py-12 bg-white border-b border-slate-200">
        <div className="container px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <p className="text-center text-slate-600 mb-4 sm:mb-6 text-sm sm:text-base">Choose your facility type:</p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button
                onClick={() => setSelectedCategory("clinics")}
                className={`px-4 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold transition-all text-sm sm:text-base ${
                  selectedCategory === "clinics"
                    ? "bg-teal-600 text-white shadow-lg shadow-teal-600/30"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <Stethoscope className="w-4 h-4 sm:w-5 sm:h-5 inline-block mr-2" />
                Clinics
              </button>
              <button
                onClick={() => setSelectedCategory("hospitals")}
                className={`px-4 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold transition-all text-sm sm:text-base ${
                  selectedCategory === "hospitals"
                    ? "bg-teal-600 text-white shadow-lg shadow-teal-600/30"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <Building2 className="w-4 h-4 sm:w-5 sm:h-5 inline-block mr-2" />
                Hospitals
              </button>
              <button
                onClick={() => setSelectedCategory("diagnostics")}
                className={`px-4 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold transition-all text-sm sm:text-base ${
                  selectedCategory === "diagnostics"
                    ? "bg-teal-600 text-white shadow-lg shadow-teal-600/30"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <Activity className="w-4 h-4 sm:w-5 sm:h-5 inline-block mr-2" />
                Add-on Modules
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className={`grid gap-6 sm:gap-8 ${
              pricingPlans[selectedCategory].length === 2 
                ? "md:grid-cols-2 max-w-5xl mx-auto" 
                : pricingPlans[selectedCategory].length === 3
                ? "md:grid-cols-2 lg:grid-cols-3"
                : "md:grid-cols-2"
            }`}>
              {pricingPlans[selectedCategory].map((plan, index) => {
                const IconComponent = plan.icon;
                return (
                  <div
                    key={index}
                    className={`relative rounded-2xl sm:rounded-3xl border-2 ${
                      plan.popular
                        ? "border-teal-500 shadow-2xl shadow-teal-500/20 md:scale-105"
                        : "border-slate-200 hover:border-slate-300 hover:shadow-xl"
                    } bg-white p-6 sm:p-8 transition-all duration-300`}
                  >
                    {/* Popular Badge */}
                    {plan.popular && (
                      <div className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2">
                        <div className="px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-gradient-to-r from-teal-600 to-teal-500 text-white text-xs sm:text-sm font-bold shadow-lg">
                          Most Popular
                        </div>
                      </div>
                    )}

                    {/* Plan Header */}
                    <div className="mb-6 sm:mb-8">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-teal-100 flex items-center justify-center mb-3 sm:mb-4">
                        <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-teal-600" />
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{plan.description}</p>
                    </div>

                    {/* Pricing */}
                    <div className="mb-6 sm:mb-8">
                      <div className="flex items-baseline gap-1 sm:gap-2 mb-2">
                        <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900">
                          {plan.price}
                        </span>
                        <span className="text-sm sm:text-base text-slate-600">{plan.period}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-teal-600 font-semibold">
                        ✓ Works offline • ✓ Setup in 48 hours
                      </p>
                    </div>

                    {/* CTA Button */}
                    <Button
                      asChild
                      className={`w-full h-11 sm:h-12 mb-6 sm:mb-8 font-semibold text-sm sm:text-base ${
                        plan.popular
                          ? "bg-teal-600 hover:bg-teal-700 text-white"
                          : "bg-slate-900 hover:bg-slate-800 text-white"
                      }`}
                    >
                      <Link to="/contact">
                        {plan.cta}
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </Button>

                    {/* Features */}
                    <div className="space-y-3 sm:space-y-4">
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        What's included:
                      </p>
                      {plan.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-2 sm:gap-3">
                          <Check className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                          <span className={`text-xs sm:text-sm ${
                            feature.includes('train your staff') 
                              ? 'font-bold text-teal-700 bg-teal-50 px-2 py-1 rounded-md' 
                              : 'text-slate-700'
                          }`}>
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Before vs After */}
      <section className="py-12 sm:py-16 md:py-20 bg-slate-50">
        <div className="container px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-3 sm:mb-4 px-2">
                See the Difference
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-slate-600 px-2">
                Before NexEagle vs After NexEagle
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              {beforeAfter.map((item, index) => (
                <div key={index} className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg">
                  <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                      <X className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-semibold text-red-600 mb-1 sm:mb-2">BEFORE</p>
                      <p className="text-sm sm:text-base text-slate-700">{item.before}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-semibold text-teal-600 mb-1 sm:mb-2">AFTER</p>
                      <p className="text-sm sm:text-base font-semibold text-slate-900">{item.after}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-3 sm:mb-4 px-2">
                How It Works
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-slate-600 px-2">
                Three simple steps to go digital
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-6 sm:gap-8">
              {howItWorks.map((step, index) => {
                const IconComponent = step.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="relative mb-4 sm:mb-6">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-teal-100 flex items-center justify-center mx-auto">
                        <IconComponent className="w-8 h-8 sm:w-10 sm:h-10 text-teal-600" />
                      </div>
                      <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-teal-600 text-white font-bold flex items-center justify-center text-sm sm:text-base">
                        {step.step}
                      </div>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 sm:mb-3">{step.title}</h3>
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed px-2">{step.description}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-10 sm:mt-12 text-center">
              <Button asChild size="lg" className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white text-base sm:text-lg px-6 sm:px-8 h-12 sm:h-14">
                <Link to="/contact">
                  Start Your Digital Hospital in 48 Hours
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-12 sm:py-16 md:py-20 bg-slate-50">
        <div className="container px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-3 sm:mb-4 px-2">
                What Doctors Say
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-slate-600 px-2">
                Real problems solved for real doctors
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg">
                  <div className="mb-4 sm:mb-6">
                    <div className="inline-block px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-semibold mb-3 sm:mb-4">
                      Problem: {testimonial.problem}
                    </div>
                    <p className="text-sm sm:text-base text-slate-700 leading-relaxed italic">
                      "{testimonial.quote}"
                    </p>
                  </div>
                  <div className="border-t border-slate-200 pt-4">
                    <p className="font-bold text-slate-900 text-sm sm:text-base">{testimonial.author}</p>
                    <p className="text-xs sm:text-sm text-slate-600">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 md:py-24 bg-white">
        <div className="container px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-3 sm:mb-4 px-2">
                Common Questions
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-slate-600 px-2">
                Everything you need to know
              </p>
            </div>

            <div className="space-y-4 sm:space-y-6">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="p-5 sm:p-6 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors"
                >
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 sm:mb-3">{faq.question}</h3>
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-teal-600 to-teal-700">
        <div className="container px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 px-2">
              Ready to Go Digital?
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-teal-100 mb-6 sm:mb-8 px-2">
              Start your digital hospital in 48 hours. No technical knowledge needed.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6 sm:mb-8">
              <Button asChild size="lg" className="w-full sm:w-auto bg-white text-teal-600 hover:bg-slate-50 text-base sm:text-lg px-6 sm:px-8 h-12 sm:h-14 font-bold">
                <Link to="/contact">
                  Book Free Demo Now
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                </Link>
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center text-white text-sm sm:text-base">
              <div className="flex items-center justify-center gap-2">
                <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>30-day free trial</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>No credit card needed</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Setup in 48 hours</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Pricing;
