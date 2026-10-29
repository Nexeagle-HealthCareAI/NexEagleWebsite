// Live NexEagle sites. Only facts the customer has agreed to share go here.
// When a site gives us numbers or a quote (with written permission), fill `story` and the
// Customers page shows it automatically. Never invent or estimate these.

export type CustomerId = "sparsh" | "glisan" | "agsmart";

export type Customer = {
  id: CustomerId;
  name: string;
  place?: string; // town; leave out if not confirmed
  state?: string;
  type: string;
  url: string;
  logo?: string;
  initials: string;
  story?: {
    profile?: string; // e.g. "60 beds, 8 departments"
    since?: string; // e.g. "March 2025"
    uses?: string[]; // e.g. ["1HMS", "1Rad"]
    before?: string;
    after?: string;
    metrics?: { label: string; before: string; after: string }[];
    quote?: { text: string; name: string; role: string };
  };
};

export const CUSTOMERS: Customer[] = [
  {
    id: "sparsh",
    name: "Sparsh Hospital",
    place: "Kishanganj",
    state: "Bihar",
    type: "Hospital",
    url: "https://sparshhospitalkishanganj.com/",
    logo: "/assets/sparsh_logo_resized.png",
    initials: "SH",
  },
  {
    id: "glisan",
    name: "Glisan Super Speciality Hospital",
    place: "Purnea",
    state: "Bihar",
    type: "Super speciality hospital",
    url: "https://www.facebook.com/p/Glisan-Super-Speciality-Hospital-Purnea-61576274793889/",
    initials: "GS",
  },
  {
    id: "agsmart",
    name: "AG Smart Scan Diagnostic Centre",
    type: "Diagnostics and imaging",
    url: "https://share.google/2ADNkQXtrRt4w6ewv",
    initials: "AG",
  },
];
