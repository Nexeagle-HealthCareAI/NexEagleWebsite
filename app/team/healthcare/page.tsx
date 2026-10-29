import type { Metadata } from "next";
import TeamPage from "@/components/site/TeamPage";

export const metadata: Metadata = {
  title: "Medical & research",
  description: "The doctors and researchers who check every clinical workflow and validate how Vita performs on real clinical work.",
  alternates: { canonical: "/team/healthcare" },
};

export default function Page() {
  return <TeamPage only="Medical & research" title="Medical & research" intro="The doctors and researchers who check every clinical workflow and validate how Vita performs on real clinical work." />;
}
