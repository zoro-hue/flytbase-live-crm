"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "./Sidebar";
import { SectionTransition } from "./SectionTransition";
import { EvidenceDrawer } from "@/components/evidence/EvidenceDrawer";
import { NoteModal } from "@/components/notes/NoteModal";

interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const pathname = usePathname();
  const isLandingPage = pathname === "/";

  // Public Landing Page — Full-width canvas without dashboard sidebar
  if (isLandingPage) {
    return (
      <div className="min-h-screen bg-[#000000] text-[#F4F4F5] flex flex-col">
        {children}
      </div>
    );
  }

  // Authenticated / Live Enterprise CRM Shell
  return (
    <>
      {/* Floating Slim Capsule Sidebar */}
      <Sidebar />

      {/* Main CRM Content Area */}
      <div className="lg:pl-56 pt-14 lg:pt-3 min-h-screen flex flex-col">
        <main className="flex-1 p-3.5 sm:p-5 lg:p-7 max-w-7xl w-full mx-auto space-y-6">
          <SectionTransition>
            {children}
          </SectionTransition>
        </main>

        <footer className="py-5 px-6 border-t border-[#1C1F26] text-xs text-[#606570] flex flex-wrap items-center justify-between gap-4 bg-[#000000]">
          <div>
            FlytBase Live CRM • Questathon Challenge • Direct MCP JSON-RPC Server Architecture
          </div>
          <div className="flex items-center gap-4 font-mono text-[11px]">
            <span className="flex items-center gap-1.5 text-[#FF5500]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5500] animate-pulse" />
              Rate Limiter: 1 Call / 60s
            </span>
            <span className="text-[#808590]">Server-Side Token Protected</span>
          </div>
        </footer>
      </div>

      {/* Global Evidence Traceability Drawer */}
      <EvidenceDrawer />

      {/* Global Note Write-Back Modal */}
      <NoteModal />
    </>
  );
};
