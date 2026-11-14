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
        alert(data.error || "Rate limit active (1 req/60s)");
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
      name: "Counties (A)",
      href: "/accounts/eastern-counties",
      icon: Building2,
    },
    {
      name: "Aldermoor (B)",
      href: "/accounts/aldermoor",
      icon: Building2,
    },
    { name: "Deals Pipeline", href: "/deals", icon: Briefcase },
    { name: "Stakeholders", href: "/stakeholders", icon: Users2 },
    { name: "Action Plan", href: "/actions", icon: CheckSquare },
    { name: "Live Signals", href: "/signals", icon: Radio, highlight: true },
    { name: "Evidence Vault", href: "/evidence", icon: FileSearch },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <>
      {/* Floating Slim Capsule Sidebar for Desktop */}
      <aside className="hidden lg:flex fixed left-3 top-3 bottom-3 w-52 z-40 select-none flex-col justify-between p-3 rounded-2xl bg-[#08080A]/95 backdrop-blur-xl border border-[#1C1F26] shadow-2xl shadow-black/90 transition-all duration-300">
        {/* Brand & Connection Capsule Header */}
        <div className="space-y-2.5 pb-2.5 border-b border-[#1C1F26]">
          <Link href="/" className="flex items-center justify-between px-1.5 py-0.5 hover:opacity-90 transition-opacity">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#FF5500] flex items-center justify-center font-bold text-white text-[11px] shadow-lg shadow-[#FF5500]/20">
                FB
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold tracking-tight text-[#F4F4F5]">
                  FlytBase <span className="text-[#FF5500]">CRM</span>
                </span>
                <span className="text-[9px] text-[#71717A] tracking-wider uppercase font-mono">
                  Live Engine
                </span>
              </div>
            </div>

            {/* Sync Refresh Trigger */}
            <button
              onClick={handleManualSync}
              disabled={!syncStatus.canCallNow || syncing}
              title={syncStatus.canCallNow ? "Sync live MCP signals now" : `Rate limit active: ${countdown}s remaining`}
              className={`p-1 rounded-md text-[#71717A] hover:text-[#F4F4F5] transition-colors ${
                !syncStatus.canCallNow || syncing ? "opacity-30 cursor-not-allowed" : "hover:bg-[#121419]"
              }`}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${syncing ? "animate-spin text-[#FF5500]" : ""}`} />
            </button>
          </Link>

          {/* Rate-Limit & Connection Capsule */}
          <div className="px-2 py-1.5 rounded-lg bg-[#000000] border border-[#1C1F26] flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  syncStatus.canCallNow ? "bg-[#FF5500] animate-pulse" : "bg-neutral-600"
                }`}
              />
              <span className="font-mono text-[9px] text-[#D4D4D8]">
                {syncStatus.canCallNow ? "MCP READY" : `WAIT ${countdown}s`}
              </span>
            </div>
            <span className="text-[9px] font-mono text-[#71717A]">60s quota</span>
          </div>

          {/* Quick Target Accounts Pills */}
          <div className="grid grid-cols-2 gap-1 pt-0.5">
            <Link
              href="/accounts/eastern-counties"
              className={`px-1.5 py-1 rounded-lg text-[10px] font-medium text-center truncate transition-all duration-200 ${
                pathname === "/accounts/eastern-counties"
                  ? "bg-[#121419] text-[#FF5500] border border-[#FF5500]/30 shadow-sm"
                  : "text-[#71717A] hover:text-[#F4F4F5] bg-[#000000] hover:bg-[#121419]"
              }`}
            >
              Police (A)
            </Link>
            <Link
              href="/accounts/aldermoor"
              className={`px-1.5 py-1 rounded-lg text-[10px] font-medium text-center truncate transition-all duration-200 ${
                pathname === "/accounts/aldermoor"
                  ? "bg-[#121419] text-[#FF5500] border border-[#FF5500]/30 shadow-sm"
                  : "text-[#71717A] hover:text-[#F4F4F5] bg-[#000000] hover:bg-[#121419]"
              }`}
            >
              Aldermoor (B)
            </Link>
          </div>
        </div>

        {/* Scrollable Nav Items */}
        <nav className="flex-1 py-2 space-y-0.5 overflow-y-auto no-scrollbar">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-[#121419] text-[#F4F4F5] border border-[#FF5500]/35 shadow-sm"
                    : "text-[#8E929E] hover:text-[#F4F4F5] hover:bg-[#0E1014]"
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <Icon
                    className={`w-3.5 h-3.5 flex-shrink-0 transition-colors ${
                      isActive ? "text-[#FF5500]" : "text-[#585E6A]"
                    }`}
                  />
                  <span className="truncate">{item.name}</span>
                </div>
                {item.highlight && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF5500] animate-pulse" title="Live signals active" />
                )}
                {isActive && (
                  <span className="w-1 h-3 rounded-full bg-[#FF5500] absolute left-0.5" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Capsule Actions */}
        <div className="pt-2.5 border-t border-[#1C1F26] space-y-1.5">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("open-note-modal"))}
            className="w-full flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-xl bg-[#FF5500] hover:bg-[#E04B00] text-white text-[11px] font-semibold shadow-md shadow-[#FF5500]/15 transition-all duration-200 cursor-pointer active:scale-[0.98]"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Write MCP Note</span>
          </button>

          <div className="text-center">
            <span className="text-[9px] font-mono text-[#585E6A]">
              MCP Token: Authenticated
            </span>
          </div>
        </div>
      </aside>

      {/* Mobile Top Capsule Header */}
      <header className="lg:hidden fixed top-2.5 left-2.5 right-2.5 z-40">
        <div className="h-11 px-3.5 rounded-full bg-[#08080A]/95 backdrop-blur-xl border border-[#1C1F26] shadow-xl flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-[#FF5500] flex items-center justify-center font-bold text-white text-[9px]">
              FB
            </div>
            <span className="text-xs font-bold text-[#F4F4F5]">FlytBase Live CRM</span>
          </Link>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("open-note-modal"))}
              className="px-2 py-0.5 rounded-full bg-[#FF5500] text-white text-[10px] font-medium"
            >
              + Note
            </button>
            <Link
              href="/signals"
              className="px-2 py-0.5 rounded-full bg-[#0E1014] border border-[#1C1F26] text-[10px] text-[#F4F4F5]"
            >
              Signals
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};
