import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const ProductsHero = () => {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-slate-50 pt-32 pb-20">
      
      {/* Background Grid - More visible */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000015_1px,transparent_1px),linear-gradient(to_bottom,#00000015_1px,transparent_1px)] bg-[size:64px_64px]"></div>
      
      <div className="container relative z-10 px-6 md:px-8 lg:px-12">
        <div className="max-w-5xl mx-auto text-center space-y-10">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-green-100 border-2 border-green-600 shadow-lg">
            <span className="w-2.5 h-2.5 rounded-full bg-green-600 animate-pulse"></span>
            <span className="text-base font-black text-green-900">Healthcare Operating System</span>
          </div>

          {/* Headline */}
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1]">
              <span className="text-slate-900">One ecosystem.</span><br />
              <span className="text-slate-900">Complete healthcare operations.</span>
            </h1>

            <p className="text-2xl md:text-3xl text-slate-900 max-w-3xl mx-auto leading-relaxed font-bold">
              Connected products that work together seamlessly. Built for hospitals, clinics, and diagnostic centers.
            </p>
          </div>

          {/* Product Pills */}
          <div className="flex flex-wrap justify-center gap-4 pt-6">
            <a href="#1hms" className="px-8 py-4 rounded-full bg-blue-600 border-2 border-blue-800 text-white font-black text-lg hover:bg-blue-700 transition-colors shadow-xl hover:shadow-2xl">
              🏥 1HMS
            </a>
            <a href="#1rad" className="px-8 py-4 rounded-full bg-purple-600 border-2 border-purple-800 text-white font-black text-lg hover:bg-purple-700 transition-colors shadow-xl hover:shadow-2xl">
              📸 1Rad
            </a>
            <a href="#1lab" className="px-8 py-4 rounded-full bg-green-600 border-2 border-green-800 text-white font-black text-lg hover:bg-green-700 transition-colors shadow-xl hover:shadow-2xl">
              🔬 1Lab
            </a>
            <a href="#1pharma" className="px-8 py-4 rounded-full bg-orange-600 border-2 border-orange-800 text-white font-black text-lg hover:bg-orange-700 transition-colors shadow-xl hover:shadow-2xl">
              💊 1Pharma
            </a>
          </div>

          {/* CTA */}
          <div className="pt-8">
            <Button
              asChild
              size="lg"
              className="px-10 py-7 h-auto text-lg font-black bg-slate-900 hover:bg-slate-800 text-white shadow-2xl"
            >
              <Link href="/contact" className="flex items-center gap-3">
                <span className="text-white">Request a Demo</span>
                <ArrowRight className="w-6 h-6 text-white" />
              </Link>
            </Button>
          </div>

        </div>
      </div>
      
    </section>
  );
};

export default ProductsHero;
