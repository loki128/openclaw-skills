# Continuous Learning Loop (Fail→Fix→Save→Reuse)

**Status:** Active | **Trigger:** Automatic on failure

---

## Purpose

When any task fails or produces bad results, iterate intelligently, then permanently store what worked as a reusable method for future tasks.

---

## Triggers (Auto-Run)

- Command errors (non-zero exit, exception, tool failure)
- Output contains: error, failed, refused, timeout, 401/403, ENOTEMPTY, EPERM
- Task stalls >90 seconds with no progress
- User says: "stuck", "freezing", "not working", "try again", "fix it"

---

## Core Loop (Mandatory)

### 1) Detect Failure

Capture:
- Task goal
- Last action
- Full error text
- Environment details (OS, versions)

Summarize failure in 1 sentence.

### 2) Classify Failure Type

Choose exactly one:
- **A)** Config/schema/validation
- **B)** Dependency install/build
- **C)** Runtime bug
- **D)** Network/API/auth
- **E)** File permissions/locking
- **F)** Tool/agent idle/hang
- **G)** Unknown (needs evidence)

### 3) Generate 3 Minimal Safe Fixes (Ranked)

| Fix | Description |
|-----|-------------|
| **#1** | Smallest change with highest probability |
| **#2** | Alternative path (different command/tool) |
| **#3** | Reset path (clean state) — only if needed |

**Rules:**
- Never propose refactors as Fix #1
- Never delete user data; only build artifacts/caches

### 4-6) Execute & Verify

```
Execute Fix #1 → Verify → SUCCESS or FAIL?
If FAIL: Execute Fix #2 → Verify
If FAIL: Execute Fix #3 → Verify
```

### 7) If All 3 Fail

- Ask ONE unblocking question
- Provide exact next command(s) to run after answer

---

## Verification Rule

A fix is "real" only if it:
- [ ] Reproduces the failure before
- [ ] Fixes it now
- [ ] Passes sanity check (build runs / page loads / tests pass)

---

## Learning Capture (On Success)

### Method Card Format

```yaml
Title: <short name>
Problem Pattern: <how to recognize it next time>
Root Cause: <1 sentence>
Fix Steps:
  1) ...
  2) ...
Verification:
  - <how we confirmed it worked>
Prevention:
  - <how to avoid it in future>
Tags: <3-7 keywords>
```

### Reuse Behavior

Before attempting any fix:
1. Search memory/playbook for matching Problem Pattern/Tags
2. If match confidence ≥ 0.6, try saved method FIRST
3. If it fails, fall back to 3-fix loop

---

## Anti-Repeat Protection

- Do NOT repeat same command/fix twice unless something changed
- If repeating, state what changed (env, flags, deleted folder, new version)

---

## Communication Format

After every attempt:
```
What failed: <summary>
Attempted fix: <what was tried>
Result: <success/fail>
Next action: <what's next>
```

### Heartbeat (Long-Running Commands)

Every 5 minutes post:
```
⏱️ [X min elapsed] | Step: <current>
🔄 Waiting on: <what>
📋 Next fallback: <if this fails>
```

---

## Completion Outputs

- Final run steps (copy/paste)
- Files changed (if any)
- Method Cards saved
- "If it happens again" quick path

---

## Example Method Cards

### Card 1: Next.js Build Fail (TypeScript)
```yaml
Title: Next.js Framer Motion Type Error
Problem Pattern: "Type error: Type '{...}' is not assignable to type 'Variants'"
Root Cause: Framer Motion variants need 'as const' assertion for ease arrays
Fix Steps:
  1) Change ease: [0.22, 1, 0.36, 1] to ease: "easeOut" as const
  2) Or use string easings instead of arrays
Verification:
  - npm run build passes
  - Page loads with animations
Prevention:
  - Use string easings: "easeOut", "easeInOut"
  - Avoid cubic-bezier arrays in variants
Tags: nextjs, framer-motion, typescript, build-error, animation
```

### Card 2: Python Server Port Conflict
```yaml
Title: Python HTTP Server Port Already in Use
Problem Pattern: "OSError: [Errno 98] Address already in use"
Root Cause: Previous server process didn't terminate cleanly
Fix Steps:
  1) pkill -f "python3 -m http.server"
  2) sleep 1
  3) Restart server on same or different port
Verification:
  - curl http://localhost:PORT returns 200
Prevention:
  - Always kill existing servers before starting new ones
  - Use random/ephemeral ports when possible
Tags: python, http-server, port-conflict, process-management
```

---

## Quick Reference: Common Fixes by Type

| Type | Fix #1 | Fix #2 | Fix #3 |
|------|--------|--------|--------|
| **A) Config** | Check syntax, validate schema | Reset to default, reconfigure | Delete config, regenerate |
| **B) Dependency** | Clear cache, reinstall | Use alternative version | Clean install (delete node_modules) |
| **C) Runtime** | Add error handling | Check input data | Isolate minimal reproduction |
| **D) Network** | Retry with backoff | Check credentials/tokens | Use alternative endpoint |
| **E) Permissions** | Check ownership | chmod/chown appropriately | Run with elevated perms (careful) |
| **F) Hang** | Check process status | Kill and restart | Reboot environment |

---

## Integration with Other Skills

- **Execution Protocol:** Use watchdog timers, heartbeats
- **UI Engineer:** Follow minimal-fix, verify with build
- **System Architecture:** Apply circuit breaker on repeated failures
- **Database:** Check connection pools, timeouts

---

## Success Metrics

- Time to fix (target: <5 min for known issues)
- Fix success rate (target: >80% on first attempt)
- Method card reuse rate (target: >60%)
- User satisfaction (no repeated failures)
