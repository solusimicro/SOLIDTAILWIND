cat > update.sh <<'EOF'
#!/bin/bash
# ---- Auto Update & Deploy Script ----

# Stop on error
set -e

echo "🔄 Pulling latest changes..."
git pull origin main

echo "📦 Installing dependencies..."
npm install

echo "🏗️ Building project..."
npm run build

echo "🚀 Deploying to GitHub Pages..."
npm run deploy

echo "✅ Done!"
EOF

