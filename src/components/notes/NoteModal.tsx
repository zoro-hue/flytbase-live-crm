"use client";

import React, { useState, useEffect } from "react";
import { X, Send, AlertCircle, CheckCircle2, Clock, Tag } from "lucide-react";

interface NoteModalProps {
  initialAccount?: "A" | "B" | "General";
  initialKind?: string;
  initialTitle?: string;
  onNoteCreated?: () => void;
}

export const NoteModal: React.FC<NoteModalProps> = ({
  initialAccount = "A",
  initialKind = "note",
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/25 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-white border border-[#E2E5DE] rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E2E5DE] bg-[#F4F5F0]">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#ECEFE5] border border-[#D5DAD0] flex items-center justify-center text-[#536F00] text-xs font-bold shadow-xs">
              ✎
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#151515]">Write Note to MCP Server</h3>
              <p className="text-[10px] text-[#747A80]">Official MCP write_note JSON-RPC method</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 rounded-lg text-[#747A80] hover:text-[#151515] hover:bg-[#E2E5DE] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 bg-white">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-[#747A80] mb-1">Target Account</label>
              <select
                value={account}
                onChange={(e) => setAccount(e.target.value)}
                className="w-full bg-[#F4F5F0] border border-[#E2E5DE] rounded-lg px-3 py-1.5 text-xs text-[#151515] focus:outline-none focus:border-[#536F00]"
              >
                <option value="A">Eastern Counties (Account A)</option>
                <option value="B">Aldermoor Industrial (Account B)</option>
                <option value="General">General / All Accounts</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-[#747A80] mb-1">Note Category / Kind</label>
              <select
                value={kind}
                onChange={(e) => setKind(e.target.value)}
                className="w-full bg-[#F4F5F0] border border-[#E2E5DE] rounded-lg px-3 py-1.5 text-xs text-[#151515] focus:outline-none focus:border-[#536F00]"
              >
                <option value="note">General Note (note)</option>
                <option value="task">Operational Task (task)</option>
                <option value="risk">Risk Item (risk)</option>
                <option value="next_step">Next Step / Action (next_step)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#747A80] mb-1">Note Title (Optional)</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Progress on Westmere Docks Inspection"
              className="w-full bg-[#F4F5F0] border border-[#E2E5DE] rounded-lg px-3 py-1.5 text-xs text-[#151515] placeholder-[#747A80] focus:outline-none focus:border-[#536F00]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#747A80] mb-1">
              Note Content <span className="text-[#E34B3D]">*</span>
            </label>
            <textarea
              rows={4}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter details to write directly to the Questathon MCP server repository..."
              className="w-full bg-[#F4F5F0] border border-[#E2E5DE] rounded-lg p-3 text-xs text-[#151515] placeholder-[#747A80] focus:outline-none focus:border-[#536F00]"
              required
            />
          </div>

          {/* Status Message */}
          {message && (
            <div
              className={`p-3 rounded-lg text-xs flex items-center gap-2 ${
                status === "success"
                  ? "bg-[#ECEFE5] border border-[#D5DAD0] text-[#536F00]"
                  : status === "queued"
                  ? "bg-[#FEF3C7] border border-[#FDE68A] text-[#C78620]"
                  : status === "error"
                  ? "bg-[#FDE8E8] border border-[#F8B4B4] text-[#E34B3D]"
                  : "bg-[#F4F5F0] border border-[#E2E5DE] text-[#747A80]"
              }`}
            >
              {status === "success" && <CheckCircle2 className="w-4 h-4 text-[#536F00] flex-shrink-0" />}
              {status === "queued" && <Clock className="w-4 h-4 text-[#C78620] flex-shrink-0" />}
              {status === "error" && <AlertCircle className="w-4 h-4 text-[#E34B3D] flex-shrink-0" />}
              <span>{message}</span>
            </div>
          )}

          {/* Modal Actions */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-[10px] text-[#747A80] font-mono">1 call/60s rate limit applies</span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-3.5 py-1.5 rounded-lg border border-[#E2E5DE] text-xs text-[#747A80] hover:text-[#151515] hover:bg-[#F4F5F0] transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={status === "submitting" || !text.trim()}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-[#171717] hover:bg-[#252525] disabled:opacity-40 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{status === "submitting" ? "Writing..." : "Write via MCP"}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
