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
      <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-[#E2E5DE] shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#536F00]" />
            <span className="text-xs font-mono uppercase tracking-wider text-[#536F00] font-semibold">
              Sales Pipeline Intelligence
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#151515] mt-1 font-sans">
            Pipeline, in motion.
          </h1>
          <p className="text-sm text-[#747A80] mt-0.5">
            12 open deals worth $413,500. 1 are going quiet — Nova has drafts ready.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="px-3.5 py-1.5 rounded-xl bg-[#F4F5F0] hover:bg-[#ECEFE5] border border-[#E2E5DE] text-xs font-medium text-[#151515] transition-colors"
          >
            Deals board →
          </button>
          <button
            type="button"
            className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-[#F4F5F0] border border-[#E2E5DE] text-xs font-medium text-[#747A80] transition-colors"
          >
            Classic overview
          </button>
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
          <h2 className="text-xs font-bold text-[#151515] uppercase tracking-wider font-mono">
            All Account Deals & Contractual Opportunities
          </h2>
          <span className="text-xs text-[#747A80]">
            Click any source badge to inspect supporting contractual evidence
          </span>
        </div>
        <DealsTable deals={allDeals} showAccountFilter={true} />
      </div>
    </div>
  );
}
