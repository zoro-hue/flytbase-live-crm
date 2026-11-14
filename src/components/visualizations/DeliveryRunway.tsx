"use client";

import React, { useState } from "react";
import {
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle2,
  AlertTriangle,
  Radio,
  Eye,
  ExternalLink,
} from "lucide-react";

interface Milestone {
  id: string;
  name: string;
  dateStr: string;
  columnPercent: number; // 0 to 100% position on the timeline
  status: "done" | "in_review" | "in_progress" | "not_started" | "overdue";
  owner: string;
  account: string;
  summary: string;
  evidenceRef: string;
}

interface Track {
  id: string;
  code: string;
  codeBg: string;
  title: string;
  account: string;
  progress: string;
  milestones: Milestone[];
}

const TRACKS: Track[] = [
  {
    id: "ecp-tender",
    code: "ECP",
    codeBg: "bg-blue-950/70 text-blue-400 border border-blue-800/60",
    title: "Eastern Counties Framework Spec",
    account: "Eastern Counties Police",
    progress: "4 / 6",
    milestones: [
      {
        id: "m-1",
        name: "Initial Tender Spec Released",
        dateStr: "Oct 28",
        columnPercent: 12,
        status: "done",
        owner: "ACC Nadia Rahman",
        account: "Eastern Counties Police",
        summary: "£1.5M 300-dock framework specifications submitted to regional procurement board.",
        evidenceRef: "tender_spec_v1",
      },
      {
        id: "m-2",
        name: "Dual-Vendor Contingency Clause",
        dateStr: "Nov 06",
        columnPercent: 26,
        status: "done",
        owner: "Peter Chapman",
        account: "Eastern Counties Police",
        summary: "Commercial director required second-source vendor guarantee before approval.",
        evidenceRef: "procurement_policy_v4",
      },
      {
        id: "m-3",
        name: "Fleet Grounding FB-10412",
        dateStr: "Nov 12",
        columnPercent: 37,
        status: "overdue",
        owner: "Ewan Brooks (DPO)",
        account: "Eastern Counties Police",
        summary: "Tarn Valley 4 docks grounded pending thermal stream encryption verification.",
        evidenceRef: "dpia_tarn_valley_grounding",
      },
      {
        id: "m-4",
        name: "DPIA Re-submission",
        dateStr: "Nov 24",
        columnPercent: 54,
        status: "in_progress",
        owner: "FlytBase Compliance",
        account: "Eastern Counties Police",
        summary: "Deliver cryptographic certificate proving end-to-end payload hashing.",
        evidenceRef: "compliance_audit_2026",
      },
      {
        id: "m-5",
        name: "Final Framework Award",
        dateStr: "Dec 15",
        columnPercent: 82,
        status: "not_started",
        owner: "ACC Nadia Rahman",
        account: "Eastern Counties Police",
        summary: "Cabinet sign-off and £1.5M contract distribution across 5 regional police forces.",
        evidenceRef: "cabinet_signoff_target",
      },
    ],
  },
  {
    id: "ald-vip",
    code: "AIG",
    codeBg: "bg-amber-950/70 text-amber-400 border border-amber-800/60",
    title: "Aldermoor VIP Chemical Corridor Demo",
    account: "Aldermoor Industrial",
    progress: "3 / 5",
    milestones: [
      {
        id: "m-6",
        name: "Plants 4,8,12 Grounding Detected",
        dateStr: "Nov 02",
        columnPercent: 18,
        status: "done",
        owner: "MCP Telemetry",
        account: "Aldermoor Industrial",
        summary: "Zero flights recorded between 2–29 Nov across 3 critical chemical production docks.",
        evidenceRef: "flight_logs_nov2026",
      },
      {
        id: "m-7",
        name: "FB-10488 VIP Flight Request",
        dateStr: "Nov 14",
        columnPercent: 40,
        status: "in_review",
        owner: "Karen Mbeki",
        account: "Aldermoor Industrial",
        summary: "High-visibility board flyover scheduled for 5 Dec. Docks must achieve flight-ready status.",
        evidenceRef: "jira_ticket_FB10488",
      },
      {
        id: "m-8",
        name: "Pre-Flight Dry Run Inspection",
        dateStr: "Nov 28",
        columnPercent: 62,
        status: "in_progress",
        owner: "FlytBase Field Ops",
        account: "Aldermoor Industrial",
        summary: "Deploy mobile ground technician to verify dock telemetry and bypass safety trip.",
        evidenceRef: "field_service_plan_aldermoor",
      },
      {
        id: "m-9",
        name: "Dec 5 VIP Flyover Execution",
        dateStr: "Dec 05",
        columnPercent: 72,
        status: "not_started",
        owner: "Karen Mbeki & Board",
        account: "Aldermoor Industrial",
        summary: "Automated perimeter drone deployment during European board visit.",
        evidenceRef: "jira_ticket_FB10488",
      },
    ],
  },
  {
    id: "ald-handover",
    code: "AHO",
    codeBg: "bg-red-950/70 text-red-400 border border-red-800/60",
    title: "Rhys Calder Handover & Engineering Resourcing",
    account: "Aldermoor Industrial",
    progress: "1 / 4",
    milestones: [
      {
        id: "m-10",
        name: "Departure Notice Logged",
        dateStr: "Nov 08",
        columnPercent: 28,
        status: "done",
        owner: "Rhys Calder",
        account: "Aldermoor Industrial",
        summary: "Sole dock architect leaving in Jan 2027. No designated successor or documentation.",
        evidenceRef: "flight_ops_slack_export",
      },
      {
        id: "m-11",
        name: "Dock Architecture Shadowing",
        dateStr: "Nov 20",
        columnPercent: 48,
        status: "in_progress",
        owner: "Lead Systems Architect",
        account: "Aldermoor Industrial",
        summary: "Shadow Rhys Calder across nested dock firmware and autonomous recovery routines.",
        evidenceRef: "handover_audit_doc",
      },
      {
        id: "m-12",
        name: "Operational Knowledge Transfer Sign-off",
        dateStr: "Dec 18",
        columnPercent: 86,
        status: "not_started",
        owner: "Stefan Roy",
        account: "Aldermoor Industrial",
        summary: "Complete engineering repository migration before 15 Jan departure date.",
        evidenceRef: "knowledge_base_transfer",
      },
    ],
  },
];

const COLUMNS = [
  { label: "Oct 31", pct: 15 },
  { label: "Nov 07", pct: 28 },
  { label: "Nov 14 (Today)", pct: 41, isToday: true },
  { label: "Nov 21", pct: 54 },
  { label: "Nov 28", pct: 67 },
  { label: "Dec 05", pct: 78 },
  { label: "Dec 15", pct: 90 },
];

export const DeliveryRunway: React.FC = () => {
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(
    TRACKS[1].milestones[1] // FB-10488 VIP flight request
  );

  return (
    <div className="matte-card p-5 rounded-2xl relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#25282D]">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF5A00]" />
            <h3 className="text-sm font-semibold text-[#F4F4F5] uppercase tracking-wider font-mono">
              Delivery Runway
            </h3>
          </div>
          <p className="text-xs text-[#9A9FA8] mt-0.5">
            Cross-account operational milestones — 2 weeks back, 6 weeks ahead. Click milestone for telemetry.
          </p>
        </div>

        {/* Status badges from reference (e.g. Otto is watching, Sage is watching) */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/60 text-emerald-400 text-xs font-medium">
            <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
            <span>MCP Live Sentinel</span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-950/60 border border-amber-800/60 text-amber-400 text-xs font-medium">
            <Eye className="w-3 h-3 text-amber-400" />
            <span>FB-10488 Tracked</span>
          </div>
        </div>
      </div>

      {/* Timeline Grid */}
      <div className="pt-5 overflow-x-auto">
        <div className="min-w-[700px] relative">
          {/* Date Headers */}
          <div className="relative h-6 border-b border-[#25282D] text-[11px] font-mono text-[#606570]">
            {COLUMNS.map((col) => (
              <div
                key={col.label}
                style={{ left: `${col.pct}%` }}
                className={`absolute -translate-x-1/2 select-none whitespace-nowrap ${
                  col.isToday ? "text-[#FF5A00] font-bold" : ""
                }`}
              >
                {col.label}
              </div>
            ))}
          </div>

          {/* Today Vertical Line */}
          <div
            style={{ left: "41%" }}
            className="absolute top-6 bottom-0 w-[1.5px] bg-[#FF5A00] z-10 pointer-events-none opacity-80"
          >
            <div className="absolute -top-1.5 -left-1 w-2.5 h-2.5 rounded-full bg-[#FF5A00]" />
          </div>

          {/* Tracks */}
          <div className="space-y-4 pt-4 pb-2">
            {TRACKS.map((track) => (
              <div
                key={track.id}
                className="relative flex items-center h-16 rounded-xl bg-[#0D0F12]/60 border border-[#25282D] hover:border-[#606570] transition-colors px-3 group"
              >
                {/* Account / Track badge (left column) */}
                <div className="w-48 flex-shrink-0 pr-3 z-20">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-6 h-6 rounded flex items-center justify-center font-bold text-[10px] font-mono ${track.codeBg}`}
                    >
                      {track.code}
                    </span>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-[#F4F4F5] truncate">
                        {track.title}
                      </div>
                      <div className="text-[10px] text-[#9A9FA8] font-mono">
                        {track.progress} done
                      </div>
                    </div>
                  </div>
                </div>

                {/* Milestone Horizontal Track Line */}
                <div className="relative flex-1 h-0.5 bg-[#1C1F26]">
                  {/* Subtle date grid tick marks */}
                  {COLUMNS.map((col) => (
                    <div
                      key={col.label}
                      style={{ left: `${col.pct}%` }}
                      className="absolute -top-1 w-[1px] h-2.5 bg-[#25282D]"
                    />
                  ))}

                  {/* Milestone Diamonds */}
                  {track.milestones.map((m) => {
                    const isSelected = selectedMilestone?.id === m.id;

                    // Diamond marker color styles
                    let diamondBg = "bg-[#25282D] border-[#606570]";
                    if (m.status === "done") {
                      diamondBg = "bg-emerald-500 border-emerald-400";
                    } else if (m.status === "in_review") {
                      diamondBg = "bg-amber-500 border-amber-300";
                    } else if (m.status === "in_progress") {
                      diamondBg = "bg-[#FF5A00] border-[#FFA066]";
                    } else if (m.status === "overdue") {
                      diamondBg = "bg-red-500 border-red-300 ring-2 ring-red-950";
                    } else if (m.status === "not_started") {
                      diamondBg = "bg-[#0D0F12] border-[#606570]";
                    }

                    return (
                      <div
                        key={m.id}
                        style={{ left: `${m.columnPercent}%` }}
                        onClick={() => setSelectedMilestone(m)}
                        className={`absolute -top-2.5 -translate-x-1/2 z-20 cursor-pointer transition-transform hover:scale-125 ${
                          isSelected ? "scale-125" : ""
                        }`}
                        title={`${m.name} (${m.dateStr})`}
                      >
                        {/* 45 degree rotated square = diamond */}
                        <div
                          className={`w-4 h-4 rotate-45 border transition-all ${diamondBg} ${
                            isSelected ? "ring-2 ring-white shadow-lg" : ""
                          }`}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-between flex-wrap gap-3 pt-3 border-t border-[#25282D] text-[11px] font-mono text-[#9A9FA8]">
            <div className="flex items-center gap-4 flex-wrap">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rotate-45 bg-[#0D0F12] border border-[#606570]" />
                <span>Not started</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rotate-45 bg-[#FF5A00] border border-[#FFA066]" />
                <span>In progress</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rotate-45 bg-amber-500 border border-amber-300" />
                <span>In review</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rotate-45 bg-emerald-500 border border-emerald-400" />
                <span>Done</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rotate-45 bg-red-500 border border-red-300" />
                <span>Overdue / Risk</span>
              </span>
            </div>

            <div className="text-[10px] text-[#606570]">
              Click any diamond marker to inspect source telemetry
            </div>
          </div>
        </div>
      </div>

      {/* Selected Milestone Detail Drawer / Banner */}
      {selectedMilestone && (
        <div className="mt-4 p-3.5 rounded-xl bg-[#0D0F12] border border-[#25282D] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white">
                {selectedMilestone.name}
              </span>
              <span className="px-2 py-0.2 rounded-full text-[10px] font-mono bg-[#141619] border border-[#25282D] text-[#FF5A00]">
                {selectedMilestone.dateStr}
              </span>
              <span className="text-xs text-[#9A9FA8]">
                • {selectedMilestone.account} ({selectedMilestone.owner})
              </span>
            </div>
            <p className="text-xs text-[#E4E4E7]">{selectedMilestone.summary}</p>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={() => {
                window.dispatchEvent(
                  new CustomEvent("open-evidence-drawer", {
                    detail: { sourceId: selectedMilestone.evidenceRef },
                  })
                );
              }}
              className="px-3 py-1.5 rounded-lg bg-[#141619] hover:bg-[#1D2024] border border-[#25282D] text-xs font-medium text-[#F4F4F5] hover:text-[#FF5A00] transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#FF5A00]" />
              <span>Evidence: {selectedMilestone.evidenceRef}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
