import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const ServicesHero = () => {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white pt-32 pb-20">
      
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:64px_64px]"></div>
      
      {/* Gradient Orbs */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-purple-100/40 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl"></div>
      
      <div className="container relative z-10 px-6 md:px-8 lg:px-12">
        <div className="max-w-5xl mx-auto text-center space-y-10">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-slate-200 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
            <span className="text-sm font-medium text-slate-700">Product Engineering Services</span>
          </div>

          {/* Headline */}
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 leading-[1.1]">
              Your engineering partner<br />
              <span className="text-slate-600">for ambitious products.</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-light">
              We design, build, and scale digital products for startups and businesses. From strategy to launch and beyond.
            </p>
          </div>

          {/* Service Pills */}
          <div className="flex flex-wrap justify-center gap-3 pt-4">
            <a href="#strategy" className="px-6 py-3 rounded-full bg-purple-50 border border-purple-200 text-purple-700 font-medium hover:bg-purple-100 transition-colors">
              🎯 Strategy
            </a>
            <a href="#design" className="px-6 py-3 rounded-full bg-blue-50 border border-blue-200 text-blue-700 font-medium hover:bg-blue-100 transition-colors">
              🎨 Design
            </a>
            <a href="#development" className="px-6 py-3 rounded-full bg-green-50 border border-green-200 text-green-700 font-medium hover:bg-green-100 transition-colors">
              💻 Development
            </a>
            <a href="#ai" className="px-6 py-3 rounded-full bg-orange-50 border border-orange-200 text-orange-700 font-medium hover:bg-orange-100 transition-colors">
              🤖 AI Integration
            </a>
          </div>

          {/* CTA */}
          <div className="pt-6">
            <Button
              asChild
              size="lg"
              className="px-8 py-6 text-base font-semibold bg-slate-900 hover:bg-slate-800 text-white shadow-lg"
            >
              <Link href="/contact">
                Start Your Project
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>

        </div>
      </div>
      
    </section>
  );
};

export default ServicesHero;
