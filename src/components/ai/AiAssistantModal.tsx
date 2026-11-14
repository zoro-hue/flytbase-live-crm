"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Bot,
  Sparkles,
  X,
  Send,
  Copy,
  Check,
  Maximize2,
  Minimize2,
  Trash2,
  ShieldCheck,
  ExternalLink,
  ChevronRight,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  Clock,
  Radio,
  FileText,
} from "lucide-react";

interface StructuredSource {
  id: string;
  label: string;
  actionLink: string;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  category?: string;
  verifiedFacts?: string[];
  projections?: string[];
  recommendedActions?: string[];
  missingEvidence?: string[];
  sourceIds?: StructuredSource[];
  timestamp: string;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: "init-1",
    role: "assistant",
    content:
      "Hello! I am **FlytBase AI**, your enterprise CRM intelligence copilot. I am grounded in primary MCP flight telemetry, stakeholder paperwork, and contractual records for **Eastern Counties Police Alliance (A)** and **Aldermoor Industrial Group (B)**.\n\nHow can I help you analyze the accounts today?",
    category: "general",
    timestamp: "Just now",
  },
];

const SUGGESTED_QUESTIONS = [
  "What is the confirmed book worth?",
  "Who holds the power at Eastern Counties?",
  "What is about to go wrong across accounts?",
  "What are the top 3 urgent actions?",
  "Explain Event A dock inactivity",
  "What changed in the latest MCP sync?",
  "What evidence is missing for Aldermoor?",
];

export const AiAssistantModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Listen for custom trigger events from the TopNavbar or BottomCommandBar
  useEffect(() => {
    const handleOpen = (e: any) => {
      setIsOpen(true);
      if (e.detail?.query) {
        handleSendQuery(e.detail.query);
      }
    };

    window.addEventListener("open-ai-assistant", handleOpen);
    return () => window.removeEventListener("open-ai-assistant", handleOpen);
  }, []);

  const handleCopy = (id: string, text: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleClear = () => {
    setMessages(INITIAL_MESSAGES);
  };

  const handleSendQuery = async (queryText: string) => {
    const trimmed = queryText.trim();
    if (!trimmed || loading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: trimmed,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
        }),
      });

      const data = await res.json();

      if (data.success) {
        const assistantMsg: Message = {
          id: `asst-${Date.now()}`,
          role: "assistant",
          content: data.reply,
          category: data.category,
          verifiedFacts: data.verifiedFacts,
          projections: data.projections,
          recommendedActions: data.recommendedActions,
          missingEvidence: data.missingEvidence,
          sourceIds: data.sourceIds,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages((prev) => [...prev, assistantMsg]);
      } else {
        const errorMsg: Message = {
          id: `asst-err-${Date.now()}`,
          role: "assistant",
          content: `Unable to retrieve response: ${data.error || "Server connection error."}`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages((prev) => [...prev, errorMsg]);
      }
    } catch (err: any) {
      const errorMsg: Message = {
        id: `asst-err-${Date.now()}`,
        role: "assistant",
        content: `Connection error: ${err.message || "Failed to reach CRM AI service."}`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ===================================================================== */}
      {/* 1. PERSISTENT FLOATING ROBOT ASSISTANT (BOTTOM-LEFT)                  */}
      {/* ===================================================================== */}
      <div className="fixed bottom-4 left-4 z-40 select-none">
        <button
          onClick={() => setIsOpen(true)}
          className="group relative p-2 rounded-2xl bg-[#0D0F12] border border-[#25282D] hover:border-[#FF5A00]/50 shadow-2xl transition-all duration-350 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2.5"
          title="FlytBase AI Copilot — Grounded CRM Intelligence"
        >
          {/* Animated Robot Mascot */}
          <div className="relative w-9 h-9 rounded-xl bg-[#141619] border border-[#25282D] group-hover:border-[#FF5A00]/40 flex items-center justify-center overflow-hidden transition-colors duration-350">
            {/* Robot Float/Breathing Animation Container */}
            <div className="flex flex-col items-center animate-[bounce_4s_infinite]">
              {/* Antenna with Pulsing Orange Beacon */}
              <div className="w-1.5 h-1.5 bg-[#FF5A00] rounded-full mb-0.5 shadow-[0_0_6px_rgba(255,90,0,0.8)] animate-pulse" />

              {/* Robot Face Screen */}
              <div className="w-6 h-4.5 rounded-md bg-[#050505] border border-[#25282D] flex items-center justify-center gap-1 px-1">
                {/* Blinking Eye LEDs */}
                <div className="w-1.5 h-1.5 rounded-full bg-[#FF5A00] animate-[ping_3.5s_cubic-bezier(0,0,0.2,1)_infinite]" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#FF5A00] animate-[ping_3.5s_cubic-bezier(0,0,0.2,1)_infinite]" />
              </div>
            </div>
          </div>

          {/* Collapsed Pill Label (Reveals on Hover) */}
          <div className="hidden sm:flex flex-col text-left pr-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-white tracking-tight">FlytBase AI</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A00] animate-pulse" />
            </div>
            <span className="text-[10px] font-mono text-[#9A9FA8]">CRM Copilot</span>
          </div>

          {/* Sparkle Badge */}
          <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#FF5A00] flex items-center justify-center text-white shadow-sm">
            <Sparkles className="w-2.5 h-2.5 text-white" />
          </div>
        </button>
      </div>

      {/* ===================================================================== */}
      {/* 2. ELEGANT RIGHT-SIDE FLOATING AI COPILOT PANEL                       */}
      {/* ===================================================================== */}
      {isOpen && (
        <aside
          className={`fixed top-3 bottom-3 right-3 z-50 rounded-2xl glass-panel shadow-2xl flex flex-col overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isExpanded ? "w-[720px] max-w-[96vw]" : "w-[480px] max-w-[94vw]"
          }`}
        >
          {/* Panel Top Header */}
          <div className="px-4 py-3.5 border-b border-[#25282D] bg-[#050505] flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-[#141619] border border-[#25282D] flex items-center justify-center text-[#FF5A00] flex-shrink-0">
                <Bot className="w-4 h-4 text-[#FF5A00]" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-bold text-white tracking-tight truncate">
                    FlytBase AI Copilot
                  </h3>
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-[#141619] text-[#FF5A00] border border-[#FF5A00]/30 font-semibold flex-shrink-0">
                    MCP GROUNDED
                  </span>
                </div>
                <p className="text-[10px] text-[#9A9FA8] font-mono truncate">
                  Authoritative multi-account intelligence
                </p>
              </div>
            </div>

            {/* Window Controls */}
            <div className="flex items-center gap-1 flex-shrink-0">
              {/* Expand / Collapse Width */}
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 rounded-lg text-[#9A9FA8] hover:text-white hover:bg-[#141619] transition-colors cursor-pointer"
                title={isExpanded ? "Collapse to standard width" : "Expand side panel"}
              >
                {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>

              {/* Clear Chat */}
              <button
                onClick={handleClear}
                className="p-1.5 rounded-lg text-[#9A9FA8] hover:text-white hover:bg-[#141619] transition-colors cursor-pointer"
                title="Reset conversation"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>

              {/* Close Panel */}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-[#9A9FA8] hover:text-white hover:bg-[#141619] transition-colors cursor-pointer"
                title="Close Copilot"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Suggested Prompt Chips */}
          <div className="px-3.5 py-2 border-b border-[#25282D] bg-[#0A0C0E] flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
            <span className="text-[10px] font-mono text-[#606570] flex-shrink-0">Ask:</span>
            {SUGGESTED_QUESTIONS.map((q) => (
              <button
                key={q}
                onClick={() => handleSendQuery(q)}
                className="px-2.5 py-1 rounded-full bg-[#141619] hover:bg-[#1D2024] text-[11px] text-[#9A9FA8] hover:text-[#F4F4F5] border border-[#25282D] hover:border-[#FF5A00]/40 whitespace-nowrap transition-colors flex-shrink-0 cursor-pointer"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Conversation History Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[92%] p-4 rounded-2xl text-xs leading-relaxed transition-all ${
                    m.role === "user"
                      ? "bg-[#FF5A00] text-white rounded-br-sm shadow-md"
                      : "bg-[#141619] text-[#F4F4F5] rounded-bl-sm border border-[#25282D] shadow-sm space-y-3"
                  }`}
                >
                  {/* Message Body */}
                  <div className="whitespace-pre-wrap">{m.content}</div>

                  {/* Assistant Structured Data Breakdown */}
                  {m.role === "assistant" && (
                    <>
                      {/* Verified Facts Breakdown */}
                      {m.verifiedFacts && m.verifiedFacts.length > 0 && (
                        <div className="p-2.5 rounded-xl bg-[#0D0F12] border border-emerald-900/40 text-[11px] space-y-1">
                          <div className="flex items-center gap-1.5 text-emerald-400 font-semibold font-mono text-[10px]">
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                            <span>VERIFIED PRIMARY FACTS</span>
                          </div>
                          <ul className="list-disc list-inside space-y-0.5 text-[#D4D4D8]">
                            {m.verifiedFacts.map((f, i) => (
                              <li key={i}>{f}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Missing Evidence / Unknowns Warning */}
                      {m.missingEvidence && m.missingEvidence.length > 0 && (
                        <div className="p-2.5 rounded-xl bg-[#0D0F12] border border-red-900/40 text-[11px] space-y-1">
                          <div className="flex items-center gap-1.5 text-red-400 font-semibold font-mono text-[10px]">
                            <AlertTriangle className="w-3 h-3 text-red-400" />
                            <span>MISSING EVIDENCE & UNKNOWNS</span>
                          </div>
                          <ul className="list-disc list-inside space-y-0.5 text-[#D4D4D8]">
                            {m.missingEvidence.map((e, i) => (
                              <li key={i}>{e}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Projections / Unverified Claims */}
                      {m.projections && m.projections.length > 0 && (
                        <div className="p-2.5 rounded-xl bg-[#0D0F12] border border-amber-900/40 text-[11px] space-y-1">
                          <div className="flex items-center gap-1.5 text-amber-400 font-semibold font-mono text-[10px]">
                            <HelpCircle className="w-3 h-3 text-amber-400" />
                            <span>PROJECTIONS & CONTINGENCIES</span>
                          </div>
                          <ul className="list-disc list-inside space-y-0.5 text-[#D4D4D8]">
                            {m.projections.map((p, i) => (
                              <li key={i}>{p}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Sourced Provenance Citations */}
                      {m.sourceIds && m.sourceIds.length > 0 && (
                        <div className="pt-2 border-t border-[#25282D] flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-[#606570]">Sources:</span>
                            {m.sourceIds.map((s) => (
                              <button
                                key={s.id}
                                onClick={() => {
                                  window.dispatchEvent(
                                    new CustomEvent("open-evidence-drawer", {
                                      detail: { sourceId: s.id },
                                    })
                                  );
                                }}
                                className="px-2 py-0.5 rounded bg-[#0D0F12] border border-[#25282D] hover:border-[#FF5A00] text-[#FF5A00] transition-colors flex items-center gap-1 cursor-pointer"
                                title="Inspect primary record in Evidence Vault"
                              >
                                <ExternalLink className="w-2.5 h-2.5" />
                                <span>{s.label}</span>
                              </button>
                            ))}
                          </div>

                          {/* Copy Response Button */}
                          <button
                            onClick={() => handleCopy(m.id, m.content)}
                            className="flex items-center gap-1 text-[#9A9FA8] hover:text-white transition-colors cursor-pointer"
                            title="Copy response to clipboard"
                          >
                            {copiedId === m.id ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-400" />
                                <span className="text-emerald-400">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>

                <span className="text-[10px] font-mono text-[#606570] mt-1 px-1">
                  {m.timestamp}
                </span>
              </div>
            ))}

            {/* Loading Indicator */}
            {loading && (
              <div className="flex items-center gap-2 p-3.5 rounded-2xl bg-[#141619] border border-[#25282D] text-xs text-[#9A9FA8] max-w-[280px]">
                <Sparkles className="w-4 h-4 text-[#FF5A00] animate-spin" />
                <span>Synthesizing MCP evidence...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Panel Bottom Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendQuery(input);
            }}
            className="p-3 border-t border-[#25282D] bg-[#050505] flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about deals, DPIA, flights, or risks..."
              className="flex-1 bg-[#0D0F12] border border-[#25282D] rounded-xl px-3.5 py-2.5 text-xs text-[#F4F4F5] placeholder-[#606570] focus:outline-none focus:border-[#FF5A00] transition-colors"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="p-2.5 rounded-xl bg-[#FF5A00] hover:bg-[#E04F00] disabled:opacity-40 text-white transition-all duration-200 cursor-pointer active:scale-95 flex-shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </aside>
      )}
    </>
  );
};
