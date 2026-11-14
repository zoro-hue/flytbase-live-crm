import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { DynamicIslandNavbar } from "@/components/layout/DynamicIslandNavbar";
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
      <body className={`${inter.variable} font-sans bg-[#08090B] text-[#F4F4F5] min-h-screen antialiased`}>
        {/* Apple Dynamic Island Inspired Floating Top Navbar */}
        <DynamicIslandNavbar />

        {/* Minimal Pitch-Dark Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="lg:pl-64 pt-16 min-h-screen flex flex-col">
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-8">
            {children}
          </main>
          <footer className="py-6 px-8 border-t border-[#272C34] text-xs text-[#666D78] flex flex-wrap items-center justify-between gap-4">
            <div>
              FlytBase Live CRM • Built for the Questathon Challenge • Real MCP JSON-RPC Server Integration
            </div>
            <div className="flex items-center gap-4 font-mono text-[11px]">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Rate Limiter: 1 Call / 60s
              </span>
              <span>Server-Side Token Protected</span>
            </div>
          </footer>
        </div>

        {/* Global Evidence Traceability Drawer */}
        <EvidenceDrawer />

        {/* Global Note Write-Back Modal */}
        <NoteModal />
      </body>
    </html>
  );
}
