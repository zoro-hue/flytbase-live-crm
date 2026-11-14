"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  Briefcase,
  Users2,
  CheckSquare,
  Radio,
  FileSearch,
  Settings,
  PlusCircle,
  RefreshCw,
  Clock,
  Sparkles,
} from "lucide-react";

interface SyncStatus {
  canCallNow: boolean;
  timeUntilNextMs: number;
  lastSync: string | null;
  status: string;
}

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const [syncStatus, setSyncStatus] = useState<SyncStatus>({
    canCallNow: true,
    timeUntilNextMs: 0,
    lastSync: null,
    status: "connected",
  });
  const [syncing, setSyncing] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const fetchStatus = () => {
    fetch("/api/sync")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.connection) {
          const rate = data.connection.rateLimit;
          setSyncStatus({
            canCallNow: rate.canCallNow,
            timeUntilNextMs: rate.timeUntilNextMs,
            lastSync: data.connection.lastSync,
            status: data.connection.status,
          });
          setCountdown(Math.ceil(rate.timeUntilNextMs / 1000));
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 15000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          fetchStatus();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const handleManualSync = async () => {
    if (!syncStatus.canCallNow || syncing) return;
    setSyncing(true);
    try {
      const res = await fetch("/api/sync", { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Rate limit active");
      } else {
        fetchStatus();
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSyncing(false);
    }
  };

  const navigation = [
    { name: "Overview", href: "/", icon: LayoutDashboard },
    {
      name: "Eastern Counties",
      href: "/accounts/eastern-counties",
      icon: Building2,
      badge: "Account A",
    },
    {
      name: "Aldermoor",
      href: "/accounts/aldermoor",
      icon: Building2,
      badge: "Account B",
    },
    { name: "Deals Pipeline", href: "/deals", icon: Briefcase },
    { name: "Stakeholders", href: "/stakeholders", icon: Users2 },
    { name: "Action Plan", href: "/actions", icon: CheckSquare },
    { name: "Live Signals", href: "/signals", icon: Radio, highlight: true },
    { name: "Evidence & Sources", href: "/evidence", icon: FileSearch },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <>
      {/* Floating Capsule Sidebar for Desktop */}
      <aside className="hidden lg:flex fixed left-4 top-4 bottom-4 w-64 z-40 select-none flex-col justify-between p-3.5 rounded-3xl bg-[#111419]/90 backdrop-blur-md border border-[#272C34] shadow-2xl shadow-black/60 transition-all duration-200">
        {/* Brand & Connection Capsule Header */}
        <div className="space-y-3 pb-3 border-b border-[#272C34]/80">
          <Link href="/" className="flex items-center justify-between px-2 py-1 hover:opacity-90 transition-opacity">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#FF762E] flex items-center justify-center font-bold text-white text-xs shadow-sm">
                FB
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold tracking-tight text-[#F4F4F5]">
                  FlytBase <span className="text-[#FF762E]">CRM</span>
                </span>
                <span className="text-[10px] text-[#9298A2] tracking-wider uppercase font-mono">
                  Questathon Live
                </span>
              </div>
            </div>

            {/* Sync Refresh Trigger */}
            <button
              onClick={handleManualSync}
              disabled={!syncStatus.canCallNow || syncing}
              title={syncStatus.canCallNow ? "Sync live MCP signals now" : `Rate limit active: ${countdown}s remaining`}
              className={`p-1.5 rounded-full text-[#9298A2] hover:text-[#F4F4F5] transition-colors ${
                !syncStatus.canCallNow || syncing ? "opacity-30 cursor-not-allowed" : "hover:bg-[#1B1F25]"
              }`}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${syncing ? "animate-spin text-[#FF762E]" : ""}`} />
            </button>
          </Link>

          {/* Live Dynamic Island MCP Status Pill */}
          <div
            className="flex items-center justify-between px-3 py-1.5 rounded-full bg-[#15181D] border border-[#272C34] text-[11px]"
            title={syncStatus.canCallNow ? "MCP Connected - Call Ready" : `Rate limited (1 call/min) - Ready in ${countdown}s`}
          >
            <div className="flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full ${
                  syncStatus.canCallNow ? "bg-emerald-500 animate-pulse" : "bg-amber-500"
                }`}
              />
              <span className="font-mono text-[10px] text-[#F4F4F5]">
                {syncStatus.canCallNow ? "MCP READY" : `WAIT ${countdown}s`}
              </span>
            </div>
            <span className="text-[10px] font-mono text-[#666D78]">1 req/60s</span>
          </div>

          {/* Quick Target Accounts Pills */}
          <div className="grid grid-cols-2 gap-1.5 pt-1">
            <Link
              href="/accounts/eastern-counties"
              className={`px-2 py-1 rounded-xl text-[11px] font-medium text-center truncate transition-colors ${
                pathname === "/accounts/eastern-counties"
                  ? "bg-[#1B1F25] text-[#FF762E] border border-[#FF762E]/30"
                  : "text-[#9298A2] hover:text-[#F4F4F5] bg-[#15181D]/60 hover:bg-[#15181D]"
              }`}
            >
              Counties (A)
            </Link>
            <Link
              href="/accounts/aldermoor"
              className={`px-2 py-1 rounded-xl text-[11px] font-medium text-center truncate transition-colors ${
                pathname === "/accounts/aldermoor"
                  ? "bg-[#1B1F25] text-[#FF762E] border border-[#FF762E]/30"
                  : "text-[#9298A2] hover:text-[#F4F4F5] bg-[#15181D]/60 hover:bg-[#15181D]"
              }`}
            >
              Aldermoor (B)
            </Link>
          </div>
        </div>

        {/* Scrollable Nav Items */}
        <nav className="flex-1 py-3 space-y-1 overflow-y-auto no-scrollbar">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? "bg-[#1B1F25] text-[#F4F4F5] border border-[#FF762E]/30"
                    : "text-[#9298A2] hover:text-[#F4F4F5] hover:bg-[#15181D]/80"
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <Icon
                    className={`w-4 h-4 flex-shrink-0 ${
                      isActive ? "text-[#FF762E]" : "text-[#666D78]"
                    }`}
                  />
                  <span className="truncate">{item.name}</span>
                </div>
                {item.highlight && (
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" title="Live signals" />
                )}
                {isActive && (
                  <span className="w-1 h-3 rounded-full bg-[#FF762E] absolute left-1" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Capsule Actions */}
        <div className="pt-3 border-t border-[#272C34]/80 space-y-2">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("open-note-modal"))}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-2xl bg-[#FF762E] hover:bg-[#E6631F] text-white text-xs font-semibold shadow-md transition-colors cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Write MCP Note</span>
          </button>

          <div className="text-center">
            <span className="text-[10px] font-mono text-[#666D78]">
              Server Auth: Active
            </span>
          </div>
        </div>
      </aside>

      {/* Mobile Top Capsule Header */}
      <header className="lg:hidden fixed top-3 left-3 right-3 z-40">
        <div className="h-12 px-4 rounded-full bg-[#111419]/90 backdrop-blur-md border border-[#272C34] shadow-lg flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#FF762E] flex items-center justify-center font-bold text-white text-[10px]">
              FB
            </div>
            <span className="text-xs font-bold text-[#F4F4F5]">FlytBase Live CRM</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("open-note-modal"))}
              className="px-2.5 py-1 rounded-full bg-[#FF762E] text-white text-[11px] font-medium"
            >
              + Note
            </button>
            <Link
              href="/signals"
              className="px-2.5 py-1 rounded-full bg-[#15181D] border border-[#272C34] text-[11px] text-[#F4F4F5]"
            >
              Signals
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};
