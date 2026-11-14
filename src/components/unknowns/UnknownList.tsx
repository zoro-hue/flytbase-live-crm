"use client";

import React, { useState } from "react";
import { UnknownItem } from "@/lib/analysis/unknowns";
import { EvidenceBadge } from "../evidence/EvidenceBadge";
import { HelpCircle, AlertCircle, MessageSquare, User, ArrowRight } from "lucide-react";

interface UnknownListProps {
  unknowns: UnknownItem[];
  showAccountFilter?: boolean;
}

export const UnknownList: React.FC<UnknownListProps> = ({ unknowns, showAccountFilter = true }) => {
  const [accountFilter, setAccountFilter] = useState<string>("All");

  const filtered = unknowns.filter((u) => {
    if (accountFilter !== "All" && u.account !== accountFilter) return false;
    return true;
  });

  return (
    <div className="space-y-4">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-lg bg-[#15181D] border border-[#272C34]">
        <div className="flex items-center gap-2">
          {showAccountFilter && (
            <select
              value={accountFilter}
              onChange={(e) => setAccountFilter(e.target.value)}
              className="bg-[#101216] border border-[#272C34] rounded px-2.5 py-1 text-xs text-[#F4F4F5] focus:outline-none focus:border-[#FF762E]"
            >
              <option value="All">All Accounts</option>
              <option value="A">Eastern Counties (A)</option>
              <option value="B">Aldermoor Industrial (B)</option>
            </select>
          )}

          <div className="flex items-center gap-1.5 text-xs text-[#9298A2]">
            <HelpCircle className="w-3.5 h-3.5 text-[#FF762E]" />
            <span>First-Class CRM Knowledge Gaps (No Silent Assumptions)</span>
          </div>
        </div>

        <span className="text-xs text-[#9298A2] font-mono">
          {filtered.length} Critical Unknown{filtered.length === 1 ? "" : "s"}
        </span>
      </div>

      {/* Unknown Cards */}
      <div className="space-y-4">
        {filtered.map((u) => (
          <div
            key={u.id}
            className="p-5 rounded-lg bg-[#15181D] border border-[#272C34] hover:border-[#383E49] transition-all space-y-4"
          >
            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-2 border-b border-[#272C34]/60 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <h3 className="text-sm font-semibold text-[#F4F4F5]">{u.missingInformation}</h3>
                </div>
                <div className="text-xs text-[#9298A2] mt-1 pl-4">
                  {u.accountName} • Related to: <strong className="text-[#F4F4F5]">{u.relatedEntity}</strong>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-[#9298A2] bg-[#1B1F25] px-2.5 py-1 rounded border border-[#272C34]">
                <User className="w-3.5 h-3.5 text-[#FF762E]" />
                <span>Source Persona: <strong className="text-[#F4F4F5]">{u.whoCouldProvide}</strong></span>
              </div>
            </div>

            {/* Analysis Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-[#666D78] font-mono text-[10px] uppercase">Why It Matters</span>
                <p className="text-[#F4F4F5] leading-relaxed">{u.whyItMatters}</p>
              </div>

              <div className="space-y-1">
                <span className="text-red-400 font-mono text-[10px] uppercase flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> Impact If Left Unanswered
                </span>
                <p className="text-red-300/90 leading-relaxed">{u.impactIfUnanswered}</p>
              </div>
            </div>

            {/* Suggested Question Prompt */}
            <div className="p-3.5 rounded bg-[#101216] border border-[#272C34] space-y-1.5">
              <span className="text-[#FF762E] text-[10px] font-mono uppercase tracking-wider flex items-center gap-1">
                <MessageSquare className="w-3 h-3" /> Prescribed Discovery Question to Ask
              </span>
              <p className="text-xs text-[#F4F4F5] font-sans italic leading-relaxed">
                &ldquo;{u.suggestedQuestion}&rdquo;
              </p>
            </div>

            {/* Source Records */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#272C34]/40 text-xs text-[#666D78]">
              <span>Related Source Records:</span>
              <div className="flex flex-wrap gap-1.5">
                {u.relatedSourceRecords.map((src) => (
                  <EvidenceBadge key={src} sourceId={src} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
