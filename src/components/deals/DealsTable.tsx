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
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#15171C] text-[#E4E4E7] border border-[#262A34]">Confirmed</span>;
      case "active":
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#FF5500]/12 text-[#FF6519] border border-[#FF5500]/30 font-semibold">Active Offer</span>;
      case "at_risk":
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#241006] text-[#FF5500] border border-[#732400] font-semibold">At Risk</span>;
      case "closed":
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#111216] text-[#A1A1AA] border border-[#22252E]">Closed Won</span>;
      case "unsupported_projection":
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#0B0C0E] text-[#71717A] border border-[#1C1F26]">Unverified Claim</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#18110B] text-[#FFA066] border border-[#4D240E]">Unknown</span>;
    }
  };

  const getConfidenceIcon = (conf: DealItem["confidence"]) => {
    switch (conf) {
      case "High":
        return <span className="inline-flex items-center gap-1 text-[11px] text-[#E4E4E7] font-medium"><CheckCircle2 className="w-3 h-3 text-[#E4E4E7]" /> High</span>;
      case "Medium":
        return <span className="inline-flex items-center gap-1 text-[11px] text-[#FF5500] font-medium"><ShieldCheck className="w-3 h-3 text-[#FF5500]" /> Medium</span>;
      case "Low":
        return <span className="inline-flex items-center gap-1 text-[11px] text-[#FF7043] font-medium"><AlertTriangle className="w-3 h-3 text-[#FF7043]" /> Low</span>;
      default:
        return <span className="inline-flex items-center gap-1 text-[11px] text-[#71717A]"><HelpCircle className="w-3 h-3 text-[#585E6A]" /> Unverified</span>;
    }
  };

  return (
    <div className="space-y-4">
      {/* Filters Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-[#08080A] border border-[#1C1F26]">
        <div className="flex flex-wrap items-center gap-2">
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
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-[#000000] border border-[#1C1F26] rounded-lg px-2.5 py-1 text-xs text-[#F4F4F5] focus:outline-none focus:border-[#FF5500]"
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
          className="bg-[#000000] border border-[#1C1F26] rounded-lg px-3 py-1 text-xs text-[#F4F4F5] placeholder-[#585E6A] focus:outline-none focus:border-[#FF5500] w-64"
        />
      </div>

      {/* Deals Table with matte styling */}
      <div className="overflow-x-auto rounded-xl border border-[#1C1F26] bg-[#0D0E12] shadow-2xl">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-[#1C1F26] bg-[#08080A] text-[#8E929E] font-medium">
              <th className="py-3 px-4">Deal Name & Account</th>
              <th className="py-3 px-4">Value</th>
              <th className="py-3 px-4">Stage / Status</th>
              <th className="py-3 px-4">Key Stakeholder</th>
              <th className="py-3 px-4">Confidence</th>
              <th className="py-3 px-4">Traceable Evidence</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1C1F26]/60">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-[#585E6A]">
                  No deals matching the selected criteria.
                </td>
              </tr>
            ) : (
              filtered.map((deal) => (
                <tr key={deal.id} className="hover:bg-[#14161C] transition-colors duration-150">
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-[#F4F4F5]">{deal.name}</div>
                    <div className="text-[11px] text-[#8E929E] mt-0.5">{deal.accountName}</div>
                    {deal.blocker && (
                      <div className="text-[11px] text-[#FF5500] mt-1 flex items-center gap-1 font-medium">
                        <AlertTriangle className="w-3 h-3 flex-shrink-0 text-[#FF5500]" />
                        <span>Blocker: {deal.blocker}</span>
                      </div>
                    )}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-semibold text-sm tabular-nums text-[#F4F4F5]">
                    {deal.value !== null ? (
                      `${deal.currency}${deal.value.toLocaleString()}`
                    ) : (
                      <span className="text-[#585E6A] italic text-xs font-sans">Unconfirmed</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="space-y-1">
                      {getCategoryBadge(deal.category)}
                      <div className="text-[11px] text-[#8E929E] capitalize">{deal.stage}</div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="text-[#F4F4F5] font-medium">{deal.relevantPerson || "Unassigned"}</div>
                    {deal.deadline && (
                      <div className="text-[10px] text-[#FFA066] font-mono mt-0.5 truncate max-w-xs" title={deal.deadline}>
                        Due: {deal.deadline}
                      </div>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    {getConfidenceIcon(deal.confidence)}
                    <div className="text-[10px] text-[#585E6A] mt-0.5 max-w-[140px] truncate" title={deal.confidenceReason}>
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
