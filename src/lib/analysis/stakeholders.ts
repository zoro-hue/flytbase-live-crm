export interface StakeholderItem {
  id: string;
  name: string;
  role: string;
  account: "A" | "B";
  accountName: string;
  organisation: string;
  classification:
    | "Economic Buyer"
    | "Decision Maker"
    | "Champion"
    | "Influencer"
    | "End User"
    | "Technical Blocker"
    | "Procurement"
    | "Finance"
    | "Unknown Authority";
  decisionAuthority: string;
  budgetAuthority: string;
  paymentResponsibility: string;
  actualUsage: string;
  dealInfluence: "High" | "Medium" | "Low";
  canBlock: boolean;
  relationshipStatus: "Ally" | "Warm" | "Neutral" | "Guarded" | "Strained" | "Departing";
  lastInteraction: string;
  supportingEvidence: string[];
  notes: string;
  isKeyPersonRisk: boolean;
  isLeaving: boolean;
  departureDate?: string;
  hasUnresolvedRequest: boolean;
  unresolvedRequestDetails?: string;
}

export function getAccountStakeholders(accountId: "A" | "B"): StakeholderItem[] {
  if (accountId === "A") {
    return [
      {
        id: "rhys_calder",
        name: "Rhys Calder",
        role: "Alliance Drone Programme Lead",
        account: "A",
        accountName: "Eastern Counties Police Alliance",
        organisation: "Alliance Programme Office",
        classification: "Champion",
        decisionAuthority: "Coordinates programme; signs alliance framework tenders but cannot commit individual force budgets",
        budgetAuthority: "No pooled budget. Alliance office has zero direct force funding authority (Fact rc_funding_2)",
        paymentResponsibility: "Coordinates split invoices across forces (Schedule 2)",
        actualUsage: "Non-operator. Reviews footage and reports for programme board",
        dealInfluence: "High",
        canBlock: true,
        relationshipStatus: "Departing",
        lastInteraction: "2026-10-20 (Check-in call)",
        supportingEvidence: ["rc_appetite_0", "rc_funding_2", "rc_tender_2", "calls/2026-10-20_check_in.txt"],
        notes: "CRITICAL KEY-PERSON RISK: Leaving in January. No successor named. Every recorded call was with Rhys alone (single-threaded).",
        isKeyPersonRisk: true,
        isLeaving: true,
        departureDate: "January 2027",
        hasUnresolvedRequest: false,
      },
      {
        id: "karen_mbeki",
        name: "Insp. Karen Mbeki",
        role: "Drone Unit Inspector, Westmere Constabulary",
        account: "A",
        accountName: "Eastern Counties Police Alliance",
        organisation: "Westmere Constabulary",
        classification: "Champion",
        decisionAuthority: "Operational decisions for Westmere drone unit (18 docks)",
        budgetAuthority: "Recommends fleet expansion; subject to Superintendent & force finance approval",
        paymentResponsibility: "Westmere Constabulary local cost center",
        actualUsage: "Daily operational heavy user (14 of 18 docks active, missing person & patrol support)",
        dealInfluence: "High",
        canBlock: false,
        relationshipStatus: "Ally",
        lastInteraction: "2026-11-18 (Event B Support Ticket logged)",
        supportingEvidence: ["km_usage_1", "km_staff_2", "flight_log_force_month", "tickets.json"],
        notes: "Logged urgent ticket on 18 Nov before 5 Dec public event requiring training dates and dock failure protocol. Unanswered!",
        isKeyPersonRisk: false,
        isLeaving: false,
        hasUnresolvedRequest: true,
        unresolvedRequestDetails: "18 Nov ticket: Needs training dates for new operators + failover protocol before 5 Dec public event. Unanswered.",
      },
      {
        id: "fatima_osei",
        name: "Fatima Osei",
        role: "Data Protection Officer (DPO), Tarn Valley",
        account: "A",
        accountName: "Eastern Counties Police Alliance",
        organisation: "Tarn Valley Police",
        classification: "Technical Blocker",
        decisionAuthority: "Must sign off statutory Data Protection Impact Assessment (DPIA) before Tarn Valley goes live",
        budgetAuthority: "None (Statutory compliance officer)",
        paymentResponsibility: "None",
        actualUsage: "None (Blocks live missions until DPIA is approved)",
        dealInfluence: "High",
        canBlock: true,
        relationshipStatus: "Neutral",
        lastInteraction: "2026-08-14 (Chased ticket FB-10412)",
        supportingEvidence: ["fo_dpia_2", "fo_needs_3", "pj_ticket", "srv_dataflow", "FB-10412"],
        notes: "BLOCKING £200k ROLLOUT: Chased data-flow documents 4 months ago via ticket FB-10412. Unanswered and unassigned in queue.",
        isKeyPersonRisk: true,
        isLeaving: false,
        hasUnresolvedRequest: true,
        unresolvedRequestDetails: "Ticket FB-10412: Requested data flows, retention periods, video storage location & access controls. Open 4 months.",
      },
      {
        id: "ewan_brooks",
        name: "Ewan Brooks",
        role: "Finance Business Partner, Metro Central Police",
        account: "A",
        accountName: "Eastern Counties Police Alliance",
        organisation: "Metro Central Police",
        classification: "Finance",
        decisionAuthority: "Presents business cases to Metro Central Chief Finance Officer (CFO)",
        budgetAuthority: "Metro Central local police budget; CFO must approve call-off",
        paymentResponsibility: "Signs off Metro Central call-off invoice",
        actualUsage: "None",
        dealInfluence: "High",
        canBlock: true,
        relationshipStatus: "Warm",
        lastInteraction: "2026-10-15 (Call note)",
        supportingEvidence: ["eb_heli_1", "eb_drone_2", "eb_sign_2", "eb_window_2"],
        notes: "Needs cost per flight benchmark against £1,500/hr helicopter air support before autumn finance bid window closes.",
        isKeyPersonRisk: false,
        isLeaving: false,
        hasUnresolvedRequest: false,
      },
      {
        id: "hannah_doyle",
        name: "Hannah Doyle",
        role: "Alliance Procurement Lead",
        account: "A",
        accountName: "Eastern Counties Police Alliance",
        organisation: "Alliance Commercial Services",
        classification: "Procurement",
        decisionAuthority: "Leads formal procurement and tender evaluation for 300-dock national framework",
        budgetAuthority: "Commercial framework structuring; forces call off individually",
        paymentResponsibility: "Framework oversight",
        actualUsage: "None",
        dealInfluence: "High",
        canBlock: true,
        relationshipStatus: "Ally",
        lastInteraction: "2026-10-18 (Call note)",
        supportingEvidence: ["hd_weights_1", "hd_window_2", "draft_tender_spec", "clarification_template"],
        notes: "Evaluation weights cost per flight and operating model at 40%. Supplier clarification window opening shortly.",
        isKeyPersonRisk: false,
        isLeaving: false,
        hasUnresolvedRequest: false,
      },
    ];
  } else {
    return [
      {
        id: "stefan_roy",
        name: "Stefan Roy",
        role: "Group Head of Security",
        account: "B",
        accountName: "Aldermoor Industrial Group",
        organisation: "Aldermoor Corporate Security",
        classification: "Champion",
        decisionAuthority: "Signs group security orders; pitched drone initiative to board",
        budgetAuthority: "Controls central group security budget, but allocates charges across individual plant security budgets",
        paymentResponsibility: "Central group security account",
        actualUsage: "Non-operator. Uses clips and footage for board presentations",
        dealInfluence: "High",
        canBlock: true,
        relationshipStatus: "Ally",
        lastInteraction: "2026-10-13 (Check-in call)",
        supportingEvidence: ["sr_roi_0", "sr_roi_2", "sr_roll_2", "sr_plants_2", "calls/2026-10-13_check_in.txt"],
        notes: "Claims €1.2M savings based on unverified spreadsheet. Relies entirely on his departing deputy for technical/field execution.",
        isKeyPersonRisk: true,
        isLeaving: false,
        hasUnresolvedRequest: true,
        unresolvedRequestDetails: "Chased case study for 40-plant sister company; blocked on verifiable savings breakdown.",
      },
      {
        id: "stefans_deputy",
        name: "Stefan's Deputy (Name Unrecorded)",
        role: "Security Rollout Lead / Field Operations",
        account: "B",
        accountName: "Aldermoor Industrial Group",
        organisation: "Aldermoor Group Security",
        classification: "End User",
        decisionAuthority: "Installed and configured all docks plant by plant; agreed positions with plant managers",
        budgetAuthority: "None",
        paymentResponsibility: "None",
        actualUsage: "Primary technical operator and plant trainer",
        dealInfluence: "High",
        canBlock: true,
        relationshipStatus: "Departing",
        lastInteraction: "2026-04-23 (Rollout close call)",
        supportingEvidence: ["ba_deputy_0", "sr_repl_2", "calls/2026-04-23_rollout_close.txt"],
        notes: "CRITICAL OPERATIONAL RISK: Holds all site knowledge, install list, and operator contacts in his head. Leaving organisation soon!",
        isKeyPersonRisk: true,
        isLeaving: true,
        departureDate: "November/December 2026",
        hasUnresolvedRequest: false,
      },
      {
        id: "nadia_rahman",
        name: "Nadia Rahman",
        role: "Group Finance Controller",
        account: "B",
        accountName: "Aldermoor Industrial Group",
        organisation: "Aldermoor Finance Group",
        classification: "Economic Buyer",
        decisionAuthority: "Controls renewal contract approval and financial verification of vendor ROI",
        budgetAuthority: "Ultimate corporate sign-off for €140k renewal and plant charge allocations",
        paymentResponsibility: "Group Finance",
        actualUsage: "None",
        dealInfluence: "High",
        canBlock: true,
        relationshipStatus: "Guarded",
        lastInteraction: "2026-10-08 (Finance mailbox email)",
        supportingEvidence: ["b_renewal", "sr_roi_2", "emails/2026-10-08_finance_mailbox.txt"],
        notes: "ECONOMIC BUYER: Sent unsigned email from finance mailbox asking for renewal quote broken down by plant. Cannot verify savings claimed by security.",
        isKeyPersonRisk: true,
        isLeaving: false,
        hasUnresolvedRequest: true,
        unresolvedRequestDetails: "10 Oct email: Requested renewal quote showing costs per plant. Not answered before CSM handover.",
      },
      {
        id: "beatriz_alonso",
        name: "Beatriz Alonso",
        role: "Plant Manager, Plant 7",
        account: "B",
        accountName: "Aldermoor Industrial Group",
        organisation: "Aldermoor Manufacturing (Plant 7)",
        classification: "Champion",
        decisionAuthority: "Plant operations and local plant security adoption",
        budgetAuthority: "Pays local annual allocation for dock from plant budget",
        paymentResponsibility: "Plant 7 cost allocation",
        actualUsage: "Active nightly user; dock deterred two break-in attempts. Alerts go to her personal phone",
        dealInfluence: "Medium",
        canBlock: false,
        relationshipStatus: "Warm",
        lastInteraction: "2026-09-18 (Ticket FB-10944)",
        supportingEvidence: ["ba_use_2", "ba_cost_2", "FB-10944", "emails/2026-09-18_beatriz_alerts.txt"],
        notes: "Only plant manager champion. Guard contractor does not respond to drone alerts because not in contract; alerts go to her phone at night.",
        isKeyPersonRisk: false,
        isLeaving: false,
        hasUnresolvedRequest: false,
      },
      {
        id: "owen_fitch",
        name: "Owen Fitch",
        role: "Group IT Infrastructure Lead",
        account: "B",
        accountName: "Aldermoor Industrial Group",
        organisation: "Aldermoor Corporate IT",
        classification: "Technical Blocker",
        decisionAuthority: "Plant network infrastructure and IT security compliance",
        budgetAuthority: "Corporate IT",
        paymentResponsibility: "None",
        actualUsage: "None",
        dealInfluence: "High",
        canBlock: true,
        relationshipStatus: "Neutral",
        lastInteraction: "2026-09-30 (Ticket FB-10903 pending)",
        supportingEvidence: ["b_idle", "FB-10903", "calls/2026-09-15_check_in.txt"],
        notes: "Network project risks cutting off docks. Ticket FB-10903 for Plant 11 offline link has been pending customer IT for weeks.",
        isKeyPersonRisk: false,
        isLeaving: false,
        hasUnresolvedRequest: true,
        unresolvedRequestDetails: "Ticket FB-10903: Plant 11 dock offline due to network drops. Pending IT investigation.",
      },
    ];
  }
}

export function getAllStakeholders(): StakeholderItem[] {
  return [...getAccountStakeholders("A"), ...getAccountStakeholders("B")];
}
