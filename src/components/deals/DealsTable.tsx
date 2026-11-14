"use client";

import React, { useState } from "react";
import { DealItem } from "@/lib/analysis/valuation";
import { EvidenceBadge } from "../evidence/EvidenceBadge";
import { ShieldCheck, AlertTriangle, HelpCircle, CheckCircle2 } from "lucide-react";

interface DealsTableProps {
  deals: DealItem[];
  showAccountFilter?: boolean;
}

export const DealsTable: React.FC<DealsTableProps> = ({ deals, showAccountFilter = true }) => {
  const [accountFilter, setAccountFilter] = useState<string>("All");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [search, setSearch] = useState<string>("");

  const filtered = deals.filter((d) => {
    if (accountFilter !== "All" && d.account !== accountFilter) return false;
    if (categoryFilter !== "All" && d.category !== categoryFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        d.name.toLowerCase().includes(q) ||
        d.relevantPerson?.toLowerCase().includes(q) ||
        d.stage.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const getCategoryBadge = (cat: DealItem["category"]) => {
    switch (cat) {
      case "confirmed":
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#ECEFE5] text-[#536F00] border border-[#D5DAD0]">Confirmed</span>;
      case "active":
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#FEF3C7] text-[#C78620] border border-[#FDE68A]">Active Offer</span>;
      case "at_risk":
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#FDE8E8] text-[#E34B3D] border border-[#F8B4B4]">At Risk</span>;
      case "closed":
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#F4F5F0] text-[#151515] border border-[#E2E5DE]">Closed Won</span>;
      case "unsupported_projection":
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-white text-[#747A80] border border-[#E2E5DE]">Unverified Claim</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#F4F5F0] text-[#747A80] border border-[#E2E5DE]">Unknown</span>;
    }
  };

  const getConfidenceIcon = (conf: DealItem["confidence"]) => {
    switch (conf) {
      case "High":
        return <span className="inline-flex items-center gap-1 text-[11px] text-[#536F00] font-medium"><CheckCircle2 className="w-3 h-3 text-[#536F00]" /> High</span>;
      case "Medium":
        return <span className="inline-flex items-center gap-1 text-[11px] text-[#C78620] font-medium"><ShieldCheck className="w-3 h-3 text-[#C78620]" /> Medium</span>;
      case "Low":
        return <span className="inline-flex items-center gap-1 text-[11px] text-[#E34B3D] font-medium"><AlertTriangle className="w-3 h-3 text-[#E34B3D]" /> Low</span>;
      default:
        return <span className="inline-flex items-center gap-1 text-[11px] text-[#747A80]"><HelpCircle className="w-3 h-3 text-[#747A80]" /> Unverified</span>;
    }
  };

  return (
    <div className="space-y-4">
      {/* Filters Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-white border border-[#E2E5DE] shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
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

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-[#F4F5F0] border border-[#E2E5DE] rounded-lg px-2.5 py-1 text-xs text-[#151515] focus:outline-none focus:border-[#536F00]"
          >
            <option value="All">All Stages</option>
            <option value="confirmed">Confirmed</option>
            <option value="active">Active Pipeline</option>
            <option value="at_risk">At Risk</option>
            <option value="closed">Closed</option>
            <option value="unsupported_projection">Unverified Claims</option>
          </select>
        </div>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search deals, contacts, or stages..."
          className="bg-[#F4F5F0] border border-[#E2E5DE] rounded-lg px-3 py-1 text-xs text-[#151515] placeholder-[#747A80] focus:outline-none focus:border-[#536F00] w-64"
        />
      </div>

      {/* Deals Table */}
      <div className="overflow-x-auto rounded-xl border border-[#E2E5DE] bg-white shadow-sm">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-[#E2E5DE] bg-[#F4F5F0] text-[#747A80] font-medium">
              <th className="py-3 px-4">Deal Name & Account</th>
              <th className="py-3 px-4">Value</th>
              <th className="py-3 px-4">Stage / Status</th>
              <th className="py-3 px-4">Key Stakeholder</th>
              <th className="py-3 px-4">Confidence</th>
              <th className="py-3 px-4">Traceable Evidence</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2E5DE]">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-[#747A80]">
                  No deals matching the selected criteria.
                </td>
              </tr>
            ) : (
              filtered.map((deal) => (
                <tr key={deal.id} className="hover:bg-[#F4F5F0] transition-colors duration-150">
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-[#151515]">{deal.name}</div>
                    <div className="text-[11px] text-[#747A80] mt-0.5">{deal.accountName}</div>
                    {deal.blocker && (
                      <div className="text-[11px] text-[#E34B3D] mt-1 flex items-center gap-1 font-medium">
                        <AlertTriangle className="w-3 h-3 flex-shrink-0 text-[#E34B3D]" />
                        <span>Blocker: {deal.blocker}</span>
                      </div>
                    )}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-semibold text-sm tabular-nums text-[#151515]">
                    {deal.value !== null ? (
                      `${deal.currency}${deal.value.toLocaleString()}`
                    ) : (
                      <span className="text-[#747A80] italic text-xs font-sans">Unconfirmed</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="space-y-1">
                      {getCategoryBadge(deal.category)}
                      <div className="text-[11px] text-[#747A80] capitalize">{deal.stage}</div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="text-[#151515] font-medium">{deal.relevantPerson || "Unassigned"}</div>
                    {deal.deadline && (
                      <div className="text-[10px] text-[#C78620] font-mono mt-0.5 truncate max-w-xs" title={deal.deadline}>
                        Due: {deal.deadline}
                      </div>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    {getConfidenceIcon(deal.confidence)}
                    <div className="text-[10px] text-[#747A80] mt-0.5 max-w-[140px] truncate" title={deal.confidenceReason}>
                      {deal.confidenceReason}
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex flex-wrap gap-1.5 max-w-xs">
                      {deal.supportingEvidence.map((src) => (
                        <EvidenceBadge key={src} sourceId={src} />
                      ))}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
