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
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl matte-card">
        <div>
          <div className="flex items-center gap-2">
            <CheckSquare className="w-4 h-4 text-[#FF5A00]" />
            <span className="text-xs font-mono uppercase tracking-wider text-[#FF5A00] font-semibold">
              Account Execution Strategy
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#F4F4F5] mt-1">
            Delivery, on Track.
          </h1>
          <p className="text-xs text-[#9A9FA8] mt-0.5">
            Ranked by business impact, urgency, verified owners, and contractual delivery runways.
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
          badgeColor="orange"
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

      {/* Multi-Track Delivery Runway Milestone Timeline (As seen in Reference Screenshot 2 & 4) */}
      <DeliveryRunway />

      {/* Action List Component */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold text-[#F4F4F5] uppercase tracking-wider font-mono">
            All Account Action Items & Progress Tracker
          </h2>
          <span className="text-xs text-[#606570]">
            Update status or click the note icon to log progress via MCP write_note
          </span>
        </div>
        <ActionList actions={actions} showAccountFilter={true} />
      </div>
    </div>
  );
}
