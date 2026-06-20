const TeamSection = () => {
  const leadership = [
    {
      name: "Md Tasquil Noori",
      role: "Tech Lead",
      credential: "BTech, NIT Warangal",
      focus: "Product architecture, system design",
      image: "/assets/Tasquil_Noori.webp"
    },
    {
      name: "Dr Md Taquedis Noori",
      role: "Medical Advisor",
      credential: "MS, MCh Urology (IPGMER and SSKM Hospital)",
      focus: "Clinical workflows, healthcare compliance",
      image: "/assets/Taquedis Noori.webp"
    },
    {
      name: "Dr Md Tabish Noori",
      role: "Research Advisor",
      credential: "Research Fellow at Imperial College London",
      focus: "Data science, research methodology",
      image: "/assets/Tabish Noori.webp"
    }
  ];

  const team = [
    {
      name: "Md Aquib",
      role: "Product Manager",
      credential: "IIT Bombay Alumni",
      focus: "OPD user experience, adoption"
    },
    {
      name: "Anuj Sharma",
      role: "AI/ML Engineer",
      credential: "IIT Bombay Alumni",
      focus: "Automation, AI assistant"
    }
  ];

  const getInitials = (name: string) =>
    name
      .split(" ")
      .filter(Boolean)
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 3);

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="container px-6 md:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="text-center space-y-6 mb-20">
            <p className="text-sm font-semibold uppercase tracking-wider text-teal-600">Our Team</p>
            
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
              Meet the team.
            </h2>
            
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Engineers, doctors, and advisors working together to build better software.
            </p>
          </div>

          {/* Leadership */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-slate-900 mb-8">Leadership</h3>
            
            <div className="grid md:grid-cols-3 gap-8">
              {leadership.map((person, index) => (
                <div 
                  key={index}
                  className="group p-8 rounded-2xl bg-slate-50 border border-slate-200 hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 mb-6 mx-auto">
                    {person.image ? (
                      <img
                        src={person.image}
                        alt={person.name}
                        className="w-full h-full object-cover"
                        style={{ objectPosition: person.name === "Md Tasquil Noori" ? "50% 5%" : "50% 50%" }}
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-slate-600">
                        {getInitials(person.name)}
                      </div>
                    )}
                  </div>
                  
                  <div className="text-center">
                    <h4 className="text-xl font-bold text-slate-900 mb-1">{person.name}</h4>
                    <p className="text-sm font-semibold text-teal-600 mb-2">{person.role}</p>
                    <p className="text-sm text-slate-600 mb-3">{person.credential}</p>
                    <p className="text-xs text-slate-500">{person.focus}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Team */}
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-8">Product & Engineering</h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((person, index) => (
                <div 
                  key={index}
                  className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-teal-100 to-teal-200 flex items-center justify-center mb-4 mx-auto">
                    <span className="text-xl font-bold text-slate-700">
                      {getInitials(person.name)}
                    </span>
                  </div>
                  
                  <div className="text-center">
                    <h4 className="text-lg font-bold text-slate-900 mb-1">{person.name}</h4>
                    <p className="text-sm font-semibold text-teal-600 mb-2">{person.role}</p>
                    <p className="text-xs text-slate-600 mb-2">{person.credential}</p>
                    <p className="text-xs text-slate-500">{person.focus}</p>
                  </div>
                </div>
              ))}

              {/* Join Us Card */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-teal-50 to-teal-100 border-2 border-dashed border-teal-300 hover:border-teal-400 transition-all duration-300 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-xl bg-white flex items-center justify-center mb-4">
                  <span className="text-3xl">👋</span>
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">Join Our Team</h4>
                <p className="text-sm text-slate-600 mb-4">We're always looking for talented people</p>
                <a href="/careers" className="text-sm font-semibold text-teal-600 hover:text-teal-700">
                  View Openings →
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TeamSection;
