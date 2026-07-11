import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Mail, MessageSquare, CheckCircle } from "lucide-react";
import Link from "next/link";

const ServicesCTA = () => {
  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-white to-slate-50">
      <div className="container px-6 md:px-8 lg:px-12">
        <div className="max-w-5xl mx-auto">
          
          <div className="p-12 md:p-16 rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white text-center relative overflow-hidden shadow-2xl shadow-blue-900/20">
            
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:32px_32px]"></div>
            
            {/* Content */}
            <div className="relative z-10 space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white">
                  Let's build something<br />
                  extraordinary together.
                </h2>
                
                <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
                  Tell us about your project. We'll show you how we can help you succeed.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                <Button
                  asChild
                  size="lg"
                  className="px-8 py-6 h-auto text-base font-semibold bg-white text-blue-700 hover:bg-blue-50 shadow-xl shadow-blue-900/20"
                >
                  <Link href="/contact" className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Schedule a Call
                  </Link>
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="px-8 py-6 h-auto text-base font-semibold border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50"
                >
                  <a href="mailto:info@nexeagle.com" className="flex items-center gap-2">
                    <Mail className="w-5 h-5" />
                    Email Us
                  </a>
                </Button>
              </div>

              {/* Engagement Options */}
              <div className="pt-8 grid sm:grid-cols-3 gap-6 text-left max-w-3xl mx-auto">
                <div className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-bold text-base text-white mb-1">Project-Based</p>
                    <p className="text-sm text-blue-100">Fixed scope, timeline, and budget</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-bold text-base text-white mb-1">Dedicated Team</p>
                    <p className="text-sm text-blue-100">Extended team, monthly retainer</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-bold text-base text-white mb-1">Staff Augmentation</p>
                    <p className="text-sm text-blue-100">Fill specific skill gaps</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-400/30 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-400/30 rounded-full blur-3xl"></div>
            
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 text-center space-y-6">
            <p className="text-sm text-slate-600 font-medium">Trusted by startups and businesses worldwide</p>
            
            <div className="flex flex-wrap justify-center gap-12 text-slate-700">
              <div className="text-center">
                <div className="text-4xl font-bold text-slate-900 mb-1">2 weeks</div>
                <div className="text-sm font-medium text-slate-600">Average start time</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-slate-900 mb-1">95%</div>
                <div className="text-sm font-medium text-slate-600">Client satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-slate-900 mb-1">50+</div>
                <div className="text-sm font-medium text-slate-600">Projects delivered</div>
              </div>
            </div>

            {/* Testimonial */}
            <div className="pt-8 max-w-2xl mx-auto">
              <blockquote className="text-lg text-slate-700 italic leading-relaxed">
                "NexEagle didn't just build our product—they became our product team. 
                Their strategic thinking and technical expertise were invaluable."
              </blockquote>
              <p className="text-sm text-slate-600 font-medium mt-4">— Founder, Healthcare Startup</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ServicesCTA;
