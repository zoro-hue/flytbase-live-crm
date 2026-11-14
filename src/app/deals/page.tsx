import React from "react";
import { getOverallPipeline } from "@/lib/analysis/valuation";
import { DealsTable } from "@/components/deals/DealsTable";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { Briefcase, DollarSign, TrendingUp, AlertTriangle, CheckCircle2 } from "lucide-react";

export default function DealsPage() {
  const { easternCounties, aldermoor, allDeals } = getOverallPipeline();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-xl matte-card">
        <div>
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-[#FF5500]" />
            <span className="text-xs font-mono uppercase tracking-wider text-[#FF5500] font-semibold">
              Deal Pipeline Management
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#F4F4F5] mt-1">
            Commercial Deals & Opportunities
          </h1>
          <p className="text-xs text-[#8E929E] mt-0.5">
            Verified deal breakdown across confirmed contracts, active pipeline, at-risk opportunities, and unverified projections.
          </p>
        </div>
      </div>

      {/* KPI Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Confirmed Framework"
          value="£1.5M"
          subtitle="300-dock national framework"
          badge="Agreed"
          badgeColor="green"
          icon={CheckCircle2}
        />
        <KpiCard
          title="Active Pipeline"
          value="£285k + €50k"
          subtitle="4 expansion offers currently on table"
          badge="Active"
          badgeColor="orange"
          icon={TrendingUp}
        />
        <KpiCard
          title="At-Risk Deal Value"
          value="£800k + €320k"
          subtitle="Renewals & rollouts blocked on evidence"
          badge="Action Required"
          badgeColor="red"
          icon={AlertTriangle}
        />
        <KpiCard
          title="Closed Won Value"
          value="€160k"
          subtitle="Aldermoor expansion won"
          badge="Realized"
          badgeColor="green"
          icon={DollarSign}
        />
      </div>

      {/* Deals Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold text-[#F4F4F5] uppercase tracking-wider">
            All Account Deals & Contractual Opportunities
          </h2>
          <span className="text-xs text-[#585E6A]">
            Click any source badge to inspect supporting contractual evidence
          </span>
        </div>
        <DealsTable deals={allDeals} showAccountFilter={true} />
      </div>
    </div>
  );
}
