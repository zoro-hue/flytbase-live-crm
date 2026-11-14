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

  // Public Landing Page — Full-width canvas with light theme
  if (isLandingPage) {
    return (
      <div className="min-h-screen bg-[#F4F5F0] text-[#151515] flex flex-col">
        {children}
      </div>
    );
  }

  // Authenticated / Live Enterprise CRM Shell
  return (
    <div className="min-h-screen bg-[#F4F5F0] text-[#151515] flex flex-col relative selection:bg-[#536F00]/25 selection:text-[#151515]">
      {/* Floating Slim Capsule Sidebar */}
      <Sidebar />

      {/* Main CRM Content Area offset for floating sidebar on desktop */}
      <div className="lg:pl-20 min-h-screen flex flex-col flex-1">
        {/* Floating Top Navbar */}
        <TopNavbar
          onOpenAi={() => window.dispatchEvent(new CustomEvent("open-ai-assistant"))}
          onOpenSearch={() => window.dispatchEvent(new CustomEvent("open-global-search"))}
        />

        <main className="flex-1 px-3 sm:px-5 lg:px-7 max-w-7xl w-full mx-auto pb-28 space-y-6">
          <SectionTransition>
            {children}
          </SectionTransition>
        </main>

        <footer className="py-4 px-6 border-t border-[#E2E5DE] text-xs text-[#747A80] flex flex-wrap items-center justify-between gap-4 bg-[#ECEFE5] z-10">
          <div>
            FlytBase Live CRM • Questathon Challenge • Direct MCP JSON-RPC Server Architecture
          </div>
          <div className="flex items-center gap-4 font-mono text-[11px]">
            <span className="flex items-center gap-1.5 text-[#536F00]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#536F00] animate-pulse" />
              Rate Limiter: 1 Call / 60s
            </span>
            <span className="text-[#969BA1]">Server-Side Token Protected</span>
          </div>
        </footer>
      </div>

      {/* Floating Bottom Command Bar */}
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
