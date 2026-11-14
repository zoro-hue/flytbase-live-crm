"use client";

import React from "react";
import { FileText, ExternalLink } from "lucide-react";

interface EvidenceBadgeProps {
  sourceId: string;
  sourceName?: string;
  onClick?: (sourceId: string) => void;
  className?: string;
}

export const EvidenceBadge: React.FC<EvidenceBadgeProps> = ({
  sourceId,
  sourceName,
  onClick,
  className = "",
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onClick) {
      onClick(sourceId);
    } else {
      window.dispatchEvent(new CustomEvent("open-evidence-drawer", { detail: { sourceId } }));
    }
  };

  const displayName = sourceName || sourceId;

  return (
    <button
      type="button"
      onClick={handleClick}
      title={`View verified source: ${displayName}`}
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-mono font-medium text-[#FF6B1A] bg-[#FF5500]/10 border border-[#FF5500]/25 hover:border-[#FF5500]/60 transition-all duration-150 cursor-pointer ${className}`}
    >
      <FileText className="w-3 h-3 flex-shrink-0 text-[#FF5500]" />
      <span className="truncate max-w-[160px]">{displayName}</span>
      <ExternalLink className="w-2.5 h-2.5 opacity-60 flex-shrink-0" />
    </button>
  );
};
