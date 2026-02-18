// Cost tracking and progress visualization

interface APICall {
  service: string;
  model: string;
  inputTokens: number;
  outputTokens: number;
  cost?: number;
  timestamp: Date;
}

interface CostRates {
  [key: string]: {
    input: number;   // per 1M tokens
    output: number;  // per 1M tokens
  };
}

// USD per 1M tokens
const RATES: CostRates = {
  'openai/gpt-4': { input: 30, output: 60 },
  'openai/gpt-4-turbo': { input: 10, output: 30 },
  'openai/gpt-3.5-turbo': { input: 0.5, output: 1.5 },
  'anthropic/claude-3-opus': { input: 15, output: 75 },
  'anthropic/claude-3-sonnet': { input: 3, output: 15 },
  'anthropic/claude-3-haiku': { input: 0.25, output: 1.25 },
  'kimi/k2.5': { input: 0, output: 0 }, // Local - $0
};

class CostTracker {
  private calls: APICall[] = [];
  private sessionStart: Date = new Date();

  addCall(call: Omit<APICall, 'timestamp'>): void {
    const fullCall: APICall = {
      ...call,
      timestamp: new Date(),
    };
    
    if (!fullCall.cost) {
      fullCall.cost = this.calculateCost(fullCall);
    }
    
    this.calls.push(fullCall);
    this.display();
  }

  private calculateCost(call: APICall): number {
    const key = `${call.service}/${call.model}`.toLowerCase();
    const rates = RATES[key] || { input: 0, output: 0 };
    
    const inputCost = (call.inputTokens / 1_000_000) * rates.input;
    const outputCost = (call.outputTokens / 1_000_000) * rates.output;
    
    return inputCost + outputCost;
  }

  getTotalCost(): number {
    return this.calls.reduce((sum, c) => sum + (c.cost || 0), 0);
  }

  getStats() {
    const total = this.getTotalCost();
    const calls = this.calls.length;
    const duration = Math.floor((Date.now() - this.sessionStart.getTime()) / 1000);
    
    return { total, calls, duration };
  }

  display(): void {
    const { total, calls, duration } = this.getStats();
    const mins = Math.floor(duration / 60);
    const secs = duration % 60;
    
    console.log(
      `💰 $${total.toFixed(4)} | ${calls} calls | ${mins}m ${secs}s`
    );
  }

  // Get formatted string for embedding in responses
  getIndicator(): string {
    const { total, calls } = this.getStats();
    return `💰 $${total.toFixed(3)} · ${calls} calls`;
  }
}

// Progress Bar
class ProgressBar {
  private totalSteps: number = 0;
  private currentStep: number = 0;
  private taskName: string = '';
  private completedSteps: string[] = [];
  private currentTask: string = '';

  start(taskName: string, totalSteps: number): void {
    this.taskName = taskName;
    this.totalSteps = totalSteps;
    this.currentStep = 0;
    this.completedSteps = [];
    this.render();
  }

  step(completedTask: string): void {
    this.currentStep++;
    this.completedSteps.push(completedTask);
    this.render();
  }

  setCurrent(task: string): void {
    this.currentTask = task;
    this.render();
  }

  complete(): void {
    this.currentStep = this.totalSteps;
    this.render();
    console.log(`✅ ${this.taskName} complete!`);
  }

  private render(): void {
    const pct = Math.min(100, Math.round((this.currentStep / this.totalSteps) * 100));
    const filled = Math.round((pct / 100) * 20);
    const empty = 20 - filled;
    const bar = '█'.repeat(filled) + '░'.repeat(empty);
    
    console.clear?.();
    console.log(`${bar}  ${pct}%  [${this.currentStep}/${this.totalSteps}] ${this.taskName}`);
    
    this.completedSteps.forEach(s => console.log(`  ✓ ${s}`));
    if (this.currentTask && this.currentStep < this.totalSteps) {
      console.log(`  ⏳ ${this.currentTask}`);
    }
  }

  // Compact format for chat
  getCompact(): string {
    const pct = Math.min(100, Math.round((this.currentStep / this.totalSteps) * 100));
    const filled = Math.round((pct / 100) * 10);
    const bar = '█'.repeat(filled) + '░'.repeat(10 - filled);
    return `[${bar}] ${pct}% (${this.currentStep}/${this.totalSteps})`;
  }
}

// Singleton instances
export const costTracker = new CostTracker();
export const progressBar = new ProgressBar();

// Quick display helpers
export function showStatus(costMsg?: string, progressMsg?: string): string {
  const parts: string[] = [];
  
  if (costMsg) parts.push(costMsg);
  if (progressMsg) parts.push(progressMsg);
  
  return parts.join(' | ');
}
