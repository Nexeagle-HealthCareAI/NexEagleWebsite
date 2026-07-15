# Mapping www.nexeagle.com to the Prod VM (HTTPS)

Scope: prod only, NexEagleWebsite only. The prod app VM (`151.185.45.67`) already
serves the site on `:8080` (see `.github/workflows/deploy.yml`'s `deploy-prod` job).
This maps `https://www.nexeagle.com` to that same container via a reverse proxy that
handles TLS — the app itself doesn't change.

Not in scope here: dev environment, easyHMSWeb, easyHMSAPI. Those keep using their
raw `http://IP:port` addresses for now.

## 1. DNS (GoDaddy)

In the GoDaddy DNS manager for `nexeagle.com` (Domains → nexeagle.com → DNS → Records
→ Add):

| Type | Name | Value          | TTL     |
|------|------|----------------|---------|
| A    | www  | 151.185.45.67  | 1 Hour  |

Optional but recommended — also point the bare domain at the same VM, so
`https://nexeagle.com` (no `www`) works too:

| Type | Name | Value          | TTL     |
|------|------|----------------|---------|
| A    | @    | 151.185.45.67  | 1 Hour  |

If `@` already has a record (e.g. GoDaddy's default parking page), replace it — don't
leave two conflicting A records for the same name.

DNS propagation is usually minutes with GoDaddy, but can take up to ~24h depending on
caching. Wait until `nslookup www.nexeagle.com` (or https://dnschecker.org) shows
`151.185.45.67` before continuing to step 2 — the certificate issuance in step 2 will
keep failing/retrying until DNS actually resolves.

## 2. Reverse proxy + automatic HTTPS on the Prod VM

Run once, via SSH into `151.185.45.67`. Uses [Caddy](https://caddyserver.com/) — it
requests and auto-renews a Let's Encrypt certificate on its own, no certbot/cron needed.

```bash
# Open the ports Caddy needs (80 for the ACME challenge + HTTP->HTTPS redirect, 443 for HTTPS)
ufw allow 80/tcp
ufw allow 443/tcp
# If the VM sits behind a cloud provider's security group/firewall UI (not just ufw),
# open 80/443 there too — this repo/session has no visibility into that layer.

mkdir -p /opt/caddy
cat > /opt/caddy/Caddyfile <<'EOF'
www.nexeagle.com, nexeagle.com {
    reverse_proxy localhost:8080
}
EOF

# --network host so "localhost:8080" reaches the NexEagleWebsite container's
# host-published port (it's run with `-p 8080:80`, not its own Docker network).
docker run -d --name caddy --restart unless-stopped \
  --network host \
  -v /opt/caddy/Caddyfile:/etc/caddy/Caddyfile \
  -v caddy_data:/data \
  -v caddy_config:/config \
  caddy:2
```

Check it worked:

```bash
docker logs caddy --tail 50
curl -I https://www.nexeagle.com
```

The first request after `docker run` may take a few seconds while Caddy completes the
ACME handshake with Let's Encrypt. If it fails, `docker logs caddy` will say why —
almost always either DNS not resolved yet (see step 1) or port 80/443 blocked upstream
of the VM.

## Notes

- This container is a one-time, manually-managed piece of infra — it isn't part of
  `deploy.yml`'s per-push pipeline, and doesn't need to be. It keeps running
  (`--restart unless-stopped`) across app redeploys of the `nexeagle-website` container
  underneath it; nothing about the existing deploy pipeline needs to change.
- Caddy auto-renews the certificate indefinitely; no further action needed after setup.
- The site remains reachable at `http://151.185.45.67:8080` directly too (unchanged) —
  this just adds a second, HTTPS-terminated way to reach the same container.
