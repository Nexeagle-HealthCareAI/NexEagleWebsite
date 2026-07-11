import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DeferredLiveChat from "@/components/DeferredLiveChat";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Clock, Send, Check, Calendar, MessageSquare, ArrowRight } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsSubmitted(false);
    setSubmitError(null);

    try {
      const response = await fetch("https://formsubmit.co/ajax/info@nexeagle.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: "New NexEagle Contact Form Submission",
          firstName: formData.firstName,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          message: formData.message,
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to send message");
      }

      setIsSubmitted(true);

      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          firstName: '',
          email: '',
          phone: '',
          company: '',
          message: ''
        });
      }, 5000);
    } catch (error) {
      setSubmitError("We couldn't send your message. Please try again or email info@nexeagle.com directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "mainEntity": {
      "@type": "Organization",
      "name": "NexEagle",
      "url": "https://nexeagle.com",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+918074906808",
        "email": "info@nexeagle.com",
        "contactType": "customer service",
        "availableLanguage": ["English", "Hindi"],
        "areaServed": "IN"
      }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Contact Us - Get Started with NexEagle"
        description="Contact NexEagle for healthcare software solutions or product engineering services. Schedule a demo, request a consultation, or discuss your project with our team."
        keywords="contact healthcare software company, schedule demo, product consultation, NexEagle contact, healthcare technology support"
        structuredData={structuredData}
      />
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-16 bg-gradient-to-b from-teal-50/20 via-white to-white select-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-teal/5 pointer-events-none rounded-full blur-[140px] z-0"></div>
        
        <div className="container relative z-10 px-6 md:px-8 lg:px-12 max-w-5xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
            Get in Touch.
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-light leading-relaxed">
            Whether you need a unified clinical system or a product engineering partner, we're here to help you deploy and scale.
          </p>
        </div>
      </section>

      {/* Main Grid Content */}
      <section className="container px-6 md:px-8 lg:px-12 max-w-5xl mx-auto pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Contact Form Container (7 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                Send us a message.
              </h2>
              <p className="text-slate-500 text-sm md:text-base leading-relaxed">
                Fill out the form below. Our clinical onboarding advisers or engineering team will get back to you within 24 hours.
              </p>
            </div>

            {isSubmitted ? (
              <div className="text-center py-16 px-6 bg-slate-50 rounded-3xl border border-brand-teal/20 space-y-4 select-none">
                <div className="w-14 h-14 bg-teal-50 border border-brand-teal/20 rounded-2xl flex items-center justify-center mx-auto">
                  <Check className="w-7 h-7 text-brand-teal" />
                </div>
                <h3 className="text-2xl font-black text-slate-900">Message Sent!</h3>
                <p className="text-slate-500 text-sm md:text-base">
                  Thank you for reaching out. We will review your details and contact you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {submitError && (
                  <div className="rounded-2xl border border-red-200 bg-red-50 text-red-700 px-5 py-4 text-xs md:text-sm font-medium">
                    {submitError}
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Name *
                    </label>
                    <Input 
                      id="firstName" 
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="John Doe" 
                      required
                      className="h-12 border border-slate-200 focus:border-brand-teal/40 focus:ring-brand-teal/20 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Email *
                    </label>
                    <Input 
                      id="email" 
                      name="email"
                      type="email" 
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@company.com" 
                      required
                      className="h-12 border border-slate-200 focus:border-brand-teal/40 focus:ring-brand-teal/20 rounded-xl"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="phone" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Phone *
                    </label>
                    <Input 
                      id="phone" 
                      name="phone"
                      type="tel" 
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 98765 43210" 
                      required
                      className="h-12 border border-slate-200 focus:border-brand-teal/40 focus:ring-brand-teal/20 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="company" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Company / Hospital
                    </label>
                    <Input 
                      id="company" 
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Care Hospital" 
                      className="h-12 border border-slate-200 focus:border-brand-teal/40 focus:ring-brand-teal/20 rounded-xl"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Message *
                  </label>
                  <Textarea 
                    id="message" 
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Describe your workflows, scaling issues, or requested products..."
                    rows={6}
                    required
                    className="border border-slate-200 focus:border-brand-teal/40 focus:ring-brand-teal/20 rounded-xl resize-none"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-base rounded-full shadow-md transition-all duration-300"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <span className="text-white">Send Message</span>
                      <Send className="ml-2 h-4 w-4 text-white" />
                    </>
                  )}
                </Button>

                <p className="text-xs text-slate-400 text-center select-none">
                  By submitting this form, you agree to our{" "}
                  <a href="/privacy" className="text-brand-teal hover:underline font-medium">
                    Privacy Policy
                  </a>
                </p>
              </form>
            )}
          </div>
          
          {/* Info Panels Container (5 Cols) */}
          <div className="lg:col-span-5 space-y-8 select-none">
            
            {/* Quick Actions Card */}
            <div className="p-8 rounded-3xl border border-slate-200/80 bg-slate-50 space-y-6">
              <h3 className="text-xl font-bold text-slate-900">Quick Actions</h3>
              <div className="space-y-4">
                <a
                  href="mailto:info@nexeagle.com"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-200 hover:border-brand-teal/40 hover:shadow-[0_8px_20px_rgba(20,184,166,0.03)] transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-teal-50 border border-brand-teal/10 flex items-center justify-center shrink-0">
                    <Calendar className="w-5 h-5 text-brand-teal" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-slate-900 text-sm group-hover:text-brand-teal transition-colors">Schedule a Demo</p>
                    <p className="text-xs text-slate-500 truncate">See 1HMS & 1Rad PACS in action</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform shrink-0" />
                </a>

                <a
                  href="mailto:sales@nexeagle.com"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-200 hover:border-brand-teal/40 hover:shadow-[0_8px_20px_rgba(20,184,166,0.03)] transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-teal-50 border border-brand-teal/10 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5 text-brand-teal" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-slate-900 text-sm group-hover:text-brand-teal transition-colors">Talk to Sales</p>
                    <p className="text-xs text-slate-500 truncate">Discuss custom pricing & plans</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform shrink-0" />
                </a>
              </div>
            </div>

            {/* Office Hours Panel */}
            <div className="p-8 rounded-3xl border border-slate-200/80 bg-white space-y-6">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-slate-700" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Office Hours</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Monday - Friday</span>
                  <span className="font-bold text-slate-900">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Saturday</span>
                  <span className="font-bold text-slate-900">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Sunday</span>
                  <span className="font-bold text-slate-900">Closed</span>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-100">
                <p className="text-xs text-slate-500 leading-relaxed">
                  <strong>Emergency Support:</strong> Technical support channels are available 24/7 for clinical enterprise tier installations.
                </p>
              </div>
            </div>

            {/* Office Location Panel */}
            <div className="p-8 rounded-3xl border border-slate-200/80 bg-white space-y-6">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-slate-700" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Our Office</h3>
              </div>
              <div className="space-y-2 text-sm leading-relaxed text-slate-600">
                <p className="font-bold text-slate-950">NexEagle</p>
                <p>
                  Kolkata, West Bengal<br />
                  India
                </p>
                <p className="text-xs text-slate-400 pt-4 border-t border-slate-100">
                  Note: Client visits by appointment only.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      <Footer />
      <DeferredLiveChat />
    </div>
  );
};

export default Contact;
