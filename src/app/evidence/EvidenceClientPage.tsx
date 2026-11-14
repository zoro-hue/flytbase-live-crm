"use client";

import React, { useState } from "react";
import { EvidenceRecord } from "@/lib/data/provenance";
import { FileText, Search, ExternalLink, AlertTriangle, CheckCircle2 } from "lucide-react";

interface EvidenceClientPageProps {
  initialEvidence: EvidenceRecord[];
}

export default function EvidenceClientPage({ initialEvidence }: EvidenceClientPageProps) {
  const [accountFilter, setAccountFilter] = useState<string>("All");
  const [typeFilter, setTypeFilter] = useState<string>("All");
  const [search, setSearch] = useState<string>("");

  const filtered = initialEvidence.filter((item) => {
    if (accountFilter !== "All" && item.account !== accountFilter) return false;
    if (typeFilter !== "All" && item.sourceType !== typeFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        item.sourceId.toLowerCase().includes(q) ||
        item.sourceName.toLowerCase().includes(q) ||
        item.title.toLowerCase().includes(q) ||
        item.relevantQuote.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-4">
      {/* Search and Filters Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-[#08080A] border border-[#1C1F26]">
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={accountFilter}
            onChange={(e) => setAccountFilter(e.target.value)}
            className="bg-[#000000] border border-[#1C1F26] rounded-lg px-3 py-1.5 text-xs text-[#F4F4F5] focus:outline-none focus:border-[#FF5500]"
          >
            <option value="All">All Accounts</option>
            <option value="A">Eastern Counties (A)</option>
            <option value="B">Aldermoor Industrial (B)</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="bg-[#000000] border border-[#1C1F26] rounded-lg px-3 py-1.5 text-xs text-[#F4F4F5] focus:outline-none focus:border-[#FF5500]"
          >
            <option value="All">All Source Types</option>
            <option value="file">Files & Spreadsheets</option>
            <option value="fact">Account Facts</option>
            <option value="ticket">Support Tickets</option>
            <option value="call_note">Call Notes & Transcripts</option>
            <option value="email">Emails</option>
          </select>
        </div>

        <div className="relative w-72">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[#585E6A]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search source IDs, keywords, quotes..."
            className="w-full bg-[#000000] border border-[#1C1F26] rounded-lg pl-8 pr-3 py-1.5 text-xs text-[#F4F4F5] placeholder-[#585E6A] focus:outline-none focus:border-[#FF5500]"
          />
        </div>
      </div>

      {/* Evidence Table */}
      <div className="overflow-x-auto rounded-xl border border-[#1C1F26] bg-[#0D0E12] shadow-2xl">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-[#1C1F26] bg-[#08080A] text-[#8E929E] font-medium">
              <th className="py-3 px-4">Source ID & Title</th>
              <th className="py-3 px-4">Type</th>
              <th className="py-3 px-4">Account</th>
              <th className="py-3 px-4">Extracted Verified Detail</th>
              <th className="py-3 px-4">Verification Status</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1C1F26]/60">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-[#585E6A]">
                  No evidence records match the search query.
                </td>
              </tr>
            ) : (
              filtered.map((item) => (
                <tr
                  key={item.sourceId}
                  onClick={() =>
                    window.dispatchEvent(
                      new CustomEvent("open-evidence-drawer", { detail: { sourceId: item.sourceId } })
                    )
                  }
                  className="hover:bg-[#14161C] transition-colors duration-150 cursor-pointer group"
                >
                  <td className="py-3 px-4">
                    <div className="font-mono font-medium text-[#FF5500] flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-[#FF5500]" />
                      <span>{item.sourceId}</span>
                    </div>
                    <div className="text-[11px] text-[#F4F4F5] font-medium mt-0.5 truncate max-w-xs">
                      {item.title}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#14161C] text-[#8E929E] border border-[#1C1F26] capitalize">
                      {item.sourceType.replace(/_/g, " ")}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-[#8E929E]">
                    {item.accountName}
                  </td>
                  <td className="py-3 px-4 max-w-md">
                    <p className="text-xs text-[#F4F4F5] line-clamp-2 leading-relaxed">
                      &ldquo;{item.relevantQuote}&rdquo;
                    </p>
                    {item.limitations && (
                      <p className="text-[10px] text-[#FFA066] mt-1 flex items-center gap-1 font-mono">
                        <AlertTriangle className="w-2.5 h-2.5 text-[#FF5500]" />
                        <span>{item.limitations}</span>
                      </p>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    {item.verifiedBy ? (
                      <span className="text-[#E4E4E7] font-mono text-[11px] flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-[#FF5500]" /> Verified ({item.verifiedBy})
                      </span>
                    ) : item.limitations ? (
                      <span className="text-[#FFA066] font-mono text-[11px]">Unverified Claim</span>
                    ) : (
                      <span className="text-[#8E929E] font-mono text-[11px]">Recorded Fact</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#FF5500] group-hover:underline">
                      <span>Inspect</span>
                      <ExternalLink className="w-3 h-3" />
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
