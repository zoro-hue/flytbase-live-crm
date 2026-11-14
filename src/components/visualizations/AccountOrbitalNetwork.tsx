"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  ExternalLink,
  ShieldAlert,
  Radio,
  FileCheck,
  Check,
  X,
  Edit3,
} from "lucide-react";

interface AgentNode {
  id: string;
  name: string;
  role: string;
  statusText: string;
  badge: number;
  color: string;
  nodeColor: string;
  x: number; // percentage in SVG orbit
  y: number;
  status: "working" | "needs-you" | "paused";
  reviewItem?: {
    title: string;
    account: string;
    severity: "Critical" | "High" | "Medium";
    sourceId: string;
    details: string;
  };
}

const AGENTS: AgentNode[] = [
  {
    id: "sage",
    name: "Sage",
    role: "Account Health Sentinel",
    statusText: "Watching Tarn Valley 4 docks",
    badge: 1,
    color: "#E34B3D",
    nodeColor: "#E34B3D",
    x: 16,
    y: 50,
    status: "needs-you",
    reviewItem: {
      title: "Event A: Zero live flights at Tarn Valley (FB-10412)",
      account: "Eastern Counties Police Alliance",
      severity: "Critical",
      sourceId: "src-fb-10412",
      details: "4 installed docks have zero live flights for 4 months. Unassigned DPIA blocker.",
    },
  },
  {
    id: "ava",
    name: "Ava",
    role: "Operational Dispatch",
    statusText: "On the telemetry bridge",
    badge: 2,
    color: "#0D9488",
    nodeColor: "#0D9488",
    x: 38,
    y: 18,
    status: "working",
    reviewItem: {
      title: "Dispatch FB-10488: Deputy Chief Constable VIP flight",
      account: "Eastern Counties Police Alliance",
      severity: "High",
      sourceId: "src-fb-10488",
      details: "Manual flight override required for VIP live stream demonstration at Westmere.",
    },
  },
  {
    id: "remy",
    name: "Remy",
    role: "MCP Ingestion Agent",
    statusText: "Parsing 1-call/60s rate stream",
    badge: 1,
    color: "#2563EB",
    nodeColor: "#2563EB",
    x: 74,
    y: 26,
    status: "working",
    reviewItem: {
      title: "MCP sync integrity confirmed: 49 docks tracked",
      account: "Global Portfolio",
      severity: "Medium",
      sourceId: "src-mcp-status",
      details: "SQLite cache warmed with all telemetry tables. Zero rate-limit violations.",
    },
  },
  {
    id: "nova",
    name: "Nova",
    role: "Deal Momentum Agent",
    statusText: "Drafting £285k expansion memo",
    badge: 1,
    color: "#8B5CF6",
    nodeColor: "#8B5CF6",
    x: 84,
    y: 56,
    status: "needs-you",
    reviewItem: {
      title: "Tarn Valley £285k expansion milestone nudge",
      account: "Eastern Counties Police Alliance",
      severity: "High",
      sourceId: "src-deal-tarn",
      details: "Contingent on DPIA sign-off. Milestone payment linked to 300-dock framework.",
    },
  },
  {
    id: "iris",
    name: "Iris",
    role: "Executive Briefing Agent",
    statusText: "Briefing Nadia Rahman for board",
    badge: 1,
    color: "#D97706",
    nodeColor: "#D97706",
    x: 62,
    y: 82,
    status: "working",
    reviewItem: {
      title: "300-dock tender briefing for Nadia Rahman",
      account: "Eastern Counties Police Alliance",
      severity: "Medium",
      sourceId: "src-briefing-nadia",
      details: "Consortium operational audit ready for distribution prior to governance meeting.",
    },
  },
  {
    id: "otto",
    name: "Otto",
    role: "Compliance Sentinel",
    statusText: "Waiting on Ewan Brooks (DPIA)",
    badge: 1,
    color: "#536F00",
    nodeColor: "#536F00",
    x: 32,
    y: 78,
    status: "needs-you",
    reviewItem: {
      title: "Reassign FB-10412 to DPO Sarah Jenkins",
      account: "Eastern Counties Police Alliance",
      severity: "Critical",
      sourceId: "src-fb-10412",
      details: "Ewan Brooks retired without completing DPIA. Urgent reassignment to unlock Tarn Valley.",
    },
  },
  {
    id: "atlas",
    name: "Atlas",
    role: "ROI & Audit Analyst",
    statusText: "Auditing €1.2M Aldermoor model",
    badge: 1,
    color: "#6B7280",
    nodeColor: "#6B7280",
    x: 18,
    y: 26,
    status: "working",
    reviewItem: {
      title: "Stefan Roy €1.2M savings model verification",
      account: "Aldermoor Industrial Group",
      severity: "High",
      sourceId: "src-roi-audit",
      details: "Finance director Marcus Vance requesting flight telemetry proof to defend €320k deal.",
    },
  },
];

const LIVE_ACTIVITIES = [
  {
    agent: "Otto",
    color: "#536F00",
    text: "Tagged FB-10412 DPIA bottleneck as 'Urgent Governance Blocker'",
    time: "just now",
    account: "Eastern Counties",
  },
  {
    agent: "Sage",
    color: "#E34B3D",
    text: "Alerted: Tarn Valley 4 docks remain idle with 0 patrol hours logged",
    time: "1m ago",
    account: "Eastern Counties",
  },
  {
    agent: "Nova",
    color: "#8B5CF6",
    text: "Prepared executive nudge for Marcus Vance re: Chemical Corridor ROI",
    time: "4m ago",
    account: "Aldermoor",
  },
  {
    agent: "Ava",
    color: "#0D9488",
    text: "Logged flight telemetry stream from Westmere Constabulary (Dock #7)",
    time: "7m ago",
    account: "Eastern Counties",
  },
  {
    agent: "Iris",
    color: "#D97706",
    text: "Generated 3 talking points for Chief Constable meeting on 300-dock tender",
    time: "12m ago",
    account: "Eastern Counties",
  },
];

const TIMELINE_STEPS = [
  {
    time: "07:30 AM",
    agent: "Remy",
    title: "MCP Ingestion completed",
    detail: "Fetched 49 docks across 6 police stations & 15 European industrial plants.",
    sourceId: "src-mcp-status",
  },
  {
    time: "09:15 AM",
    agent: "Sage",
    title: "Grounding Flag: Tarn Valley Silent",
    detail: "4 docks online with zero flight dispatches over 120 days. FB-10412 detected.",
    sourceId: "src-fb-10412",
  },
  {
    time: "11:45 AM",
    agent: "Ava",
    title: "VIP Dispatch FB-10488 Scheduled",
    detail: "Westmere live camera stream test requested by Deputy Chief Constable.",
    sourceId: "src-fb-10488",
  },
  {
    time: "02:05 PM",
    agent: "Atlas",
    title: "Aldermoor ROI Discrepancy Audited",
    detail: "Stefan Roy €1.2M savings formula reconciled against flight telemetry.",
    sourceId: "src-roi-audit",
  },
  {
    time: "04:30 PM",
    agent: "Nova",
    title: "Rhys Calder Departure Risk Flagged",
    detail: "Lead systems engineer transition plan required to protect Ludwigshafen & Antwerp.",
    sourceId: "src-calder-dep",
  },
];

export const AccountOrbitalNetwork: React.FC = () => {
  const [selectedAgent, setSelectedAgent] = useState<AgentNode | null>(null);
  const [reviewMode, setReviewMode] = useState<boolean>(false);
  const [reviewIndex, setReviewIndex] = useState<number>(0);
  const [activeTimelineIdx, setActiveTimelineIdx] = useState<number>(3); // 2:05 PM
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const reviewItems = AGENTS.filter((a) => a.reviewItem).map((a) => ({
    agent: a,
    ...a.reviewItem!,
  }));

  // Timeline auto-play
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveTimelineIdx((prev) => (prev + 1) % TIMELINE_STEPS.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="space-y-6">
      {/* Top Main Grid: Left = Radial AI Team Network, Right = Review Stack & Live Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Left Column: Radial AI Team Orbital Visualization (7 cols) */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-white border border-[#E2E5DE] shadow-sm flex flex-col justify-between relative overflow-hidden">
          {/* Header & Status Indicator */}
          <div className="flex items-center justify-between z-10">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#536F00]" />
                <span className="text-xs font-mono uppercase tracking-wider text-[#536F00] font-semibold">
                  AUTONOMOUS SENTINELS • 6 WAITING
                </span>
              </div>
              <h2 className="text-xl font-bold text-[#151515] mt-1 tracking-tight">Your AI team</h2>
              <p className="text-xs text-[#747A80] mt-0.5">
                Real-time operational monitoring across Eastern Counties & Aldermoor.
              </p>
            </div>

            {/* Legend */}
            <div className="hidden sm:flex items-center gap-3 text-[11px] font-mono text-[#747A80]">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#536F00]" />
                working
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#E34B3D]" />
                needs you
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#969BA1]" />
                paused
              </span>
            </div>
          </div>

          {/* SVG Orbital Canvas */}
          <div className="relative w-full h-[360px] sm:h-[400px] my-3 flex items-center justify-center select-none">
            {/* Subtle background radar circles */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {/* Concentric subtle orbit ellipses */}
              <ellipse
                cx="50"
                cy="50"
                rx="44"
                ry="38"
                fill="none"
                stroke="#E2E5DE"
                strokeWidth="0.8"
                strokeDasharray="2,3"
              />
              <ellipse
                cx="50"
                cy="50"
                rx="32"
                ry="26"
                fill="none"
                stroke="#E2E5DE"
                strokeWidth="0.6"
              />
              <ellipse
                cx="50"
                cy="50"
                rx="20"
                ry="16"
                fill="none"
                stroke="#E2E5DE"
                strokeWidth="0.8"
                strokeDasharray="2,2"
              />

              {/* Connecting Radial Ray Lines to each agent */}
              {AGENTS.map((agent) => (
                <line
                  key={agent.id}
                  x1="50"
                  y1="50"
                  x2={agent.x}
                  y2={agent.y}
                  stroke={agent.nodeColor}
                  strokeWidth="0.8"
                  strokeOpacity="0.4"
                  strokeDasharray={agent.status === "needs-you" ? "1,2" : undefined}
                />
              ))}
            </svg>

            {/* Central Circle: 6 WAITING FOR YOU */}
            <button
              onClick={() => {
                setReviewMode(true);
                setReviewIndex(0);
              }}
              className="group absolute z-20 w-32 h-32 rounded-full bg-white border-2 border-[#536F00]/40 shadow-lg hover:shadow-xl hover:border-[#536F00] transition-all duration-300 flex flex-col items-center justify-center cursor-pointer active:scale-95"
              title="Click to open Review Mode"
            >
              {/* Subtle inner pulse ring */}
              <div className="absolute inset-1 rounded-full border border-dashed border-[#536F00]/30 animate-[spin_20s_linear_infinite]" />
              <span className="text-3xl font-extrabold text-[#151515] tracking-tight group-hover:scale-110 transition-transform">
                6
              </span>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#747A80] font-semibold mt-0.5">
                WAITING FOR YOU
              </span>
              <span className="text-[11px] font-medium text-[#536F00] flex items-center gap-1 mt-1 group-hover:underline">
                Review mode <ArrowRight className="w-3 h-3" />
              </span>
            </button>

            {/* Orbiting Agent Nodes */}
            {AGENTS.map((agent) => {
              const isSelected = selectedAgent?.id === agent.id;
              return (
                <div
                  key={agent.id}
                  style={{
                    left: `${agent.x}%`,
                    top: `${agent.y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                  className="absolute z-20"
                >
                  <button
                    onClick={() => setSelectedAgent(agent)}
                    className={`group relative p-2.5 rounded-xl bg-white border shadow-sm transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer flex flex-col items-center text-center ${
                      isSelected
                        ? "border-[#536F00] ring-2 ring-[#536F00]/20 shadow-md"
                        : "border-[#E2E5DE] hover:border-[#747A80]"
                    }`}
                  >
                    {/* Badge Count Pill */}
                    {agent.badge > 0 && (
                      <span
                        style={{ backgroundColor: agent.color }}
                        className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full text-white text-[9px] font-bold flex items-center justify-center shadow-xs"
                      >
                        {agent.badge}
                      </span>
                    )}

                    {/* Agent Icon Badge */}
                    <div
                      style={{ backgroundColor: `${agent.color}15`, borderColor: `${agent.color}40` }}
                      className="w-8 h-8 rounded-lg border flex items-center justify-center mb-1 text-xs font-bold"
                    >
                      <span style={{ color: agent.color }}>{agent.name.charAt(0)}</span>
                    </div>

                    <span className="text-xs font-bold text-[#151515] leading-none">{agent.name}</span>
                    <span className="text-[10px] text-[#747A80] mt-0.5 truncate max-w-[90px] hidden sm:block">
                      {agent.role.split(" ")[0]}
                    </span>
                    <span className="text-[9px] text-[#969BA1] mt-0.5 max-w-[100px] truncate hidden md:block">
                      {agent.statusText}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Bottom Footnote / Selected Agent Detail preview */}
          <div className="pt-3 border-t border-[#E2E5DE] flex items-center justify-between text-xs text-[#747A80]">
            {selectedAgent ? (
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[#151515]">{selectedAgent.name}:</span>
                <span>{selectedAgent.statusText}</span>
                {selectedAgent.reviewItem && (
                  <button
                    onClick={() => {
                      window.dispatchEvent(
                        new CustomEvent("open-evidence-drawer", {
                          detail: { sourceId: selectedAgent.reviewItem!.sourceId },
                        })
                      );
                    }}
                    className="ml-2 text-[#536F00] hover:underline flex items-center gap-1 font-medium cursor-pointer"
                  >
                    <span>Inspect</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                )}
              </div>
            ) : (
              <span>Click any agent or the center hub to review pending actions.</span>
            )}

            <button
              onClick={() => {
                setReviewMode(true);
                setReviewIndex(0);
              }}
              className="text-[#536F00] hover:underline font-semibold flex items-center gap-1"
            >
              Start Review <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Right Column: Waiting for you Stack + Live Activity (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-5 justify-between">
          {/* Waiting For You (6) Card Stack */}
          <div className="p-5 rounded-2xl bg-white border border-[#E2E5DE] shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-[#151515]">Waiting for you</h3>
                  <span className="w-5 h-5 rounded-full bg-[#536F00] text-white text-[10px] font-bold flex items-center justify-center">
                    6
                  </span>
                </div>
                <span className="text-[11px] font-mono text-[#747A80]">Yesterday & Today</span>
              </div>
              <p className="text-xs text-[#747A80] mb-3">
                Nothing leaves FlytBase until a person approves it.
              </p>

              {/* Stack Preview Card (Top item) */}
              <div className="p-3.5 rounded-xl bg-[#F4F5F0] border border-[#E2E5DE] space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-[#E34B3D]/10 text-[#E34B3D] text-[11px] font-bold flex items-center justify-center">
                      S
                    </span>
                    <span className="text-xs font-bold text-[#151515]">Sage</span>
                    <span className="text-[10px] text-[#747A80]">• Yesterday</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-mono bg-[#FEE2E2] text-[#DC2626] font-semibold border border-[#FECACA]">
                    Critical Blocker
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-[#151515]">
                  Recovery plan for Tarn Valley (FB-10412) before framework tender
                </h4>
                <p className="text-xs text-[#747A80] leading-relaxed">
                  Reassign DPIA from retired officer Ewan Brooks to DPO Sarah Jenkins. Unlocks 4 idle docks and protects £285k expansion.
                </p>
              </div>
            </div>

            {/* Action Bar with Keyboard Shortcuts */}
            <div className="mt-4 pt-3 border-t border-[#E2E5DE] flex items-center justify-between">
              <button
                onClick={() => {
                  setReviewMode(true);
                  setReviewIndex(0);
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#171717] hover:bg-[#252525] text-white text-xs font-semibold shadow-xs transition-all duration-200 active:scale-95 cursor-pointer"
              >
                <span>Start review mode</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <div className="flex items-center gap-2 text-[10px] font-mono text-[#747A80]">
                <span><kbd className="px-1 py-0.5 bg-[#ECEFE5] rounded border border-[#D5DAD0] text-[#151515]">A</kbd> approve</span>
                <span><kbd className="px-1 py-0.5 bg-[#ECEFE5] rounded border border-[#D5DAD0] text-[#151515]">E</kbd> edit</span>
                <span><kbd className="px-1 py-0.5 bg-[#ECEFE5] rounded border border-[#D5DAD0] text-[#151515]">R</kbd> reject</span>
              </div>
            </div>
          </div>

          {/* Live Activity Feed */}
          <div className="p-5 rounded-2xl bg-white border border-[#E2E5DE] shadow-sm flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-[#151515]">Live activity</h3>
                  <span className="px-2 py-0.5 rounded-full bg-[#ECEFE5] text-[#536F00] text-[10px] font-mono font-semibold border border-[#D5DAD0] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#536F00] animate-pulse" />
                    Live
                  </span>
                </div>
                <Link href="/signals" className="text-xs text-[#536F00] hover:underline font-medium">
                  All signals →
                </Link>
              </div>

              <div className="space-y-2.5">
                {LIVE_ACTIVITIES.map((act, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-[#F4F5F0] transition-colors"
                  >
                    <div
                      style={{ backgroundColor: `${act.color}15`, color: act.color }}
                      className="w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5"
                    >
                      {act.agent.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-[#151515] leading-snug">{act.text}</p>
                      <span className="text-[10px] font-mono text-[#747A80]">
                        {act.agent} • {act.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Component: Replay the day Interactive Scrubber (Matching Screenshot) */}
      <div className="p-5 rounded-2xl bg-white border border-[#E2E5DE] shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-[#151515] tracking-tight">Replay the day</h3>
            <p className="text-xs text-[#747A80]">
              Drag along the timeline or press play to see what each agent did, step by step.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTimelineIdx((prev) => Math.max(0, prev - 1))}
              className="p-2 rounded-xl hover:bg-[#F4F5F0] border border-[#E2E5DE] text-[#151515] transition-colors cursor-pointer"
              title="Previous step"
            >
              <SkipBack className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#171717] hover:bg-[#252525] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? "Pause" : "Play timeline"}</span>
            </button>
            <button
              onClick={() => setActiveTimelineIdx((prev) => Math.min(TIMELINE_STEPS.length - 1, prev + 1))}
              className="p-2 rounded-xl hover:bg-[#F4F5F0] border border-[#E2E5DE] text-[#151515] transition-colors cursor-pointer"
              title="Next step"
            >
              <SkipForward className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Timeline Track with Dots */}
        <div className="relative pt-3 pb-1">
          {/* Bar Line */}
          <div className="h-1.5 w-full bg-[#ECEFE5] rounded-full relative">
            <div
              className="h-full bg-[#171717] rounded-full transition-all duration-300"
              style={{
                width: `${(activeTimelineIdx / (TIMELINE_STEPS.length - 1)) * 100}%`,
              }}
            />
          </div>

          {/* Clickable Step Nodes along track */}
          <div className="absolute top-1 inset-x-0 flex justify-between">
            {TIMELINE_STEPS.map((step, idx) => {
              const isActive = idx === activeTimelineIdx;
              const isPast = idx <= activeTimelineIdx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveTimelineIdx(idx)}
                  className="flex flex-col items-center group cursor-pointer"
                >
                  <div
                    className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${
                      isActive
                        ? "bg-[#536F00] border-white ring-2 ring-[#536F00] scale-125"
                        : isPast
                        ? "bg-[#171717] border-white"
                        : "bg-[#ECEFE5] border-white"
                    }`}
                  />
                  <span
                    className={`text-[10px] font-mono mt-1 transition-colors ${
                      isActive ? "text-[#536F00] font-bold" : "text-[#747A80]"
                    }`}
                  >
                    {step.time}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Step Preview Card */}
        {TIMELINE_STEPS[activeTimelineIdx] && (
          <div className="mt-4 p-4 rounded-xl bg-[#F4F5F0] border border-[#E2E5DE] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-[#536F00] text-white text-xs font-bold flex items-center justify-center">
                {TIMELINE_STEPS[activeTimelineIdx].agent.charAt(0)}
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#151515]">
                    {TIMELINE_STEPS[activeTimelineIdx].time}
                  </span>
                  <span className="text-xs text-[#747A80]">•</span>
                  <span className="text-xs font-semibold text-[#536F00]">
                    {TIMELINE_STEPS[activeTimelineIdx].agent} ({TIMELINE_STEPS[activeTimelineIdx].title})
                  </span>
                </div>
                <p className="text-xs text-[#747A80] mt-0.5">
                  {TIMELINE_STEPS[activeTimelineIdx].detail}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                window.dispatchEvent(
                  new CustomEvent("open-evidence-drawer", {
                    detail: { sourceId: TIMELINE_STEPS[activeTimelineIdx].sourceId },
                  })
                );
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-[#ECEFE5] border border-[#E2E5DE] text-xs font-medium text-[#151515] transition-colors cursor-pointer"
            >
              <span>Inspect record</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#536F00]" />
            </button>
          </div>
        )}
      </div>

      {/* Review Mode Modal / Dialog Overlay */}
      {reviewMode && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-xl rounded-2xl bg-white border border-[#E2E5DE] shadow-2xl p-6 space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-[#E2E5DE] pb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#536F00]" />
                <h3 className="text-lg font-bold text-[#151515]">Human Review Mode</h3>
                <span className="text-xs font-mono text-[#747A80]">
                  ({reviewIndex + 1} of {reviewItems.length})
                </span>
              </div>
              <button
                onClick={() => setReviewMode(false)}
                className="p-1.5 rounded-lg hover:bg-[#F4F5F0] text-[#747A80] hover:text-[#151515] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Current Item */}
            {reviewItems[reviewIndex] && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      style={{ backgroundColor: reviewItems[reviewIndex].agent.color }}
                      className="w-6 h-6 rounded-md text-white text-xs font-bold flex items-center justify-center"
                    >
                      {reviewItems[reviewIndex].agent.name.charAt(0)}
                    </span>
                    <span className="text-xs font-bold text-[#151515]">
                      {reviewItems[reviewIndex].agent.name} • {reviewItems[reviewIndex].agent.role}
                    </span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold ${
                      reviewItems[reviewIndex].severity === "Critical"
                        ? "bg-[#FEE2E2] text-[#DC2626]"
                        : "bg-[#FEF3C7] text-[#C78620]"
                    }`}
                  >
                    {reviewItems[reviewIndex].severity}
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-[#F4F5F0] border border-[#E2E5DE] space-y-2">
                  <span className="text-[10px] font-mono text-[#747A80] uppercase block">
                    {reviewItems[reviewIndex].account}
                  </span>
                  <h4 className="text-sm font-bold text-[#151515]">
                    {reviewItems[reviewIndex].title}
                  </h4>
                  <p className="text-xs text-[#747A80] leading-relaxed">
                    {reviewItems[reviewIndex].details}
                  </p>
                </div>
              </div>
            )}

            {/* Review Action Buttons */}
            <div className="flex items-center justify-between pt-2 border-t border-[#E2E5DE]">
              <button
                onClick={() => {
                  window.dispatchEvent(
                    new CustomEvent("open-evidence-drawer", {
                      detail: { sourceId: reviewItems[reviewIndex].sourceId },
                    })
                  );
                }}
                className="text-xs text-[#536F00] hover:underline flex items-center gap-1 font-medium cursor-pointer"
              >
                <span>Inspect primary evidence</span>
                <ExternalLink className="w-3 h-3" />
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (reviewIndex < reviewItems.length - 1) {
                      setReviewIndex(reviewIndex + 1);
                    } else {
                      setReviewMode(false);
                    }
                  }}
                  className="px-3.5 py-1.5 rounded-xl border border-[#E2E5DE] hover:bg-[#F4F5F0] text-xs font-medium text-[#151515] cursor-pointer"
                >
                  Reject
                </button>
                <button
                  onClick={() => {
                    if (reviewIndex < reviewItems.length - 1) {
                      setReviewIndex(reviewIndex + 1);
                    } else {
                      setReviewMode(false);
                    }
                  }}
                  className="px-4 py-1.5 rounded-xl bg-[#536F00] hover:bg-[#435900] text-white text-xs font-semibold shadow-xs cursor-pointer flex items-center gap-1"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Approve & Execute</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
