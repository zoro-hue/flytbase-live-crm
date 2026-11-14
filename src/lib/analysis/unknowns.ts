export interface UnknownItem {
  id: string;
  missingInformation: string;
  account: "A" | "B";
  accountName: string;
  relatedEntity: string;
  whyItMatters: string;
  whoCouldProvide: string;
  suggestedQuestion: string;
  impactIfUnanswered: string;
  relatedSourceRecords: string[];
}

const UNKNOWNS: UnknownItem[] = [
  // --- ACCOUNT A UNKNOWNS ---
  {
    id: "unknown_a_successor",
    missingInformation: "Named Successor to Rhys Calder as Alliance Drone Programme Lead",
    account: "A",
    accountName: "Eastern Counties Police Alliance",
    relatedEntity: "Rhys Calder / Alliance Programme Office",
    whyItMatters:
      "Rhys Calder is leaving the programme in January 2027. All prior vendor relationships and board updates were single-threaded through him alone.",
    whoCouldProvide: "Rhys Calder or Alliance Programme Board",
    suggestedQuestion:
      "Has the alliance board appointed an interim or permanent successor for the drone programme lead role, and when can we begin a structured operational handover?",
    impactIfUnanswered:
      "Relationship goes dark in January; alliance procurement lead and member forces lack central coordination for 300-dock tender.",
    relatedSourceRecords: ["calls/2026-10-20_check_in.txt", "Event C Signal", "rc_calder_dep"],
  },
  {
    id: "unknown_a_norwold_appetite",
    missingInformation: "Norwold Police Live Operational Appetite & Chief Constable Position",
    account: "A",
    accountName: "Eastern Counties Police Alliance",
    relatedEntity: "Norwold Police / Chief Constable",
    whyItMatters:
      "Norwold has 4 docks installed but has never flown a live mission in 6 months (training only). Insp. Karen Mbeki noted the chief constable is cautious following a local privacy row.",
    whoCouldProvide: "Norwold Drone Lead or Alliance Programme Office",
    suggestedQuestion:
      "What specific community privacy safeguards or policy approvals does Norwold's Chief Constable require before authorizing live operational flights on their 4 docks?",
    impactIfUnanswered:
      "Norwold will refuse to renew their 4 docks (£40k/yr loss) when contract expires on 28 Feb 2027.",
    relatedSourceRecords: ["flight_log_force_month", "km_others_2", "rc_appetite_2"],
  },
  {
    id: "unknown_a_cfo_signoff",
    missingInformation: "Individual Force CFO Approval Timelines for 2027 Framework Call-Offs",
    account: "A",
    accountName: "Eastern Counties Police Alliance",
    relatedEntity: "Force Chief Finance Officers (Westmere, Metro Central, Tarn Valley, Norwold)",
    whyItMatters:
      "Fact rc_funding_2 and draft tender spec confirm there is NO pooled alliance budget. Every force must approve and fund its own call-off individually.",
    whoCouldProvide: "Ewan Brooks (Metro Central Finance) & Hannah Doyle (Procurement)",
    suggestedQuestion:
      "What are the formal budget submission and approval dates for each of the four forces' CFOs to authorize their 2027 framework call-off orders?",
    impactIfUnanswered:
      "Framework tender is won on paper but member forces miss their annual capital budgeting windows, resulting in zero actual purchase orders.",
    relatedSourceRecords: ["rc_funding_2", "hd_calloff_2", "draft_tender_spec"],
  },

  // --- ACCOUNT B UNKNOWNS ---
  {
    id: "unknown_b_install_list",
    missingInformation: "Official Dock-to-Plant Mapping List & Trained Operator Directory",
    account: "B",
    accountName: "Aldermoor Industrial Group",
    relatedEntity: "Stefan Roy's Deputy (Departing)",
    whyItMatters:
      "FlytBase has never received the install sheet recording which dock serial is installed at which of the 14 plants, or who the trained plant operators are.",
    whoCouldProvide: "Stefan Roy's Deputy / Stefan Roy",
    suggestedQuestion:
      "Could you share the complete rollout spreadsheet showing each dock ID matched to its physical plant address, local network link details, and trained plant operator names?",
    impactIfUnanswered:
      "Once the deputy leaves, FlytBase cannot dispatch engineers to correct plants or train replacement operators, freezing adoption at 9 idle plants.",
    relatedSourceRecords: ["ba_deputy_0", "sr_repl_2", "calls/2026-04-23_rollout_close.txt", "calls/2026-06-11_check_in.txt"],
  },
  {
    id: "unknown_b_measured_roi",
    missingInformation: "Independently Verified Financial Savings Booked by Plant or Group Finance",
    account: "B",
    accountName: "Aldermoor Industrial Group",
    relatedEntity: "Nadia Rahman (Group Finance Controller)",
    whyItMatters:
      "Stefan Roy's claimed €1.2M savings is based on a spreadsheet of replaceable guard hours. roi_spreadsheet.csv proves NO guard contract has been reduced and finance has booked ZERO savings.",
    whoCouldProvide: "Nadia Rahman (Finance Controller) & Beatriz Alonso (Plant 7 Manager)",
    suggestedQuestion:
      "What concrete security incident reductions, insurance premium discounts, or overtime savings has group finance or Plant 7 formally recognized from drone patrols?",
    impactIfUnanswered:
      "Finance controller Nadia Rahman will reject the €140,000 contract renewal on 1 February 2027 because savings cannot be validated.",
    relatedSourceRecords: ["roi_spreadsheet", "sr_roi_2", "emails/2026-10-08_finance_mailbox.txt"],
  },
  {
    id: "unknown_b_guard_contracts",
    missingInformation: "Guard Contractor Alert Response SLAs Across the 14 Plants",
    account: "B",
    accountName: "Aldermoor Industrial Group",
    relatedEntity: "Stefan Roy / Plant Procurement Managers",
    whyItMatters:
      "At Plant 7, night security guards refuse to respond to drone alerts because their contract does not mandate it. It is unknown whether the other 13 plants have the same gap.",
    whoCouldProvide: "Stefan Roy & Plant 7 Manager Beatriz Alonso",
    suggestedQuestion:
      "Do the local physical guard contracts at each plant include responding to automated perimeter alerts, or must alerts be routed through a central group security monitoring center?",
    impactIfUnanswered:
      "Drones will detect intrusions that security guards ignore, exposing plants to theft and prompting plant managers to cancel their budget allocations.",
    relatedSourceRecords: ["ba_use_2", "emails/2026-09-18_beatriz_alerts.txt", "FB-10944"],
  },
];

export function getAccountUnknowns(accountId?: "A" | "B"): UnknownItem[] {
  if (accountId) {
    return UNKNOWNS.filter((u) => u.account === accountId);
  }
  return UNKNOWNS;
}
