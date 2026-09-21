import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Every route on this site is a corporate/B2B page, so they all share the same Navbar + Footer.
// (The patient portal, which used to swap in its own chrome by pathname here, is a separate app.)
export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="main-site-wrapper">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
