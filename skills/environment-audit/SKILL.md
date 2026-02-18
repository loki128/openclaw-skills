# Environment Audit Skill

**Status:** Active | **Trigger:** Before any major action

---

## Purpose

Never operate blind. Confirm environment state before executing commands.

---

## Mandatory Checks

Run these **before** any major action:

### 1. Confirm OS
```bash
uname -a          # Linux/Mac
ver               # Windows
```

### 2. Confirm Node Version
```bash
node --version
npm --version
```

### 3. Confirm Directory
```bash
pwd
ls -la            # or dir on Windows
```

### 4. Confirm package.json
```bash
cat package.json  # exists? valid JSON?
```

### 5. Confirm Dependencies
```bash
ls node_modules   # exists?
cat package-lock.json  # or yarn.lock, pnpm-lock.yaml
```

---

## Audit Output Format

```
┌─ Environment Audit ─┐
│ OS:        Ubuntu 22.04
│ Node:      v20.11.0 ✓
│ Directory: /home/user/project ✓
│ package.json: ✓ Found
│ Lockfile:  package-lock.json ✓
│ node_modules: ✓ Present
└─ Status: READY ─────┘
```

---

## Red Flags (STOP and Fix)

| Issue | Action |
|-------|--------|
| Wrong directory | `cd` to correct path |
| No package.json | Confirm this is a Node project |
| No node_modules | Run `npm install` |
| Node version mismatch | Use nvm/nvm-windows to switch |
| Permission denied | Check ownership, use sudo if safe |

---

## Quick Commands

### Full Audit Script
```bash
echo "=== Environment Audit ==="
echo "OS: $(uname -s)"
echo "Node: $(node --version)"
echo "NPM: $(npm --version)"
echo "Directory: $(pwd)"
echo "package.json: $(test -f package.json && echo '✓' || echo '✗')"
echo "node_modules: $(test -d node_modules && echo '✓' || echo '✗')"
echo "========================"
```

---

## Integration

Use with **Execution Protocol** and **Continuous Learning**:

1. **Audit** → Check environment
2. **Execute** → Run command
3. **Detect** → Catch failures
4. **Fix** → Apply rapid or deep fix

---

## Example

```
User: "Build my website"

Me: Running environment audit...
  OS: Linux ✓
  Node: v18.17.0 ✓
  Directory: /workspace/website ✓
  package.json: ✓
  node_modules: ✗ MISSING

Me: node_modules not found. Running npm install first...
[installs dependencies]

Me: Audit complete. Building website...
[proceeds with build]
```
