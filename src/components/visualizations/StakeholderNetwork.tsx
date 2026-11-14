"use client";

import React, { useState } from "react";
import {
  Users,
  Shield,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Clock,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

interface StakeholderNode {
  id: string;
  name: string;
  role: string;
  account: "Eastern Counties Police" | "Aldermoor Industrial";
  badge: string;
  badgeColor: string; // "orange" | "red" | "emerald" | "blue"
  angle: number; // in degrees for radial layout
  distance: number; // radius in px
  urgency: "critical" | "warning" | "stable";
  fact: string;
  evidenceRef: string;
  contactHref: string;
}

const STAKEHOLDERS: StakeholderNode[] = [
  {
    id: "nadia",
    name: "ACC Nadia Rahman",
    role: "Assistant Chief Constable",
    account: "Eastern Counties Police",
    badge: "Final Sign-off",
    badgeColor: "emerald",
    angle: 270, // Top
    distance: 140,
    urgency: "stable",
    fact: "Authorizes the £1.5M regional framework and 300-dock national tender. Positive on automated response times.",
    evidenceRef: "acc_briefing_minutes_oct26",
    contactHref: "/stakeholders#nadia",
  },
  {
    id: "peter",
    name: "Peter Chapman",
    role: "Commercial Director",
    account: "Eastern Counties Police",
    badge: "Budget Gatekeeper",
    badgeColor: "orange",
    angle: 320, // Top-Right
    distance: 145,
    urgency: "warning",
    fact: "Controlling framework commercials. Required dual-vendor contingency before final release.",
    evidenceRef: "procurement_policy_v4",
    contactHref: "/stakeholders#peter",
  },
  {
    id: "stefan",
    name: "Stefan Roy",
    role: "VP Operations",
    account: "Aldermoor Industrial",
    badge: "Unverified Claim",
    badgeColor: "red",
    angle: 15, // Right
    distance: 150,
    urgency: "critical",
    fact: "Claims €1.2M annual savings, but zero guard hours reduced and zero contracts amended. Finance refuses to sign.",
    evidenceRef: "roi_spreadsheet.csv",
    contactHref: "/stakeholders#stefan",
  },
  {
    id: "rhys",
    name: "Rhys Calder",
    role: "Lead Flight Systems Eng",
    account: "Aldermoor Industrial",
    badge: "Leaving Jan 2027",
    badgeColor: "red",
    angle: 90, // Bottom-Right
    distance: 140,
    urgency: "critical",
    fact: "Sole holder of nested dock configurations. Handover plan non-existent. Immediate key-person vulnerability.",
    evidenceRef: "flight_ops_slack_export",
    contactHref: "/stakeholders#rhys",
  },
  {
    id: "karen",
    name: "Karen Mbeki",
    role: "Head of Site Security",
    account: "Aldermoor Industrial",
    badge: "VIP Sponsor",
    badgeColor: "orange",
    angle: 145, // Bottom-Left
    distance: 145,
    urgency: "warning",
    fact: "Raised ticket FB-10488 requesting 5 Dec VIP flyover over chemical line. High scrutiny test.",
    evidenceRef: "jira_ticket_FB10488",
    contactHref: "/stakeholders#karen",
  },
  {
    id: "ewan",
    name: "Ewan Brooks",
    role: "Data Protection Officer",
    account: "Eastern Counties Police",
    badge: "DPIA Blocker",
    badgeColor: "red",
    angle: 205, // Left
    distance: 145,
    urgency: "critical",
    fact: "Halted 4 Tarn Valley docks on FB-10412. Will not approve until thermal stream hashing is verified.",
    evidenceRef: "dpia_tarn_valley_grounding",
    contactHref: "/stakeholders#ewan",
  },
];

export const StakeholderNetwork: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<StakeholderNode>(STAKEHOLDERS[0]);

  // Center coordinates of the 420x360 canvas
  const centerX = 200;
  const centerY = 175;

  return (
    <div className="matte-card p-5 rounded-2xl relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#25282D]">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF5A00]" />
            <h3 className="text-sm font-semibold text-[#F4F4F5] uppercase tracking-wider font-mono">
              Authority & Influence Matrix
            </h3>
          </div>
          <p className="text-xs text-[#9A9FA8] mt-0.5">
            Radial hub-and-spoke mapping key decision makers, blockers, and champions
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/stakeholders"
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#141619] hover:bg-[#1D2024] border border-[#25282D] text-xs font-medium text-[#F4F4F5] transition-colors"
          >
            <span>All Stakeholders (12)</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#FF5A00]" />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center pt-4">
        {/* Radial Canvas (7 cols) */}
        <div className="lg:col-span-7 flex justify-center items-center py-2 relative">
          <div className="relative w-[380px] h-[350px]">
            {/* SVG Spokes and Orbit rings */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 400 350"
            >
              {/* Concentric subtle rings */}
              <circle
                cx={centerX}
                cy={centerY}
                r="70"
                fill="none"
                stroke="#25282D"
                strokeWidth="1"
                strokeDasharray="3 3"
              />
              <circle
                cx={centerX}
                cy={centerY}
                r="140"
                fill="none"
                stroke="#1E2126"
                strokeWidth="1"
              />

              {/* Spoke lines connecting Center to Nodes */}
              {STAKEHOLDERS.map((node) => {
                const rad = (node.angle * Math.PI) / 180;
                const x = centerX + node.distance * Math.cos(rad);
                const y = centerY + node.distance * Math.sin(rad);
                const isSelected = selectedNode.id === node.id;

                return (
                  <g key={node.id}>
                    <line
                      x1={centerX}
                      y1={centerY}
                      x2={x}
                      y2={y}
                      stroke={isSelected ? "#FF5A00" : "#25282D"}
                      strokeWidth={isSelected ? "1.5" : "1"}
                      strokeDasharray={isSelected ? undefined : "2 2"}
                      opacity={isSelected ? 0.9 : 0.6}
                      className="transition-all duration-380 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    />
                    {isSelected && (
                      <circle
                        cx={x}
                        cy={y}
                        r="6"
                        fill="none"
                        stroke="#FF5A00"
                        strokeWidth="1"
                        className="animate-ping"
                      />
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Central Authority Hub */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full bg-[#0D0F12] border-2 border-[#FF5A00]/70 shadow-2xl flex flex-col items-center justify-center text-center p-2 z-10 select-none backdrop-blur-md"
            >
              <div className="w-7 h-7 rounded-full bg-[#141619] border border-[#25282D] flex items-center justify-center mb-1">
                <Shield className="w-3.5 h-3.5 text-[#FF5A00]" />
              </div>
              <div className="text-[10px] font-mono text-[#9A9FA8] uppercase tracking-wider">
                Authority
              </div>
              <div className="text-xs font-bold text-white tracking-tight leading-tight">
                Dual Accounts
              </div>
              <div className="text-[9px] font-mono text-[#FF5A00] mt-0.5">
                6 Key Figures
              </div>
            </div>

            {/* Orbiting Stakeholder Nodes */}
            {STAKEHOLDERS.map((node) => {
              const rad = (node.angle * Math.PI) / 180;
              const x = centerX + node.distance * Math.cos(rad);
              const y = centerY + node.distance * Math.sin(rad);
              const isSelected = selectedNode.id === node.id;

              return (
                <div
                  key={node.id}
                  style={{
                    left: `${x}px`,
                    top: `${y}px`,
                    transform: "translate(-50%, -50%)",
                  }}
                  onClick={() => setSelectedNode(node)}
                  className={`absolute z-20 cursor-pointer p-2 rounded-xl transition-all duration-380 ease-[cubic-bezier(0.22,1,0.36,1)] group flex items-center gap-2 ${
                    isSelected
                      ? "bg-[#141619] border border-[#FF5A00] shadow-lg scale-105"
                      : "bg-[#0D0F12]/90 hover:bg-[#141619] border border-[#25282D] hover:border-[#606570]"
                  }`}
                >
                  <div className="relative">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-[11px] font-mono transition-colors ${
                        node.badgeColor === "red"
                          ? "bg-red-950/60 text-red-400 border border-red-800/60"
                          : node.badgeColor === "orange"
                          ? "bg-[#FF5A00]/20 text-[#FF5A00] border border-[#FF5A00]/40"
                          : "bg-emerald-950/60 text-emerald-400 border border-emerald-800/60"
                      }`}
                    >
                      {node.name.split(" ").slice(-1)[0][0]}
                    </div>
                    {node.urgency === "critical" && (
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500 ring-2 ring-[#0D0F12]" />
                    )}
                  </div>

                  <div className="text-left pr-1">
                    <div className="text-xs font-semibold text-[#F4F4F5] group-hover:text-white leading-tight whitespace-nowrap">
                      {node.name.replace("ACC ", "")}
                    </div>
                    <div className="text-[10px] text-[#9A9FA8] whitespace-nowrap">
                      {node.badge}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Stakeholder Intel Card (5 cols) */}
        <div className="lg:col-span-5 bg-[#0D0F12] border border-[#25282D] rounded-xl p-4.5 space-y-3.5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-white tracking-tight">
                  {selectedNode.name}
                </h4>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-medium ${
                    selectedNode.badgeColor === "red"
                      ? "bg-red-950/80 text-red-400 border border-red-800/70"
                      : selectedNode.badgeColor === "orange"
                      ? "bg-[#FF5A00]/20 text-[#FF5A00] border border-[#FF5A00]/40"
                      : "bg-emerald-950/80 text-emerald-400 border border-emerald-800/70"
                  }`}
                >
                  {selectedNode.badge}
                </span>
              </div>
              <p className="text-xs text-[#9A9FA8] mt-0.5">{selectedNode.role}</p>
              <div className="text-[11px] font-mono text-[#606570] mt-0.5">
                {selectedNode.account}
              </div>
            </div>

            <div
              className={`p-1.5 rounded-lg border ${
                selectedNode.urgency === "critical"
                  ? "bg-red-950/40 border-red-800/50 text-red-400"
                  : selectedNode.urgency === "warning"
                  ? "bg-[#FF5A00]/10 border-[#FF5A00]/30 text-[#FF5A00]"
                  : "bg-emerald-950/40 border-emerald-800/50 text-emerald-400"
              }`}
            >
              {selectedNode.urgency === "critical" ? (
                <AlertTriangle className="w-4 h-4" />
              ) : selectedNode.urgency === "warning" ? (
                <Clock className="w-4 h-4" />
              ) : (
                <CheckCircle2 className="w-4 h-4" />
              )}
            </div>
          </div>

          <div className="p-3 rounded-lg bg-[#141619] border border-[#25282D] text-xs text-[#E4E4E7] leading-relaxed">
            {selectedNode.fact}
          </div>

          <div className="flex items-center justify-between pt-1 text-[11px] font-mono">
            <span className="text-[#606570]">Evidence Ref:</span>
            <span className="text-[#FF5A00] hover:underline cursor-pointer">
              {selectedNode.evidenceRef}
            </span>
          </div>

          <div className="pt-2 border-t border-[#25282D] flex items-center justify-between">
            <button
              onClick={() => {
                window.dispatchEvent(
                  new CustomEvent("open-evidence-drawer", {
                    detail: { sourceId: selectedNode.evidenceRef },
                  })
                );
              }}
              className="text-xs text-[#9A9FA8] hover:text-[#FF5A00] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Trace in Evidence Vault</span>
            </button>

            <Link
              href={selectedNode.contactHref}
              className="text-xs font-medium text-[#FF5A00] hover:text-[#FFA066] flex items-center gap-1"
            >
              <span>View Profile</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
