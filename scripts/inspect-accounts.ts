import fs from "fs";
import path from "path";

const data = JSON.parse(fs.readFileSync(path.join(process.cwd(), "data", "mcp", "get_my_accounts.json"), "utf-8"));

console.log("=== ACCOUNT OVERVIEWS ===");
for (const acc of data.accounts) {
  console.log(`\nAccount ID: ${acc.id}`);
  console.log(`Name: ${acc.name}`);
  console.log(`Official story: ${acc.official_story}`);
  console.log(`Stakeholders (${acc.stakeholders?.length}):`);
  for (const s of acc.stakeholders || []) {
    console.log(`  - [${s.id}] ${s.name} (${s.role}) - Rel: ${s.relationship}`);
  }
  console.log(`Opportunities (${acc.opportunities?.length}):`);
  for (const opp of acc.opportunities || []) {
    console.log(`  - [${opp.id}] "${opp.title}" Stage: ${opp.stage}, Worth up to: £/€${opp.worth_up_to}, Evidence: ${opp.evidence?.join(", ")}`);
    if (opp.blocker) console.log(`      Blocker: ${opp.blocker.text} (${opp.blocker.status})`);
    if (opp.deadline) console.log(`      Deadline: ${typeof opp.deadline === "object" ? opp.deadline.text : opp.deadline}`);
  }
  console.log(`Offers (${acc.offers?.length}):`);
  for (const off of acc.offers || []) {
    console.log(`  - [${off.id}] "${off.title}" Value: £/€${off.value}, Pitch to: ${off.pitch_to}, Status: ${off.status}`);
  }
  console.log(`Facts (${acc.facts?.length}):`);
  for (const f of acc.facts || []) {
    console.log(`  - [${f.id}] (${f.status}) ${f.said_by ? `"${f.said_by}": ` : ""}${f.text} ${f.verified_by ? `[verified by: ${f.verified_by}]` : ""}`);
  }
}
