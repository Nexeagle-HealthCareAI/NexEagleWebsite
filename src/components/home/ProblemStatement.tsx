const ProblemStatement = () => {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="container px-6 md:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center space-y-6 animate-fade-in">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">The Problem</p>
            
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
              Most businesses struggle with software.<br />
              Off-the-shelf doesn't fit. Custom is too expensive.
            </h2>
            
            <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
              Generic software forces you to change how you work. Building custom software from scratch costs too much and takes too long. 
              You need software that fits your business, not the other way around.
            </p>
          </div>

          {/* Problem Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            {/* Card 1 - Generic Software */}
            <div className="group p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-red-200 hover:shadow-xl transition-all duration-300 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                <span className="text-2xl animate-bounce-slow">⚠️</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-red-600 transition-colors">Generic Software</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Off-the-shelf software doesn't fit your unique business needs. You're forced to change how you work.
              </p>
            </div>

            {/* Card 2 - Too Expensive */}
            <div className="group p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-orange-200 hover:shadow-xl transition-all duration-300 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                <span className="text-2xl animate-bounce-slow" style={{ animationDelay: '0.1s' }}>💰</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-orange-600 transition-colors">Too Expensive</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Custom software development costs a fortune. Most businesses can't afford to build what they really need.
              </p>
            </div>

            {/* Card 3 - Takes Forever */}
            <div className="group p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-yellow-200 hover:shadow-xl transition-all duration-300 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                <span className="text-2xl animate-bounce-slow" style={{ animationDelay: '0.2s' }}>⏱️</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-yellow-600 transition-colors">Takes Forever</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Building software from scratch takes 6-12 months. By then, your business needs have already changed.
              </p>
            </div>
          </div>

        </div>
      </div>
      
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounceSlow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }

        .animate-slide-up {
          opacity: 0;
          animation: slideUp 0.6s ease-out forwards;
        }

        .animate-bounce-slow {
          animation: bounceSlow 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default ProblemStatement;
