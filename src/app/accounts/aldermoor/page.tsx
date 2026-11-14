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
  Building2,
  Radio,
  ArrowLeft,
  PlusCircle,
} from "lucide-react";

export default function AldermoorPage() {
  const valuation = getAccountValuation("B");
  const stakeholders = getAccountStakeholders("B");
  const actions = getAccountActions("B");
  const risks = getAccountRisks("B");
  const unknowns = getAccountUnknowns("B");
  const signals = getAccountSignals("B");

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Header & Breadcrumb */}
      <div>
        <div className="flex items-center gap-2 text-xs text-[#9298A2] mb-2">
          <Link href="/" className="hover:text-[#F4F4F5] flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Overview</span>
          </Link>
          <span>/</span>
          <span className="text-[#FF762E] font-medium">Aldermoor Industrial Group (Account B)</span>
        </div>

        <div className="flex flex-wrap items-start justify-between gap-4 p-6 rounded-xl bg-gradient-to-r from-[#111419] to-[#15181D] border border-[#272C34]">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#FF762E]/15 text-[#FF762E] border border-[#FF762E]/30">
                ACCOUNT B • INDUSTRIAL AUTOMATION & SECURITY
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/15 text-amber-400 border border-amber-500/30">
                14 Docks Installed • 4 Plants Regular
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-red-500/15 text-red-400 border border-red-500/30">
                Event A Inactivity & Deputy Departure
              </span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-[#F4F4F5]">
              Aldermoor Industrial Group
            </h1>
            <p className="text-xs text-[#9298A2] leading-relaxed">
              Industrial manufacturing enterprise across 15 European plant facilities. 14 automated drone docks installed under 1-year contract (€140,000/yr). Factual operational audit proves <strong className="text-[#F4F4F5]">only 4 plants</strong> (Plants 3, 5, 7, 9) fly regular nightly patrols; 9 plants only log occasional test flights; Plant 15 has no dock. Group Head of Security Stefan Roy claims €1.2M annual savings, but source <code className="text-[#FF762E]">roi_spreadsheet.csv</code> confirms this is his own theoretical spreadsheet with ZERO guard contracts reduced and ZERO savings booked by finance.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() =>
                window.dispatchEvent(
                  new CustomEvent("open-note-modal", {
                    detail: { account: "B", kind: "deal", title: "Note for Aldermoor" },
                  })
                )
              }
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-md bg-[#FF762E] hover:bg-[#E6631F] text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer"
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
            <Radio className="w-4 h-4 text-red-400 animate-pulse" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#F4F4F5]">
              Live Account Signals (Event A Verified)
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
