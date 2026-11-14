import fs from "fs";
import path from "path";

const dir = path.join(process.cwd(), "data", "mcp");
const pB = JSON.parse(fs.readFileSync(path.join(dir, "paperwork_B.json"), "utf-8"));
const flightsRec = pB.records?.find((r: any) => r.path?.endsWith("flights.csv"));
console.log(flightsRec?.text?.split("\n").slice(0, 10).join("\n"));
