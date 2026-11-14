"use client";

import React, { useEffect, useState } from "react";
import { X, FileText, CheckCircle2, AlertTriangle, ShieldAlert, ArrowUpRight, Copy, Check } from "lucide-react";

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
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs transition-opacity duration-200">
      <div className="relative w-full max-w-xl h-full bg-crm-sidebar border-l border-crm-border flex flex-col shadow-2xl animate-in slide-in-from-right duration-200">
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-crm-border bg-crm-navbar">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-crm-orange/10 border border-crm-orange/20 flex items-center justify-center text-crm-orange">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-medium text-crm-orange">{sourceId}</span>
                <span className="text-xs text-crm-muted">•</span>
                <span className="text-xs text-crm-secondary">{record?.accountName || "All Accounts"}</span>
              </div>
              <h2 className="text-sm font-semibold text-crm-text truncate max-w-md">
                {record?.title || "Evidence Record"}
              </h2>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 rounded hover:bg-crm-card text-crm-muted hover:text-crm-text transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-crm-muted space-y-3">
              <div className="w-6 h-6 border-2 border-crm-orange border-t-transparent rounded-full animate-spin" />
              <p className="text-xs">Retrieving verified source from MCP data store...</p>
            </div>
          ) : record ? (
            <>
              {/* Provenance Metadata Grid */}
              <div className="grid grid-cols-2 gap-3 p-4 rounded bg-crm-card border border-crm-border text-xs">
                <div>
                  <span className="text-crm-muted">Source Type</span>
                  <p className="font-medium text-crm-text capitalize mt-0.5">{record.sourceType.replace(/_/g, " ")}</p>
                </div>
                <div>
                  <span className="text-crm-muted">Account</span>
                  <p className="font-medium text-crm-text mt-0.5">{record.accountName}</p>
                </div>
                {record.date && (
                  <div>
                    <span className="text-crm-muted">Record Date / Minute</span>
                    <p className="font-medium text-crm-text mt-0.5">{record.date}</p>
                  </div>
                )}
                {record.saidBy && (
                  <div>
                    <span className="text-crm-muted">Attributed Speaker</span>
                    <p className="font-medium text-crm-text mt-0.5">{record.saidBy}</p>
                  </div>
                )}
                {record.verifiedBy && (
                  <div className="col-span-2">
                    <span className="text-crm-muted">Verification Source</span>
                    <p className="font-medium text-emerald-400 mt-0.5 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Verified against {record.verifiedBy}
                    </p>
                  </div>
                )}
                {record.path && (
                  <div className="col-span-2">
                    <span className="text-crm-muted">File / Repository Path</span>
                    <p className="font-mono text-crm-secondary mt-0.5 break-all">{record.path}</p>
                  </div>
                )}
              </div>

              {/* Limitation / Unverified Warning if applicable */}
              {record.limitations && (
                <div className="p-3.5 rounded bg-amber-500/10 border border-amber-500/30 text-xs flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-amber-300">Data Limitation Notice</span>
                    <p className="text-amber-200/80 mt-0.5 leading-relaxed">{record.limitations}</p>
                  </div>
                </div>
              )}

              {/* Extracted Key Fact / Quote */}
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-crm-muted">
                  Extracted Evidence Fact
                </span>
                <div className="p-4 rounded bg-crm-elevated border border-crm-border text-sm text-crm-text leading-relaxed font-sans">
                  &ldquo;{record.relevantQuote}&rdquo;
                </div>
              </div>

              {/* Raw Record Content Viewer */}
              {record.fullContent && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-crm-muted">
                      Full Source Record
                    </span>
                    <button
                      onClick={handleCopy}
                      className="inline-flex items-center gap-1 text-xs text-crm-secondary hover:text-crm-text transition-colors"
                    >
                      {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copied ? "Copied" : "Copy Content"}</span>
                    </button>
                  </div>
                  <pre className="p-4 rounded bg-black/60 border border-crm-border text-xs font-mono text-crm-secondary overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-96">
                    {record.fullContent}
                  </pre>
                </div>
              )}
            </>
          ) : (
            <div className="py-20 text-center text-crm-muted text-sm">
              Source record details unavailable.
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        <div className="px-6 py-3 border-t border-crm-border bg-crm-navbar flex items-center justify-between text-xs text-crm-muted">
          <span>Questathon MCP Verified Source</span>
          <button
            onClick={() => setIsOpen(false)}
            className="px-3 py-1.5 rounded bg-crm-card hover:bg-crm-elevated text-crm-text border border-crm-border transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
