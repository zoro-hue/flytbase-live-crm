import { getUserActionOverrides, saveUserActionOverride } from "../data/cache";

export interface ActionItem {
  id: string;
  rank: number;
  title: string;
  nextStep: string;
  reason: string;
  owner: string;
  ownerStatus: "Assigned" | "Proposed" | "Unassigned";
  dueDate: string;
  dueDateStatus: "Confirmed" | "Proposed" | "Urgent" | "Overdue";
  account: "A" | "B";
  accountName: string;
  affectedDeal: string;
  expectedOutcome: string;
  supportingSourceId: string;
  supportingSourceName: string;
  status: "Proposed" | "In Progress" | "Completed" | "Blocked";
  isTopThree: boolean;
  notes?: string;
}

const DEFAULT_ACTIONS: ActionItem[] = [
  // --- ACCOUNT A ---
  {
    id: "action_a_1",
    rank: 1,
    title: "Urgent Response to Insp. Karen Mbeki's Public Event Ticket (5 Dec Deadline)",
    nextStep:
      "Send formal written reply confirming: (1) specific training dates for 2 additional drone operators prior to 5 Dec, and (2) on-call engineering failover responder protocol if a dock fails on event day.",
    reason:
      "Karen Mbeki logged ticket on 18 Nov requiring written commitments this week before 5 Dec public event. No response has been sent. Failure jeopardizes frontline police operations and alliance relationship.",
    owner: "Lead CSM (Neel Sharma) / Support Desk",
    ownerStatus: "Assigned",
    dueDate: "2026-11-25",
    dueDateStatus: "Urgent",
    account: "A",
    accountName: "Eastern Counties Police Alliance",
    affectedDeal: "Scale Westmere Fleet (£250k) & Alliance Renewal (£350k)",
    expectedOutcome:
      "Secures operational readiness for Westmere public event, eliminates customer anxiety, and preserves key champion relationship.",
    supportingSourceId: "FB-10650",
    supportingSourceName: "Support Ticket FB-10650 & Event B Signal",
    status: "In Progress",
    isTopThree: true,
  },
  {
    id: "action_a_2",
    rank: 2,
    title: "Deliver Data-Flow Compliance Pack to Fatima Osei (DPO, Tarn Valley)",
    nextStep:
      "Produce data-flow pack covering video flows, retention periods, cloud/local storage architecture, and RBAC controls. CSM to deliver directly to Fatima Osei and schedule review call.",
    reason:
      "Ticket FB-10412 sat unassigned for 4 months. Fatima confirmed she needs these 4 documents to complete DPIA in 3 weeks, unblocking Tarn Valley & Norwold rollout (£200k).",
    owner: "SRV (Director of Engineering) & CSM",
    ownerStatus: "Assigned",
    dueDate: "2026-12-01",
    dueDateStatus: "Confirmed",
    account: "A",
    accountName: "Eastern Counties Police Alliance",
    affectedDeal: "Tarn Valley & Norwold Go-Live (£200,000)",
    expectedOutcome:
      "Clears statutory blocker on 8 idle docks across Tarn Valley and Norwold, unlocking £200k recurring revenue.",
    supportingSourceId: "FB-10412",
    supportingSourceName: "Ticket FB-10412 & Fact srv_dataflow",
    status: "Proposed",
    isTopThree: true,
  },
  {
    id: "action_a_3",
    rank: 3,
    title: "Submit 300-Dock Framework Operating Model & Helicopter Cost Benchmark",
    nextStep:
      "Submit formal written clarification to Hannah Doyle for the 300-dock tender, and provide Ewan Brooks with drone cost-per-flight benchmark against the £1,500/hr helicopter benchmark.",
    reason:
      "Framework tender evaluation weights operating model & cost-per-flight at 40% (Hannah Doyle). Ewan Brooks' CFO will only approve call-off with this benchmark before autumn bid window closes.",
    owner: "Achal Negi (Director of BD) & Pranjal Suyal (Lead Solutions Engineer)",
    ownerStatus: "Assigned",
    dueDate: "2026-12-08",
    dueDateStatus: "Confirmed",
    account: "A",
    accountName: "Eastern Counties Police Alliance",
    affectedDeal: "300-Dock National Framework Tender (£1,500,000)",
    expectedOutcome:
      "Positions FlytBase as sole compliant vendor in £1.5M national framework and unlocks Metro Central expansion.",
    supportingSourceId: "draft_tender_spec",
    supportingSourceName: "Draft Tender Spec & Fact hd_weights_1",
    status: "Proposed",
    isTopThree: true,
  },

  // --- ACCOUNT B ---
  {
    id: "action_b_1",
    rank: 1,
    title: "Proactive Outreach for 3 Docks Inactive Since 2-29 November (Event A)",
    nextStep:
      "Dispatch field alert and schedule immediate call with Stefan Roy and plant managers to investigate why 3 previously active docks (AD-02, AD-05, AD-08/10 at Plants 3, 5, 9) stopped flying despite being online.",
    reason:
      "Event A signal: 3 docks with zero flights over last 2 weeks remain online; customer has raised no ticket. Indicates silent operational abandonment or local site blocker.",
    owner: "Lead CSM (Neel Sharma) & Field Support",
    ownerStatus: "Assigned",
    dueDate: "2026-11-20",
    dueDateStatus: "Urgent",
    account: "B",
    accountName: "Aldermoor Industrial Group",
    affectedDeal: "Aldermoor Renewal (€140,000) & Priority Support (€50,000)",
    expectedOutcome:
      "Diagnoses root cause (e.g. guard contract gap, sensor recalibration) before customer disputes contract value at renewal.",
    supportingSourceId: "flight_log_by_plant",
    supportingSourceName: "Flight Log by Plant & Event A Signal",
    status: "In Progress",
    isTopThree: true,
  },
  {
    id: "action_b_2",
    rank: 2,
    title: "Capture Complete Plant Deployment Know-How from Stefan's Departing Deputy",
    nextStep:
      "Conduct in-depth knowledge transfer session with Stefan Roy's deputy before his departure to obtain: (1) dock-to-plant mapping list, (2) plant operator contacts, and (3) network topologies.",
    reason:
      "Deputy leaves in Nov/Dec; all rollout know-how lives in his head. Multiple requests by FlytBase CSM have gone unanswered. Without this, 9 idle plants cannot be supported.",
    owner: "Pranjal Suyal (Lead Solutions Engineer) / CSM",
    ownerStatus: "Assigned",
    dueDate: "2026-11-28",
    dueDateStatus: "Urgent",
    account: "B",
    accountName: "Aldermoor Industrial Group",
    affectedDeal: "Activate 9 Idle Plants (€180,000)",
    expectedOutcome:
      "Preserves mission-critical rollout documentation, enabling ongoing maintenance and adoption across all 14 installed docks.",
    supportingSourceId: "calls/2026-04-23_rollout_close.txt",
    supportingSourceName: "Rollout Close Call & Fact sr_repl_2",
    status: "Proposed",
    isTopThree: true,
  },
  {
    id: "action_b_3",
    rank: 3,
    title: "Deliver Plant-by-Plant Renewal Proposal to Group Finance Controller Nadia Rahman",
    nextStep:
      "Respond to Nadia Rahman's 8 Oct finance mailbox request with a transparent renewal quote broken down per plant, showing actual flight data from active plants and realistic pricing for idle plants.",
    reason:
      "Nadia Rahman controls budget and cannot verify Stefan Roy's unverified €1.2M spreadsheet claims. Unanswered email risks contract cancellation on 1 Feb 2027.",
    owner: "Achal Negi (Director of BD) & CSM",
    ownerStatus: "Assigned",
    dueDate: "2026-12-05",
    dueDateStatus: "Confirmed",
    account: "B",
    accountName: "Aldermoor Industrial Group",
    affectedDeal: "Annual Contract Renewal (€140,000)",
    expectedOutcome:
      "Builds credible financial trust with economic buyer, bypassing unverified savings claims to secure €140k contract renewal.",
    supportingSourceId: "emails/2026-10-08_finance_mailbox.txt",
    supportingSourceName: "Finance Mailbox Email & Fact sr_roi_2",
    status: "Proposed",
    isTopThree: true,
  },
];

export function getAccountActions(accountId?: "A" | "B"): ActionItem[] {
  const overrides = getUserActionOverrides();

  const actions = DEFAULT_ACTIONS.map((action) => {
    const ov = overrides[action.id];
    if (ov) {
      return {
        ...action,
        status: ov.status || action.status,
        owner: ov.owner || action.owner,
        notes: ov.notes || action.notes,
      };
    }
    return action;
  });

  if (accountId) {
    return actions.filter((a) => a.account === accountId);
  }
  return actions;
}

export function updateAction(
  actionId: string,
  updates: Partial<{ status: ActionItem["status"]; owner: string; notes: string }>
) {
  return saveUserActionOverride(actionId, updates);
}
