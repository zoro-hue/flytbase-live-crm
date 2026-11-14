import React from "react";
import { getAllEvidence } from "@/lib/data/provenance";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { FileSearch, FileText, CheckCircle2, ShieldCheck, Database } from "lucide-react";
import EvidenceClientPage from "./EvidenceClientPage";

export default function EvidencePage() {
  const allEvidence = getAllEvidence();

  const fileCount = allEvidence.filter((e) => e.sourceType === "file").length;
  const factCount = allEvidence.filter((e) => e.sourceType === "fact").length;
  const ticketCount = allEvidence.filter((e) => e.sourceType === "ticket").length;
  const callCount = allEvidence.filter((e) => e.sourceType === "call_note").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-[#E2E5DE] shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <FileSearch className="w-4 h-4 text-[#536F00]" />
            <span className="text-xs font-mono uppercase tracking-wider text-[#536F00] font-semibold">
              Evidence & Source Traceability System
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#151515] mt-1 font-sans">
            Primary Source Records Repository
          </h1>
          <p className="text-sm text-[#747A80] mt-0.5">
            Every displayed claim, financial calculation, and stakeholder note in FlytBase CRM links directly to a verifiable MCP source ID.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Total Indexed Sources"
          value={allEvidence.length}
          subtitle="Primary documents and facts"
          badge="Indexed"
          badgeColor="green"
          icon={Database}
        />
        <KpiCard
          title="CSV Files & Logs"
          value={fileCount}
          subtitle="Flight logs, spreadsheets, tickets"
          badge="Files"
          badgeColor="orange"
          icon={FileText}
        />
        <KpiCard
          title="Verified Facts"
          value={factCount}
          subtitle="Customer statements & audits"
          badge="Facts"
          badgeColor="green"
          icon={CheckCircle2}
        />
        <KpiCard
          title="Call Transcripts & Notes"
          value={callCount + ticketCount}
          subtitle="Meeting notes and support tickets"
          badge="Records"
          badgeColor="gray"
          icon={ShieldCheck}
        />
      </div>

      {/* Client Search and Filter Component */}
      <EvidenceClientPage initialEvidence={allEvidence} />
    </div>
  );
}
