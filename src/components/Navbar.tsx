"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const navigate = (href: string) => router.push(href);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { 
      name: "Solutions", 
      href: "#",
      dropdown: [
        { name: "1HMS", href: "/solutions/1hms" },
        { name: "1Rad", href: "/solutions/1rad" },
        { name: "1Pharma", href: "/solutions/1pharma" },
        { name: "1Lab", href: "/solutions/1lab" }
      ]
    },
    { name: "NEXEAGLE AI", href: "/ai" },
    { name: "Pricing", href: "/pricing" },
    { name: "Team", href: "/team" },
    { name: "Contact", href: "/contact" }
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const handleNavigation = (href: string) => {
    navigate(href);
    setIsOpen(false);
  };

  return (
    <div className={cn(
      "fixed top-0 left-0 right-0 z-50 flex justify-center w-full transition-all duration-300 pointer-events-none",
      isScrolled ? "pt-2 sm:pt-3 px-3 sm:px-6" : "pt-4 sm:pt-6 px-4 sm:px-8"
    )}>
      <nav className={cn(
        "w-full max-w-6xl rounded-full border transition-all duration-300 pointer-events-auto flex items-center justify-between px-6 sm:px-8 shadow-md",
        isScrolled 
          ? "h-14 sm:h-16 bg-background/80 backdrop-blur-xl border-border shadow-[0_8px_30px_rgba(0,0,0,0.08)]" 
          : "h-16 sm:h-20 bg-background/30 backdrop-blur-md border-border/40"
      )}>
          
          {/* Logo */}
          <Link href="/os" className="flex items-center group relative">
            <Logo textSize="text-xl sm:text-2xl md:text-3xl lg:text-4xl" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                {link.dropdown ? (
                  <button
                    className={cn(
                      "flex items-center gap-1 px-4 py-2 text-sm font-medium transition-all duration-200 rounded-full",
                      isActive("/solutions")
                        ? "text-foreground bg-secondary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/5"
                    )}
                  >
                    {link.name}
                    <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    className={cn(
                      "relative px-4 py-2 text-sm font-medium transition-all duration-200 rounded-full",
                      isActive(link.href)
                        ? "text-foreground bg-secondary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/5"
                    )}
                  >
                    {link.name}
                  </Link>
                )}
                
                {/* Desktop Dropdown */}
                {link.dropdown && (
                  <div className="absolute top-full left-0 pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50">
                    <div className="w-48 bg-background border border-border rounded-xl shadow-lg p-2 flex flex-col gap-1">
                      {link.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/10 rounded-lg transition-colors"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Link href="/contact" className="text-sm font-medium text-foreground hover:text-brand-teal transition-colors">
              Talk to Sales
            </Link>
            
            <Link href="/contact">
              <Button
                className="bg-brand-teal hover:bg-brand-teal/90 text-white rounded-full px-6 shadow-[0_0_15px_rgba(20,184,166,0.3)] hover:shadow-[0_0_25px_rgba(20,184,166,0.5)] transition-all"
              >
                Book Demo
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-2 hover:bg-secondary/10 text-foreground"
                >
                  {isOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-full sm:w-96 bg-background border-l border-border"
              >
                {/* Mobile Header */}
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-border">
                  <div className="flex items-center gap-4">
                    <Logo textSize="text-2xl" />
                  </div>
                </div>

                {/* Mobile Navigation */}
                <div className="flex flex-col space-y-2 mb-8">
                  {navLinks.map((link) => (
                    <div key={link.name}>
                      {link.dropdown ? (
                        <div className="flex flex-col">
                          <div className="flex items-center justify-between px-4 py-4 text-base font-medium text-muted-foreground">
                            <span>{link.name}</span>
                            <ChevronDown className="w-4 h-4" />
                          </div>
                          <div className="flex flex-col pl-6 border-l-2 border-border ml-6 space-y-2 mt-2">
                            {link.dropdown.map((subItem) => (
                              <button
                                key={subItem.name}
                                onClick={() => handleNavigation(subItem.href)}
                                className={cn(
                                  "flex items-center justify-between px-4 py-3 text-sm font-medium transition-all rounded-xl group",
                                  isActive(subItem.href)
                                    ? "text-brand-teal bg-secondary/10"
                                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/5"
                                )}
                              >
                                <span>{subItem.name}</span>
                                <ArrowRight className={cn(
                                  "w-3 h-3 transition-all",
                                  isActive(subItem.href) 
                                    ? "opacity-100 translate-x-0 text-brand-teal" 
                                    : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                                )} />
                              </button>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleNavigation(link.href)}
                          className={cn(
                            "flex items-center justify-between px-4 py-4 text-base font-medium transition-all rounded-xl group",
                            isActive(link.href)
                              ? "text-brand-teal bg-secondary/10"
                              : "text-muted-foreground hover:text-foreground hover:bg-secondary/5"
                          )}
                        >
                          <span>{link.name}</span>
                          <ArrowRight className={cn(
                            "w-4 h-4 transition-all",
                            isActive(link.href) 
                              ? "opacity-100 translate-x-0 text-brand-teal" 
                              : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                          )} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {/* Mobile CTA Buttons */}
                <div className="space-y-3 pt-6 border-t border-border">
                  <Button
                    onClick={() => handleNavigation("/contact")}
                    variant="outline"
                    className="w-full h-12 font-semibold border-2 border-border text-foreground hover:bg-secondary/10"
                  >
                    Talk to Sales
                  </Button>
                  
                  <Button
                    onClick={() => handleNavigation("/contact")}
                    className="w-full h-12 bg-brand-teal hover:bg-brand-teal/90 text-white font-semibold"
                  >
                    Book Demo
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
      </nav>
    </div>
  );
};

export default Navbar;
