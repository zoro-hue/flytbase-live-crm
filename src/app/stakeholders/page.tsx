import React from "react";
import { getAllStakeholders } from "@/lib/analysis/stakeholders";
import { StakeholderGrid } from "@/components/stakeholders/StakeholderGrid";
import { StakeholderNetwork } from "@/components/visualizations/StakeholderNetwork";
import { Users2, UserCheck, UserX, AlertTriangle } from "lucide-react";
import { KpiCard } from "@/components/dashboard/KpiCard";

export default function StakeholdersPage() {
  const stakeholders = getAllStakeholders();

  const buyers = stakeholders.filter((s) => s.classification === "Economic Buyer" || s.classification === "Finance");
  const blockers = stakeholders.filter((s) => s.canBlock);
  const departing = stakeholders.filter((s) => s.isLeaving);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl matte-card">
        <div>
          <div className="flex items-center gap-2">
            <Users2 className="w-4 h-4 text-[#FF5A00]" />
            <span className="text-xs font-mono uppercase tracking-wider text-[#FF5A00] font-semibold">
              Stakeholder Relationship Intelligence
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#F4F4F5] mt-1">
            Stakeholder Power Matrix & Key Person Risks
          </h1>
          <p className="text-xs text-[#9A9FA8] mt-0.5">
            Who holds the decision-making authority, who controls the budget, and which relationships are vulnerable to departure or blockers.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Total Stakeholders Mapped"
          value={stakeholders.length}
          subtitle="Across both enterprise accounts"
          badge="Complete"
          badgeColor="green"
          icon={Users2}
        />
        <KpiCard
          title="Economic Buyers & Finance"
          value={buyers.length}
          subtitle="Nadia Rahman, Ewan Brooks"
          badge="Budget Authority"
          badgeColor="orange"
          icon={UserCheck}
        />
        <KpiCard
          title="Technical Gatekeepers / Blockers"
          value={blockers.length}
          subtitle="Can veto or block rollouts"
          badge="Critical"
          badgeColor="red"
          icon={AlertTriangle}
        />
        <KpiCard
          title="Departing Stakeholders"
          value={departing.length}
          subtitle="Rhys Calder leaving Jan 2027"
          badge="Imminent Risk"
          badgeColor="red"
          icon={UserX}
        />
      </div>

      {/* Radial Hub-and-Spoke Stakeholder Network (As seen in Reference Screenshots 3 & 6) */}
      <StakeholderNetwork />

      {/* Main Stakeholder Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold text-[#F4F4F5] uppercase tracking-wider font-mono">
            Enterprise Stakeholder Directory & Authority Mapping
          </h2>
        </div>
        <StakeholderGrid stakeholders={stakeholders} showAccountFilter={true} />
      </div>
    </div>
  );
}
