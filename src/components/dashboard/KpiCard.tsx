import React from "react";
import { LucideIcon } from "lucide-react";

interface KpiCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  badge?: string;
  badgeColor?: "orange" | "green" | "red" | "amber" | "gray";
  trend?: string;
}

export const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  badge,
  badgeColor = "gray",
  trend,
}) => {
  // Unified, high-end matte monochrome and deep orange palette (no rainbow colors)
  const badgeClasses = {
    orange: "bg-[#FF5500]/12 text-[#FF6519] border-[#FF5500]/30",
    green: "bg-[#15171C] text-[#E4E4E7] border-[#262A34]",
    red: "bg-[#FF5500]/15 text-[#FF6519] border-[#FF5500]/40 font-semibold",
    amber: "bg-[#1F1712] text-[#FFA066] border-[#4A2612]",
    gray: "bg-[#111216] text-[#808590] border-[#1C1F26]",
  }[badgeColor];

  return (
    <div className="p-4 rounded-xl matte-card flex flex-col justify-between">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-[#8E929E] tracking-wide">{title}</span>
        {Icon && (
          <div className="w-7 h-7 rounded-lg bg-[#14161C] border border-[#1C1F26] flex items-center justify-center text-[#8E929E]">
            <Icon className="w-3.5 h-3.5" />
          </div>
        )}
      </div>

      <div className="flex items-baseline justify-between mt-1">
        <span className="text-2xl font-bold tracking-tight text-[#F4F4F5] font-sans tabular-nums">
          {value}
        </span>
        {badge && (
          <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md border ${badgeClasses}`}>
            {badge}
          </span>
        )}
      </div>

      {(subtitle || trend) && (
        <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-[#1C1F26] text-[11px] text-[#606570]">
          <span className="truncate">{subtitle}</span>
          {trend && <span className="font-mono text-[#8E929E] flex-shrink-0">{trend}</span>}
        </div>
      )}
    </div>
  );
};
