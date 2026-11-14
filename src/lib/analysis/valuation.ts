import { getMcpAccountsRaw } from "../data/cache";

export interface DealItem {
  id: string;
  name: string;
  account: "A" | "B";
  accountName: string;
  value: number | null;
  currency: string;
  category: "confirmed" | "active" | "at_risk" | "closed" | "unsupported_projection" | "unknown";
  stage: string;
  relevantPerson?: string;
  supportingEvidence: string[];
  sourceId: string;
  sourcePath?: string;
  lastUpdated: string;
  confidence: "High" | "Medium" | "Low" | "Unverified";
  confidenceReason: string;
  blocker?: string;
  deadline?: string;
}

export interface AccountValuation {
  account: "A" | "B";
  accountName: string;
  currency: string;
  confirmedValue: number;
  potentialValue: number;
  atRiskValue: number;
  closedValue: number;
  unsupportedProjectionsValue: number;
  deals: DealItem[];
}

export function getAccountValuation(accountId: "A" | "B"): AccountValuation {
  const raw = getMcpAccountsRaw();
  const acc = raw?.accounts?.find((a: any) => a.id === accountId);
  const isA = accountId === "A";

  const deals: DealItem[] = [];

  if (isA) {
    // Account A: Eastern Counties Police Alliance (Currency: GBP £)
    // 1. Framework Tender
    deals.push({
      id: "a_tender",
      name: "300-Dock National Framework Tender",
      account: "A",
      accountName: "Eastern Counties Police Alliance",
      value: 1500000,
      currency: "£",
      category: "confirmed",
      stage: "agreed (specification in progress)",
      relevantPerson: "Rhys Calder & Hannah Doyle",
      supportingEvidence: ["rc_tender_2", "hd_weights_1", "hd_window_2", "draft_tender_spec"],
      sourceId: "draft_tender_spec",
      sourcePath: "files/draft_tender_spec.csv",
      lastUpdated: "2026-10-20",
      confidence: "High",
      confidenceReason: "Agreed framework tender preparation with Hannah Doyle; evaluation weights operating model at 40%",
      deadline: "Tender specification locks shortly; formal supplier window opens soon",
    });

    // 2. Extra docks for Metro Central
    deals.push({
      id: "a_extra_docks",
      name: "Extra Docks Expansion (Metro Central)",
      account: "A",
      accountName: "Eastern Counties Police Alliance",
      value: 180000,
      currency: "£",
      category: "active",
      stage: "offer open",
      relevantPerson: "Ewan Brooks (Finance Business Partner)",
      supportingEvidence: ["eb_sign_2", "eb_window_2", "a_extra_docks"],
      sourceId: "offers/a_extra_docks",
      lastUpdated: "2026-10-15",
      confidence: "Medium",
      confidenceReason: "Active offer to Ewan Brooks; dependent on autumn finance round business case",
      deadline: "Metro Central autumn finance bid window closes soon",
    });

    // 3. Priority Support
    deals.push({
      id: "a_priority_support",
      name: "Priority Support & Maintenance for Drone Units",
      account: "A",
      accountName: "Eastern Counties Police Alliance",
      value: 60000,
      currency: "£",
      category: "active",
      stage: "offer open",
      relevantPerson: "Insp. Karen Mbeki",
      supportingEvidence: ["a_priority_support", "km_usage_1"],
      sourceId: "offers/a_priority_support",
      lastUpdated: "2026-10-10",
      confidence: "Medium",
      confidenceReason: "Offer pending decision from Westmere drone leadership",
    });

    // 4. Operator Training
    deals.push({
      id: "a_training",
      name: "Operator Training Rota Expansion (New Pilots)",
      account: "A",
      accountName: "Eastern Counties Police Alliance",
      value: 45000,
      currency: "£",
      category: "active",
      stage: "offer open",
      relevantPerson: "Insp. Karen Mbeki",
      supportingEvidence: ["a_training", "km_staff_2"],
      sourceId: "offers/a_training",
      lastUpdated: "2026-10-10",
      confidence: "Medium",
      confidenceReason: "Westmere needs 9 more trained operators for 24/7 rota cover",
    });

    // 5. Contract Renewal (35 docks) - AT RISK
    deals.push({
      id: "a_renewal",
      name: "Alliance Contract Renewal (35 Docks)",
      account: "A",
      accountName: "Eastern Counties Police Alliance",
      value: 350000,
      currency: "£",
      category: "at_risk",
      stage: "qualified (blocked)",
      relevantPerson: "Rhys Calder / Force CFOs",
      supportingEvidence: ["rc_appetite_2", "km_usage_1", "flight_log_force_month", "rc_funding_2"],
      sourceId: "opportunities/a_renewal",
      sourcePath: "contract.txt",
      lastUpdated: "2026-10-28",
      confidence: "Low",
      confidenceReason: "At risk because only Westmere and Metro Central fly operationally. No pooled budget; each force CFO must approve call-off.",
      blocker: "Nobody can show which forces actually use the docks",
    });

    // 6. Tarn Valley and Norwold Rollout - AT RISK
    deals.push({
      id: "a_tarn",
      name: "Tarn Valley & Norwold Forces Go-Live",
      account: "A",
      accountName: "Eastern Counties Police Alliance",
      value: 200000,
      currency: "£",
      category: "at_risk",
      stage: "qualified (blocked)",
      relevantPerson: "Fatima Osei (DPO, Tarn Valley)",
      supportingEvidence: ["fo_dpia_2", "fo_needs_3", "pj_ticket", "srv_dataflow", "FB-10412"],
      sourceId: "FB-10412",
      sourcePath: "tickets.json",
      lastUpdated: "2026-10-20",
      confidence: "Low",
      confidenceReason: "Critically blocked by unanswered ticket FB-10412 logged 4 months ago for DPIA data-flow docs",
      blocker: "DPIA cannot be signed without data-flow pack FlytBase never sent",
    });

    // 7. Westmere Fleet Scale - AT RISK
    deals.push({
      id: "a_westmere",
      name: "Scale Westmere Drone Fleet",
      account: "A",
      accountName: "Eastern Counties Police Alliance",
      value: 250000,
      currency: "£",
      category: "at_risk",
      stage: "qualified (blocked)",
      relevantPerson: "Insp. Karen Mbeki & Ewan Brooks",
      supportingEvidence: ["km_staff_2", "eb_heli_1", "eb_drone_2", "helicopter_cost_overtime"],
      sourceId: "opportunities/a_westmere",
      sourcePath: "files/helicopter_cost_overtime.csv",
      lastUpdated: "2026-10-15",
      confidence: "Low",
      confidenceReason: "Blocked on cost per flight benchmark against helicopter £1,500/hr before autumn bid window closes",
      blocker: "No cost per flight against helicopter hours provided to Ewan Brooks",
      deadline: "Metro Central autumn finance bid window closes soon",
    });

    // 8. Unsupported Projections
    deals.push({
      id: "a_stadium_proj",
      name: "Westmere Stadium Project (30 Docks Claim)",
      account: "A",
      accountName: "Eastern Counties Police Alliance",
      value: 300000,
      currency: "£",
      category: "unsupported_projection",
      stage: "unverified claim",
      relevantPerson: "Rhys Calder",
      supportingEvidence: ["rc_stadium_0", "kb_stadium_view"],
      sourceId: "rc_stadium_0",
      lastUpdated: "2026-10-02",
      confidence: "Unverified",
      confidenceReason: "Claimed by Rhys Calder; Insp. Karen Mbeki reported the superintendent thinks 30 docks is unrealistic with current staffing",
    });
  } else {
    // Account B: Aldermoor Industrial Group (Currency: EUR €)
    // 1. Closed/Won Expansion
    deals.push({
      id: "b_more_plants",
      name: "Docks for Plant 15 & 2 Idle Plants",
      account: "B",
      accountName: "Aldermoor Industrial Group",
      value: 160000,
      currency: "€",
      category: "closed",
      stage: "closed / won",
      relevantPerson: "Stefan Roy (Group Head of Security)",
      supportingEvidence: ["b_more_plants", "sr_roll_2"],
      sourceId: "offers/b_more_plants",
      lastUpdated: "2026-10-05",
      confidence: "High",
      confidenceReason: "Signed offer for Plant 15 and 2 idle plants",
    });

    // 2. Night-Time Priority Support for Plant 7
    deals.push({
      id: "b_priority_support",
      name: "Night-Time Priority Support for Plant 7",
      account: "B",
      accountName: "Aldermoor Industrial Group",
      value: 50000,
      currency: "€",
      category: "active",
      stage: "offer open",
      relevantPerson: "Beatriz Alonso (Plant Manager, Plant 7)",
      supportingEvidence: ["b_priority_support", "ba_use_2"],
      sourceId: "offers/b_priority_support",
      lastUpdated: "2026-10-13",
      confidence: "Medium",
      confidenceReason: "Plant 7 is flying nightly patrols and receives critical night alerts",
    });

    // 3. Contract Renewal (14 Docks) - AT RISK
    deals.push({
      id: "b_renewal",
      name: "Annual Contract Renewal (14 Docks)",
      account: "B",
      accountName: "Aldermoor Industrial Group",
      value: 140000,
      currency: "€",
      category: "at_risk",
      stage: "qualified (blocked)",
      relevantPerson: "Nadia Rahman (Group Finance Controller)",
      supportingEvidence: ["b_renewal", "sr_roll_0", "sr_roll_2", "ba_use_2", "sr_roi_2", "flight_log_by_plant"],
      sourceId: "opportunities/b_renewal",
      sourcePath: "contract.txt",
      lastUpdated: "2026-10-13",
      confidence: "Low",
      confidenceReason: "Finance Controller Nadia Rahman cannot verify savings. Only 4 of 15 plants actually fly regular patrols.",
      blocker: "Finance cannot verify the savings the programme claims",
    });

    // 4. Idle Plants Regular Patrol Adoption - AT RISK
    deals.push({
      id: "b_idle",
      name: "Activate 9 Idle Plants into Regular Patrols",
      account: "B",
      accountName: "Aldermoor Industrial Group",
      value: 180000,
      currency: "€",
      category: "at_risk",
      stage: "qualified (blocked)",
      relevantPerson: "Stefan Roy's Deputy & Owen Fitch (IT)",
      supportingEvidence: ["sr_roll_2", "ba_use_2", "sr_plants_2", "sr_repl_2", "FB-10903"],
      sourceId: "opportunities/b_idle",
      sourcePath: "files/flight_log_by_plant.csv",
      lastUpdated: "2026-10-13",
      confidence: "Low",
      confidenceReason: "Network project risks cutting off docks; deputy who knows rollout is leaving and nothing is documented",
      blocker: "Network project will cut docks off; nobody owns operational adoption at plants",
      deadline: "Stefan's deputy leaves; rollout know-how lost unless documented",
    });

    // 5. Declined Reporting Offer
    deals.push({
      id: "b_reporting",
      name: "Flight-Log Reporting by Plant (Finance & Insurer)",
      account: "B",
      accountName: "Aldermoor Industrial Group",
      value: 70000,
      currency: "€",
      category: "closed",
      stage: "declined",
      relevantPerson: "Nadia Rahman (Finance Controller)",
      supportingEvidence: ["b_reporting"],
      sourceId: "offers/b_reporting",
      lastUpdated: "2026-09-15",
      confidence: "High",
      confidenceReason: "Declined by Nadia Rahman",
    });

    // 6. Sister Company Case Study - Unknown Value
    deals.push({
      id: "b_sister",
      name: "Case Study for 40-Plant Sister Company",
      account: "B",
      accountName: "Aldermoor Industrial Group",
      value: null,
      currency: "€",
      category: "unknown",
      stage: "identified / blocked",
      relevantPerson: "Stefan Roy",
      supportingEvidence: ["sr_roi_2", "sr_roll_2", "flight_log_by_plant"],
      sourceId: "opportunities/b_sister",
      lastUpdated: "2026-10-13",
      confidence: "Unverified",
      confidenceReason: "No confirmed contract value; blocked on verifiable savings breakdown and plant quote",
      blocker: "Blocked on savings breakdown and plant willing to be quoted",
    });

    // 7. Stefan Roy's Claimed Savings Projection (UNSUPPORTED)
    deals.push({
      id: "b_roi_claim",
      name: "Stefan Roy's Claimed Annual Savings Projection",
      account: "B",
      accountName: "Aldermoor Industrial Group",
      value: 1200000,
      currency: "€",
      category: "unsupported_projection",
      stage: "unverified claim",
      relevantPerson: "Stefan Roy",
      supportingEvidence: ["sr_roi_0", "sr_roi_2", "roi_spreadsheet"],
      sourceId: "roi_spreadsheet",
      sourcePath: "files/roi_spreadsheet.csv",
      lastUpdated: "2026-10-13",
      confidence: "Unverified",
      confidenceReason: "Pure theoretical spreadsheet assumption of replaceable guard hours; NO guard contract reduced, NO savings booked by finance",
    });
  }

  // Calculate totals
  let confirmed = 0;
  let potential = 0;
  let atRisk = 0;
  let closed = 0;
  let unsupported = 0;

  for (const d of deals) {
    const v = d.value || 0;
    if (d.category === "confirmed") confirmed += v;
    if (d.category === "active") potential += v;
    if (d.category === "at_risk") atRisk += v;
    if (d.category === "closed" && d.stage.includes("won")) closed += v;
    if (d.category === "unsupported_projection") unsupported += v;
  }

  return {
    account: accountId,
    accountName: isA ? "Eastern Counties Police Alliance" : "Aldermoor Industrial Group",
    currency: isA ? "£" : "€",
    confirmedValue: confirmed,
    potentialValue: potential,
    atRiskValue: atRisk,
    closedValue: closed,
    unsupportedProjectionsValue: unsupported,
    deals,
  };
}

export function getOverallPipeline() {
  const vA = getAccountValuation("A");
  const vB = getAccountValuation("B");

  return {
    easternCounties: vA,
    aldermoor: vB,
    allDeals: [...vA.deals, ...vB.deals],
  };
}
