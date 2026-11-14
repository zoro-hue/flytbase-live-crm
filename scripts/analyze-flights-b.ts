import fs from "fs";
import path from "path";

const dir = path.join(process.cwd(), "data", "mcp");
const pB = JSON.parse(fs.readFileSync(path.join(dir, "paperwork_B.json"), "utf-8"));

function getRec(p: any, filename: string) {
  return p.records?.find((r: any) => r.path?.endsWith(filename));
}

const flightsRec = getRec(pB, "flights.csv");
const lines = flightsRec?.text?.trim().split("\n") || [];
const headers = lines[0].split(",");

const flights = lines.slice(1).map((l: string) => {
  const parts = l.split(",");
  return {
    flight_id: parts[0],
    dock_id: parts[1],
    date: parts[2],
    duration: parts[3],
    status: parts[4],
  };
});

console.log("Total flights in Account B:", flights.length);
// Group by dock and month/date
const byDock: Record<string, { total: number; latest: string; byMonth: Record<string, number> }> = {};
for (const f of flights) {
  if (!byDock[f.dock_id]) {
    byDock[f.dock_id] = { total: 0, latest: "", byMonth: {} };
  }
  byDock[f.dock_id].total++;
  if (!byDock[f.dock_id].latest || f.date > byDock[f.dock_id].latest) {
    byDock[f.dock_id].latest = f.date;
  }
  const ym = f.date.slice(0, 7);
  byDock[f.dock_id].byMonth[ym] = (byDock[f.dock_id].byMonth[ym] || 0) + 1;
}

console.log("Flight breakdown by dock:");
for (const [dock, data] of Object.entries(byDock).sort()) {
  console.log(`Dock ${dock}: total=${data.total}, latest=${data.latest}, months=`, data.byMonth);
}
