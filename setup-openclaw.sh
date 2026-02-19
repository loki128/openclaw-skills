#!/bin/bash
# OpenClaw Setup Script
# Run on new Ubuntu/Debian PC

set -e

echo "=== OpenClaw Setup Script ==="

# Check if running as root
if [ "$EUID" -eq 0 ]; then 
   echo "Please don't run as root"
   exit 1
fi

# Update system
echo "Updating system..."
sudo apt update && sudo apt upgrade -y

# Install Node.js 20
echo "Installing Node.js 20..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify Node.js
echo "Node version: $(node --version)"
echo "NPM version: $(npm --version)"

# Install OpenClaw globally
echo "Installing OpenClaw..."
sudo npm install -g openclaw

# Verify OpenClaw
echo "OpenClaw version: $(openclaw --version)"

# Create workspace directory
echo "Creating workspace..."
mkdir -p ~/.openclaw/workspace
cd ~/.openclaw/workspace

# Clone your repo (update this URL)
REPO_URL="https://github.com/loki128/openclaw-skills.git"
echo "Cloning your repo: $REPO_URL"
git clone "$REPO_URL" . 2>/dev/null || echo "Repo already exists or clone failed"

# Create basic config
echo "Creating initial config..."
cat > ~/.openclaw/openclaw.json << 'EOF'
{
  "workspace": "~/.openclaw/workspace",
  "model": "kimi-coding/k2p5",
  "gateway": {
    "mode": "local",
    "port": 18789,
    "bind": "loopback"
  },
  "web": {
    "fetchEnabled": true,
    "searchEnabled": false
  }
}
EOF

echo ""
echo "=== Setup Complete ==="
echo ""
echo "Next steps:"
echo "1. Restart your terminal or run: source ~/.bashrc"
echo "2. Configure OpenClaw: openclaw configure"
echo "3. Start the gateway: openclaw gateway start"
echo "4. Connect your chat client to: ws://127.0.0.1:18789"
echo ""
echo "Your workspace is at: ~/.openclaw/workspace"
echo "Your config is at: ~/.openclaw/openclaw.json"