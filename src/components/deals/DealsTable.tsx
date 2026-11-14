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
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">Confirmed</span>;
      case "active":
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#FF762E]/15 text-[#FF762E] border border-[#FF762E]/30">Active Offer</span>;
      case "at_risk":
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-red-500/15 text-red-400 border border-red-500/30">At Risk</span>;
      case "closed":
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-blue-500/15 text-blue-400 border border-blue-500/30">Closed Won</span>;
      case "unsupported_projection":
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-gray-500/15 text-gray-400 border border-gray-500/30">Unverified Claim</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-amber-500/15 text-amber-400 border border-amber-500/30">Unknown</span>;
    }
  };

  const getConfidenceIcon = (conf: DealItem["confidence"]) => {
    switch (conf) {
      case "High":
        return <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400"><CheckCircle2 className="w-3 h-3" /> High</span>;
      case "Medium":
        return <span className="inline-flex items-center gap-1 text-[11px] text-[#FF762E]"><ShieldCheck className="w-3 h-3" /> Medium</span>;
      case "Low":
        return <span className="inline-flex items-center gap-1 text-[11px] text-red-400"><AlertTriangle className="w-3 h-3" /> Low</span>;
      default:
        return <span className="inline-flex items-center gap-1 text-[11px] text-gray-400"><HelpCircle className="w-3 h-3" /> Unverified</span>;
    }
  };

  return (
    <div className="space-y-4">
      {/* Filters Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-lg bg-[#15181D] border border-[#272C34]">
        <div className="flex flex-wrap items-center gap-2">
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
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-[#101216] border border-[#272C34] rounded px-2.5 py-1 text-xs text-[#F4F4F5] focus:outline-none focus:border-[#FF762E]"
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
          className="bg-[#101216] border border-[#272C34] rounded px-3 py-1 text-xs text-[#F4F4F5] placeholder-[#666D78] focus:outline-none focus:border-[#FF762E] w-64"
        />
      </div>

      {/* Deals Table */}
      <div className="overflow-x-auto rounded-lg border border-[#272C34] bg-[#15181D]">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-[#272C34] bg-[#111419] text-[#9298A2] font-medium">
              <th className="py-3 px-4">Deal Name & Account</th>
              <th className="py-3 px-4">Value</th>
              <th className="py-3 px-4">Stage / Status</th>
              <th className="py-3 px-4">Key Stakeholder</th>
              <th className="py-3 px-4">Confidence</th>
              <th className="py-3 px-4">Traceable Evidence</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#272C34]/60">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-[#666D78]">
                  No deals matching the selected criteria.
                </td>
              </tr>
            ) : (
              filtered.map((deal) => (
                <tr key={deal.id} className="hover:bg-[#1B1F25]/60 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-[#F4F4F5]">{deal.name}</div>
                    <div className="text-[11px] text-[#9298A2] mt-0.5">{deal.accountName}</div>
                    {deal.blocker && (
                      <div className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3 flex-shrink-0" />
                        <span>Blocker: {deal.blocker}</span>
                      </div>
                    )}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-semibold text-sm tabular-nums text-[#F4F4F5]">
                    {deal.value !== null ? (
                      `${deal.currency}${deal.value.toLocaleString()}`
                    ) : (
                      <span className="text-[#666D78] italic text-xs font-sans">Unconfirmed</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="space-y-1">
                      {getCategoryBadge(deal.category)}
                      <div className="text-[11px] text-[#9298A2] capitalize">{deal.stage}</div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="text-[#F4F4F5] font-medium">{deal.relevantPerson || "Unassigned"}</div>
                    {deal.deadline && (
                      <div className="text-[10px] text-amber-400 font-mono mt-0.5 truncate max-w-xs" title={deal.deadline}>
                        Due: {deal.deadline}
                      </div>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    {getConfidenceIcon(deal.confidence)}
                    <div className="text-[10px] text-[#666D78] mt-0.5 max-w-[140px] truncate" title={deal.confidenceReason}>
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
