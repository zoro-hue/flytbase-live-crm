import fs from "fs";
import path from "path";

const logFilePath = "C:/Users/DELL/.gemini/antigravity/brain/b045d698-0f1f-416c-90ff-fe6eb2cf3638/.system_generated/steps/63/output.txt";

function main() {
  const content = fs.readFileSync(logFilePath, "utf-8");
  // Find where JSON starts: {"jsonrpc"
  const startIdx = content.indexOf('{"jsonrpc":"2.0"');
  if (startIdx === -1) {
    console.error("Could not find jsonrpc start");
    return;
  }
  const jsonStr = content.slice(startIdx).trim();
  const parsed = JSON.parse(jsonStr);
  const rawText = parsed.result?.content?.[0]?.text;
  if (!rawText) {
    console.error("No text in content[0]");
    return;
  }
  const accountsData = JSON.parse(rawText);
  
  const outDir = path.join(process.cwd(), "data", "mcp");
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "get_my_accounts.json"), JSON.stringify(accountsData, null, 2));
  console.log("Successfully saved get_my_accounts.json. Total accounts:", accountsData.accounts?.length);
  for (const acc of accountsData.accounts || []) {
    console.log(`Account ${acc.id}: ${acc.name}, Stakeholders: ${acc.stakeholders?.length}, Facts: ${acc.facts?.length}, Opportunities: ${acc.opportunities?.length}, Offers: ${acc.offers?.length}`);
  }
  console.log("Files listed:", accountsData.files?.length);
}

main();
