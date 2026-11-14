import React from "react";
import { getAllEvidence } from "@/lib/data/provenance";
import { EvidenceBadge } from "@/components/evidence/EvidenceBadge";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { FileSearch, FileText, CheckCircle2, ShieldCheck, Database, Search } from "lucide-react";
import EvidenceClientPage from "./EvidenceClientPage";

export default function EvidencePage() {
  const allEvidence = getAllEvidence();

  const fileCount = allEvidence.filter((e) => e.sourceType === "file").length;
  const factCount = allEvidence.filter((e) => e.sourceType === "fact").length;
  const ticketCount = allEvidence.filter((e) => e.sourceType === "ticket").length;
  const callCount = allEvidence.filter((e) => e.sourceType === "call_note").length;

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-xl bg-gradient-to-r from-[#111419] to-[#15181D] border border-[#272C34]">
        <div>
          <div className="flex items-center gap-2">
            <FileSearch className="w-4 h-4 text-[#FF762E]" />
            <span className="text-xs font-mono uppercase tracking-wider text-[#FF762E]">
              Evidence & Source Traceability System
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#F4F4F5] mt-1">
            Primary Source Records Repository
          </h1>
          <p className="text-xs text-[#9298A2] mt-0.5">
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
