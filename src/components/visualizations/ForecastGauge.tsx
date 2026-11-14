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
  const [currentPct, setCurrentPct] = React.useState(0);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPct(percentage);
    }, 150);
    return () => clearTimeout(timer);
  }, [percentage]);

  // SVG Arc calculation for semi-circle
  // Radius = 85, Center = (110, 105)
  // Arc from 180 deg to 0 deg
  const radius = 80;
  const strokeWidth = 16;
  const circumference = Math.PI * radius; // Half-circle circumference
  const strokeDashoffset = circumference - (currentPct / 100) * circumference;

  return (
    <div className="bg-white p-5 rounded-2xl border border-[#E2E5DE] shadow-sm relative overflow-hidden flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-start justify-between pb-3 border-b border-[#E2E5DE]">
        <div>
          <h3 className="text-base font-semibold text-[#151515] tracking-tight">
            Quarter forecast
          </h3>
          <p className="text-xs text-[#747A80] mt-0.5">
            Won so far plus open deals weighted by probability.
          </p>
        </div>

        <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#ECEFE5] border border-[#D5DAD0] text-xs font-mono text-[#536F00]">
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
                  stroke="#171717"
                  strokeWidth="3.5"
                />
              </pattern>
            </defs>

            {/* Background Arch (empty track) */}
            <path
              d="M 30 110 A 80 80 0 0 1 190 110"
              fill="none"
              stroke="#ECEFE5"
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
              className="transition-all duration-1400 ease-[cubic-bezier(0.22,1,0.36,1)]"
            />

            {/* Inner Accent Ring */}
            <path
              d="M 45 110 A 65 65 0 0 1 175 110"
              fill="none"
              stroke="#E2E5DE"
              strokeWidth="1"
              strokeDasharray="2 3"
            />
          </svg>

          {/* Center Metric Text */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-center">
            <div className="text-3xl font-extrabold text-[#151515] tracking-tight">
              {percentage}%
            </div>
            <div className="text-[11px] font-mono text-[#747A80] mt-0.5">
              of {targetAmount} target
            </div>
          </div>
        </div>
      </div>

      {/* Subtotals breakdown bar */}
      <div className="pt-4 border-t border-[#E2E5DE] grid grid-cols-3 gap-2 text-center">
        <div className="p-2 rounded-xl bg-[#F4F5F0] border border-[#E2E5DE]">
          <div className="flex items-center justify-center gap-1.5 text-[11px] font-mono text-[#747A80]">
            <span className="w-2 h-2 rounded-full bg-[#171717]" />
            <span>Won</span>
          </div>
          <div className="text-sm font-bold text-[#151515] mt-1">{wonAmount}</div>
        </div>

        <div className="p-2 rounded-xl bg-[#F4F5F0] border border-[#E2E5DE]">
          <div className="flex items-center justify-center gap-1.5 text-[11px] font-mono text-[#747A80]">
            <span className="w-2 h-2 rounded-full bg-[#536F00]" />
            <span>Weighted</span>
          </div>
          <div className="text-sm font-bold text-[#151515] mt-1">{weightedAmount}</div>
        </div>

        <div className="p-2 rounded-xl bg-[#F4F5F0] border border-[#E2E5DE]">
          <div className="flex items-center justify-center gap-1.5 text-[11px] font-mono text-[#747A80]">
            <span className="w-2 h-2 rounded-full border border-[#747A80]" />
            <span>Gap</span>
          </div>
          <div className="text-sm font-bold text-[#151515] mt-1">{gapAmount}</div>
        </div>
      </div>
    </div>
  );
};
