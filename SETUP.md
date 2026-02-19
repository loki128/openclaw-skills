# OpenClaw Setup Guide

## Quick Setup on New PC

### 1. Download and Run Setup Script

```bash
# Download
curl -O https://raw.githubusercontent.com/loki128/openclaw-skills/main/setup-openclaw.sh

# Make executable
chmod +x setup-openclaw.sh

# Run
./setup-openclaw.sh
```

### 2. Manual Setup (if script fails)

**Install Node.js 20+:**
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```

**Install OpenClaw:**
```bash
sudo npm install -g openclaw
```

**Configure:**
```bash
openclaw configure
```

### 3. Start OpenClaw

```bash
# Start gateway
openclaw gateway start

# Or as daemon
openclaw gateway start --daemon
```

### 4. Connect Chat Client

- **Web UI:** http://127.0.0.1:18789
- **WebSocket:** ws://127.0.0.1:18789

## Your Files

After setup, your files are at:
- **Workspace:** `~/.openclaw/workspace`
- **Config:** `~/.openclaw/openclaw.json`

## Restore Your Projects

```bash
cd ~/.openclaw/workspace
git clone https://github.com/loki128/openclaw-skills.git .
```