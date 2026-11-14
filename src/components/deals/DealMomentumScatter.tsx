"use client";

import React, { useState } from "react";
import {
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  ExternalLink,
  Clock,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";

interface DealBubble {
  id: string;
  letter: string;
  name: string;
  account: string;
  valueStr: string;
  stage: "Inquiry" | "Qualified" | "Proposal" | "Negotiation";
  daysSinceTouch: number; // 0 to 12
  isUrgent?: boolean;
  status: "active" | "going_quiet" | "critical";
  recommendation: string;
}

const DEALS: DealBubble[] = [
  // Negotiation stage
  {
    id: "deal-1",
    letter: "E",
    name: "Eastern Counties 300-Dock Framework",
    account: "Eastern Counties Police",
    valueStr: "£1,500,000",
    stage: "Negotiation",
    daysSinceTouch: 1,
    isUrgent: true,
    status: "active",
    recommendation: "Review dual-vendor contingency clause with ACC Nadia Rahman.",
  },
  {
    id: "deal-2",
    letter: "T",
    name: "Tarn Valley Expansion FB-10412",
    account: "Eastern Counties Police",
    valueStr: "£285,000",
    stage: "Negotiation",
    daysSinceTouch: 7, // in going quiet zone
    isUrgent: true,
    status: "going_quiet",
    recommendation: "Submit cryptographic stream hashing verification to DPO Ewan Brooks.",
  },
  {
    id: "deal-3",
    letter: "K",
    name: "Chemical Corridor VIP Expansion",
    account: "Aldermoor Industrial",
    valueStr: "€320,000",
    stage: "Negotiation",
    daysSinceTouch: 2,
    isUrgent: true,
    status: "active",
    recommendation: "Ensure Plants 4,8,12 complete dry-run flyover before 5 Dec.",
  },

  // Proposal stage
  {
    id: "deal-4",
    letter: "M",
    name: "Metro Central Emergency Drones",
    account: "Eastern Counties Police",
    valueStr: "£180,000",
    stage: "Proposal",
    daysSinceTouch: 3,
    status: "active",
    recommendation: "Confirm battery swap cycle benchmark with Chief Insp. Sarah Miller.",
  },
  {
    id: "deal-5",
    letter: "A",
    name: "Aldermoor Plants 3,5,7,9 Upgrade",
    account: "Aldermoor Industrial",
    valueStr: "€160,000",
    stage: "Proposal",
    daysSinceTouch: 4,
    status: "active",
    recommendation: "Prepare revised ROI audit correcting Stefan Roy's €1.2M spreadsheet.",
  },
  {
    id: "deal-6",
    letter: "N",
    name: "Norwold Police Hub Integration",
    account: "Eastern Counties Police",
    valueStr: "£95,000",
    stage: "Proposal",
    daysSinceTouch: 8, // in going quiet zone
    status: "going_quiet",
    recommendation: "Nudge Insp. Dave Green on LTE backhaul antenna positioning.",
  },

  // Qualified stage
  {
    id: "deal-7",
    letter: "W",
    name: "Westmere Port Automated Security",
    account: "Eastern Counties Police",
    valueStr: "£120,000",
    stage: "Qualified",
    daysSinceTouch: 3,
    status: "active",
    recommendation: "Send marine salt-fog corrosion test certificates.",
  },
  {
    id: "deal-8",
    letter: "R",
    name: "Rhys Calder Handover Escrow",
    account: "Aldermoor Industrial",
    valueStr: "€50,000",
    stage: "Qualified",
    daysSinceTouch: 9, // going quiet
    status: "going_quiet",
    recommendation: "Establish dock firmware repository backup before Jan 2027 departure.",
  },

  // Inquiry stage
  {
    id: "deal-9",
    letter: "B",
    name: "Boundary Sensors Integration Phase 2",
    account: "Aldermoor Industrial",
    valueStr: "€75,000",
    stage: "Inquiry",
    daysSinceTouch: 2,
    status: "active",
    recommendation: "Validate optical tripwire integration with existing SCADA gateway.",
  },
  {
    id: "deal-10",
    letter: "C",
    name: "Cumbria Rural Drone Interceptor",
    account: "Eastern Counties Police",
    valueStr: "£65,000",
    stage: "Inquiry",
    daysSinceTouch: 6,
    status: "active",
    recommendation: "Schedule preliminary payload demonstration.",
  },
];

const CLOSING_DEALS = [
  { name: "ECP 300-Dock Framework", value: "£1,500,000", days: "14d", score: 85, color: "text-emerald-400" },
  { name: "Aldermoor VIP Corridor (FB-10488)", value: "€320,000", days: "21d", score: 70, color: "text-[#FF5A00]" },
  { name: "Tarn Valley Expansion (FB-10412)", value: "£285,000", days: "28d", score: 45, color: "text-red-400" },
  { name: "Plants 3,5,7,9 Upgrade", value: "€160,000", days: "35d", score: 78, color: "text-emerald-400" },
];

export const DealMomentumScatter: React.FC = () => {
  const [selectedDeal, setSelectedDeal] = useState<DealBubble>(DEALS[1]); // Tarn Valley

  const stages: Array<"Negotiation" | "Proposal" | "Qualified" | "Inquiry"> = [
    "Negotiation",
    "Proposal",
    "Qualified",
    "Inquiry",
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
      {/* Main Scatter Chart (8 cols) */}
      <div className="lg:col-span-8 bg-white p-5 rounded-2xl border border-[#E2E5DE] shadow-sm relative overflow-hidden flex flex-col space-y-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E2E5DE]">
          <div>
            <h3 className="text-base font-semibold text-[#151515]">
              Deal momentum
            </h3>
            <p className="text-xs text-[#747A80] mt-0.5">
              Each bubble is a deal, sized by value and placed by days since the last touch.
            </p>
          </div>

          <Link
            href="/deals"
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#F4F5F0] hover:bg-[#ECEFE5] border border-[#E2E5DE] text-xs font-medium text-[#151515] transition-colors self-start sm:self-auto"
          >
            <span>Open board</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#536F00]" />
          </Link>
        </div>

        {/* Scatter Canvas */}
        <div className="pt-2 relative flex flex-col space-y-3">
          {/* Hatched Going Quiet Background on the right (days 5 to 10+) */}
          <div
            className="absolute top-4 bottom-8 right-0 w-[45%] border-l border-dashed border-[#E2E5DE] bg-[repeating-linear-gradient(45deg,#FAFBF8,#FAFBF8_10px,#F4F5F0_10px,#F4F5F0_20px)] rounded-r-xl pointer-events-none"
          >
            <div className="absolute top-2 right-3 text-[10px] font-mono text-[#C78620] bg-white/90 px-2 py-0.5 rounded-full border border-[#E2E5DE] shadow-xs">
              Going quiet · Nova nudges these
            </div>
          </div>

          {/* Rows for stages */}
          <div className="space-y-6 relative z-10">
            {stages.map((stage) => {
              const stageDeals = DEALS.filter((d) => d.stage === stage);

              return (
                <div
                  key={stage}
                  className="relative flex items-center h-12 border-b border-[#F4F5F0] group"
                >
                  {/* Y-axis Label */}
                  <div className="w-36 flex-shrink-0 pr-2">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          stage === "Negotiation"
                            ? "bg-[#FF5A00]"
                            : "bg-[#747A80]"
                        }`}
                      />
                      <span className="text-xs font-semibold text-[#151515]">
                        {stage}
                      </span>
                    </div>
                    <div className="text-[10px] font-mono text-[#747A80]">
                      {stageDeals.length} • {stage === "Negotiation" ? "£1.8M" : "£340k"}
                    </div>
                  </div>

                  {/* Horizontal plot area */}
                  <div className="relative flex-1 h-full flex items-center">
                    {stageDeals.map((deal) => {
                      // X position: 0 to 12 days -> map to 5% to 92%
                      const xPercent = Math.min(92, Math.max(5, (deal.daysSinceTouch / 11) * 87 + 5));
                      const isSelected = selectedDeal.id === deal.id;

                      let bubbleColor =
                        "bg-[#2A2D34] border-[#151515] text-white";
                      if (deal.isUrgent) {
                        bubbleColor =
                          "bg-[#FF5A00] border-[#E04F00] text-white font-extrabold shadow-sm";
                      } else if (deal.status === "going_quiet") {
                        bubbleColor =
                          "bg-[#171717] border-[#171717] text-white";
                      }

                      return (
                        <button
                          key={deal.id}
                          style={{ left: `${xPercent}%` }}
                          onClick={() => setSelectedDeal(deal)}
                          className={`absolute -translate-x-1/2 w-8 h-8 rounded-full border flex items-center justify-center font-bold text-xs transition-all duration-200 cursor-pointer ${bubbleColor} ${
                            isSelected
                              ? "ring-2 ring-[#536F00] scale-125 z-30 shadow-md"
                              : "hover:scale-110 z-20"
                          }`}
                          title={`${deal.name} (${deal.valueStr})`}
                        >
                          {deal.letter}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* X Axis Time Labels */}
          <div className="relative pt-3 border-t border-[#E2E5DE] flex justify-between text-[11px] font-mono text-[#747A80] px-36">
            <span>Touched today</span>
            <span>5 days</span>
            <span>10 days+</span>
          </div>
        </div>

        {/* Selected Deal Micro-drawer */}
        {selectedDeal && (
          <div className="mt-4 p-3.5 rounded-xl bg-[#F4F5F0] border border-[#E2E5DE] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded bg-[#171717] text-white font-bold text-[11px] flex items-center justify-center">
                  {selectedDeal.letter}
                </span>
                <span className="text-xs font-bold text-[#151515]">
                  {selectedDeal.name}
                </span>
                <span className="px-2 py-0.2 rounded-full text-[10px] font-mono bg-white border border-[#E2E5DE] text-[#536F00] font-semibold">
                  {selectedDeal.valueStr}
                </span>
                <span className="text-xs text-[#747A80]">
                  • {selectedDeal.account}
                </span>
              </div>
              <p className="text-xs text-[#151515]">
                <span className="text-[#536F00] font-semibold">Recommendation: </span>
                {selectedDeal.recommendation}
              </p>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-[11px] font-mono text-[#747A80]">
                Last touch: {selectedDeal.daysSinceTouch}d ago
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Right Column: Closing in 30 Days & Suggestions (4 cols) */}
      <div className="lg:col-span-4 space-y-4">
        {/* Closing in 30 days card */}
        <div className="bg-white p-4 rounded-2xl border border-[#E2E5DE] shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-[#E2E5DE]">
            <h4 className="text-xs font-bold text-[#151515] uppercase tracking-wider font-mono">
              Closing in 30 days
            </h4>
            <span className="text-[10px] font-mono text-[#747A80]">4 Deals</span>
          </div>

          <div className="space-y-2.5 pt-3">
            {CLOSING_DEALS.map((deal) => (
              <div
                key={deal.name}
                className="p-2.5 rounded-xl bg-[#F4F5F0] border border-[#E2E5DE] flex items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-[#151515] truncate">
                    {deal.name}
                  </div>
                  <div className="text-[11px] font-mono text-[#747A80]">
                    {deal.value} • in {deal.days}
                  </div>
                </div>

                {/* Circular Score Badge */}
                <div className="w-8 h-8 rounded-full border border-[#D5DAD0] bg-white flex items-center justify-center font-mono text-[11px] font-bold shadow-xs">
                  <span className={deal.score >= 70 ? "text-[#398B46]" : "text-[#C78620]"}>
                    {deal.score}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Nova / FlytBot Suggests Card */}
        <div className="bg-white p-4 rounded-2xl border border-[#E2E5DE] shadow-sm">
          <div className="flex items-center gap-2 pb-2">
            <div className="w-6 h-6 rounded-lg bg-[#ECEFE5] border border-[#D5DAD0] flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-[#536F00]" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#151515]">Nova suggests</div>
              <div className="text-[10px] text-[#747A80]">Sales follow-up agent</div>
            </div>
          </div>

          <div className="space-y-2 pt-2 text-xs text-[#151515]">
            <div className="p-2.5 rounded-lg bg-[#F4F5F0] border border-[#E2E5DE]">
              <div className="text-[#151515] font-medium">
                Follow up with Kenji on the Tessellate proposal
              </div>
              <div className="text-[11px] text-[#747A80] mt-1 flex items-center gap-1.5">
                <span>8h ago</span>
                <span>•</span>
                <span className="text-[#536F00] font-medium">waiting for you</span>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-[#F4F5F0] border border-[#E2E5DE]">
              <div className="text-[#151515] font-medium">
                Suggested next step for Harbor & Vine: send the phased proposal before 11:00
              </div>
              <div className="text-[11px] text-[#747A80] mt-1 text-[#747A80]">
                8h ago
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
