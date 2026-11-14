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
      // Dispatch custom event for global evidence drawer
      window.dispatchEvent(new CustomEvent("open-evidence-drawer", { detail: { sourceId } }));
    }
  };

  const displayName = sourceName || sourceId;

  return (
    <button
      type="button"
      onClick={handleClick}
      title={`View verified source: ${displayName}`}
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-mono font-medium text-crm-orange bg-crm-orange-subtle border border-crm-orange/20 hover:border-crm-orange/50 transition-colors cursor-pointer ${className}`}
    >
      <FileText className="w-3 h-3 flex-shrink-0" />
      <span className="truncate max-w-[160px]">{displayName}</span>
      <ExternalLink className="w-2.5 h-2.5 opacity-60 flex-shrink-0" />
    </button>
  );
};
