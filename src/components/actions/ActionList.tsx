"use client";

import React, { useState } from "react";
import { ActionItem } from "@/lib/analysis/recommendations";
import { EvidenceBadge } from "../evidence/EvidenceBadge";
import {
  Clock,
  User,
  PlusCircle,
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
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#15171C] text-[#E4E4E7] border border-[#262A34]">Completed</span>;
      case "In Progress":
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#FF5500]/12 text-[#FF6519] border border-[#FF5500]/30 font-semibold">In Progress</span>;
      case "Blocked":
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#240C04] text-[#FF5500] border border-[#8C2A00] font-semibold">Blocked</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#0D0E12] text-[#808590] border border-[#1C1F26]">Proposed</span>;
    }
  };

  return (
    <div className="space-y-4">
      {/* Filter controls */}
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

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#000000] border border-[#1C1F26] rounded-lg px-2.5 py-1 text-xs text-[#F4F4F5] focus:outline-none focus:border-[#FF5500]"
          >
            <option value="All">All Statuses</option>
            <option value="Proposed">Proposed</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Blocked">Blocked</option>
          </select>
        </div>

        <span className="text-xs text-[#71717A] font-mono">
          Showing {filtered.length} Prioritized Action{filtered.length === 1 ? "" : "s"}
        </span>
      </div>

      {/* Action Cards */}
      <div className="space-y-3">
        {filtered.map((action) => (
          <div
            key={action.id}
            className={`p-4 rounded-xl matte-card space-y-3 ${
              action.status === "Completed"
                ? "opacity-60"
                : action.dueDateStatus === "Urgent"
                ? "border-[#FF5500]/45 bg-[#140A04]/30"
                : ""
            }`}
          >
            {/* Top Row: Rank, Title, Status & Actions */}
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-lg bg-[#FF5500] text-white flex items-center justify-center text-xs font-bold font-mono flex-shrink-0 shadow-sm shadow-[#FF5500]/25">
                  #{action.rank}
                </span>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-semibold text-[#F4F4F5]">{action.title}</span>
                    {getStatusBadge(action.status)}
                    {action.isTopThree && (
                      <span className="text-[10px] font-mono font-semibold text-[#FF5500] px-1.5 py-0.2 rounded bg-[#FF5500]/10 border border-[#FF5500]/20">
                        TOP 3 RANKED
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-[#8E929E] mt-0.5">
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
                  className="bg-[#000000] border border-[#1C1F26] rounded-lg px-2 py-1 text-xs text-[#F4F4F5] focus:outline-none focus:border-[#FF5500]"
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
                  className="p-1 rounded-lg bg-[#14161C] border border-[#1C1F26] hover:bg-[#1B1F25] text-[#8E929E] hover:text-[#FF5500] transition-colors"
                >
                  <PlusCircle className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Next Step & Expected Outcome */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3 rounded-lg bg-[#000000] border border-[#1C1F26] text-xs">
              <div>
                <span className="text-[#585E6A] uppercase font-mono text-[10px] block mb-1">
                  Actionable Next Step
                </span>
                <p className="text-[#F4F4F5] leading-relaxed">{action.nextStep}</p>
              </div>
              <div>
                <span className="text-[#585E6A] uppercase font-mono text-[10px] block mb-1">
                  Expected Business Outcome
                </span>
                <p className="text-[#E4E4E7] leading-relaxed">{action.expectedOutcome}</p>
              </div>
            </div>

            {/* Reason for Recommendation */}
            <div className="text-xs text-[#8E929E]">
              <span className="text-[#585E6A] font-medium">Why This Action:</span> {action.reason}
            </div>

            {/* Footer Metadata & Traceability */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#1C1F26] text-xs">
              <div className="flex flex-wrap items-center gap-4 text-[#8E929E]">
                <div className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#585E6A]" />
                  <span>Owner: <strong className="text-[#F4F4F5] font-medium">{action.owner}</strong></span>
                  <span className="text-[10px] font-mono text-[#585E6A]">({action.ownerStatus})</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#585E6A]" />
                  <span>Due: <strong className="text-[#F4F4F5] font-medium font-mono">{action.dueDate}</strong></span>
                  {action.dueDateStatus === "Urgent" && (
                    <span className="text-[10px] font-mono text-[#FF5500] bg-[#FF5500]/10 px-1.5 py-0.2 rounded border border-[#FF5500]/25 font-bold">
                      URGENT
                    </span>
                  )}
                </div>
              </div>

              {/* Supporting Evidence Badge */}
              <div className="flex items-center gap-1.5">
                <span className="text-[#585E6A] text-[11px]">Evidence:</span>
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
