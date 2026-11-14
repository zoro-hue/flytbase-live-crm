"use client";

import React, { useState } from "react";

interface HealthNode {
  id: string;
  name: string;
  account: "Police (A)" | "Industrial (B)";
  ring: "GOOD" | "WATCH" | "RISK";
  metric: string;
  detail: string;
  x: number;
  y: number;
  size: number;
  color: string;
}

export const RadarHealthMap: React.FC = () => {
  const [hovered, setHovered] = useState<HealthNode | null>(null);

  const nodes: HealthNode[] = [
    // Center: GOOD (Active daily flights)
    {
      id: "wm",
      name: "Westmere Constabulary",
      account: "Police (A)",
      ring: "GOOD",
      metric: "18 Docks Active",
      detail: "Heavy daily automated patrol flights logging verified flight logs.",
      x: 185,
      y: 165,
      size: 16,
      color: "#F4F4F5",
    },
    {
      id: "mc",
      name: "Metro Central Police",
      account: "Police (A)",
      ring: "GOOD",
      metric: "9 Docks Operational",
      detail: "Operational city patrols active with zero safety incidents.",
      x: 215,
      y: 195,
      size: 13,
      color: "#F4F4F5",
    },
    {
      id: "p3579",
      name: "Plants 3, 5, 7, 9",
      account: "Industrial (B)",
      ring: "GOOD",
      metric: "4 Plants Active",
      detail: "Regular nightly perimeter patrol flights running automated schedules.",
      x: 175,
      y: 215,
      size: 14,
      color: "#D4D4D8",
    },

    // Middle: WATCH (Occasional or training)
    {
      id: "nw",
      name: "Norwold Police",
      account: "Police (A)",
      ring: "WATCH",
      metric: "4 Docks Training",
      detail: "Training flights only. Awaiting full shift readiness.",
      x: 265,
      y: 140,
      size: 11,
      color: "#FFA066",
    },
    {
      id: "p12610",
      name: "Plants 1, 2, 6, 10",
      account: "Industrial (B)",
      ring: "WATCH",
      metric: "Occasional Flights",
      detail: "Occasional test flights logged; full operational adoption pending.",
      x: 135,
      y: 250,
      size: 12,
      color: "#FFA066",
    },

    // Outer: RISK (Grounding, DPIA blocker, Departures)
    {
      id: "tv",
      name: "Tarn Valley Police",
      account: "Police (A)",
      ring: "RISK",
      metric: "4 Docks Grounded",
      detail: "Zero live flights for 4 months. Blocked on DPIA sign-off (FB-10412).",
      x: 295,
      y: 235,
      size: 15,
      color: "#FF5A00",
    },
    {
      id: "p4812",
      name: "Plants 4, 8, 12 (Event A)",
      account: "Industrial (B)",
      ring: "RISK",
      metric: "Silent Inactivity",
      detail: "Zero flights 2–29 Nov despite powered docks. No support tickets raised.",
      x: 105,
      y: 140,
      size: 15,
      color: "#FF5A00",
    },
    {
      id: "rhys",
      name: "Rhys Calder Departure",
      account: "Police (A)",
      ring: "RISK",
      metric: "Key Person Departure",
      detail: "Technical Specialist leaving in Jan 2027 for drone manufacturer.",
      x: 200,
      y: 75,
      size: 12,
      color: "#E04F00",
    },
  ];

  return (
    <div className="p-5 rounded-2xl bg-white border border-[#E2E5DE] shadow-sm space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E2E5DE] pb-3">
        <div>
          <h3 className="text-base font-semibold text-[#151515]">Client health map</h3>
          <p className="text-xs text-[#747A80]">Closer to the centre is healthier. Bubble size is operational value.</p>
        </div>
        <div className="flex items-center gap-3 text-[10px] font-mono">
          <span className="flex items-center gap-1 text-[#536F00]">
            <span className="w-2 h-2 rounded-full bg-[#536F00]" /> Good 3
          </span>
          <span className="flex items-center gap-1 text-[#C78620]">
            <span className="w-2 h-2 rounded-full bg-[#C78620]" /> Watch 2
          </span>
          <span className="flex items-center gap-1 text-[#E34B3D]">
            <span className="w-2 h-2 rounded-full bg-[#E34B3D]" /> Risk 3
          </span>
        </div>
      </div>

      {/* Concentric Radar SVG */}
      <div className="relative w-full h-80 flex items-center justify-center">
        <svg viewBox="0 0 400 400" className="w-full h-full max-h-80">
          {/* Concentric Radar Circles */}
          {/* Outer Risk Ring */}
          <circle cx="200" cy="200" r="150" fill="rgba(227, 75, 61, 0.04)" stroke="#E2E5DE" strokeWidth="1" strokeDasharray="3 3" />
          {/* Middle Watch Ring */}
          <circle cx="200" cy="200" r="105" fill="rgba(199, 134, 32, 0.05)" stroke="#E2E5DE" strokeWidth="1" />
          {/* Inner Good Ring */}
          <circle cx="200" cy="200" r="60" fill="rgba(83, 111, 0, 0.07)" stroke="#D5DAD0" strokeWidth="1.2" />

          {/* Crosshair Lines */}
          <line x1="200" y1="35" x2="200" y2="365" stroke="#E2E5DE" strokeWidth="0.75" />
          <line x1="35" y1="200" x2="365" y2="200" stroke="#E2E5DE" strokeWidth="0.75" />

          {/* Ring Labels */}
          <text x="204" y="185" fill="#536F00" fontSize="8" fontFamily="monospace" fontWeight="600">GOOD</text>
          <text x="204" y="115" fill="#C78620" fontSize="8" fontFamily="monospace" fontWeight="600">WATCH</text>
          <text x="204" y="48" fill="#E34B3D" fontSize="8" fontFamily="monospace" fontWeight="600">RISK</text>

          {/* Center Hub Indicator */}
          <circle cx="200" cy="200" r="24" fill="#FFFFFF" stroke="#E2E5DE" strokeWidth="1.5" />
          <text x="200" y="198" textAnchor="middle" fill="#747A80" fontSize="7" fontFamily="monospace">VALUE</text>
          <text x="200" y="209" textAnchor="middle" fill="#151515" fontSize="9" fontWeight="bold">£1.5M</text>

          {/* Interactive Floating Entity Bubbles */}
          {nodes.map((node) => {
            const isHovered = hovered?.id === node.id;
            const strokeColor = node.ring === "GOOD" ? "#536F00" : node.ring === "WATCH" ? "#C78620" : "#E34B3D";
            const fillColor = node.ring === "GOOD" ? "#ECEFE5" : node.ring === "WATCH" ? "#FEF3C7" : "#FDE8E8";
            return (
              <g
                key={node.id}
                className="cursor-pointer transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
                onMouseEnter={() => setHovered(node)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Bubble Ring / Pulse */}
                {isHovered && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={node.size + 4}
                    fill="none"
                    stroke={strokeColor}
                    strokeWidth="1.5"
                    opacity="0.6"
                    className="animate-ping"
                  />
                )}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={node.size}
                  fill={fillColor}
                  stroke={strokeColor}
                  strokeWidth={isHovered ? 2 : 1}
                />
                <text
                  x={node.x}
                  y={node.y + 3}
                  textAnchor="middle"
                  fill="#151515"
                  fontSize="8"
                  fontWeight="bold"
                  fontFamily="monospace"
                >
                  {node.id.toUpperCase().slice(0, 3)}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip Details */}
        {hovered && (
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 p-3 rounded-xl bg-white border border-[#E2E5DE] shadow-xl z-30 max-w-sm pointer-events-none animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between gap-2 border-b border-[#E2E5DE] pb-1.5">
              <span className="text-xs font-bold text-[#151515]">{hovered.name}</span>
              <span className="text-[10px] font-mono text-[#536F00] font-semibold">{hovered.metric}</span>
            </div>
            <p className="text-[11px] text-[#747A80] mt-1.5 leading-snug">{hovered.detail}</p>
          </div>
        )}
      </div>
    </div>
  );
};
