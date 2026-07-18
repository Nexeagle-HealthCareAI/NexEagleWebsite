"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PatientBottomNav from "@/components/patient/PatientBottomNav";
import InstallPrompt from "@/components/patient/InstallPrompt";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  // Patient portal pages use their own PatientTopBar & PatientFooter —
  // hide the main Navbar/Footer on these routes to avoid a double header.
  const isPatientPortal = 
    pathname === "/" || 
    pathname.startsWith("/doctors/") ||
    pathname.startsWith("/specialties/") ||
    pathname.startsWith("/conditions/") ||
    pathname.startsWith("/hospitals/") ||
    pathname.startsWith("/appointments") ||
    pathname.startsWith("/profile");

  if (isPatientPortal) {
    return (
      <>
        {children}
        <PatientBottomNav />
        <InstallPrompt />
      </>
    );
  }

  return (
    <div className="main-site-wrapper">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
