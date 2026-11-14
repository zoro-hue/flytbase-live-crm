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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-[#08080A] border border-[#1C1F26] rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1C1F26] bg-[#000000]">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#FF5500] flex items-center justify-center text-white text-xs font-bold shadow-md shadow-[#FF5500]/25">
              ✎
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#F4F4F5]">Write Note to MCP Server</h3>
              <p className="text-[10px] text-[#71717A]">Official MCP write_note JSON-RPC method</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 rounded-lg text-[#585E6A] hover:text-[#F4F4F5] hover:bg-[#14161C] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-[#8E929E] mb-1">Target Account</label>
              <select
                value={account}
                onChange={(e) => setAccount(e.target.value)}
                className="w-full bg-[#000000] border border-[#1C1F26] rounded-lg px-3 py-1.5 text-xs text-[#F4F4F5] focus:outline-none focus:border-[#FF5500]"
              >
                <option value="A">Eastern Counties (Account A)</option>
                <option value="B">Aldermoor Industrial (Account B)</option>
                <option value="General">General / All Accounts</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-[#8E929E] mb-1">Note Category / Kind</label>
              <select
                value={kind}
                onChange={(e) => setKind(e.target.value)}
                className="w-full bg-[#000000] border border-[#1C1F26] rounded-lg px-3 py-1.5 text-xs text-[#F4F4F5] focus:outline-none focus:border-[#FF5500]"
              >
                <option value="note">General Note (note)</option>
                <option value="task">Operational Task (task)</option>
                <option value="risk">Risk Item (risk)</option>
                <option value="next_step">Next Step / Action (next_step)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#8E929E] mb-1">Note Title (Optional)</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Progress on Westmere Docks Inspection"
              className="w-full bg-[#000000] border border-[#1C1F26] rounded-lg px-3 py-1.5 text-xs text-[#F4F4F5] placeholder-[#585E6A] focus:outline-none focus:border-[#FF5500]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#8E929E] mb-1">
              Note Content <span className="text-[#FF5500]">*</span>
            </label>
            <textarea
              rows={4}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter details to write directly to the Questathon MCP server repository..."
              className="w-full bg-[#000000] border border-[#1C1F26] rounded-lg p-3 text-xs text-[#F4F4F5] placeholder-[#585E6A] focus:outline-none focus:border-[#FF5500]"
              required
            />
          </div>

          {/* Status Message */}
          {message && (
            <div
              className={`p-3 rounded-lg text-xs flex items-center gap-2 ${
                status === "success"
                  ? "bg-[#14161C] border border-[#252832] text-[#E4E4E7]"
                  : status === "queued"
                  ? "bg-[#1C1208] border border-[#59260E] text-[#FFA066]"
                  : status === "error"
                  ? "bg-[#240C04] border border-[#8C2A00] text-[#FF5500]"
                  : "bg-[#000000] border border-[#1C1F26] text-[#8E929E]"
              }`}
            >
              {status === "success" && <CheckCircle2 className="w-4 h-4 text-[#FF5500] flex-shrink-0" />}
              {status === "queued" && <Clock className="w-4 h-4 text-[#FF8540] flex-shrink-0" />}
              {status === "error" && <AlertCircle className="w-4 h-4 text-[#FF5500] flex-shrink-0" />}
              <span>{message}</span>
            </div>
          )}

          {/* Modal Actions */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-[10px] text-[#585E6A] font-mono">1 call/60s rate limit applies</span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-3.5 py-1.5 rounded-lg border border-[#1C1F26] text-xs text-[#8E929E] hover:text-[#F4F4F5] hover:bg-[#14161C] transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={status === "submitting" || !text.trim()}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-[#FF5500] hover:bg-[#E04B00] disabled:opacity-40 text-white text-xs font-semibold shadow-md shadow-[#FF5500]/20 transition-all cursor-pointer"
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
