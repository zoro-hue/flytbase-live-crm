"use client";

import React, { useState } from "react";
import { RiskItem } from "@/lib/analysis/risks";
import { EvidenceBadge } from "../evidence/EvidenceBadge";
import {
  AlertOctagon,
  AlertTriangle,
  Info,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Layers,
} from "lucide-react";

interface RiskGridProps {
  risks: RiskItem[];
  showAccountFilter?: boolean;
}

export const RiskGrid: React.FC<RiskGridProps> = ({ risks, showAccountFilter = true }) => {
  const [accountFilter, setAccountFilter] = useState<string>("All");
  const [severityFilter, setSeverityFilter] = useState<string>("All");

  const filtered = risks.filter((r) => {
    if (accountFilter !== "All" && r.account !== accountFilter) return false;
    if (severityFilter !== "All" && r.severity !== severityFilter) return false;
    return true;
  });

  const getSeverityBadge = (sev: RiskItem["severity"]) => {
    switch (sev) {
      case "Critical":
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-red-500/20 text-red-400 border border-red-500/40 flex items-center gap-1">
            <AlertOctagon className="w-3 h-3" /> CRITICAL
          </span>
        );
      case "High":
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" /> HIGH
          </span>
        );
      case "Medium":
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-yellow-500/15 text-yellow-300 border border-yellow-500/30">
            MEDIUM
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-blue-500/15 text-blue-300 border border-blue-500/30">
            LOW
          </span>
        );
    }
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
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

          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="bg-[#101216] border border-[#272C34] rounded px-2.5 py-1 text-xs text-[#F4F4F5] focus:outline-none focus:border-[#FF762E]"
          >
            <option value="All">All Severities</option>
            <option value="Critical">Critical Only</option>
            <option value="High">High Only</option>
            <option value="Medium">Medium Only</option>
            <option value="Low">Low Only</option>
          </select>
        </div>

        <span className="text-xs text-[#9298A2] font-mono">
          {filtered.length} Risk Vector{filtered.length === 1 ? "" : "s"} Tracked
        </span>
      </div>

      {/* Risk Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((r) => (
          <div
            key={r.id}
            className={`p-4 rounded-lg bg-[#15181D] border transition-all flex flex-col justify-between space-y-4 ${
              r.severity === "Critical"
                ? "border-red-500/50 bg-red-950/10"
                : r.severity === "High"
                ? "border-amber-500/40 bg-amber-950/10"
                : "border-[#272C34] hover:border-[#383E49]"
            }`}
          >
            {/* Header */}
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-xs font-semibold text-[#F4F4F5] leading-snug">{r.title}</span>
                {getSeverityBadge(r.severity)}
              </div>
              <div className="flex flex-wrap items-center gap-2 text-[11px] text-[#9298A2]">
                <span>{r.accountName}</span>
                {r.relatedDeal && (
                  <>
                    <span>•</span>
                    <span className="text-[#FF762E] font-medium">{r.relatedDeal}</span>
                  </>
                )}
              </div>
            </div>

            {/* Why It Matters */}
            <div className="p-3 rounded bg-[#101216] border border-[#272C34]/60 text-xs text-[#F4F4F5] leading-relaxed">
              <span className="text-[#666D78] font-mono text-[10px] uppercase block mb-1">
                Risk Impact Analysis
              </span>
              {r.whyItMatters}
            </div>

            {/* Recommended Mitigation */}
            <div className="text-xs text-emerald-300/90 leading-relaxed bg-emerald-950/10 p-2.5 rounded border border-emerald-500/20">
              <span className="text-emerald-400 font-semibold block mb-0.5">
                Recommended Mitigation:
              </span>
              {r.recommendedMitigation}
            </div>

            {/* Timelines and Evidence Traceability */}
            <div className="pt-3 border-t border-[#272C34]/60 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex flex-wrap items-center gap-3 text-[#9298A2]">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#666D78]" />
                  <span>Detected: <strong className="text-[#F4F4F5] font-mono">{r.firstDetected}</strong></span>
                </div>
                {r.deadline && (
                  <div className="flex items-center gap-1 text-amber-400 font-mono">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Impact: {r.deadline}</span>
                  </div>
                )}
              </div>

              <EvidenceBadge
                sourceId={r.supportingSourceId}
                sourceName={r.supportingSourceName}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
