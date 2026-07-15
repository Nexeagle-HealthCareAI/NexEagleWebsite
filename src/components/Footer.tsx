import { Mail, Phone, Linkedin, MapPin, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { Logo } from "./Logo";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const solutionLinks = [
    { name: "1HMS (Hospital)", href: "/solutions/1hms" },
    { name: "1Rad (Radiology & PACS)", href: "/solutions/1rad" },
    { name: "1Lab (Laboratory)", href: "/solutions/1lab" },
    { name: "1Pharma (Pharmacy)", href: "/solutions/1pharma" },
    { name: "NexEagle AI (Virtual Assistant)", href: "/ai" },
  ];

  const platformLinks = [
    { name: "Why NexEagle", href: "/why" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "Platform Overview", href: "/contact" },
  ];

  const resourceLinks = [
    { name: "FAQs & Support", href: "/faqs" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "System Security", href: "/security" },
  ];

  const companyLinks = [
    { name: "Team", href: "/team" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <footer className="relative bg-slate-950 text-slate-200 overflow-hidden border-t border-slate-900">
      {/* Background Decorative Glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-brand-teal/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-brand-sky/10 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Pulse Line at top border */}
      <div className="absolute top-0 inset-x-0 flex justify-center">
        <div className="h-px w-full max-w-7xl bg-gradient-to-r from-transparent via-brand-teal/40 to-transparent"></div>
        <div className="absolute top-0 h-[2px] w-1/3 bg-brand-sky blur-sm animate-[pulse_4s_ease-in-out_infinite]"></div>
      </div>

      <div className="container relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 mx-auto">


        {/* Middle Section: Links Grid */}
        <div className="py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 md:gap-12">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/business" className="inline-flex items-center group">
              <Logo textSize="text-2xl sm:text-3xl" textColor="text-white" />
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              We build intelligent, connected, and AI-enabled software systems for healthcare and modern operations. Built on robust architecture, designed for maximum efficiency.
            </p>
            <div className="flex gap-4">
              <a
                href="https://linkedin.com/company/nexeagle"
                target="_blank"
                rel="noopener noreferrer"
                className="relative group p-3 rounded-full bg-slate-900 border border-slate-800 hover:border-brand-teal transition-all duration-300"
              >
                <Linkedin className="w-4 h-4 text-slate-400 group-hover:text-brand-teal transition-colors relative z-10" />
                <div className="absolute inset-0 bg-brand-teal/10 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </a>
            </div>
          </div>

          {/* Solutions Column */}
          <div className="lg:col-span-2.5">
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">
              Solutions
            </h4>
            <ul className="space-y-4">
              {solutionLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-brand-teal transition-colors text-sm font-medium"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform Column */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">
              Platform
            </h4>
            <ul className="space-y-4">
              {platformLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-brand-teal transition-colors text-sm font-medium"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">
              Resources
            </h4>
            <ul className="space-y-4">
              {resourceLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-brand-teal transition-colors text-sm font-medium"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div className="lg:col-span-1.5">
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">
              Company
            </h4>
            <ul className="space-y-4">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-brand-teal transition-colors text-sm font-medium"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info Block */}
        <div className="border-t border-slate-900 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 text-white text-sm font-bold transition-all duration-300 hover:border-brand-teal/50 hover:bg-slate-800/80 shadow-md">
              <div className="w-8 h-8 rounded-lg bg-brand-teal/20 flex items-center justify-center text-brand-sky shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <span className="text-white font-bold">+91 8074906808</span>
            </div>
            <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 text-white text-sm font-bold transition-all duration-300 hover:border-brand-teal/50 hover:bg-slate-800/80 shadow-md">
              <div className="w-8 h-8 rounded-lg bg-brand-teal/20 flex items-center justify-center text-brand-sky shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <span className="text-white font-bold">info@nexeagle.com</span>
            </div>
            <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 text-white text-sm font-bold transition-all duration-300 hover:border-brand-teal/50 hover:bg-slate-800/80 shadow-md">
              <div className="w-8 h-8 rounded-lg bg-brand-teal/20 flex items-center justify-center text-brand-sky shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <span className="text-white font-bold">Kolkata, India</span>
            </div>
          </div>
        </div>

        {/* Bottom copyright and legal */}
        <div className="border-t border-slate-900 py-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500 font-medium">
          <p>© {currentYear} NEXEAGLE. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">
              Terms of Service
            </Link>
            <Link href="/security" className="hover:text-slate-300 transition-colors">
              Security Standards
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
