"use client";

import React, { useState } from "react";
import { RiskItem } from "@/lib/analysis/risks";
import { EvidenceBadge } from "../evidence/EvidenceBadge";
import {
  AlertOctagon,
  AlertTriangle,
  Clock,
  Calendar,
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
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#260C04] text-[#FF5500] border border-[#8C2A00] flex items-center gap-1">
            <AlertOctagon className="w-3 h-3 text-[#FF5500]" /> CRITICAL
          </span>
        );
      case "High":
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-[#1F1208] text-[#FFA066] border border-[#5E2B0C] flex items-center gap-1">
            <AlertTriangle className="w-3 h-3 text-[#FF8540]" /> HIGH
          </span>
        );
      case "Medium":
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#14161C] text-[#D4D4D8] border border-[#252832]">
            MEDIUM
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#0D0E12] text-[#808590] border border-[#1C1F26]">
            LOW
          </span>
        );
    }
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-[#08080A] border border-[#1C1F26]">
        <div className="flex items-center gap-2">
          {showAccountFilter && (
            <select
              value={accountFilter}
              onChange={(e) => setAccountFilter(e.target.value)}
              className="bg-[#000000] border border-[#1C1F26] rounded-lg px-2.5 py-1 text-xs text-[#F4F4F5] focus:outline-none focus:border-[#FF5500]"
            >
              <option value="All">All Accounts</option>
              <option value="A">Eastern Counties (A)</option>
              <option value="B">Aldermoor Industrial (B)</option>
            </select>
          )}

          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="bg-[#000000] border border-[#1C1F26] rounded-lg px-2.5 py-1 text-xs text-[#F4F4F5] focus:outline-none focus:border-[#FF5500]"
          >
            <option value="All">All Severities</option>
            <option value="Critical">Critical Only</option>
            <option value="High">High Only</option>
            <option value="Medium">Medium Only</option>
            <option value="Low">Low Only</option>
          </select>
        </div>

        <span className="text-xs text-[#71717A] font-mono">
          {filtered.length} Risk Vector{filtered.length === 1 ? "" : "s"} Tracked
        </span>
      </div>

      {/* Risk Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((r) => (
          <div
            key={r.id}
            className={`p-4 rounded-xl matte-card flex flex-col justify-between space-y-4 ${
              r.severity === "Critical"
                ? "border-[#FF5500]/50 bg-[#160B04]/30"
                : r.severity === "High"
                ? "border-[#662808]/50 bg-[#140D07]/20"
                : ""
            }`}
          >
            {/* Header */}
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-xs font-semibold text-[#F4F4F5] leading-snug">{r.title}</span>
                {getSeverityBadge(r.severity)}
              </div>
              <div className="flex flex-wrap items-center gap-2 text-[11px] text-[#8E929E]">
                <span>{r.accountName}</span>
                {r.relatedDeal && (
                  <>
                    <span>•</span>
                    <span className="text-[#FF5500] font-medium">{r.relatedDeal}</span>
                  </>
                )}
              </div>
            </div>

            {/* Why It Matters */}
            <div className="p-3 rounded-lg bg-[#000000] border border-[#1C1F26] text-xs text-[#F4F4F5] leading-relaxed">
              <span className="text-[#585E6A] font-mono text-[10px] uppercase block mb-1">
                Risk Impact Analysis
              </span>
              {r.whyItMatters}
            </div>

            {/* Recommended Mitigation */}
            <div className="text-xs text-[#E4E4E7] leading-relaxed bg-[#121419] p-3 rounded-lg border border-[#1C1F26]">
              <span className="text-[#FF5500] font-semibold block mb-0.5">
                Recommended Mitigation:
              </span>
              {r.recommendedMitigation}
            </div>

            {/* Timelines and Evidence Traceability */}
            <div className="pt-3 border-t border-[#1C1F26] flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex flex-wrap items-center gap-3 text-[#8E929E]">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#585E6A]" />
                  <span>Detected: <strong className="text-[#F4F4F5] font-mono">{r.firstDetected}</strong></span>
                </div>
                {r.deadline && (
                  <div className="flex items-center gap-1 text-[#FFA066] font-mono">
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
