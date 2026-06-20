const TrustedBy = () => {
  return (
    <section className="py-12 bg-slate-50 border-y border-slate-200">
      <div className="container px-6 md:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-sm font-semibold text-slate-600 mb-8">
            Trusted by healthcare providers and businesses across industries
          </p>
          
          {/* Customer Logos Placeholder - Replace with actual logos */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-60">
            <div className="text-center">
              <div className="w-32 h-16 bg-slate-200 rounded-lg flex items-center justify-center">
                <span className="text-xs text-slate-500 font-semibold">Hospital Logo</span>
              </div>
            </div>
            <div className="text-center">
              <div className="w-32 h-16 bg-slate-200 rounded-lg flex items-center justify-center">
                <span className="text-xs text-slate-500 font-semibold">Clinic Logo</span>
              </div>
            </div>
            <div className="text-center">
              <div className="w-32 h-16 bg-slate-200 rounded-lg flex items-center justify-center">
                <span className="text-xs text-slate-500 font-semibold">Business Logo</span>
              </div>
            </div>
            <div className="text-center">
              <div className="w-32 h-16 bg-slate-200 rounded-lg flex items-center justify-center">
                <span className="text-xs text-slate-500 font-semibold">Company Logo</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-sm font-semibold text-slate-700">50+ clients served</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <span className="text-sm font-semibold text-slate-700">100+ projects delivered</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-purple-500"></div>
              <span className="text-sm font-semibold text-slate-700">Any industry welcome</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
