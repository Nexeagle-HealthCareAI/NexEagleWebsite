#!/usr/bin/env bash
# Idempotent nginx provisioning for the NexEagle UI (port 8080).
#
# Runs ON the VM, invoked by the GitHub Actions deploy workflow. Expects
# nexeagle.conf to sit in the same directory as this script (both are uploaded
# together). Safe to run on every deploy — it only ever ensures the desired
# state and leaves any other site (e.g. the UI on port 80) untouched.
set -euo pipefail

HERE="$(cd "$(dirname "$0")" && pwd)"

# Use sudo only when not already root (the VM logs in as root, so usually a no-op).
SUDO=""
if [ "$(id -u)" -ne 0 ]; then
  SUDO="sudo"
fi

# Web root (kept in sync with DEPLOY_PATH in the workflow).
$SUDO mkdir -p /var/www/nexeagle

# Install / refresh the server block and enable it WITHOUT disabling other sites.
$SUDO cp "$HERE/nexeagle.conf" /etc/nginx/sites-available/nexeagle
$SUDO ln -sf /etc/nginx/sites-available/nexeagle /etc/nginx/sites-enabled/nexeagle

# Validate config, then hot-reload (no downtime for the other site).
$SUDO nginx -t
$SUDO systemctl reload nginx

# Open port 8080 in the VM's host firewall if one is active. This is an
# E2E-network VM (not Azure), so the firewall is local (ufw/firewalld), not a
# cloud NSG. No-op when no firewall is running.
if command -v ufw >/dev/null 2>&1 && $SUDO ufw status 2>/dev/null | grep -q "Status: active"; then
  $SUDO ufw allow 8080/tcp || true
elif command -v firewall-cmd >/dev/null 2>&1 && $SUDO firewall-cmd --state 2>/dev/null | grep -q running; then
  $SUDO firewall-cmd --permanent --add-port=8080/tcp || true
  $SUDO firewall-cmd --reload || true
fi

echo "nginx provisioned: NexEagle served on :8080 from /var/www/nexeagle"
