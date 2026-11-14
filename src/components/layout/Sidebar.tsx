"use client";

import React, { useState, useEffect } from "react";
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
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const navigation = [
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

  return (
    <>
      {/* Floating Expandable Sidebar for Desktop (Icon-First + Expandable Mode, 450–550ms smooth transition) */}
      <aside
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        className={`hidden lg:flex fixed left-3 top-3 bottom-3 z-40 select-none flex-col justify-between p-2.5 rounded-2xl glass-panel transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isExpanded ? "w-56" : "w-16"
        }`}
      >
        {/* Top: Brand Header */}
        <div className="space-y-2 pb-2.5 border-b border-[#25282D]">
          <Link
            href="/dashboard"
            className="flex items-center gap-2.5 px-1 py-1 rounded-xl hover:bg-[#141619] transition-colors overflow-hidden"
          >
            <div className="w-8 h-8 rounded-xl bg-[#FF5A00] flex items-center justify-center font-bold text-white text-xs shadow-md shadow-[#FF5A00]/25 flex-shrink-0">
              FB
            </div>
            {isExpanded && (
              <div className="flex flex-col min-w-0 transition-opacity duration-200">
                <span className="text-xs font-bold tracking-tight text-[#F4F4F5] truncate">
                  FlytBase <span className="text-[#FF5A00]">CRM</span>
                </span>
                <span className="text-[9px] text-[#606570] font-mono tracking-wider uppercase">
                  Live Engine
                </span>
              </div>
            )}
          </Link>
        </div>

        {/* Center: Navigation Items */}
        <nav className="flex-1 py-2 space-y-1 overflow-y-auto no-scrollbar">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            const isHovered = hoveredItem === item.href;

            return (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => setHoveredItem(item.href)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <Link
                  href={item.href}
                  className={`relative flex items-center gap-3 px-2.5 py-2 rounded-xl text-xs font-medium transition-all duration-350 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isActive
                      ? "bg-[#141619] text-[#F4F4F5] border border-[#25282D] shadow-sm"
                      : "text-[#9A9FA8] hover:text-[#F4F4F5] hover:bg-[#141619]/60 border border-transparent"
                  }`}
                >
                  {/* Restrained active indicator */}
                  {isActive && (
                    <span className="w-1 h-3.5 rounded-full bg-[#FF5A00] absolute left-1 transition-all duration-350" />
                  )}

                  <div className="relative flex-shrink-0">
                    <Icon
                      className={`w-4 h-4 transition-colors duration-300 ${
                        isActive ? "text-[#FF5A00]" : "text-[#71717A]"
                      }`}
                    />
                    {item.highlight && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A00] absolute -top-0.5 -right-0.5 animate-pulse" />
                    )}
                  </div>

                  {/* Label (Visible when expanded) */}
                  {isExpanded && (
                    <span className="truncate whitespace-nowrap transition-opacity duration-350 ease-[cubic-bezier(0.22,1,0.36,1)]">
                      {item.name}
                    </span>
                  )}
                </Link>

                {/* Elegant Tooltip when collapsed (250–350ms smooth appearance) */}
                {!isExpanded && isHovered && (
                  <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-[#0D0F12] border border-[#25282D] shadow-2xl text-[11px] font-medium text-white whitespace-nowrap z-50 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] pointer-events-none">
                    {item.name}
                    {item.badge && (
                      <span className="ml-1.5 text-[9px] font-mono text-[#FF5A00]">
                        ({item.badge})
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Bottom: Note Action Button */}
        <div className="pt-2 border-t border-[#25282D] space-y-1">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("open-note-modal"))}
            className={`w-full flex items-center justify-center gap-2 rounded-xl bg-[#FF5A00] hover:bg-[#E04F00] text-white text-xs font-semibold shadow-md shadow-[#FF5A00]/20 transition-all cursor-pointer active:scale-95 ${
              isExpanded ? "px-3 py-2" : "p-2"
            }`}
            title="Write Note to MCP Server"
          >
            <PlusCircle className="w-4 h-4 flex-shrink-0" />
            {isExpanded && <span className="truncate">Write Note</span>}
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
              onClick={() => window.dispatchEvent(new CustomEvent("open-ai-assistant"))}
              className="px-2 py-0.5 rounded-full bg-[#141619] border border-[#25282D] text-[10px] text-[#FF5A00] font-semibold flex items-center gap-1"
            >
              <Sparkles className="w-2.5 h-2.5" />
              <span>AI</span>
            </button>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("open-note-modal"))}
              className="px-2.5 py-0.5 rounded-full bg-[#FF5A00] text-white text-[10px] font-medium"
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
