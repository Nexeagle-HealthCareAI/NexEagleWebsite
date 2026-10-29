// Single source of truth for this deployment's public origin, and for the separate Doctor Dekho
// (patient-facing) site that this app links and redirects to.
//
// NEXT_PUBLIC_-prefixed on purpose: these are read from client components too (nav links), and
// Next only inlines NEXT_PUBLIC_* vars into the browser bundle -- at BUILD time, so they arrive as
// Docker build-args (see Dockerfile / deploy.yml), not `docker run -e`. Defaults are the
// PRODUCTION origins so a plain `next build` is prod-correct; the dev deploy overrides both.
const PROD_SITE_URL = "https://nexeagle.com";

const stripTrailingSlash = (u: string) => u.replace(/\/+$/, "");

/** This site's own public origin, e.g. https://nexeagle.com (no trailing slash). */
export const SITE_URL = stripTrailingSlash(process.env.NEXT_PUBLIC_SITE_URL || PROD_SITE_URL);

/** Doctor Dekho, the patient portal (a separate app + deployment), e.g. https://doctordekho.nexeagle.com. */
export const DOCTORDEKHO_URL = stripTrailingSlash(
  process.env.NEXT_PUBLIC_DOCTORDEKHO_URL || "https://doctordekho.nexeagle.com"
);

/** True only for the real production origin -- dev/preview deployments must not be indexed. */
export const IS_PRODUCTION_SITE = SITE_URL === PROD_SITE_URL;

/** The software itself, for the "Log in" menu, the footer and the product pages. Overridable per deployment. */
export const HMS_APP_URL = stripTrailingSlash(process.env.NEXT_PUBLIC_HMS_APP_URL || "https://1hms.nexeagle.com");
export const RAD_APP_URL = stripTrailingSlash(process.env.NEXT_PUBLIC_RAD_APP_URL || "https://1rad.nexeagle.com");

export const SOFTWARE = [
  { name: "1HMS Flow", line: "Hospital staff log in", href: HMS_APP_URL, dot: "bg-[#1ea99b]" },
  { name: "1Rad Flow", line: "Radiology centres log in", href: RAD_APP_URL, dot: "bg-[#1599db]" },
  { name: "Doctor Dekho", line: "Patients find and book a doctor", href: DOCTORDEKHO_URL, dot: "bg-[#f59e0b]" },
] as const;
