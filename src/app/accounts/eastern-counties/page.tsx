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
    <div className="space-y-6">
      {/* Top Header & Breadcrumb */}
      <div>
        <div className="flex items-center gap-2 text-xs text-[#747A80] mb-2">
          <Link href="/dashboard" className="hover:text-[#151515] flex items-center gap-1 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Overview</span>
          </Link>
          <span>/</span>
          <span className="text-[#536F00] font-semibold">Eastern Counties Police Alliance (Account A)</span>
        </div>

        <div className="flex flex-wrap items-start justify-between gap-4 p-6 rounded-2xl bg-white border border-[#E2E5DE] shadow-sm">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#ECEFE5] text-[#536F00] border border-[#D5DAD0]">
                ACCOUNT A • UK PUBLIC SAFETY
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#F4F5F0] text-[#151515] border border-[#E2E5DE]">
                35 Docks Installed • 4 Forces
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#FDE8E8] text-[#E34B3D] border border-[#F8B4B4] font-medium">
                Departure & Unanswered Tickets Active
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#151515]">
              Eastern Counties Police Alliance
            </h1>
            <p className="text-xs text-[#747A80] leading-relaxed">
              Consortium of four county police forces: <strong className="text-[#151515]">Westmere Constabulary</strong> (18 docks, daily live patrol flights), <strong className="text-[#151515]">Metro Central Police</strong> (9 docks, operational), <strong className="text-[#151515]">Tarn Valley Police</strong> (4 docks, zero live flights — blocked on DPIA sign-off), and <strong className="text-[#151515]">Norwold Police</strong> (4 docks, training only). 300-dock national framework tender currently in preparation.
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
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#171717] hover:bg-[#252525] text-white text-xs font-semibold shadow-xs transition-all duration-200 cursor-pointer active:scale-95"
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
            <Radio className="w-4 h-4 text-[#FF5A00]" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#151515]">
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
