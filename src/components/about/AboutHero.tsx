const AboutHero = () => {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-teal-50 via-white to-white pt-32 pb-20">
      
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:64px_64px]"></div>
      
      {/* Gradient Orbs */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-teal-100/40 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl"></div>
      
      <div className="container relative z-10 px-6 md:px-8 lg:px-12">
        <div className="max-w-5xl mx-auto text-center space-y-10">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-slate-200 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
            <span className="text-sm font-medium text-slate-700">About NexEagle</span>
          </div>

          {/* Headline */}
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 leading-[1.1]">
              We build software<br />
              <span className="text-teal-600">based on what you need.</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-light">
              A software development company specializing in healthcare. We build custom software for any industry and healthcare products that work.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-slate-900 mb-2">100+</div>
              <div className="text-sm text-slate-600">Custom Projects</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-slate-900 mb-2">50+</div>
              <div className="text-sm text-slate-600">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-slate-900 mb-2">4</div>
              <div className="text-sm text-slate-600">Healthcare Products</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-slate-900 mb-2">48hrs</div>
              <div className="text-sm text-slate-600">Setup Time</div>
            </div>
          </div>

        </div>
      </div>
      
    </section>
  );
};

export default AboutHero;
