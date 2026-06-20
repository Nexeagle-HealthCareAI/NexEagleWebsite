import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LiveChat from "@/components/LiveChat";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Clock, Send, Check, Calendar, MessageSquare, Sparkles, ArrowRight } from "lucide-react";

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

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Us",
      primary: "info@nexeagle.com",
      secondary: "sales@nexeagle.com",
      description: "Get a response within 24 hours",
      color: "blue"
    },
    {
      icon: Phone,
      title: "Call Us",
      primary: "+91 8074906808",
      secondary: "Mon-Fri, 9AM-6PM IST",
      description: "Speak with our team",
      color: "green"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      primary: "Kolkata, India",
      secondary: "By appointment only",
      description: "Meet us in person",
      color: "purple"
    }
  ];

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
      
      {/* Hero Section - Mobile optimized */}
      <section className="pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="container px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-blue-100 text-blue-700 text-xs sm:text-sm font-semibold mb-4 sm:mb-6">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              <span>Let's Talk</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 sm:mb-6 px-4 sm:px-0">
              Get in Touch
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed px-4 sm:px-0">
              Whether you need a healthcare solution or a product engineering partner, we're here to help you succeed.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods - Premium Cards - Mobile optimized */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-white to-slate-50">
        <div className="container px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {contactMethods.map((method, index) => (
                <a
                  key={index}
                  href={
                    method.icon === Mail
                      ? `mailto:${method.primary}`
                      : method.icon === Phone
                      ? `tel:${method.primary}`
                      : undefined
                  }
                  className="group relative overflow-hidden"
                >
                  {/* Card Container */}
                  <div className="relative p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-white border-2 border-slate-200 hover:border-blue-500 shadow-lg hover:shadow-2xl transition-all duration-300 h-full">
                    
                    {/* Gradient Overlay on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-blue-100/0 group-hover:from-blue-50/50 group-hover:to-blue-100/30 rounded-2xl sm:rounded-3xl transition-all duration-300" />
                    
                    {/* Content */}
                    <div className="relative z-10">
                      {/* Icon with Glow Effect */}
                      <div className="relative mb-4 sm:mb-6">
                        <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-600/25 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                          <method.icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                        </div>
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 sm:mb-4 group-hover:text-blue-600 transition-colors">
                        {method.title}
                      </h3>
                      
                      {/* Primary Info */}
                      <p className="text-base sm:text-lg font-bold text-slate-900 mb-2 break-all">
                        {method.primary}
                      </p>
                      
                      {/* Secondary Info */}
                      <p className="text-xs sm:text-sm font-medium text-slate-600 mb-3 sm:mb-4">
                        {method.secondary}
                      </p>
                      
                      {/* Description with Arrow */}
                      <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-blue-600 group-hover:gap-3 transition-all">
                        <span>{method.description}</span>
                        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                      </div>
                    </div>
                    
                    {/* Decorative Corner Element */}
                    <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-blue-500/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Contact Form Section - Mobile optimized */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
              
              {/* Contact Form */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3 sm:mb-4">
                  Send us a message
                </h2>
                <p className="text-base sm:text-lg text-slate-600 mb-6 sm:mb-8">
                  Fill out the form and we'll get back to you within 24 hours.
                </p>

                {isSubmitted ? (
                  <div className="text-center py-12 px-6 bg-green-50 rounded-2xl border-2 border-green-200">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Message Sent!</h3>
                    <p className="text-slate-600">We'll get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {submitError && (
                      <div className="rounded-xl border-2 border-red-200 bg-red-50 text-red-700 px-4 py-3 text-sm">
                        {submitError}
                      </div>
                    )}

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-semibold text-slate-900 mb-2">
                          Name *
                        </label>
                        <Input 
                          id="firstName" 
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          placeholder="John Doe" 
                          required
                          className="h-12 border-2 border-slate-200 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-slate-900 mb-2">
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
                          className="h-12 border-2 border-slate-200 focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-semibold text-slate-900 mb-2">
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
                          className="h-12 border-2 border-slate-200 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="company" className="block text-sm font-semibold text-slate-900 mb-2">
                          Company
                        </label>
                        <Input 
                          id="company" 
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          placeholder="Your company name" 
                          className="h-12 border-2 border-slate-200 focus:border-blue-500"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-slate-900 mb-2">
                        Message *
                      </label>
                      <Textarea 
                        id="message" 
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us about your project or question..."
                        rows={6}
                        required
                        className="border-2 border-slate-200 focus:border-blue-500 resize-none"
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-base shadow-xl"
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

                    <p className="text-sm text-slate-500 text-center">
                      By submitting this form, you agree to our{" "}
                      <a href="/privacy" className="text-blue-600 hover:text-blue-700 font-medium">
                        Privacy Policy
                      </a>
                    </p>
                  </form>
                )}
              </div>

              {/* Right Side Info */}
              <div className="space-y-8">
                {/* Office Hours */}
                <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-white border-2 border-blue-100">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Office Hours</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 font-medium">Monday - Friday</span>
                      <span className="font-bold text-slate-900">9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 font-medium">Saturday</span>
                      <span className="font-bold text-slate-900">10:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 font-medium">Sunday</span>
                      <span className="font-bold text-slate-900">Closed</span>
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t-2 border-blue-200">
                    <p className="text-sm text-slate-700">
                      <span className="font-bold text-slate-900">Emergency Support:</span> Available 24/7 for Enterprise customers
                    </p>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-white border-2 border-slate-200">
                  <h3 className="text-xl font-bold text-slate-900 mb-6">Quick Actions</h3>
                  <div className="space-y-4">
                    <a
                      href="mailto:info@nexeagle.com"
                      className="flex items-center gap-4 p-4 rounded-xl bg-white border-2 border-slate-200 hover:border-blue-500 hover:shadow-md transition-all group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                        <Calendar className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">Schedule a Demo</p>
                        <p className="text-sm text-slate-600">See our products in action</p>
                      </div>
                    </a>

                    <a
                      href="mailto:sales@nexeagle.com"
                      className="flex items-center gap-4 p-4 rounded-xl bg-white border-2 border-slate-200 hover:border-blue-500 hover:shadow-md transition-all group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center group-hover:bg-green-600 transition-colors">
                        <MessageSquare className="w-5 h-5 text-green-600 group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">Talk to Sales</p>
                        <p className="text-sm text-slate-600">Discuss pricing and plans</p>
                      </div>
                    </a>
                  </div>
                </div>

                {/* Office Location */}
                <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-white border-2 border-slate-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Our Office</h3>
                  </div>
                  <div className="space-y-2">
                    <p className="font-bold text-slate-900">NexEagle</p>
                    <p className="text-slate-600 leading-relaxed">
                      Kolkata, West Bengal<br />
                      India
                    </p>
                    <p className="text-sm text-slate-500 mt-4 pt-4 border-t-2 border-slate-200">
                      <span className="font-semibold text-slate-900">Note:</span> Visits by appointment only
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <LiveChat />
    </div>
  );
};

export default Contact;
