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
  // Light theme semantic palette
  const data = [
    { name: "Confirmed", value: confirmed, fill: "#398B46", description: "Agreed / Contractual Specification" },
    { name: "Active", value: active, fill: "#536F00", description: "Qualified Fleet Expansion & Offers" },
    { name: "At-Risk", value: atRisk, fill: "#E34B3D", description: "Blocked on DPIA / Flight Grounding" },
    { name: "Closed Won", value: closed, fill: "#171717", description: "Won Expansion Units" },
    { name: "Unverified", value: unsupported, fill: "#D5DAD0", description: "Unsupported Projections (Excluded)" },
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
        <div className="bg-white border border-[#E2E5DE] p-3 rounded-lg shadow-xl text-xs space-y-1">
          <p className="font-semibold text-[#151515]">{item.name}</p>
          <p className="font-mono text-sm text-[#536F00] font-bold">
            {formatCurrency(item.value)} ({currency}{item.value.toLocaleString()})
          </p>
          <p className="text-[11px] text-[#747A80]">{item.description}</p>
          {item.name === "Unverified" && (
            <p className="text-[10px] text-[#C78620] font-mono pt-1 border-t border-[#E2E5DE]">
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
            stroke="#747A80"
            fontSize={11}
            tickLine={false}
            axisLine={{ stroke: "#E2E5DE" }}
          />
          <YAxis
            stroke="#747A80"
            fontSize={11}
            tickLine={false}
            axisLine={{ stroke: "#E2E5DE" }}
            tickFormatter={formatCurrency}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(83, 111, 0, 0.05)" }} />
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
