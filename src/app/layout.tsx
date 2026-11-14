import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { SectionTransition } from "@/components/layout/SectionTransition";
import { EvidenceDrawer } from "@/components/evidence/EvidenceDrawer";
import { NoteModal } from "@/components/notes/NoteModal";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FlytBase Live CRM — Questathon Challenge",
  description:
    "Production-ready live CRM connected to the Questathon MCP server, providing evidence-backed account intelligence for Eastern Counties Police Alliance and Aldermoor Industrial Group.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans bg-[#000000] text-[#F4F4F5] min-h-screen antialiased selection:bg-[#FF5500]/30 selection:text-white`}>
        {/* Floating Slim Capsule Sidebar (Stable across all section navigations) */}
        <Sidebar />

        {/* Main Content Area */}
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

        {/* Global Evidence Traceability Drawer (Stable across all sections) */}
        <EvidenceDrawer />

        {/* Global Note Write-Back Modal (Stable across all sections) */}
        <NoteModal />
      </body>
    </html>
  );
}
