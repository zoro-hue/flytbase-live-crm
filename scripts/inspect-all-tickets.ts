import fs from "fs";
import path from "path";

const dir = path.join(process.cwd(), "data", "mcp");
const pA = JSON.parse(fs.readFileSync(path.join(dir, "paperwork_A.json"), "utf-8"));
const pB = JSON.parse(fs.readFileSync(path.join(dir, "paperwork_B.json"), "utf-8"));

function getRec(p: any, filename: string) {
  return p.records?.find((r: any) => r.path?.endsWith(filename));
}

console.log("=== ACCOUNT A ALL TICKETS ===");
const tA = getRec(pA, "tickets.json");
for (const t of tA?.data?.tickets || []) {
  console.log(`[${t.id}] (${t.status}) Date: ${t.opened} Requester: "${t.requester}" Subject: "${t.subject}" Assignee: "${t.assignee}"`);
}

console.log("\n=== ACCOUNT A REQUESTS.CSV ===");
const rA = getRec(pA, "requests.csv");
console.log(rA?.text);

console.log("\n=== ACCOUNT B ALL TICKETS ===");
const tB = getRec(pB, "tickets.json");
for (const t of tB?.data?.tickets || []) {
  console.log(`[${t.id}] (${t.status}) Date: ${t.opened} Requester: "${t.requester}" Subject: "${t.subject}" Assignee: "${t.assignee}"`);
}

console.log("\n=== ACCOUNT B REQUESTS.CSV ===");
const rB = getRec(pB, "requests.csv");
console.log(rB?.text);
