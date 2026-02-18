# Watchdog Anti-Freeze Skill

**Status:** Active | **Trigger:** No output for 90-120 seconds

---

## Purpose

Prevent indefinite hangs. Take action when commands stall.

---

## Trigger Condition

```
Command running → No output for 90-120 seconds → ACTIVATE
```

---

## Response Sequence (Mandatory)

### Step 1: Print Status
```
⏱️ WATCHDOG TRIGGERED
   Elapsed: 120s
   Command: <last command>
   Status: No output detected
```

### Step 2: Check Running Processes
```bash
ps aux | grep -E "(node|npm|python|java)" | grep -v grep
top -bn1 | head -20
```

### Step 3: Identify Stuck Process
- High CPU usage?
- Zombie process?
- Unresponsive?

### Step 4: Kill Stuck Process
```bash
pkill -f "node"
pkill -f "npm"
# or specific PID: kill -9 <PID>
```

### Step 5: Clean Environment
```bash
rm -rf node_modules/.cache  # if applicable
```

### Step 6: Retry Once
```
🔄 Retrying command...
<run same command again>
```

### Step 7: Report Result
```
✓ SUCCESS: Retry worked
✗ FAILED: Still stuck after retry
   → Escalate to user with options
```

---

## Heartbeat Mode (Active Work)

During long tasks, print every 60 seconds:
```
⏱️ [X min] Working: <current step>
📋 Last: <command>
🔄 Status: <what's happening>
➡️ Next: <next step>
```

---

## Anti-Freeze Checklist

- [ ] Detect silence at 90s
- [ ] Print status at 90s
- [ ] Check processes at 120s
- [ ] Kill if stuck
- [ ] Retry once
- [ ] Report result
- [ ] Never loop infinitely

---

## Example

```
User: Build the website

[Running npm run build...]
[90 seconds - no output]

⏱️ WATCHDOG TRIGGERED
   Elapsed: 90s
   Command: npm run build
   Status: No output

[120 seconds - still no output]

🔍 Checking processes...
   node: PID 1234, CPU 99%, TIME 2:00 ← STUCK

💀 Killing stuck process...
   pkill -f "node"

🧹 Cleaning environment...
   rm -rf .next/cache

🔄 Retrying...
   npm run build

✓ SUCCESS: Build completed in 45s
```

---

## Integration

Used by **Execution Protocol** as sub-component.
Standalone for simple watchdog needs.
