# ── Stage 1: Build ────────────────────────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
# Disable telemetry during build
ENV NEXT_TELEMETRY_DISABLED=1

# NEXT_PUBLIC_* vars are inlined into the client bundle at BUILD time, not read at container
# runtime — LiveChat.tsx (a "use client" component) reads NEXT_PUBLIC_API_URL to reach CMSAPI's
# /chathub SignalR endpoint, so it must arrive as a build-arg here, not a `docker run -e`.
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# This site's own origin, and the separate Doctor Dekho (patient portal) origin that the nav links
# to and that next.config.mjs redirects the old patient-portal paths to. `next build` always loads
# .env.production (Next.js runs every build in production mode) which carries the PROD origins —
# so without these, the dev image would silently redirect to / advertise prod. A real process env
# var set here takes precedence over .env.production. See src/lib/site.ts.
ARG NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_DOCTORDEKHO_URL
ENV NEXT_PUBLIC_DOCTORDEKHO_URL=$NEXT_PUBLIC_DOCTORDEKHO_URL

RUN npm run build

# ── Stage 2: Serve ────────────────────────────────────────────────────────────
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Copy built artifacts and necessary files
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Bind container port to 80 (deploy.yml maps host 8080 -> container 80)
EXPOSE 80
ENV PORT=80

CMD ["npm", "run", "start"]
