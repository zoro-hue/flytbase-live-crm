import { getMcpAccountsRaw, getMcpPaperwork, getMcpFile } from "./cache";

export interface EvidenceRecord {
  sourceId: string;
  sourceName: string;
  sourceType: "fact" | "ticket" | "call_note" | "email" | "file" | "contract" | "metric" | "request";
  account: "A" | "B" | "All";
  accountName: string;
  title: string;
  date?: string;
  relevantQuote: string;
  fullContent?: string;
  verifiedBy?: string;
  saidBy?: string;
  path?: string;
  limitations?: string;
}

let evidenceIndex: Map<string, EvidenceRecord> | null = null;

export function getAllEvidence(): EvidenceRecord[] {
  if (evidenceIndex) return Array.from(evidenceIndex.values());

  const map = new Map<string, EvidenceRecord>();
  const accountsRaw = getMcpAccountsRaw();

  // 1. Index facts from get_my_accounts
  if (accountsRaw?.accounts) {
    for (const acc of accountsRaw.accounts) {
      const accId = acc.id as "A" | "B";
      const accName = acc.name;

      for (const fact of acc.facts || []) {
        map.set(fact.id, {
          sourceId: fact.id,
          sourceName: `Fact ${fact.id} (${fact.status})`,
          sourceType: "fact",
          account: accId,
          accountName: accName,
          title: fact.said_by ? `Statement by ${fact.said_by}` : `Recorded Account Fact`,
          date: `Minute ${fact.learned_at_minute}`,
          relevantQuote: fact.text,
          fullContent: `Fact ID: ${fact.id}\nStatus: ${fact.status}\nSpeaker: ${fact.said_by || "Unknown"}\nLearned at minute: ${fact.learned_at_minute}\nVerified by: ${fact.verified_by || "Unverified"}\n\n"${fact.text}"`,
          verifiedBy: fact.verified_by,
          saidBy: fact.said_by,
          limitations: fact.status === "claim" ? "Claim made by customer/stakeholder; not yet independently verified" : undefined,
        });
      }
    }
  }

  // 2. Index files
  const fileKeys = [
    { id: "flight_log_by_plant", name: "Flight Log by Plant (CSV)", account: "B" as const },
    { id: "roi_spreadsheet", name: "ROI Spreadsheet (Stefan Roy)", account: "B" as const },
    { id: "flight_log_force_month", name: "Force Flight Log (Monthly)", account: "A" as const },
    { id: "support_ticket_history", name: "Support Ticket History (CSV)", account: "A" as const },
    { id: "dataflow_pack", name: "Dataflow Pack Spec", account: "A" as const },
    { id: "draft_tender_spec", name: "Draft Tender Spec (300-dock framework)", account: "A" as const },
    { id: "clarification_template", name: "Procurement Clarification Template", account: "A" as const },
    { id: "helicopter_cost_overtime", name: "Helicopter Cost Overtime Analysis", account: "A" as const },
  ];

  for (const f of fileKeys) {
    const fileData = getMcpFile(f.id);
    const content = fileData?.text || "";
    map.set(f.id, {
      sourceId: f.id,
      sourceName: f.name,
      sourceType: "file",
      account: f.account,
      accountName: f.account === "A" ? "Eastern Counties Police Alliance" : "Aldermoor Industrial Group",
      title: f.name,
      path: `files/${f.id}.csv`,
      relevantQuote: content.slice(0, 300) + (content.length > 300 ? "..." : ""),
      fullContent: content || "Content cached or downloading from MCP server.",
      limitations: f.id === "roi_spreadsheet" ? "Theoretical spreadsheet of guard hours; contracts unchanged and no savings booked by finance." : undefined,
    });
  }

  // 3. Index Paperwork records for Account A
  const pA = getMcpPaperwork("A");
  if (pA?.records) {
    for (const rec of pA.records) {
      const recId = rec.path;
      const text = rec.text || JSON.stringify(rec.data, null, 2) || "";
      map.set(recId, {
        sourceId: recId,
        sourceName: rec.path,
        sourceType: rec.kind === "call" ? "call_note" : rec.kind === "email" ? "email" : "file",
        account: "A",
        accountName: "Eastern Counties Police Alliance",
        title: rec.path.replace(/\.[^/.]+$/, "").replace(/_/g, " "),
        path: rec.path,
        relevantQuote: text.slice(0, 350) + (text.length > 350 ? "..." : ""),
        fullContent: text,
      });

      // Also index individual tickets in tickets.json
      if (rec.path === "tickets.json" && rec.data?.tickets) {
        for (const t of rec.data.tickets) {
          map.set(t.id, {
            sourceId: t.id,
            sourceName: `Support Ticket ${t.id}`,
            sourceType: "ticket",
            account: "A",
            accountName: "Eastern Counties Police Alliance",
            title: `[${t.status}] ${t.subject}`,
            date: t.opened,
            path: "tickets.json",
            relevantQuote: `Requester: ${t.requester} | Opened: ${t.opened} | Assignee: ${t.assignee || "Unassigned"} | Subject: ${t.subject}`,
            fullContent: JSON.stringify(t, null, 2),
            limitations: t.assignee === null ? "Currently unassigned in support queue" : undefined,
          });
        }
      }
    }
  }

  // 4. Index Paperwork records for Account B
  const pB = getMcpPaperwork("B");
  if (pB?.records) {
    for (const rec of pB.records) {
      const recId = rec.path;
      const text = rec.text || JSON.stringify(rec.data, null, 2) || "";
      map.set(recId, {
        sourceId: recId,
        sourceName: rec.path,
        sourceType: rec.kind === "call" ? "call_note" : rec.kind === "email" ? "email" : "file",
        account: "B",
        accountName: "Aldermoor Industrial Group",
        title: rec.path.replace(/\.[^/.]+$/, "").replace(/_/g, " "),
        path: rec.path,
        relevantQuote: text.slice(0, 350) + (text.length > 350 ? "..." : ""),
        fullContent: text,
      });

      // Individual tickets
      if (rec.path === "tickets.json" && rec.data?.tickets) {
        for (const t of rec.data.tickets) {
          map.set(t.id, {
            sourceId: t.id,
            sourceName: `Support Ticket ${t.id}`,
            sourceType: "ticket",
            account: "B",
            accountName: "Aldermoor Industrial Group",
            title: `[${t.status}] ${t.subject}`,
            date: t.opened,
            path: "tickets.json",
            relevantQuote: `Requester: ${t.requester} | Opened: ${t.opened} | Assignee: ${t.assignee || "Unassigned"} | Subject: ${t.subject}`,
            fullContent: JSON.stringify(t, null, 2),
          });
        }
      }
    }
  }

  evidenceIndex = map;
  return Array.from(map.values());
}

export function getEvidenceById(id: string): EvidenceRecord | undefined {
  const all = getAllEvidence();
  return evidenceIndex?.get(id) || all.find((e) => e.sourceId === id);
}

export function searchEvidence(query: string, account?: string): EvidenceRecord[] {
  const all = getAllEvidence();
  const q = query.toLowerCase().trim();

  return all.filter((item) => {
    if (account && account !== "All" && item.account !== account) return false;
    if (!q) return true;
    return (
      item.sourceId.toLowerCase().includes(q) ||
      item.sourceName.toLowerCase().includes(q) ||
      item.title.toLowerCase().includes(q) ||
      item.relevantQuote.toLowerCase().includes(q) ||
      (item.fullContent && item.fullContent.toLowerCase().includes(q))
    );
  });
}
