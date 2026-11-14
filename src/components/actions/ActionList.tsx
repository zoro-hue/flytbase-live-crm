"use client";

import React, { useState } from "react";
import { ActionItem } from "@/lib/analysis/recommendations";
import { EvidenceBadge } from "../evidence/EvidenceBadge";
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  User,
  ArrowRight,
  PlusCircle,
  Filter,
} from "lucide-react";

interface ActionListProps {
  actions: ActionItem[];
  showAccountFilter?: boolean;
  onActionUpdated?: () => void;
}

export const ActionList: React.FC<ActionListProps> = ({
  actions: initialActions,
  showAccountFilter = true,
  onActionUpdated,
}) => {
  const [actions, setActions] = useState<ActionItem[]>(initialActions);
  const [accountFilter, setAccountFilter] = useState<string>("All");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const handleStatusChange = async (actionId: string, newStatus: ActionItem["status"]) => {
    setUpdatingId(actionId);
    try {
      const res = await fetch(`/api/actions/${actionId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setActions((prev) =>
          prev.map((a) => (a.id === actionId ? { ...a, status: newStatus } : a))
        );
        if (onActionUpdated) onActionUpdated();
      }
    } catch (err) {
      console.error("Failed to update action status:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  const filtered = actions.filter((a) => {
    if (accountFilter !== "All" && a.account !== accountFilter) return false;
    if (statusFilter !== "All" && a.status !== statusFilter) return false;
    return true;
  });

  const getStatusBadge = (status: ActionItem["status"]) => {
    switch (status) {
      case "Completed":
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">Completed</span>;
      case "In Progress":
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#FF762E]/15 text-[#FF762E] border border-[#FF762E]/30">In Progress</span>;
      case "Blocked":
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-red-500/15 text-red-400 border border-red-500/30">Blocked</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-gray-500/15 text-gray-400 border border-gray-500/30">Proposed</span>;
    }
  };

  return (
    <div className="space-y-4">
      {/* Filter controls */}
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

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#101216] border border-[#272C34] rounded px-2.5 py-1 text-xs text-[#F4F4F5] focus:outline-none focus:border-[#FF762E]"
          >
            <option value="All">All Statuses</option>
            <option value="Proposed">Proposed</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Blocked">Blocked</option>
          </select>
        </div>

        <span className="text-xs text-[#9298A2] font-mono">
          Showing {filtered.length} Prioritized Action{filtered.length === 1 ? "" : "s"}
        </span>
      </div>

      {/* Action Cards */}
      <div className="space-y-3">
        {filtered.map((action) => (
          <div
            key={action.id}
            className={`p-4 rounded-lg bg-[#15181D] border transition-all space-y-3 ${
              action.status === "Completed"
                ? "border-emerald-500/30 opacity-75"
                : action.dueDateStatus === "Urgent"
                ? "border-[#FF762E]/50 bg-[#FF762E]/5"
                : "border-[#272C34] hover:border-[#383E49]"
            }`}
          >
            {/* Top Row: Rank, Title, Status & Actions */}
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded bg-[#FF762E]/15 border border-[#FF762E]/30 flex items-center justify-center font-mono font-bold text-xs text-[#FF762E] flex-shrink-0 mt-0.5">
                  #{action.rank}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-[#F4F4F5]">{action.title}</span>
                    {getStatusBadge(action.status)}
                    {action.isTopThree && (
                      <span className="text-[10px] font-mono text-[#FF762E] px-1.5 py-0.2 rounded bg-[#FF762E]/10">
                        TOP 3 RANKED
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-[#9298A2] mt-0.5">
                    {action.accountName} • Affected: {action.affectedDeal}
                  </div>
                </div>
              </div>

              {/* Status Selector Dropdown */}
              <div className="flex items-center gap-2">
                <select
                  value={action.status}
                  disabled={updatingId === action.id}
                  onChange={(e) => handleStatusChange(action.id, e.target.value as ActionItem["status"])}
                  className="bg-[#101216] border border-[#272C34] rounded px-2 py-1 text-xs text-[#F4F4F5] focus:outline-none focus:border-[#FF762E]"
                >
                  <option value="Proposed">Proposed</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Blocked">Blocked</option>
                </select>

                <button
                  onClick={() =>
                    window.dispatchEvent(
                      new CustomEvent("open-note-modal", {
                        detail: {
                          account: action.account,
                          kind: "action",
                          title: `Progress on: ${action.title.slice(0, 30)}`,
                        },
                      })
                    )
                  }
                  title="Write MCP Note for this action"
                  className="p-1 rounded bg-[#1B1F25] hover:bg-crm-card text-[#9298A2] hover:text-[#FF762E] transition-colors"
                >
                  <PlusCircle className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Next Step & Expected Outcome */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3 rounded bg-[#1B1F25] border border-[#272C34]/60 text-xs">
              <div>
                <span className="text-[#666D78] uppercase font-mono text-[10px] block mb-1">
                  Actionable Next Step
                </span>
                <p className="text-[#F4F4F5] leading-relaxed">{action.nextStep}</p>
              </div>
              <div>
                <span className="text-[#666D78] uppercase font-mono text-[10px] block mb-1">
                  Expected Business Outcome
                </span>
                <p className="text-emerald-300/90 leading-relaxed">{action.expectedOutcome}</p>
              </div>
            </div>

            {/* Reason for Recommendation */}
            <div className="text-xs text-[#9298A2]">
              <span className="text-[#666D78] font-medium">Why This Action:</span> {action.reason}
            </div>

            {/* Footer Metadata & Traceability */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#272C34]/50 text-xs">
              <div className="flex flex-wrap items-center gap-4 text-[#9298A2]">
                <div className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#666D78]" />
                  <span>Owner: <strong className="text-[#F4F4F5] font-medium">{action.owner}</strong></span>
                  <span className="text-[10px] font-mono text-[#666D78]">({action.ownerStatus})</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#666D78]" />
                  <span>Due: <strong className="text-[#F4F4F5] font-medium font-mono">{action.dueDate}</strong></span>
                  {action.dueDateStatus === "Urgent" && (
                    <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-1.5 py-0.2 rounded border border-amber-500/20">
                      URGENT
                    </span>
                  )}
                </div>
              </div>

              {/* Supporting Evidence Badge */}
              <div className="flex items-center gap-1.5">
                <span className="text-[#666D78] text-[11px]">Evidence:</span>
                <EvidenceBadge
                  sourceId={action.supportingSourceId}
                  sourceName={action.supportingSourceName}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
