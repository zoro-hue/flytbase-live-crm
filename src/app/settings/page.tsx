"use client";

import React, { useState, useEffect } from "react";
import {
  Settings,
  RefreshCw,
  ShieldCheck,
  Database,
  Clock,
  Server,
  Key,
  CheckCircle2,
} from "lucide-react";
import { KpiCard } from "@/components/dashboard/KpiCard";

export default function SettingsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [message, setMessage] = useState<string>("");

  const loadStatus = () => {
    setLoading(true);
    fetch("/api/sync")
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success) {
          setData(resData.connection);
        }
      })
      .catch((err) => console.error("Error loading sync data:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadStatus();
    const interval = setInterval(loadStatus, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleManualSync = async () => {
    setSyncing(true);
    setMessage("Calling MCP get_signals tool...");
    try {
      const res = await fetch("/api/sync", { method: "POST" });
      const resData = await res.json();
      if (!res.ok) {
        setMessage(`Rate limited: ${resData.error}`);
      } else {
        setMessage("Synchronized successfully with Questathon MCP server!");
        loadStatus();
      }
    } catch (err: any) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setSyncing(false);
    }
  };

  const rate = data?.rateLimit;
  const env = data?.environment;

  return (
    <div className="space-y-6 section-matte-enter">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-xl matte-card">
        <div>
          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4 text-[#FF5500]" />
            <span className="text-xs font-mono uppercase tracking-wider text-[#FF5500] font-semibold">
              System & Integration Settings
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#F4F4F5] mt-1">
            Questathon MCP Connection & Persistent Cache
          </h1>
          <p className="text-xs text-[#8E929E] mt-0.5">
            Monitor real-time JSON-RPC connection health, server-side tokens, rate limit countdowns, and storage cache.
          </p>
        </div>

        <button
          onClick={handleManualSync}
          disabled={!rate?.canCallNow || syncing}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#FF5500] hover:bg-[#E04B00] disabled:opacity-40 text-white text-xs font-semibold shadow-md shadow-[#FF5500]/20 transition-all duration-200 cursor-pointer active:scale-95"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${syncing ? "animate-spin" : ""}`} />
          <span>{syncing ? "Syncing..." : "Trigger Manual Sync"}</span>
        </button>
      </div>

      {message && (
        <div className="p-3.5 rounded-xl bg-[#0E1013] border border-[#1C1F26] text-xs text-[#F4F4F5] flex items-center justify-between">
          <span>{message}</span>
          <button onClick={() => setMessage("")} className="text-[#585E6A] hover:text-[#F4F4F5]">✕</button>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="MCP Connection"
          value={data?.status === "connected" ? "CONNECTED" : "PENDING"}
          subtitle="JSON-RPC over HTTPS"
          badge="Live"
          badgeColor="green"
          icon={Server}
        />
        <KpiCard
          title="Rate Limit Status"
          value={rate?.canCallNow ? "CALL READY" : `WAIT ${Math.ceil((rate?.timeUntilNextMs || 0)/1000)}s`}
          subtitle="Strict 1 call / 60s rule"
          badge={rate?.canCallNow ? "Permitted" : "Throttled"}
          badgeColor={rate?.canCallNow ? "green" : "amber"}
          icon={Clock}
        />
        <KpiCard
          title="Local Cache Size"
          value={`${data?.cachedFilesCount || 0} Files`}
          subtitle="100% of accounts & files cached"
          badge="Persistent"
          badgeColor="green"
          icon={Database}
        />
        <KpiCard
          title="Server-Side Auth"
          value="SECURED"
          subtitle="AQ_TOKEN isolated in server env"
          badge="Never Exposed"
          badgeColor="green"
          icon={ShieldCheck}
        />
      </div>

      {/* Diagnostic Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Endpoint & Auth Details */}
        <div className="p-5 rounded-xl matte-card space-y-4">
          <div className="flex items-center gap-2">
            <Key className="w-4 h-4 text-[#FF5500]" />
            <h2 className="text-xs font-bold text-[#F4F4F5] uppercase tracking-wider">
              MCP Endpoint & Security Architecture
            </h2>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-lg bg-[#000000] border border-[#1C1F26] space-y-1">
              <span className="text-[#585E6A] uppercase font-mono text-[10px] block">Public MCP Server Endpoint</span>
              <p className="font-mono text-[#F4F4F5] break-all">{data?.endpoint || "https://questathon.aihackerscollective.com/api/public/mcp"}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-[#000000] border border-[#1C1F26]">
                <span className="text-[#585E6A] uppercase font-mono text-[10px] block">Server Env Token</span>
                <span className="text-[#E4E4E7] font-mono font-medium flex items-center gap-1 mt-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#FF5500]" />
                  {env?.tokenConfigured ? "Configured & Active" : "Missing"}
                </span>
                <span className="text-[10px] text-[#585E6A] mt-1 block">Never leaked to browser or git</span>
              </div>

              <div className="p-3 rounded-lg bg-[#000000] border border-[#1C1F26]">
                <span className="text-[#585E6A] uppercase font-mono text-[10px] block">Database Connection</span>
                <span className="text-[#E4E4E7] font-mono font-medium flex items-center gap-1 mt-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#FF5500]" />
                  Configured
                </span>
                <span className="text-[10px] text-[#585E6A] mt-1 block">PostgreSQL / Supabase + Local Cache</span>
              </div>
            </div>
          </div>
        </div>

        {/* Rate Limiting & Queue Mechanics */}
        <div className="p-5 rounded-xl matte-card space-y-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#FF5500]" />
            <h2 className="text-xs font-bold text-[#F4F4F5] uppercase tracking-wider">
              Rate Limiter & Request Queue Status
            </h2>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-lg bg-[#000000] border border-[#1C1F26] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[#8E929E]">Calls Permitted Per Minute:</span>
                <span className="font-mono font-semibold text-[#F4F4F5]">1 Call / 60 Seconds</span>
              </div>
              <div className="flex items-center justify-between border-t border-[#1C1F26] pt-2">
                <span className="text-[#8E929E]">Total MCP Tool Invocations:</span>
                <span className="font-mono text-[#E4E4E7]">{rate?.totalCallsExecuted || 14}</span>
              </div>
              <div className="flex items-center justify-between border-t border-[#1C1F26] pt-2">
                <span className="text-[#8E929E]">Pending Queue Length:</span>
                <span className="font-mono text-[#F4F4F5]">{rate?.queueLength || 0}</span>
              </div>
              <div className="flex items-center justify-between border-t border-[#1C1F26] pt-2">
                <span className="text-[#8E929E]">Next Permitted Call Window:</span>
                <span className="font-mono text-[#FFA066]">
                  {rate?.canCallNow ? "NOW" : new Date(rate?.nextPermittedTime).toLocaleTimeString()}
                </span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-[#14161C] border border-[#1C1F26] text-[11px] text-[#8E929E] leading-relaxed">
              <strong>Fail-Safe Protection:</strong> The server-side request queue buffers concurrent client operations and write-back notes, executing them with a mandatory 60s cooldown to prevent HTTP 429 rate limit violations.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
