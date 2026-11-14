"use client";

import React from "react";
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
  ExternalLink,
  ShieldAlert,
} from "lucide-react";

export const Sidebar: React.FC = () => {
  const pathname = usePathname();

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
    <aside className="hidden lg:flex w-64 flex-col fixed inset-y-0 left-0 bg-[#101216] border-r border-[#272C34] z-30 select-none">
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-6 border-b border-[#272C34]">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded bg-[#FF762E] flex items-center justify-center font-bold text-white text-xs">
            FB
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-tight text-[#F4F4F5] leading-tight">
              FlytBase CRM
            </span>
            <span className="text-[10px] text-[#9298A2] tracking-wider uppercase font-mono">
              Questathon Live
            </span>
          </div>
        </Link>
      </div>

      {/* Account Switcher Shortcut */}
      <div className="px-4 py-3 border-b border-[#272C34]/60 bg-[#08090B]/40">
        <span className="text-[10px] font-mono uppercase tracking-wider text-[#666D78] block mb-1.5 px-2">
          Target Accounts
        </span>
        <div className="grid grid-cols-2 gap-1.5">
          <Link
            href="/accounts/eastern-counties"
            className={`px-2.5 py-1.5 rounded text-xs font-medium text-left truncate transition-colors ${
              pathname === "/accounts/eastern-counties"
                ? "bg-[#1B1F25] text-[#FF762E] border border-[#FF762E]/30"
                : "text-[#9298A2] hover:text-[#F4F4F5] hover:bg-[#15181D]"
            }`}
          >
            Eastern Counties
          </Link>
          <Link
            href="/accounts/aldermoor"
            className={`px-2.5 py-1.5 rounded text-xs font-medium text-left truncate transition-colors ${
              pathname === "/accounts/aldermoor"
                ? "bg-[#1B1F25] text-[#FF762E] border border-[#FF762E]/30"
                : "text-[#9298A2] hover:text-[#F4F4F5] hover:bg-[#15181D]"
            }`}
          >
            Aldermoor
          </Link>
        </div>
      </div>

      {/* Nav List */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium transition-all ${
                isActive
                  ? "bg-[#15181D] text-[#F4F4F5] border-l-2 border-[#FF762E]"
                  : "text-[#9298A2] hover:text-[#F4F4F5] hover:bg-[#15181D]/60"
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
              {item.badge && (
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#1B1F25] text-[#666D78]">
                  {item.badge}
                </span>
              )}
              {item.highlight && (
                <span className="w-2 h-2 rounded-full bg-[#EF4444]" title="Active live signals detected" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Write Note Action & MCP Status */}
      <div className="p-4 border-t border-[#272C34] space-y-3 bg-[#08090B]/60">
        <button
          onClick={() => window.dispatchEvent(new CustomEvent("open-note-modal"))}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded bg-[#FF762E] hover:bg-[#E6631F] text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>Write MCP Note</span>
        </button>

        <div className="p-2.5 rounded bg-[#15181D] border border-[#272C34] text-[11px] space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[#666D78]">MCP Endpoint</span>
            <span className="text-emerald-400 font-mono text-[10px]">CONNECTED</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#666D78]">Rate Limit</span>
            <span className="text-[#9298A2] font-mono text-[10px]">1 req / 60s</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
