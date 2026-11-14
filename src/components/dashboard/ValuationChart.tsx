"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface ValuationChartProps {
  confirmed: number;
  active: number;
  atRisk: number;
  closed: number;
  unsupported: number;
  currency: string;
}

export const ValuationChart: React.FC<ValuationChartProps> = ({
  confirmed,
  active,
  atRisk,
  closed,
  unsupported,
  currency,
}) => {
  // Cohesive pitch-black and deep orange palette
  const data = [
    { name: "Confirmed", value: confirmed, fill: "#E5E7EB", description: "Agreed / Contractual Specification" },
    { name: "Active", value: active, fill: "#FF5500", description: "Qualified Fleet Expansion & Offers" },
    { name: "At-Risk", value: atRisk, fill: "#C84610", description: "Blocked on DPIA / Flight Grounding" },
    { name: "Closed Won", value: closed, fill: "#8A909C", description: "Won Expansion Units" },
    { name: "Unverified", value: unsupported, fill: "#272A32", description: "Unsupported Projections (Excluded)" },
  ];

  const formatCurrency = (val: number) => {
    if (val >= 1000000) return `${currency}${(val / 1000000).toFixed(1)}M`;
    if (val >= 1000) return `${currency}${(val / 1000).toFixed(0)}k`;
    return `${currency}${val}`;
  };

  const CustomTooltip = ({ active: isTooltipActive, payload }: any) => {
    if (isTooltipActive && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-[#08080A] border border-[#1C1F26] p-3 rounded-lg shadow-2xl text-xs space-y-1">
          <p className="font-semibold text-[#F4F4F5]">{item.name}</p>
          <p className="font-mono text-sm text-[#FF5500]">
            {formatCurrency(item.value)} ({currency}{item.value.toLocaleString()})
          </p>
          <p className="text-[11px] text-[#8E929E]">{item.description}</p>
          {item.name === "Unverified" && (
            <p className="text-[10px] text-[#FF5500] font-mono pt-1 border-t border-[#1C1F26]">
              * Excluded from confirmed pipeline totals
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -15, bottom: 20 }}>
          <XAxis
            dataKey="name"
            stroke="#606570"
            fontSize={11}
            tickLine={false}
            axisLine={{ stroke: "#1C1F26" }}
          />
          <YAxis
            stroke="#606570"
            fontSize={11}
            tickLine={false}
            axisLine={{ stroke: "#1C1F26" }}
            tickFormatter={formatCurrency}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255, 85, 0, 0.04)" }} />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
