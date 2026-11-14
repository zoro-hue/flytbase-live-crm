import fs from "fs";
import path from "path";
import { callMcpTool } from "./client";

const STATE_FILE = path.join(process.cwd(), "data", "mcp_rate_state.json");
const RATE_LIMIT_INTERVAL_MS = 60000; // 1 call per minute

interface RateState {
  lastCallTime: number;
  lastTool: string | null;
  totalCalls: number;
}

function loadState(): RateState {
  try {
    if (fs.existsSync(STATE_FILE)) {
      return JSON.parse(fs.readFileSync(STATE_FILE, "utf-8"));
    }
  } catch {}
  return { lastCallTime: 0, lastTool: null, totalCalls: 0 };
}

function saveState(state: RateState) {
  try {
    const dir = path.dirname(STATE_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
  } catch (err) {
    console.error("Failed to save rate limit state:", err);
  }
}

// In-memory queue
type QueueTask = {
  id: string;
  tool: string;
  args: Record<string, unknown>;
  resolve: (value: any) => void;
  reject: (reason?: any) => void;
  enqueuedAt: number;
};

class McpRateLimiter {
  private queue: QueueTask[] = [];
  private isProcessing = false;

  public getStatus() {
    const state = loadState();
    const now = Date.now();
    const elapsed = now - state.lastCallTime;
    const timeUntilNextMs = Math.max(0, RATE_LIMIT_INTERVAL_MS - elapsed);

    return {
      lastCallTime: state.lastCallTime ? new Date(state.lastCallTime).toISOString() : null,
      lastTool: state.lastTool,
      totalCalls: state.totalCalls,
      canCallNow: elapsed >= RATE_LIMIT_INTERVAL_MS,
      timeUntilNextMs,
      nextPermittedTime: new Date(now + timeUntilNextMs).toISOString(),
      queueLength: this.queue.length,
    };
  }

  public async executeTool<T = any>(
    tool: string,
    args: Record<string, unknown> = {},
    options: { bypassQueueIfReady?: boolean } = {}
  ): Promise<T> {
    const status = this.getStatus();

    if (status.canCallNow && this.queue.length === 0 && options.bypassQueueIfReady) {
      return this.doCall<T>(tool, args);
    }

    // Deduplicate if identical tool & args are already queued
    const reqKey = `${tool}:${JSON.stringify(args)}`;
    const existing = this.queue.find((q) => `${q.tool}:${JSON.stringify(q.args)}` === reqKey);
    if (existing) {
      return new Promise<T>((resolve, reject) => {
        const origResolve = existing.resolve;
        const origReject = existing.reject;
        existing.resolve = (val) => {
          origResolve(val);
          resolve(val);
        };
        existing.reject = (err) => {
          origReject(err);
          reject(err);
        };
      });
    }

    return new Promise<T>((resolve, reject) => {
      this.queue.push({
        id: Math.random().toString(36).substring(7),
        tool,
        args,
        resolve,
        reject,
        enqueuedAt: Date.now(),
      });
      this.processQueue();
    });
  }

  private async processQueue() {
    if (this.isProcessing) return;
    this.isProcessing = true;

    while (this.queue.length > 0) {
      const state = loadState();
      const elapsed = Date.now() - state.lastCallTime;
      const waitMs = Math.max(0, RATE_LIMIT_INTERVAL_MS - elapsed);

      if (waitMs > 0) {
        await new Promise((r) => setTimeout(r, waitMs));
      }

      const task = this.queue.shift();
      if (!task) break;

      try {
        const result = await this.doCall(task.tool, task.args);
        task.resolve(result);
      } catch (err) {
        task.reject(err);
      }
    }

    this.isProcessing = false;
  }

  private async doCall<T>(tool: string, args: Record<string, unknown>): Promise<T> {
    const state = loadState();
    const result = await callMcpTool<T>(tool, args);

    state.lastCallTime = Date.now();
    state.lastTool = tool;
    state.totalCalls = (state.totalCalls || 0) + 1;
    saveState(state);

    return result;
  }
}

export const mcpLimiter = new McpRateLimiter();
