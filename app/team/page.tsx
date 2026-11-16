import type { Metadata } from "next";
import { shareMeta } from "@/lib/seo";
import TeamPage from "@/components/site/TeamPage";
import { TEAM } from "@/lib/team";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "NexEagle Team: Doctors and Engineers | NexEagle" },
  description: "A urologist (MCh, SSKM) checking every clinical workflow, engineers from NIT Warangal and IIT Bombay, and the team that sets up 1HMS and 1Rad on site.",
  alternates: { canonical: "/team" },
  ...shareMeta("/team", "NexEagle Team: Doctors and Engineers | NexEagle", "A urologist (MCh, SSKM) checking every clinical workflow, engineers from NIT Warangal and IIT Bombay, and the team that sets up 1HMS and 1Rad on site."),
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  url: `${SITE_URL}/team`,
  mainEntity: {
    "@id": `${SITE_URL}/#organization`,
    "@type": "Organization",
    name: "NexEagle",
    member: TEAM.map((m) => ({ "@type": "Person", name: m.name, jobTitle: m.role, ...(m.linkedin ? { sameAs: [m.linkedin] } : {}) })),
  },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <TeamPage />
    </>
  );
}
