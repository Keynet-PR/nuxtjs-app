#! /bin/bash
set -e
echo "Deploy start..."
# Pull the lastest version of app
git pull origin main

echo "New change copied to server!."
echo "Install depencies..."
pnpm install
echo "Creating Production build..."
pnpm build
echo "PM2 Reload"
pm2 restart -a nuxtjsapp
echo "Deploy completed..."