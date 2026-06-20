import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";

const AboutCTA = () => {
  return (
    <section className="py-24 md:py-32 bg-slate-50">
      <div className="container px-6 md:px-8 lg:px-12">
        <div className="max-w-5xl mx-auto">
          
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Work With Us */}
            <div className="p-10 rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px]"></div>
              
              <div className="relative z-10 space-y-6">
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
                  <Briefcase className="w-7 h-7" />
                </div>
                
                <div>
                  <h3 className="text-3xl font-bold mb-3">Join Our Team</h3>
                  <p className="text-blue-100 leading-relaxed mb-6">
                    We're looking for talented engineers, designers, and product thinkers who want to build products that matter.
                  </p>
                </div>

                <Button
                  asChild
                  size="lg"
                  className="px-8 py-6 text-base font-semibold bg-white text-slate-900 hover:bg-slate-100"
                >
                  <Link to="/careers">
                    View Open Positions
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </div>

              <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            </div>

            {/* Partner With Us */}
            <div className="p-10 rounded-3xl bg-white border-2 border-slate-200 relative overflow-hidden hover:shadow-xl transition-shadow">
              <div className="space-y-6">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center">
                  <Mail className="w-7 h-7 text-slate-700" />
                </div>
                
                <div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-3">Work With Us</h3>
                  <p className="text-slate-600 leading-relaxed mb-6">
                    Have a project in mind? Need a product engineering partner? Let's talk about how we can help.
                  </p>
                </div>

                <Button
                  asChild
                  size="lg"
                  className="px-8 py-6 text-base font-semibold bg-slate-900 hover:bg-slate-800 text-white"
                >
                  <Link to="/contact">
                    Get in Touch
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>

          </div>

          {/* Contact Info */}
          <div className="mt-12 text-center">
            <p className="text-slate-600 mb-4">Or reach out directly</p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <a href="mailto:info@nexeagle.com" className="text-blue-600 hover:text-blue-700 font-medium">
                info@nexeagle.com
              </a>
              <span className="text-slate-300">•</span>
              <a href="tel:+918074906808" className="text-blue-600 hover:text-blue-700 font-medium">
                +91 8074906808
              </a>
              <span className="text-slate-300">•</span>
              <a href="https://linkedin.com/company/nexeagle" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-medium">
                LinkedIn
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutCTA;
