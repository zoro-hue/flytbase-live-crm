"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  Search,
  Sparkles,
  Plus,
  Bell,
  ChevronDown,
  Building2,
  Check,
  Radio,
  Clock,
  ShieldCheck,
  Command,
} from "lucide-react";

interface TopNavbarProps {
  onOpenAi?: () => void;
  onOpenSearch?: () => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({ onOpenAi, onOpenSearch }) => {
  const router = useRouter();
  const pathname = usePathname();

  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [syncStatus, setSyncStatus] = useState({
    canCallNow: true,
    timeUntilNextMs: 0,
    status: "connected",
  });
  const [countdown, setCountdown] = useState(0);

  // Poll sync status
  const fetchStatus = () => {
    fetch("/api/sync")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.connection) {
          const rate = data.connection.rateLimit;
          setSyncStatus({
            canCallNow: rate.canCallNow,
            timeUntilNextMs: rate.timeUntilNextMs,
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

  // Determine current active account name
  const currentAccountLabel = pathname.includes("eastern-counties")
    ? "Eastern Counties (A)"
    : pathname.includes("aldermoor")
    ? "Aldermoor Industrial (B)"
    : "All Accounts";

  const handleSelectAccount = (href: string) => {
    setAccountDropdownOpen(false);
    router.push(href);
  };

  return (
    <header className="sticky top-3 z-40 w-full px-3 sm:px-4 mb-4 select-none">
      <div className="max-w-7xl mx-auto h-13 px-3 sm:px-4 rounded-2xl glass-panel flex items-center justify-between gap-3 shadow-2xl">
        {/* Left: Brand & Context Account Dropdown */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <Link href="/dashboard" className="flex items-center gap-2 group">
            <div className="w-7 h-7 rounded-lg bg-[#FF5A00] flex items-center justify-center font-bold text-white text-[11px] shadow-sm shadow-[#FF5A00]/30 transition-transform group-hover:scale-105">
              FB
            </div>
            <span className="hidden sm:inline-block text-xs font-bold tracking-tight text-[#F4F4F5]">
              FlytBase <span className="text-[#FF5A00]">CRM</span>
            </span>
          </Link>

          <span className="text-[#25282D]">/</span>

          {/* Account Context Dropdown Selector (Inspired by Northwind Studio selector) */}
          <div className="relative">
            <button
              onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[#141619] border border-[#25282D] hover:border-[#363A42] text-xs font-medium text-[#F4F4F5] transition-all cursor-pointer"
            >
              <Building2 className="w-3.5 h-3.5 text-[#FF5A00]" />
              <span className="max-w-[130px] sm:max-w-[180px] truncate">{currentAccountLabel}</span>
              <ChevronDown className={`w-3 h-3 text-[#9A9FA8] transition-transform ${accountDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {accountDropdownOpen && (
              <div className="absolute left-0 mt-1.5 w-56 rounded-xl bg-[#0D0F12] border border-[#25282D] p-1.5 shadow-2xl z-50 dropdown-enter">
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#606570] px-2.5 py-1">
                  Target Enterprise Accounts
                </div>
                <button
                  onClick={() => handleSelectAccount("/dashboard")}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    pathname === "/dashboard"
                      ? "bg-[#141619] text-[#FF5A00]"
                      : "text-[#9A9FA8] hover:text-[#F4F4F5] hover:bg-[#141619]/60"
                  }`}
                >
                  <span>All Accounts Overview</span>
                  {pathname === "/dashboard" && <Check className="w-3.5 h-3.5 text-[#FF5A00]" />}
                </button>
                <button
                  onClick={() => handleSelectAccount("/accounts/eastern-counties")}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    pathname.includes("eastern-counties")
                      ? "bg-[#141619] text-[#FF5A00]"
                      : "text-[#9A9FA8] hover:text-[#F4F4F5] hover:bg-[#141619]/60"
                  }`}
                >
                  <div className="text-left">
                    <span className="block text-[#F4F4F5]">Eastern Counties Police</span>
                    <span className="text-[10px] text-[#606570] font-mono">Account A • 35 Docks</span>
                  </div>
                  {pathname.includes("eastern-counties") && <Check className="w-3.5 h-3.5 text-[#FF5A00]" />}
                </button>
                <button
                  onClick={() => handleSelectAccount("/accounts/aldermoor")}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    pathname.includes("aldermoor")
                      ? "bg-[#141619] text-[#FF5A00]"
                      : "text-[#9A9FA8] hover:text-[#F4F4F5] hover:bg-[#141619]/60"
                  }`}
                >
                  <div className="text-left">
                    <span className="block text-[#F4F4F5]">Aldermoor Industrial</span>
                    <span className="text-[10px] text-[#606570] font-mono">Account B • 14 Docks</span>
                  </div>
                  {pathname.includes("aldermoor") && <Check className="w-3.5 h-3.5 text-[#FF5A00]" />}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Center: Global Search Bar with Keyboard Hint (Ctrl K) */}
        <div className="hidden md:flex flex-1 max-w-md mx-2">
          <button
            onClick={onOpenSearch || (() => window.dispatchEvent(new CustomEvent("open-global-search")))}
            className="w-full flex items-center justify-between px-3 py-1.5 rounded-xl bg-[#050505] border border-[#25282D] hover:border-[#363A42] text-xs text-[#9A9FA8] transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-[#606570] group-hover:text-[#FF5A00] transition-colors" />
              <span>Search accounts, deals, signals, evidence...</span>
            </div>
            <kbd className="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-mono bg-[#141619] border border-[#25282D] text-[#606570]">
              <Command className="w-2.5 h-2.5" /> K
            </kbd>
          </button>
        </div>

        {/* Right: Actions, MCP Status, Notifications & Avatar */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Ask AI Action Pill */}
          <button
            onClick={onOpenAi || (() => window.dispatchEvent(new CustomEvent("open-ai-assistant")))}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#141619] hover:bg-[#1C1F25] border border-[#FF5A00]/30 hover:border-[#FF5A00]/60 text-xs font-semibold text-[#F4F4F5] transition-all cursor-pointer shadow-sm active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FF5A00]" />
            <span className="hidden sm:inline">Ask AI</span>
          </button>

          {/* + Note Action */}
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("open-note-modal"))}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-[#FF5A00] hover:bg-[#E04F00] text-xs font-semibold text-white transition-all cursor-pointer shadow-sm shadow-[#FF5A00]/25 active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Note</span>
          </button>

          {/* MCP Rate-Limit Gateway Badge */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[#050505] border border-[#25282D] text-[10px] font-mono">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                syncStatus.canCallNow ? "bg-[#FF5A00] animate-pulse" : "bg-[#606570]"
              }`}
            />
            <span className="text-[#D4D4D8]">
              {syncStatus.canCallNow ? "MCP READY" : `${countdown}s`}
            </span>
          </div>

          {/* Notifications Bell with Live Signals Indicator */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="p-2 rounded-xl bg-[#141619] border border-[#25282D] hover:border-[#363A42] text-[#9A9FA8] hover:text-[#F4F4F5] transition-colors relative cursor-pointer"
              title="3 Live Signals Active"
            >
              <Bell className="w-3.5 h-3.5" />
              <span className="w-2 h-2 rounded-full bg-[#FF5A00] absolute top-1 right-1 animate-pulse" />
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-[#0D0F12] border border-[#25282D] p-3 shadow-2xl z-50 space-y-2 dropdown-enter">
                <div className="flex items-center justify-between border-b border-[#25282D] pb-2">
                  <span className="text-xs font-bold text-white">Live Field Signals</span>
                  <span className="text-[10px] font-mono text-[#FF5A00]">3 Active Events</span>
                </div>
                <div className="space-y-2 text-xs">
                  <Link
                    href="/signals"
                    onClick={() => setNotificationsOpen(false)}
                    className="block p-2 rounded-lg bg-[#141619] hover:bg-[#1B1F25] transition-colors"
                  >
                    <span className="font-mono text-[#FF5A00] font-bold text-[10px] block">[EVENT-A]</span>
                    <span className="text-white font-medium block">Aldermoor Inactivity Detected</span>
                    <span className="text-[10px] text-[#606570]">3 docks stopped flying 2–29 Nov</span>
                  </Link>
                  <Link
                    href="/signals"
                    onClick={() => setNotificationsOpen(false)}
                    className="block p-2 rounded-lg bg-[#141619] hover:bg-[#1B1F25] transition-colors"
                  >
                    <span className="font-mono text-[#FF5A00] font-bold text-[10px] block">[EVENT-B]</span>
                    <span className="text-white font-medium block">Unanswered VIP Ticket FB-10488</span>
                    <span className="text-[10px] text-[#606570]">Karen Mbeki VIP flyover 5 Dec</span>
                  </Link>
                  <Link
                    href="/signals"
                    onClick={() => setNotificationsOpen(false)}
                    className="block p-2 rounded-lg bg-[#141619] hover:bg-[#1B1F25] transition-colors"
                  >
                    <span className="font-mono text-[#FF5A00] font-bold text-[10px] block">[EVENT-C]</span>
                    <span className="text-white font-medium block">Rhys Calder Departure Notice</span>
                    <span className="text-[10px] text-[#606570]">Leaving Jan for drone manufacturer</span>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Avatar */}
          <div className="w-7 h-7 rounded-full bg-[#141619] border border-[#25282D] flex items-center justify-center font-mono text-xs font-bold text-[#FF5A00]" title="Authenticated CSM Lead">
            FB
          </div>
        </div>
      </div>
    </header>
  );
};
