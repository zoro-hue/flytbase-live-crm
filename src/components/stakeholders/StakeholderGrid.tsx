"use client";

import React, { useState } from "react";
import { StakeholderItem } from "@/lib/analysis/stakeholders";
import { EvidenceBadge } from "../evidence/EvidenceBadge";
import {
  ShieldAlert,
  AlertTriangle,
  UserX,
  Clock,
  Building,
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
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#ECEFE5] text-[#536F00] border border-[#D5DAD0]">Economic Buyer</span>;
      case "Decision Maker":
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#ECEFE5] text-[#536F00] border border-[#D5DAD0] font-semibold">Decision Maker</span>;
      case "Champion":
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#ECEFE5] text-[#536F00] border border-[#D5DAD0]">Champion</span>;
      case "Technical Blocker":
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-[#FDE8E8] text-[#E34B3D] border border-[#F8B4B4]">Technical Blocker</span>;
      case "Procurement":
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#F4F5F0] text-[#151515] border border-[#E2E5DE]">Procurement</span>;
      case "Finance":
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#F4F5F0] text-[#151515] border border-[#E2E5DE]">Finance</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#F4F5F0] text-[#747A80] border border-[#E2E5DE]">{cls}</span>;
    }
  };

  const getRelationshipBadge = (rel: StakeholderItem["relationshipStatus"]) => {
    switch (rel) {
      case "Ally":
        return <span className="text-[11px] font-medium text-[#398B46]">● Ally</span>;
      case "Warm":
        return <span className="text-[11px] font-medium text-[#536F00]">● Warm</span>;
      case "Departing":
        return <span className="text-[11px] font-medium text-[#E34B3D] flex items-center gap-1 font-semibold"><UserX className="w-3 h-3 text-[#E34B3D]" /> Departing</span>;
      case "Guarded":
        return <span className="text-[11px] font-medium text-[#C78620]">● Guarded</span>;
      default:
        return <span className="text-[11px] font-medium text-[#747A80]">● {rel}</span>;
    }
  };

  return (
    <div className="space-y-4">
      {/* Search and Filters */}
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
          <span className="text-xs text-[#747A80] font-mono">
            {filtered.length} Stakeholders Mapped
          </span>
        </div>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter by name, role, organisation..."
          className="bg-[#F4F5F0] border border-[#E2E5DE] rounded-lg px-3 py-1 text-xs text-[#151515] placeholder-[#747A80] focus:outline-none focus:border-[#536F00] w-64"
        />
      </div>

      {/* Grid of Stakeholder Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((s) => (
          <div
            key={s.id}
            className={`p-4 rounded-xl bg-white border border-[#E2E5DE] shadow-sm flex flex-col justify-between space-y-4 hover:border-[#D5DAD0] transition-colors ${
              s.isKeyPersonRisk
                ? "border-[#E34B3D]/50 bg-[#FFF5F5]"
                : s.hasUnresolvedRequest
                ? "border-[#C78620]/40 bg-[#FFFDF5]"
                : ""
            }`}
          >
            {/* Header */}
            <div>
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <div>
                  <h3 className="text-sm font-semibold text-[#151515]">{s.name}</h3>
                  <p className="text-xs text-[#747A80]">{s.role}</p>
                </div>
                {getClassificationBadge(s.classification)}
              </div>
              <div className="flex items-center gap-2 text-[11px] text-[#747A80]">
                <Building className="w-3 h-3 flex-shrink-0" />
                <span className="truncate">{s.organisation}</span>
                <span>•</span>
                {getRelationshipBadge(s.relationshipStatus)}
              </div>
            </div>

            {/* Critical Warnings / Banners */}
            {s.isLeaving && (
              <div className="p-2.5 rounded-lg bg-[#FDE8E8] border border-[#F8B4B4] text-xs text-[#E34B3D] flex items-start gap-2">
                <UserX className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#E34B3D]" />
                <div>
                  <span className="font-semibold text-[#151515]">Departing Organisation:</span>{" "}
                  {s.departureDate || "Imminent"}. High risk of knowledge & relationship loss.
                </div>
              </div>
            )}

            {s.hasUnresolvedRequest && s.unresolvedRequestDetails && (
              <div className="p-2.5 rounded-lg bg-[#FEF3C7] border border-[#FDE68A] text-xs text-[#C78620] flex items-start gap-2">
                <Clock className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#C78620]" />
                <div>
                  <span className="font-semibold text-[#151515]">Unresolved Request:</span>{" "}
                  {s.unresolvedRequestDetails}
                </div>
              </div>
            )}

            {/* Authority & Influence Matrix */}
            <div className="space-y-2 text-xs border-t border-[#E2E5DE] pt-3">
              <div>
                <span className="text-[#747A80] text-[10px] uppercase font-mono block">Decision Authority</span>
                <p className="text-[#151515] mt-0.5 leading-snug">{s.decisionAuthority}</p>
              </div>

              <div>
                <span className="text-[#747A80] text-[10px] uppercase font-mono block">Budget & Payment Authority</span>
                <p className="text-[#151515] mt-0.5 leading-snug">{s.budgetAuthority}</p>
              </div>

              <div>
                <span className="text-[#747A80] text-[10px] uppercase font-mono block">Actual Product Usage</span>
                <p className="text-[#747A80] mt-0.5 leading-snug">{s.actualUsage}</p>
              </div>

              <div className="flex items-center justify-between pt-1 text-[11px]">
                <span className="text-[#747A80]">Can Block Progress?</span>
                <span className={s.canBlock ? "text-[#E34B3D] font-semibold" : "text-[#747A80]"}>
                  {s.canBlock ? "YES (Gatekeeper)" : "No"}
                </span>
              </div>
            </div>

            {/* Footer with Traceable Evidence */}
            <div className="pt-3 border-t border-[#E2E5DE] space-y-2">
              <div className="flex items-center justify-between text-[11px] text-[#747A80]">
                <span>Last Interaction</span>
                <span className="font-mono text-[#151515]">{s.lastInteraction}</span>
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
