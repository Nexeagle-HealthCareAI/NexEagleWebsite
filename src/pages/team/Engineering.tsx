import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TeamSection from "@/components/about/TeamSection";
import SEO from "@/components/SEO";

const Engineering = () => {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Product & Engineering Team - NexEagle"
        description="Meet the software developers, product managers, and systems architects building NexEagle's healthcare solutions."
      />
      <Navbar />
      <main className="pt-32 pb-16 bg-gradient-to-b from-teal-50/30 via-white to-white">
        <div className="max-w-4xl mx-auto text-center space-y-4 px-6 mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-teal/10 border border-brand-teal/20 text-brand-teal text-xs font-bold uppercase tracking-wider">
            Technology
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Product & Engineering
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto font-light leading-relaxed">
            Building secure, reliable, and lightning-fast clinical systems (1HMS, 1Rad, 1Lab, 1Pharma).
          </p>
        </div>

        <div className="border-t border-slate-100/80">
          <TeamSection defaultFilter="Product & Engineering" showHeader={false} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Engineering;
