import React from "react";
import Link from "next/link";
import { getAccountValuation } from "@/lib/analysis/valuation";
import { getConfirmedSignals } from "@/lib/analysis/signals";
import { getAccountActions } from "@/lib/analysis/recommendations";
import { getAccountRisks } from "@/lib/analysis/risks";
import { getSyncMetadata } from "@/lib/data/cache";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { ActionList } from "@/components/actions/ActionList";
import { SignalFeed } from "@/components/signals/SignalFeed";
import {
  DollarSign,
  AlertTriangle,
  Radio,
  CheckSquare,
  ArrowRight,
  TrendingUp,
} from "lucide-react";

export default function OverviewPage() {
  const valA = getAccountValuation("A");
  const valB = getAccountValuation("B");
  const signals = getConfirmedSignals();
  const allActions = getAccountActions();
  const allRisks = getAccountRisks();
  const syncMeta = getSyncMetadata();

  const top3Actions = allActions.filter((a) => a.isTopThree).slice(0, 3);
  const criticalRisks = allRisks.filter((r) => r.severity === "Critical" || r.severity === "High");

  return (
    <div className="space-y-7">
      {/* Top Welcome & Sync Freshness Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-xl matte-card">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF5500] animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-wider text-[#FF5500] font-semibold">
              Live CRM Intelligence • Questathon Engine
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#F4F4F5] mt-1">
            Executive Account Command Center
          </h1>
          <p className="text-xs text-[#8E929E] mt-0.5">
            Real-time synchronization with the official Questathon MCP server.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[10px] text-[#585E6A] uppercase font-mono block">Last Synchronized</span>
            <span className="text-xs font-mono text-[#F4F4F5]">
              {syncMeta.lastSync ? new Date(syncMeta.lastSync).toLocaleTimeString() : "Live Active"}
            </span>
          </div>
          <Link
            href="/settings"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#14161C] hover:bg-[#1C1F26] text-xs font-medium text-[#F4F4F5] border border-[#1C1F26] transition-colors"
          >
            <span>MCP Health</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#FF5500]" />
          </Link>
        </div>
      </div>

      {/* Global Portfolio KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Confirmed Framework Value"
          value="£1.5M"
          subtitle="Eastern Counties 300-dock tender"
          badge="Agreed"
          badgeColor="green"
          icon={DollarSign}
        />
        <KpiCard
          title="Active Qualified Pipeline"
          value="£800k + €320k"
          subtitle="4 fleet expansion & deployment deals"
          badge="In Play"
          badgeColor="orange"
          icon={TrendingUp}
        />
        <KpiCard
          title="At-Risk Deal Value"
          value="£800k + €320k"
          subtitle="Blocked on DPIA, flights, or savings proof"
          badge="Action Needed"
          badgeColor="red"
          icon={AlertTriangle}
        />
        <KpiCard
          title="Live Field Signals"
          value={signals.length}
          subtitle="3 challenge events verified & live"
          badge="Active"
          badgeColor="orange"
          icon={Radio}
        />
      </div>

      {/* Account Comparison Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Account A Card */}
        <div className="p-5 rounded-xl matte-card flex flex-col justify-between space-y-5">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-[#FF5500] font-semibold uppercase tracking-wider">
                Account A • Public Safety
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#14161C] text-[#E4E4E7] border border-[#252830]">
                14 / 35 Docks Flying
              </span>
            </div>
            <h2 className="text-lg font-bold text-[#F4F4F5]">Eastern Counties Police Alliance</h2>
            <p className="text-xs text-[#8E929E] mt-1 leading-relaxed">
              4 forces (Westmere, Metro Central, Tarn Valley, Norwold). 35 docks installed, 300-dock framework in preparation.
            </p>

            <div className="grid grid-cols-3 gap-2 mt-4 p-3 rounded-lg bg-[#000000] border border-[#1C1F26] text-xs">
              <div>
                <span className="text-[#585E6A] text-[10px] uppercase font-mono block">Confirmed</span>
                <span className="font-mono font-semibold text-[#F4F4F5]">£1.5M</span>
              </div>
              <div>
                <span className="text-[#585E6A] text-[10px] uppercase font-mono block">At Risk</span>
                <span className="font-mono font-semibold text-[#FF5500]">£800k</span>
              </div>
              <div>
                <span className="text-[#585E6A] text-[10px] uppercase font-mono block">Top Blocker</span>
                <span className="text-[#FFA066] truncate block text-[11px]" title="Ticket FB-10412 DPIA unassigned 4 mos">
                  DPIA unassigned
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-[#1C1F26]">
            <span className="text-xs text-[#71717A]">5 Critical Questions Answered</span>
            <Link
              href="/accounts/eastern-counties"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FF5500] hover:bg-[#E04B00] text-white text-xs font-semibold shadow-md shadow-[#FF5500]/20 transition-all duration-200"
            >
              <span>Explore Account Intelligence</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Account B Card */}
        <div className="p-5 rounded-xl matte-card flex flex-col justify-between space-y-5">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-[#FF5500] font-semibold uppercase tracking-wider">
                Account B • Industrial Security
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#1A1009] text-[#FFA066] border border-[#5E2B0C]">
                4 / 14 Docks Flying Regularly
              </span>
            </div>
            <h2 className="text-lg font-bold text-[#F4F4F5]">Aldermoor Industrial Group</h2>
            <p className="text-xs text-[#8E929E] mt-1 leading-relaxed">
              15 manufacturing plants across Europe. 14 docks installed, 4 plants fly regularly, 9 plants idle. Claimed €1.2M savings unverified by finance.
            </p>

            <div className="grid grid-cols-3 gap-2 mt-4 p-3 rounded-lg bg-[#000000] border border-[#1C1F26] text-xs">
              <div>
                <span className="text-[#585E6A] text-[10px] uppercase font-mono block">Closed Won</span>
                <span className="font-mono font-semibold text-[#F4F4F5]">€160k</span>
              </div>
              <div>
                <span className="text-[#585E6A] text-[10px] uppercase font-mono block">At Risk</span>
                <span className="font-mono font-semibold text-[#FF5500]">€320k</span>
              </div>
              <div>
                <span className="text-[#585E6A] text-[10px] uppercase font-mono block">Top Blocker</span>
                <span className="text-[#FFA066] truncate block text-[11px]" title="Finance cannot verify €1.2M spreadsheet savings claim">
                  ROI unverified
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-[#1C1F26]">
            <span className="text-xs text-[#71717A]">5 Critical Questions Answered</span>
            <Link
              href="/accounts/aldermoor"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FF5500] hover:bg-[#E04B00] text-white text-xs font-semibold shadow-md shadow-[#FF5500]/20 transition-all duration-200"
            >
              <span>Explore Account Intelligence</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Critical Live Signals Alert Bar */}
      <div className="space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-[#FF5500] animate-pulse" />
            <h2 className="text-xs font-bold text-[#F4F4F5] uppercase tracking-wider">
              Urgent Live Signals & Questathon Events (Confirmed by MCP Data)
            </h2>
          </div>
          <Link href="/signals" className="text-xs text-[#FF5500] hover:underline flex items-center gap-1 font-medium">
            <span>View All Signals</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <SignalFeed signals={signals} showAccountFilter={true} />
      </div>

      {/* Top 3 Prioritized Next Actions */}
      <div className="space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckSquare className="w-4 h-4 text-[#FF5500]" />
            <h2 className="text-xs font-bold text-[#F4F4F5] uppercase tracking-wider">
              Top Ranked Recommended Next Actions
            </h2>
          </div>
          <Link href="/actions" className="text-xs text-[#FF5500] hover:underline flex items-center gap-1 font-medium">
            <span>Open Full Action Plan</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <ActionList actions={top3Actions} showAccountFilter={false} />
      </div>
    </div>
  );
}
