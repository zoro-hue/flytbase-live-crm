"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  Layers,
  Users,
  CheckSquare,
  Radio,
  FileSearch,
  Settings,
  RefreshCw,
  PlusCircle,
  Building2,
  Clock,
} from "lucide-react";

interface SyncStatus {
  canCallNow: boolean;
  timeUntilNextMs: number;
  lastSync: string | null;
  status: string;
}

export const DynamicIslandNavbar: React.FC = () => {
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

  const navLinks = [
    { href: "/", label: "Overview", icon: Layers },
    { href: "/accounts/eastern-counties", label: "Eastern Counties", icon: Building2 },
    { href: "/accounts/aldermoor", label: "Aldermoor", icon: Building2 },
    { href: "/deals", label: "Deals", icon: Activity },
    { href: "/stakeholders", label: "People", icon: Users },
    { href: "/actions", label: "Actions", icon: CheckSquare },
    { href: "/signals", label: "Signals", icon: Radio },
    { href: "/evidence", label: "Evidence", icon: FileSearch },
    { href: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <header className="fixed top-3 left-0 right-0 z-40 flex justify-center pointer-events-none px-3">
      {/* Dynamic Island Capsule Container */}
      <nav className="pointer-events-auto h-11 px-3.5 rounded-full bg-[#111419]/90 backdrop-blur-md border border-[#272C34] shadow-lg shadow-black/40 flex items-center gap-2 max-w-5xl transition-all duration-200">
        {/* Brand Capsule */}
        <Link
          href="/"
          className="flex items-center gap-1.5 pr-2.5 border-r border-[#272C34] hover:opacity-90 transition-opacity"
        >
          <div className="w-5 h-5 rounded-full bg-crm-orange flex items-center justify-center text-white text-[10px] font-bold">
            F
          </div>
          <span className="text-xs font-semibold tracking-tight text-crm-text hidden sm:inline">
            FlytBase <span className="text-crm-orange">Live CRM</span>
          </span>
        </Link>

        {/* Navigation Items */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${
                  isActive
                    ? "text-crm-text bg-[#1B1F25]"
                    : "text-crm-secondary hover:text-crm-text hover:bg-crm-card/50"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-crm-orange" : "text-crm-muted"}`} />
                <span className="hidden md:inline">{item.label}</span>
                {isActive && (
                  <span className="w-1 h-1 rounded-full bg-crm-orange absolute -bottom-0.5 left-1/2 -translate-x-1/2" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Live MCP Connection & Sync Status Indicator */}
        <div className="flex items-center gap-2 pl-2 border-l border-[#272C34]">
          <div className="flex items-center gap-1.5 text-[11px] text-crm-secondary" title={syncStatus.canCallNow ? "MCP Connected - Call Ready" : `Rate limited (1 call/min) - Ready in ${countdown}s`}>
            <span
              className={`w-2 h-2 rounded-full ${
                syncStatus.canCallNow ? "bg-emerald-500 animate-pulse" : "bg-amber-500"
              }`}
            />
            <span className="font-mono text-[10px] hidden lg:inline">
              {syncStatus.canCallNow ? "MCP READY" : `WAIT ${countdown}s`}
            </span>
          </div>

          {/* Note write button */}
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("open-note-modal"))}
            title="Create Note via MCP write_note"
            className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-crm-orange/15 hover:bg-crm-orange/25 text-crm-orange border border-crm-orange/30 text-xs font-medium transition-colors"
          >
            <PlusCircle className="w-3 h-3" />
            <span className="hidden xl:inline text-[11px]">Note</span>
          </button>

          {/* Sync refresh button */}
          <button
            onClick={handleManualSync}
            disabled={!syncStatus.canCallNow || syncing}
            title={syncStatus.canCallNow ? "Sync live MCP signals now" : `Rate limit active: ${countdown}s remaining`}
            className={`p-1 rounded-full text-crm-secondary hover:text-crm-text transition-colors ${
              !syncStatus.canCallNow || syncing ? "opacity-30 cursor-not-allowed" : "hover:bg-crm-card"
            }`}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${syncing ? "animate-spin text-crm-orange" : ""}`} />
          </button>
        </div>
      </nav>
    </header>
  );
};
