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
  Check,
  Sparkles,
} from "lucide-react";
import { FlytBaseLogo } from "@/components/brand/FlytBaseLogo";
import { FlytBaseMascot } from "@/components/brand/FlytBaseMascot";

export default function LandingPage() {
  const [showVideoModal, setShowVideoModal] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#F4F5F0] text-[#151515] overflow-x-hidden selection:bg-[#536F00]/20 selection:text-[#151515]">
      {/* Subtle Atmospheric Top Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 w-[1000px] h-[550px] overflow-hidden opacity-70 z-0"
      >
        <div
          className="absolute -top-32 -right-20 w-[800px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse at 70% 30%, rgba(83, 111, 0, 0.12) 0%, rgba(83, 111, 0, 0.03) 50%, transparent 75%)",
          }}
        />
      </div>

      {/* Top Navigation Bar */}
      <header className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-3">
        <div className="h-14 px-4 sm:px-6 rounded-2xl bg-white/90 backdrop-blur-md border border-[#E2E5DE] shadow-sm flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group cursor-pointer">
            <FlytBaseLogo variant="horizontal" size={28} priority />
          </Link>

          {/* Center Capsule Navigation Pills */}
          <nav className="hidden md:flex items-center gap-1 p-1 rounded-full bg-[#ECEFE5] border border-[#E2E5DE]">
            <Link
              href="/"
              className="px-4 py-1.5 rounded-full text-xs font-semibold text-[#151515] bg-white shadow-xs"
            >
              Home
            </Link>
            <a
              href="#features"
              className="px-4 py-1.5 rounded-full text-xs font-medium text-[#747A80] hover:text-[#151515] transition-colors"
            >
              Features
            </a>
            <a
              href="#questions"
              className="px-4 py-1.5 rounded-full text-xs font-medium text-[#747A80] hover:text-[#151515] transition-colors"
            >
              5 Questions
            </a>
            <a
              href="#signals"
              className="px-4 py-1.5 rounded-full text-xs font-medium text-[#747A80] hover:text-[#151515] transition-colors"
            >
              Live Signals
            </a>
            <a
              href="#security"
              className="px-4 py-1.5 rounded-full text-xs font-medium text-[#747A80] hover:text-[#151515] transition-colors"
            >
              Security
            </a>
          </nav>

          {/* Right Action CTAs */}
          <div className="flex items-center gap-2.5">
            <Link
              href="/dashboard"
              className="px-4 py-1.5 rounded-full border border-[#E2E5DE] bg-[#F4F5F0] text-xs font-medium text-[#151515] hover:bg-[#ECEFE5] transition-all"
            >
              Sign In
            </Link>
            <Link
              href="/dashboard"
              className="px-4.5 py-1.5 rounded-full bg-[#171717] hover:bg-[#2A2A2A] text-white text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5 active:scale-95"
            >
              <span>Enter CRM</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#A3E635]" />
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E2E5DE] shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#536F00] animate-pulse" />
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#536F00] font-semibold">
                LIVE CRM INTELLIGENCE • QUESTATHON ENGINE
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-extrabold tracking-tight text-[#151515] leading-[1.08]">
              Mission-Critical CRM <br />
              for <span className="text-[#536F00]">Enterprise Operations</span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-[#747A80] max-w-xl leading-relaxed">
              An MCP-native intelligence platform that unifies account valuation, stakeholder authority, live field signals, and verified documentary evidence in real time.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                href="/dashboard"
                className="px-6 py-3 rounded-xl bg-[#171717] hover:bg-[#2A2A2A] text-white text-sm font-semibold shadow-md transition-all flex items-center gap-2 active:scale-95"
              >
                <span>Enter CRM</span>
                <ArrowRight className="w-4 h-4 text-[#A3E635]" />
              </Link>
              <button
                type="button"
                onClick={() => setShowVideoModal(true)}
                className="px-5 py-3 rounded-xl bg-white border border-[#E2E5DE] hover:bg-[#ECEFE5] text-[#151515] text-sm font-medium flex items-center gap-2 transition-all cursor-pointer shadow-xs"
              >
                <div className="w-4 h-4 rounded-full bg-[#ECEFE5] border border-[#D5DAD0] flex items-center justify-center">
                  <Play className="w-2 h-2 fill-[#536F00] text-[#536F00] ml-0.5" />
                </div>
                <span>Watch Walkthrough</span>
              </button>
            </div>

            {/* Micro Feature Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#E2E5DE]">
              <div className="flex items-center gap-1.5 text-xs text-[#747A80]">
                <Zap className="w-3.5 h-3.5 text-[#536F00]" />
                <span>1-Call/60s Rate Limiter</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#747A80]">
                <Layers className="w-3.5 h-3.5 text-[#536F00]" />
                <span>Dual Account Profile</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#747A80]">
                <Activity className="w-3.5 h-3.5 text-[#536F00]" />
                <span>Action Prioritization</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#747A80]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#536F00]" />
                <span>Evidence Traceability</span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Perspective Floating Dashboard Preview (Light Theme) */}
          <div className="lg:col-span-7 relative">
            <Link
              href="/dashboard"
              className="block group cursor-pointer"
              title="Launch Live Enterprise CRM Dashboard"
            >
              {/* Perspective Slate Container */}
              <div
                className="relative rounded-2xl bg-white border border-[#E2E5DE] p-3 sm:p-4 shadow-[0_24px_60px_rgba(0,0,0,0.08)] transition-all duration-500 group-hover:scale-[1.01] group-hover:border-[#536F00]/50"
                style={{
                  transform: "perspective(1600px) rotateY(-4deg) rotateX(2deg)",
                }}
              >
                {/* Floating Preview Badge overlay on hover */}
                <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full bg-[#171717] text-white text-[11px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 shadow-md">
                  <span>Open Live CRM</span>
                  <ExternalLink className="w-3 h-3 text-[#A3E635]" />
                </div>

                {/* Simulated Real Dashboard Interface Inside Tablet */}
                <div className="rounded-xl bg-[#F4F5F0] border border-[#E2E5DE] p-4 text-left overflow-hidden space-y-3.5 pointer-events-none select-none">
                  {/* Top Header of Simulated Dashboard */}
                  <div className="flex items-center justify-between pb-3 border-b border-[#E2E5DE]">
                    <div className="flex items-center gap-2">
                      <FlytBaseLogo variant="icon" size={24} priority />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-[#151515]">Executive Command Center</span>
                          <span className="text-[9px] font-mono text-[#536F00] font-semibold uppercase bg-[#ECEFE5] px-1.5 py-0.2 rounded border border-[#D5DAD0]">
                            LIVE ENGINE
                          </span>
                        </div>
                        <div className="text-[10px] text-[#747A80] font-mono">MCP READY • 60s quota cache</div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[9px] uppercase font-mono text-[#747A80] block">LAST SYNCHRONIZED</span>
                      <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#151515] font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#536F00] animate-pulse" />
                        <span>2:10:51 pm</span>
                        <span className="text-[10px] text-[#536F00] ml-1">MCP Health →</span>
                      </div>
                    </div>
                  </div>

                  {/* 4 KPI Cards Row */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <div className="p-2.5 rounded-xl bg-white border border-[#E2E5DE]">
                      <span className="text-[10px] text-[#747A80] block">Confirmed Framework</span>
                      <div className="flex items-baseline justify-between mt-1">
                        <span className="text-base font-bold text-[#151515] font-mono">£1.5M</span>
                        <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#ECEFE5] text-[#536F00] border border-[#D5DAD0] font-semibold">
                          Agreed
                        </span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-white border border-[#E2E5DE]">
                      <span className="text-[10px] text-[#747A80] block">Active Pipeline</span>
                      <div className="flex items-baseline justify-between mt-1">
                        <span className="text-base font-bold text-[#151515] font-mono">£800k+€320k</span>
                        <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#FEF3C7] text-[#C78620] border border-[#FDE68A] font-semibold">
                          In Play
                        </span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-white border border-[#E2E5DE]">
                      <span className="text-[10px] text-[#747A80] block">At-Risk Deal Value</span>
                      <div className="flex items-baseline justify-between mt-1">
                        <span className="text-base font-bold text-[#E34B3D] font-mono">£800k+€320k</span>
                        <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#FEE2E2] text-[#DC2626] border border-[#FECACA] font-bold">
                          Action
                        </span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-white border border-[#E2E5DE]">
                      <span className="text-[10px] text-[#747A80] block">Live Field Signals</span>
                      <div className="flex items-baseline justify-between mt-1">
                        <span className="text-base font-bold text-[#151515] font-mono">3</span>
                        <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#ECEFE5] text-[#536F00] border border-[#D5DAD0]">
                          Active
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 2 Account Cards Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {/* Account A Preview */}
                    <div className="p-3 rounded-xl bg-white border border-[#E2E5DE] space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-mono font-bold text-[#536F00] uppercase">
                          ACCOUNT A • PUBLIC SAFETY
                        </span>
                        <span className="text-[9px] font-mono text-[#536F00] bg-[#ECEFE5] px-1.5 py-0.2 rounded border border-[#D5DAD0]">
                          14 / 35 Docks
                        </span>
                      </div>
                      <div className="text-xs font-bold text-[#151515]">Eastern Counties Police Alliance</div>
                      <div className="grid grid-cols-3 gap-1 pt-1.5 border-t border-[#E2E5DE] text-[9px] font-mono">
                        <div>
                          <span className="text-[#747A80] block">CONFIRMED</span>
                          <span className="text-[#151515] font-semibold">£1.5M</span>
                        </div>
                        <div>
                          <span className="text-[#747A80] block">AT RISK</span>
                          <span className="text-[#E34B3D] font-semibold">£800k</span>
                        </div>
                        <div>
                          <span className="text-[#747A80] block">TOP BLOCKER</span>
                          <span className="text-[#C78620] truncate block">DPIA unassigned</span>
                        </div>
                      </div>
                    </div>

                    {/* Account B Preview */}
                    <div className="p-3 rounded-xl bg-white border border-[#E2E5DE] space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-mono font-bold text-[#536F00] uppercase">
                          ACCOUNT B • INDUSTRIAL
                        </span>
                        <span className="text-[9px] font-mono text-[#C78620] bg-[#FEF3C7] px-1.5 py-0.2 rounded border border-[#FDE68A]">
                          4 / 14 Docks
                        </span>
                      </div>
                      <div className="text-xs font-bold text-[#151515]">Aldermoor Industrial Group</div>
                      <div className="grid grid-cols-3 gap-1 pt-1.5 border-t border-[#E2E5DE] text-[9px] font-mono">
                        <div>
                          <span className="text-[#747A80] block">CLOSED WON</span>
                          <span className="text-[#151515] font-semibold">€160k</span>
                        </div>
                        <div>
                          <span className="text-[#747A80] block">AT RISK</span>
                          <span className="text-[#E34B3D] font-semibold">€320k</span>
                        </div>
                        <div>
                          <span className="text-[#747A80] block">TOP BLOCKER</span>
                          <span className="text-[#C78620] truncate block">ROI unverified</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Feature Cards Strip */}
        <div id="features" className="pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-[#E2E5DE] hover:border-[#536F00]/50 transition-all flex items-start gap-4 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-[#ECEFE5] border border-[#D5DAD0] flex items-center justify-center text-[#536F00] flex-shrink-0 mt-0.5">
                <Database className="w-5 h-5 text-[#536F00]" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-[#151515] tracking-tight">Unified Account View</h3>
                <p className="text-xs text-[#747A80] leading-relaxed">
                  Consolidated Police Alliance & Industrial group operations in one command center.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#E2E5DE] hover:border-[#536F00]/50 transition-all flex items-start gap-4 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-[#ECEFE5] border border-[#D5DAD0] flex items-center justify-center text-[#536F00] flex-shrink-0 mt-0.5">
                <TrendingUp className="w-5 h-5 text-[#536F00]" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-[#151515] tracking-tight">Live Signal Telemetry</h3>
                <p className="text-xs text-[#747A80] leading-relaxed">
                  Real-time detection of silent dock outages, VIP flyovers, and key-person departures.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#E2E5DE] hover:border-[#536F00]/50 transition-all flex items-start gap-4 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-[#ECEFE5] border border-[#D5DAD0] flex items-center justify-center text-[#536F00] flex-shrink-0 mt-0.5">
                <Users2 className="w-5 h-5 text-[#536F00]" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-[#151515] tracking-tight">Stakeholder Matrix</h3>
                <p className="text-xs text-[#747A80] leading-relaxed">
                  Identifies economic buyers, operational champions, and compliance blockers.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#E2E5DE] hover:border-[#536F00]/50 transition-all flex items-start gap-4 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-[#ECEFE5] border border-[#D5DAD0] flex items-center justify-center text-[#536F00] flex-shrink-0 mt-0.5">
                <Layers className="w-5 h-5 text-[#536F00]" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-[#151515] tracking-tight">Evidence Vault</h3>
                <p className="text-xs text-[#747A80] leading-relaxed">
                  100% traceable metrics linked to primary tickets, contracts, and flight logs.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section: The 5 Critical Business Questions */}
        <section id="questions" className="space-y-8 pt-10 border-t border-[#E2E5DE]">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-[#536F00] font-semibold">
              EVALUATION FRAMEWORK
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-[#151515]">
              The Five Questions Every Account Must Answer
            </h2>
            <p className="text-xs text-[#747A80]">
              The core intelligence criteria assessed by executive leadership on Monday morning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-[#E2E5DE] space-y-3 shadow-xs">
              <span className="w-7 h-7 rounded-xl bg-[#ECEFE5] text-[#536F00] text-xs font-bold font-mono flex items-center justify-center">
                Q1
              </span>
              <h3 className="text-sm font-bold text-[#151515]">What is the book worth?</h3>
              <p className="text-xs text-[#747A80] leading-relaxed">
                Separates legally confirmed value (£1.5M framework) from speculative or at-risk amounts.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#E2E5DE] space-y-3 shadow-xs">
              <span className="w-7 h-7 rounded-xl bg-[#ECEFE5] text-[#536F00] text-xs font-bold font-mono flex items-center justify-center">
                Q2
              </span>
              <h3 className="text-sm font-bold text-[#151515]">Who holds the power?</h3>
              <p className="text-xs text-[#747A80] leading-relaxed">
                Maps decision makers (ACC Nadia Rahman), champions, users, and gatekeepers (Sarah Jenkins).
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#E2E5DE] space-y-3 shadow-xs">
              <span className="w-7 h-7 rounded-xl bg-[#ECEFE5] text-[#536F00] text-xs font-bold font-mono flex items-center justify-center">
                Q3
              </span>
              <h3 className="text-sm font-bold text-[#151515]">What do you do first?</h3>
              <p className="text-xs text-[#747A80] leading-relaxed">
                Ranked top 3 moves with named owners, strict deadlines, and target deal impact.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#E2E5DE] space-y-3 shadow-xs">
              <span className="w-7 h-7 rounded-xl bg-[#ECEFE5] text-[#536F00] text-xs font-bold font-mono flex items-center justify-center">
                Q4
              </span>
              <h3 className="text-sm font-bold text-[#151515]">What is about to go wrong?</h3>
              <p className="text-xs text-[#747A80] leading-relaxed">
                DPIA bottleneck unassigned for 4 months, silent dock outages, and departure risks.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#E2E5DE] space-y-3 shadow-xs">
              <span className="w-7 h-7 rounded-xl bg-[#ECEFE5] text-[#536F00] text-xs font-bold font-mono flex items-center justify-center">
                Q5
              </span>
              <h3 className="text-sm font-bold text-[#151515]">What do you still not know?</h3>
              <p className="text-xs text-[#747A80] leading-relaxed">
                Empirical gaps flagged explicitly: missing €1.2M fuel proof and Norwold patrol budgets.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Live Field Signals */}
        <section id="signals" className="space-y-6 pt-10 border-t border-[#E2E5DE]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#536F00] font-semibold">
                REAL-TIME INGESTION
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-[#151515] mt-1">
                Active Field Signals (Ingested via MCP)
              </h2>
            </div>
            <Link
              href="/signals"
              className="text-xs font-semibold text-[#536F00] hover:underline flex items-center gap-1"
            >
              <span>Explore Live Telemetry</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-[#E2E5DE] space-y-2.5 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#E34B3D] font-bold px-2 py-0.5 rounded bg-[#FEE2E2]">
                  [EVENT-A]
                </span>
                <span className="text-[10px] font-mono text-[#747A80]">Nov 30</span>
              </div>
              <h3 className="text-sm font-bold text-[#151515]">Aldermoor Silent Dock Inactivity</h3>
              <p className="text-xs text-[#747A80] leading-relaxed">
                3 docks flying most nights dropped to zero flights between 2–29 Nov while remaining online. No tickets raised.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#E2E5DE] space-y-2.5 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#C78620] font-bold px-2 py-0.5 rounded bg-[#FEF3C7]">
                  [EVENT-B]
                </span>
                <span className="text-[10px] font-mono text-[#747A80]">Nov 18</span>
              </div>
              <h3 className="text-sm font-bold text-[#151515]">Insp. Karen Mbeki Public Event Ticket</h3>
              <p className="text-xs text-[#747A80] leading-relaxed">
                VIP ticket logged ahead of large Dec 5 public event. Operator training dates and failure SLAs requested urgently.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#E2E5DE] space-y-2.5 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#747A80] font-bold px-2 py-0.5 rounded bg-[#ECEFE5]">
                  [EVENT-C]
                </span>
                <span className="text-[10px] font-mono text-[#747A80]">Nov 17</span>
              </div>
              <h3 className="text-sm font-bold text-[#151515]">Rhys Calder Departure Notice</h3>
              <p className="text-xs text-[#747A80] leading-relaxed">
                Lead drone engineer departs January with no named successor. Mitigation transition plan required immediately.
              </p>
            </div>
          </div>
        </section>

        {/* Security & Architecture Strip */}
        <section id="security" className="p-8 rounded-3xl bg-white border border-[#E2E5DE] shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#536F00]" />
              <span className="text-xs font-mono font-bold text-[#536F00] uppercase tracking-wider">
                ENTERPRISE AIR-GAPPED SECURITY
              </span>
            </div>
            <h3 className="text-xl font-bold text-[#151515]">Server-Side Token Isolation</h3>
            <p className="text-xs text-[#747A80] leading-relaxed">
              Zero tokens or API keys exposed in browser bundles. Rate-limited to exactly 1 call per 60 seconds per token with persistent SQLite and PostgreSQL caching.
            </p>
          </div>

          <Link
            href="/dashboard"
            className="px-6 py-3 rounded-xl bg-[#171717] hover:bg-[#2A2A2A] text-white text-xs font-semibold shadow-sm transition-all flex items-center gap-2 active:scale-95 flex-shrink-0"
          >
            <span>Launch CRM Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#A3E635]" />
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#E2E5DE] bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <FlytBaseLogo variant="horizontal" size={24} />
            <span className="text-xs text-[#747A80]">
              • Enterprise Operations CRM
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs text-[#747A80]">
            <Link href="/dashboard" className="hover:text-[#151515] transition-colors">
              Command Center
            </Link>
            <Link href="/accounts/eastern-counties" className="hover:text-[#151515] transition-colors">
              Eastern Counties (A)
            </Link>
            <Link href="/accounts/aldermoor" className="hover:text-[#151515] transition-colors">
              Aldermoor (B)
            </Link>
            <Link href="/signals" className="hover:text-[#151515] transition-colors">
              Signals
            </Link>
          </div>
        </div>
      </footer>

      {/* Overview Video Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white border border-[#E2E5DE] shadow-2xl p-6 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-[#E2E5DE] pb-3">
              <div className="flex items-center gap-2">
                <FlytBaseLogo variant="icon" size={24} />
                <h3 className="text-sm font-bold text-[#151515]">FlytBase CRM Architecture & Walkthrough</h3>
              </div>
              <button
                onClick={() => setShowVideoModal(false)}
                className="p-1 rounded-lg text-[#747A80] hover:text-[#151515] hover:bg-[#F4F5F0] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 rounded-xl bg-[#F4F5F0] border border-[#E2E5DE] space-y-3 text-xs text-[#747A80]">
              <p>
                <strong className="text-[#151515]">Questathon Submission Overview:</strong> This platform is pre-loaded with primary MCP flight logs, contracts, and stakeholder records for Eastern Counties Police Alliance and Aldermoor Industrial Group.
              </p>
              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                <div className="p-2 rounded-lg bg-white border border-[#E2E5DE]">
                  <span className="text-[#536F00] font-bold block">Rate Limiter</span>
                  <span>1 call / 60 seconds strict cache</span>
                </div>
                <div className="p-2 rounded-lg bg-white border border-[#E2E5DE]">
                  <span className="text-[#536F00] font-bold block">Primary Sources</span>
                  <span>100% cited documentary audit trail</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowVideoModal(false)}
                className="px-4 py-2 rounded-xl border border-[#E2E5DE] hover:bg-[#F4F5F0] text-xs font-medium text-[#151515] cursor-pointer"
              >
                Close
              </button>
              <Link
                href="/dashboard"
                onClick={() => setShowVideoModal(false)}
                className="px-4 py-2 rounded-xl bg-[#171717] hover:bg-[#2A2A2A] text-white text-xs font-semibold shadow-xs flex items-center gap-1.5"
              >
                <span>Enter CRM</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#A3E635]" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
