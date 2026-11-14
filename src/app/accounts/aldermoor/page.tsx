"use client";

import React from "react";
import Link from "next/link";
import { getAccountValuation } from "@/lib/analysis/valuation";
import { getAccountStakeholders } from "@/lib/analysis/stakeholders";
import { getAccountActions } from "@/lib/analysis/recommendations";
import { getAccountRisks } from "@/lib/analysis/risks";
import { getAccountUnknowns } from "@/lib/analysis/unknowns";
import { getAccountSignals } from "@/lib/analysis/signals";
import { QuestionTabs } from "@/components/dashboard/QuestionTabs";
import { SignalFeed } from "@/components/signals/SignalFeed";
import {
  ArrowLeft,
  PlusCircle,
  Radio,
} from "lucide-react";

export default function AldermoorPage() {
  const valuation = getAccountValuation("B");
  const stakeholders = getAccountStakeholders("B");
  const actions = getAccountActions("B");
  const risks = getAccountRisks("B");
  const unknowns = getAccountUnknowns("B");
  const signals = getAccountSignals("B");

  return (
    <div className="space-y-6">
      {/* Top Header & Breadcrumb */}
      <div>
        <div className="flex items-center gap-2 text-xs text-[#8E929E] mb-2">
          <Link href="/" className="hover:text-[#F4F4F5] flex items-center gap-1 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Overview</span>
          </Link>
          <span>/</span>
          <span className="text-[#FF5500] font-medium">Aldermoor Industrial Group (Account B)</span>
        </div>

        <div className="flex flex-wrap items-start justify-between gap-4 p-5 rounded-xl matte-card">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#FF5500]/12 text-[#FF6519] border border-[#FF5500]/30">
                ACCOUNT B • INDUSTRIAL AUTOMATION & SECURITY
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#1A1009] text-[#FFA066] border border-[#5E2B0C]">
                14 Docks Installed • 4 Plants Regular
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#240C04] text-[#FF5500] border border-[#8C2A00] font-semibold">
                Event A Inactivity & Deputy Departure
              </span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-[#F4F4F5]">
              Aldermoor Industrial Group
            </h1>
            <p className="text-xs text-[#8E929E] leading-relaxed">
              Industrial manufacturing enterprise across 15 European plant facilities. 14 automated drone docks installed under 1-year contract (€140,000/yr). Factual operational audit proves <strong className="text-[#F4F4F5]">only 4 plants</strong> (Plants 3, 5, 7, 9) fly regular nightly patrols; 9 plants only log occasional test flights; Plant 15 has no dock. Group Head of Security Stefan Roy claims €1.2M annual savings, but source <code className="text-[#FF5500]">roi_spreadsheet.csv</code> confirms this is his own theoretical spreadsheet with ZERO guard contracts reduced and ZERO savings booked by finance.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() =>
                window.dispatchEvent(
                  new CustomEvent("open-note-modal", {
                    detail: { account: "B", kind: "note", title: "Note for Aldermoor" },
                  })
                )
              }
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FF5500] hover:bg-[#E04B00] text-white text-xs font-semibold shadow-md shadow-[#FF5500]/20 transition-all duration-200 cursor-pointer active:scale-95"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Write MCP Note</span>
            </button>
          </div>
        </div>
      </div>

      {/* Account Specific Signals Alert Banner (Event A) */}
      {signals.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-[#FF5500] animate-pulse" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#F4F4F5]">
              Live Account Signals (Event A Grounding Verified)
            </h2>
          </div>
          <SignalFeed signals={signals} showAccountFilter={false} />
        </div>
      )}

      {/* Five Required Questions Intelligence Engine */}
      <QuestionTabs
        valuation={valuation}
        stakeholders={stakeholders}
        actions={actions}
        risks={risks}
        unknowns={unknowns}
      />
    </div>
  );
}
