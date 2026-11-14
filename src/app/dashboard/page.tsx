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
import { RadarHealthMap } from "@/components/visualizations/RadarHealthMap";
import { SankeyDealFlow } from "@/components/visualizations/SankeyDealFlow";
import { DeliveryRunway } from "@/components/visualizations/DeliveryRunway";
import {
  DollarSign,
  AlertTriangle,
  Radio,
  CheckSquare,
  ArrowRight,
  TrendingUp,
} from "lucide-react";

export default function DashboardOverviewPage() {
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
      <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-[#E2E5DE] shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#536F00]" />
            <span className="text-xs font-mono uppercase tracking-wider text-[#536F00] font-semibold">
              LIVE CRM INTELLIGENCE • QUESTATHON ENGINE
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#151515] mt-1 font-sans">
            Executive Command Center
          </h1>
          <p className="text-sm text-[#747A80] mt-0.5">
            Real-time synchronization with the official Questathon MCP server.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[10px] text-[#747A80] uppercase font-mono block">Last Synchronized</span>
            <span className="text-xs font-mono text-[#151515] font-semibold">
              {syncMeta.lastSync ? new Date(syncMeta.lastSync).toLocaleTimeString() : "Live Active"}
            </span>
          </div>
          <Link
            href="/settings"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F4F5F0] hover:bg-[#ECEFE5] text-xs font-medium text-[#151515] border border-[#E2E5DE] transition-colors"
          >
            <span>MCP Health</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#536F00]" />
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
          badgeColor="amber"
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

      {/* Interactive Visualizations: Radar Health Map & Sankey Deal Flow */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-6">
          <RadarHealthMap />
        </div>
        <div className="lg:col-span-6">
          <SankeyDealFlow />
        </div>
      </div>

      {/* Multi-Track Delivery Runway Timeline */}
      <DeliveryRunway />

      {/* Account Comparison Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Account A Card */}
        <div className="p-5 rounded-2xl bg-white border border-[#E2E5DE] shadow-sm flex flex-col justify-between space-y-5">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-[#536F00] font-semibold uppercase tracking-wider">
                Account A • Public Safety
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-[#ECEFE5] text-[#536F00] border border-[#D5DAD0]">
                14 / 35 Docks Flying
              </span>
            </div>
            <h2 className="text-lg font-bold text-[#151515]">Eastern Counties Police Alliance</h2>
            <p className="text-xs text-[#747A80] mt-1 leading-relaxed">
              Consortium of four county police forces: <strong className="text-[#151515]">Westmere Constabulary</strong> (18 docks, daily live patrol flights), <strong className="text-[#151515]">Metro Central Police</strong> (9 docks, operational), <strong className="text-[#151515]">Tarn Valley Police</strong> (4 docks, zero live flights — blocked on DPIA sign-off), and <strong className="text-[#151515]">Norwold Police</strong> (4 docks, training only). 300-dock national framework tender currently in preparation.
            </p>

            <div className="grid grid-cols-3 gap-2 mt-4 p-3 rounded-xl bg-[#F4F5F0] border border-[#E2E5DE] text-xs">
              <div>
                <span className="text-[#747A80] text-[10px] uppercase font-mono block">Confirmed</span>
                <span className="font-mono font-semibold text-[#151515]">£1.5M</span>
              </div>
              <div>
                <span className="text-[#747A80] text-[10px] uppercase font-mono block">At Risk</span>
                <span className="font-mono font-semibold text-[#E34B3D]">£800k</span>
              </div>
              <div>
                <span className="text-[#747A80] text-[10px] uppercase font-mono block">Top Blocker</span>
                <span className="text-[#C78620] truncate block text-[11px] font-medium" title="Ticket FB-10412 DPIA unassigned 4 mos">
                  DPIA unassigned
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-[#E2E5DE]">
            <span className="text-xs text-[#747A80]">5 Critical Questions Answered</span>
            <Link
              href="/accounts/eastern-counties"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#171717] hover:bg-[#252525] text-white text-xs font-semibold shadow-xs transition-all duration-200"
            >
              <span>Explore Account Intelligence</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Account B Card */}
        <div className="p-5 rounded-2xl bg-white border border-[#E2E5DE] shadow-sm flex flex-col justify-between space-y-5">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-[#536F00] font-semibold uppercase tracking-wider">
                Account B • Industrial Security
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-[#FEF3C7] text-[#C78620] border border-[#FDE68A]">
                4 / 14 Docks Flying Regularly
              </span>
            </div>
            <h2 className="text-lg font-bold text-[#151515]">Aldermoor Industrial Group</h2>
            <p className="text-xs text-[#747A80] mt-1 leading-relaxed">
              15 manufacturing plants across Europe. 14 docks installed, 4 plants fly regularly, 9 plants idle. Claimed €1.2M savings unverified by finance.
            </p>

            <div className="grid grid-cols-3 gap-2 mt-4 p-3 rounded-xl bg-[#F4F5F0] border border-[#E2E5DE] text-xs">
              <div>
                <span className="text-[#747A80] text-[10px] uppercase font-mono block">Closed Won</span>
                <span className="font-mono font-semibold text-[#151515]">€160k</span>
              </div>
              <div>
                <span className="text-[#747A80] text-[10px] uppercase font-mono block">At Risk</span>
                <span className="font-mono font-semibold text-[#E34B3D]">€320k</span>
              </div>
              <div>
                <span className="text-[#747A80] text-[10px] uppercase font-mono block">Top Blocker</span>
                <span className="text-[#C78620] truncate block text-[11px] font-medium" title="Finance cannot verify €1.2M spreadsheet savings claim">
                  ROI unverified
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-[#E2E5DE]">
            <span className="text-xs text-[#747A80]">5 Critical Questions Answered</span>
            <Link
              href="/accounts/aldermoor"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#171717] hover:bg-[#252525] text-white text-xs font-semibold shadow-xs transition-all duration-200"
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
            <Radio className="w-4 h-4 text-[#FF5A00]" />
            <h2 className="text-xs font-bold text-[#151515] uppercase tracking-wider font-mono">
              Urgent Live Signals & Questathon Events (Confirmed by MCP Data)
            </h2>
          </div>
          <Link href="/signals" className="text-xs text-[#536F00] hover:underline flex items-center gap-1 font-medium">
            <span>View All Signals</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <SignalFeed signals={signals} showAccountFilter={true} />
      </div>

      {/* Top 3 Prioritized Next Actions */}
      <div className="space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckSquare className="w-4 h-4 text-[#536F00]" />
            <h2 className="text-xs font-bold text-[#151515] uppercase tracking-wider font-mono">
              Top Ranked Recommended Next Actions
            </h2>
          </div>
          <Link href="/actions" className="text-xs text-[#536F00] hover:underline flex items-center gap-1 font-medium">
            <span>Open Full Action Plan</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <ActionList actions={top3Actions} showAccountFilter={false} />
      </div>
    </div>
  );
}
