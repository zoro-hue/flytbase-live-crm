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

export default function EasternCountiesPage() {
  const valuation = getAccountValuation("A");
  const stakeholders = getAccountStakeholders("A");
  const actions = getAccountActions("A");
  const risks = getAccountRisks("A");
  const unknowns = getAccountUnknowns("A");
  const signals = getAccountSignals("A");

  return (
    <div className="space-y-6 section-matte-enter">
      {/* Top Header & Breadcrumb */}
      <div>
        <div className="flex items-center gap-2 text-xs text-[#8E929E] mb-2">
          <Link href="/" className="hover:text-[#F4F4F5] flex items-center gap-1 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Overview</span>
          </Link>
          <span>/</span>
          <span className="text-[#FF5500] font-medium">Eastern Counties Police Alliance (Account A)</span>
        </div>

        <div className="flex flex-wrap items-start justify-between gap-4 p-5 rounded-xl matte-card">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#FF5500]/12 text-[#FF6519] border border-[#FF5500]/30">
                ACCOUNT A • UK PUBLIC SAFETY
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#14161C] text-[#E4E4E7] border border-[#262A34]">
                35 Docks Installed • 4 Forces
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#240C04] text-[#FF5500] border border-[#8C2A00] font-semibold">
                Departure & Unanswered Tickets Active
              </span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-[#F4F4F5]">
              Eastern Counties Police Alliance
            </h1>
            <p className="text-xs text-[#8E929E] leading-relaxed">
              Consortium of four county police forces: <strong className="text-[#F4F4F5]">Westmere Constabulary</strong> (18 docks, daily live patrol flights), <strong className="text-[#F4F4F5]">Metro Central Police</strong> (9 docks, operational), <strong className="text-[#F4F4F5]">Tarn Valley Police</strong> (4 docks, zero live flights — blocked on DPIA sign-off), and <strong className="text-[#F4F4F5]">Norwold Police</strong> (4 docks, training only). 300-dock national framework tender currently in preparation.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() =>
                window.dispatchEvent(
                  new CustomEvent("open-note-modal", {
                    detail: { account: "A", kind: "note", title: "Note for Eastern Counties" },
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

      {/* Account Specific Signals Alert Banner (Events B & C) */}
      {signals.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-[#FF5500] animate-pulse" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#F4F4F5]">
              Live Account Signals (Events B & C Verified)
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
