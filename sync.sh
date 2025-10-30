#!/bin/bash
# === Git Auto Sync Script ===
# Menarik update dari GitHub, lalu push perubahan lokal

echo "🔄 Menarik update terbaru dari GitHub..."
git pull origin main

echo "📦 Menambahkan semua perubahan..."
git add .

# Ambil pesan commit dari argumen, atau pakai default
msg=${1:-"sync update from $(hostname)"}

echo "📝 Commit dengan pesan: $msg"
git commit -m "$msg"

echo "☁️ Mengirim ke GitHub..."
git push origin main

echo "✅ Sinkronisasi selesai!"