"use client";

import React from "react";
import Link from "next/link";
import {
  Search,
  Sparkles,
  ArrowRight,
  Radio,
  Command,
  CheckSquare,
} from "lucide-react";

interface BottomCommandBarProps {
  onOpenAi?: () => void;
  onOpenSearch?: () => void;
}

export const BottomCommandBar: React.FC<BottomCommandBarProps> = ({
  onOpenAi,
  onOpenSearch,
}) => {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 select-none px-3 w-full max-w-2xl">
      <div className="h-12 px-3 sm:px-4 rounded-full glass-pill flex items-center justify-between gap-2.5 shadow-2xl">
        {/* Search / Jump Input Pill */}
        <button
          onClick={onOpenSearch || (() => window.dispatchEvent(new CustomEvent("open-global-search")))}
          className="flex-1 flex items-center gap-2 text-left text-xs text-[#9A9FA8] hover:text-[#F4F4F5] transition-colors cursor-pointer min-w-0"
        >
          <Search className="w-3.5 h-3.5 text-[#606570] flex-shrink-0" />
          <span className="truncate">Jump to account, deal, contact, evidence...</span>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded text-[10px] font-mono bg-[#0D0F12] border border-[#25282D] text-[#606570]">
            <Command className="w-2.5 h-2.5" /> K
          </kbd>
        </button>

        {/* Action Controls Group */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          {/* Ask AI Action */}
          <button
            onClick={onOpenAi || (() => window.dispatchEvent(new CustomEvent("open-ai-assistant")))}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#141619] hover:bg-[#1D2024] border border-[#25282D] hover:border-[#FF5A00]/40 text-xs font-semibold text-[#F4F4F5] transition-all cursor-pointer active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FF5A00]" />
            <span className="hidden sm:inline">Ask AI</span>
          </button>

          {/* Review Pending Actions Pill (As seen in reference screenshot: Review 6 ->) */}
          <Link
            href="/actions"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#050505] hover:bg-[#141619] border border-[#25282D] hover:border-[#FF5A00]/40 text-xs font-semibold text-white transition-all shadow-sm active:scale-95"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A00] animate-pulse" />
            <span>Review Actions</span>
            <span className="px-1.5 py-0.2 rounded-full bg-[#141619] text-[10px] font-mono text-[#FF5A00] border border-[#25282D]">
              3
            </span>
            <ArrowRight className="w-3 h-3 text-[#9A9FA8]" />
          </Link>
        </div>
      </div>
    </div>
  );
};
