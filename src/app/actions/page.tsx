import React from "react";
import { getAccountActions } from "@/lib/analysis/recommendations";
import { ActionList } from "@/components/actions/ActionList";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { CheckSquare, Clock, AlertCircle, CheckCircle2 } from "lucide-react";

export default function ActionsPage() {
  const actions = getAccountActions();

  const urgentCount = actions.filter((a) => a.dueDateStatus === "Urgent").length;
  const inProgressCount = actions.filter((a) => a.status === "In Progress").length;
  const completedCount = actions.filter((a) => a.status === "Completed").length;

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-xl bg-gradient-to-r from-[#111419] to-[#15181D] border border-[#272C34]">
        <div>
          <div className="flex items-center gap-2">
            <CheckSquare className="w-4 h-4 text-[#FF762E]" />
            <span className="text-xs font-mono uppercase tracking-wider text-[#FF762E]">
              Account Execution Strategy
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#F4F4F5] mt-1">
            Prioritized Action Plan
          </h1>
          <p className="text-xs text-[#9298A2] mt-0.5">
            Ranked by business impact, urgency, verified owners, and contractual deadlines.
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

      {/* Action List Component */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-[#F4F4F5] uppercase tracking-wider">
            All Account Action Items & Progress Tracker
          </h2>
          <span className="text-xs text-[#666D78]">
            Update status or click the note icon to log progress via MCP write_note
          </span>
        </div>
        <ActionList actions={actions} showAccountFilter={true} />
      </div>
    </div>
  );
}
