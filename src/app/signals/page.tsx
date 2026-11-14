import React from "react";
import { getConfirmedSignals } from "@/lib/analysis/signals";
import { SignalFeed } from "@/components/signals/SignalFeed";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { Radio, AlertOctagon, AlertTriangle, ShieldCheck } from "lucide-react";

export default function SignalsPage() {
  const signals = getConfirmedSignals();

  const criticalCount = signals.filter((s) => s.severity === "Critical").length;
  const highCount = signals.filter((s) => s.severity === "High").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-xl matte-card">
        <div>
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-[#FF5500] animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-wider text-[#FF5500] font-semibold">
              Live Signals & Field Event Intelligence
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#F4F4F5] mt-1">
            Real-Time Field Telemetry & Critical Events
          </h1>
          <p className="text-xs text-[#8E929E] mt-0.5">
            Confirmed against actual MCP flight records, support tickets, and stakeholder logs without synthetic data.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Active Field Signals"
          value={signals.length}
          subtitle="Events A, B, and C confirmed"
          badge="Live"
          badgeColor="orange"
          icon={Radio}
        />
        <KpiCard
          title="Critical Severities"
          value={criticalCount}
          subtitle="Events A & B requiring immediate response"
          badge="Critical"
          badgeColor="red"
          icon={AlertOctagon}
        />
        <KpiCard
          title="High Priority"
          value={highCount}
          subtitle="Event C Rhys Calder departure"
          badge="High"
          badgeColor="amber"
          icon={AlertTriangle}
        />
        <KpiCard
          title="Telemetry Data Source"
          value="100% MCP"
          subtitle="Verified by flight logs and tickets"
          badge="Verified"
          badgeColor="green"
          icon={ShieldCheck}
        />
      </div>

      {/* Signal Feed */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold text-[#F4F4F5] uppercase tracking-wider">
            Verified Signal Stream & Mandated Responses
          </h2>
          <span className="text-xs text-[#585E6A]">
            Expand any signal to view affected equipment, baseline comparisons, and evidence
          </span>
        </div>
        <SignalFeed signals={signals} showAccountFilter={true} />
      </div>
    </div>
  );
}
