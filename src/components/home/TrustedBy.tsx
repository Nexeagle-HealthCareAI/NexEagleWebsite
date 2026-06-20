import { Heart, Activity, Microscope } from "lucide-react";

interface Client {
  name: string;
  url: string;
  doctors: string;
  logoUrl?: string;
  icon?: React.ReactNode;
}

const TrustedBy = () => {
  const clients: Client[] = [
    {
      name: "Sparsh Hospital, Kishanganj",
      url: "https://sparshhospitalkishanganj.com/",
      doctors: "Dr. Saurabh Kumar & Dr. Payal Anand",
      logoUrl: "/assets/sparsh_logo_resized.png"
    },
    {
      name: "Glisan Super Speciality Hospital, Purnea",
      url: "https://www.facebook.com/p/Glisan-Super-Speciality-Hospital-Purnea-61576274793889/",
      doctors: "Dr. Md. Taquedis Noori",
      icon: <Heart className="w-5 h-5 text-brand-teal" />
    },
    {
      name: "AG Smart Scan Diagnostic Centre",
      url: "https://share.google/2ADNkQXtrRt4w6ewv",
      doctors: "Advanced Diagnostics & Imaging",
      icon: <Microscope className="w-5 h-5 text-brand-sky" />
    }
  ];

  // Duplicate to ensure seamless scrolling on ultra-wide screens
  const duplicatedClients = [
    ...clients, ...clients, ...clients, ...clients,
    ...clients, ...clients, ...clients, ...clients
  ];

  return (
    <section className="py-16 bg-background border-t border-border/40 overflow-hidden w-full flex flex-col items-center justify-center select-none">
      <div className="w-full text-center mb-10 px-4 flex justify-center justify-items-center">
        <p className="text-center mx-auto text-xs sm:text-sm font-extrabold text-slate-900 uppercase tracking-widest block w-full">
          Trusted by Leading Healthcare Providers
        </p>
      </div>

      <div className="relative flex overflow-x-hidden group w-full">
        {/* Left and Right Fade Gradients */}
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-background via-background/80 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-background via-background/80 to-transparent z-10 pointer-events-none"></div>

        <div className="flex animate-marquee group-hover:[animation-play-state:paused] whitespace-nowrap py-4">
          {duplicatedClients.map((client, idx) => (
            <a
              key={idx}
              href={client.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-start gap-1 mx-6 px-6 py-4 rounded-2xl bg-card border border-slate-200/80 shadow-xs hover:shadow-md hover:border-brand-teal/35 hover:scale-[1.02] transition-all duration-300 min-w-[280px] md:min-w-[320px] select-none text-left shrink-0"
            >
              <div className="flex items-center gap-2.5 w-full">
                {client.logoUrl ? (
                  <div className="w-6 h-6 rounded-md bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden shrink-0">
                    <img
                      src={client.logoUrl}
                      alt={`${client.name} Logo`}
                      className="w-full h-full object-contain"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                ) : (
                  <div className="w-6 h-6 rounded-md bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                    {client.icon}
                  </div>
                )}
                <span className="font-bold text-slate-900 text-sm sm:text-base tracking-tight truncate max-w-[220px] md:max-w-[260px]">
                  {client.name}
                </span>
              </div>
              <span className="text-xs text-slate-500 font-medium pl-8.5">
                {client.doctors}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
