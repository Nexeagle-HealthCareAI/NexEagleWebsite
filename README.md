# NexEagle Website

The corporate / B2B site for NexEagle's healthcare product suite (1HMS, 1Rad, 1Lab, 1Pharma), as a
Next.js (App Router) app.

> **Doctor Dekho — the patient-facing doctor-booking portal — is no longer part of this app.** It
> was split out into its own repo, `DoctorDekhoWeb`, and now lives at
> `doctordekho.nexeagle.com` (dev: `doctordekho-dev.nexeagle.com`). This repo's git history up to
> the split still contains it.

| | Dev | Prod |
|---|---|---|
| Public URL | https://nexeagle-dev.nexeagle.com | https://nexeagle.com |
| Branch | `dev` | `main` |
| VM / host port | Dev VM `151.185.45.77` : `82` | Prod VM `151.185.45.67` : `8080` |
| Container | `nexeagle-website-dev` | `nexeagle-website` |

## Pages

`/` (home), `/products`, `/services`, `/solutions/{1hms,1rad,1lab,1pharma}`, `/why`,
`/how-it-works`, `/team` (+ leadership / engineering / healthcare / product-design), `/careers`,
`/contact`, `/ai`, `/faqs`, `/security`, `/privacy`, `/terms`.

## Redirects to Doctor Dekho — keep them

This domain used to serve Doctor Dekho at its root. Every old patient-portal path
(`/doctors/*`, `/specialties/*`, `/conditions/*`, `/hospitals/*`, `/labs/*`, `/health/*`,
`/appointments`, `/profile`, `/login`, `/api/og`, and `/?q=…`) permanently redirects (HTTP 308) to
the same path on Doctor Dekho — see `redirects()` in [`next.config.mjs`](next.config.mjs).
`/business` (the old corporate home) redirects to `/`.

**Do not remove these.** Printed hospital QR posters, WhatsApp-shared links and search-engine
results all still point at `nexeagle.com/doctors/...`.

`app/sw.js/route.ts` serves a self-destructing service worker at `/sw.js`. Before the split this
origin registered the Doctor Dekho PWA's service worker in visitors' browsers; this replacement
clears its caches and unregisters it so nobody keeps getting stale patient-portal pages. Leave it in
place for months.

## Tech stack

Next.js 14 (App Router) · React 18 · TypeScript · Tailwind CSS + shadcn/ui (brand colors are CSS
custom properties — `--brand-navy`, `--brand-teal`, `--brand-sky`, `--brand-iris` — wired into
`tailwind.config.ts`) · framer-motion · `@microsoft/signalr` (live chat) · Inter + Poppins.

## Environment variables

See `.env.example` for the annotated list.

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | Yes (for chat) | Origin of the CMS API backing the live-chat SignalR hub. `NEXT_PUBLIC_`-prefixed and inlined at **build** time. |
| `NEXT_PUBLIC_SITE_URL` | Build-time | This deployment's own origin (canonical URLs, sitemap, JSON-LD; non-prod origins are `noindex`). Defaults to `https://nexeagle.com`. |
| `NEXT_PUBLIC_DOCTORDEKHO_URL` | Build-time | The Doctor Dekho origin: the "Find a Doctor" nav link and every redirect above. Defaults to `https://doctordekho.nexeagle.com`. |
| `EASYHMS_API_BASE_URL` | Runtime | EasyHMS public API root, used only by the page-view beacon (`app/api/track-visit`). |
| `EASYHMS_API_KEY` / `_HEADER`, `EASYHMS_TRUSTED_PROXY_SECRET` | No | Optional API-key identification / real-visitor-IP forwarding. Server-side only. |

`next build` always loads `.env.production`, so the dev image would silently redirect to *prod*
Doctor Dekho unless `deploy.yml` passes the dev origins as Docker build-args — it does; don't
remove them.

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run start    # Node server — see Dockerfile
```

## Deployment

`.github/workflows/deploy.yml`: on push, builds a Docker image and pushes it to GHCR, then deploys
via SSH (dev branch → Dev VM, main → Prod VM). HTTPS for both hostnames is terminated by the
Caddy reverse proxy already running on each VM.

## Notes

- Package manager: `npm` (`package-lock.json` is the lockfile in use).
- Contact form (`app/contact/contact-client.tsx`) posts client-side straight to
  `https://formsubmit.co/ajax/info@nexeagle.com` (allowed in the CSP's `connect-src`).
