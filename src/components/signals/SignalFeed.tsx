"use client";

import React, { useState } from "react";
import { LiveSignalItem } from "@/lib/analysis/signals";
import { EvidenceBadge } from "../evidence/EvidenceBadge";
import {
  Radio,
  AlertOctagon,
  AlertTriangle,
  Clock,
  ArrowRight,
  User,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Layers,
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
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-red-500/20 text-red-400 border border-red-500/40 flex items-center gap-1"><AlertOctagon className="w-3 h-3" /> CRITICAL SIGNAL</span>;
      case "High":
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> HIGH PRIORITY</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-blue-500/15 text-blue-300 border border-blue-500/30">MONITORING</span>;
    }
  };

  return (
    <div className="space-y-4">
      {/* Filters Bar */}
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

          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>Live Telemetry & Field Event Detection Active</span>
          </div>
        </div>

        <span className="text-xs text-[#9298A2] font-mono">
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
              className={`rounded-lg bg-[#15181D] border transition-all overflow-hidden ${
                sig.severity === "Critical"
                  ? "border-red-500/50 bg-red-950/10"
                  : "border-[#272C34] hover:border-[#383E49]"
              }`}
            >
              {/* Card Header (Click to toggle) */}
              <div
                onClick={() => setExpandedId(isExpanded ? null : sig.id)}
                className="p-4 cursor-pointer flex flex-wrap items-start justify-between gap-3 select-none hover:bg-[#1B1F25]/40 transition-colors"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-8 h-8 rounded bg-crm-card border border-crm-border flex items-center justify-center text-crm-orange flex-shrink-0 mt-0.5">
                    <Radio className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-bold text-crm-orange">[{sig.code}]</span>
                      <h3 className="text-sm font-semibold text-[#F4F4F5]">{sig.title}</h3>
                      {getSeverityBadge(sig.severity)}
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-[#9298A2] mt-1">
                      <span>{sig.accountName}</span>
                      <span>•</span>
                      <span className="text-[#666D78] font-mono">Detected: {new Date(sig.detectedAt).toLocaleDateString()}</span>
                      {sig.eventPeriod && (
                        <>
                          <span>•</span>
                          <span className="text-amber-400 font-mono">Period: {sig.eventPeriod}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#666D78] hidden sm:inline">
                    {isExpanded ? "Collapse Details" : "View Intelligence"}
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-[#9298A2]" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#9298A2]" />
                  )}
                </div>
              </div>

              {/* Expanded Signal Intelligence Body */}
              {isExpanded && (
                <div className="p-5 border-t border-[#272C34] bg-[#111419]/80 space-y-4 text-xs">
                  {/* Summary */}
                  <div>
                    <span className="text-[#666D78] font-mono text-[10px] uppercase block mb-1">
                      Signal Synopsis
                    </span>
                    <p className="text-sm text-[#F4F4F5] leading-relaxed">{sig.summary}</p>
                  </div>

                  {/* Evidence & Metrics Breakdown */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded bg-[#15181D] border border-[#272C34]">
                    <div>
                      <span className="text-[#666D78] font-mono text-[10px] uppercase block mb-1">
                        Affected Equipment / Docks
                      </span>
                      <ul className="space-y-1 text-[#F4F4F5]">
                        {sig.evidenceDetails.affectedEntities.map((ent, idx) => (
                          <li key={idx} className="flex items-center gap-1.5 font-mono text-xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-crm-orange" />
                            {ent}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <span className="text-[#666D78] font-mono text-[10px] uppercase block mb-1">
                        Operational Telemetry Status
                      </span>
                      <div className="space-y-1 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-[#9298A2]">Devices Online:</span>
                          <span className={sig.evidenceDetails.devicesOnline ? "text-emerald-400 font-mono font-medium" : "text-red-400"}>
                            {sig.evidenceDetails.devicesOnline ? "YES (Powered & Online)" : "Offline"}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[#9298A2]">Customer Support Ticket Raised:</span>
                          <span className={sig.evidenceDetails.supportTicketRaised ? "text-amber-400 font-medium" : "text-red-400 font-semibold"}>
                            {sig.evidenceDetails.supportTicketRaised ? "YES" : "NO (Silent Disengagement)"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="col-span-1 md:col-span-2 pt-2 border-t border-[#272C34]/60">
                      <span className="text-[#666D78] font-mono text-[10px] uppercase block mb-1">
                        Historical Baseline vs Recent Usage
                      </span>
                      <p className="text-[#9298A2] font-mono text-xs">{sig.evidenceDetails.previousUsageVsRecent}</p>
                    </div>

                    {/* Unanswered Requests List (Event B) */}
                    {sig.evidenceDetails.unansweredRequests && (
                      <div className="col-span-1 md:col-span-2 p-3 rounded bg-red-500/10 border border-red-500/30 space-y-1.5">
                        <span className="text-red-300 font-semibold text-xs block">
                          Unanswered Customer Requests Pending Written Response:
                        </span>
                        <ul className="space-y-1">
                          {sig.evidenceDetails.unansweredRequests.map((req, i) => (
                            <li key={i} className="text-red-200 text-xs flex items-start gap-1.5">
                              <span className="font-bold text-red-400">•</span>
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Prescribed Response & Assigned Persona */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 rounded bg-emerald-950/10 border border-emerald-500/20 text-xs">
                      <span className="text-emerald-400 font-semibold block mb-1">
                        Mandated CRM Response:
                      </span>
                      <p className="text-emerald-200/90 leading-relaxed">{sig.recommendedResponse}</p>
                    </div>

                    <div className="p-3 rounded bg-[#15181D] border border-[#272C34] space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[#666D78] text-[10px] uppercase font-mono">Target Contact</span>
                        <span className="text-[#F4F4F5] font-medium">{sig.recommendedContact.name} ({sig.recommendedContact.role})</span>
                      </div>
                      <div className="flex items-center justify-between border-t border-[#272C34]/60 pt-2">
                        <span className="text-[#666D78] text-[10px] uppercase font-mono">Assigned FlytBase Owner</span>
                        <span className="text-[#FF762E] font-medium">{sig.responsibleOwner}</span>
                      </div>
                    </div>
                  </div>

                  {/* Traceable Source Footer */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-[#272C34] text-xs">
                    <span className="text-[#666D78]">Verified Traceability Link:</span>
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
