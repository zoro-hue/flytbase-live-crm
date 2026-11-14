import fs from "fs";
import path from "path";

const dir = path.join(process.cwd(), "data", "mcp");
const pB = JSON.parse(fs.readFileSync(path.join(dir, "paperwork_B.json"), "utf-8"));
const flightsRec = pB.records?.find((r: any) => r.path?.endsWith("flights.csv"));
const lines = flightsRec?.text?.trim().split("\n") || [];

const counts: Record<string, number> = {};
for (let i = 1; i < lines.length; i++) {
  const parts = lines[i].split(",");
  const dock = parts[3];
  counts[dock] = (counts[dock] || 0) + 1;
}

console.log("Flight count per dock in flights.csv:");
for (const [d, c] of Object.entries(counts).sort((a,b) => b[1] - a[1])) {
  console.log(`  ${d}: ${c} flights`);
}
