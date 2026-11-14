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
      {/* Matches reference screenshot media_1794653411551_05f890dc.png        */}
      {/* ===================================================================== */}
      <div className="fixed bottom-4 left-4 z-40 select-none">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2 p-1.5 rounded-2xl bg-white/90 hover:bg-white backdrop-blur-md border border-[#E2E5DE] hover:border-[#536F00]/50 shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.12)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          title="FlytBase AI Copilot — Grounded CRM Intelligence"
        >
          {/* Exact Speech-Bubble Head Robot Mascot SVG */}
          <div className="relative w-11 h-11 flex items-center justify-center">
            <svg
              width="44"
              height="44"
              viewBox="0 0 44 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              <defs>
                {/* Body Metallic Gradient */}
                <linearGradient id="mascot-body-grad" x1="8" y1="8" x2="36" y2="38" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#2E333A" />
                  <stop offset="50%" stopColor="#202328" />
                  <stop offset="100%" stopColor="#131518" />
                </linearGradient>

                {/* Antenna Star Glow */}
                <filter id="star-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="1" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>

                {/* Cyan LED Glow */}
                <filter id="cyan-glow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="1" result="glow" />
                  <feComposite in="SourceGraphic" in2="glow" operator="over" />
                </filter>
              </defs>

              {/* Floor Shadow */}
              <ellipse
                cx="22"
                cy="42"
                rx="12"
                ry="1.8"
                fill="rgba(0,0,0,0.14)"
                className="group-hover:scale-110 transition-transform duration-300"
              />

              {/* Floating Head Group with Subtle Breathing Animation */}
              <g className="animate-[bounce_3.5s_ease-in-out_infinite]">
                {/* Antenna Stalk */}
                <rect x="21" y="2" width="2" height="6" rx="1" fill="#2B2F36" stroke="#1B1E22" strokeWidth="0.5" />

                {/* Antenna Lime-Green 4-point Star Beacon */}
                <g filter="url(#star-glow)">
                  <path
                    d="M22 0.5L23.5 3L26 3.5L23.5 4L22 6.5L20.5 4L18 3.5L20.5 3Z"
                    fill="#A3E635"
                  />
                  <circle cx="22" cy="3.5" r="1" fill="#FFFFFF" />
                </g>

                {/* Left Ear Nub */}
                <rect x="3.5" y="16" width="3.5" height="11" rx="1.75" fill="#15171A" stroke="#2D3138" strokeWidth="0.75" />

                {/* Right Ear Nub */}
                <rect x="37" y="16" width="3.5" height="11" rx="1.75" fill="#15171A" stroke="#2D3138" strokeWidth="0.75" />

                {/* Main Speech-Bubble Head (Rounded Rectangle + Bottom-Left Tail) */}
                <path
                  d="M13 8C8.58 8 5 11.58 5 16V26C5 30.42 8.58 34 13 34H14.5L12 39.5L19 34H31C35.42 34 39 30.42 39 26V16C39 11.58 35.42 8 31 8H13Z"
                  fill="url(#mascot-body-grad)"
                  stroke="#383D47"
                  strokeWidth="1.2"
                />

                {/* Inner Screen Bezel */}
                <rect
                  x="9.5"
                  y="12.5"
                  width="25"
                  height="17"
                  rx="5.5"
                  fill="#0B0D10"
                  stroke="#1E2229"
                  strokeWidth="0.9"
                />

                {/* Glowing Cyan-Blue Eyes */}
                <g filter="url(#cyan-glow)">
                  <ellipse cx="16.5" cy="19.5" rx="2.5" ry="3" fill="#67E8F9" />
                  <ellipse cx="27.5" cy="19.5" rx="2.5" ry="3" fill="#67E8F9" />
                  {/* Eye Pupils / Highlights */}
                  <circle cx="17.5" cy="18.5" r="0.8" fill="#FFFFFF" />
                  <circle cx="28.5" cy="18.5" r="0.8" fill="#FFFFFF" />
                </g>

                {/* Smiling Mouth Line */}
                <path
                  d="M19.5 24.5C20.5 26 23.5 26 24.5 24.5"
                  stroke="#67E8F9"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  fill="none"
                  filter="url(#cyan-glow)"
                />
              </g>
            </svg>
          </div>

          {/* Pill Label */}
          <div className="flex flex-col text-left pr-2">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-[#151515] tracking-tight">Ask FlytBase</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#536F00] animate-pulse" />
            </div>
            <span className="text-[10px] font-mono text-[#747A80]">CRM Copilot</span>
          </div>
        </button>
      </div>

      {/* ===================================================================== */}
      {/* 2. ELEGANT RIGHT-SIDE FLOATING AI COPILOT PANEL                       */}
      {/* ===================================================================== */}
      {isOpen && (
        <aside
          className={`fixed top-3 bottom-3 right-3 z-50 rounded-2xl bg-white/95 backdrop-blur-xl border border-[#E2E5DE] shadow-[0_20px_60px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isExpanded ? "w-[720px] max-w-[96vw]" : "w-[480px] max-w-[94vw]"
          }`}
        >
          {/* Panel Top Header */}
          <div className="px-4 py-3.5 border-b border-[#E2E5DE] bg-[#F4F5F0] flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-white border border-[#E2E5DE] flex items-center justify-center text-[#536F00] flex-shrink-0 shadow-sm">
                <Bot className="w-4 h-4 text-[#536F00]" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-bold text-[#151515] tracking-tight truncate">
                    FlytBase AI Copilot
                  </h3>
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-[#ECEFE5] text-[#536F00] border border-[#D5DAD0] font-semibold flex-shrink-0">
                    MCP GROUNDED
                  </span>
                </div>
                <p className="text-[10px] text-[#747A80] font-mono truncate">
                  Authoritative multi-account intelligence
                </p>
              </div>
            </div>

            {/* Window Controls */}
            <div className="flex items-center gap-1 flex-shrink-0">
              {/* Expand / Collapse Width */}
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 rounded-lg text-[#747A80] hover:text-[#151515] hover:bg-[#E2E5DE] transition-colors cursor-pointer"
                title={isExpanded ? "Collapse to standard width" : "Expand side panel"}
              >
                {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>

              {/* Clear Chat */}
              <button
                onClick={handleClear}
                className="p-1.5 rounded-lg text-[#747A80] hover:text-[#151515] hover:bg-[#E2E5DE] transition-colors cursor-pointer"
                title="Reset conversation"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>

              {/* Close Panel */}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-[#747A80] hover:text-[#151515] hover:bg-[#E2E5DE] transition-colors cursor-pointer"
                title="Close Copilot"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Suggested Prompt Chips */}
          <div className="px-3.5 py-2 border-b border-[#E2E5DE] bg-white flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
            <span className="text-[10px] font-mono text-[#747A80] flex-shrink-0">Ask:</span>
            {SUGGESTED_QUESTIONS.map((q) => (
              <button
                key={q}
                onClick={() => handleSendQuery(q)}
                className="px-2.5 py-1 rounded-full bg-[#F4F5F0] hover:bg-[#ECEFE5] text-[11px] text-[#747A80] hover:text-[#151515] border border-[#E2E5DE] whitespace-nowrap transition-colors flex-shrink-0 cursor-pointer"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Conversation History Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[92%] p-4 rounded-2xl text-xs leading-relaxed transition-all ${
                    m.role === "user"
                      ? "bg-[#171717] text-white rounded-br-sm shadow-sm"
                      : "bg-[#F4F5F0] text-[#151515] rounded-bl-sm border border-[#E2E5DE] shadow-sm space-y-3"
                  }`}
                >
                  {/* Message Body */}
                  <div className="whitespace-pre-wrap">{m.content}</div>

                  {/* Assistant Structured Data Breakdown */}
                  {m.role === "assistant" && (
                    <>
                      {/* Verified Facts Breakdown */}
                      {m.verifiedFacts && m.verifiedFacts.length > 0 && (
                        <div className="p-2.5 rounded-xl bg-white border border-[#398B46]/30 text-[11px] space-y-1">
                          <div className="flex items-center gap-1.5 text-[#398B46] font-semibold font-mono text-[10px]">
                            <CheckCircle2 className="w-3 h-3 text-[#398B46]" />
                            <span>VERIFIED PRIMARY FACTS</span>
                          </div>
                          <ul className="list-disc list-inside space-y-0.5 text-[#151515]">
                            {m.verifiedFacts.map((f, i) => (
                              <li key={i}>{f}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Missing Evidence / Unknowns Warning */}
                      {m.missingEvidence && m.missingEvidence.length > 0 && (
                        <div className="p-2.5 rounded-xl bg-white border border-[#E34B3D]/30 text-[11px] space-y-1">
                          <div className="flex items-center gap-1.5 text-[#E34B3D] font-semibold font-mono text-[10px]">
                            <AlertTriangle className="w-3 h-3 text-[#E34B3D]" />
                            <span>MISSING EVIDENCE & UNKNOWNS</span>
                          </div>
                          <ul className="list-disc list-inside space-y-0.5 text-[#151515]">
                            {m.missingEvidence.map((e, i) => (
                              <li key={i}>{e}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Projections / Unverified Claims */}
                      {m.projections && m.projections.length > 0 && (
                        <div className="p-2.5 rounded-xl bg-white border border-[#C78620]/30 text-[11px] space-y-1">
                          <div className="flex items-center gap-1.5 text-[#C78620] font-semibold font-mono text-[10px]">
                            <HelpCircle className="w-3 h-3 text-[#C78620]" />
                            <span>PROJECTIONS & CONTINGENCIES</span>
                          </div>
                          <ul className="list-disc list-inside space-y-0.5 text-[#151515]">
                            {m.projections.map((p, i) => (
                              <li key={i}>{p}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Sourced Provenance Citations */}
                      {m.sourceIds && m.sourceIds.length > 0 && (
                        <div className="pt-2 border-t border-[#E2E5DE] flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-[#747A80]">Sources:</span>
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
                                className="px-2 py-0.5 rounded bg-[#ECEFE5] border border-[#D5DAD0] hover:border-[#536F00] text-[#536F00] transition-colors flex items-center gap-1 cursor-pointer"
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
                            className="flex items-center gap-1 text-[#747A80] hover:text-[#151515] transition-colors cursor-pointer"
                            title="Copy response to clipboard"
                          >
                            {copiedId === m.id ? (
                              <>
                                <Check className="w-3 h-3 text-[#398B46]" />
                                <span className="text-[#398B46]">Copied</span>
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

                <span className="text-[10px] font-mono text-[#747A80] mt-1 px-1">
                  {m.timestamp}
                </span>
              </div>
            ))}

            {/* Loading Indicator */}
            {loading && (
              <div className="flex items-center gap-2 p-3.5 rounded-2xl bg-[#F4F5F0] border border-[#E2E5DE] text-xs text-[#747A80] max-w-[280px]">
                <Sparkles className="w-4 h-4 text-[#536F00] animate-spin" />
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
            className="p-3 border-t border-[#E2E5DE] bg-[#F4F5F0] flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about deals, DPIA, flights, or risks..."
              className="flex-1 bg-white border border-[#E2E5DE] rounded-xl px-3.5 py-2.5 text-xs text-[#151515] placeholder-[#747A80] focus:outline-none focus:border-[#536F00] transition-colors"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="p-2.5 rounded-xl bg-[#536F00] hover:bg-[#435900] disabled:opacity-40 text-white transition-all duration-200 cursor-pointer active:scale-95 flex-shrink-0 shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </aside>
      )}
    </>
  );
};
