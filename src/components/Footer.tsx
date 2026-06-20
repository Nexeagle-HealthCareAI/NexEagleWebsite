import { Mail, Phone, Linkedin, MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const productLinks = [
    { name: "1HMS", href: "/products#1hms", desc: "Hospital Management" },
    { name: "1Rad", href: "/products#1rad", desc: "Radiology Platform" },
    { name: "1Lab", href: "/products#1lab", desc: "Lab Workflow" },
    { name: "1Pharma", href: "/products#1pharma", desc: "Pharmacy System" },
  ];

  const serviceLinks = [
    { name: "Product Strategy", href: "/services#strategy" },
    { name: "Product Design", href: "/services#design" },
    { name: "Full-Stack Development", href: "/services#development" },
    { name: "AI Integration", href: "/services#ai" },
    { name: "System Architecture", href: "/services#architecture" },
    { name: "Digital Transformation", href: "/services#transformation" },
  ];

  const companyLinks = [
    { name: "About Us", href: "/team" },
    { name: "Contact", href: "/contact" },
    { name: "Careers", href: "/careers" },
    { name: "Blog", href: "/blog" },
  ];

  return (
    <footer className="relative bg-background text-foreground overflow-hidden border-t border-border pt-10">
      
      {/* Pulse Line Container */}
      <div className="absolute top-0 inset-x-0 flex justify-center">
        <div className="h-px w-full max-w-5xl bg-gradient-to-r from-transparent via-brand-teal to-transparent opacity-50"></div>
        <div className="absolute top-0 h-[2px] w-1/4 bg-brand-sky blur-sm animate-[pulse_3s_ease-in-out_infinite]"></div>
      </div>
      
      <div className="container relative px-6 md:px-8 lg:px-12">
        
        {/* Main Footer Content */}
        <div className="py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
            
            {/* Brand */}
            <div className="lg:col-span-4">
              <Link to="/" className="inline-flex items-center gap-3 mb-6 group">
                <span className="text-3xl font-bold text-foreground tracking-tight"><span className="text-brand-teal">N</span>exEagle</span>
              </Link>
              <p className="text-foreground font-medium mb-4 leading-relaxed text-lg">
                India's First AI-Enabled<br/>Hospital Management Software
              </p>
              
              {/* Social */}
              <div className="flex gap-4 mt-8">
                <a
                  href="https://linkedin.com/company/nexeagle"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group p-3 rounded-full bg-card border border-border hover:border-brand-teal transition-all duration-300"
                >
                  <Linkedin className="w-5 h-5 text-muted-foreground group-hover:text-brand-teal transition-colors relative z-10" />
                  <div className="absolute inset-0 bg-brand-teal/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </a>
              </div>
            </div>

            {/* Products */}
            <div className="lg:col-span-3">
              <h3 className="text-sm font-bold mb-6 text-foreground">Solutions</h3>
              <ul className="space-y-4">
                {productLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-brand-teal transition-colors text-sm"
                    >
                      {link.desc}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div className="lg:col-span-3">
              <h3 className="text-sm font-bold mb-6 text-foreground">Resources</h3>
              <ul className="space-y-4">
                {serviceLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-brand-teal transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div className="lg:col-span-2">
              <h3 className="text-sm font-bold mb-6 text-foreground">Company</h3>
              <ul className="space-y-4">
                {companyLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-brand-teal transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Contact Info */}
          <div className="border-t border-border pt-12 mb-12">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-center gap-3 text-muted-foreground text-sm">
                <Phone className="w-4 h-4 text-brand-teal" />
                +91 8074906808
              </div>
              <div className="flex items-center gap-3 text-muted-foreground text-sm">
                <Mail className="w-4 h-4 text-brand-teal" />
                info@nexeagle.com
              </div>
              <div className="flex items-center gap-3 text-muted-foreground text-sm">
                <MapPin className="w-4 h-4 text-brand-teal" />
                Kolkata, India
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} NexEagle. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              <Link to="/security" className="text-muted-foreground hover:text-foreground transition-colors">
                Security
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
