import fs from "fs";
import path from "path";

const dir = path.join(process.cwd(), "data", "mcp");
const pB = JSON.parse(fs.readFileSync(path.join(dir, "paperwork_B.json"), "utf-8"));

function getRec(p: any, filename: string) {
  return p.records?.find((r: any) => r.path?.endsWith(filename));
}

console.log("=== ACCOUNT B DEVICES ===");
const dev = getRec(pB, "devices.json");
console.log(JSON.stringify(dev?.data, null, 2));

console.log("\n=== ACCOUNT B USAGE WEEKLY (LAST 30 LINES) ===");
const usage = getRec(pB, "usage_weekly.csv");
const lines = usage?.text?.split("\n") || [];
console.log(lines.slice(0, 10).join("\n"));
console.log("...\n", lines.slice(-30).join("\n"));
