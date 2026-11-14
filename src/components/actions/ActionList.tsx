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
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#F4F5F0] text-[#151515] border border-[#E2E5DE]">Completed</span>;
      case "In Progress":
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#ECEFE5] text-[#536F00] border border-[#D5DAD0] font-semibold">In Progress</span>;
      case "Blocked":
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#FDE8E8] text-[#E34B3D] border border-[#F8B4B4] font-semibold">Blocked</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-white text-[#747A80] border border-[#E2E5DE]">Proposed</span>;
    }
  };

  return (
    <div className="space-y-4">
      {/* Filter controls */}
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

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#F4F5F0] border border-[#E2E5DE] rounded-lg px-2.5 py-1 text-xs text-[#151515] focus:outline-none focus:border-[#536F00]"
          >
            <option value="All">All Statuses</option>
            <option value="Proposed">Proposed</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Blocked">Blocked</option>
          </select>
        </div>

        <span className="text-xs text-[#747A80] font-mono">
          Showing {filtered.length} Prioritized Action{filtered.length === 1 ? "" : "s"}
        </span>
      </div>

      {/* Action Cards */}
      <div className="space-y-3">
        {filtered.map((action) => (
          <div
            key={action.id}
            className={`p-4 rounded-xl bg-white border border-[#E2E5DE] shadow-sm space-y-3 hover:border-[#D5DAD0] transition-colors ${
              action.status === "Completed"
                ? "opacity-60"
                : action.dueDateStatus === "Urgent"
                ? "border-[#E34B3D]/40 bg-[#FFFDFD]"
                : ""
            }`}
          >
            {/* Top Row: Rank, Title, Status & Actions */}
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-lg bg-[#171717] text-white flex items-center justify-center text-xs font-bold font-mono flex-shrink-0 shadow-xs">
                  #{action.rank}
                </span>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-semibold text-[#151515]">{action.title}</span>
                    {getStatusBadge(action.status)}
                    {action.isTopThree && (
                      <span className="text-[10px] font-mono font-semibold text-[#536F00] px-1.5 py-0.2 rounded bg-[#ECEFE5] border border-[#D5DAD0]">
                        TOP 3 RANKED
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-[#747A80] mt-0.5">
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
                  className="bg-[#F4F5F0] border border-[#E2E5DE] rounded-lg px-2 py-1 text-xs text-[#151515] focus:outline-none focus:border-[#536F00]"
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
                  className="p-1 rounded-lg bg-[#F4F5F0] border border-[#E2E5DE] hover:bg-[#ECEFE5] text-[#747A80] hover:text-[#151515] transition-colors"
                >
                  <PlusCircle className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Next Step & Expected Outcome */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3 rounded-lg bg-[#F4F5F0] border border-[#E2E5DE] text-xs">
              <div>
                <span className="text-[#747A80] uppercase font-mono text-[10px] block mb-1">
                  Actionable Next Step
                </span>
                <p className="text-[#151515] leading-relaxed">{action.nextStep}</p>
              </div>
              <div>
                <span className="text-[#747A80] uppercase font-mono text-[10px] block mb-1">
                  Expected Business Outcome
                </span>
                <p className="text-[#151515] leading-relaxed">{action.expectedOutcome}</p>
              </div>
            </div>

            {/* Reason for Recommendation */}
            <div className="text-xs text-[#747A80]">
              <span className="text-[#151515] font-medium">Why This Action:</span> {action.reason}
            </div>

            {/* Footer Metadata & Traceability */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#E2E5DE] text-xs">
              <div className="flex flex-wrap items-center gap-4 text-[#747A80]">
                <div className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#747A80]" />
                  <span>Owner: <strong className="text-[#151515] font-medium">{action.owner}</strong></span>
                  <span className="text-[10px] font-mono text-[#747A80]">({action.ownerStatus})</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#747A80]" />
                  <span>Due: <strong className="text-[#151515] font-medium font-mono">{action.dueDate}</strong></span>
                  {action.dueDateStatus === "Urgent" && (
                    <span className="text-[10px] font-mono text-[#E34B3D] bg-[#FDE8E8] px-1.5 py-0.2 rounded border border-[#F8B4B4] font-bold">
                      URGENT
                    </span>
                  )}
                </div>
              </div>

              {/* Supporting Evidence Badge */}
              <div className="flex items-center gap-1.5">
                <span className="text-[#747A80] text-[11px]">Evidence:</span>
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
