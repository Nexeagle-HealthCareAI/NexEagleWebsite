"use client";

import React, { useState } from "react";
import Link from "next/link";
// import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, Building2, Stethoscope, Pill, FlaskConical, Scan
} from "lucide-react";

/*
// Mock Data for the Sandbox
const mockDoctors = [
  { id: "doc1", name: "Dr. Rajesh Kumar", specialty: "Cardiology", count: 12, payout: "₹14,500" },
  { id: "doc2", name: "Dr. Ananya Sen", specialty: "Pediatrics", count: 8, payout: "₹8,200" },
  { id: "doc3", name: "Dr. Suresh Mehta", specialty: "Orthopedics", count: 15, payout: "₹18,000" }
];

const mockPatients = [
  { name: "Amit Sharma", date: "2026-06-12", status: "Paid", amount: "₹6,000", color: "bg-emerald-100 text-emerald-800 border-emerald-200" },
  { name: "Rohan Kapoor", date: "2026-06-11", status: "Partial Paid", amount: "₹4,500", remaining: "₹3,500", color: "bg-amber-100 text-amber-800 border-amber-200 shadow-[0_0_12px_rgba(245,158,11,0.2)] border-amber-300" },
  { name: "Sunita Rao", date: "2026-06-10", status: "Unpaid", amount: "₹5,000", color: "bg-rose-100 text-rose-800 border-rose-200" }
];
*/

const ProductEcosystem = () => {
  /*
  // Simulator State
  const [currentStep, setCurrentStep] = useState(1);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [activeSubTab, setActiveSubTab] = useState("invoices");
  const [sideMenuOpen, setSideMenuOpen] = useState(false);

  const handleReset = () => {
    setCurrentStep(1);
    setActiveTab("dashboard");
    setActiveSubTab("invoices");
    setSideMenuOpen(false);
  };

  const advanceStep = (targetStep: number) => {
    if (currentStep === targetStep - 1) {
      setCurrentStep(targetStep);
    }
  };

  const getStepGuide = () => {
    switch (currentStep) {
      case 1:
        return {
          title: "Step 1: Access Billing Module",
          desc: "Click on the 'Billing' tab in the navigation menu to open the financial sub-system.",
          badge: "Awaiting Action"
        };
      case 2:
        return {
          title: "Step 2: Navigate to Referrals",
          desc: "Select the 'Referrals' tab to view payout status and partner doctor referral lists.",
          badge: "Awaiting Action"
        };
      case 3:
        return {
          title: "Step 3: Inspect Doctor Payouts",
          desc: "Scroll down to the Doctors Referral Directory and click 'View Details' on Dr. Rajesh Kumar.",
          badge: "Awaiting Action"
        };
      case 4:
        return {
          title: "Step 4: Check Patient Payment Status",
          desc: "In the side menu, inspect Dr. Kumar's patients. Find the 'Partial Paid' status on Rohan Kapoor, then click 'Complete Verification'.",
          badge: "Verification Needed"
        };
      case 5:
        return {
          title: "Verification Complete!",
          desc: "Excellent! You checked the payment status for a partially paid patient, demonstrating real-time clinical and financial data sync.",
          badge: "Success"
        };
      default:
        return { title: "", desc: "", badge: "" };
    }
  };

  const stepGuide = getStepGuide();

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const viewVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.2 } }
  };
  */

  return (
    <section id="ecosystem" className="py-16 md:py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto relative z-10 px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="text-center space-y-4 mb-16 opacity-0 animate-on-scroll in-view">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight text-foreground">
              Choose Your <span className="text-brand-teal">Setup</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">
              Select your healthcare environment to explore tailored modules
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            
            {/* 1HMS - Large Card */}
            <Link href="/solutions/1hms" className="md:col-span-3 group relative p-8 rounded-[2rem] bg-card border border-border overflow-hidden hover:border-brand-teal/50 transition-all duration-500 cursor-pointer block">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-teal/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="w-16 h-16 rounded-2xl bg-brand-teal/10 text-brand-teal flex items-center justify-center mb-6">
                    <Building2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-foreground">1HMS (Hospital)</h3>
                  <p className="text-muted-foreground max-w-2xl">Complete ecosystem for multi-specialty hospitals including patient records, appointments, and billing.</p>
                </div>
                
                <div className="mt-8 flex justify-end">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary group-hover:bg-brand-teal group-hover:text-white transition-all duration-300 transform group-hover:translate-x-2">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </Link>

            {/* 1Pharma - Small Card */}
            <Link href="/solutions/1pharma" className="group relative p-8 rounded-[2rem] bg-card border border-border overflow-hidden hover:border-brand-iris/50 transition-all duration-500 cursor-pointer block">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-iris/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-brand-iris/10 text-brand-iris flex items-center justify-center mb-6">
                    <Pill className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-foreground">1Pharma</h3>
                  <p className="text-sm text-muted-foreground">Inventory and billing for pharmacies</p>
                </div>
                
                <div className="mt-8 flex justify-end">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary group-hover:bg-brand-iris group-hover:text-white transition-all duration-300 transform group-hover:translate-x-2">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>

            {/* 1Lab - Small Card */}
            <Link href="/solutions/1lab" className="group relative p-8 rounded-[2rem] bg-card border border-border overflow-hidden hover:border-brand-teal/50 transition-all duration-500 cursor-pointer block">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-teal/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-brand-teal/10 text-brand-teal flex items-center justify-center mb-6">
                    <FlaskConical className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-foreground">1Lab</h3>
                  <p className="text-sm text-muted-foreground">Sample tracking and reporting system</p>
                </div>
                
                <div className="mt-8 flex justify-end">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary group-hover:bg-brand-teal group-hover:text-white transition-all duration-300 transform group-hover:translate-x-2">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>

            {/* 1Rad - Small Card */}
            <Link href="/solutions/1rad" className="group relative p-8 rounded-[2rem] bg-card border border-border overflow-hidden hover:border-brand-sky/50 transition-all duration-500 cursor-pointer block">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-sky/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-brand-sky/10 text-brand-sky flex items-center justify-center mb-6">
                    <Scan className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-foreground">1Rad</h3>
                  <p className="text-sm text-muted-foreground">PACS and diagnostic imaging platform</p>
                </div>
                
                <div className="mt-8 flex justify-end">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary group-hover:bg-brand-sky group-hover:text-white transition-all duration-300 transform group-hover:translate-x-2">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>

          </div>

          {/* INTERACTIVE WORKFLOW SANDBOX
          [false && (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="mt-24 md:mt-32"
          >
            [Comment: Divider Subheader]
            <div className="text-center space-y-4 mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-teal-100 bg-teal-50 text-brand-teal text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Interactive Sandbox</span>
              </div>
              
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                Explore Billing & Referrals Workflow
              </h3>
              
              <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto font-light">
                Follow the dynamic checklist to verify referrals and payment statuses in a simulated NexEagle HMS dashboard.
              </p>
            </div>

            [Comment: Instruction Panel]
            <div className="mb-6 p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-brand-teal to-brand-sky"></div>
              
              <div className="space-y-1 sm:pl-2">
                <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full ${
                  currentStep === 5 ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-800"
                }`}>
                  {stepGuide.badge}
                </span>
                <h4 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                  {stepGuide.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 font-light">
                  {stepGuide.desc}
                </p>
              </div>

              {currentStep > 1 && (
                <button 
                  onClick={handleReset}
                  className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors py-1.5 px-3 rounded-lg border border-slate-200 bg-slate-50"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset Demo
                </button>
              )}
            </div>

            [Comment: Browser Window Mockup]
            <div className="w-full bg-slate-50 rounded-2xl border border-slate-200 shadow-xl overflow-hidden relative flex flex-col min-h-[500px]">
              
              [Comment: Chrome Browser Bar]
              <div className="bg-slate-100 border-b border-slate-200 px-4 py-3 flex items-center justify-between gap-4 z-10 select-none">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-400"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                </div>
                
                <div className="bg-white border border-slate-200 px-3 py-1 rounded-md text-[11px] sm:text-xs text-slate-400 flex items-center gap-1.5 w-60 sm:w-80 shadow-sm mx-auto">
                  <span className="text-slate-300 font-semibold">https://</span>
                  <span>nexeagle.io/hms/{activeTab}{activeTab === "billing" && activeSubTab === "referrals" && "/referrals"}</span>
                </div>
                
                <div className="w-12"></div>
              </div>

              <div className="flex flex-1 flex-col md:flex-row relative">
                
                [Comment: 1. SIDEBAR NAVIGATION]
                [Comment: Desktop Sidebar (visible on md+)]
                <div className="hidden md:flex flex-col w-56 bg-white border-r border-slate-200 p-4 justify-between select-none">
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 px-2">
                      <div className="w-7 h-7 rounded-lg bg-brand-teal flex items-center justify-center text-white font-bold text-sm shadow-md">N</div>
                      <span className="font-extrabold text-sm text-slate-900 tracking-wide">NexEagle HMS</span>
                    </div>

                    <nav className="space-y-1.5">
                      <button 
                        onClick={() => {
                          setActiveTab("dashboard");
                          if (currentStep === 2) handleReset();
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                          activeTab === "dashboard" 
                            ? "bg-slate-100 text-slate-900 shadow-sm" 
                            : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                        }`}
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        Dashboard
                      </button>

                      <button 
                        disabled
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-400 cursor-not-allowed opacity-60"
                      >
                        <Users className="w-4 h-4" />
                        Patients
                      </button>

                      <button 
                        onClick={() => {
                          setActiveTab("billing");
                          advanceStep(2);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all relative ${
                          activeTab === "billing" 
                            ? "bg-slate-900 text-white shadow-md shadow-slate-950/10" 
                            : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <Receipt className="w-4 h-4" />
                          Billing
                        </span>
                        {currentStep === 1 && (
                          <span className="flex h-2 w-2 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-teal opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-teal"></span>
                          </span>
                        )}
                      </button>

                      <button 
                        disabled
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-400 cursor-not-allowed opacity-60"
                      >
                        <Pill className="w-4 h-4" />
                        Pharmacy
                      </button>
                    </nav>
                  </div>

                  <div className="p-2 border-t border-slate-100 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center text-xs font-bold text-slate-700">A</div>
                    <div className="flex flex-col">
                      <span className="text-[11px] font-bold text-slate-800">Admin Staff</span>
                      <span className="text-[9px] text-slate-400">Terminal A</span>
                    </div>
                  </div>
                </div>

                [Comment: Mobile Tab Top Navigation (visible below md)]
                <div className="flex md:hidden bg-white border-b border-slate-200 p-2 justify-around select-none shadow-sm">
                  <button 
                    onClick={() => {
                      setActiveTab("dashboard");
                      if (currentStep === 2) handleReset();
                    }}
                    className={`flex flex-col items-center p-2 rounded-lg gap-1 ${
                      activeTab === "dashboard" ? "text-slate-900 font-bold" : "text-slate-400"
                    }`}
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span className="text-[10px]">Dashboard</span>
                  </button>

                  <button 
                    onClick={() => {
                      setActiveTab("billing");
                      advanceStep(2);
                    }}
                    className={`flex flex-col items-center p-2 rounded-lg gap-1 relative ${
                      activeTab === "billing" ? "text-brand-teal font-bold" : "text-slate-400"
                    }`}
                  >
                    <Receipt className="w-4 h-4" />
                    <span className="text-[10px]">Billing</span>
                    {currentStep === 1 && (
                      <span className="absolute top-1 right-2 flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-teal opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-teal"></span>
                      </span>
                    )}
                  </button>
                </div>

                [Comment: 2. MAIN WORKSPACE]
                <div className="flex-1 p-4 sm:p-6 overflow-y-auto min-h-[350px]">
                  <AnimatePresence mode="wait">
                    [Comment: VIEW: DASHBOARD]
                    {activeTab === "dashboard" && (
                      <motion.div 
                        key="dashboard"
                        variants={viewVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="space-y-6"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <h3 className="text-lg font-bold text-slate-800">HMS Dashboard</h3>
                          <span className="text-xs text-slate-400 font-medium font-mono">Operations: Normal</span>
                        </div>

                        [Comment: Top Widgets]
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                          <div className="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-sm space-y-1">
                            <span className="text-xs text-slate-400 font-semibold uppercase">Total Revenue</span>
                            <div className="text-xl sm:text-2xl font-bold text-slate-900">₹4,20,500</div>
                            <span className="text-[10px] text-emerald-600 font-medium">+12% vs yesterday</span>
                          </div>
                          
                          <div className="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-sm space-y-1">
                            <span className="text-xs text-slate-400 font-semibold uppercase">Pending Claims</span>
                            <div className="text-xl sm:text-2xl font-bold text-slate-900">28 Claims</div>
                            <span className="text-[10px] text-slate-400 font-medium">94% automated sync</span>
                          </div>

                          <div className="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-sm space-y-1 col-span-2 lg:col-span-1">
                            <span className="text-xs text-slate-400 font-semibold uppercase">Active Referrals</span>
                            <div className="text-xl sm:text-2xl font-bold text-slate-900">42 Doctors</div>
                            <span className="text-[10px] text-brand-teal font-semibold">Needs payout sync</span>
                          </div>
                        </div>

                        [Comment: Action guidance box]
                        {currentStep === 1 && (
                          <div className="p-4 rounded-xl bg-teal-50/50 border border-brand-teal/20 text-slate-700 text-xs sm:text-sm flex items-start gap-2.5 animate-pulse">
                            <AlertCircle className="w-4 h-4 text-brand-teal mt-0.5 shrink-0" />
                            <div>
                              <span className="font-bold">Next Step:</span> Click on the <span className="font-bold text-brand-teal">Billing</span> tab in the navigation menu to navigate to the hospital financial module.
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}

                    [Comment: VIEW: BILLING & FINANCIALS]
                    {activeTab === "billing" && (
                      <motion.div 
                        key="billing"
                        variants={viewVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="space-y-6"
                      >
                        [Comment: Subtabs Navigation]
                        <div className="border-b border-slate-200 pb-px flex items-center justify-between select-none">
                          <div className="flex gap-4 sm:gap-6">
                            <button 
                              onClick={() => {
                                setActiveSubTab("invoices");
                                if (currentStep === 3) handleReset();
                              }}
                              className={`text-xs sm:text-sm font-bold pb-2 border-b-2 transition-all ${
                                activeSubTab === "invoices" 
                                  ? "border-slate-800 text-slate-800" 
                                  : "border-transparent text-slate-400 hover:text-slate-600"
                              }`}
                            >
                              Invoices
                            </button>

                            <button 
                              onClick={() => {
                                setActiveSubTab("referrals");
                                advanceStep(3);
                              }}
                              className={`text-xs sm:text-sm font-bold pb-2 border-b-2 transition-all relative ${
                                activeSubTab === "referrals" 
                                  ? "border-brand-teal text-brand-teal" 
                                  : "border-transparent text-slate-400 hover:text-slate-600"
                              }`}
                            >
                              Referrals
                              {currentStep === 2 && (
                                <span className="absolute right-[-10px] top-1/2 -translate-y-1/2 flex h-2 w-2">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-teal opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-teal"></span>
                                </span>
                              )}
                            </button>
                          </div>

                          <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-white border border-slate-200 px-2.5 py-1 rounded-lg">
                            <Coins className="w-3.5 h-3.5" />
                            Auto-sync: Active
                          </div>
                        </div>

                        <AnimatePresence mode="wait">
                          [Comment: SUB-VIEW: INVOICES]
                          {activeSubTab === "invoices" && (
                            <motion.div 
                              key="invoices"
                              variants={viewVariants}
                              initial="initial"
                              animate="animate"
                              exit="exit"
                              className="space-y-4"
                            >
                              <div className="flex items-center justify-between">
                                <h4 className="text-sm font-bold text-slate-700">Recent OPD & IPD Invoices</h4>
                                <div className="w-48 bg-white border border-slate-200 px-2 py-1 rounded-md text-[11px] text-slate-400 flex items-center gap-1.5">
                                  <Search className="w-3 h-3" />
                                  Search bill ID...
                                </div>
                              </div>

                              <div className="bg-white rounded-xl border border-slate-200/60 overflow-x-auto text-xs scrollbar-thin">
                                <table className="w-full min-w-[500px] text-left border-collapse">
                                  <thead>
                                    <tr className="bg-slate-100 border-b border-slate-200 text-slate-500 font-semibold">
                                      <th className="p-3">Invoice ID</th>
                                      <th className="p-3">Patient</th>
                                      <th className="p-3">Department</th>
                                      <th className="p-3">Amount</th>
                                      <th className="p-3">Status</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr className="border-b border-slate-100">
                                      <td className="p-3 font-semibold text-slate-700">#INV-9281</td>
                                      <td className="p-3">Amit Sharma</td>
                                      <td className="p-3">OPD Consultation</td>
                                      <td className="p-3 font-medium">₹6,000</td>
                                      <td className="p-3"><span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">Paid</span></td>
                                    </tr>
                                    <tr className="border-b border-slate-100">
                                      <td className="p-3 font-semibold text-slate-700">#INV-9282</td>
                                      <td className="p-3">Rohan Kapoor</td>
                                      <td className="p-3">Diagnostics & Lab</td>
                                      <td className="p-3 font-medium">₹4,500</td>
                                      <td className="p-3"><span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold">Partial</span></td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>

                              {currentStep === 2 && (
                                <div className="p-4 rounded-xl bg-teal-50/50 border border-brand-teal/20 text-slate-700 text-xs sm:text-sm flex items-start gap-2.5 animate-pulse">
                                  <AlertCircle className="w-4 h-4 text-brand-teal mt-0.5 shrink-0" />
                                  <div>
                                    <span className="font-bold">Next Step:</span> Click on the <span className="font-bold text-brand-teal">Referrals</span> tab to view the referral statistics and payouts database.
                                  </div>
                                </div>
                              )}
                            </motion.div>
                          )}

                          [Comment: SUB-VIEW: REFERRALS]
                          {activeSubTab === "referrals" && (
                            <motion.div 
                              key="referrals"
                              variants={viewVariants}
                              initial="initial"
                              animate="animate"
                              exit="exit"
                              className="space-y-4"
                            >
                              <div className="flex items-center justify-between">
                                <h4 className="text-sm font-bold text-slate-700">Doctors Referral Directory</h4>
                              </div>

                              [Comment: Table]
                              <div className="bg-white rounded-xl border border-slate-200/60 overflow-x-auto text-xs shadow-sm scrollbar-thin">
                                <table className="w-full min-w-[450px] text-left border-collapse">
                                  <thead>
                                    <tr className="bg-slate-100 border-b border-slate-200 text-slate-500 font-semibold">
                                      <th className="p-3">Doctor Name</th>
                                      <th className="p-3">Specialization</th>
                                      <th className="p-3 hidden sm:table-cell">Referred Cases</th>
                                      <th className="p-3">Accrued Payout</th>
                                      <th className="p-3">Action</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {mockDoctors.map((doc, idx) => (
                                      <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                                        <td className="p-3 font-semibold text-slate-800">{doc.name}</td>
                                        <td className="p-3 text-slate-500">{doc.specialty}</td>
                                        <td className="p-3 hidden sm:table-cell font-medium">{doc.count} cases</td>
                                        <td className="p-3 font-bold text-slate-700">{doc.payout}</td>
                                        <td className="p-3 relative">
                                          <button 
                                            onClick={() => {
                                              if (doc.id === "doc1") {
                                                setSideMenuOpen(true);
                                                advanceStep(4);
                                              }
                                            }}
                                            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-all ${
                                              doc.id === "doc1" && currentStep === 3
                                                ? "bg-slate-900 text-white border-slate-900 shadow-md relative"
                                                : "bg-white hover:bg-slate-50 border-slate-200 text-slate-600"
                                            }`}
                                          >
                                            View Details
                                            {doc.id === "doc1" && currentStep === 3 && (
                                              <span className="absolute right-[-4px] top-[-4px] flex h-2.5 w-2.5">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-teal opacity-85"></span>
                                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-teal"></span>
                                              </span>
                                            )}
                                          </button>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>

                              {currentStep === 3 && (
                                <div className="p-4 rounded-xl bg-teal-50/50 border border-brand-teal/20 text-slate-700 text-xs sm:text-sm flex items-start gap-2.5 animate-pulse">
                                  <AlertCircle className="w-4 h-4 text-brand-teal mt-0.5 shrink-0" />
                                  <div>
                                    <span className="font-bold">Next Step:</span> Click on <span className="font-bold text-brand-teal">View Details</span> button next to <span className="font-bold">Dr. Rajesh Kumar</span> to inspect their referred cases list.
                                  </div>
                                </div>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                [Comment: 3. SLIDE-IN SIDE MENU DRAWER (overlaying mockup container)]
                <AnimatePresence>
                  {sideMenuOpen && (
                    <>
                      [Comment: Drawer Backdrop overlay]
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => {
                          setSideMenuOpen(false);
                          if (currentStep === 4) handleReset();
                        }}
                        className="absolute inset-0 bg-slate-950/20 backdrop-blur-[1px] z-20"
                      />

                      [Comment: Drawer Panel]
                      <motion.div 
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", stiffness: 260, damping: 26 }}
                        className="absolute right-0 top-0 bottom-0 w-[280px] sm:w-[350px] bg-white border-l border-slate-200 p-5 shadow-2xl z-30 flex flex-col justify-between"
                      >
                        <div className="space-y-6">
                          [Comment: Header]
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-[10px] font-bold text-brand-teal uppercase tracking-wider">Referral Account</span>
                              <h4 className="text-sm font-bold text-slate-900">Dr. Rajesh Kumar</h4>
                              <p className="text-[10px] text-slate-400">Department: Cardiology</p>
                            </div>
                            <button 
                              onClick={() => {
                                setSideMenuOpen(false);
                                if (currentStep === 4) handleReset();
                              }}
                              className="w-7 h-7 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-800 transition-colors border border-slate-100"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>

                          [Comment: Patients List]
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-slate-700">Referred Patients & Status</span>
                              <span className="text-[10px] text-slate-400 font-medium">Synced: Realtime</span>
                            </div>

                            <div className="space-y-2.5 text-xs">
                              {mockPatients.map((patient, idx) => (
                                <div 
                                  key={idx} 
                                  className={`p-3 rounded-xl border flex flex-col justify-between gap-1 transition-all ${
                                    patient.status === "Partial Paid" && currentStep === 4
                                      ? "bg-amber-50/50 border-amber-300 ring-2 ring-amber-400/20 shadow-md scale-[1.02]"
                                      : "bg-slate-50 border-slate-200"
                                  }`}
                                >
                                  <div className="flex items-center justify-between">
                                    <span className="font-bold text-slate-800">{patient.name}</span>
                                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold border ${patient.color}`}>
                                      {patient.status}
                                    </span>
                                  </div>
                                  <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1 font-medium">
                                    <span>Date: {patient.date}</span>
                                    <span className="text-slate-600">
                                      Total: {patient.amount}
                                      {patient.remaining && ` (Owe: ${patient.remaining})`}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {currentStep === 4 && (
                            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-slate-700 leading-relaxed">
                              <span className="font-bold text-amber-800">Verification Target Found:</span> Patient <span className="font-bold">Rohan Kapoor</span> is marked as <span className="font-bold text-amber-700">Partial Paid</span> with <span className="font-bold">₹3,500</span> outstanding.
                            </div>
                          )}
                        </div>

                        [Comment: Action CTA]
                        <div className="pt-4 border-t border-slate-100">
                          {currentStep === 4 ? (
                            <button
                              onClick={() => {
                                setSideMenuOpen(false);
                                advanceStep(5);
                              }}
                              className="w-full py-2.5 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white shadow-md transition-all flex items-center justify-center gap-1.5 hover:shadow-lg relative"
                            >
                              Complete Verification
                              <ChevronRight className="w-4 h-4" />
                              <span className="absolute right-2 top-1/2 -translate-y-1/2 flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                              </span>
                            </button>
                          ) : (
                            <div className="text-center text-[10px] text-slate-400 py-2 font-medium">
                              Close sidebar or reset demo to restart.
                            </div>
                          )}
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>

                [Comment: 4. SUCCESS VERIFICATION OVERLAY SCREEN]
                <AnimatePresence>
                  {currentStep === 5 && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="absolute inset-0 bg-white/95 backdrop-blur-md z-40 flex flex-col items-center justify-center p-6 text-center select-none"
                    >
                      <div className="max-w-md space-y-6">
                        
                        [Comment: Success Icon]
                        <div className="flex justify-center">
                          <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 12 }}
                            className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-lg border border-emerald-200"
                          >
                            <CheckCircle2 className="w-10 h-10" />
                          </motion.div>
                        </div>

                        [Comment: Text]
                        <div className="space-y-2">
                          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">Verification Successful</h3>
                          <p className="text-xs sm:text-sm text-slate-500 font-light leading-relaxed">
                            You successfully completed the billing referral audit! NexEagle's unified architecture ensures that doctor referrals and patient payment records are seamlessly integrated.
                          </p>
                        </div>

                        [Comment: Checklist Details]
                        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 text-left space-y-2.5 max-w-sm mx-auto text-xs font-semibold text-slate-700">
                          <div className="flex items-center gap-2 text-slate-800">
                            <span className="text-emerald-500 font-bold">✓</span>
                            <span>Billing Sub-System Accessed</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-800">
                            <span className="text-emerald-500 font-bold">✓</span>
                            <span>Partner Referral Directory Opened</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-800">
                            <span className="text-emerald-500 font-bold">✓</span>
                            <span>Referred Patients Drawer Loaded</span>
                          </div>
                          <div className="flex items-center gap-2 text-emerald-700">
                            <span className="text-emerald-500 font-bold">✓</span>
                            <span>Partial Paid Patient Rohan Kapoor Confirmed</span>
                          </div>
                        </div>

                        [Comment: Action buttons]
                        <div className="flex items-center justify-center gap-3">
                          <button 
                            onClick={handleReset}
                            className="flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 transition-colors py-2 px-4 rounded-xl border border-slate-200 shadow-sm"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            Test Again
                          </button>

                          <Link href="/contact">
                            <button className="flex items-center gap-1 text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white shadow-md py-2 px-4 rounded-xl transition-all">
                              Request Live Demo
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </Link>
                        </div>

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>

            </div>

          </motion.div>
          )]
          */}

        </div>
      </div>
    </section>
  );
};

export default ProductEcosystem;
