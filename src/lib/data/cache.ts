import {
  MCP_ACCOUNTS_SNAPSHOT,
  MCP_PAPERWORK_A_SNAPSHOT,
  MCP_PAPERWORK_B_SNAPSHOT,
  MCP_FILES_SNAPSHOT,
  MCP_SIGNALS_SNAPSHOT,
  MCP_TEAM_SNAPSHOT,
  MCP_NOTES_SNAPSHOT,
} from "./mcp-store";

export function getMcpAccountsRaw(): any {
  if (typeof window === "undefined") {
    try {
      const fs = require("fs");
      const path = require("path");
      const p = path.join(process.cwd(), "data", "mcp", "get_my_accounts.json");
      if (fs.existsSync(p)) {
        return JSON.parse(fs.readFileSync(p, "utf-8"));
      }
    } catch {}
  }
  return MCP_ACCOUNTS_SNAPSHOT;
}

export function getMcpPaperwork(account: "A" | "B"): any {
  if (typeof window === "undefined") {
    try {
      const fs = require("fs");
      const path = require("path");
      const p = path.join(process.cwd(), "data", "mcp", `paperwork_${account}.json`);
      if (fs.existsSync(p)) {
        return JSON.parse(fs.readFileSync(p, "utf-8"));
      }
    } catch {}
  }
  return account === "A" ? MCP_PAPERWORK_A_SNAPSHOT : MCP_PAPERWORK_B_SNAPSHOT;
}

export function getMcpFile(id: string): any {
  if (typeof window === "undefined") {
    try {
      const fs = require("fs");
      const path = require("path");
      const p = path.join(process.cwd(), "data", "mcp", `file_${id}.json`);
      if (fs.existsSync(p)) {
        return JSON.parse(fs.readFileSync(p, "utf-8"));
      }
    } catch {}
  }
  return MCP_FILES_SNAPSHOT[id] || null;
}

export function getMcpSignalsRaw(): any {
  if (typeof window === "undefined") {
    try {
      const fs = require("fs");
      const path = require("path");
      const p = path.join(process.cwd(), "data", "mcp", "get_signals.json");
      if (fs.existsSync(p)) {
        return JSON.parse(fs.readFileSync(p, "utf-8"));
      }
    } catch {}
  }
  return MCP_SIGNALS_SNAPSHOT;
}

export function getMcpTeam(): any {
  if (typeof window === "undefined") {
    try {
      const fs = require("fs");
      const path = require("path");
      const p = path.join(process.cwd(), "data", "mcp", "team.json");
      if (fs.existsSync(p)) {
        return JSON.parse(fs.readFileSync(p, "utf-8"));
      }
    } catch {}
  }
  return MCP_TEAM_SNAPSHOT;
}

export function getMcpNotes(): any {
  if (typeof window === "undefined") {
    try {
      const fs = require("fs");
      const path = require("path");
      const p = path.join(process.cwd(), "data", "mcp", "notes.json");
      if (fs.existsSync(p)) {
        return JSON.parse(fs.readFileSync(p, "utf-8"));
      }
    } catch {}
  }
  return MCP_NOTES_SNAPSHOT;
}

export function getUserNotes(): any[] {
  if (typeof window === "undefined") {
    try {
      const fs = require("fs");
      const path = require("path");
      const p = path.join(process.cwd(), "data", "user_notes.json");
      if (fs.existsSync(p)) {
        return JSON.parse(fs.readFileSync(p, "utf-8"));
      }
    } catch {}
  }
  return [];
}

export function saveUserNote(note: {
  id: string;
  account?: string;
  kind?: string;
  title?: string;
  text: string;
  createdAt: string;
  syncedToMcp: boolean;
  mcpId?: string;
}) {
  if (typeof window === "undefined") {
    try {
      const fs = require("fs");
      const path = require("path");
      const p = path.join(process.cwd(), "data", "user_notes.json");
      const notes = getUserNotes();
      notes.unshift(note);
      fs.writeFileSync(p, JSON.stringify(notes, null, 2));
    } catch {}
  }
  return note;
}

export function getUserActionOverrides(): Record<string, any> {
  if (typeof window === "undefined") {
    try {
      const fs = require("fs");
      const path = require("path");
      const p = path.join(process.cwd(), "data", "user_actions.json");
      if (fs.existsSync(p)) {
        return JSON.parse(fs.readFileSync(p, "utf-8"));
      }
    } catch {}
  }
  return {};
}

export function saveUserActionOverride(actionId: string, updates: Partial<{ status: string; owner: string; notes: string }>) {
  if (typeof window === "undefined") {
    try {
      const fs = require("fs");
      const path = require("path");
      const p = path.join(process.cwd(), "data", "user_actions.json");
      const current = getUserActionOverrides();
      current[actionId] = { ...(current[actionId] || {}), ...updates, updatedAt: new Date().toISOString() };
      fs.writeFileSync(p, JSON.stringify(current, null, 2));
      return current[actionId];
    } catch {}
  }
  return updates;
}

export function getSyncMetadata() {
  let lastSync: string | null = "2026-11-14T08:57:20.000Z";
  let cachedFilesCount = 14;

  if (typeof window === "undefined") {
    try {
      const fs = require("fs");
      const path = require("path");
      const dir = path.join(process.cwd(), "data", "mcp");
      const accPath = path.join(dir, "get_my_accounts.json");
      if (fs.existsSync(accPath)) {
        const stat = fs.statSync(accPath);
        lastSync = stat.mtime.toISOString();
      }
      if (fs.existsSync(dir)) {
        cachedFilesCount = fs.readdirSync(dir).length;
      }
    } catch {}
  }

  return {
    lastSync,
    cachedFilesCount,
    status: "connected",
  };
}
