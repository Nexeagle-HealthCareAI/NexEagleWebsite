# Deploying NexEagle (dev / prod VMs)

The [`Deploy (dev / prod)`](../.github/workflows/deploy.yml) GitHub Actions
workflow builds the site and ships it over SSH (password auth) to a Linux VM
that serves the static files with nginx.

## Branch -> VM routing

| Push to branch | GitHub Environment | Deploys to |
| -------------- | ------------------ | ---------- |
| `develop`      | `dev`              | Dev VM     |
| `main`         | `prod`             | Prod VM    |

```
push develop ─► runner ─ npm ci ─ npm run build ─► rsync dist/ (sshpass) ─► DEV  VM:/var/www/nexeagle
push main    ─► runner ─ npm ci ─ npm run build ─► rsync dist/ (sshpass) ─► PROD VM:/var/www/nexeagle
```

- **Trigger:** push to `develop` or `main` (also runnable manually via
  *Actions → Deploy (dev / prod) → Run workflow*; from `main` it targets prod,
  otherwise dev).
- **Delivery:** `rsync -az --delete` mirrors `dist/` into the web root.
- **No nginx reload needed:** nginx serves the swapped files on the next
  request. You only reload nginx when you change the conf itself.

## GitHub setup — Environments + secrets

Because dev and prod use the **same secret names with different values**,
create two **Environments** (not just repo secrets).

Go to **Settings → Environments → New environment**, create `dev` and `prod`,
and in **each** add:

**Secrets** (Environment secrets):

| Secret         | Value                                         |
| -------------- | --------------------------------------------- |
| `SSH_HOST`     | That environment's VM IP / hostname.          |
| `SSH_USER`     | SSH login user (e.g. `deploy`).               |
| `SSH_PASSWORD` | That user's SSH password.                     |
| `SSH_PORT`     | *(optional)* SSH port if not `22`.            |

**Variables** (Environment variables — optional):

| Variable      | Value / default                                       |
| ------------- | ----------------------------------------------------- |
| `DEPLOY_PATH` | Web root on that VM. Defaults to `/var/www/nexeagle`. |

> Tip: on the `prod` environment you can add **Required reviewers** so a
> deploy to production waits for approval.

## One-time VM setup (run on EACH VM)

Ubuntu/Debian assumed.

### 1. Install nginx + rsync

```bash
sudo apt-get update && sudo apt-get install -y nginx rsync
```

### 2. Make sure SSH password login is allowed

The workflow logs in with a password, so the VM's SSH server must allow it:

```bash
sudo sed -i 's/^#\?PasswordAuthentication.*/PasswordAuthentication yes/' /etc/ssh/sshd_config
sudo systemctl restart ssh
```

### 3. Create the deploy user + web root

```bash
sudo adduser deploy            # set the password you'll store in SSH_PASSWORD
sudo mkdir -p /var/www/nexeagle
sudo chown -R deploy:deploy /var/www/nexeagle
```

### 4. Install the nginx site config

```bash
sudo cp deploy/nginx/nexeagle.conf /etc/nginx/sites-available/nexeagle
sudo ln -sf /etc/nginx/sites-available/nexeagle /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default   # optional: drop the welcome page
sudo nginx -t && sudo systemctl reload nginx
```

Edit `server_name` (and `root` if you changed `DEPLOY_PATH`) in that file
first — `dev.nexeagle.com` on the dev VM, your prod hostname on the prod VM.

## Verifying a deploy

```bash
curl -I http://<host>/                 # 200, no-cache on the HTML shell
curl -I http://<host>/assets/<file>.js # 200 with immutable cache-control
ls -la /var/www/nexeagle               # files owned by deploy, fresh mtime
```

## Rollback

`dist/` is a fresh build each run, so roll back by re-running the workflow from
the last good commit (Actions → pick the commit → Re-run) or reverting the
offending commit on that branch.

## Security note (passwords vs keys)

Password auth is simpler but weaker than SSH keys (replayable, brute-forceable).
For production, prefer switching `SSH_PASSWORD` to an SSH **key**
(`SSH_PRIVATE_KEY`) and disabling `PasswordAuthentication`. The workflow's
`sshpass` step would then become a plain key-based `ssh`/`rsync`. Ask and I'll
swap it.

## Hardening ideas (optional)

- **Atomic releases:** rsync into `releases/<sha>/` and flip a `current`
  symlink for zero-downtime swaps + instant rollback.
- **HTTPS:** run certbot (see the note at the bottom of the nginx conf).
- **Pin host keys:** replace `StrictHostKeyChecking=accept-new` with a known
  `known_hosts` entry to remove trust-on-first-use.
