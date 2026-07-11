import { Button } from "@/components/ui/button";
import { ArrowRight, Briefcase } from "lucide-react";
import Link from "next/link";

const AboutCTA = () => {
  return (
    <section className="py-24 md:py-32 bg-slate-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-brand-teal/5 pointer-events-none rounded-full blur-[100px] z-0"></div>

      <div className="container relative z-10 px-6 md:px-8 lg:px-12 max-w-5xl mx-auto">
        {/* Full-width horizontal Join Our Team card */}
        <div className="relative p-10 md:p-14 rounded-3xl bg-gradient-to-br from-teal-600 to-teal-700 text-white overflow-hidden shadow-xl shadow-teal-900/10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]"></div>
          
          <div className="relative z-10 space-y-4 max-w-2xl text-center md:text-left">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mx-auto md:mx-0">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            
            <h3 className="text-3xl font-extrabold tracking-tight">Join the NexEaglians</h3>
            <p className="text-teal-100 leading-relaxed font-light text-base sm:text-lg">
              We're looking for ambitious engineers, product designers, and clinicians who want to build the future of automated, intelligent healthcare.
            </p>
          </div>

          <div className="relative z-10 shrink-0">
            <Button
              asChild
              size="lg"
              className="px-8 py-6 text-base font-semibold bg-white text-slate-900 hover:bg-slate-50 rounded-full shadow-lg shadow-black/5 hover:translate-y-[-2px] transition-all duration-300"
            >
              <Link href="/careers">
                View Open Positions
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>

          <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
};

export default AboutCTA;
