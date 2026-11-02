#!/usr/bin/env bash
# Pulls the latest code, builds it and reloads the site with zero downtime.
# Run on the server from the site folder:  bash scripts/deploy.sh
set -euo pipefail
cd "$(dirname "$0")/.."

echo "→ Fetching latest code"
git fetch --prune origin main
git reset --hard origin/main

echo "→ Installing packages"
npm ci --include=dev --no-audit --no-fund

echo "→ Building"
npm run build

echo "→ Reloading"
if pm2 describe zubairakbar-website >/dev/null 2>&1; then
  pm2 reload ecosystem.config.js --update-env
else
  pm2 start ecosystem.config.js
fi
pm2 save
echo "✓ Deployed $(git rev-parse --short HEAD)"
