"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  Sparkles,
  ArrowRight,
  Command,
  Send,
  Bot,
} from "lucide-react";

interface BottomCommandBarProps {
  onOpenAi?: () => void;
  onOpenSearch?: () => void;
}

export const BottomCommandBar: React.FC<BottomCommandBarProps> = ({
  onOpenAi,
  onOpenSearch,
}) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    window.dispatchEvent(
      new CustomEvent("open-ai-assistant", {
        detail: { query: query.trim() },
      })
    );
    setQuery("");
  };

  return (
    <div
      className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-40 select-none px-3 w-full transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isFocused ? "max-w-3xl" : "max-w-2xl"
      }`}
    >
      <div className="h-12 px-3 sm:px-4 rounded-full glass-pill flex items-center justify-between gap-2.5 shadow-2xl border border-[#25282D] hover:border-[#383D45] transition-colors duration-350">
        {/* Global Search Shortcut Icon Button (Ctrl + K) */}
        <button
          type="button"
          onClick={
            onOpenSearch ||
            (() => window.dispatchEvent(new CustomEvent("open-global-search")))
          }
          className="p-1.5 rounded-full hover:bg-[#141619] text-[#9A9FA8] hover:text-[#FF5A00] transition-colors cursor-pointer flex-shrink-0"
          title="Open Global Search (Ctrl + K)"
        >
          <Search className="w-3.5 h-3.5" />
        </button>

        {/* Inline AI Quick Query Form ("Ask anything about your accounts...") */}
        <form onSubmit={handleSubmit} className="flex-1 flex items-center gap-2 min-w-0">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Ask anything about your accounts, deals, signals, or risks..."
            className="flex-1 bg-transparent border-none text-xs text-[#F4F4F5] placeholder-[#606570] focus:outline-none min-w-0"
          />

          {query.trim() && (
            <button
              type="submit"
              className="p-1 rounded-full bg-[#FF5A00] text-white hover:bg-[#E04F00] transition-colors flex-shrink-0 cursor-pointer"
            >
              <Send className="w-3 h-3" />
            </button>
          )}

          {!query && (
            <kbd
              onClick={
                onOpenSearch ||
                (() => window.dispatchEvent(new CustomEvent("open-global-search")))
              }
              className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-mono bg-[#0D0F12] border border-[#25282D] text-[#606570] cursor-pointer hover:border-[#606570] hover:text-[#9A9FA8] transition-colors"
            >
              <Command className="w-2.5 h-2.5" /> K
            </kbd>
          )}
        </form>

        {/* Action Controls Group */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          {/* Ask AI Trigger Button */}
          <button
            type="button"
            onClick={
              onOpenAi ||
              (() => window.dispatchEvent(new CustomEvent("open-ai-assistant")))
            }
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#141619] hover:bg-[#1D2024] border border-[#25282D] hover:border-[#FF5A00]/50 text-xs font-semibold text-[#F4F4F5] transition-all duration-380 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer active:scale-95 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FF5A00]" />
            <span className="hidden sm:inline">Ask AI</span>
          </button>

          {/* Review Pending Actions Pill (As seen in Reference Screenshot: Review 6 ->) */}
          <Link
            href="/actions"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#050505] hover:bg-[#141619] border border-[#25282D] hover:border-[#FF5A00]/50 text-xs font-semibold text-white transition-all duration-380 ease-[cubic-bezier(0.22,1,0.36,1)] shadow-sm active:scale-95"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A00] animate-pulse" />
            <span className="hidden sm:inline">Review</span>
            <span>Actions</span>
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
