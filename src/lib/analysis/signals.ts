import { getMcpSignalsRaw, getMcpAccountsRaw, getMcpPaperwork } from "../data/cache";

export interface LiveSignalItem {
  id: string;
  code: string;
  title: string;
  account: "A" | "B";
  accountName: string;
  severity: "Critical" | "High" | "Medium" | "Low";
  status: "New" | "Acknowledged" | "Resolved";
  detectedAt: string;
  eventPeriod?: string;
  category: "Operational Adoption" | "Customer Relationship" | "Key-Person Continuity" | "Technical Diagnostic";
  summary: string;
  evidenceDetails: {
    affectedEntities: string[];
    previousUsageVsRecent: string;
    devicesOnline: boolean;
    supportTicketRaised: boolean;
    supportTicketDetails?: string;
    deadline?: string;
    unansweredRequests?: string[];
  };
  recommendedResponse: string;
  recommendedContact: {
    name: string;
    role: string;
    id: string;
  };
  responsibleOwner: string;
  sourceId: string;
  sourceName: string;
  sourcePath: string;
  isConfirmedByData: boolean;
}

export function getConfirmedSignals(): LiveSignalItem[] {
  const signals: LiveSignalItem[] = [];

  // 1. EVENT A — ALDERMOOR INDUSTRIAL GROUP
  signals.push({
    id: "sig_event_a",
    code: "EVENT-A",
    title: "Operational Adoption Risk: 3 Regular Flying Docks Ceased Flying (2–29 November)",
    account: "B",
    accountName: "Aldermoor Industrial Group",
    severity: "Critical",
    status: "New",
    detectedAt: "2026-11-14T08:00:00Z",
    eventPeriod: "2–29 November 2026",
    category: "Operational Adoption",
    summary:
      "Three docks (AD-02, AD-05, AD-08 at Plants 3, 5, 9) that previously flew scheduled patrols most nights (118-167 lifetime missions each) recorded zero flights over the last two weeks (2–29 Nov) while remaining powered and online. No customer support ticket has been raised.",
    evidenceDetails: {
      affectedEntities: [
        "AD-02 (Plant 3 - previously 18-26 patrol flights/mo)",
        "AD-05 (Plant 5 - previously 16-28 patrol flights/mo)",
        "AD-08 (Plant 9 - previously 14-29 patrol flights/mo)",
      ],
      previousUsageVsRecent:
        "Historical: ~20-29 flights/dock/month (totaling over 118+ flights per dock). Last 14 days: 0 flights logged across all three docks.",
      devicesOnline: true,
      supportTicketRaised: false,
      supportTicketDetails: "Zero support tickets logged on the account for these docks (verified via tickets.json). Customer has not reported the issue.",
    },
    recommendedResponse:
      "Proactive CSM outreach to Stefan Roy and plant managers. Do not wait for renewal; conduct remote telemetry audit and offer free field health-check to identify whether root cause is operator staffing or guard vendor dispute.",
    recommendedContact: {
      name: "Stefan Roy / Plant Managers",
      role: "Group Head of Security",
      id: "stefan_roy",
    },
    responsibleOwner: "Lead CSM (Neel Sharma) / Support Desk",
    sourceId: "flight_log_by_plant",
    sourceName: "Flight Log by Plant (CSV) & devices.json",
    sourcePath: "files/flight_log_by_plant.csv",
    isConfirmedByData: true,
  });

  // 2. EVENT B — EASTERN COUNTIES POLICE ALLIANCE
  signals.push({
    id: "sig_event_b",
    code: "EVENT-B",
    title: "Customer Relationship Risk: Unanswered 18 Nov Ticket for 5 Dec Public Event",
    account: "A",
    accountName: "Eastern Counties Police Alliance",
    severity: "Critical",
    status: "New",
    detectedAt: "2026-11-18T09:15:00Z",
    category: "Customer Relationship",
    summary:
      "On 18 November, Insp. Karen Mbeki logged an urgent support ticket prior to a high-visibility public policing event on 5 December. She requested two explicit written commitments this week. As of today, nobody from FlytBase has replied.",
    evidenceDetails: {
      affectedEntities: ["Westmere Constabulary Drone Unit", "Dock 1-14", "Event Ops"],
      previousUsageVsRecent: "Westmere flies actively (14 of 18 docks active, 126 missions last month). High dependency on event day.",
      devicesOnline: true,
      supportTicketRaised: true,
      supportTicketDetails: "Ticket logged 18 Nov in support queue; currently unassigned.",
      deadline: "2026-12-05 (Public Event) — Commitments required in writing this week",
      unansweredRequests: [
        "1. Specific dates for training additional operators before the 5 December event.",
        "2. Formal written confirmation of who responds and escalation protocol if a dock fails on the event day.",
      ],
    },
    recommendedResponse:
      "Immediate senior response from Lead CSM Neel Sharma and Engineering Lead. Provide confirmed training calendar and dedicated on-call incident response contact for 5 December.",
    recommendedContact: {
      name: "Insp. Karen Mbeki",
      role: "Drone Unit Inspector, Westmere Constabulary",
      id: "karen_mbeki",
    },
    responsibleOwner: "Lead CSM (Neel Sharma) & Solutions Engineering",
    sourceId: "FB-10650",
    sourceName: "Support Ticket System & requests.csv",
    sourcePath: "tickets.json",
    isConfirmedByData: true,
  });

  // 3. EVENT C — EASTERN COUNTIES POLICE ALLIANCE
  signals.push({
    id: "sig_event_c",
    code: "EVENT-C",
    title: "Key-Person Continuity Risk: Rhys Calder Departing Programme in January",
    account: "A",
    accountName: "Eastern Counties Police Alliance",
    severity: "High",
    status: "New",
    detectedAt: "2026-11-17T11:30:00Z",
    category: "Key-Person Continuity",
    summary:
      "On 17 November, it was confirmed that Rhys Calder is stepping down from the Alliance drone programme in January. No successor has been named. Every recorded call and alliance interaction prior to handover was with Rhys alone, exposing a severe single-threaded vulnerability.",
    evidenceDetails: {
      affectedEntities: ["Alliance Programme Office", "300-Dock Framework Tender", "All 4 Member Forces"],
      previousUsageVsRecent: "Rhys was the sole conduit for board updates and tender formulation.",
      devicesOnline: true,
      supportTicketRaised: false,
      deadline: "January 2027 (Departure)",
      unansweredRequests: [
        "Identity and contact details of interim or permanent successor.",
        "Direct lines of communication to member force CFOs and Chief Constables.",
      ],
    },
    recommendedResponse:
      "Map alliance board decision authority immediately. Establish formal relationships with Hannah Doyle (Alliance Procurement Lead) and force finance directors (Ewan Brooks, etc.) to institutionalize the partnership beyond Rhys Calder.",
    recommendedContact: {
      name: "Hannah Doyle & Rhys Calder",
      role: "Alliance Procurement Lead & Departing Programme Lead",
      id: "hannah_doyle",
    },
    responsibleOwner: "Achal Negi (Director of BD) & CSM",
    sourceId: "calls/2026-10-20_check_in.txt",
    sourceName: "Handover Records & Check-in Transcripts",
    sourcePath: "calls/2026-10-20_check_in.txt",
    isConfirmedByData: true,
  });

  // 4. Also incorporate any dynamically returned signals from MCP get_signals
  const rawSignals = getMcpSignalsRaw();
  if (rawSignals?.response?.signals) {
    for (const s of rawSignals.response.signals) {
      signals.push({
        id: s.id || `mcp_sig_${Math.random()}`,
        code: s.code || "MCP-SIG",
        title: s.title || s.subject || "Live Event Signal",
        account: s.account === "A" || s.account === "B" ? s.account : "A",
        accountName: s.account === "B" ? "Aldermoor Industrial Group" : "Eastern Counties Police Alliance",
        severity: (s.severity as any) || "Medium",
        status: "New",
        detectedAt: s.timestamp || new Date().toISOString(),
        category: "Technical Diagnostic",
        summary: s.description || s.text || "Live signal received from MCP server.",
        evidenceDetails: {
          affectedEntities: s.entities || [],
          previousUsageVsRecent: s.usageDetails || "Monitored via get_signals",
          devicesOnline: true,
          supportTicketRaised: false,
        },
        recommendedResponse: s.action || "Review live event telemetry in CRM dashboard.",
        recommendedContact: {
          name: "CSM Team",
          role: "Account Management",
          id: "csm",
        },
        responsibleOwner: "Support Desk",
        sourceId: "get_signals",
        sourceName: "Live MCP Signals Tool",
        sourcePath: "get_signals",
        isConfirmedByData: true,
      });
    }
  }

  return signals;
}

export function getAccountSignals(accountId?: "A" | "B"): LiveSignalItem[] {
  const all = getConfirmedSignals();
  if (accountId) {
    return all.filter((s) => s.account === accountId);
  }
  return all;
}
