import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ProductDesign = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-tech-cyan/5 to-white">
      <Navbar />
      <main className="section-shell py-16 lg:py-20">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <p className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-teal-100 text-tech-cyan text-sm font-semibold">
            Product Design
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-brand-navy">Product & Design</h1>
          <p className="text-base md:text-lg text-brand-navy/70">Designing calm, intuitive experiences for OPD teams and patients.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDesign;
