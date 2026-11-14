"use client";

import React, { useEffect, useState } from "react";
import { X, FileText, CheckCircle2, AlertTriangle, Copy, Check } from "lucide-react";

export interface EvidenceRecord {
  sourceId: string;
  sourceName: string;
  sourceType: string;
  account: string;
  accountName: string;
  title: string;
  date?: string;
  relevantQuote: string;
  fullContent?: string;
  verifiedBy?: string;
  saidBy?: string;
  path?: string;
  limitations?: string;
}

export const EvidenceDrawer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [sourceId, setSourceId] = useState<string | null>(null);
  const [record, setRecord] = useState<EvidenceRecord | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleOpen = (e: any) => {
      const id = e.detail?.sourceId;
      if (id) {
        setSourceId(id);
        setIsOpen(true);
      }
    };

    window.addEventListener("open-evidence-drawer", handleOpen);
    return () => window.removeEventListener("open-evidence-drawer", handleOpen);
  }, []);

  useEffect(() => {
    if (!sourceId || !isOpen) return;

    let active = true;
    setLoading(true);

    fetch(`/api/evidence?id=${encodeURIComponent(sourceId)}`)
      .then((res) => res.json())
      .then((data) => {
        if (active && data.success) {
          setRecord(data.record);
        }
      })
      .catch((err) => console.error("Error loading evidence:", err))
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [sourceId, isOpen]);

  const handleCopy = () => {
    if (record?.fullContent) {
      navigator.clipboard.writeText(record.fullContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/25 backdrop-blur-sm transition-opacity duration-200">
      <div className="relative w-full max-w-xl h-full bg-white border-l border-[#E2E5DE] flex flex-col shadow-2xl animate-in slide-in-from-right duration-250">
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E2E5DE] bg-[#F4F5F0]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#ECEFE5] border border-[#D5DAD0] flex items-center justify-center text-[#536F00]">
              <FileText className="w-4 h-4 text-[#536F00]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-medium text-[#536F00]">{sourceId}</span>
                <span className="text-xs text-[#747A80]">•</span>
                <span className="text-xs text-[#747A80]">{record?.accountName || "All Accounts"}</span>
              </div>
              <h2 className="text-sm font-semibold text-[#151515] truncate max-w-md">
                {record?.title || "Evidence Record"}
              </h2>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 rounded-lg hover:bg-[#E2E5DE] text-[#747A80] hover:text-[#151515] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-[#747A80] space-y-3">
              <div className="w-6 h-6 border-2 border-[#536F00] border-t-transparent rounded-full animate-spin" />
              <p className="text-xs">Retrieving verified source from MCP data store...</p>
            </div>
          ) : record ? (
            <>
              {/* Provenance Metadata Grid */}
              <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-[#F4F5F0] border border-[#E2E5DE] text-xs">
                <div>
                  <span className="text-[#747A80]">Source Type</span>
                  <p className="font-medium text-[#151515] capitalize mt-0.5">{record.sourceType.replace(/_/g, " ")}</p>
                </div>
                <div>
                  <span className="text-[#747A80]">Account</span>
                  <p className="font-medium text-[#151515] mt-0.5">{record.accountName}</p>
                </div>
                {record.date && (
                  <div>
                    <span className="text-[#747A80]">Record Date / Minute</span>
                    <p className="font-medium text-[#151515] mt-0.5">{record.date}</p>
                  </div>
                )}
                {record.saidBy && (
                  <div>
                    <span className="text-[#747A80]">Attributed Speaker</span>
                    <p className="font-medium text-[#536F00] mt-0.5">{record.saidBy}</p>
                  </div>
                )}
                {record.path && (
                  <div className="col-span-2">
                    <span className="text-[#747A80]">Source Path / URL</span>
                    <p className="font-mono text-[11px] text-[#151515] mt-0.5 break-all">{record.path}</p>
                  </div>
                )}
              </div>

              {/* Verified Fact or Extracted Quote */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-[#151515] uppercase tracking-wider font-mono">
                  Verified Factual Statement
                </span>
                <div className="p-4 rounded-xl bg-[#F4F5F0] border border-[#E2E5DE] text-xs text-[#151515] leading-relaxed">
                  &ldquo;{record.relevantQuote}&rdquo;
                </div>
              </div>

              {/* Audit Warning / Limitations */}
              {record.limitations && (
                <div className="p-3.5 rounded-xl bg-[#FEF3C7] border border-[#FDE68A] text-xs text-[#C78620] space-y-1">
                  <div className="flex items-center gap-1.5 font-semibold text-[#C78620]">
                    <AlertTriangle className="w-4 h-4 text-[#C78620]" />
                    <span>Evidence Boundary & Audit Caveat</span>
                  </div>
                  <p className="leading-relaxed">{record.limitations}</p>
                </div>
              )}

              {/* Raw Record Contents */}
              {record.fullContent && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#151515] uppercase tracking-wider font-mono">
                      Primary Record Excerpt
                    </span>
                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-1 text-[11px] text-[#747A80] hover:text-[#151515] font-mono cursor-pointer"
                    >
                      {copied ? <Check className="w-3 h-3 text-[#398B46]" /> : <Copy className="w-3 h-3" />}
                      <span>{copied ? "Copied" : "Copy Content"}</span>
                    </button>
                  </div>
                  <pre className="p-4 rounded-xl bg-[#F4F5F0] border border-[#E2E5DE] text-[11px] font-mono text-[#151515] overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-80">
                    {record.fullContent}
                  </pre>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20 text-[#747A80] text-xs">
              Record not found for ID: {sourceId}
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        <div className="px-6 py-3.5 border-t border-[#E2E5DE] bg-[#F4F5F0] flex items-center justify-between text-xs text-[#747A80]">
          <span className="font-mono">Verification: Primary Source Record</span>
          <button
            onClick={() => setIsOpen(false)}
            className="px-3.5 py-1.5 rounded-lg border border-[#E2E5DE] bg-white hover:bg-[#ECEFE5] text-[#151515] transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
