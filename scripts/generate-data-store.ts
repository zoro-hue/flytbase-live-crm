import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data", "mcp");

function readJsonSafe(filename: string) {
  const p = path.join(DATA_DIR, filename);
  if (fs.existsSync(p)) {
    try {
      return JSON.parse(fs.readFileSync(p, "utf-8"));
    } catch {}
  }
  return null;
}

const accountsData = readJsonSafe("get_my_accounts.json");
const paperworkA = readJsonSafe("paperwork_A.json");
const paperworkB = readJsonSafe("paperwork_B.json");
const teamData = readJsonSafe("team.json");
const notesData = readJsonSafe("notes.json");
const signalsData = readJsonSafe("get_signals.json");

const files = {
  flight_log_by_plant: readJsonSafe("file_flight_log_by_plant.json"),
  support_ticket_history: readJsonSafe("file_support_ticket_history.json"),
  roi_spreadsheet: readJsonSafe("file_roi_spreadsheet.json"),
  flight_log_force_month: readJsonSafe("file_flight_log_force_month.json"),
  dataflow_pack: readJsonSafe("file_dataflow_pack.json"),
  draft_tender_spec: readJsonSafe("file_draft_tender_spec.json"),
  clarification_template: readJsonSafe("file_clarification_template.json"),
  helicopter_cost_overtime: readJsonSafe("file_helicopter_cost_overtime.json"),
};

const fileContent = `// Auto-generated persistent Questathon MCP snapshot
// Compiled from real MCP server responses

export const MCP_ACCOUNTS_SNAPSHOT = ${JSON.stringify(accountsData, null, 2)};

export const MCP_PAPERWORK_A_SNAPSHOT = ${JSON.stringify(paperworkA, null, 2)};

export const MCP_PAPERWORK_B_SNAPSHOT = ${JSON.stringify(paperworkB, null, 2)};

export const MCP_TEAM_SNAPSHOT = ${JSON.stringify(teamData, null, 2)};

export const MCP_NOTES_SNAPSHOT = ${JSON.stringify(notesData, null, 2)};

export const MCP_SIGNALS_SNAPSHOT = ${JSON.stringify(signalsData, null, 2)};

export const MCP_FILES_SNAPSHOT: Record<string, any> = ${JSON.stringify(files, null, 2)};
`;

fs.writeFileSync(path.join(process.cwd(), "src", "lib", "data", "mcp-store.ts"), fileContent, "utf-8");
console.log("Successfully generated src/lib/data/mcp-store.ts!");
