import type { Metadata } from "next";
import Hero3D from "@/components/home-v2/Hero3D";
import PatientJourney from "@/components/home-v2/PatientJourney";
import AgentsSection from "@/components/home-v2/AgentsSection";
import { ClientsStrip, ClosingCTA, DataTrust, GoLive } from "@/components/home-v2/Sections";
import Testimonials from "@/components/home/Testimonials";
import DeferredLiveChat from "@/components/DeferredLiveChat";
import AnalyticsTracker from "@/components/AnalyticsTracker";

// Server component: every section is in the initial HTML for search engines and AI crawlers;
// interactive parts (3D hero, tabs, AI demo) hydrate on the client.
export const metadata: Metadata = {
  title: { absolute: "NexEagle — Vita AI agents for the whole patient journey | 1HMS, 1Rad" },
  description:
    "Vita, NexEagle's AI agents, helps patients find the right doctor, book and reach the clinic; automates the hospital workflow in 1HMS; and in 1Rad runs AI vision analysis and drafts radiology reports for the radiologist to sign.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <main>
      <AnalyticsTracker title="NexEagle - AI-Powered Healthcare Operating System" />
      <Hero3D />
      <ClientsStrip />
      <AgentsSection />
      <PatientJourney />
      <GoLive />
      <DataTrust />
      <Testimonials />
      <ClosingCTA />
      <DeferredLiveChat />
    </main>
  );
}
