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
    <div className="p-5 rounded-2xl matte-card space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#25282D] pb-3">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#FF5A00] font-semibold block">
            RADIAL HEALTH RADAR
          </span>
          <h3 className="text-sm font-bold text-white">Account Operational Health Map</h3>
          <p className="text-xs text-[#9A9FA8]">Closer to the center represents higher automated flight engagement</p>
        </div>
        <div className="flex items-center gap-3 text-[10px] font-mono">
          <span className="flex items-center gap-1 text-[#F4F4F5]">
            <span className="w-2 h-2 rounded-full bg-white" /> Good (3)
          </span>
          <span className="flex items-center gap-1 text-[#FFA066]">
            <span className="w-2 h-2 rounded-full bg-[#FFA066]" /> Watch (2)
          </span>
          <span className="flex items-center gap-1 text-[#FF5A00]">
            <span className="w-2 h-2 rounded-full bg-[#FF5A00]" /> Risk (3)
          </span>
        </div>
      </div>

      {/* Concentric Radar SVG */}
      <div className="relative w-full h-80 flex items-center justify-center">
        <svg viewBox="0 0 400 400" className="w-full h-full max-h-80">
          {/* Concentric Radar Circles */}
          {/* Outer Risk Ring */}
          <circle cx="200" cy="200" r="150" fill="none" stroke="#25282D" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="200" cy="200" r="148" fill="rgba(255, 90, 0, 0.02)" />
          {/* Middle Watch Ring */}
          <circle cx="200" cy="200" r="105" fill="none" stroke="#25282D" strokeWidth="1" />
          <circle cx="200" cy="200" r="103" fill="rgba(20, 22, 25, 0.4)" />
          {/* Inner Good Ring */}
          <circle cx="200" cy="200" r="60" fill="none" stroke="#363A42" strokeWidth="1.2" />
          <circle cx="200" cy="200" r="58" fill="rgba(20, 22, 25, 0.7)" />

          {/* Crosshair Lines */}
          <line x1="200" y1="35" x2="200" y2="365" stroke="#25282D" strokeWidth="0.75" />
          <line x1="35" y1="200" x2="365" y2="200" stroke="#25282D" strokeWidth="0.75" />

          {/* Ring Labels */}
          <text x="204" y="185" fill="#606570" fontSize="8" fontFamily="monospace">GOOD</text>
          <text x="204" y="115" fill="#606570" fontSize="8" fontFamily="monospace">WATCH</text>
          <text x="204" y="48" fill="#FF5A00" fontSize="8" fontFamily="monospace">RISK ZONE</text>

          {/* Center Hub Indicator */}
          <circle cx="200" cy="200" r="8" fill="#141619" stroke="#FF5A00" strokeWidth="1.5" />
          <circle cx="200" cy="200" r="3" fill="#FF5A00" />

          {/* Interactive Floating Entity Bubbles */}
          {nodes.map((node) => {
            const isHovered = hovered?.id === node.id;
            return (
              <g
                key={node.id}
                className="cursor-pointer transition-transform duration-200"
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
                    stroke={node.color}
                    strokeWidth="1.5"
                    opacity="0.6"
                    className="animate-ping"
                  />
                )}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={node.size}
                  fill="#0D0F12"
                  stroke={node.color}
                  strokeWidth={isHovered ? 2 : 1}
                />
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={node.size - 4}
                  fill={node.color}
                  opacity={node.ring === "RISK" ? 0.9 : 0.75}
                />
                <text
                  x={node.x}
                  y={node.y + 3}
                  textAnchor="middle"
                  fill="#050505"
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
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 p-3 rounded-xl bg-[#0D0F12] border border-[#25282D] shadow-2xl z-30 max-w-sm pointer-events-none animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between gap-2 border-b border-[#25282D] pb-1.5">
              <span className="text-xs font-bold text-white">{hovered.name}</span>
              <span className="text-[10px] font-mono text-[#FF5A00] font-semibold">{hovered.metric}</span>
            </div>
            <p className="text-[11px] text-[#9A9FA8] mt-1.5 leading-snug">{hovered.detail}</p>
          </div>
        )}
      </div>
    </div>
  );
};
