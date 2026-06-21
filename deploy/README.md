# Deploying NexEagle to the E2E VM

The [`Deploy to E2E VM`](../.github/workflows/deploy-e2e.yml) GitHub Actions
workflow builds the site and ships it to a Linux VM that serves the static
files with nginx.

## Flow

```
push to main ──► GitHub Actions runner
                   ├─ npm ci
                   ├─ npm run build         → dist/
                   └─ rsync dist/ over SSH  → VM:/var/www/nexeagle-e2e
                                              └─ sudo systemctl reload nginx
```

- **Trigger:** every push to `main` (also runnable manually via
  *Actions → Deploy to E2E VM → Run workflow*).
- **Delivery:** `rsync -az --delete` mirrors `dist/` into the web root, so
  files removed from a build are removed on the VM too.

## One-time VM setup

Run these on the e2e VM (Ubuntu/Debian assumed).

### 1. Install nginx

```bash
sudo apt-get update && sudo apt-get install -y nginx rsync
```

### 2. Create a deploy user and web root

```bash
sudo adduser --disabled-password --gecos "" deploy
sudo mkdir -p /var/www/nexeagle-e2e
sudo chown -R deploy:deploy /var/www/nexeagle-e2e
```

### 3. Add the CI SSH key

Generate a dedicated key pair (on your machine, not the VM):

```bash
ssh-keygen -t ed25519 -f nexeagle-e2e-deploy -C "github-actions-e2e" -N ""
```

Put the **public** key on the VM:

```bash
sudo -u deploy mkdir -p /home/deploy/.ssh
sudo -u deploy tee -a /home/deploy/.ssh/authorized_keys < nexeagle-e2e-deploy.pub
sudo -u deploy chmod 700 /home/deploy/.ssh
sudo -u deploy chmod 600 /home/deploy/.ssh/authorized_keys
```

The **private** key (`nexeagle-e2e-deploy`) goes into the
`E2E_SSH_PRIVATE_KEY` GitHub secret (see below).

### 4. Allow the deploy user to reload nginx without a password

```bash
echo 'deploy ALL=(root) NOPASSWD: /bin/systemctl reload nginx' \
  | sudo tee /etc/sudoers.d/deploy-nginx
sudo chmod 440 /etc/sudoers.d/deploy-nginx
```

### 5. Install the nginx site config

```bash
sudo cp deploy/nginx/nexeagle-e2e.conf /etc/nginx/sites-available/nexeagle-e2e
sudo ln -sf /etc/nginx/sites-available/nexeagle-e2e /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default   # optional: drop the welcome page
sudo nginx -t && sudo systemctl reload nginx
```

Edit `server_name` / `root` in that file first if your hostname or path differ.

## GitHub secrets

Set these under **Settings → Secrets and variables → Actions**:

| Secret                 | Value                                                        |
| ---------------------- | ----------------------------------------------------------- |
| `E2E_SSH_PRIVATE_KEY`  | Contents of the private key file (`nexeagle-e2e-deploy`).   |
| `E2E_SSH_HOST`         | VM public IP or hostname.                                    |
| `E2E_SSH_USER`         | `deploy`                                                     |
| `E2E_SSH_PORT`         | *(optional)* SSH port if not `22`.                          |

> The web root path lives in the workflow as the `DEPLOY_PATH` env var
> (`/var/www/nexeagle-e2e`). Keep it in sync with the nginx `root`.

## Verifying a deploy

After a run completes, check the VM:

```bash
curl -I http://<host>/                 # 200, no-cache on the HTML shell
curl -I http://<host>/assets/<file>.js # 200 with immutable cache-control
ls -la /var/www/nexeagle-e2e           # files owned by deploy, fresh mtime
```

## Rollback

`dist/` is a fresh build each run, so to roll back just re-run the workflow
from the last good commit (Actions → pick the commit → Re-run), or revert the
offending commit on `main`.

## Hardening ideas (optional)

- **Atomic releases:** rsync into `releases/<sha>/` and flip a `current`
  symlink instead of writing into the live root, for zero-downtime swaps and
  instant rollback.
- **Pin the host key:** replace the runtime `ssh-keyscan` in the workflow with
  a checked-in/known-good host key to remove trust-on-first-use.
- **HTTPS:** run certbot (see the note at the bottom of the nginx conf).
- **Required reviewers:** add protection rules to the `e2e` GitHub
  *Environment* so deploys need approval.
