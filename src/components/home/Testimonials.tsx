import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Dr. Rajesh Kumar",
      role: "Medical Director",
      hospital: "City Care Hospital, Mumbai",
      image: "/assets/testimonial-1.jpg", // Placeholder - replace with actual image
      quote: "NexEagle transformed how we manage our hospital. Patient wait times dropped by 40%, and our staff loves how easy it is to use.",
      rating: 5,
      metric: "40% faster patient processing"
    },
    {
      name: "Priya Sharma",
      role: "Lab Manager",
      hospital: "Diagnostic Center, Delhi",
      image: "/assets/testimonial-2.jpg", // Placeholder
      quote: "1Lab made our diagnostic workflow so much smoother. We process 200+ samples daily without any confusion. The quality control features are excellent.",
      rating: 5,
      metric: "200+ samples processed daily"
    },
    {
      name: "Dr. Amit Patel",
      role: "Radiologist",
      hospital: "Advanced Imaging Clinic, Bangalore",
      image: "/assets/testimonial-3.jpg", // Placeholder
      quote: "The AI-assisted diagnosis in 1Rad helps me catch things I might have missed. It's like having a second pair of expert eyes on every scan.",
      rating: 5,
      metric: "30% improvement in diagnosis accuracy"
    }
  ];

  return (
    <section className="pt-8 pb-24 md:pt-12 md:pb-32 bg-gradient-to-b from-white to-slate-50">
      <div className="container px-6 md:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="text-center space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-semibold">
              <Star className="w-4 h-4 fill-current" />
              <span>Rated 4.8/5 by 50+ customers</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
              What our customers say
            </h2>
            
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Real results from real healthcare providers using NexEagle
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="relative p-8 rounded-2xl bg-white border-2 border-slate-200 hover:border-blue-500 hover:shadow-xl transition-all duration-300 group"
              >
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Quote className="w-12 h-12 text-blue-600" />
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-slate-700 leading-relaxed mb-6 relative z-10">
                  "{testimonial.quote}"
                </p>

                {/* Metric Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 border border-green-200 mb-6">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-sm font-semibold text-green-700">{testimonial.metric}</span>
                </div>

                {/* Author */}
                <div className="flex items-center gap-4 pt-6 border-t border-slate-200">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{testimonial.name}</p>
                    <p className="text-sm text-slate-600">{testimonial.role}</p>
                    <p className="text-xs text-slate-500">{testimonial.hospital}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 pt-12 border-t border-slate-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-slate-900 mb-2">50+</div>
                <div className="text-sm text-slate-600">Healthcare Providers</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-slate-900 mb-2">100K+</div>
                <div className="text-sm text-slate-600">Patients Served Daily</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-slate-900 mb-2">99.9%</div>
                <div className="text-sm text-slate-600">Uptime Guarantee</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-slate-900 mb-2">24/7</div>
                <div className="text-sm text-slate-600">Support Available</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Testimonials;
