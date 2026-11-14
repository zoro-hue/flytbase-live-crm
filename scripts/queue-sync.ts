import { config } from "dotenv";
config({ path: ".env.local" });
import fs from "fs";
import path from "path";
import { getCleanToken } from "./test-mcp";

const MCP_URL = "https://questathon.aihackerscollective.com/api/public/mcp";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function callMCP(name: string, args: Record<string, unknown> = {}) {
  const token = getCleanToken();
  const payload = {
    jsonrpc: "2.0",
    id: Date.now(),
    method: "tools/call",
    params: {
      name,
      arguments: args,
    },
  };

  console.log(`[${new Date().toISOString()}] Calling tool "${name}" with args:`, JSON.stringify(args));
  const res = await fetch(MCP_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json, text/event-stream",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  }

  const json = await res.json();
  if (json.error || json.result?.isError) {
    console.error("MCP Error response:", json.error || json.result);
    return null;
  }

  const rawText = json.result?.content?.[0]?.text;
  if (!rawText) return json.result;

  try {
    return JSON.parse(rawText);
  } catch {
    return rawText;
  }
}

async function main() {
  const dataDir = path.join(process.cwd(), "data", "mcp");
  fs.mkdirSync(dataDir, { recursive: true });

  const queue = [
    { name: "get_all_paperwork", args: { account: "A" }, file: "paperwork_A.json" },
    { name: "get_all_paperwork", args: { account: "B" }, file: "paperwork_B.json" },
    { name: "get_flytbase_team", args: {}, file: "team.json" },
    { name: "list_notes", args: {}, file: "notes.json" },
    { name: "get_file", args: { id: "flight_log_by_plant" }, file: "file_flight_log_by_plant.json" },
    { name: "get_file", args: { id: "support_ticket_history" }, file: "file_support_ticket_history.json" },
    { name: "get_file", args: { id: "roi_spreadsheet" }, file: "file_roi_spreadsheet.json" },
    { name: "get_file", args: { id: "flight_log_force_month" }, file: "file_flight_log_force_month.json" },
    { name: "get_file", args: { id: "dataflow_pack" }, file: "file_dataflow_pack.json" },
    { name: "get_file", args: { id: "draft_tender_spec" }, file: "file_draft_tender_spec.json" },
    { name: "get_file", args: { id: "clarification_template" }, file: "file_clarification_template.json" },
    { name: "get_file", args: { id: "helicopter_cost_overtime" }, file: "file_helicopter_cost_overtime.json" },
  ];

  for (const item of queue) {
    const destPath = path.join(dataDir, item.file);
    if (fs.existsSync(destPath)) {
      console.log(`Skipping ${item.file} - already cached.`);
      continue;
    }

    try {
      const result = await callMCP(item.name, item.args);
      if (result) {
        fs.writeFileSync(destPath, typeof result === "string" ? result : JSON.stringify(result, null, 2));
        console.log(`Successfully saved ${item.file}`);
      }
    } catch (err: any) {
      console.error(`Error fetching ${item.name}:`, err.message);
    }

    console.log("Sleeping 65s to strictly respect the 1-call-per-minute rate limit...");
    await sleep(65000);
  }

  console.log("Queue processing complete!");
}

main().catch(console.error);
