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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
      {/* Main Scatter Chart (8 cols) */}
      <div className="lg:col-span-8 matte-card p-5 rounded-2xl relative overflow-hidden flex flex-col justify-between">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#25282D]">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF5A00]" />
              <h3 className="text-sm font-semibold text-[#F4F4F5] uppercase tracking-wider font-mono">
                Deal Momentum
              </h3>
            </div>
            <p className="text-xs text-[#9A9FA8] mt-0.5">
              Each bubble is a live deal, placed by days since last touch. Orange bubbles indicate high urgency.
            </p>
          </div>

          <Link
            href="/deals"
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#141619] hover:bg-[#1D2024] border border-[#25282D] text-xs font-medium text-[#F4F4F5] transition-colors self-start sm:self-auto"
          >
            <span>Open Pipeline Board</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#FF5A00]" />
          </Link>
        </div>

        {/* Scatter Canvas */}
        <div className="pt-4 relative min-h-[300px] flex flex-col justify-between">
          {/* Hatched Going Quiet Background on the right (days 6 to 12) */}
          <div
            className="absolute top-4 bottom-8 right-0 w-[45%] border-l border-dashed border-[#25282D] bg-[repeating-linear-gradient(45deg,#0D0F12,#0D0F12_10px,#141619_10px,#141619_20px)] rounded-r-xl pointer-events-none opacity-60"
          >
            <div className="absolute top-2 right-3 text-[10px] font-mono text-[#FF5A00]/90 bg-[#0D0F12]/80 px-2 py-0.5 rounded border border-[#FF5A00]/20">
              Going quiet • FlytBot nudges these
            </div>
          </div>

          {/* Rows for stages */}
          <div className="space-y-6 relative z-10">
            {stages.map((stage) => {
              const stageDeals = DEALS.filter((d) => d.stage === stage);
              const totalVal = stageDeals.reduce((sum, d) => sum, "");

              return (
                <div
                  key={stage}
                  className="relative flex items-center h-12 border-b border-[#1C1F26]/70 group"
                >
                  {/* Y-axis Label */}
                  <div className="w-32 flex-shrink-0 pr-2">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          stage === "Negotiation"
                            ? "bg-[#FF5A00]"
                            : "bg-[#606570]"
                        }`}
                      />
                      <span className="text-xs font-bold text-[#F4F4F5]">
                        {stage}
                      </span>
                    </div>
                    <div className="text-[10px] font-mono text-[#9A9FA8]">
                      {stageDeals.length} deals
                    </div>
                  </div>

                  {/* Horizontal plot area */}
                  <div className="relative flex-1 h-full flex items-center">
                    {stageDeals.map((deal) => {
                      // X position: 0 to 12 days -> map to 5% to 92%
                      const xPercent = Math.min(92, Math.max(5, (deal.daysSinceTouch / 11) * 87 + 5));
                      const isSelected = selectedDeal.id === deal.id;

                      let bubbleColor =
                        "bg-[#141619] border-[#25282D] text-[#9A9FA8] hover:border-[#606570]";
                      if (deal.isUrgent) {
                        bubbleColor =
                          "bg-[#FF5A00] border-[#FFA066] text-black font-extrabold shadow-lg";
                      } else if (deal.status === "going_quiet") {
                        bubbleColor =
                          "bg-[#1D2024] border-red-800/60 text-red-400";
                      }

                      return (
                        <button
                          key={deal.id}
                          style={{ left: `${xPercent}%` }}
                          onClick={() => setSelectedDeal(deal)}
                          className={`absolute -translate-x-1/2 w-8 h-8 rounded-full border flex items-center justify-center font-bold text-xs transition-all duration-350 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer ${bubbleColor} ${
                            isSelected
                              ? "ring-2 ring-white scale-125 z-30"
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
          <div className="relative pt-3 border-t border-[#25282D] flex justify-between text-[11px] font-mono text-[#606570] px-32">
            <span>Touched today</span>
            <span>5 days</span>
            <span>10 days+</span>
          </div>
        </div>

        {/* Selected Deal Micro-drawer */}
        {selectedDeal && (
          <div className="mt-4 p-3.5 rounded-xl bg-[#0D0F12] border border-[#25282D] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded bg-[#FF5A00] text-black font-bold text-[11px] flex items-center justify-center">
                  {selectedDeal.letter}
                </span>
                <span className="text-xs font-bold text-white">
                  {selectedDeal.name}
                </span>
                <span className="px-2 py-0.2 rounded-full text-[10px] font-mono bg-[#141619] border border-[#25282D] text-[#FF5A00]">
                  {selectedDeal.valueStr}
                </span>
                <span className="text-xs text-[#9A9FA8]">
                  • {selectedDeal.account}
                </span>
              </div>
              <p className="text-xs text-[#E4E4E7]">
                <span className="text-[#FF5A00] font-semibold">Recommendation: </span>
                {selectedDeal.recommendation}
              </p>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-[11px] font-mono text-[#9A9FA8]">
                Last touch: {selectedDeal.daysSinceTouch}d ago
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Right Column: Closing in 30 Days & Suggestions (4 cols) */}
      <div className="lg:col-span-4 space-y-4">
        {/* Closing in 30 days card */}
        <div className="matte-card p-4 rounded-2xl">
          <div className="flex items-center justify-between pb-3 border-b border-[#25282D]">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Closing in 30 Days
            </h4>
            <span className="text-[10px] font-mono text-[#606570]">4 Deals</span>
          </div>

          <div className="space-y-2.5 pt-3">
            {CLOSING_DEALS.map((deal) => (
              <div
                key={deal.name}
                className="p-2.5 rounded-xl bg-[#0D0F12] border border-[#25282D] flex items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-white truncate">
                    {deal.name}
                  </div>
                  <div className="text-[11px] font-mono text-[#9A9FA8]">
                    {deal.value} • in {deal.days}
                  </div>
                </div>

                {/* Circular Score Badge */}
                <div className="w-8 h-8 rounded-full border border-[#25282D] bg-[#141619] flex items-center justify-center font-mono text-[11px] font-bold">
                  <span className={deal.color}>{deal.score}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Nova / FlytBot Suggests Card */}
        <div className="matte-card p-4 rounded-2xl bg-gradient-to-br from-[#0D0F12] to-[#141619]">
          <div className="flex items-center gap-2 pb-2">
            <div className="w-6 h-6 rounded-lg bg-[#FF5A00]/20 border border-[#FF5A00]/40 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-[#FF5A00]" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">FlytBot Suggests</div>
              <div className="text-[10px] text-[#9A9FA8]">Account Intelligence Agent</div>
            </div>
          </div>

          <div className="space-y-2 pt-2 text-xs text-[#E4E4E7]">
            <div className="p-2.5 rounded-lg bg-[#050505] border border-[#25282D]">
              <div className="text-[#F4F4F5] font-medium">
                Dispatch field technician for Plants 4, 8, 12
              </div>
              <div className="text-[11px] text-[#9A9FA8] mt-1">
                Zero flights recorded since 2 Nov. Ticket FB-10488 VIP flyover is in 21 days.
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-[#050505] border border-[#25282D]">
              <div className="text-[#F4F4F5] font-medium">
                Deliver thermal hashing spec to Ewan Brooks
              </div>
              <div className="text-[11px] text-[#9A9FA8] mt-1">
                Unblocks 4 Tarn Valley docks and unlocks £285k expansion deal.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
