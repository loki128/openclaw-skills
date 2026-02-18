# Rapid Hypothesis Testing

**Status:** Active | **Purpose:** Fast failure resolution

---

## When to Use

When stuck or something fails.

---

## The Method

```
Problem detected
    ↓
Generate 3 smallest possible fixes
    ↓
Rank by probability (highest first)
    ↓
Test Fix #1
    ↓
Works? → STOP ✓
Fails? → Test Fix #2
    ↓
Works? → STOP ✓
Fails? → Test Fix #3
    ↓
Works? → STOP ✓
Fails? → Ask user ONE question
```

---

## Rules

1. **Smallest possible** — Minimal change, minimal risk
2. **Rank fast** — Don't overthink probability
3. **Stop early** — First success = done
4. **No repeats** — Same fix only if something changed

---

## Example

```
Problem: Website won't load
Fix #1: Refresh page (90%)
Fix #2: Clear cache (70%)
Fix #3: Try different browser (50%)

Test #1: Refresh → Works? Done.
```

---

## vs. Continuous Learning Loop

| Rapid Testing | Continuous Learning |
|---------------|---------------------|
| Speed first | Learning first |
3 fixes max | 3 fixes + method cards |
No documentation | Saves solutions |
Good for: Quick blocks | Good for: Recurring issues |

---

## Use Rapid When

- First time seeing error
- Need answer in <2 minutes
- Low stakes (can revert)
- User waiting

## Use Continuous When

- Error repeats
- Complex system
- Need permanent fix
- Building knowledge base
