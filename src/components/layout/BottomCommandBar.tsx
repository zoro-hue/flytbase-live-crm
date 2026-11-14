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
      <div className="h-12 px-3 sm:px-4 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-between gap-2.5 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-[#E2E5DE] hover:border-[#D5DAD0] transition-colors duration-300">
        {/* Global Search Shortcut Icon Button (Ctrl + K) */}
        <button
          type="button"
          onClick={
            onOpenSearch ||
            (() => window.dispatchEvent(new CustomEvent("open-global-search")))
          }
          className="p-1.5 rounded-full hover:bg-[#F4F5F0] text-[#747A80] hover:text-[#151515] transition-colors cursor-pointer flex-shrink-0"
          title="Open Global Search (Ctrl + K)"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* Inline AI Quick Query Form ("Jump to a contact, deal, page...") */}
        <form onSubmit={handleSubmit} className="flex-1 flex items-center gap-2 min-w-0">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Jump to a contact, deal, page..."
            className="flex-1 bg-transparent border-none text-xs text-[#151515] placeholder-[#747A80] focus:outline-none min-w-0"
          />

          {query.trim() && (
            <button
              type="submit"
              className="p-1 rounded-full bg-[#536F00] text-white hover:bg-[#435900] transition-colors flex-shrink-0 cursor-pointer shadow-sm"
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
              className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-mono bg-[#F4F5F0] border border-[#E2E5DE] text-[#747A80] cursor-pointer hover:border-[#D5DAD0] hover:text-[#151515] transition-colors"
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
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-[#F4F5F0] text-xs font-medium text-[#151515] transition-all duration-200 cursor-pointer active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#536F00]" />
            <span className="hidden sm:inline">Ask AI</span>
          </button>

          {/* Review Pending Actions Pill (Reference: Review 6 ->) */}
          <Link
            href="/actions"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#171717] hover:bg-[#252525] text-xs font-medium text-white transition-all duration-200 shadow-sm active:scale-95"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#789600]" />
            <span>Review</span>
            <span className="w-4 h-4 rounded-full bg-[#303030] flex items-center justify-center text-[10px] font-semibold text-white">
              6
            </span>
            <ArrowRight className="w-3 h-3 text-[#A0A0A0]" />
          </Link>
        </div>
      </div>
    </div>
  );
};
