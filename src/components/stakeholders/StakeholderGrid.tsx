"use client";

import React, { useState } from "react";
import { StakeholderItem } from "@/lib/analysis/stakeholders";
import { EvidenceBadge } from "../evidence/EvidenceBadge";
import {
  ShieldAlert,
  AlertTriangle,
  UserX,
  Clock,
  CheckCircle2,
  Lock,
  Building,
  CreditCard,
  UserCheck,
} from "lucide-react";

interface StakeholderGridProps {
  stakeholders: StakeholderItem[];
  showAccountFilter?: boolean;
}

export const StakeholderGrid: React.FC<StakeholderGridProps> = ({
  stakeholders,
  showAccountFilter = true,
}) => {
  const [accountFilter, setAccountFilter] = useState<string>("All");
  const [search, setSearch] = useState<string>("");

  const filtered = stakeholders.filter((s) => {
    if (accountFilter !== "All" && s.account !== accountFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        s.name.toLowerCase().includes(q) ||
        s.role.toLowerCase().includes(q) ||
        s.organisation.toLowerCase().includes(q) ||
        s.classification.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const getClassificationBadge = (cls: StakeholderItem["classification"]) => {
    switch (cls) {
      case "Economic Buyer":
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-purple-500/15 text-purple-400 border border-purple-500/30">Economic Buyer</span>;
      case "Decision Maker":
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">Decision Maker</span>;
      case "Champion":
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#FF762E]/15 text-[#FF762E] border border-[#FF762E]/30">Champion</span>;
      case "Technical Blocker":
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-red-500/15 text-red-400 border border-red-500/30">Technical Blocker</span>;
      case "Procurement":
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-blue-500/15 text-blue-400 border border-blue-500/30">Procurement</span>;
      case "Finance":
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">Finance</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-gray-500/15 text-gray-400 border border-gray-500/30">{cls}</span>;
    }
  };

  const getRelationshipBadge = (rel: StakeholderItem["relationshipStatus"]) => {
    switch (rel) {
      case "Ally":
        return <span className="text-[11px] font-medium text-emerald-400">● Ally</span>;
      case "Warm":
        return <span className="text-[11px] font-medium text-blue-400">● Warm</span>;
      case "Departing":
        return <span className="text-[11px] font-medium text-red-400 flex items-center gap-1"><UserX className="w-3 h-3" /> Departing</span>;
      case "Guarded":
        return <span className="text-[11px] font-medium text-amber-400">● Guarded</span>;
      default:
        return <span className="text-[11px] font-medium text-[#9298A2]">● {rel}</span>;
    }
  };

  return (
    <div className="space-y-4">
      {/* Search and Filters */}
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
          <span className="text-xs text-[#9298A2] font-mono">
            {filtered.length} Stakeholders Mapped
          </span>
        </div>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter by name, role, organisation..."
          className="bg-[#101216] border border-[#272C34] rounded px-3 py-1 text-xs text-[#F4F4F5] placeholder-[#666D78] focus:outline-none focus:border-[#FF762E] w-64"
        />
      </div>

      {/* Grid of Stakeholder Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((s) => (
          <div
            key={s.id}
            className={`p-4 rounded-lg bg-[#15181D] border transition-all flex flex-col justify-between space-y-4 ${
              s.isKeyPersonRisk
                ? "border-red-500/40 bg-red-950/10"
                : s.hasUnresolvedRequest
                ? "border-amber-500/40 bg-amber-950/10"
                : "border-[#272C34] hover:border-[#383E49]"
            }`}
          >
            {/* Header */}
            <div>
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <div>
                  <h3 className="text-sm font-semibold text-[#F4F4F5]">{s.name}</h3>
                  <p className="text-xs text-[#9298A2]">{s.role}</p>
                </div>
                {getClassificationBadge(s.classification)}
              </div>
              <div className="flex items-center gap-2 text-[11px] text-[#666D78]">
                <Building className="w-3 h-3 flex-shrink-0" />
                <span className="truncate">{s.organisation}</span>
                <span>•</span>
                {getRelationshipBadge(s.relationshipStatus)}
              </div>
            </div>

            {/* Critical Warnings / Banners */}
            {s.isLeaving && (
              <div className="p-2 rounded bg-red-500/15 border border-red-500/30 text-xs text-red-300 flex items-start gap-2">
                <UserX className="w-4 h-4 flex-shrink-0 mt-0.5 text-red-400" />
                <div>
                  <span className="font-semibold text-red-200">Departing Organisation:</span>{" "}
                  {s.departureDate || "Imminent"}. High risk of knowledge and relationship loss.
                </div>
              </div>
            )}

            {s.hasUnresolvedRequest && s.unresolvedRequestDetails && (
              <div className="p-2 rounded bg-amber-500/15 border border-amber-500/30 text-xs text-amber-300 flex items-start gap-2">
                <Clock className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-400" />
                <div>
                  <span className="font-semibold text-amber-200">Unresolved Request:</span>{" "}
                  {s.unresolvedRequestDetails}
                </div>
              </div>
            )}

            {/* Authority & Influence Matrix */}
            <div className="space-y-2 text-xs border-t border-[#272C34]/60 pt-3">
              <div>
                <span className="text-[#666D78] text-[10px] uppercase font-mono block">Decision Authority</span>
                <p className="text-[#F4F4F5] mt-0.5 leading-snug">{s.decisionAuthority}</p>
              </div>

              <div>
                <span className="text-[#666D78] text-[10px] uppercase font-mono block">Budget & Payment Authority</span>
                <p className="text-[#F4F4F5] mt-0.5 leading-snug">{s.budgetAuthority}</p>
              </div>

              <div>
                <span className="text-[#666D78] text-[10px] uppercase font-mono block">Actual Product Usage</span>
                <p className="text-[#9298A2] mt-0.5 leading-snug">{s.actualUsage}</p>
              </div>

              <div className="flex items-center justify-between pt-1 text-[11px]">
                <span className="text-[#666D78]">Can Block Progress?</span>
                <span className={s.canBlock ? "text-red-400 font-semibold" : "text-emerald-400"}>
                  {s.canBlock ? "YES (Gatekeeper)" : "No"}
                </span>
              </div>
            </div>

            {/* Footer with Traceable Evidence */}
            <div className="pt-3 border-t border-[#272C34]/60 space-y-2">
              <div className="flex items-center justify-between text-[11px] text-[#666D78]">
                <span>Last Interaction</span>
                <span className="font-mono text-[#9298A2]">{s.lastInteraction}</span>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {s.supportingEvidence.map((src) => (
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
