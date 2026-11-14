"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "./Sidebar";
import { TopNavbar } from "./TopNavbar";
import { BottomCommandBar } from "./BottomCommandBar";
import { SectionTransition } from "./SectionTransition";
import { AiAssistantModal } from "@/components/ai/AiAssistantModal";
import { CommandPalette } from "@/components/layout/CommandPalette";
import { EvidenceDrawer } from "@/components/evidence/EvidenceDrawer";
import { NoteModal } from "@/components/notes/NoteModal";

interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const pathname = usePathname();
  const isLandingPage = pathname === "/";

  // Public Landing Page — Full-width canvas without dashboard chrome
  if (isLandingPage) {
    return (
      <div className="min-h-screen bg-[#000000] text-[#F4F4F5] flex flex-col">
        {children}
      </div>
    );
  }

  // Authenticated / Live Enterprise CRM Shell
  return (
    <div className="min-h-screen bg-[#050505] text-[#F4F4F5] flex flex-col relative selection:bg-[#FF5A00]/30 selection:text-white">
      {/* Floating Slim Capsule Sidebar */}
      <Sidebar />

      {/* Main CRM Content Area offset for floating sidebar on desktop */}
      <div className="lg:pl-20 min-h-screen flex flex-col flex-1">
        {/* Floating Top Navbar */}
        <TopNavbar
          onOpenAi={() => window.dispatchEvent(new CustomEvent("open-ai-assistant"))}
          onOpenSearch={() => window.dispatchEvent(new CustomEvent("open-global-search"))}
        />

        <main className="flex-1 px-3 sm:px-5 lg:px-7 max-w-7xl w-full mx-auto pb-24 space-y-6">
          <SectionTransition>
            {children}
          </SectionTransition>
        </main>

        <footer className="py-4 px-6 border-t border-[#1C1F26] text-xs text-[#606570] flex flex-wrap items-center justify-between gap-4 bg-[#050505] z-10">
          <div>
            FlytBase Live CRM • Questathon Challenge • Direct MCP JSON-RPC Server Architecture
          </div>
          <div className="flex items-center gap-4 font-mono text-[11px]">
            <span className="flex items-center gap-1.5 text-[#FF5A00]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A00] animate-pulse" />
              Rate Limiter: 1 Call / 60s
            </span>
            <span className="text-[#808590]">Server-Side Token Protected</span>
          </div>
        </footer>
      </div>

      {/* Floating Bottom Command Bar (Screenshot Inspired: Search + Ask AI + Review Actions) */}
      <BottomCommandBar
        onOpenAi={() => window.dispatchEvent(new CustomEvent("open-ai-assistant"))}
        onOpenSearch={() => window.dispatchEvent(new CustomEvent("open-global-search"))}
      />

      {/* Floating Animated AI Character & Modal (Bottom Left FlytBot) */}
      <AiAssistantModal />

      {/* Global Command Palette (Ctrl K) */}
      <CommandPalette />

      {/* Global Evidence Traceability Drawer */}
      <EvidenceDrawer />

      {/* Global Note Write-Back Modal */}
      <NoteModal />
    </div>
  );
};
