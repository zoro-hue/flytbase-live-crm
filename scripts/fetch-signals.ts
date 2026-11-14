import { config } from "dotenv";
config({ path: ".env.local" });
import fs from "fs";
import path from "path";
import { getCleanToken } from "./test-mcp";

const MCP_URL = "https://questathon.aihackerscollective.com/api/public/mcp";

async function main() {
  const token = getCleanToken();
  const payload = {
    jsonrpc: "2.0",
    id: Date.now(),
    method: "tools/call",
    params: {
      name: "get_signals",
      arguments: {},
    },
  };

  console.log("Calling get_signals at", new Date().toISOString());
  const res = await fetch(MCP_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json, text/event-stream",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  console.log("Status:", res.status, res.statusText);
  const json = await res.json();
  const rawText = json.result?.content?.[0]?.text;
  console.log("Raw text length:", rawText?.length);
  console.log("Is error:", json.result?.isError || json.error);

  let data = rawText;
  try {
    data = JSON.parse(rawText);
  } catch {}

  const outDir = path.join(process.cwd(), "data", "mcp");
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(
    path.join(outDir, "get_signals.json"),
    JSON.stringify({ response: data, fetchedAt: new Date().toISOString() }, null, 2)
  );
  console.log("Saved get_signals.json!");
  console.log("Signals data preview:\n", JSON.stringify(data, null, 2).slice(0, 1500));
}

main().catch(console.error);
