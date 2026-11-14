import fs from "fs";
import path from "path";

const dir = path.join(process.cwd(), "data", "mcp");
const pA = JSON.parse(fs.readFileSync(path.join(dir, "paperwork_A.json"), "utf-8"));
const pB = JSON.parse(fs.readFileSync(path.join(dir, "paperwork_B.json"), "utf-8"));

console.log("Account A Paperwork records count:", pA.records?.length);
pA.records?.forEach((r: any, idx: number) => {
  console.log(`  [A-${idx}] path: ${r.path}, kind: ${r.kind}, len: ${r.text?.length}`);
});

console.log("\nAccount B Paperwork records count:", pB.records?.length);
pB.records?.forEach((r: any, idx: number) => {
  console.log(`  [B-${idx}] path: ${r.path}, kind: ${r.kind}, len: ${r.text?.length}`);
});
