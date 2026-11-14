"use client";

import React, { useState } from "react";

interface PathData {
  id: string;
  source: string;
  sourceVal: string;
  stage: string;
  outcome: string;
  value: string;
  color: string;
  sy: number;
  my: number;
  ey: number;
  height: number;
}

export const SankeyDealFlow: React.FC = () => {
  const [hoveredFlow, setHoveredFlow] = useState<PathData | null>(null);

  // Factual CRM Deal Flows
  const flows: PathData[] = [
    {
      id: "flow-1",
      source: "Public Safety 300-Dock Tender",
      sourceVal: "£1,500,000",
      stage: "Draft Framework Spec",
      outcome: "Confirmed Framework",
      value: "£1.5M",
      color: "#FF5A00",
      sy: 50,
      my: 60,
      ey: 60,
      height: 28,
    },
    {
      id: "flow-2",
      source: "Westmere & Metro Patrol Expansion",
      sourceVal: "£285,000",
      stage: "Qualified Active Offers",
      outcome: "In Play Active",
      value: "£285k",
      color: "#D4D4D8",
      sy: 100,
      my: 110,
      ey: 120,
      height: 16,
    },
    {
      id: "flow-3",
      source: "Tarn Valley 4-Dock Rollout",
      sourceVal: "£800,000",
      stage: "DPIA FB-10412 Blocker",
      outcome: "At-Risk Deal Value",
      value: "£800k",
      color: "#E04F00",
      sy: 140,
      my: 160,
      ey: 180,
      height: 22,
    },
    {
      id: "flow-4",
      source: "Aldermoor 14-Plant Expansion",
      sourceVal: "€320,000",
      stage: "ROI Unverified Audit",
      outcome: "At-Risk Deal Value",
      value: "€320k",
      color: "#E04F00",
      sy: 180,
      my: 185,
      ey: 210,
      height: 18,
    },
    {
      id: "flow-5",
      source: "European Plant 4 Expansion Docks",
      sourceVal: "€160,000",
      stage: "Contract Win Executed",
      outcome: "Closed Won Deals",
      value: "€160k",
      color: "#9A9FA8",
      sy: 220,
      my: 230,
      ey: 250,
      height: 14,
    },
  ];

  return (
    <div className="p-5 rounded-2xl bg-white border border-[#E2E5DE] shadow-sm space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E2E5DE] pb-3">
        <div>
          <h3 className="text-base font-semibold text-[#151515]">Lead flow</h3>
          <p className="text-xs text-[#747A80]">Where leads come from, how far they get, and how they end.</p>
        </div>

        {/* Quick metrics & Value/Count toggle */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-4 text-xs">
            <div>
              <span className="text-[10px] text-[#747A80] block font-mono">Win rate</span>
              <span className="font-bold text-[#151515]">83%</span>
              <span className="text-[10px] text-[#747A80] ml-1">5 of 6 closed</span>
            </div>
            <div>
              <span className="text-[10px] text-[#747A80] block font-mono">Best source</span>
              <span className="font-bold text-[#151515] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E34B3D]" /> Event
              </span>
              <span className="text-[10px] text-[#747A80]">100% win rate · 2 won</span>
            </div>
            <div>
              <span className="text-[10px] text-[#747A80] block font-mono">Still open</span>
              <span className="font-bold text-[#151515]">£1.08M</span>
              <span className="text-[10px] text-[#747A80] ml-1">12 deals in play</span>
            </div>
          </div>

          <div className="flex items-center rounded-lg border border-[#E2E5DE] bg-[#F4F5F0] p-0.5 text-[11px] font-medium text-[#747A80]">
            <span className="px-2 py-0.5 rounded-md bg-white text-[#151515] shadow-xs">Value</span>
            <span className="px-2 py-0.5 cursor-pointer hover:text-[#151515]">Count</span>
          </div>
        </div>
      </div>

      {/* SVG Diagram Canvas */}
      <div className="relative w-full h-72">
        {/* Column Labels */}
        <div className="absolute top-0 left-0 right-0 flex justify-between px-2 text-[10px] font-mono text-[#747A80] uppercase tracking-wider">
          <span>SOURCE</span>
          <span className="pl-12">STAGE REACHED</span>
          <span>OUTCOME</span>
        </div>

        <svg className="w-full h-full pt-6" viewBox="0 0 680 270" preserveAspectRatio="none">
          <defs>
            {flows.map((flow) => (
              <linearGradient key={flow.id} id={`grad-${flow.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={flow.color} stopOpacity="0.35" />
                <stop offset="50%" stopColor={flow.color} stopOpacity="0.5" />
                <stop offset="100%" stopColor={flow.color} stopOpacity="0.4" />
              </linearGradient>
            ))}
          </defs>

          {/* Connective Bezier Ribbon Bands */}
          {flows.map((flow) => {
            const isHovered = hoveredFlow?.id === flow.id;
            const x0 = 170;
            const x1 = 330;
            const x2 = 500;
            const d = `
              M ${x0} ${flow.sy}
              C ${(x0 + x1) / 2} ${flow.sy}, ${(x0 + x1) / 2} ${flow.my}, ${x1} ${flow.my}
              L ${x1} ${flow.my + flow.height}
              C ${(x0 + x1) / 2} ${flow.my + flow.height}, ${(x0 + x1) / 2} ${flow.sy + flow.height}, ${x0} ${flow.sy + flow.height}
              Z
              M ${x1} ${flow.my}
              C ${(x1 + x2) / 2} ${flow.my}, ${(x1 + x2) / 2} ${flow.ey}, ${x2} ${flow.ey}
              L ${x2} ${flow.ey + flow.height}
              C ${(x1 + x2) / 2} ${flow.ey + flow.height}, ${(x1 + x2) / 2} ${flow.my + flow.height}, ${x1} ${flow.my + flow.height}
              Z
            `;

            return (
              <path
                key={flow.id}
                d={d}
                fill={`url(#grad-${flow.id})`}
                stroke={isHovered ? "#151515" : flow.color}
                strokeWidth={isHovered ? 1.5 : 0.5}
                className="transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer"
                onMouseEnter={() => setHoveredFlow(flow)}
                onMouseLeave={() => setHoveredFlow(null)}
              />
            );
          })}

          {/* Left Source Nodes */}
          {flows.map((flow) => (
            <g key={`src-${flow.id}`}>
              <rect x="10" y={flow.sy} width="160" height={flow.height} rx="4" fill="#F4F5F0" stroke="#E2E5DE" strokeWidth="1" />
              <text x="18" y={flow.sy + flow.height / 2 + 3.5} fill="#151515" fontSize="9.5" fontWeight="500">
                {flow.source.slice(0, 22)}
              </text>
            </g>
          ))}

          {/* Middle Stage Node Bars */}
          <rect x="330" y="45" width="10" height="210" rx="3" fill="#171717" />
          <g>
            <text x="345" y="70" fill="#151515" fontSize="10" fontWeight="600">Draft Spec</text>
            <text x="345" y="82" fill="#747A80" fontSize="8.5">£1.5M agreed</text>
            <text x="345" y="130" fill="#151515" fontSize="10" fontWeight="600">Qualified Offers</text>
            <text x="345" y="142" fill="#747A80" fontSize="8.5">£285k in play</text>
            <text x="345" y="195" fill="#E34B3D" fontSize="10" fontWeight="600">Blocked / Audit</text>
            <text x="345" y="207" fill="#747A80" fontSize="8.5">£800k+€320k stalled</text>
          </g>

          {/* Right Outcome Node Bars */}
          <rect x="500" y="50" width="170" height="40" rx="4" fill="#F4F5F0" stroke="#398B46" strokeWidth="1" />
          <text x="512" y="68" fill="#151515" fontSize="10" fontWeight="600">Won</text>
          <text x="512" y="82" fill="#398B46" fontSize="11" fontWeight="700" fontFamily="monospace">£1,500,000</text>

          <rect x="500" y="105" width="170" height="34" rx="4" fill="#F4F5F0" stroke="#E2E5DE" strokeWidth="1" />
          <text x="512" y="120" fill="#151515" fontSize="9.5" fontWeight="500">In-Play Active Offers</text>
          <text x="512" y="132" fill="#747A80" fontSize="10" fontWeight="600" fontFamily="monospace">£285k + €50k</text>

          <rect x="500" y="155" width="170" height="55" rx="4" fill="#F4F5F0" stroke="#E34B3D" strokeWidth="1" />
          <text x="512" y="173" fill="#E34B3D" fontSize="10" fontWeight="600">Lost / At-Risk</text>
          <text x="512" y="188" fill="#E34B3D" fontSize="11" fontWeight="700" fontFamily="monospace">£800k + €320k</text>
          <text x="512" y="202" fill="#747A80" fontSize="8.5">DPIA ticket & Inactivity</text>

          <rect x="500" y="225" width="170" height="34" rx="4" fill="#F4F5F0" stroke="#171717" strokeWidth="1" />
          <text x="512" y="240" fill="#151515" fontSize="9.5" fontWeight="500">Still open</text>
          <text x="512" y="252" fill="#171717" fontSize="10" fontWeight="600" fontFamily="monospace">€160,000</text>
        </svg>

        {/* Hover Tooltip Card */}
        {hoveredFlow && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-3.5 py-1.5 rounded-xl bg-white border border-[#E2E5DE] shadow-xl text-xs flex items-center gap-3 z-30 pointer-events-none animate-in fade-in zoom-in-95">
            <span className="font-bold text-[#151515]">{hoveredFlow.source}</span>
            <span className="text-[#747A80]">→</span>
            <span className="text-[#151515]">{hoveredFlow.stage}</span>
            <span className="text-[#747A80]">→</span>
            <span className="font-mono font-bold text-[#536F00]">{hoveredFlow.value}</span>
          </div>
        )}
      </div>
    </div>
  );
};
