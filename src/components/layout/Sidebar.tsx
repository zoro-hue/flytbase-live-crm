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
  Bot,
  Layers,
} from "lucide-react";
import { FlytBaseLogo } from "@/components/brand/FlytBaseLogo";

interface NavItem {
  name: string;
  href: string;
  icon: any;
  badge?: string;
  badgeType?: "green" | "black" | "text";
}

interface NavGroup {
  group?: string;
  items: NavItem[];
}

const NAVIGATION_GROUPS: NavGroup[] = [
  {
    items: [
      { name: "Command Center", href: "/dashboard", icon: LayoutDashboard },
      { name: "Sales Pipeline", href: "/deals", icon: Briefcase },
      {
        name: "Counties (A)",
        href: "/accounts/eastern-counties",
        icon: Building2,
        badge: "Police",
        badgeType: "text",
      },
      {
        name: "Aldermoor (B)",
        href: "/accounts/aldermoor",
        icon: Building2,
        badge: "Industrial",
        badgeType: "text",
      },
    ],
  },
  {
    group: "OPERATIONS",
    items: [
      { name: "Action Plan", href: "/actions", icon: CheckSquare, badge: "3", badgeType: "green" },
      { name: "Live Signals", href: "/signals", icon: Radio, badge: "3", badgeType: "black" },
    ],
  },
  {
    group: "RELATIONSHIPS",
    items: [
      { name: "Stakeholders", href: "/stakeholders", icon: Users2 },
      { name: "Evidence Vault", href: "/evidence", icon: FileSearch },
      { name: "Settings", href: "/settings", icon: Settings },
    ],
  },
];

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // Normalize current pathname to guarantee exact single-route active match
  const cleanPath = pathname ? pathname.split("?")[0].split("#")[0] : "";

  return (
    <>
      {/* Floating Expandable Sidebar for Desktop (Warm Translucent Light Glass) */}
      <aside
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        className={`hidden lg:flex fixed left-3 top-3 bottom-3 z-50 select-none flex-col justify-between p-2.5 rounded-2xl bg-[#ECEFE5]/90 backdrop-blur-md border border-[#E2E5DE] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] shadow-[0_4px_24px_rgba(0,0,0,0.04)] ${
          isExpanded ? "w-60" : "w-16"
        }`}
      >
        {/* Top: Brand Header (FlytBase Brand Asset) */}
        <div className="space-y-2 pb-2.5 border-b border-[#E2E5DE]">
          <Link
            href="/dashboard"
            className="flex items-center gap-2.5 px-1 py-1 rounded-xl hover:bg-black/5 transition-colors overflow-hidden group cursor-pointer"
            title="FlytBase CRM"
          >
            {isExpanded ? (
              <FlytBaseLogo variant="horizontal" size={28} priority />
            ) : (
              <FlytBaseLogo variant="icon" size={32} priority />
            )}
          </Link>
        </div>

        {/* Center: Navigation Items Grouped by Domain */}
        <nav className="flex-1 py-2 space-y-3 overflow-y-auto no-scrollbar">
          {NAVIGATION_GROUPS.map((grp, gIdx) => (
            <div key={gIdx} className="space-y-1">
              {grp.group && isExpanded && (
                <div className="px-3 pt-1 pb-0.5 text-[10px] font-mono uppercase tracking-wider text-[#969BA1] font-semibold">
                  {grp.group}
                </div>
              )}

              {grp.items.map((item) => {
                const Icon = item.icon;
                const isActive = cleanPath === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`group relative flex items-center justify-between px-2.5 py-2 rounded-xl text-[14px] font-medium cursor-pointer select-none transition-all duration-150 ${
                      isActive
                        ? "bg-white text-[#151515] font-semibold shadow-sm border border-[#E2E5DE]"
                        : "text-[#747A80] hover:text-[#151515] hover:bg-black/5 border border-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0 pointer-events-none">
                      <div className="relative flex-shrink-0">
                        <Icon
                          className={`w-4 h-4 transition-colors duration-150 ${
                            isActive ? "text-[#151515]" : "text-[#747A80] group-hover:text-[#151515]"
                          }`}
                        />
                      </div>

                      {/* Label (Visible when expanded) */}
                      {isExpanded && (
                        <span className="truncate whitespace-nowrap transition-opacity duration-300">
                          {item.name}
                        </span>
                      )}
                    </div>

                    {/* Notification & Context Badges */}
                    {isExpanded && item.badge && (
                      <div className="pointer-events-none pl-1 flex-shrink-0">
                        {item.badgeType === "green" ? (
                          <span className="w-5 h-5 rounded-full bg-[#536F00] text-white text-[10px] font-bold flex items-center justify-center">
                            {item.badge}
                          </span>
                        ) : item.badgeType === "black" ? (
                          <span className="w-5 h-5 rounded-full bg-[#171717] text-white text-[10px] font-bold flex items-center justify-center">
                            {item.badge}
                          </span>
                        ) : (
                          <span className="px-1.5 py-0.2 rounded-md bg-[#ECEFE5] text-[#536F00] text-[10px] font-mono border border-[#E2E5DE]">
                            {item.badge}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Tooltip when collapsed */}
                    {!isExpanded && (
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-white border border-[#E2E5DE] shadow-xl text-[12px] font-medium text-[#151515] whitespace-nowrap z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      >
                        {item.name}
                        {item.badge && (
                          <span className="ml-1.5 text-[10px] font-mono text-[#536F00]">
                            ({item.badge})
                          </span>
                        )}
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Bottom: Ask FlytBase Quick Trigger Button (Matching Screenshot) */}
        <div className="pt-2 border-t border-[#E2E5DE] space-y-1">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent("open-ai-assistant"))}
            className={`w-full flex items-center justify-center gap-2 rounded-xl bg-[#171717] hover:bg-[#2A2A2A] text-white text-xs font-semibold shadow-sm transition-all duration-200 cursor-pointer active:scale-95 ${
              isExpanded ? "px-3 py-2" : "p-2"
            }`}
            title="Ask FlytBase AI Copilot"
          >
            <Sparkles className="w-4 h-4 text-[#789600] flex-shrink-0 pointer-events-none" />
            {isExpanded && <span className="truncate pointer-events-none">Ask FlytBase</span>}
          </button>
        </div>
      </aside>

      {/* Mobile Sticky Top Header */}
      <header className="lg:hidden sticky top-2 left-2 right-2 z-40 px-2 mb-3">
        <div className="h-11 px-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-[#E2E5DE] flex items-center justify-between shadow-sm">
          <Link href="/dashboard" className="flex items-center gap-2">
            <FlytBaseLogo variant="horizontal" size={24} priority />
          </Link>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent("open-ai-assistant"))}
              className="px-2 py-0.5 rounded-full bg-[#ECEFE5] border border-[#E2E5DE] text-[10px] text-[#536F00] font-semibold flex items-center gap-1 active:scale-95"
            >
              <Sparkles className="w-2.5 h-2.5" />
              <span>AI</span>
            </button>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent("open-note-modal"))}
              className="px-2.5 py-0.5 rounded-full bg-[#171717] text-white text-[10px] font-medium active:scale-95"
            >
              + Note
            </button>
            <Link
              href="/signals"
              className="px-2 py-0.5 rounded-full bg-[#ECEFE5] border border-[#E2E5DE] text-[10px] text-[#151515]"
            >
              Signals
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};
