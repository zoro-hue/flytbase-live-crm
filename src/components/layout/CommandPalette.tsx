"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  X,
  Command,
  Building2,
  Briefcase,
  Users2,
  CheckSquare,
  Radio,
  FileSearch,
  Settings,
  ArrowRight,
  Sparkles,
} from "lucide-react";

interface SearchItem {
  id: string;
  category: "Navigation" | "Accounts" | "Deals" | "Signals" | "Actions";
  title: string;
  subtitle: string;
  href: string;
  icon: any;
  badge?: string;
}

const SEARCH_ITEMS: SearchItem[] = [
  {
    id: "nav-dash",
    category: "Navigation",
    title: "Executive Command Center",
    subtitle: "Portfolio overview, KPIs, and multi-track radar",
    href: "/dashboard",
    icon: Command,
  },
  {
    id: "acc-a",
    category: "Accounts",
    title: "Eastern Counties Police Alliance (A)",
    subtitle: "35 docks, 4 forces, £1.5M framework tender in prep",
    href: "/accounts/eastern-counties",
    icon: Building2,
    badge: "Police",
  },
  {
    id: "acc-b",
    category: "Accounts",
    title: "Aldermoor Industrial Group (B)",
    subtitle: "14 docks, 15 plants, Event A inactivity & VIP flyover",
    href: "/accounts/aldermoor",
    icon: Building2,
    badge: "Industrial",
  },
  {
    id: "deal-framework",
    category: "Deals",
    title: "£1,500,000 National Framework Spec",
    subtitle: "Eastern Counties 300-dock consortium agreement",
    href: "/deals",
    icon: Briefcase,
    badge: "Confirmed",
  },
  {
    id: "deal-tarn",
    category: "Deals",
    title: "£285k Tarn Valley Expansion",
    subtitle: "Blocked on FB-10412 DPIA sign-off from Ewan Brooks",
    href: "/deals",
    icon: Briefcase,
    badge: "At Risk",
  },
  {
    id: "deal-vip",
    category: "Deals",
    title: "€320k Chemical Corridor Expansion",
    subtitle: "Ticket FB-10488 VIP flyover scheduled for 5 Dec",
    href: "/deals",
    icon: Briefcase,
    badge: "In Play",
  },
  {
    id: "sig-plants",
    category: "Signals",
    title: "Event A: Zero Flights on Plants 4, 8, 12",
    subtitle: "3 chemical production docks idle between 2–29 Nov",
    href: "/signals",
    icon: Radio,
    badge: "Critical",
  },
  {
    id: "sig-vip",
    category: "Signals",
    title: "Event B: VIP Flyover Request FB-10488",
    subtitle: "Karen Mbeki requested 5 Dec demonstration",
    href: "/signals",
    icon: Radio,
    badge: "Urgent",
  },
  {
    id: "sig-rhys",
    category: "Signals",
    title: "Event C: Rhys Calder Departure (Jan 2027)",
    subtitle: "Sole flight systems architect leaving Aldermoor",
    href: "/signals",
    icon: Radio,
    badge: "High",
  },
  {
    id: "action-dpia",
    category: "Actions",
    title: "Unblock FB-10412 DPIA Grounding",
    subtitle: "Deliver thermal hashing verification to DPO Ewan Brooks",
    href: "/actions",
    icon: CheckSquare,
    badge: "Top 1",
  },
  {
    id: "action-flyover",
    category: "Actions",
    title: "Dispatch Field Ops for 5 Dec VIP Flyover",
    subtitle: "Verify dock telemetry and resolve safety trips",
    href: "/actions",
    icon: CheckSquare,
    badge: "Top 2",
  },
  {
    id: "action-roi",
    category: "Actions",
    title: "Audit Stefan Roy's €1.2M ROI Claim",
    subtitle: "Reconcile spreadsheet against finance guard contracts",
    href: "/actions",
    icon: CheckSquare,
    badge: "Top 3",
  },
  {
    id: "evidence-all",
    category: "Navigation",
    title: "Evidence Vault",
    subtitle: "Trace source records, CSVs, tickets, and flight logs",
    href: "/evidence",
    icon: FileSearch,
  },
];

export const CommandPalette: React.FC = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  // Keyboard shortcut Ctrl+K or Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    const handleCustomOpen = () => setIsOpen(true);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-global-search", handleCustomOpen);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-global-search", handleCustomOpen);
    };
  }, []);

  if (!isOpen) return null;

  const filteredItems = query.trim()
    ? SEARCH_ITEMS.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
      )
    : SEARCH_ITEMS;

  const handleSelect = (href: string) => {
    setIsOpen(false);
    setQuery("");
    router.push(href);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/25 backdrop-blur-sm transition-opacity duration-300">
      <div
        className="w-full max-w-xl rounded-2xl bg-white border border-[#E2E5DE] shadow-[0_20px_50px_rgba(0,0,0,0.12)] overflow-hidden flex flex-col max-h-[75vh] transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-3.5 border-b border-[#E2E5DE] flex items-center gap-3 bg-[#F4F5F0]">
          <Search className="w-4 h-4 text-[#536F00] flex-shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search accounts, deals, signals, actions, evidence..."
            className="flex-1 bg-transparent border-none text-sm text-[#151515] placeholder-[#747A80] focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-xs text-[#747A80] hover:text-[#151515]"
            >
              Clear
            </button>
          )}
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 rounded-lg hover:bg-[#E2E5DE] text-[#747A80] hover:text-[#151515] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-3.5 py-2 border-b border-[#E2E5DE] bg-white flex items-center gap-2 overflow-x-auto text-[11px] font-mono">
          <span className="text-[#747A80]">Filter:</span>
          {["Accounts", "Deals", "Signals", "Actions"].map((cat) => (
            <button
              key={cat}
              onClick={() => setQuery(cat)}
              className="px-2 py-0.5 rounded-full bg-[#F4F5F0] hover:bg-[#ECEFE5] border border-[#E2E5DE] text-[#747A80] hover:text-[#151515] transition-colors"
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1 bg-white">
          {filteredItems.length === 0 ? (
            <div className="py-8 text-center text-xs text-[#747A80]">
              No results found for &ldquo;{query}&rdquo;
            </div>
          ) : (
            filteredItems.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item.href)}
                  className="p-2.5 rounded-xl hover:bg-[#F4F5F0] border border-transparent hover:border-[#E2E5DE] flex items-center justify-between gap-3 cursor-pointer group transition-all"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-7 h-7 rounded-lg bg-[#F4F5F0] border border-[#E2E5DE] flex items-center justify-center flex-shrink-0 group-hover:border-[#536F00]/50 transition-colors">
                      <Icon className="w-3.5 h-3.5 text-[#747A80] group-hover:text-[#536F00] transition-colors" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-[#151515] truncate">
                          {item.title}
                        </span>
                        {item.badge && (
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-[#ECEFE5] text-[#536F00] border border-[#D5DAD0]">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-[#747A80] truncate mt-0.5">
                        {item.subtitle}
                      </div>
                    </div>
                  </div>

                  <ArrowRight className="w-3.5 h-3.5 text-[#969BA1] group-hover:text-[#536F00] -translate-x-1 group-hover:translate-x-0 transition-all flex-shrink-0" />
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-2.5 border-t border-[#E2E5DE] bg-[#F4F5F0] text-[10px] font-mono text-[#747A80] flex items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="px-1 py-0.5 rounded bg-white border border-[#E2E5DE] text-[#151515]">↑↓</kbd> navigate
            </span>
            <span>
              <kbd className="px-1 py-0.5 rounded bg-white border border-[#E2E5DE] text-[#151515]">esc</kbd> close
            </span>
          </div>
          <div className="flex items-center gap-1 text-[#536F00]">
            <Sparkles className="w-3 h-3" />
            <span>FlytBase Instant Jump</span>
          </div>
        </div>
      </div>
    </div>
  );
};
