const VisionSection = () => {
  return (
    <section className="py-24 md:py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:64px_64px]"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      
      <div className="container relative z-10 px-6 md:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center space-y-8">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-400">Our Vision</p>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Building the future of<br />
              connected healthcare.
            </h2>
            
            <p className="text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
              We believe healthcare should run on intelligent, connected systems. 
              Not fragmented tools. Not legacy software. Not disconnected data.
            </p>

            <div className="pt-8 space-y-6 text-left max-w-2xl mx-auto">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <span className="text-blue-400">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">One Unified Platform</h3>
                  <p className="text-slate-400">All healthcare operations in one connected ecosystem. No more juggling multiple systems.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <span className="text-purple-400">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">AI-Powered Intelligence</h3>
                  <p className="text-slate-400">Smart automation and insights that help healthcare providers make better decisions faster.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                  <span className="text-green-400">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Built for Scale</h3>
                  <p className="text-slate-400">From single clinics to hospital chains. Systems that grow with your organization.</p>
                </div>
              </div>
            </div>

          </div>

          {/* Quote */}
          <div className="mt-20 p-10 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <blockquote className="text-center">
              <p className="text-2xl font-light text-slate-200 mb-6 leading-relaxed">
                "The future of healthcare is not about more software.<br />
                It's about better systems."
              </p>
              <footer className="text-slate-400">
                <span className="font-semibold">— NexEagle Team</span>
              </footer>
            </blockquote>
          </div>

        </div>
      </div>
    </section>
  );
};

export default VisionSection;
