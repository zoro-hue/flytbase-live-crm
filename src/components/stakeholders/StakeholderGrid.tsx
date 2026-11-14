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
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#14161C] text-[#FF6B1A] border border-[#FF5500]/30">Economic Buyer</span>;
      case "Decision Maker":
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#14161C] text-[#FF5500] border border-[#FF5500]/30 font-semibold">Decision Maker</span>;
      case "Champion":
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#14161C] text-[#FF5500] border border-[#FF5500]/25">Champion</span>;
      case "Technical Blocker":
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-[#221008] text-[#FF5500] border border-[#7A2400]">Technical Blocker</span>;
      case "Procurement":
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#121418] text-[#D4D4D8] border border-[#252830]">Procurement</span>;
      case "Finance":
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#121418] text-[#D4D4D8] border border-[#252830]">Finance</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#121418] text-[#9A9FA8] border border-[#1C1F26]">{cls}</span>;
    }
  };

  const getRelationshipBadge = (rel: StakeholderItem["relationshipStatus"]) => {
    switch (rel) {
      case "Ally":
        return <span className="text-[11px] font-medium text-[#E4E4E7]">● Ally</span>;
      case "Warm":
        return <span className="text-[11px] font-medium text-[#A1A1AA]">● Warm</span>;
      case "Departing":
        return <span className="text-[11px] font-medium text-[#FF5500] flex items-center gap-1 font-semibold"><UserX className="w-3 h-3 text-[#FF5500]" /> Departing</span>;
      case "Guarded":
        return <span className="text-[11px] font-medium text-[#FF8540]">● Guarded</span>;
      default:
        return <span className="text-[11px] font-medium text-[#71717A]">● {rel}</span>;
    }
  };

  return (
    <div className="space-y-4">
      {/* Search and Filters */}
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
          <span className="text-xs text-[#71717A] font-mono">
            {filtered.length} Stakeholders Mapped
          </span>
        </div>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter by name, role, organisation..."
          className="bg-[#000000] border border-[#1C1F26] rounded-lg px-3 py-1 text-xs text-[#F4F4F5] placeholder-[#585E6A] focus:outline-none focus:border-[#FF5500] w-64"
        />
      </div>

      {/* Grid of Stakeholder Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((s) => (
          <div
            key={s.id}
            className={`p-4 rounded-xl matte-card flex flex-col justify-between space-y-4 ${
              s.isKeyPersonRisk
                ? "border-[#FF5500]/50 bg-[#160B05]/40"
                : s.hasUnresolvedRequest
                ? "border-[#662808]/60 bg-[#140D07]/30"
                : ""
            }`}
          >
            {/* Header */}
            <div>
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <div>
                  <h3 className="text-sm font-semibold text-[#F4F4F5]">{s.name}</h3>
                  <p className="text-xs text-[#8E929E]">{s.role}</p>
                </div>
                {getClassificationBadge(s.classification)}
              </div>
              <div className="flex items-center gap-2 text-[11px] text-[#585E6A]">
                <Building className="w-3 h-3 flex-shrink-0" />
                <span className="truncate">{s.organisation}</span>
                <span>•</span>
                {getRelationshipBadge(s.relationshipStatus)}
              </div>
            </div>

            {/* Critical Warnings / Banners */}
            {s.isLeaving && (
              <div className="p-2.5 rounded-lg bg-[#220B04] border border-[#7A2400] text-xs text-[#FFA066] flex items-start gap-2">
                <UserX className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#FF5500]" />
                <div>
                  <span className="font-semibold text-white">Departing Organisation:</span>{" "}
                  {s.departureDate || "Imminent"}. High risk of knowledge & relationship loss.
                </div>
              </div>
            )}

            {s.hasUnresolvedRequest && s.unresolvedRequestDetails && (
              <div className="p-2.5 rounded-lg bg-[#1F140A] border border-[#593010] text-xs text-[#FFA066] flex items-start gap-2">
                <Clock className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#FF8540]" />
                <div>
                  <span className="font-semibold text-white">Unresolved Request:</span>{" "}
                  {s.unresolvedRequestDetails}
                </div>
              </div>
            )}

            {/* Authority & Influence Matrix */}
            <div className="space-y-2 text-xs border-t border-[#1C1F26] pt-3">
              <div>
                <span className="text-[#585E6A] text-[10px] uppercase font-mono block">Decision Authority</span>
                <p className="text-[#F4F4F5] mt-0.5 leading-snug">{s.decisionAuthority}</p>
              </div>

              <div>
                <span className="text-[#585E6A] text-[10px] uppercase font-mono block">Budget & Payment Authority</span>
                <p className="text-[#F4F4F5] mt-0.5 leading-snug">{s.budgetAuthority}</p>
              </div>

              <div>
                <span className="text-[#585E6A] text-[10px] uppercase font-mono block">Actual Product Usage</span>
                <p className="text-[#8E929E] mt-0.5 leading-snug">{s.actualUsage}</p>
              </div>

              <div className="flex items-center justify-between pt-1 text-[11px]">
                <span className="text-[#585E6A]">Can Block Progress?</span>
                <span className={s.canBlock ? "text-[#FF5500] font-semibold" : "text-[#A1A1AA]"}>
                  {s.canBlock ? "YES (Gatekeeper)" : "No"}
                </span>
              </div>
            </div>

            {/* Footer with Traceable Evidence */}
            <div className="pt-3 border-t border-[#1C1F26] space-y-2">
              <div className="flex items-center justify-between text-[11px] text-[#585E6A]">
                <span>Last Interaction</span>
                <span className="font-mono text-[#8E929E]">{s.lastInteraction}</span>
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
