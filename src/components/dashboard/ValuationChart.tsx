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
  const data = [
    { name: "Confirmed", value: confirmed, fill: "#22C55E", description: "Agreed / Contractual" },
    { name: "Active Pipeline", value: active, fill: "#FF762E", description: "Qualified & Open Offers" },
    { name: "At-Risk", value: atRisk, fill: "#EF4444", description: "Blocked / At-Risk of Churn" },
    { name: "Closed Won", value: closed, fill: "#3B82F6", description: "Won Expansion Docks" },
    { name: "Unverified Claims", value: unsupported, fill: "#666D78", description: "Unsupported Projections" },
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
        <div className="bg-[#111419] border border-[#272C34] p-3 rounded shadow-xl text-xs space-y-1">
          <p className="font-semibold text-[#F4F4F5]">{item.name}</p>
          <p className="font-mono text-sm text-[#FF762E]">
            {formatCurrency(item.value)} ({currency}{item.value.toLocaleString()})
          </p>
          <p className="text-[11px] text-[#9298A2]">{item.description}</p>
          {item.name === "Unverified Claims" && (
            <p className="text-[10px] text-amber-400 font-mono pt-1 border-t border-[#272C34]">
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
            stroke="#666D78"
            fontSize={11}
            tickLine={false}
            axisLine={{ stroke: "#272C34" }}
          />
          <YAxis
            stroke="#666D78"
            fontSize={11}
            tickLine={false}
            axisLine={{ stroke: "#272C34" }}
            tickFormatter={formatCurrency}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255, 118, 46, 0.05)" }} />
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
