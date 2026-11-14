"use client";

import React, { useState } from "react";
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
  Sparkles,
} from "lucide-react";

interface NavItem {
  name: string;
  href: string;
  icon: any;
  badge?: string;
  highlight?: boolean;
}

const NAVIGATION: NavItem[] = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  {
    name: "Counties (A)",
    href: "/accounts/eastern-counties",
    icon: Building2,
    badge: "Police",
  },
  {
    name: "Aldermoor (B)",
    href: "/accounts/aldermoor",
    icon: Building2,
    badge: "Industrial",
  },
  { name: "Deals Pipeline", href: "/deals", icon: Briefcase },
  { name: "Stakeholders", href: "/stakeholders", icon: Users2 },
  { name: "Action Plan", href: "/actions", icon: CheckSquare },
  { name: "Live Signals", href: "/signals", icon: Radio, highlight: true },
  { name: "Evidence Vault", href: "/evidence", icon: FileSearch },
  { name: "Settings", href: "/settings", icon: Settings },
];

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // Normalize current pathname to guarantee exact, single-route active match
  const cleanPath = pathname ? pathname.split("?")[0].split("#")[0] : "";

  return (
    <>
      {/* Floating Expandable Sidebar for Desktop (Icon-First + Expandable Mode) */}
      <aside
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        className={`hidden lg:flex fixed left-3 top-3 bottom-3 z-50 select-none flex-col justify-between p-2.5 rounded-2xl glass-panel transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] shadow-2xl ${
          isExpanded ? "w-56" : "w-16"
        }`}
      >
        {/* Top: Brand Header */}
        <div className="space-y-2 pb-2.5 border-b border-[#25282D]">
          <Link
            href="/dashboard"
            className="flex items-center gap-2.5 px-1 py-1 rounded-xl hover:bg-[#141619] transition-colors overflow-hidden group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-[#FF5A00] flex items-center justify-center font-bold text-white text-xs shadow-md shadow-[#FF5A00]/25 flex-shrink-0 group-hover:scale-105 transition-transform duration-200">
              FB
            </div>
            {isExpanded && (
              <div className="flex flex-col min-w-0 transition-opacity duration-300">
                <span className="text-xs font-bold tracking-tight text-[#F4F4F5] truncate">
                  FlytBase <span className="text-[#FF5A00]">CRM</span>
                </span>
                <span className="text-[9px] text-[#606570] font-mono tracking-wider uppercase truncate">
                  Live Engine
                </span>
              </div>
            )}
          </Link>
        </div>

        {/* Center: Navigation Items */}
        <nav className="flex-1 py-2 space-y-1 overflow-y-auto no-scrollbar">
          {NAVIGATION.map((item) => {
            const Icon = item.icon;
            const isActive = cleanPath === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`group relative flex items-center gap-3 px-2.5 py-2 rounded-xl text-xs font-medium cursor-pointer select-none ${
                  isActive
                    ? "bg-[#16181D] text-white border border-[#FF5A00]/50 shadow-sm"
                    : "text-[#9A9FA8] hover:text-white hover:bg-[#141619] border border-transparent transition-colors duration-150"
                }`}
              >
                {/* Active Indicator Bar (pointer-events-none prevents event interception) */}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="w-1 h-3.5 rounded-full bg-[#FF5A00] absolute left-1 pointer-events-none"
                  />
                )}

                <div className="relative flex-shrink-0 pointer-events-none">
                  <Icon
                    className={`w-4 h-4 transition-colors duration-150 ${
                      isActive ? "text-[#FF5A00]" : "text-[#71717A] group-hover:text-white"
                    }`}
                  />
                  {item.highlight && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A00] absolute -top-0.5 -right-0.5 animate-pulse pointer-events-none" />
                  )}
                </div>

                {/* Label (Visible when expanded) */}
                {isExpanded && (
                  <span className="truncate whitespace-nowrap transition-opacity duration-300 pointer-events-none">
                    {item.name}
                  </span>
                )}

                {/* Elegant Tooltip when collapsed (CSS-driven hover, pointer-events-none guarantees zero click interception) */}
                {!isExpanded && (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-[#0D0F12] border border-[#25282D] shadow-2xl text-[11px] font-medium text-white whitespace-nowrap z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    {item.name}
                    {item.badge && (
                      <span className="ml-1.5 text-[9px] font-mono text-[#FF5A00]">
                        ({item.badge})
                      </span>
                    )}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom: Note Action Button */}
        <div className="pt-2 border-t border-[#25282D] space-y-1">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent("open-note-modal"))}
            className={`w-full flex items-center justify-center gap-2 rounded-xl bg-[#FF5A00] hover:bg-[#E04F00] text-white text-xs font-semibold shadow-md shadow-[#FF5A00]/20 transition-all duration-200 cursor-pointer active:scale-95 ${
              isExpanded ? "px-3 py-2" : "p-2"
            }`}
            title="Write Note to MCP Server"
          >
            <PlusCircle className="w-4 h-4 flex-shrink-0 pointer-events-none" />
            {isExpanded && <span className="truncate pointer-events-none">Write Note</span>}
          </button>
        </div>
      </aside>

      {/* Mobile Sticky Top Header */}
      <header className="lg:hidden sticky top-2 left-2 right-2 z-40 px-2 mb-3">
        <div className="h-11 px-3.5 rounded-2xl glass-panel flex items-center justify-between shadow-lg">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-[#FF5A00] flex items-center justify-center font-bold text-white text-[9px]">
              FB
            </div>
            <span className="text-xs font-bold text-[#F4F4F5]">FlytBase CRM</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent("open-ai-assistant"))}
              className="px-2 py-0.5 rounded-full bg-[#141619] border border-[#25282D] text-[10px] text-[#FF5A00] font-semibold flex items-center gap-1 active:scale-95"
            >
              <Sparkles className="w-2.5 h-2.5" />
              <span>AI</span>
            </button>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent("open-note-modal"))}
              className="px-2.5 py-0.5 rounded-full bg-[#FF5A00] text-white text-[10px] font-medium active:scale-95"
            >
              + Note
            </button>
            <Link
              href="/signals"
              className="px-2 py-0.5 rounded-full bg-[#141619] border border-[#25282D] text-[10px] text-[#F4F4F5]"
            >
              Signals
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};
