import { config } from "dotenv";
config({ path: ".env.local" });

const MCP_URL = "https://questathon.aihackerscollective.com/api/public/mcp";

export function getCleanToken(): string {
  let token = process.env.AQ_TOKEN?.trim() || "";
  if (token.startsWith("yaq1.")) {
    token = token.slice(1);
  }
  return token;
}

async function main() {
  const token = getCleanToken();
  console.log("Token configured:", !!token, "Prefix:", token.slice(0, 8), "Length:", token.length);

  const payload = {
    jsonrpc: "2.0",
    id: Date.now(),
    method: "tools/call",
    params: {
      name: "get_my_accounts",
      arguments: {},
    },
  };

  console.log("Calling get_my_accounts at", new Date().toISOString());
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
  const text = await res.text();
  console.log("Body length:", text.length);
  console.log("Body preview:\n", text);
}

if (process.argv[1]?.endsWith("test-mcp.ts")) {
  main().catch(console.error);
}
