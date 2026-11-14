import React from "react";
import { getOverallPipeline } from "@/lib/analysis/valuation";
import { DealsTable } from "@/components/deals/DealsTable";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { ForecastGauge } from "@/components/visualizations/ForecastGauge";
import { SankeyDealFlow } from "@/components/visualizations/SankeyDealFlow";
import { DealMomentumScatter } from "@/components/deals/DealMomentumScatter";
import { Briefcase, DollarSign, TrendingUp, AlertTriangle, CheckCircle2 } from "lucide-react";

export default function DealsPage() {
  const { easternCounties, aldermoor, allDeals } = getOverallPipeline();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl matte-card">
        <div>
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-[#FF5A00]" />
            <span className="text-xs font-mono uppercase tracking-wider text-[#FF5A00] font-semibold">
              Deal Pipeline Management
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#F4F4F5] mt-1">
            Pipeline, in Motion
          </h1>
          <p className="text-xs text-[#9A9FA8] mt-0.5">
            Verified deal breakdown across confirmed contracts, active pipeline, at-risk opportunities, and probability-weighted forecasts.
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

      {/* Forecast Gauge & Lead Flow Sankey (As seen in Reference Screenshot 7) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        <div className="lg:col-span-5 flex flex-col">
          <ForecastGauge
            wonAmount="£1.5M"
            weightedAmount="£420k"
            gapAmount="£180k"
            targetAmount="£2.1M"
            percentage={73}
          />
        </div>
        <div className="lg:col-span-7 flex flex-col">
          <SankeyDealFlow />
        </div>
      </div>

      {/* Deal Momentum Scatter Plot & Closing in 30 Days (As seen in Reference Screenshot 1) */}
      <DealMomentumScatter />

      {/* Deals Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold text-[#F4F4F5] uppercase tracking-wider font-mono">
            All Account Deals & Contractual Opportunities
          </h2>
          <span className="text-xs text-[#606570]">
            Click any source badge to inspect supporting contractual evidence
          </span>
        </div>
        <DealsTable deals={allDeals} showAccountFilter={true} />
      </div>
    </div>
  );
}
