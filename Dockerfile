# ── Stage 1: Build ────────────────────────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
# Disable telemetry during build
ENV NEXT_TELEMETRY_DISABLED=1

# NEXT_PUBLIC_* vars are inlined into the client bundle at BUILD time, not read at container
# runtime — LiveChat.tsx (a "use client" component) reads this to reach CMSAPI's /chathub
# SignalR endpoint, so it must arrive as a build-arg here, not a `docker run -e`.
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# EASYHMS_API_BASE_URL is a runtime-only var everywhere else (read server-side per request via
# `docker run -e`, see deploy.yml) — EXCEPT for statically-generated pages (the
# /specialties/[specialty]/[city]/[area] tree, prerendered with getStaticProps), which fetch
# doctor data once at THIS build step, not at request time. `next build` always loads
# .env.production regardless of which environment's image is being built (Next.js runs every
# build in production mode), and .env.production hardcodes the PROD api url — so without this,
# every environment's static pages silently bake in prod's doctor data. Setting it as a real
# process env var here (before the build) takes precedence over .env.production, the same way
# NEXT_PUBLIC_API_URL above already does.
ARG EASYHMS_API_BASE_URL
ENV EASYHMS_API_BASE_URL=$EASYHMS_API_BASE_URL

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
