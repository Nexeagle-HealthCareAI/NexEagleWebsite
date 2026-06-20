import { Button } from "@/components/ui/button";
import { ArrowRight, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const FinalCTA = () => {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="container px-6 md:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto">
          
          <div className="p-12 md:p-16 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 text-white text-center relative overflow-hidden">
            
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px]"></div>
            
            {/* Content */}
            <div className="relative z-10 space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                  Ready to build your<br />
                  custom software?
                </h2>
                
                <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                  Tell us what you need. We'll build software that fits your business perfectly. Healthcare or any industry.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                <Button
                  asChild
                  size="lg"
                  className="px-8 py-6 text-base font-semibold bg-white text-slate-900 hover:bg-slate-100"
                >
                  <Link to="/contact">
                    Start a Project
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="px-8 py-6 text-base font-semibold border-white/20 text-white hover:bg-white/10"
                >
                  <a href="mailto:info@nexeagle.com">
                    <Mail className="w-5 h-5 mr-2" />
                    Email Us
                  </a>
                </Button>
              </div>

              <div className="pt-8 text-sm text-slate-400">
                <p>Trusted by healthcare providers and businesses across industries</p>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl"></div>
            
          </div>

        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
