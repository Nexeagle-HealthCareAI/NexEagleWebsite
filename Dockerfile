# ── Stage 1: Build ────────────────────────────────────────────────────────────
FROM node:20-alpine AS build
WORKDIR /app

COPY package.json ./
# Install without running postbuild (which copies Azure-specific config)
RUN npm install

COPY . .
# Use vite directly to skip the Azure staticwebapp postbuild step
RUN npx vite build

# ── Stage 2: Serve ────────────────────────────────────────────────────────────
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
