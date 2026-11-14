"use client";

import React, { useState } from "react";
import { LiveSignalItem } from "@/lib/analysis/signals";
import { EvidenceBadge } from "../evidence/EvidenceBadge";
import {
  Radio,
  AlertOctagon,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface SignalFeedProps {
  signals: LiveSignalItem[];
  showAccountFilter?: boolean;
}

export const SignalFeed: React.FC<SignalFeedProps> = ({ signals, showAccountFilter = true }) => {
  const [accountFilter, setAccountFilter] = useState<string>("All");
  const [expandedId, setExpandedId] = useState<string | null>(signals[0]?.id || null);

  const filtered = signals.filter((s) => {
    if (accountFilter !== "All" && s.account !== accountFilter) return false;
    return true;
  });

  const getSeverityBadge = (sev: LiveSignalItem["severity"]) => {
    switch (sev) {
      case "Critical":
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#FDE8E8] text-[#E34B3D] border border-[#F8B4B4] flex items-center gap-1"><AlertOctagon className="w-3 h-3 text-[#E34B3D]" /> CRITICAL SIGNAL</span>;
      case "High":
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#FEF3C7] text-[#C78620] border border-[#FDE68A] flex items-center gap-1"><AlertTriangle className="w-3 h-3 text-[#C78620]" /> HIGH PRIORITY</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#F4F5F0] text-[#747A80] border border-[#E2E5DE]">MONITORING</span>;
    }
  };

  return (
    <div className="space-y-4">
      {/* Filters Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-white border border-[#E2E5DE] shadow-sm">
        <div className="flex items-center gap-2">
          {showAccountFilter && (
            <select
              value={accountFilter}
              onChange={(e) => setAccountFilter(e.target.value)}
              className="bg-[#F4F5F0] border border-[#E2E5DE] rounded-lg px-2.5 py-1 text-xs text-[#151515] focus:outline-none focus:border-[#536F00]"
            >
              <option value="All">All Accounts</option>
              <option value="A">Eastern Counties (A)</option>
              <option value="B">Aldermoor Industrial (B)</option>
            </select>
          )}

          <div className="flex items-center gap-1.5 text-xs text-[#536F00] font-mono">
            <Radio className="w-3.5 h-3.5 text-[#536F00]" />
            <span>Telemetry & Field Event Engine Active</span>
          </div>
        </div>

        <span className="text-xs text-[#747A80] font-mono">
          {filtered.length} Active Signal Event{filtered.length === 1 ? "" : "s"}
        </span>
      </div>

      {/* Signals List */}
      <div className="space-y-4">
        {filtered.map((sig) => {
          const isExpanded = expandedId === sig.id;
          return (
            <div
              key={sig.id}
              className={`rounded-xl bg-white border border-[#E2E5DE] shadow-sm overflow-hidden ${
                sig.severity === "Critical"
                  ? "border-[#E34B3D]/50"
                  : ""
              }`}
            >
              {/* Card Header (Click to toggle) */}
              <div
                onClick={() => setExpandedId(isExpanded ? null : sig.id)}
                className="p-4 cursor-pointer flex flex-wrap items-start justify-between gap-3 select-none hover:bg-[#F4F5F0] transition-colors"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-[#F4F5F0] border border-[#E2E5DE] flex items-center justify-center text-[#536F00] flex-shrink-0 mt-0.5">
                    <Radio className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#536F00]">[{sig.code}]</span>
                      <h3 className="text-sm font-semibold text-[#151515]">{sig.title}</h3>
                      {getSeverityBadge(sig.severity)}
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-[#747A80] mt-1">
                      <span>{sig.accountName}</span>
                      <span>•</span>
                      <span className="text-[#747A80] font-mono">Detected: {new Date(sig.detectedAt).toLocaleDateString()}</span>
                      {sig.eventPeriod && (
                        <>
                          <span>•</span>
                          <span className="text-[#C78620] font-mono font-medium">{sig.eventPeriod}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-[#747A80]">
                  <span>{isExpanded ? "Collapse" : "Inspect"}</span>
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </div>

              {/* Expandable Evidence Details */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-2 border-t border-[#E2E5DE] space-y-4 text-xs animate-in fade-in duration-150">
                  <div className="p-3 rounded-lg bg-[#F4F5F0] border border-[#E2E5DE] text-[#151515] leading-relaxed">
                    <span className="text-[#747A80] font-mono text-[10px] uppercase block mb-1">
                      Signal Event Description
                    </span>
                    {sig.summary}
                  </div>

                  {/* Telemetry Breakdown */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3 rounded-lg bg-[#F4F5F0] border border-[#E2E5DE]">
                    <div>
                      <span className="text-[#747A80] font-mono text-[10px] uppercase block mb-1">
                        Affected Fleet Units / Entities
                      </span>
                      <ul className="space-y-1 text-xs">
                        {sig.evidenceDetails.affectedEntities.map((ent, i) => (
                          <li key={i} className="text-[#151515] flex items-center gap-1.5 font-mono">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#536F00]" />
                            {ent}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <span className="text-[#747A80] font-mono text-[10px] uppercase block mb-1">
                        Operational Telemetry Status
                      </span>
                      <div className="space-y-1 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-[#747A80]">Devices Online:</span>
                          <span className={sig.evidenceDetails.devicesOnline ? "text-[#151515] font-mono font-medium" : "text-[#E34B3D]"}>
                            {sig.evidenceDetails.devicesOnline ? "YES (Powered & Online)" : "Offline"}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[#747A80]">Support Ticket Raised:</span>
                          <span className={sig.evidenceDetails.supportTicketRaised ? "text-[#C78620] font-medium" : "text-[#E34B3D] font-semibold"}>
                            {sig.evidenceDetails.supportTicketRaised ? "YES" : "NO (Silent Grounding)"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="col-span-1 md:col-span-2 pt-2 border-t border-[#E2E5DE]">
                      <span className="text-[#747A80] font-mono text-[10px] uppercase block mb-1">
                        Historical Baseline vs Recent Usage
                      </span>
                      <p className="text-[#747A80] font-mono text-xs">{sig.evidenceDetails.previousUsageVsRecent}</p>
                    </div>

                    {/* Unanswered Requests List (Event B) */}
                    {sig.evidenceDetails.unansweredRequests && (
                      <div className="col-span-1 md:col-span-2 p-3 rounded-lg bg-[#FDE8E8] border border-[#F8B4B4] space-y-1.5">
                        <span className="text-[#E34B3D] font-semibold text-xs block">
                          Unanswered Customer Requests Pending Written Response:
                        </span>
                        <ul className="space-y-1">
                          {sig.evidenceDetails.unansweredRequests.map((req, i) => (
                            <li key={i} className="text-[#E34B3D] text-xs flex items-start gap-1.5">
                              <span className="font-bold text-[#E34B3D]">•</span>
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Prescribed Response & Assigned Persona */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 rounded-lg bg-[#ECEFE5] border border-[#D5DAD0] text-xs">
                      <span className="text-[#536F00] font-semibold block mb-1">
                        Mandated CRM Response:
                      </span>
                      <p className="text-[#151515] leading-relaxed">{sig.recommendedResponse}</p>
                    </div>

                    <div className="p-3 rounded-lg bg-[#F4F5F0] border border-[#E2E5DE] space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[#747A80] text-[10px] uppercase font-mono">Target Contact</span>
                        <span className="text-[#151515] font-medium">{sig.recommendedContact.name} ({sig.recommendedContact.role})</span>
                      </div>
                      <div className="flex items-center justify-between border-t border-[#E2E5DE] pt-2">
                        <span className="text-[#747A80] text-[10px] uppercase font-mono">Assigned FlytBase Owner</span>
                        <span className="text-[#536F00] font-medium">{sig.responsibleOwner}</span>
                      </div>
                    </div>
                  </div>

                  {/* Traceable Source Footer */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-[#E2E5DE] text-xs">
                    <span className="text-[#747A80]">Verified Traceability Link:</span>
                    <EvidenceBadge
                      sourceId={sig.sourceId}
                      sourceName={sig.sourceName}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
