export interface RiskItem {
  id: string;
  title: string;
  severity: "Critical" | "High" | "Medium" | "Low";
  account: "A" | "B";
  accountName: string;
  relatedDeal?: string;
  category:
    | "Stakeholder Departure"
    | "Unanswered Request"
    | "Regulatory / Compliance"
    | "Approaching Deadline"
    | "Usage Decline"
    | "Unverified ROI"
    | "Network / IT Blocker"
    | "Single-Threaded Relationship";
  firstDetected: string;
  deadline?: string;
  whyItMatters: string;
  recommendedMitigation: string;
  supportingSourceId: string;
  supportingSourceName: string;
  sourcePath?: string;
  status: "Active" | "Monitoring" | "Mitigated";
}

const RISKS: RiskItem[] = [
  // --- ACCOUNT A RISKS ---
  {
    id: "risk_a_event_b",
    title: "Unanswered 18 Nov Support Request for Public Event (5 Dec Deadline)",
    severity: "Critical",
    account: "A",
    accountName: "Eastern Counties Police Alliance",
    relatedDeal: "Scale Westmere Fleet (£250k) & Alliance Renewal (£350k)",
    category: "Unanswered Request",
    firstDetected: "2026-11-18",
    deadline: "2026-12-05 (Public Event)",
    whyItMatters:
      "Insp. Karen Mbeki logged urgent ticket on 18 Nov needing two written commitments this week: additional operator training dates and on-call failover protocol if a dock fails during the public event on 5 Dec. Nobody has replied.",
    recommendedMitigation:
      "Immediate senior CSM intervention: deliver written schedule for 2 operator training slots and publish on-call engineer protocol for 5 Dec event day.",
    supportingSourceId: "FB-10650",
    supportingSourceName: "Event B Signal & Support Ticket FB-10650",
    sourcePath: "tickets.json",
    status: "Active",
  },
  {
    id: "risk_a_event_c",
    title: "Key Champion Rhys Calder Leaving Programme (Single-Threaded Relationship)",
    severity: "Critical",
    account: "A",
    accountName: "Eastern Counties Police Alliance",
    relatedDeal: "300-Dock Framework Tender (£1.5M) & Renewal (£350k)",
    category: "Stakeholder Departure",
    firstDetected: "2026-11-17",
    deadline: "January 2027",
    whyItMatters:
      "Rhys Calder is leaving the drone programme in January. No successor has been named. Every recorded call before the handover was with Rhys alone. All alliance coordination is single-threaded through him.",
    recommendedMitigation:
      "Map alliance board decision authorities immediately; establish direct relationships with force CFOs and Hannah Doyle (Procurement Lead); schedule formal succession handover meeting.",
    supportingSourceId: "rc_calder_dep",
    supportingSourceName: "Event C Signal & Check-in Call Transcripts",
    sourcePath: "calls/2026-10-20_check_in.txt",
    status: "Active",
  },
  {
    id: "risk_a_dpia_blocker",
    title: "Tarn Valley & Norwold DPIA Blocked by Unanswered Ticket (4 Months Stalled)",
    severity: "High",
    account: "A",
    accountName: "Eastern Counties Police Alliance",
    relatedDeal: "Tarn Valley & Norwold Go-Live (£200,000)",
    category: "Regulatory / Compliance",
    firstDetected: "2026-06-29",
    deadline: "Immediate",
    whyItMatters:
      "Ticket FB-10412 from Fatima Osei (DPO) has sat unassigned for 4 months. 8 docks installed across Tarn Valley and Norwold have recorded zero live missions because statutory DPIA cannot be signed without data-flow pack.",
    recommendedMitigation:
      "Deliver engineering data-flow pack (dataflow_pack.txt) to Fatima Osei; assign dedicated CSM to guide her through the 3-week assessment and replicate to Norwold.",
    supportingSourceId: "FB-10412",
    supportingSourceName: "Ticket FB-10412 & Fact fo_dpia_2",
    sourcePath: "files/support_ticket_history.csv",
    status: "Active",
  },
  {
    id: "risk_a_metro_deadline",
    title: "Metro Central Autumn Finance Bid Window Closing (Missing Cost-per-Flight Benchmark)",
    severity: "High",
    account: "A",
    accountName: "Eastern Counties Police Alliance",
    relatedDeal: "Scale Westmere Fleet (£250k) & Extra Docks (£180k)",
    category: "Approaching Deadline",
    firstDetected: "2026-10-15",
    deadline: "Autumn Finance Round (Mid-December 2026)",
    whyItMatters:
      "Ewan Brooks must submit business case before autumn bid window closes. His CFO will only sign a call-off with drone cost-per-flight benchmarked against £1,500/hr helicopter air support contract.",
    recommendedMitigation:
      "Calculate drone flight cost using overtime hours and hardware amortisation; deliver comparative financial sheet to Ewan Brooks within 7 days.",
    supportingSourceId: "eb_sign_2",
    supportingSourceName: "Fact eb_sign_2 & Helicopter Cost Overtime Analysis",
    sourcePath: "files/helicopter_cost_overtime.csv",
    status: "Active",
  },
  {
    id: "risk_a_funding_myth",
    title: "No Pooled Alliance Budget: Each Force CFO Must Approve Individual Call-Off",
    severity: "Medium",
    account: "A",
    accountName: "Eastern Counties Police Alliance",
    relatedDeal: "Alliance Contract Renewal (£350k)",
    category: "Single-Threaded Relationship",
    firstDetected: "2026-10-20",
    deadline: "2027-02-28 (Contract Expiry)",
    whyItMatters:
      "Rhys Calder claimed the alliance has a pooled budget. Fact rc_funding_2 and hd_calloff_2 prove each force funds from its own budget and each chief finance officer must approve a call-off.",
    recommendedMitigation:
      "Build individualized force renewal proposals for Westmere, Metro Central, Tarn Valley, and Norwold CFOs rather than relying on a single alliance signature.",
    supportingSourceId: "rc_funding_2",
    supportingSourceName: "Fact rc_funding_2 & Fact hd_calloff_2",
    status: "Active",
  },

  // --- ACCOUNT B RISKS ---
  {
    id: "risk_b_event_a",
    title: "Three Docks Inactive Since 2-29 Nov with Zero Tickets (Adoption Collapse)",
    severity: "Critical",
    account: "B",
    accountName: "Aldermoor Industrial Group",
    relatedDeal: "Annual Contract Renewal (€140k)",
    category: "Usage Decline",
    firstDetected: "2026-11-14",
    deadline: "Immediate",
    whyItMatters:
      "3 docks (AD-02, AD-05, AD-08/10 at Plants 3, 5, 9) that previously flew most nights stopped flying over last 2 weeks (2-29 Nov) while remaining online. No support ticket raised. Customer is quietly disengaging.",
    recommendedMitigation:
      "Dispatch proactive CSM alert; reach out to plant managers and Stefan Roy immediately to resolve operational adoption block.",
    supportingSourceId: "flight_log_by_plant",
    supportingSourceName: "Event A Signal & Flight Log by Plant",
    sourcePath: "files/flight_log_by_plant.csv",
    status: "Active",
  },
  {
    id: "risk_b_deputy_leaving",
    title: "Stefan's Deputy Departing with Undocumented Rollout Know-How & Plant List",
    severity: "Critical",
    account: "B",
    accountName: "Aldermoor Industrial Group",
    relatedDeal: "Activate 9 Idle Plants (€180k) & Contract Renewal (€140k)",
    category: "Stakeholder Departure",
    firstDetected: "2026-04-23",
    deadline: "November/December 2026",
    whyItMatters:
      "Stefan's deputy configured all docks plant-by-plant and trained operators. He is leaving soon. FlytBase never received the install list (which dock is at which plant). All technical know-how will vanish.",
    recommendedMitigation:
      "Conduct emergency handover session with deputy; secure written copy of plant install sheet, operator roster, and site network parameters.",
    supportingSourceId: "ba_deputy_0",
    supportingSourceName: "Fact ba_deputy_0 & Fact sr_repl_2",
    sourcePath: "calls/2026-04-23_rollout_close.txt",
    status: "Active",
  },
  {
    id: "risk_b_unverified_roi",
    title: "Stefan Roy's Claimed €1.2M Savings Disputed by Finance Controller Nadia Rahman",
    severity: "High",
    account: "B",
    accountName: "Aldermoor Industrial Group",
    relatedDeal: "Annual Contract Renewal (€140,000)",
    category: "Unverified ROI",
    firstDetected: "2026-07-14",
    deadline: "2027-02-01 (Contract Expiry)",
    whyItMatters:
      "Stefan Roy claims €1.2M annual savings, but source roi_spreadsheet.csv proves this is his own theoretical spreadsheet of replaceable guard hours. NO guard contracts have been reduced and finance has booked ZERO savings. Nadia Rahman cannot verify it.",
    recommendedMitigation:
      "Acknowledge the gap to Nadia Rahman; present actual deterrence data (e.g. Plant 7 break-ins deterred) and transparent plant-level pricing rather than unverified savings.",
    supportingSourceId: "roi_spreadsheet",
    supportingSourceName: "ROI Spreadsheet (Stefan Roy) & Fact sr_roi_2",
    sourcePath: "files/roi_spreadsheet.csv",
    status: "Active",
  },
  {
    id: "risk_b_guard_disconnect",
    title: "Night Guard Contractors Do Not Act on Drone Alerts (Alerts Go to Plant Manager's Personal Phone)",
    severity: "High",
    account: "B",
    accountName: "Aldermoor Industrial Group",
    relatedDeal: "Night-Time Priority Support for Plant 7 (€50k)",
    category: "Network / IT Blocker",
    firstDetected: "2026-09-18",
    deadline: "Ongoing",
    whyItMatters:
      "At Plant 7 (the only active night patrolling plant), guard contractor contract does not cover responding to drone alerts. Alerts wake plant manager Beatriz Alonso at night on her personal phone.",
    recommendedMitigation:
      "Work with Stefan Roy to amend plant guard vendor SLA to include drone alert monitoring and automated dispatch.",
    supportingSourceId: "ba_use_2",
    supportingSourceName: "Fact ba_use_2 & Ticket FB-10944",
    sourcePath: "emails/2026-09-18_beatriz_alerts.txt",
    status: "Active",
  },
  {
    id: "risk_b_plant11_offline",
    title: "Plant 11 Dock Offline for Days Due to Network Link Drops (Ticket FB-10903)",
    severity: "Medium",
    account: "B",
    accountName: "Aldermoor Industrial Group",
    relatedDeal: "Activate 9 Idle Plants (€180k)",
    category: "Network / IT Blocker",
    firstDetected: "2026-09-10",
    deadline: "Ongoing",
    whyItMatters:
      "Ticket FB-10903 opened 10 Sept for Plant 11 dock offline. IT lead Owen Fitch has a network project that risks disconnecting more docks. Ticket has been waiting on customer IT for over 2 months.",
    recommendedMitigation:
      "Escalate directly to Owen Fitch (Group IT Lead) with technical diagnostics to configure resilient local cellular fallback for Plant 11.",
    supportingSourceId: "FB-10903",
    supportingSourceName: "Support Ticket FB-10903",
    sourcePath: "files/support_ticket_history.csv",
    status: "Active",
  },
];

export function getAccountRisks(accountId?: "A" | "B"): RiskItem[] {
  if (accountId) {
    return RISKS.filter((r) => r.account === accountId);
  }
  return RISKS;
}
