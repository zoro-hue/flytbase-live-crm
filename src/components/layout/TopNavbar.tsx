"use client";

import React, { useState, useEffect, useRef } from "react";
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
  Moon,
  ChevronsUpDown,
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
  const accountRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  // Click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) {
        setAccountDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotificationsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
    : "FlytBase CRM";

  const handleSelectAccount = (href: string) => {
    setAccountDropdownOpen(false);
    router.push(href);
  };

  return (
    <header className="sticky top-3 z-30 w-full px-3 sm:px-4 mb-4 select-none">
      <div className="max-w-7xl mx-auto h-13 px-3 sm:px-4 rounded-2xl bg-white/90 backdrop-blur-md border border-[#E2E5DE] flex items-center justify-between gap-3 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
        {/* Left: Brand / Workspace Selector (Matching Reference: FB FlytBase CRM ⬍) */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <div ref={accountRef} className="relative">
            <button
              onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-[#F4F5F0] hover:bg-[#ECEFE5] border border-[#E2E5DE] text-xs font-semibold text-[#151515] transition-all cursor-pointer"
            >
              <div className="w-5 h-5 rounded-md bg-[#171717] flex items-center justify-center font-bold text-white text-[9px]">
                FB
              </div>
              <span className="max-w-[130px] sm:max-w-[180px] truncate">{currentAccountLabel}</span>
              <ChevronsUpDown className="w-3.5 h-3.5 text-[#747A80]" />
            </button>

            {accountDropdownOpen && (
              <div className="absolute left-0 mt-1.5 w-60 rounded-xl bg-white border border-[#E2E5DE] p-1.5 shadow-xl z-50 dropdown-enter">
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#969BA1] px-2.5 py-1 font-semibold">
                  Target Enterprise Accounts
                </div>
                <button
                  onClick={() => handleSelectAccount("/dashboard")}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    pathname === "/dashboard"
                      ? "bg-[#ECEFE5] text-[#536F00] font-semibold"
                      : "text-[#747A80] hover:text-[#151515] hover:bg-[#F4F5F0]"
                  }`}
                >
                  <span>All Accounts Overview</span>
                  {pathname === "/dashboard" && <Check className="w-3.5 h-3.5 text-[#536F00]" />}
                </button>
                <button
                  onClick={() => handleSelectAccount("/accounts/eastern-counties")}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    pathname.includes("eastern-counties")
                      ? "bg-[#ECEFE5] text-[#536F00] font-semibold"
                      : "text-[#747A80] hover:text-[#151515] hover:bg-[#F4F5F0]"
                  }`}
                >
                  <div className="text-left">
                    <span className="block text-[#151515]">Eastern Counties Police</span>
                    <span className="text-[10px] text-[#747A80] font-mono">Account A • 35 Docks</span>
                  </div>
                  {pathname.includes("eastern-counties") && <Check className="w-3.5 h-3.5 text-[#536F00]" />}
                </button>
                <button
                  onClick={() => handleSelectAccount("/accounts/aldermoor")}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    pathname.includes("aldermoor")
                      ? "bg-[#ECEFE5] text-[#536F00] font-semibold"
                      : "text-[#747A80] hover:text-[#151515] hover:bg-[#F4F5F0]"
                  }`}
                >
                  <div className="text-left">
                    <span className="block text-[#151515]">Aldermoor Industrial</span>
                    <span className="text-[10px] text-[#747A80] font-mono">Account B • 14 Docks</span>
                  </div>
                  {pathname.includes("aldermoor") && <Check className="w-3.5 h-3.5 text-[#536F00]" />}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Center: Global Search Bar with Keyboard Hint (Ctrl K) */}
        <div className="hidden md:flex flex-1 max-w-md mx-2">
          <button
            onClick={onOpenSearch || (() => window.dispatchEvent(new CustomEvent("open-global-search")))}
            className="w-full flex items-center justify-between px-3 py-1.5 rounded-xl bg-[#F4F5F0] border border-[#E2E5DE] hover:border-[#D0D5CC] text-xs text-[#747A80] hover:text-[#151515] transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-[#747A80] group-hover:text-[#536F00] transition-colors" />
              <span>Search contacts, deals, calls...</span>
            </div>
            <kbd className="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-mono bg-white border border-[#E2E5DE] text-[#747A80]">
              <Command className="w-2.5 h-2.5" /> K
            </kbd>
          </button>
        </div>

        {/* Right: Green Ask AI, Dark Create Button, Theme Control, Notifications & Avatar */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Green Ask AI Button (Matching Reference) */}
          <button
            onClick={onOpenAi || (() => window.dispatchEvent(new CustomEvent("open-ai-assistant")))}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#536F00] hover:bg-[#435900] text-xs font-semibold text-white transition-all cursor-pointer shadow-sm active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Ask AI</span>
          </button>

          {/* Dark Create / Note Button (Matching Reference: + Create) */}
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("open-note-modal"))}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#171717] hover:bg-[#2A2A2A] text-xs font-semibold text-white transition-all cursor-pointer shadow-sm active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Create</span>
          </button>

          {/* Theme Control Button (Moon icon from reference) */}
          <button
            type="button"
            className="p-2 rounded-xl bg-[#F4F5F0] hover:bg-[#ECEFE5] border border-[#E2E5DE] text-[#747A80] hover:text-[#151515] transition-colors cursor-pointer"
            title="Theme Control"
          >
            <Moon className="w-3.5 h-3.5" />
          </button>

          {/* Notifications Bell with Indicator */}
          <div ref={notifRef} className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="p-2 rounded-xl bg-[#F4F5F0] hover:bg-[#ECEFE5] border border-[#E2E5DE] text-[#747A80] hover:text-[#151515] transition-colors relative cursor-pointer"
              title="3 Live Signals Active"
            >
              <Bell className="w-3.5 h-3.5" />
              <span className="w-2 h-2 rounded-full bg-[#E34B3D] absolute top-1.5 right-1.5" />
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-white border border-[#E2E5DE] p-3 shadow-xl z-50 space-y-2 dropdown-enter">
                <div className="flex items-center justify-between border-b border-[#E2E5DE] pb-2">
                  <span className="text-xs font-bold text-[#151515]">Live Field Signals</span>
                  <span className="text-[10px] font-mono text-[#536F00] font-semibold">3 Active Events</span>
                </div>
                <div className="space-y-2 text-xs">
                  <Link
                    href="/signals"
                    onClick={() => setNotificationsOpen(false)}
                    className="block p-2 rounded-lg bg-[#F4F5F0] hover:bg-[#ECEFE5] transition-colors"
                  >
                    <span className="font-mono text-[#E34B3D] font-bold text-[10px] block">[EVENT-A]</span>
                    <span className="text-[#151515] font-medium block">Aldermoor Inactivity Detected</span>
                    <span className="text-[10px] text-[#747A80]">3 docks stopped flying 2–29 Nov</span>
                  </Link>
                  <Link
                    href="/signals"
                    onClick={() => setNotificationsOpen(false)}
                    className="block p-2 rounded-lg bg-[#F4F5F0] hover:bg-[#ECEFE5] transition-colors"
                  >
                    <span className="font-mono text-[#C78620] font-bold text-[10px] block">[EVENT-B]</span>
                    <span className="text-[#151515] font-medium block">Unanswered VIP Ticket FB-10488</span>
                    <span className="text-[10px] text-[#747A80]">Karen Mbeki VIP flyover 5 Dec</span>
                  </Link>
                  <Link
                    href="/signals"
                    onClick={() => setNotificationsOpen(false)}
                    className="block p-2 rounded-lg bg-[#F4F5F0] hover:bg-[#ECEFE5] transition-colors"
                  >
                    <span className="font-mono text-[#747A80] font-bold text-[10px] block">[EVENT-C]</span>
                    <span className="text-[#151515] font-medium block">Rhys Calder Departure Notice</span>
                    <span className="text-[10px] text-[#747A80]">Leaving Jan for drone manufacturer</span>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Avatar */}
          <div
            className="w-7 h-7 rounded-full bg-[#ECEFE5] border border-[#E2E5DE] flex items-center justify-center font-mono text-xs font-bold text-[#151515]"
            title="Authenticated CSM Lead"
          >
            FB
          </div>
        </div>
      </div>
    </header>
  );
};
