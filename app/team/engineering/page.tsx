import type { Metadata } from "next";
import TeamPage from "@/components/site/TeamPage";

export const metadata: Metadata = {
  title: "Product & engineering",
  description: "The engineers building Vita AI agents, 1HMS, 1Rad, 1Lab and 1Pharma, and setting them up in hospitals.",
  alternates: { canonical: "/team/engineering" },
};

export default function Page() {
  return <TeamPage only="Product & engineering" title="Product & engineering" intro="The engineers building Vita AI agents, 1HMS, 1Rad, 1Lab and 1Pharma, and setting them up in hospitals." />;
}
