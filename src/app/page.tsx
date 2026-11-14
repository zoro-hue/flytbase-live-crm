"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Play,
  Database,
  Radio,
  Users2,
  Layers,
  Zap,
  ShieldCheck,
  CheckCircle2,
  FileText,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Lock,
  ExternalLink,
  X,
  Server,
  Activity,
  ChevronRight,
} from "lucide-react";

export default function LandingPage() {
  const [showVideoModal, setShowVideoModal] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#000000] text-[#F4F4F5] overflow-x-hidden selection:bg-[#FF5A00]/30 selection:text-white">
      {/* Cinematic Horizon Atmosphere Arc (Reference Image Visual Style) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 w-[1200px] h-[750px] overflow-hidden opacity-90 z-0"
      >
        {/* Soft atmospheric curved orange glow */}
        <div
          className="absolute -top-40 -right-20 w-[950px] h-[700px] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse at 70% 30%, rgba(255, 90, 0, 0.16) 0%, rgba(255, 90, 0, 0.04) 45%, transparent 72%)",
          }}
        />
        {/* Horizon curvature rim light line */}
        <div
          className="absolute top-20 right-[-100px] w-[1100px] h-[550px] rounded-[100%] border-t border-[#FF5A00]/25"
          style={{
            boxShadow: "0 -2px 35px -5px rgba(255, 90, 0, 0.3)",
            transform: "rotate(-12deg)",
          }}
        />
      </div>

      {/* Top Navigation Bar */}
      <header className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-3">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-[#FF5A00] flex items-center justify-center font-bold text-white text-xs shadow-lg shadow-[#FF5A00]/25 transition-transform group-hover:scale-105">
              FB
            </div>
            <span className="text-base font-bold tracking-tight text-[#F4F4F5]">
              FlytBase <span className="text-[#FF5A00]">CRM</span>
            </span>
          </Link>

          {/* Center Capsule Navigation Pills (As shown in reference image) */}
          <nav className="hidden md:flex items-center gap-1 p-1 rounded-full bg-[#0D0E12]/85 backdrop-blur-md border border-[#1C1F26] shadow-xl">
            <Link
              href="/"
              className="px-4 py-1.5 rounded-full text-xs font-semibold text-white bg-[#1C1F26] border border-[#2B2F3A] transition-colors"
            >
              Home
            </Link>
            <a
              href="#features"
              className="px-4 py-1.5 rounded-full text-xs font-medium text-[#9A9FA8] hover:text-white transition-colors"
            >
              Features
            </a>
            <a
              href="#workflow"
              className="px-4 py-1.5 rounded-full text-xs font-medium text-[#9A9FA8] hover:text-white transition-colors"
            >
              Workflow
            </a>
            <a
              href="#security"
              className="px-4 py-1.5 rounded-full text-xs font-medium text-[#9A9FA8] hover:text-white transition-colors"
            >
              Security
            </a>
            <a
              href="#about"
              className="px-4 py-1.5 rounded-full text-xs font-medium text-[#9A9FA8] hover:text-white transition-colors"
            >
              About
            </a>
          </nav>

          {/* Right Action CTAs */}
          <div className="flex items-center gap-2.5">
            <Link
              href="/dashboard"
              className="px-4 py-1.5 rounded-full border border-[#2B2F3A] bg-[#0D0E12] text-xs font-medium text-[#F4F4F5] hover:border-[#FF5A00]/50 hover:bg-[#14161C] transition-all"
            >
              Sign In
            </Link>
            <Link
              href="/dashboard"
              className="px-4.5 py-1.5 rounded-full bg-[#FF5A00] hover:bg-[#E04F00] text-white text-xs font-semibold shadow-lg shadow-[#FF5A00]/25 transition-all flex items-center gap-1.5 active:scale-95"
            >
              <span>Enter CRM</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Hero Container */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-14 pb-16 space-y-16 lg:space-y-24">
        {/* Top Hero Grid: Left Content & Right 3D Dashboard Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Headline, Value Proposition & CTAs */}
          <div className="lg:col-span-5 space-y-6">
            {/* Tag Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#14161C] border border-[#FF5A00]/30 shadow-inner">
              <span className="w-2 h-2 rounded-full bg-[#FF5A00] animate-pulse" />
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#FF5A00] font-semibold">
                LIVE CRM INTELLIGENCE • QUESTATHON ENGINE
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight text-white leading-[1.08]">
              Mission-Critical CRM <br />
              for <span className="text-[#FF5A00]">Enterprise Operations</span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-[#9A9FA8] max-w-xl leading-relaxed">
              A Questathon-powered, MCP-native CRM that unifies account intelligence, deals, stakeholders, live field signals, and evidence in real time.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                href="/dashboard"
                className="px-6 py-3 rounded-xl bg-[#FF5A00] hover:bg-[#E04F00] text-white text-sm font-semibold shadow-xl shadow-[#FF5A00]/25 transition-all flex items-center gap-2 active:scale-95"
              >
                <span>Enter CRM</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                type="button"
                onClick={() => setShowVideoModal(true)}
                className="px-5 py-3 rounded-xl bg-[#0D0E12] border border-[#1C1F26] hover:border-[#2B2F3A] hover:bg-[#14161C] text-white text-sm font-medium flex items-center gap-2 transition-all cursor-pointer"
              >
                <div className="w-4 h-4 rounded-full border border-white/60 flex items-center justify-center">
                  <Play className="w-2 h-2 fill-white ml-0.5" />
                </div>
                <span>Watch Overview</span>
              </button>
            </div>

            {/* Micro Feature Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#1C1F26]">
              <div className="flex items-center gap-1.5 text-xs text-[#9A9FA8]">
                <Zap className="w-3.5 h-3.5 text-[#FF5A00]" />
                <span>Real-Time MCP Sync</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#9A9FA8]">
                <Layers className="w-3.5 h-3.5 text-[#FF5A00]" />
                <span>Account Intelligence</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#9A9FA8]">
                <Activity className="w-3.5 h-3.5 text-[#FF5A00]" />
                <span>Action Execution</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#9A9FA8]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#FF5A00]" />
                <span>Evidence Traceability</span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Perspective Floating Dashboard Preview (Reference Image Target) */}
          <div className="lg:col-span-7 relative">
            <Link
              href="/dashboard"
              className="block group cursor-pointer"
              title="Launch Live Enterprise CRM Dashboard"
            >
              {/* Perspective Slate Container */}
              <div
                className="relative rounded-2xl bg-[#08080A] border border-[#2B2F3A] p-2.5 sm:p-3.5 shadow-2xl transition-all duration-500 group-hover:scale-[1.01] group-hover:border-[#FF5A00]/50"
                style={{
                  boxShadow:
                    "0 25px 60px -15px rgba(0, 0, 0, 0.95), 0 0 50px -10px rgba(255, 90, 0, 0.22), inset 0 0 0 1px rgba(255, 90, 0, 0.25)",
                  transform: "perspective(1600px) rotateY(-5deg) rotateX(2.5deg)",
                }}
              >
                {/* Floating Preview Badge overlay on hover */}
                <div className="absolute top-4 right-4 z-20 px-2.5 py-1 rounded-full bg-[#FF5A00] text-white text-[10px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 shadow-md">
                  <span>Open Live CRM</span>
                  <ExternalLink className="w-3 h-3" />
                </div>

                {/* Simulated Real Dashboard Interface Inside Tablet */}
                <div className="rounded-xl bg-[#000000] border border-[#1C1F26] p-3 sm:p-4 text-left overflow-hidden space-y-3.5 pointer-events-none select-none">
                  {/* Top Header of Simulated Dashboard */}
                  <div className="flex items-center justify-between pb-3 border-b border-[#1C1F26]">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-[#FF5A00] flex items-center justify-center font-bold text-white text-[10px]">
                        FB
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-white">FlytBase CRM</span>
                          <span className="text-[9px] font-mono text-[#FF5A00] font-semibold uppercase">LIVE ENGINE</span>
                        </div>
                        <div className="text-[9px] text-[#71717A] font-mono">MCP READY • 60s quota</div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[8px] uppercase font-mono text-[#585E6A] block">LAST SYNCHRONIZED</span>
                      <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#D4D4D8]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A00] animate-pulse" />
                        <span>2:10:51 pm</span>
                        <span className="text-[9px] text-[#FF5A00] ml-1">MCP Health →</span>
                      </div>
                    </div>
                  </div>

                  {/* 4 KPI Cards Row */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <div className="p-2 rounded-lg bg-[#0D0E12] border border-[#1C1F26]">
                      <span className="text-[9px] text-[#8E929E] block">Confirmed Framework</span>
                      <div className="flex items-baseline justify-between mt-0.5">
                        <span className="text-sm font-bold text-white font-mono">£1.5M</span>
                        <span className="text-[8px] font-mono px-1 py-0.2 rounded bg-[#14161C] text-[#E4E4E7] border border-[#252830]">
                          Agreed
                        </span>
                      </div>
                    </div>

                    <div className="p-2 rounded-lg bg-[#0D0E12] border border-[#1C1F26]">
                      <span className="text-[9px] text-[#8E929E] block">Active Pipeline</span>
                      <div className="flex items-baseline justify-between mt-0.5">
                        <span className="text-sm font-bold text-white font-mono">£800k + €320k</span>
                        <span className="text-[8px] font-mono px-1 py-0.2 rounded bg-[#FF5A00]/15 text-[#FF6519] border border-[#FF5A00]/30 font-semibold">
                          In Play
                        </span>
                      </div>
                    </div>

                    <div className="p-2 rounded-lg bg-[#0D0E12] border border-[#1C1F26]">
                      <span className="text-[9px] text-[#8E929E] block">At-Risk Deal Value</span>
                      <div className="flex items-baseline justify-between mt-0.5">
                        <span className="text-sm font-bold text-[#FF5A00] font-mono">£800k + €320k</span>
                        <span className="text-[8px] font-mono px-1 py-0.2 rounded bg-[#240C04] text-[#FF5A00] border border-[#8C2A00] font-bold">
                          Action Needed
                        </span>
                      </div>
                    </div>

                    <div className="p-2 rounded-lg bg-[#0D0E12] border border-[#1C1F26]">
                      <span className="text-[9px] text-[#8E929E] block">Live Field Signals</span>
                      <div className="flex items-baseline justify-between mt-0.5">
                        <span className="text-sm font-bold text-white font-mono">3</span>
                        <span className="text-[8px] font-mono px-1 py-0.2 rounded bg-[#FF5A00]/15 text-[#FF6519] border border-[#FF5A00]/30">
                          Active
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 2 Account Cards Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {/* Account A Preview */}
                    <div className="p-2.5 rounded-lg bg-[#0D0E12] border border-[#1C1F26] space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[8px] font-mono font-bold text-[#FF5A00] uppercase">
                          ACCOUNT A • PUBLIC SAFETY
                        </span>
                        <span className="text-[8px] font-mono text-[#E4E4E7] bg-[#14161C] px-1 py-0.2 rounded border border-[#252830]">
                          14 / 35 Docks Flying
                        </span>
                      </div>
                      <div className="text-xs font-semibold text-white">Eastern Counties Police Alliance</div>
                      <div className="grid grid-cols-3 gap-1 pt-1 border-t border-[#1C1F26] text-[8px] font-mono">
                        <div>
                          <span className="text-[#585E6A] block">CONFIRMED</span>
                          <span className="text-white font-semibold">£1.5M</span>
                        </div>
                        <div>
                          <span className="text-[#585E6A] block">AT RISK</span>
                          <span className="text-[#FF5A00] font-semibold">£800k</span>
                        </div>
                        <div>
                          <span className="text-[#585E6A] block">TOP BLOCKER</span>
                          <span className="text-[#FFA066] truncate block">DPIA unassigned</span>
                        </div>
                      </div>
                    </div>

                    {/* Account B Preview */}
                    <div className="p-2.5 rounded-lg bg-[#0D0E12] border border-[#1C1F26] space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[8px] font-mono font-bold text-[#FF5A00] uppercase">
                          ACCOUNT B • INDUSTRIAL SECURITY
                        </span>
                        <span className="text-[8px] font-mono text-[#FFA066] bg-[#1A1009] px-1 py-0.2 rounded border border-[#5E2B0C]">
                          4 / 14 Docks Flying
                        </span>
                      </div>
                      <div className="text-xs font-semibold text-white">Aldermoor Industrial Group</div>
                      <div className="grid grid-cols-3 gap-1 pt-1 border-t border-[#1C1F26] text-[8px] font-mono">
                        <div>
                          <span className="text-[#585E6A] block">CLOSED WON</span>
                          <span className="text-white font-semibold">€160k</span>
                        </div>
                        <div>
                          <span className="text-[#585E6A] block">AT RISK</span>
                          <span className="text-[#FF5A00] font-semibold">€320k</span>
                        </div>
                        <div>
                          <span className="text-[#585E6A] block">TOP BLOCKER</span>
                          <span className="text-[#FFA066] truncate block">ROI unverified</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Bottom Feature Strip (Matching Reference Image) */}
        <div id="features" className="pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1: Unified Account View */}
            <div className="p-5 rounded-2xl bg-[#0D0E12]/90 border border-[#1C1F26] hover:border-[#2B2F3A] transition-all flex items-start gap-4 shadow-xl">
              <div className="w-10 h-10 rounded-xl bg-[#14161C] border border-[#252830] flex items-center justify-center text-[#FF5A00] flex-shrink-0 mt-0.5">
                <Database className="w-5 h-5 text-[#FF5A00]" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-white tracking-tight">Unified Account View</h3>
                <p className="text-xs text-[#8E929E] leading-relaxed">
                  Police & Industrial intelligence in one platform
                </p>
              </div>
            </div>

            {/* Card 2: Live Signal Monitoring */}
            <div className="p-5 rounded-2xl bg-[#0D0E12]/90 border border-[#1C1F26] hover:border-[#2B2F3A] transition-all flex items-start gap-4 shadow-xl">
              <div className="w-10 h-10 rounded-xl bg-[#14161C] border border-[#252830] flex items-center justify-center text-[#FF5A00] flex-shrink-0 mt-0.5">
                <TrendingUp className="w-5 h-5 text-[#FF5A00]" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-white tracking-tight">Live Signal Monitoring</h3>
                <p className="text-xs text-[#8E929E] leading-relaxed">
                  MCP-verified field events and risks
                </p>
              </div>
            </div>

            {/* Card 3: Stakeholder Matrix */}
            <div className="p-5 rounded-2xl bg-[#0D0E12]/90 border border-[#1C1F26] hover:border-[#2B2F3A] transition-all flex items-start gap-4 shadow-xl">
              <div className="w-10 h-10 rounded-xl bg-[#14161C] border border-[#252830] flex items-center justify-center text-[#FF5A00] flex-shrink-0 mt-0.5">
                <Users2 className="w-5 h-5 text-[#FF5A00]" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-white tracking-tight">Stakeholder Matrix</h3>
                <p className="text-xs text-[#8E929E] leading-relaxed">
                  Decision authority, influence, and risk tracking
                </p>
              </div>
            </div>

            {/* Card 4: Evidence Vault */}
            <div className="p-5 rounded-2xl bg-[#0D0E12]/90 border border-[#1C1F26] hover:border-[#2B2F3A] transition-all flex items-start gap-4 shadow-xl">
              <div className="w-10 h-10 rounded-xl bg-[#14161C] border border-[#252830] flex items-center justify-center text-[#FF5A00] flex-shrink-0 mt-0.5">
                <Layers className="w-5 h-5 text-[#FF5A00]" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-white tracking-tight">Evidence Vault</h3>
                <p className="text-xs text-[#8E929E] leading-relaxed">
                  Source-linked facts, logs, and verifiable records
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: The 5 Critical Business Questions */}
        <section className="space-y-8 pt-10 border-t border-[#1C1F26]">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-[#FF5A00] font-semibold">
              EVIDENCE-BACKED REASONING
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Five Critical Questions Answered for Every Account
            </h2>
            <p className="text-xs sm:text-sm text-[#8E929E]">
              Zero fabricated claims. Every single number and decision is tied to verified primary sources from the Questathon MCP server.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="p-5 rounded-2xl bg-[#08080A] border border-[#1C1F26] space-y-3">
              <div className="w-7 h-7 rounded-lg bg-[#FF5A00]/10 border border-[#FF5A00]/30 flex items-center justify-center font-mono font-bold text-[#FF5A00] text-xs">
                1
              </div>
              <h3 className="text-sm font-semibold text-white">What is the book worth?</h3>
              <p className="text-xs text-[#8E929E] leading-relaxed">
                Clear distinction between confirmed framework, active pipeline, at-risk deals, and unsupported ROI projections.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#08080A] border border-[#1C1F26] space-y-3">
              <div className="w-7 h-7 rounded-lg bg-[#FF5A00]/10 border border-[#FF5A00]/30 flex items-center justify-center font-mono font-bold text-[#FF5A00] text-xs">
                2
              </div>
              <h3 className="text-sm font-semibold text-white">Who holds the power?</h3>
              <p className="text-xs text-[#8E929E] leading-relaxed">
                Authority mapping separating Economic Buyers from Champions. Detects key-person departure hazards immediately.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#08080A] border border-[#1C1F26] space-y-3">
              <div className="w-7 h-7 rounded-lg bg-[#FF5A00]/10 border border-[#FF5A00]/30 flex items-center justify-center font-mono font-bold text-[#FF5A00] text-xs">
                3
              </div>
              <h3 className="text-sm font-semibold text-white">What do you do first?</h3>
              <p className="text-xs text-[#8E929E] leading-relaxed">
                Ranked Top 3 actionable next steps with verified owners, real due dates, and bidirectional MCP note write-backs.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#08080A] border border-[#1C1F26] space-y-3">
              <div className="w-7 h-7 rounded-lg bg-[#FF5A00]/10 border border-[#FF5A00]/30 flex items-center justify-center font-mono font-bold text-[#FF5A00] text-xs">
                4
              </div>
              <h3 className="text-sm font-semibold text-white">What is about to go wrong?</h3>
              <p className="text-xs text-[#8E929E] leading-relaxed">
                Proactive risk vectors: unassigned DPIA tickets, silent fleet groundings, unverified ROI, and impending departure deadlines.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#08080A] border border-[#1C1F26] space-y-3">
              <div className="w-7 h-7 rounded-lg bg-[#FF5A00]/10 border border-[#FF5A00]/30 flex items-center justify-center font-mono font-bold text-[#FF5A00] text-xs">
                5
              </div>
              <h3 className="text-sm font-semibold text-white">What do you still not know?</h3>
              <p className="text-xs text-[#8E929E] leading-relaxed">
                First-class knowledge gaps with prescribed discovery questions to ask target stakeholders without assuming facts.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Technical Architecture & MCP Rate Limiter */}
        <section id="workflow" className="space-y-8 pt-10 border-t border-[#1C1F26]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-5">
              <span className="text-xs font-mono uppercase tracking-wider text-[#FF5A00] font-semibold">
                SYSTEM ARCHITECTURE
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
                JSON-RPC MCP Integration with 60-Second Quota Protection
              </h2>
              <p className="text-xs sm:text-sm text-[#8E929E] leading-relaxed">
                The Questathon MCP server enforces a strict rate limit of 1 call per 60 seconds across both read and write tools. FlytBase CRM features an intelligent server-side queue and persistent cache that ensures zero HTTP 429 throttling and zero synthetic demo data.
              </p>

              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-[#0D0E12] border border-[#1C1F26]">
                  <Server className="w-4 h-4 text-[#FF5A00] mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-white block">Server-Side Bearer Protection</span>
                    <span className="text-[#8E929E]">AQ_TOKEN is strictly restricted to server environment variables; never leaked to client bundles or logs.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-[#0D0E12] border border-[#1C1F26]">
                  <Activity className="w-4 h-4 text-[#FF5A00] mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-white block">Rate-Limited Queue & Deduplication</span>
                    <span className="text-[#8E929E]">Coalesces duplicate requests and staggers write_note operations with countdown timers.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-[#0D0E12] border border-[#1C1F26]">
                  <CheckCircle2 className="w-4 h-4 text-[#FF5A00] mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-white block">Bidirectional Note Write-Back</span>
                    <span className="text-[#8E929E]">Live execution of write_note tools returning official MCP server IDs directly into the persistent store.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Architecture Card */}
            <div id="security" className="p-6 rounded-2xl bg-[#08080A] border border-[#1C1F26] space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#1C1F26]">
                <span className="text-xs font-mono text-[#FF5A00] uppercase font-semibold">
                  MCP JSON-RPC PROTOCOL FLOW
                </span>
                <span className="text-[10px] font-mono text-[#71717A]">PORT 443 HTTPS</span>
              </div>

              <div className="space-y-2.5 font-mono text-[11px]">
                <div className="p-2.5 rounded-lg bg-[#000000] border border-[#1C1F26] flex items-center justify-between">
                  <span className="text-[#8E929E]">Client Request</span>
                  <span className="text-white">POST /api/notes</span>
                </div>
                <div className="text-center text-[#585E6A] text-[10px]">↓ Token Sanitizer & Rate-Limiter Check</div>
                <div className="p-2.5 rounded-lg bg-[#000000] border border-[#FF5A00]/30 flex items-center justify-between">
                  <span className="text-[#FF5A00]">Questathon MCP</span>
                  <span className="text-white">tools/call (write_note)</span>
                </div>
                <div className="text-center text-[#585E6A] text-[10px]">↓ 200 OK Response (JSON-RPC)</div>
                <div className="p-2.5 rounded-lg bg-[#000000] border border-[#1C1F26] flex items-center justify-between">
                  <span className="text-[#8E929E]">Cache & Persistence</span>
                  <span className="text-white">Indexed in Store (id: 146102)</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/settings"
                  className="w-full py-2.5 rounded-xl bg-[#14161C] hover:bg-[#1C1F26] text-xs font-medium text-white flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>View Live MCP Gateway Status</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#FF5A00]" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Final Call to Action */}
        <section id="about" className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#0D0E12] to-[#08080A] border border-[#1C1F26] text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-[#FF5A00]/10 blur-3xl pointer-events-none"
          />

          <div className="relative z-10 max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-[#FF5A00] font-semibold">
              FLYTEBASE QUESTATHON LIVE DEMO
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Experience Real-Time Enterprise CRM Intelligence
            </h2>
            <p className="text-xs sm:text-sm text-[#8E929E] leading-relaxed">
              Explore the live accounts for Eastern Counties Police Alliance and Aldermoor Industrial Group. Verified telemetry, authority mapping, and risk matrices ready for execution.
            </p>
          </div>

          <div className="relative z-10 flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/dashboard"
              className="px-7 py-3 rounded-xl bg-[#FF5A00] hover:bg-[#E04F00] text-white text-sm font-semibold shadow-xl shadow-[#FF5A00]/25 transition-all flex items-center gap-2"
            >
              <span>Enter Live CRM Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/evidence"
              className="px-5 py-3 rounded-xl bg-[#000000] border border-[#1C1F26] hover:border-[#2B2F3A] text-white text-sm font-medium transition-all"
            >
              <span>Explore Evidence Vault</span>
            </Link>
          </div>
        </section>
      </main>

      {/* Public Landing Page Footer */}
      <footer className="border-t border-[#1C1F26] py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-xs text-[#606570] flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-[#FF5A00] flex items-center justify-center font-bold text-white text-[10px]">
            FB
          </div>
          <span>FlytBase CRM • Built for the Questathon Challenge</span>
        </div>

        <div className="flex items-center gap-6 text-[11px] font-mono">
          <span className="flex items-center gap-1.5 text-[#FF5A00]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A00] animate-pulse" />
            MCP Gateway Online
          </span>
          <span>Strict Rate Limit: 1 Call / 60s</span>
          <Link href="/dashboard" className="text-white hover:text-[#FF5A00] transition-colors">
            Enter Dashboard →
          </Link>
        </div>
      </footer>

      {/* Interactive Overview Walkthrough Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-[#08080A] border border-[#1C1F26] rounded-2xl shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-[#1C1F26] pb-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-[#FF5A00] flex items-center justify-center text-white text-xs font-bold">
                  FB
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">FlytBase CRM Executive Walkthrough</h3>
                  <p className="text-[10px] text-[#8E929E]">Questathon Challenge Architecture</p>
                </div>
              </div>
              <button
                onClick={() => setShowVideoModal(false)}
                className="p-1 rounded-lg text-[#606570] hover:text-white hover:bg-[#14161C] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-[#8E929E] leading-relaxed">
              <p>
                FlytBase CRM connects to the live Questathon MCP endpoint (<code className="text-[#FF5A00]">/api/public/mcp</code>) with server-side authentication, adhering to the strict 1-call-per-minute quota.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-[#000000] border border-[#1C1F26] space-y-1">
                  <span className="text-white font-semibold block">Account A (Police)</span>
                  <span>14 of 35 docks active. £1.5M framework tender in progress. DPIA blocked on FB-10412.</span>
                </div>
                <div className="p-3 rounded-xl bg-[#000000] border border-[#1C1F26] space-y-1">
                  <span className="text-white font-semibold block">Account B (Industrial)</span>
                  <span>4 of 14 docks active. 3 docks grounded. €1.2M savings claim unverified by finance.</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#1C1F26]">
              <button
                onClick={() => setShowVideoModal(false)}
                className="px-3.5 py-1.5 rounded-lg border border-[#1C1F26] text-xs text-[#8E929E] hover:text-white transition-colors"
              >
                Close
              </button>
              <Link
                href="/dashboard"
                className="px-4 py-1.5 rounded-xl bg-[#FF5A00] hover:bg-[#E04F00] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <span>Launch Live Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
