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
  // Light theme semantic badges
  const badgeClasses = {
    orange: "bg-[#FFF4ED] text-[#FF5A00] border-[#FFD8BF]",
    green: "bg-[#ECEFE5] text-[#536F00] border-[#D5DAD0]",
    red: "bg-[#FDE8E8] text-[#E34B3D] border-[#F8B4B4] font-medium",
    amber: "bg-[#FEF3C7] text-[#C78620] border-[#FDE68A]",
    gray: "bg-[#F4F5F0] text-[#747A80] border-[#E2E5DE]",
  }[badgeColor];

  return (
    <div className="p-4 rounded-xl bg-white border border-[#E2E5DE] shadow-sm flex flex-col justify-between hover:border-[#D5DAD0] transition-colors">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-[#747A80] tracking-wide">{title}</span>
        {Icon && (
          <div className="w-7 h-7 rounded-lg bg-[#F4F5F0] border border-[#E2E5DE] flex items-center justify-center text-[#747A80]">
            <Icon className="w-3.5 h-3.5" />
          </div>
        )}
      </div>

      <div className="flex items-baseline justify-between mt-1">
        <span className="text-2xl font-bold tracking-tight text-[#151515] font-sans tabular-nums">
          {value}
        </span>
        {badge && (
          <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md border ${badgeClasses}`}>
            {badge}
          </span>
        )}
      </div>

      {(subtitle || trend) && (
        <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-[#F4F5F0] text-[11px] text-[#747A80]">
          <span className="truncate">{subtitle}</span>
          {trend && <span className="font-mono text-[#151515] font-medium flex-shrink-0">{trend}</span>}
        </div>
      )}
    </div>
  );
};
