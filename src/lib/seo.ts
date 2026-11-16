import type { Metadata } from "next";

// Social-share tags for a page. Next.js replaces a parent's openGraph/twitter objects wholesale
// rather than merging them, so a page that sets only `title` would otherwise share the layout's
// homepage title, description and URL on WhatsApp, LinkedIn and X.
export function shareMeta(path: string, title: string, description: string): Pick<Metadata, "openGraph" | "twitter"> {
  return {
    openGraph: {
      title,
      description,
      url: path,
      siteName: "NexEagle",
      images: [{ url: "/og/home.png", width: 1200, height: 630, alt: "NexEagle Vita AI agents for hospitals in India" }],
      locale: "en_IN",
      type: "website",
    },
    twitter: { card: "summary_large_image", title, description, images: ["/og/home.png"] },
  };
}
