import React from "react";
import { getAccountActions } from "@/lib/analysis/recommendations";
import { ActionList } from "@/components/actions/ActionList";
import { DeliveryRunway } from "@/components/visualizations/DeliveryRunway";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { CheckSquare, Clock, AlertCircle, CheckCircle2 } from "lucide-react";

export default function ActionsPage() {
  const actions = getAccountActions();

  const urgentCount = actions.filter((a) => a.dueDateStatus === "Urgent").length;
  const inProgressCount = actions.filter((a) => a.status === "In Progress").length;
  const completedCount = actions.filter((a) => a.status === "Completed").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-[#E2E5DE] shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <CheckSquare className="w-4 h-4 text-[#536F00]" />
            <span className="text-xs font-mono uppercase tracking-wider text-[#536F00] font-semibold">
              Account Execution Strategy
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#151515] mt-1 font-sans">
            Delivery, on track.
          </h1>
          <p className="text-sm text-[#747A80] mt-0.5">
            5 clients, 2 client meetings today, and 1 at risk — Sage has a recovery plan ready.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Total Ranked Actions"
          value={actions.length}
          subtitle="Top 3 prioritized per account"
          badge="Prioritized"
          badgeColor="green"
          icon={CheckSquare}
        />
        <KpiCard
          title="Urgent Due Dates"
          value={urgentCount}
          subtitle="Immediate response required"
          badge="Urgent"
          badgeColor="red"
          icon={Clock}
        />
        <KpiCard
          title="In Progress"
          value={inProgressCount}
          subtitle="Actively underway by CSM team"
          badge="Active"
          badgeColor="amber"
          icon={AlertCircle}
        />
        <KpiCard
          title="Completed Actions"
          value={completedCount}
          subtitle="Successfully executed next steps"
          badge="Closed"
          badgeColor="green"
          icon={CheckCircle2}
        />
      </div>

      {/* Multi-Track Delivery Runway Milestone Timeline */}
      <DeliveryRunway />

      {/* Action List Component */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold text-[#151515] uppercase tracking-wider font-mono">
            All Account Action Items & Progress Tracker
          </h2>
          <span className="text-xs text-[#747A80]">
            Update status or click the note icon to log progress via MCP write_note
          </span>
        </div>
        <ActionList actions={actions} showAccountFilter={true} />
      </div>
    </div>
  );
}
