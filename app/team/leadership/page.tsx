import type { Metadata } from "next";
import TeamPage from "@/components/site/TeamPage";

export const metadata: Metadata = {
  title: "Founding team",
  description: "The founders guiding NexEagle: clinical experience and engineering, building hospital software together.",
  alternates: { canonical: "/team/leadership" },
};

export default function Page() {
  return <TeamPage only="Founding team" title="Founding team" intro="The founders guiding NexEagle: clinical experience and engineering, building hospital software together." />;
}
