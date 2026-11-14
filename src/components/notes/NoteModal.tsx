"use client";

import React, { useState, useEffect } from "react";
import { X, Send, AlertCircle, CheckCircle2, Clock, ShieldCheck, Tag } from "lucide-react";

interface NoteModalProps {
  initialAccount?: "A" | "B" | "General";
  initialKind?: string;
  initialTitle?: string;
  onNoteCreated?: () => void;
}

export const NoteModal: React.FC<NoteModalProps> = ({
  initialAccount = "A",
  initialKind = "general",
  initialTitle = "",
  onNoteCreated,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [account, setAccount] = useState<string>(initialAccount);
  const [kind, setKind] = useState<string>(initialKind);
  const [title, setTitle] = useState<string>(initialTitle);
  const [text, setText] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "queued" | "error">("idle");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const handleOpen = (e: any) => {
      if (e.detail?.account) setAccount(e.detail.account);
      if (e.detail?.kind) setKind(e.detail.kind);
      if (e.detail?.title) setTitle(e.detail.title);
      setIsOpen(true);
      setStatus("idle");
      setMessage("");
    };

    window.addEventListener("open-note-modal", handleOpen);
    return () => window.removeEventListener("open-note-modal", handleOpen);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) {
      setStatus("error");
      setMessage("Note content cannot be empty.");
      return;
    }

    setStatus("submitting");
    setMessage("Submitting note via MCP write_note tool...");

    try {
      const res = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          account,
          kind,
          title: title.trim() || undefined,
          text: text.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setStatus("error");
        setMessage(data.error || "Failed to write note via MCP");
      } else if (data.queued) {
        setStatus("queued");
        setMessage(data.message || "Note saved and queued for MCP sync.");
        setText("");
        if (onNoteCreated) onNoteCreated();
        setTimeout(() => setIsOpen(false), 2500);
      } else {
        setStatus("success");
        setMessage("Note written directly to MCP server successfully!");
        setText("");
        if (onNoteCreated) onNoteCreated();
        setTimeout(() => setIsOpen(false), 2000);
      }
    } catch (err: any) {
      setStatus("error");
      setMessage(err.message || "Network error submitting note");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-[#15181D] border border-[#272C34] rounded-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#272C34] bg-[#111419]">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-[#FF762E]/15 border border-[#FF762E]/30 flex items-center justify-center text-[#FF762E] text-xs font-bold">
              ✍
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#F4F4F5]">Write Note to MCP Server</h3>
              <p className="text-[11px] text-[#9298A2]">Uses official MCP write_note JSON-RPC method</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 rounded text-[#666D78] hover:text-[#F4F4F5] hover:bg-[#1B1F25] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-[#9298A2] mb-1">Target Account</label>
              <select
                value={account}
                onChange={(e) => setAccount(e.target.value)}
                className="w-full bg-[#101216] border border-[#272C34] rounded px-3 py-1.5 text-xs text-[#F4F4F5] focus:outline-none focus:border-[#FF762E]"
              >
                <option value="A">Eastern Counties (Account A)</option>
                <option value="B">Aldermoor Industrial (Account B)</option>
                <option value="General">General / All Accounts</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-[#9298A2] mb-1">Note Category / Kind</label>
              <select
                value={kind}
                onChange={(e) => setKind(e.target.value)}
                className="w-full bg-[#101216] border border-[#272C34] rounded px-3 py-1.5 text-xs text-[#F4F4F5] focus:outline-none focus:border-[#FF762E]"
              >
                <option value="note">General Note (note)</option>
                <option value="task">Operational Task (task)</option>
                <option value="risk">Risk Item (risk)</option>
                <option value="next_step">Next Step / Action (next_step)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#9298A2] mb-1">Title (Optional)</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Update on Westmere public event training"
              className="w-full bg-[#101216] border border-[#272C34] rounded px-3 py-1.5 text-xs text-[#F4F4F5] placeholder-[#666D78] focus:outline-none focus:border-[#FF762E]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#9298A2] mb-1">
              Note Text <span className="text-[#FF762E]">*</span>
            </label>
            <textarea
              rows={4}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write the factual note or observation to persist to the MCP server..."
              className="w-full bg-[#101216] border border-[#272C34] rounded p-3 text-xs text-[#F4F4F5] placeholder-[#666D78] focus:outline-none focus:border-[#FF762E] resize-none"
              required
            />
          </div>

          {/* Rate Limit Notice */}
          <div className="flex items-center gap-2 p-2.5 rounded bg-[#101216] border border-[#272C34] text-[11px] text-[#9298A2]">
            <Clock className="w-3.5 h-3.5 text-[#FF762E] flex-shrink-0" />
            <span>Strict 1-call-per-minute rate limit. Queued automatically if limit is active.</span>
          </div>

          {/* Feedback messages */}
          {status === "error" && (
            <div className="p-2.5 rounded bg-red-500/10 border border-red-500/30 text-xs text-red-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{message}</span>
            </div>
          )}
          {status === "queued" && (
            <div className="p-2.5 rounded bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 flex items-center gap-2">
              <Clock className="w-4 h-4 flex-shrink-0" />
              <span>{message}</span>
            </div>
          )}
          {status === "success" && (
            <div className="p-2.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>{message}</span>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#272C34]">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-3 py-1.5 rounded text-xs text-[#9298A2] hover:text-[#F4F4F5] hover:bg-[#1B1F25] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={status === "submitting" || !text.trim()}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded bg-[#FF762E] hover:bg-[#E6631F] disabled:opacity-50 text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{status === "submitting" ? "Sending to MCP..." : "Submit to MCP"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
