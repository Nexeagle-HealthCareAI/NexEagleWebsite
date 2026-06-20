import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, Eye, ShieldCheck, Heart, LayoutDashboard, Calendar, Receipt, 
  Shield, FileText, Users, Activity, HelpCircle, Settings, LogOut, Search, 
  SlidersHorizontal, Edit3, Trash2, RefreshCw, ChevronRight, Phone, Laptop, Tablet
} from "lucide-react";

export const PlatformShowcase = () => {
  const [activeTab, setActiveTab] = useState("appointments");
  const [devicePreview, setDevicePreview] = useState<"desktop" | "tablet" | "mobile">("desktop");

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        if (window.innerWidth < 768) {
          setDevicePreview("mobile");
        } else if (window.innerWidth < 1024) {
          setDevicePreview("tablet");
        } else {
          setDevicePreview("desktop");
        }
      };
      
      // Run on mount
      handleResize();
    }
  }, []);

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "appointments", label: "Appointments", icon: Calendar },
    { id: "billing", label: "Billing", icon: Receipt },
    { id: "approval", label: "Admin Approval", icon: Shield },
    { id: "imaging", label: "Imaging", icon: Activity },
    { id: "reporting", label: "Reporting", icon: FileText },
    { id: "referrals", label: "Referrals", icon: Users },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "logout", label: "Sign out", icon: LogOut },
  ];

  const stats = [
    { label: "TOTAL VOLUME", value: "2", sub: "100% Active", color: "bg-slate-900 text-white border-slate-900" },
    { label: "EXPECTED TODAY", value: "0", sub: "Intake Pending", color: "bg-white text-slate-800 border-slate-200" },
    { label: "ARRIVED IN HALL", value: "2", sub: "Queue Waiting", color: "bg-emerald-50 text-emerald-800 border-emerald-100" },
    { label: "SCANNING / SCANNED", value: "0 / 0", sub: "In Progress / Complete", color: "bg-amber-50 text-amber-800 border-amber-100" },
    { label: "REPORTING / REPORTED", value: "0 / 0", sub: "Drafting / Finalized", color: "bg-purple-50 text-purple-800 border-purple-100" },
    { label: "DELIVERED REPORTS", value: "0", sub: "Handed Over (0%)", color: "bg-blue-50 text-blue-800 border-blue-100" },
    { label: "CANCELLED", value: "0", sub: "Aborted Missions", color: "bg-rose-50 text-rose-800 border-rose-100" },
  ];

  const patients = [
    { 
      id: "3", 
      name: "PYDANTIC AI FUTURE", 
      details: "FEMALE · 25Y · STAT", 
      services: ["chest Xray", "chest Xray"], 
      referred: "DR RASTOGI", 
      time: "2h 5m",
      timestamp: "04:16 PM IST", 
      status: "ARRIVED",
      statusColor: "bg-emerald-100 text-emerald-800 border-emerald-200"
    },
    { 
      id: "1", 
      name: "SUCCESS HFLOW", 
      details: "FEMALE · 34Y · PAID · APPROVED", 
      services: ["Stomach CT", "ultra stomach"], 
      referred: "DR RAMESH", 
      time: "6h 12m",
      timestamp: "12:11 PM IST", 
      status: "ARRIVED",
      statusColor: "bg-emerald-100 text-emerald-800 border-emerald-200"
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-slate-50/50 border-t border-b border-slate-100 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 -right-48 w-96 h-96 bg-brand-sky/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 -left-48 w-96 h-96 bg-brand-teal/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container relative z-10 px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          
          {/* Section Header */}
          <div className="text-center space-y-4 mb-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-teal-100 bg-teal-50 text-brand-teal text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Platform Showcase</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Strategic Clinical Mission Control
            </h2>
            
            <p className="text-base sm:text-lg text-slate-600 font-light leading-relaxed">
              Explore how NexEagle's central operations board naturally reflows across viewports, bringing scheduling, queue state, and billing together in one real-time command center.
            </p>
          </div>

          {/* Device Switcher Controls */}
          <div className="flex items-center gap-2 mb-8 bg-slate-200/50 p-1.5 rounded-2xl border border-slate-200/60 shadow-inner select-none">
            <button 
              onClick={() => setDevicePreview("desktop")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                devicePreview === "desktop" 
                  ? "bg-white text-slate-900 shadow-sm" 
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <Laptop className="w-4 h-4" />
              Desktop
            </button>
            <button 
              onClick={() => setDevicePreview("tablet")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                devicePreview === "tablet" 
                  ? "bg-white text-slate-900 shadow-sm" 
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <Tablet className="w-4 h-4" />
              Tablet
            </button>
            <button 
              onClick={() => setDevicePreview("mobile")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                devicePreview === "mobile" 
                  ? "bg-white text-slate-900 shadow-sm" 
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <Phone className="w-4 h-4" />
              Mobile App
            </button>
          </div>          {/* DEVICE PREVIEW WINDOW */}
          <div className="w-full overflow-x-auto pb-6 px-4 flex justify-start md:justify-center scrollbar-thin">
            <motion.div 
              layout
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              style={{
                width: devicePreview === "desktop" ? "1080px" : devicePreview === "tablet" ? "768px" : "min(100%, 340px)",
                minWidth: devicePreview === "desktop" ? "1080px" : devicePreview === "tablet" ? "768px" : "auto",
              }}
              className={`bg-slate-900 rounded-[2rem] md:rounded-[2.5rem] border-[6px] md:border-[12px] border-slate-950 shadow-2xl relative overflow-hidden transition-all duration-300 flex flex-col shrink-0 mx-auto ${
                devicePreview === "mobile" ? "h-[580px]" : "h-auto min-h-[420px] md:min-h-[580px]"
              }`}
            >
              {/* Phone Speaker & Camera Notch (Only on mobile preview) */}
              {devicePreview === "mobile" && (
                <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-24 h-4 bg-black rounded-full z-50 flex items-center justify-center pointer-events-none">
                  {/* Speaker line */}
                  <div className="w-8 h-1 bg-slate-900 rounded-full absolute left-4"></div>
                  {/* Camera dot */}
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-800 absolute right-4"></div>
                </div>
              )}

              {/* Phone OS Status Bar (Only on mobile preview) */}
              {devicePreview === "mobile" && (
                <div className="bg-slate-950 text-white px-5 pt-5 pb-1 flex justify-between items-center text-[9px] font-bold select-none shrink-0 z-20">
                  <span>06:23 PM</span>
                  <div className="flex items-center gap-1">
                    <span className="w-2.5 h-1.5 bg-white rounded-[1px]"></span>
                    <span className="w-2.5 h-2.5 rounded-full border border-white"></span>
                  </div>
                </div>
              )}
              
              {/* Chrome Mockup Browser Bar (hidden on mobile) */}
              {devicePreview !== "mobile" && (
                <div className="bg-slate-100 border-b border-slate-200 px-4 py-2.5 flex items-center justify-between gap-4 select-none z-10 shrink-0">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
                  </div>
                  <div className={`bg-white border border-slate-200 px-2.5 py-0.5 rounded-md text-[10px] text-slate-400 flex items-center justify-center shadow-inner mx-auto font-mono ${
                    devicePreview === "tablet" ? "w-52" : "w-80"
                  }`}>
                    https://nexeagle.io/1rad/appointments
                  </div>
                  <div className="w-12"></div>
                </div>
              )}

              {/* DASHBOARD CORE */}
              <div className={`flex flex-1 bg-slate-50 relative overflow-hidden ${
                devicePreview === "mobile" ? "flex-col" : "flex-row"
              }`}>
                
                {/* 1. SIDEBAR */}
                {/* Desktop Sidebar */}
                {devicePreview === "desktop" && (
                  <div className="w-56 bg-slate-950 border-r border-slate-900 flex flex-col justify-between p-4 shrink-0 text-slate-400 select-none">
                    <div className="space-y-6">
                      <div className="flex items-center gap-2 px-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-sky to-brand-teal flex items-center justify-center text-slate-955 font-bold text-base shadow-md">
                          N
                        </div>
                        <div className="flex flex-col">
                          <span className="font-extrabold text-xs text-white tracking-wider">NexEagle</span>
                          <span className="text-[9px] text-brand-sky font-semibold tracking-widest uppercase">1RAD OS</span>
                        </div>
                      </div>

                      <nav className="space-y-1">
                        {sidebarItems.map((item, idx) => {
                          const Icon = item.icon;
                          const isActive = item.id === activeTab;
                          return (
                            <button
                              key={idx}
                              onClick={() => {
                                if (item.id === "dashboard" || item.id === "appointments" || item.id === "billing") {
                                  setActiveTab(item.id);
                                }
                              }}
                              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-[11px] font-bold tracking-wide transition-all ${
                                isActive 
                                  ? "bg-slate-900 text-brand-sky border-l-2 border-brand-sky" 
                                  : "hover:bg-slate-900/50 hover:text-white"
                              }`}
                            >
                              <Icon className="w-3.5 h-3.5" />
                              {item.label}
                            </button>
                          );
                        })}
                      </nav>
                    </div>

                    <div className="p-2 border-t border-slate-900 flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] font-bold text-white uppercase">A</div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-white">Chief Doctor</span>
                        <span className="text-[8px] text-slate-500">Star Hospital 2</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tablet Sidebar (Collapsed Icons) */}
                {devicePreview === "tablet" && (
                  <div className="w-16 bg-slate-950 border-r border-slate-900 flex flex-col justify-between items-center py-4 shrink-0 text-slate-400 select-none">
                    <div className="space-y-6 flex flex-col items-center">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-sky to-brand-teal flex items-center justify-center text-slate-950 font-bold text-base shadow-md">
                        N
                      </div>

                      <nav className="space-y-2.5 flex flex-col items-center">
                        {sidebarItems.map((item, idx) => {
                          const Icon = item.icon;
                          const isActive = item.id === activeTab;
                          return (
                            <button
                              key={idx}
                              onClick={() => {
                                if (item.id === "dashboard" || item.id === "appointments" || item.id === "billing") {
                                  setActiveTab(item.id);
                                }
                              }}
                              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                                isActive 
                                  ? "bg-slate-900 text-brand-sky border-l-2 border-brand-sky shadow-inner" 
                                  : "hover:bg-slate-900/50 hover:text-white"
                              }`}
                              title={item.label}
                            >
                              <Icon className="w-4 h-4" />
                            </button>
                          );
                        })}
                      </nav>
                    </div>

                    <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] font-bold text-white uppercase">A</div>
                  </div>
                )}

                {/* 2. TOP BANNER / HEADER (Dashboard header) */}
                <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
                  
                  {/* Top Bar inside dashboard */}
                  <div className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between gap-4 shrink-0 shadow-sm select-none">
                    {/* Left: Search or logo */}
                    <div className="flex items-center gap-2">
                      {devicePreview === "mobile" && (
                        <div className="w-6 h-6 rounded-md bg-gradient-to-br from-brand-sky to-brand-teal flex items-center justify-center text-slate-950 font-bold text-xs shrink-0">
                          N
                        </div>
                      )}
                      <div className="flex items-center gap-2 font-sans">
                        <span className="text-[10px] font-bold text-brand-teal uppercase tracking-widest bg-brand-teal/5 px-2 py-0.5 rounded border border-brand-teal/10 truncate max-w-[120px]">Star Hospital 2</span>
                        <span className="h-3 w-px bg-slate-200 hidden sm:inline-block"></span>
                        <span className="text-[10px] text-slate-400 font-semibold hidden sm:inline-block">Live System</span>
                      </div>
                    </div>

                    {/* Center: Purple Ask RadAI banner (hidden on mobile) */}
                    {devicePreview !== "mobile" && (
                      <div className="flex items-center gap-3 bg-slate-900 text-white rounded-full py-1.5 px-4 text-xs font-semibold border border-slate-800 max-w-sm">
                        <span className="flex h-1.5 w-1.5 relative">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-sky opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-brand-sky"></span>
                        </span>
                        <span className="text-[10px] sm:text-xs">Ask RadAI</span>
                        <span className="text-slate-400 text-[9px] sm:text-[10px] font-light leading-none">Free Trial Active</span>
                      </div>
                    )}

                    {/* Right: Desktop App or doctor tag */}
                    <div className="flex items-center gap-3 shrink-0">
                      {devicePreview === "desktop" && (
                        <button className="text-[10px] font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 py-1.5 px-3 rounded-lg shadow-sm transition-colors shrink-0">
                          Get Desktop App
                        </button>
                      )}
                      
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-xs border border-slate-200 text-slate-700 select-none shrink-0">
                          👨‍⚕️
                        </div>
                        {devicePreview !== "mobile" && (
                          <div className="flex flex-col text-left">
                            <span className="text-[10px] font-bold text-slate-800 leading-tight">Chief Doctor</span>
                            <span className="text-[8px] text-slate-400 leading-none">Star Hospital</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* 3. MAIN WORKSPACE */}
                  <div className={`flex-1 overflow-y-auto ${
                    devicePreview === "mobile" ? "p-3 space-y-4" : "p-6 space-y-6"
                  }`}>
                    
                    {/* Ask RadAI Mobile Feature card (Only on mobile preview) */}
                    {devicePreview === "mobile" && (
                      <div className="bg-gradient-to-r from-purple-900 to-slate-900 text-white p-3.5 rounded-xl border border-purple-800/50 shadow-[0_4px_12px_rgba(147,51,234,0.1)] flex justify-between items-center relative overflow-hidden select-none shrink-0">
                        <div className="space-y-0.5 relative z-10 text-left">
                          <span className="text-[8px] font-bold tracking-wider text-brand-sky uppercase flex items-center gap-1">
                            <Sparkles className="w-2.5 h-2.5 text-brand-sky animate-pulse" />
                            AI Copilot
                          </span>
                          <h4 className="text-[11px] font-bold">Ask RadAI Assistant</h4>
                          <p className="text-[8.5px] text-slate-300 font-light">Get instant clinical & imaging insights</p>
                        </div>
                        <button className="bg-brand-sky hover:bg-brand-sky/95 text-slate-950 text-[9px] font-bold px-2.5 py-1 rounded-lg shadow-sm z-10 shrink-0">
                          Ask
                        </button>
                        <div className="absolute right-[-10%] top-[-20%] w-20 h-20 bg-brand-sky/10 rounded-full blur-xl pointer-events-none"></div>
                      </div>
                    )}

                    {/* View Header */}
                    <div className={`flex justify-between gap-3 text-left ${
                      devicePreview === "mobile" ? "flex-col items-start" : "flex-row items-center"
                    }`}>
                      <div>
                        <h3 className={`font-extrabold text-slate-900 leading-none mb-1 font-sans ${
                          devicePreview === "mobile" ? "text-base" : "text-xl"
                        }`}>Appointment Command</h3>
                        <p className={`font-bold tracking-wider text-slate-400 uppercase ${
                          devicePreview === "mobile" ? "text-[8px]" : "text-[10px]"
                        }`}>STRATEGIC CLINICAL MISSION CONTROL</p>
                      </div>

                      <div className="flex items-center gap-1 bg-slate-200/50 p-1 rounded-xl border border-slate-200/50 text-slate-700 select-none self-start shrink-0">
                        <button className="px-2.5 py-1 rounded-lg text-[9px] font-extrabold bg-slate-900 text-white shadow-sm">TODAY</button>
                        <button className="px-2.5 py-1 rounded-lg text-[9px] font-extrabold text-slate-500 hover:text-slate-800">PAST</button>
                        <button className="px-2.5 py-1 rounded-lg text-[9px] font-extrabold text-slate-500 hover:text-slate-800">FUTURE</button>
                      </div>
                    </div>

                    {/* Metrics stats summary */}
                    {devicePreview === "desktop" ? (
                      /* Desktop layout: Row of cards */
                      <div className="grid grid-cols-7 gap-3 select-none">
                        {stats.map((stat, idx) => (
                          <div key={idx} className={`p-3 rounded-xl border flex flex-col justify-between min-h-[90px] shadow-sm text-left ${stat.color}`}>
                            <span className="text-[9px] font-bold tracking-wide opacity-70 leading-tight">{stat.label}</span>
                            <div className="space-y-1">
                              <span className="text-xl font-extrabold tracking-tight">{stat.value}</span>
                              <p className="text-[8px] font-medium leading-none opacity-80">{stat.sub}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : devicePreview === "tablet" ? (
                      /* Tablet layout: 3x2 / 4x2 reflowed grid */
                      <div className="grid grid-cols-3 gap-3 select-none">
                        {stats.map((stat, idx) => (
                          <div key={idx} className={`p-3 rounded-xl border flex flex-col justify-between min-h-[85px] shadow-sm text-left ${stat.color} ${idx === 6 ? "col-span-3" : ""}`}>
                            <span className="text-[9px] font-bold tracking-wide opacity-70 leading-tight">{stat.label}</span>
                            <div className="space-y-1">
                              <span className="text-lg font-extrabold tracking-tight">{stat.value}</span>
                              <p className="text-[8px] font-medium leading-none opacity-80">{stat.sub}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      /* Mobile layout: 3-column compact grid */
                      <div className="grid grid-cols-3 gap-2 shrink-0 select-none">
                        {stats.slice(0, 6).map((stat, idx) => (
                          <div key={idx} className={`p-2 rounded-xl border flex flex-col justify-between min-h-[68px] shadow-sm text-left ${stat.color}`}>
                            <span className="text-[7.5px] font-extrabold tracking-wide opacity-75 leading-tight uppercase truncate">
                              {stat.label.includes("VOLUME") ? "VOLUME" : stat.label.includes("EXPECTED") ? "EXPECTED" : stat.label.includes("ARRIVED") ? "ARRIVED" : stat.label.includes("SCANNING") ? "SCANS" : stat.label.includes("REPORTING") ? "REPORTS" : "DELIVERED"}
                            </span>
                            <div className="space-y-0.5">
                              <span className="text-sm font-extrabold tracking-tight">{stat.value}</span>
                              <p className="text-[7px] font-bold leading-none opacity-80 truncate">{stat.sub}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Filter and search bar */}
                    <div className={`bg-white rounded-xl border border-slate-200 shadow-sm flex items-center gap-2 select-none ${
                      devicePreview === "mobile" ? "p-2 flex-col" : "p-3 flex-row"
                    }`}>
                      <div className={`bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg text-xs text-slate-500 flex items-center gap-2 w-full shadow-inner text-left ${
                        devicePreview === "mobile" ? "" : "flex-1"
                      }`}>
                        <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className={`text-slate-400 truncate ${
                          devicePreview === "mobile" ? "text-[9px]" : "text-[10px]"
                        }`}>Search patient, referrer, service...</span>
                      </div>

                      {devicePreview !== "mobile" && (
                        <div className="flex gap-2 w-auto shrink-0">
                          <button className="px-3 py-1.5 border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600 bg-white hover:bg-slate-50 flex items-center gap-1.5">
                            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            All Modalities
                          </button>
                          <button className="px-3 py-1.5 border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600 bg-white hover:bg-slate-50">
                            All Specialists
                          </button>
                        </div>
                      )}

                      <button className={`px-3 py-1.5 bg-rose-50 hover:bg-rose-100/85 text-rose-600 text-[9px] font-bold rounded-lg transition-colors border border-rose-100 shrink-0 uppercase font-sans ${
                        devicePreview === "mobile" ? "w-full" : "w-auto"
                      }`}>
                        RESET FILTERS
                      </button>
                    </div>

                    {/* Patients Queue List */}
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between select-none">
                        <span className="text-[9px] font-extrabold tracking-wider text-slate-400 uppercase">2 RECORDS FOUND</span>
                        <span className="text-[8px] text-slate-400 font-semibold font-mono">Real-time Sync</span>
                      </div>

                      <div className="space-y-2.5">
                        {patients.map((pat, idx) => (
                          <div 
                            key={idx} 
                            className={`bg-white border border-slate-200/80 rounded-xl transition-all duration-300 relative overflow-hidden flex flex-col justify-between text-left shadow-sm ${
                              devicePreview === "mobile" ? "p-3 gap-2" : "p-5 flex-row items-center gap-4 hover:shadow-md"
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              {/* Token Badge */}
                              <div className={`rounded-lg bg-slate-100 border border-slate-200 text-slate-800 font-extrabold flex items-center justify-center shrink-0 select-none ${
                                devicePreview === "mobile" ? "w-7 h-7 text-[11px]" : "w-8 h-8 text-xs"
                              }`}>
                                {pat.id}
                              </div>

                              <div className={`min-w-0 flex-1 ${
                                devicePreview === "mobile" ? "space-y-1" : "space-y-1.5"
                              }`}>
                                <div className={`flex items-center justify-between flex-wrap gap-2 ${
                                  devicePreview === "mobile" ? "" : "justify-start"
                                }`}>
                                  <h4 className={`font-extrabold text-slate-900 tracking-wide truncate ${
                                    devicePreview === "mobile" ? "text-[11px]" : "text-xs"
                                  }`}>{pat.name}</h4>
                                  <span className="text-[8px] font-bold text-slate-400 px-1.5 py-0.5 bg-slate-50 rounded border border-slate-200/50 uppercase">{pat.details}</span>
                                </div>
                                <div className="flex flex-wrap items-center gap-1.5">
                                  {pat.services.map((ser, sIdx) => (
                                    <span key={sIdx} className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-brand-sky/5 text-brand-sky border border-brand-sky/10">{ser}</span>
                                  ))}
                                  <span className={`text-[9px] text-slate-350 ${
                                    devicePreview === "mobile" ? "hidden" : "inline"
                                  }`}>|</span>
                                  <span className="text-[8.5px] font-bold text-slate-400 font-sans">Ref: <span className="text-slate-700">{pat.referred}</span></span>
                                </div>
                              </div>
                            </div>

                            {/* Status, Time, Actions */}
                            <div className={`flex items-center justify-between shrink-0 ${
                              devicePreview === "mobile" 
                                ? "border-t border-slate-100 pt-2.5" 
                                : "flex-row justify-end gap-4 border-t-0 pt-0"
                            }`}>
                              <div className={`flex flex-col text-left ${
                                devicePreview === "mobile" ? "" : "text-right"
                              }`}>
                                <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold border ${pat.statusColor} inline-block self-start select-none ${
                                  devicePreview === "mobile" ? "" : "self-end"
                                }`}>
                                  {pat.status}
                                </span>
                                <span className="text-[8.5px] text-slate-450 font-semibold font-mono mt-1">In Queue: {pat.time}</span>
                              </div>

                              {/* Action buttons */}
                              <div className="flex items-center gap-1 select-none">
                                <button className={`rounded-lg hover:bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-800 transition-colors border border-slate-200 p-1 ${
                                  devicePreview === "mobile" ? "w-6 h-6" : "w-7 h-7"
                                }`}>
                                  <Edit3 className="w-3 h-3" />
                                </button>
                                <button className={`rounded-lg hover:bg-slate-50 flex items-center justify-center text-rose-400 hover:text-rose-600 transition-colors border border-slate-200 p-1 ${
                                  devicePreview === "mobile" ? "w-6 h-6" : "w-7 h-7"
                                }`}>
                                  <Trash2 className="w-3 h-3" />
                                </button>
                                <button className={`rounded-lg hover:bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-800 transition-colors border border-slate-200 p-1 ${
                                  devicePreview === "mobile" ? "w-6 h-6" : "w-7 h-7"
                                }`}>
                                  <RefreshCw className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* 4. Bottom Navigation Bar for Mobile */}
                  {devicePreview === "mobile" && (
                    <div className="bg-slate-950 border-t border-slate-900 pt-2 pb-1.5 flex flex-col justify-between shrink-0 select-none text-slate-400 z-10 shadow-lg">
                      <div className="flex justify-around items-center w-full px-2">
                        <button 
                          onClick={() => setActiveTab("dashboard")}
                          className={`flex flex-col items-center gap-0.5 py-1 ${
                            activeTab === "dashboard" ? "text-brand-sky font-bold" : "text-slate-500"
                          }`}
                        >
                          <LayoutDashboard className="w-4 h-4" />
                          <span className="text-[8px]">Dashboard</span>
                        </button>

                        <button 
                          onClick={() => setActiveTab("appointments")}
                          className={`flex flex-col items-center gap-0.5 py-1 ${
                            activeTab === "appointments" ? "text-brand-sky font-bold" : "text-slate-500"
                          }`}
                        >
                          <Calendar className="w-4 h-4" />
                          <span className="text-[8px]">Appts</span>
                        </button>

                        <button 
                          onClick={() => setActiveTab("billing")}
                          className={`flex flex-col items-center gap-0.5 py-1 ${
                            activeTab === "billing" ? "text-brand-sky font-bold" : "text-slate-500"
                          }`}
                        >
                          <Receipt className="w-4 h-4" />
                          <span className="text-[8px]">Billing</span>
                        </button>
                      </div>
                      
                      {/* iOS Home Indicator Pill */}
                      <div className="w-20 h-1 bg-slate-800 rounded-full mx-auto mt-2 mb-0.5"></div>
                    </div>
                  )}

                </div>
              </div>

            </motion.div>
          </div>

          {/* Highlights section below mockup */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 w-full max-w-5xl">
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-xl bg-brand-teal/10 text-brand-teal flex items-center justify-center shrink-0">
                <Eye className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-slate-800">Unified Operations</h4>
                <p className="text-sm text-slate-500 font-light">Eliminate switching between separate software. Track consultations, imaging, and bill status on one screen.</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-xl bg-brand-sky/10 text-brand-sky flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-slate-800">NABH Audit Trail</h4>
                <p className="text-sm text-slate-500 font-light">Every patient action, scan transfer, and report modification is fully logged to satisfy regulatory compliance.</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-xl bg-brand-iris/10 text-brand-iris flex items-center justify-center shrink-0">
                <Heart className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-slate-800">Empathy-Driven UI</h4>
                <p className="text-sm text-slate-500 font-light">Clean contrast and legible data panels designed specifically for high-stress, fast-paced clinical environments.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PlatformShowcase;
