import type { Metadata } from "next";
import TeamPage from "@/components/site/TeamPage";

export const metadata: Metadata = {
  title: "Product & engineering",
  description: "The people designing and building NexEagle's products and setting them up in hospitals.",
  alternates: { canonical: "/team/product-design" },
};

export default function Page() {
  return <TeamPage only="Product & engineering" title="Product & engineering" intro="The people designing and building NexEagle's products and setting them up in hospitals." />;
}
