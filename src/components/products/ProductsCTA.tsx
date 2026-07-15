import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Mail, CheckCircle } from "lucide-react";
import Link from "next/link";

const ProductsCTA = () => {
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
                  Ready to transform your<br />
                  healthcare operations?
                </h2>
                
                <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
                  See how our products work together. Schedule a personalized demo with our team.
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
                    Schedule a Demo
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
                    Contact Sales
                  </a>
                </Button>
              </div>

              {/* Features List */}
              <div className="pt-8 grid sm:grid-cols-3 gap-6 text-left max-w-3xl mx-auto">
                <div className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-bold text-base text-white mb-1">Free Trial</p>
                    <p className="text-sm text-blue-100">30-day trial period</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-bold text-base text-white mb-1">Quick Setup</p>
                    <p className="text-sm text-blue-100">Go live in 2 weeks</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-bold text-base text-white mb-1">Full Support</p>
                    <p className="text-sm text-blue-100">24/7 assistance</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-400/30 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-400/30 rounded-full blur-3xl"></div>
            
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 text-center">
            <p className="text-sm text-slate-600 font-medium mb-6">Trusted by healthcare providers across India</p>
            <div className="flex flex-wrap justify-center gap-12 text-slate-700">
              <div className="flex flex-col items-center">
                <span className="text-4xl font-bold text-slate-900 mb-1">50+</span>
                <span className="text-sm font-medium text-slate-600">Hospitals</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-4xl font-bold text-slate-900 mb-1">100K+</span>
                <span className="text-sm font-medium text-slate-600">Patients</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-4xl font-bold text-slate-900 mb-1">99.9%</span>
                <span className="text-sm font-medium text-slate-600">Uptime</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProductsCTA;
