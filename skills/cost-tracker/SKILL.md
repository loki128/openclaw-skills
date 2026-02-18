# Cost & Progress Tracker

Tracks estimated API costs and task completion progress.

## Usage

```typescript
import { costTracker, progressBar } from './tracker';

// Track API calls
costTracker.addCall({
  service: 'openai',
  model: 'gpt-4',
  inputTokens: 1500,
  outputTokens: 800,
  cost: 0.045 // auto-calculated if not provided
});

// Show progress
progressBar.start('Building website', 5); // 5 steps
progressBar.step('Dependencies installed');
progressBar.step('Components created');
progressBar.complete();
```

## Cost Rates (USD)

| Service | Model | Input | Output |
|---------|-------|-------|--------|
| OpenAI | GPT-4 | $30/M | $60/M |
| OpenAI | GPT-3.5 | $0.5/M | $1.5/M |
| Anthropic | Claude 3 Opus | $15/M | $75/M |
| Anthropic | Claude 3 Sonnet | $3/M | $15/M |

## Output Format

```
💰 Session Cost: $0.047 | Calls: 12
████████████████████░░░░░  80%  [4/5] Building website
✓ Dependencies installed
✓ Components created  
⏳ Current: API integration...
```
