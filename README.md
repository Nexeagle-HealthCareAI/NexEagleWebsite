# NexEagle Website

A Next.js (App Router) site with two distinct halves living in the same app:

1. **Corporate / B2B site** — NexEagle's marketing site for its healthcare product suite
   (1HMS, 1Rad, 1Lab, 1Pharma): `/business` (home), `/products`, `/services`,
   `/solutions/{1hms,1rad,1lab,1pharma}`, `/why`, `/how-it-works`, `/team` (+ leadership /
   engineering / healthcare / product-design subpages), `/careers`, `/contact`, `/ai`, `/faqs`,
   `/security`, `/privacy`, `/terms`.
2. **Patient-facing doctor booking portal** ("Doctor Dekho") — mounted at the site root `/`,
   backed live by EasyHMS's public API: `/doctors/[doctorSlug]`, `/specialties/[specialty]`,
   `/conditions/[condition]`, `/hospitals/[hospital]`, city-targeted SEO variants
   (`/specialties/[specialty]/[city]`, `/conditions/[condition]/[city]`), `/appointments`,
   `/profile`.

`app/layout-wrapper.tsx` picks which chrome to render (`Navbar`/`Footer` for the corporate
routes, `PatientTopBar`/`PatientFooter` + bottom nav for the patient-portal routes) based on the
current path — there's no route-group split, just the one wrapper switching on `pathname`.

## Tech stack

- **Next.js 14** (App Router) + **React 18** + **TypeScript**
- **Tailwind CSS** + **shadcn/ui** (Radix primitives) — brand colors are CSS custom properties
  (`--brand-navy`, `--brand-teal`, `--brand-sky`, `--brand-iris`) wired into
  `tailwind.config.ts`, not hardcoded hex
- **framer-motion** for animation
- **@tanstack/react-query** with `@tanstack/react-query-persist-client` (offline-tolerant caching)
- **react-hook-form** + **zod** for forms
- **Serwist** (`@serwist/next`) — PWA service worker (`app/sw.ts`, `app/manifest.ts`)
- **@vercel/og** — dynamic OG image generation (`app/api/og`)
- **@microsoft/signalr** — live chat client (see `NEXT_PUBLIC_API_URL` below)
- i18n: English / Hindi / Bengali / Hinglish (`src/lib/i18n/dictionaries/`)
- Fonts: Inter + Poppins (`next/font/google`)

## Environment variables

See `.env.example` for the full annotated list. The essentials:

| Variable | Required | Purpose |
|---|---|---|
| `EASYHMS_API_BASE_URL` | Yes | Root of the EasyHMS public API that powers the patient portal (doctors, specialties, appointments). No trailing slash, no `/api` prefix. |
| `EASYHMS_API_KEY` / `EASYHMS_API_KEY_HEADER` | No | Optional — the public API works anonymously. Only set if this deployment's traffic needs to be identified/revocable separately. Server-side only, never `NEXT_PUBLIC_`. |
| `ANTHROPIC_API_KEY` | No | Powers the AI-assisted search fallback (`app/api/search/parse`) for free-text symptom queries. Leave blank to disable — search stays literal-keyword-only. |
| `NEXT_PUBLIC_API_URL` | Yes (for chat) | Origin of the CMS API backing the live-chat SignalR hub. Must be `NEXT_PUBLIC_`-prefixed and correct **before** `next build` — it's inlined into the client bundle at build time, not read at container start. |

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # run the production build (Node server — see Dockerfile)
npm run lint
```

This is a server-rendered Next.js app, not a static export — it needs a Node runtime.

## Deployment

`.github/workflows/deploy.yml`: on push, builds a Docker image (`Dockerfile`, multi-stage
`next build` → `next start`) and pushes it to GHCR, then deploys via SSH:

| Branch | Target | Host port |
|---|---|---|
| `dev` | Dev VM (`151.185.45.77`) | `8080` |
| `main` | Prod VM (`151.185.45.67`), `nexeagle.com` | `8080` |

Both VMs also run other EasyHMS-family services on different ports (e.g. 1Rad's `easyrad` UI on
port 80 on Prod) — see the workflow file for the exact `docker run` invocation and required
GitHub secrets.

## Notes

- Package manager: `npm` (`package-lock.json` is the lockfile in use).
- Contact form (`app/contact/contact-client.tsx`) posts client-side straight to
  `https://formsubmit.co/ajax/info@nexeagle.com` — no local `/api/contact` route involved.
