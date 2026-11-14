import fs from "fs";
import path from "path";

const dir = path.join(process.cwd(), "data", "mcp");
const pA = JSON.parse(fs.readFileSync(path.join(dir, "paperwork_A.json"), "utf-8"));
const pB = JSON.parse(fs.readFileSync(path.join(dir, "paperwork_B.json"), "utf-8"));

function findRecord(paperwork: any, pattern: string) {
  return paperwork.records?.find((r: any) => r.path?.includes(pattern));
}

console.log("=== ACCOUNT A TICKETS ===");
const tA = findRecord(pA, "tickets.json");
console.log(JSON.stringify(tA?.data || tA?.text, null, 2));

console.log("=== ACCOUNT A CALLS INDEX & RECENT CALLS ===");
const ciA = findRecord(pA, "calls_index.json");
console.log(JSON.stringify(ciA?.data || ciA?.text, null, 2));

console.log("=== ACCOUNT A INTERNAL NOTES ===");
const inA = findRecord(pA, "internal_notes.json");
console.log(JSON.stringify(inA?.data || inA?.text, null, 2));

console.log("=== ACCOUNT B TICKETS ===");
const tB = findRecord(pB, "tickets.json");
console.log(JSON.stringify(tB?.data || tB?.text, null, 2));

console.log("=== ACCOUNT B CALLS INDEX ===");
const ciB = findRecord(pB, "calls_index.json");
console.log(JSON.stringify(ciB?.data || ciB?.text, null, 2));

console.log("=== ACCOUNT B INTERNAL NOTES ===");
const inB = findRecord(pB, "internal_notes.json");
console.log(JSON.stringify(inB?.data || inB?.text, null, 2));
