"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  // Patient portal pages use their own PatientTopBar & PatientFooter —
  // hide the main Navbar/Footer on these routes to avoid a double header.
  const isPatientPortal = pathname === "/" || pathname.startsWith("/doctors/");

  if (isPatientPortal) {
    return <>{children}</>;
  }

  return (
    <div className="main-site-wrapper">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
