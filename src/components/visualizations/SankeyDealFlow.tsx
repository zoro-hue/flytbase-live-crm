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
    <div className="p-5 rounded-2xl matte-card space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#25282D] pb-3">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#FF5A00] font-semibold block">
            SANKEY FLOW DYNAMICS
          </span>
          <h3 className="text-sm font-bold text-white">Deal Flow & Pipeline Trajectory</h3>
          <p className="text-xs text-[#9A9FA8]">Where contractual opportunities originate, stall, and convert</p>
        </div>
        <div className="flex items-center gap-2 font-mono text-[10px]">
          <span className="flex items-center gap-1 text-[#FF5A00]">
            <span className="w-2 h-2 rounded-full bg-[#FF5A00]" /> Confirmed: £1.5M
          </span>
          <span className="flex items-center gap-1 text-[#E04F00]">
            <span className="w-2 h-2 rounded-full bg-[#E04F00]" /> At Risk: £800k+€320k
          </span>
        </div>
      </div>

      {/* SVG Diagram Canvas */}
      <div className="relative w-full h-72">
        {/* Column Labels */}
        <div className="absolute top-0 left-0 right-0 flex justify-between px-2 text-[10px] font-mono text-[#606570] uppercase">
          <span>Source & Account</span>
          <span className="pl-12">Stage Reached</span>
          <span>Commercial Outcome</span>
        </div>

        <svg className="w-full h-full pt-6" viewBox="0 0 680 270" preserveAspectRatio="none">
          <defs>
            {flows.map((flow) => (
              <linearGradient key={flow.id} id={`grad-${flow.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={flow.color} stopOpacity="0.45" />
                <stop offset="50%" stopColor={flow.color} stopOpacity="0.65" />
                <stop offset="100%" stopColor={flow.color} stopOpacity="0.5" />
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
                stroke={isHovered ? "#FFFFFF" : flow.color}
                strokeWidth={isHovered ? 1.5 : 0.5}
                className="transition-all duration-380 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer"
                onMouseEnter={() => setHoveredFlow(flow)}
                onMouseLeave={() => setHoveredFlow(null)}
              />
            );
          })}

          {/* Left Source Nodes */}
          {flows.map((flow) => (
            <g key={`src-${flow.id}`}>
              <rect x="10" y={flow.sy} width="160" height={flow.height} rx="4" fill="#141619" stroke="#25282D" strokeWidth="1" />
              <text x="18" y={flow.sy + flow.height / 2 + 3.5} fill="#F4F4F5" fontSize="9.5" fontWeight="500">
                {flow.source.slice(0, 22)}
              </text>
            </g>
          ))}

          {/* Middle Stage Node Bars */}
          <rect x="330" y="45" width="10" height="210" rx="3" fill="#25282D" />
          <g>
            <text x="345" y="70" fill="#F4F4F5" fontSize="10" fontWeight="600">Draft Spec</text>
            <text x="345" y="82" fill="#9A9FA8" fontSize="8.5">£1.5M agreed</text>
            <text x="345" y="130" fill="#F4F4F5" fontSize="10" fontWeight="600">Qualified Offers</text>
            <text x="345" y="142" fill="#9A9FA8" fontSize="8.5">£285k in play</text>
            <text x="345" y="195" fill="#E04F00" fontSize="10" fontWeight="600">Blocked / Audit</text>
            <text x="345" y="207" fill="#9A9FA8" fontSize="8.5">£800k+€320k stalled</text>
          </g>

          {/* Right Outcome Node Bars */}
          <rect x="500" y="50" width="170" height="40" rx="4" fill="#141619" stroke="#FF5A00" strokeWidth="1" />
          <text x="512" y="68" fill="#F4F4F5" fontSize="10" fontWeight="600">Confirmed Framework</text>
          <text x="512" y="82" fill="#FF5A00" fontSize="11" fontWeight="700" fontFamily="monospace">£1,500,000</text>

          <rect x="500" y="105" width="170" height="34" rx="4" fill="#141619" stroke="#25282D" strokeWidth="1" />
          <text x="512" y="120" fill="#F4F4F5" fontSize="9.5" fontWeight="500">In-Play Active Offers</text>
          <text x="512" y="132" fill="#D4D4D8" fontSize="10" fontWeight="600" fontFamily="monospace">£285k + €50k</text>

          <rect x="500" y="155" width="170" height="55" rx="4" fill="#141619" stroke="#E04F00" strokeWidth="1" />
          <text x="512" y="173" fill="#E04F00" fontSize="10" fontWeight="600">At-Risk Value (Blocked)</text>
          <text x="512" y="188" fill="#FF5A00" fontSize="11" fontWeight="700" fontFamily="monospace">£800k + €320k</text>
          <text x="512" y="202" fill="#9A9FA8" fontSize="8.5">DPIA ticket & Inactivity</text>

          <rect x="500" y="225" width="170" height="34" rx="4" fill="#141619" stroke="#25282D" strokeWidth="1" />
          <text x="512" y="240" fill="#F4F4F5" fontSize="9.5" fontWeight="500">Closed Won Contracts</text>
          <text x="512" y="252" fill="#9A9FA8" fontSize="10" fontWeight="600" fontFamily="monospace">€160,000</text>
        </svg>

        {/* Hover Tooltip Card */}
        {hoveredFlow && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-3.5 py-1.5 rounded-xl bg-[#0D0F12] border border-[#FF5A00]/50 shadow-2xl text-xs flex items-center gap-3 z-30 pointer-events-none animate-in fade-in zoom-in-95">
            <span className="font-bold text-white">{hoveredFlow.source}</span>
            <span className="text-[#9A9FA8]">→</span>
            <span className="text-[#D4D4D8]">{hoveredFlow.stage}</span>
            <span className="text-[#9A9FA8]">→</span>
            <span className="font-mono font-bold text-[#FF5A00]">{hoveredFlow.value}</span>
          </div>
        )}
      </div>
    </div>
  );
};
