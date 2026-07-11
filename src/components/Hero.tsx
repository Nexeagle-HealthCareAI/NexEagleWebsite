"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LiquidButton } from "./ui/LiquidButton";
import { ConnectedEcosystem } from "./home/ConnectedEcosystem";
import { motion, AnimatePresence, useReducedMotion, Variants } from "framer-motion";

const Hero = () => {
  const [mounted, setMounted] = useState(false);
  const [heroIndex, setHeroIndex] = useState(0);
  const heroWords = ["Connected.", "AI-Enabled.", "Intelligent.", "Integrated."];
  const prefersReducedMotion = useReducedMotion();
  const isFinalHeroState = heroIndex === 4;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (heroIndex === 4) {
      // Hold "Powered by NexEagle." for 8 seconds, then reset to 0 to loop continuously
      const timeout = setTimeout(() => {
        setHeroIndex(0);
      }, 8000);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      setHeroIndex((prev) => prev + 1);
    }, 2700); // 2s pause + 700ms transition

    return () => clearTimeout(timeout);
  }, [heroIndex]);

  const heroVariants: Variants = {
    initial: { 
      opacity: 0, 
      y: prefersReducedMotion ? 0 : 20 
    },
    animate: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.7, 
        ease: "easeOut" 
      } 
    },
    exit: { 
      opacity: 0, 
      y: prefersReducedMotion ? 0 : -20, 
      transition: { 
        duration: 0.7, 
        ease: "easeOut" 
      } 
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-16 sm:pt-20">
      {/* Background Grid & Glows */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] sm:bg-[size:64px_64px] pointer-events-none"></div>

      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-brand-sky/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-brand-teal/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Background Stethoscope SVG */}
      <div className="absolute right-[5%] md:right-[8%] top-[18%] md:top-[12%] w-[65%] sm:w-[50%] md:w-[38%] max-w-[520px] aspect-square pointer-events-none opacity-[0.09] dark:opacity-[0.04] -rotate-12 select-none z-0">
        <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
          <defs>
            <linearGradient id="steth-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--brand-teal, #0d9488)" stopOpacity="0.8" />
              <stop offset="50%" stopColor="var(--brand-sky, #0ea5e9)" stopOpacity="0.5" />
              <stop offset="100%" stopColor="var(--brand-iris, #6366f1)" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          <g stroke="url(#steth-grad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            {/* Eartips */}
            <circle cx="80" cy="30" r="3" fill="url(#steth-grad)" />
            <circle cx="120" cy="30" r="3" fill="url(#steth-grad)" />
            
            {/* Ear tubes (binaurals) */}
            <path d="M 80,33 C 80,55 90,65 90,75" />
            <path d="M 120,33 C 120,55 110,65 110,75" />
            
            {/* Spring/bridge */}
            <path d="M 85,60 L 115,60" strokeWidth="1" />
            
            {/* Bottom curve of binaural frame */}
            <path d="M 90,75 C 90,85 110,85 110,75" />
            
            {/* Hinge/stem connector */}
            <path d="M 100,80 L 100,95" strokeWidth="2" />
            
            {/* Flexible tubing (smooth looping S-curve) */}
            <path d="M 100,95 C 100,125 65,125 65,150 C 65,175 115,175 115,145 C 115,120 145,120 145,140" strokeWidth="2.5" />
            
            {/* Chestpiece base & connector */}
            <path d="M 145,140 L 145,146" strokeWidth="2" />
            <rect x="137" y="146" width="16" height="3" rx="0.5" fill="url(#steth-grad)" />
            
            {/* Chestpiece bell */}
            <path d="M 141,149 L 149,149 L 152,156 L 138,156 Z" fill="url(#steth-grad)" fillOpacity="0.2" />
            
            {/* Diaphragm circle */}
            <circle cx="145" cy="160" r="8" strokeWidth="1.5" />
            <circle cx="145" cy="160" r="3" fill="url(#steth-grad)" />
          </g>
        </svg>
      </div>

      {/* Subtle background connection lines for hero transformation */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <svg className="w-full h-full opacity-20" viewBox="0 0 1000 800" preserveAspectRatio="none">
          <defs>
            <linearGradient id="heroLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.01" />
              <stop offset="50%" stopColor="#0d9488" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.01" />
            </linearGradient>
          </defs>
          <AnimatePresence>
            {isFinalHeroState && (
              <>
                <motion.path 
                  d="M -50 300 Q 200 250 450 350 T 950 300" 
                  fill="none" 
                  stroke="url(#heroLineGrad)" 
                  strokeWidth="1.5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2.5, ease: "easeOut" }}
                />
                <motion.path 
                  d="M -50 400 Q 150 480 450 400 T 950 420" 
                  fill="none" 
                  stroke="url(#heroLineGrad)" 
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.6 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 3, ease: "easeOut", delay: 0.4 }}
                />
              </>
            )}
          </AnimatePresence>
        </svg>
      </div>

      <div className="container mx-auto relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 grid lg:grid-cols-[43%_57%] gap-8 lg:gap-12 items-center">

        {/* Left Column - Content */}
        <div className={`space-y-8 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.2] !mt-2">
            <span className="block font-bold text-slate-900 dark:text-white">
              The Future of Healthcare.
            </span>
            <div className="h-[40px] sm:h-[60px] md:h-[72px] lg:h-[84px] flex items-center relative mt-2">
              <AnimatePresence mode="wait">
                {heroIndex < 4 ? (
                  <motion.span
                    key={heroIndex}
                    variants={heroVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="absolute left-0 text-transparent bg-clip-text bg-gradient-to-r from-brand-teal via-brand-sky to-brand-iris font-black whitespace-nowrap"
                  >
                    {heroWords[heroIndex]}
                  </motion.span>
                ) : (
                  <motion.div
                    key="final-powered"
                    initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -15 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="absolute left-0 flex items-center relative whitespace-nowrap"
                  >
                    <div className="relative inline-block">
                      <AnimatePresence>
                        {isFinalHeroState && (
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1.15 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                            className="absolute inset-0 bg-brand-teal/15 rounded-full blur-[20px] -z-10"
                          />
                        )}
                      </AnimatePresence>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-teal via-brand-sky to-brand-iris font-black">
                        Powered by NEXEAGLE.
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </h1>

          {/* CTA Buttons (Permanently visible) */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link href="/contact" className="w-full sm:w-auto">
              <LiquidButton size="lg" className="w-full">
                Book a Demo <ArrowRight className="w-5 h-5" />
              </LiquidButton>
            </Link>
            
            <a 
              href="#ecosystem"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm sm:text-base border border-slate-200/80 shadow-sm transition-all duration-300 hover:-translate-y-0.5"
            >
              Explore Solutions
            </a>
          </div>
        </div>

        {/* Right Column - Connected Ecosystem Animation */}
        <div className={`relative w-full transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} lg:ml-auto lg:max-w-2xl`}>
          <ConnectedEcosystem />
        </div>
      </div>
    </section>
  );
};

export default Hero;
