"use client";

import React from "react";
import { TrendingUp, AlertCircle, ArrowUpRight } from "lucide-react";

interface ForecastGaugeProps {
  wonAmount?: string;
  weightedAmount?: string;
  gapAmount?: string;
  targetAmount?: string;
  percentage?: number;
}

export const ForecastGauge: React.FC<ForecastGaugeProps> = ({
  wonAmount = "£1.5M",
  weightedAmount = "£420k",
  gapAmount = "£180k",
  targetAmount = "£2.1M",
  percentage = 73,
}) => {
  // SVG Arc calculation for semi-circle
  // Radius = 85, Center = (110, 105)
  // Arc from 180 deg to 0 deg
  const radius = 80;
  const strokeWidth = 16;
  const circumference = Math.PI * radius; // Half-circle circumference
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="matte-card p-5 rounded-2xl relative overflow-hidden flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-start justify-between pb-2 border-b border-[#25282D]">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF5A00]" />
            <h3 className="text-sm font-semibold text-[#F4F4F5] uppercase tracking-wider font-mono">
              Quarter Forecast
            </h3>
          </div>
          <p className="text-xs text-[#9A9FA8] mt-0.5">
            Confirmed framework plus probability-weighted pipeline
          </p>
        </div>

        <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#141619] border border-[#25282D] text-xs font-mono text-[#FF5A00]">
          <TrendingUp className="w-3 h-3" />
          <span>+18% MoM</span>
        </div>
      </div>

      {/* Semi-circular Arch */}
      <div className="flex flex-col items-center justify-center pt-4 pb-2 relative">
        <div className="relative w-56 h-32 flex justify-center">
          <svg className="w-56 h-32 overflow-visible" viewBox="0 0 220 120">
            {/* Pattern definition for the striped progress arc */}
            <defs>
              <pattern
                id="stripe-pattern"
                width="8"
                height="8"
                patternTransform="rotate(45 0 0)"
                patternUnits="userSpaceOnUse"
              >
                <line
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="8"
                  stroke="#FF5A00"
                  strokeWidth="3"
                />
              </pattern>
            </defs>

            {/* Background Arch (empty track) */}
            <path
              d="M 30 110 A 80 80 0 0 1 190 110"
              fill="none"
              stroke="#1C1F26"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />

            {/* Filled Progress Arch */}
            <path
              d="M 30 110 A 80 80 0 0 1 190 110"
              fill="none"
              stroke="url(#stripe-pattern)"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />

            {/* Inner Accent Ring */}
            <path
              d="M 45 110 A 65 65 0 0 1 175 110"
              fill="none"
              stroke="#25282D"
              strokeWidth="1"
              strokeDasharray="2 3"
            />
          </svg>

          {/* Center Metric Text */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-center">
            <div className="text-3xl font-extrabold text-white tracking-tight">
              {percentage}%
            </div>
            <div className="text-[11px] font-mono text-[#9A9FA8] mt-0.5">
              of {targetAmount} target
            </div>
          </div>
        </div>
      </div>

      {/* Subtotals breakdown bar */}
      <div className="pt-4 border-t border-[#25282D] grid grid-cols-3 gap-2 text-center">
        <div className="p-2 rounded-xl bg-[#0D0F12] border border-[#25282D]">
          <div className="flex items-center justify-center gap-1.5 text-[11px] font-mono text-[#9A9FA8]">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Won</span>
          </div>
          <div className="text-sm font-bold text-white mt-1">{wonAmount}</div>
        </div>

        <div className="p-2 rounded-xl bg-[#0D0F12] border border-[#25282D]">
          <div className="flex items-center justify-center gap-1.5 text-[11px] font-mono text-[#9A9FA8]">
            <span className="w-2 h-2 rounded-full bg-[#FF5A00]" />
            <span>Weighted</span>
          </div>
          <div className="text-sm font-bold text-white mt-1">{weightedAmount}</div>
        </div>

        <div className="p-2 rounded-xl bg-[#0D0F12] border border-[#25282D]">
          <div className="flex items-center justify-center gap-1.5 text-[11px] font-mono text-[#9A9FA8]">
            <span className="w-2 h-2 rounded-full bg-red-400" />
            <span>Gap</span>
          </div>
          <div className="text-sm font-bold text-white mt-1">{gapAmount}</div>
        </div>
      </div>
    </div>
  );
};
