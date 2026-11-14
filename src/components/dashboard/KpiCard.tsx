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
  const badgeClasses = {
    orange: "bg-[#FF762E]/15 text-[#FF762E] border-[#FF762E]/30",
    green: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    red: "bg-red-500/15 text-red-400 border-red-500/30",
    amber: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    gray: "bg-[#1B1F25] text-[#9298A2] border-[#272C34]",
  }[badgeColor];

  return (
    <div className="p-4 rounded-lg bg-[#15181D] border border-[#272C34] flex flex-col justify-between hover:border-[#383E49] transition-colors">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-[#9298A2] tracking-wide">{title}</span>
        {Icon && (
          <div className="w-7 h-7 rounded bg-[#1B1F25] flex items-center justify-center text-[#9298A2]">
            <Icon className="w-3.5 h-3.5" />
          </div>
        )}
      </div>

      <div className="flex items-baseline justify-between mt-1">
        <span className="text-2xl font-bold tracking-tight text-[#F4F4F5] font-sans tabular-nums">
          {value}
        </span>
        {badge && (
          <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${badgeClasses}`}>
            {badge}
          </span>
        )}
      </div>

      {(subtitle || trend) && (
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#272C34]/50 text-[11px] text-[#666D78]">
          <span className="truncate">{subtitle}</span>
          {trend && <span className="font-mono text-[#9298A2] flex-shrink-0">{trend}</span>}
        </div>
      )}
    </div>
  );
};
