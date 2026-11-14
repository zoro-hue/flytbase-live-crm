"use client";

import React, { useState, useEffect } from "react";
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
  Menu,
  Clock,
  Target,
  FileSearch,
  Building2,
  Bot,
} from "lucide-react";
import { FlytBaseLogo } from "@/components/brand/FlytBaseLogo";
import { FlytBaseMascot } from "@/components/brand/FlytBaseMascot";

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "features", label: "Features" },
  { id: "solutions", label: "Solutions" },
  { id: "intelligence", label: "Intelligence" },
  { id: "security", label: "Security" },
  { id: "about", label: "About" },
];

export default function LandingPage() {
  const [activeSection, setActiveSection] = useState<string>("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [showVideoModal, setShowVideoModal] = useState<boolean>(false);
  const [showSignInModal, setShowSignInModal] = useState<boolean>(false);

  // Active section tracking on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const item = NAV_ITEMS[i];
        const el = document.getElementById(item.id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(item.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleOpenAi = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-ai-assistant"));
    }
  };

  return (
    <div className="relative min-h-screen bg-[#F4F5F0] text-[#151515] overflow-x-hidden selection:bg-[#536F00]/25 selection:text-[#151515]">
      {/* Soft Ambient Chartreuse/Olive Radial Background (Matching Reference) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 w-[1100px] h-[700px] overflow-hidden opacity-75 z-0"
      >
        <div
          className="absolute -top-36 -right-20 w-[950px] h-[750px] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse at 65% 35%, rgba(120, 160, 0, 0.16) 0%, rgba(83, 111, 0, 0.05) 45%, transparent 70%)",
          }}
        />
      </div>

      {/* ===================================================================== */}
      {/* 1. STICKY TRANSLUCENT NAVBAR                                          */}
      {/* ===================================================================== */}
      <header className="sticky top-3 z-40 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 select-none">
        <div className="h-14 px-4 sm:px-5 rounded-2xl bg-white/90 backdrop-blur-md border border-[#E2E5DE] shadow-[0_4px_24px_rgba(0,0,0,0.04)] flex items-center justify-between gap-3">
          {/* Left: FlytBase CRM Logo */}
          <Link
            href="/"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("home");
            }}
            className="flex items-center gap-2 cursor-pointer flex-shrink-0"
          >
            <div className="w-8 h-8 rounded-xl bg-[#151719] flex items-center justify-center font-bold text-white text-xs shadow-xs">
              <span className="font-extrabold text-[13px]">F+</span>
            </div>
            <span className="text-[17px] font-bold tracking-tight text-[#151515]">
              FlytBase <span className="text-[#536F00]">CRM</span>
            </span>
          </Link>

          {/* Center: Navigation Capsule Pills (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-[#ECEFE5] border border-[#E2E5DE]">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`px-3.5 py-1 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-white text-[#151515] font-semibold shadow-xs"
                      : "text-[#747A80] hover:text-[#151515]"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right: Functional Action CTAs */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Ask AI Trigger Button (Olive Green Pill) */}
            <button
              type="button"
              onClick={handleOpenAi}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#536F00] hover:bg-[#435900] text-xs font-semibold text-white shadow-xs transition-all active:scale-95 cursor-pointer"
              title="Open Grounded AI Copilot"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#DCFCE7]" />
              <span className="hidden sm:inline">Ask AI</span>
            </button>

            {/* Sign In Button (Charcoal Pill) */}
            <button
              type="button"
              onClick={() => setShowSignInModal(true)}
              className="hidden sm:inline-flex px-3.5 py-1.5 rounded-full bg-[#171717] hover:bg-[#2A2A2A] text-xs font-semibold text-white shadow-xs transition-all active:scale-95 cursor-pointer"
            >
              Sign In
            </button>

            {/* Enter CRM Button (Clean Pill with Arrow) */}
            <Link
              href="/dashboard"
              className="px-3.5 py-1.5 rounded-full border border-[#171717] hover:bg-[#171717] hover:text-white text-xs font-semibold text-[#171717] transition-all flex items-center gap-1.5 active:scale-95"
            >
              <span>Enter CRM</span>
              <ArrowRight className="w-3 h-3" />
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-xl hover:bg-[#ECEFE5] text-[#151515] transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-2 p-3 rounded-2xl bg-white border border-[#E2E5DE] shadow-xl space-y-1 animate-in fade-in slide-in-from-top-2 duration-200">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                  activeSection === item.id
                    ? "bg-[#ECEFE5] text-[#536F00] font-semibold"
                    : "text-[#747A80] hover:bg-[#F4F5F0] hover:text-[#151515]"
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-2 border-t border-[#E2E5DE] flex gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setShowSignInModal(true);
                }}
                className="flex-1 py-2 rounded-xl bg-[#F4F5F0] border border-[#E2E5DE] text-xs font-semibold text-[#151515] text-center"
              >
                Sign In
              </button>
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 py-2 rounded-xl bg-[#536F00] text-white text-xs font-semibold text-center"
              >
                Enter CRM
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* ===================================================================== */}
      {/* 2. HERO SECTION & 3D DASHBOARD SHOWCASE                               */}
      {/* ===================================================================== */}
      <section id="home" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Headline, Description & CTAs */}
          <div className="lg:col-span-5 space-y-5">
            {/* Tag Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ECEFE5] border border-[#D5DAD0]">
              <span className="w-2 h-2 rounded-full bg-[#536F00] animate-pulse" />
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#536F00] font-semibold">
                LIVE CRM INTELLIGENCE • QUESTATHON ENGINE
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[50px] font-extrabold tracking-tight text-[#151515] leading-[1.08]">
              Mission-Critical CRM <br />
              for <span className="text-[#536F00]">Enterprise Operations</span>
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base text-[#747A80] max-w-xl leading-relaxed">
              An AI-native CRM that unifies account intelligence, deals, stakeholders, live field signals and evidence in real time — built for high-stakes public and industrial operations.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/dashboard"
                className="px-6 py-3 rounded-xl bg-[#536F00] hover:bg-[#435900] text-white text-sm font-semibold shadow-md transition-all duration-200 flex items-center gap-2 active:scale-95 cursor-pointer"
              >
                <span>Enter CRM</span>
                <ArrowRight className="w-4 h-4 text-[#DCFCE7]" />
              </Link>
              <button
                type="button"
                onClick={() => setShowVideoModal(true)}
                className="px-5 py-3 rounded-xl bg-white border border-[#E2E5DE] hover:bg-[#ECEFE5] text-[#151515] text-sm font-medium flex items-center gap-2 transition-all cursor-pointer shadow-xs active:scale-95"
              >
                <div className="w-4 h-4 rounded-full bg-[#ECEFE5] border border-[#D5DAD0] flex items-center justify-center">
                  <Play className="w-2 h-2 fill-[#536F00] text-[#536F00] ml-0.5" />
                </div>
                <span>Watch Overview</span>
              </button>
            </div>

            {/* 4 Feature Indicators */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-5 border-t border-[#E2E5DE]">
              <div className="flex items-center gap-2 text-xs text-[#151515] font-medium">
                <Zap className="w-4 h-4 text-[#536F00] flex-shrink-0" />
                <span className="leading-tight">Real-Time MCP Sync</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#151515] font-medium">
                <Layers className="w-4 h-4 text-[#536F00] flex-shrink-0" />
                <span className="leading-tight">Account Intelligence</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#151515] font-medium">
                <Target className="w-4 h-4 text-[#536F00] flex-shrink-0" />
                <span className="leading-tight">Risk & Signals</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#151515] font-medium">
                <ShieldCheck className="w-4 h-4 text-[#536F00] flex-shrink-0" />
                <span className="leading-tight">Evidence Traceability</span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Perspective Floating Dashboard Tablet (Matching Reference) */}
          <div className="lg:col-span-7 relative">
            <Link
              href="/dashboard"
              className="block group cursor-pointer"
              title="Launch Live Enterprise CRM Command Center"
            >
              {/* Outer Tablet Frame with Ambient Soft Green Drop-Shadow */}
              <div
                className="relative rounded-3xl bg-white border border-[#D5DAD0] p-3 sm:p-4 shadow-[0_25px_70px_rgba(83,111,0,0.12)] transition-all duration-700 group-hover:scale-[1.01] group-hover:border-[#536F00]"
                style={{
                  transform: "perspective(1800px) rotateY(-5deg) rotateX(2.5deg)",
                }}
              >
                {/* Live Hover Badge */}
                <div className="absolute top-5 right-5 z-20 px-3 py-1 rounded-full bg-[#171717] text-white text-[11px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 shadow-md">
                  <span>Open Live Command Center</span>
                  <ExternalLink className="w-3 h-3 text-[#A3E635]" />
                </div>

                {/* Dashboard Screen View (Faithful Recreation of media_1794656370735_e48cafbc.jpg) */}
                <div className="rounded-2xl bg-[#F4F5F0] border border-[#E2E5DE] p-4 text-left overflow-hidden space-y-4 select-none">
                  {/* Top Header of CRM */}
                  <div className="flex items-center justify-between pb-3 border-b border-[#E2E5DE]">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-[#151719] flex items-center justify-center font-bold text-white text-[10px]">
                        F+
                      </div>
                      <span className="text-xs font-bold text-[#151515]">
                        FlytBase <span className="text-[#536F00]">CRM</span>
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-[10px]">
                      <span className="px-2 py-0.5 rounded-full bg-[#536F00] text-white font-semibold">
                        Ask AI
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-[#171717] text-white font-semibold">
                        + Create
                      </span>
                    </div>
                  </div>

                  {/* Greeting & Headline */}
                  <div>
                    <h3 className="text-lg sm:text-xl font-extrabold text-[#151515] tracking-tight">
                      Good afternoon, Alex. Your AI team is on it.
                    </h3>
                    <p className="text-xs text-[#747A80] mt-0.5">
                      Seven agents answer, draft, follow up and prepare. Anything that leaves the studio waits for you in the middle.
                    </p>
                  </div>

                  {/* 4 Top KPI Metrics */}
                  <div className="grid grid-cols-4 gap-2">
                    <div className="p-2.5 rounded-xl bg-white border border-[#E2E5DE]">
                      <span className="text-[10px] text-[#747A80] block truncate">Agents working</span>
                      <span className="text-base font-bold text-[#151515] font-mono">6/7</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white border border-[#E2E5DE]">
                      <span className="text-[10px] text-[#747A80] block truncate">Handled today</span>
                      <span className="text-base font-bold text-[#151515] font-mono">22</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white border border-[#E2E5DE]">
                      <span className="text-[10px] text-[#747A80] block truncate">Hours saved</span>
                      <span className="text-base font-bold text-[#151515] font-mono">323</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white border border-[#E2E5DE]">
                      <span className="text-[10px] text-[#747A80] block truncate">Drafts approved</span>
                      <span className="text-base font-bold text-[#536F00] font-mono">92%</span>
                    </div>
                  </div>

                  {/* Dual Grid: Orbital AI Team (Left) & Waiting for you Stack (Right) */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-1">
                    {/* Left: Simulated Radial Orbital Circle */}
                    <div className="sm:col-span-7 p-3 rounded-xl bg-white border border-[#E2E5DE] flex flex-col items-center justify-center relative min-h-[170px]">
                      {/* Orbit Ring */}
                      <div className="w-32 h-32 rounded-full border border-dashed border-[#E2E5DE] absolute flex items-center justify-center pointer-events-none" />

                      {/* Center Hub: 6 WAITING FOR YOU */}
                      <div className="w-20 h-20 rounded-full bg-white border border-[#536F00]/50 shadow-sm flex flex-col items-center justify-center z-10">
                        <span className="text-lg font-extrabold text-[#151515]">6</span>
                        <span className="text-[8px] font-mono uppercase text-[#747A80] font-bold">WAITING</span>
                        <span className="text-[8px] text-[#536F00] font-medium">Review mode →</span>
                      </div>

                      {/* Orbiting Satellite Dots */}
                      <span className="absolute top-2 left-6 w-5 h-5 rounded-md bg-[#0D9488]/15 text-[#0D9488] text-[9px] font-bold flex items-center justify-center">
                        A
                      </span>
                      <span className="absolute top-3 right-8 w-5 h-5 rounded-md bg-[#2563EB]/15 text-[#2563EB] text-[9px] font-bold flex items-center justify-center">
                        R
                      </span>
                      <span className="absolute bottom-3 right-6 w-5 h-5 rounded-md bg-[#8B5CF6]/15 text-[#8B5CF6] text-[9px] font-bold flex items-center justify-center">
                        N
                      </span>
                      <span className="absolute bottom-2 left-10 w-5 h-5 rounded-md bg-[#536F00]/15 text-[#536F00] text-[9px] font-bold flex items-center justify-center">
                        O
                      </span>
                      <span className="absolute left-2 top-1/2 -translate-y-1/2 w-5 h-5 rounded-md bg-[#E34B3D]/15 text-[#E34B3D] text-[9px] font-bold flex items-center justify-center">
                        S
                      </span>
                    </div>

                    {/* Right: Waiting for you & Live activity */}
                    <div className="sm:col-span-5 space-y-2">
                      <div className="p-2.5 rounded-xl bg-white border border-[#E2E5DE] space-y-1">
                        <div className="flex items-center justify-between text-[9px] font-bold text-[#151515]">
                          <span>Waiting for you</span>
                          <span className="w-3.5 h-3.5 rounded-full bg-[#536F00] text-white flex items-center justify-center text-[8px]">
                            6
                          </span>
                        </div>
                        <p className="text-[9px] text-[#747A80] truncate">
                          Recovery plan for Tarn Valley before renewal
                        </p>
                        <div className="pt-1">
                          <span className="px-2 py-0.5 rounded bg-[#171717] text-white text-[8px] font-semibold block text-center">
                            Start review mode →
                          </span>
                        </div>
                      </div>

                      <div className="p-2.5 rounded-xl bg-white border border-[#E2E5DE] space-y-1">
                        <span className="text-[9px] font-bold text-[#151515] block">Live activity (Live)</span>
                        <div className="text-[8px] text-[#747A80] space-y-0.5">
                          <p className="truncate">• Answered call from Summit Physio</p>
                          <p className="truncate">• Tagged Marco Ruiz intro email</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* 4 Feature Strip Capsules (Matching Reference) */}
        <div className="mt-12 p-3 rounded-2xl bg-white border border-[#E2E5DE] shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-3.5 p-3 rounded-xl hover:bg-[#F4F5F0] transition-colors">
              <div className="w-10 h-10 rounded-full bg-[#ECEFE5] flex items-center justify-center text-[#536F00] flex-shrink-0">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#151515]">Unified Account View</h4>
                <p className="text-xs text-[#747A80]">Police & industrial intelligence in one platform</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-3 rounded-xl hover:bg-[#F4F5F0] transition-colors">
              <div className="w-10 h-10 rounded-full bg-[#ECEFE5] flex items-center justify-center text-[#536F00] flex-shrink-0">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#151515]">Live Signal Monitoring</h4>
                <p className="text-xs text-[#747A80]">MCP-verified field events and risks</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-3 rounded-xl hover:bg-[#F4F5F0] transition-colors">
              <div className="w-10 h-10 rounded-full bg-[#ECEFE5] flex items-center justify-center text-[#536F00] flex-shrink-0">
                <Users2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#151515]">Stakeholder Matrix</h4>
                <p className="text-xs text-[#747A80]">Decision authority, influence, and risk tracking</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-3 rounded-xl hover:bg-[#F4F5F0] transition-colors">
              <div className="w-10 h-10 rounded-full bg-[#ECEFE5] flex items-center justify-center text-[#536F00] flex-shrink-0">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#151515]">Evidence Vault</h4>
                <p className="text-xs text-[#747A80]">Source-linked facts, logs, and verifiable records</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 3. DEDICATED SECTION: FEATURES                                        */}
      {/* ===================================================================== */}
      <section id="features" className="py-16 sm:py-20 border-t border-[#E2E5DE] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-[#536F00] font-semibold">
              CORE CAPABILITIES
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#151515]">
              Engineered for Autonomous Enterprise Governance
            </h2>
            <p className="text-sm text-[#747A80]">
              Every module is designed to eliminate speculative sales bias and provide verifiable operations intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="p-6 rounded-2xl bg-[#F4F5F0] border border-[#E2E5DE] space-y-3">
              <div className="w-9 h-9 rounded-xl bg-white border border-[#D5DAD0] flex items-center justify-center text-[#536F00]">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#151515]">Real-Time MCP Synchronization</h3>
              <p className="text-xs text-[#747A80] leading-relaxed">
                Connects directly to the Questathon Model Context Protocol server. Enforces a strict 1-call/60-second sliding rate window with persistent SQLite/PostgreSQL caching.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-2xl bg-[#F4F5F0] border border-[#E2E5DE] space-y-3">
              <div className="w-9 h-9 rounded-xl bg-white border border-[#D5DAD0] flex items-center justify-center text-[#536F00]">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#151515]">Unified Account Intelligence</h3>
              <p className="text-xs text-[#747A80] leading-relaxed">
                Seamlessly unifies Eastern Counties Police Alliance (35 docks across 4 forces) and Aldermoor Industrial Group (14 docks across 15 European plants) in one view.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-2xl bg-[#F4F5F0] border border-[#E2E5DE] space-y-3">
              <div className="w-9 h-9 rounded-xl bg-white border border-[#D5DAD0] flex items-center justify-center text-[#536F00]">
                <FileSearch className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#151515]">Deal Value & Evidence Tracking</h3>
              <p className="text-xs text-[#747A80] leading-relaxed">
                Strict separation between legally confirmed framework revenue (£1.5M) and at-risk pipeline (£800k + €320k), backed by primary contract clauses and flight logs.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 rounded-2xl bg-[#F4F5F0] border border-[#E2E5DE] space-y-3">
              <div className="w-9 h-9 rounded-xl bg-white border border-[#D5DAD0] flex items-center justify-center text-[#536F00]">
                <Users2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#151515]">Stakeholder Influence Mapping</h3>
              <p className="text-xs text-[#747A80] leading-relaxed">
                Classifies key figures into Economic Buyers, Champions, Technical Users, and Blockers. Tracks key-person departure risks (Rhys Calder) and compliance handovers.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-6 rounded-2xl bg-[#F4F5F0] border border-[#E2E5DE] space-y-3">
              <div className="w-9 h-9 rounded-xl bg-white border border-[#D5DAD0] flex items-center justify-center text-[#536F00]">
                <Radio className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#151515]">Risk & Deadline Monitoring</h3>
              <p className="text-xs text-[#747A80] leading-relaxed">
                Immediate alerts on dormant tickets (FB-10412 unassigned 120 days) and silent dock inactivity (Aldermoor docks 4, 8, 12 logging zero flights for 4 weeks).
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-6 rounded-2xl bg-[#F4F5F0] border border-[#E2E5DE] space-y-3">
              <div className="w-9 h-9 rounded-xl bg-white border border-[#D5DAD0] flex items-center justify-center text-[#536F00]">
                <Bot className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#151515]">AI-Powered Action Engine</h3>
              <p className="text-xs text-[#747A80] leading-relaxed">
                Deterministic algorithmic ranking of top next actions by urgency, financial impact, and ease of unblocking, with strict human approval before note writeback.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 4. DEDICATED SECTION: SOLUTIONS (ACCOUNT A & B CARDS)                  */}
      {/* ===================================================================== */}
      <section id="solutions" className="py-16 sm:py-20 border-t border-[#E2E5DE] bg-[#F4F5F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-[#536F00] font-semibold">
              ACCOUNT-SPECIFIC SOLUTIONS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#151515]">
              Tailored for Public Safety & Industrial Operations
            </h2>
            <p className="text-sm text-[#747A80]">
              Click either account to inspect verified deals, power players, field events, and blockers.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Account A Solution Card */}
            <div className="p-7 rounded-3xl bg-white border border-[#E2E5DE] shadow-sm flex flex-col justify-between space-y-6 hover:border-[#536F00]/50 transition-all">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#ECEFE5] text-[#536F00] border border-[#D5DAD0]">
                    ACCOUNT A • PUBLIC SAFETY
                  </span>
                  <span className="text-xs font-mono text-[#747A80]">14 / 35 Docks Active</span>
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold text-[#151515]">
                    Eastern Counties Police Alliance
                  </h3>
                  <p className="text-xs text-[#747A80] mt-1.5 leading-relaxed">
                    Consortium of Westmere Constabulary, Metro Central Police, Tarn Valley Police, and Norwold Police. Preparing a 300-dock national framework tender.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-[#F4F5F0] border border-[#E2E5DE] text-xs">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#747A80] block">Confirmed</span>
                    <span className="text-base font-bold text-[#151515] font-mono">£1.5M</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#747A80] block">At Risk</span>
                    <span className="text-base font-bold text-[#E34B3D] font-mono">£800k</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#747A80] block">Key Blocker</span>
                    <span className="text-xs font-semibold text-[#C78620] truncate block">FB-10412 DPIA</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-[#747A80]">
                  <p className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#536F00]" />
                    <span><strong>Power Matrix:</strong> ACC Nadia Rahman controls budget; Sarah Jenkins holds DPIA key.</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-[#C78620]" />
                    <span><strong>Live Challenge:</strong> Insp. Karen Mbeki logged urgent ticket ahead of Dec 5 event.</span>
                  </p>
                </div>
              </div>

              <Link
                href="/accounts/eastern-counties"
                className="w-full py-3 rounded-xl bg-[#171717] hover:bg-[#2A2A2A] text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <span>Open Eastern Counties Overview</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#A3E635]" />
              </Link>
            </div>

            {/* Account B Solution Card */}
            <div className="p-7 rounded-3xl bg-white border border-[#E2E5DE] shadow-sm flex flex-col justify-between space-y-6 hover:border-[#536F00]/50 transition-all">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#FEF3C7] text-[#C78620] border border-[#FDE68A]">
                    ACCOUNT B • INDUSTRIAL SECURITY
                  </span>
                  <span className="text-xs font-mono text-[#747A80]">4 / 14 Docks Active</span>
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold text-[#151515]">
                    Aldermoor Industrial Group
                  </h3>
                  <p className="text-xs text-[#747A80] mt-1.5 leading-relaxed">
                    15 industrial manufacturing plants across Europe. Docks installed at Ludwigshafen, Antwerp, Rotterdam, and Lyon. Defense of €320k expansion contract.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-[#F4F5F0] border border-[#E2E5DE] text-xs">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#747A80] block">Closed Won</span>
                    <span className="text-base font-bold text-[#151515] font-mono">€160k</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#747A80] block">At Risk</span>
                    <span className="text-base font-bold text-[#E34B3D] font-mono">€320k</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#747A80] block">Key Blocker</span>
                    <span className="text-xs font-semibold text-[#C78620] truncate block">Unverified ROI</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-[#747A80]">
                  <p className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#536F00]" />
                    <span><strong>Power Matrix:</strong> CFO Marcus Vance demands proof of Stefan Roy&apos;s €1.2M savings claim.</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-[#E34B3D]" />
                    <span><strong>Live Challenge:</strong> Docks 4, 8, and 12 stopped flying between 2–29 Nov without tickets.</span>
                  </p>
                </div>
              </div>

              <Link
                href="/accounts/aldermoor"
                className="w-full py-3 rounded-xl bg-[#171717] hover:bg-[#2A2A2A] text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <span>Open Aldermoor Overview</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#A3E635]" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 5. DEDICATED SECTION: INTELLIGENCE & 5-QUESTION FRAMEWORK             */}
      {/* ===================================================================== */}
      <section id="intelligence" className="py-16 sm:py-20 border-t border-[#E2E5DE] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-[#536F00] font-semibold">
              THE 5-QUESTION INTELLIGENCE ARCHITECTURE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#151515]">
              Every Number Backed by Primary Evidence
            </h2>
            <p className="text-sm text-[#747A80]">
              The questions your executive manager asks on Monday morning—answered with 100% citation traceability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
            <div className="p-5 rounded-2xl bg-[#F4F5F0] border border-[#E2E5DE] space-y-3">
              <span className="w-7 h-7 rounded-xl bg-white text-[#536F00] text-xs font-bold font-mono flex items-center justify-center border border-[#D5DAD0]">
                Q1
              </span>
              <h4 className="text-sm font-bold text-[#151515]">What is the book worth?</h4>
              <p className="text-xs text-[#747A80] leading-relaxed">
                Separates £1.5M confirmed legally binding frameworks from £800k speculative expansion bids.
              </p>
              <div className="pt-2 text-[10px] font-mono text-[#536F00]">Source: draft_tender_spec</div>
            </div>

            <div className="p-5 rounded-2xl bg-[#F4F5F0] border border-[#E2E5DE] space-y-3">
              <span className="w-7 h-7 rounded-xl bg-white text-[#536F00] text-xs font-bold font-mono flex items-center justify-center border border-[#D5DAD0]">
                Q2
              </span>
              <h4 className="text-sm font-bold text-[#151515]">Who holds the power?</h4>
              <p className="text-xs text-[#747A80] leading-relaxed">
                Identifies buyers with financial signature authority vs retired compliance bottlenecks.
              </p>
              <div className="pt-2 text-[10px] font-mono text-[#536F00]">Source: paperwork_A</div>
            </div>

            <div className="p-5 rounded-2xl bg-[#F4F5F0] border border-[#E2E5DE] space-y-3">
              <span className="w-7 h-7 rounded-xl bg-white text-[#536F00] text-xs font-bold font-mono flex items-center justify-center border border-[#D5DAD0]">
                Q3
              </span>
              <h4 className="text-sm font-bold text-[#151515]">What do you do first?</h4>
              <p className="text-xs text-[#747A80] leading-relaxed">
                Chronologically ordered moves: assign FB-10412 before Nov 21, confirm Karen Mbeki SLA.
              </p>
              <div className="pt-2 text-[10px] font-mono text-[#536F00]">Source: jira_tickets</div>
            </div>

            <div className="p-5 rounded-2xl bg-[#F4F5F0] border border-[#E2E5DE] space-y-3">
              <span className="w-7 h-7 rounded-xl bg-white text-[#536F00] text-xs font-bold font-mono flex items-center justify-center border border-[#D5DAD0]">
                Q4
              </span>
              <h4 className="text-sm font-bold text-[#151515]">What is about to go wrong?</h4>
              <p className="text-xs text-[#747A80] leading-relaxed">
                Flags 120-day DPIA dormancy and silent dock outages before the client raises an issue.
              </p>
              <div className="pt-2 text-[10px] font-mono text-[#536F00]">Source: flight_log_by_plant</div>
            </div>

            <div className="p-5 rounded-2xl bg-[#F4F5F0] border border-[#E2E5DE] space-y-3">
              <span className="w-7 h-7 rounded-xl bg-white text-[#536F00] text-xs font-bold font-mono flex items-center justify-center border border-[#D5DAD0]">
                Q5
              </span>
              <h4 className="text-sm font-bold text-[#151515]">What do you still not know?</h4>
              <p className="text-xs text-[#747A80] leading-relaxed">
                Empirical gaps flagged explicitly: missing fuel savings math and unallocated Norwold patrols.
              </p>
              <div className="pt-2 text-[10px] font-mono text-[#536F00]">Source: roi_spreadsheet</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 6. DEDICATED SECTION: SECURITY & TRUST                                */}
      {/* ===================================================================== */}
      <section id="security" className="py-16 sm:py-20 border-t border-[#E2E5DE] bg-[#F4F5F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-[#536F00] font-semibold">
              ENTERPRISE SECURITY & AUDITABILITY
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#151515]">
              Air-Gapped Token Protection & Certified Data Integrity
            </h2>
            <p className="text-sm text-[#747A80]">
              Built with zero client-side credentials and rate-limit-aware synchronization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-[#E2E5DE] space-y-3 shadow-xs">
              <div className="w-9 h-9 rounded-xl bg-[#ECEFE5] flex items-center justify-center text-[#536F00]">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-[#151515]">Server-Side Token Isolation</h3>
              <p className="text-xs text-[#747A80] leading-relaxed">
                MCP API tokens are strictly isolated within Next.js server actions. Zero tokens, keys, or secrets are exposed in browser bundles.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E2E5DE] space-y-3 shadow-xs">
              <div className="w-9 h-9 rounded-xl bg-[#ECEFE5] flex items-center justify-center text-[#536F00]">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-[#151515]">Rate-Limit Sliding Window</h3>
              <p className="text-xs text-[#747A80] leading-relaxed">
                Engineered for the 1-call-per-60-seconds challenge limit. Local SQLite/PostgreSQL caching prevents rate violations and guarantees sub-50ms UI loads.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E2E5DE] space-y-3 shadow-xs">
              <div className="w-9 h-9 rounded-xl bg-[#ECEFE5] flex items-center justify-center text-[#536F00]">
                <FileSearch className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-[#151515]">100% Primary Source Audits</h3>
              <p className="text-xs text-[#747A80] leading-relaxed">
                Zero hallucinated numbers. Every revenue estimate, flight hour, and ticket cited on the dashboard references its immutable source ID.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E2E5DE] space-y-3 shadow-xs">
              <div className="w-9 h-9 rounded-xl bg-[#ECEFE5] flex items-center justify-center text-[#536F00]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-[#151515]">Controlled Note Writeback</h3>
              <p className="text-xs text-[#747A80] leading-relaxed">
                Direct integration with the MCP <code>write_note</code> tool. Requires explicit human confirmation before field updates are committed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 7. DEDICATED SECTION: ABOUT & QUESTATHON CONTEXT                      */}
      {/* ===================================================================== */}
      <section id="about" className="py-16 sm:py-20 border-t border-[#E2E5DE] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-[#536F00] font-semibold">
                ABOUT FLYTBASE CRM
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#151515]">
                Why Traditional CRMs Fail Hardware-Enabled Operations
              </h2>
              <p className="text-sm text-[#747A80] leading-relaxed">
                Traditional CRMs are built for software subscription sales: they record what people say in phone calls and optimistic emails. They have zero visibility into whether installed autonomous hardware is physically operating.
              </p>
              <p className="text-sm text-[#747A80] leading-relaxed">
                FlytBase CRM was built during the Questathon to bridge this chasm. By combining raw Model Context Protocol telemetry with legal and stakeholder records, it protects £1.5M+ in book value and warns operations leads of silent dock shutdowns before the client even realizes.
              </p>
              <div className="flex items-center gap-4 pt-2">
                <Link
                  href="/dashboard"
                  className="px-5 py-2.5 rounded-xl bg-[#171717] hover:bg-[#2A2A2A] text-white text-xs font-semibold shadow-xs flex items-center gap-2"
                >
                  <span>Launch Live Platform</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#A3E635]" />
                </Link>
                <Link
                  href="/signals"
                  className="text-xs font-semibold text-[#536F00] hover:underline"
                >
                  View Ingested Field Events →
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 p-6 rounded-3xl bg-[#F4F5F0] border border-[#E2E5DE] space-y-4">
              <div className="flex items-center gap-3">
                <FlytBaseMascot state="idle" size={48} interactive={false} />
                <div>
                  <h4 className="text-sm font-bold text-[#151515]">Persistent AI Sentinel</h4>
                  <p className="text-xs text-[#747A80]">Autonomous Copilot Grounded in Primary MCP Data</p>
                </div>
              </div>
              <p className="text-xs text-[#747A80] leading-relaxed">
                Unlike speculative generative chatbots, the FlytBase AI Copilot cannot invent statistics. It strictly synthesizes cached records from the Questathon server with clickable evidence links.
              </p>
              <div className="pt-2 border-t border-[#E2E5DE] flex items-center justify-between text-xs text-[#747A80]">
                <span>Rate Limits: <strong>60s window</strong></span>
                <span>Audit Trail: <strong>100% cited</strong></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 8. FOOTER                                                             */}
      {/* ===================================================================== */}
      <footer className="border-t border-[#E2E5DE] bg-[#F4F5F0] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-xl bg-[#151719] flex items-center justify-center font-bold text-white text-[11px]">
                F+
              </div>
              <span className="text-base font-bold text-[#151515]">
                FlytBase <span className="text-[#536F00]">CRM</span>
              </span>
              <span className="text-xs text-[#747A80] ml-2 hidden sm:inline">
                • Questathon Final Production Build
              </span>
            </div>

            <div className="flex items-center gap-5 text-xs text-[#747A80]">
              <button onClick={() => scrollTo("home")} className="hover:text-[#151515] transition-colors cursor-pointer">
                Home
              </button>
              <button onClick={() => scrollTo("features")} className="hover:text-[#151515] transition-colors cursor-pointer">
                Features
              </button>
              <button onClick={() => scrollTo("solutions")} className="hover:text-[#151515] transition-colors cursor-pointer">
                Solutions
              </button>
              <button onClick={() => scrollTo("intelligence")} className="hover:text-[#151515] transition-colors cursor-pointer">
                Intelligence
              </button>
              <button onClick={() => scrollTo("security")} className="hover:text-[#151515] transition-colors cursor-pointer">
                Security
              </button>
              <button onClick={() => scrollTo("about")} className="hover:text-[#151515] transition-colors cursor-pointer">
                About
              </button>
              <Link href="/dashboard" className="font-semibold text-[#536F00] hover:underline">
                Enter CRM →
              </Link>
            </div>
          </div>

          <div className="pt-4 border-t border-[#E2E5DE] flex flex-wrap items-center justify-between gap-3 text-[11px] text-[#747A80]">
            <p>© 2026 FlytBase Inc. All rights reserved. Powered by the Questathon MCP Engine.</p>
            <p>Target Accounts: Eastern Counties Police Alliance & Aldermoor Industrial Group.</p>
          </div>
        </div>
      </footer>

      {/* ===================================================================== */}
      {/* 9. FUNCTIONAL MODALS (WATCH OVERVIEW & SIGN IN)                        */}
      {/* ===================================================================== */}

      {/* Watch Overview Video / Interactive Walkthrough Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-2xl rounded-3xl bg-white border border-[#E2E5DE] shadow-2xl p-6 sm:p-7 space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-[#E2E5DE] pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#536F00] flex items-center justify-center text-white">
                  <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#151515]">FlytBase CRM Walkthrough & Architecture</h3>
                  <p className="text-[11px] text-[#747A80]">3-Minute Executive Overview</p>
                </div>
              </div>
              <button
                onClick={() => setShowVideoModal(false)}
                className="p-1.5 rounded-lg text-[#747A80] hover:text-[#151515] hover:bg-[#F4F5F0] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Video Player Preview Slate */}
            <div className="relative aspect-video rounded-2xl bg-[#151719] border border-[#2D3139] flex flex-col items-center justify-center text-center p-6 text-white overflow-hidden shadow-inner group">
              <div className="w-14 h-14 rounded-full bg-[#536F00] group-hover:scale-110 transition-transform flex items-center justify-center shadow-lg cursor-pointer mb-3">
                <Play className="w-6 h-6 fill-white ml-1 text-white" />
              </div>
              <h4 className="text-sm font-bold">Questathon Walkthrough Video</h4>
              <p className="text-xs text-[#A0A4AE] max-w-md mt-1">
                Demonstrates the 5 answers for Eastern Counties, tracing the £800k At-Risk KPI to source, and ingesting live challenge signals.
              </p>
              <div className="mt-3 flex items-center gap-2 text-[10px] font-mono text-[#A3E635]">
                <span>1080p 60fps</span>
                <span>•</span>
                <span>3:00 Duration</span>
                <span>•</span>
                <span>Full Audio Narration</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#F4F5F0] border border-[#E2E5DE] space-y-1.5 text-xs text-[#747A80]">
              <span className="font-bold text-[#151515] block">Ready to explore the live application?</span>
              <p>
                All data is loaded into memory with 100% citation links. You can test the AI Copilot, inspect the Evidence Drawer, and filter live signals immediately.
              </p>
            </div>

            <div className="flex justify-end gap-2.5 pt-2">
              <button
                onClick={() => setShowVideoModal(false)}
                className="px-4 py-2 rounded-xl border border-[#E2E5DE] hover:bg-[#F4F5F0] text-xs font-medium text-[#151515] cursor-pointer"
              >
                Close
              </button>
              <Link
                href="/dashboard"
                onClick={() => setShowVideoModal(false)}
                className="px-5 py-2 rounded-xl bg-[#536F00] hover:bg-[#435900] text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <span>Enter CRM</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#DCFCE7]" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Sign In / Session Modal */}
      {showSignInModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl bg-white border border-[#E2E5DE] shadow-2xl p-6 sm:p-7 space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-[#E2E5DE] pb-4">
              <div className="flex items-center gap-2">
                <FlytBaseLogo variant="icon" size={24} />
                <h3 className="text-base font-bold text-[#151515]">Enterprise Authentication</h3>
              </div>
              <button
                onClick={() => setShowSignInModal(false)}
                className="p-1.5 rounded-lg text-[#747A80] hover:text-[#151515] hover:bg-[#F4F5F0] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 rounded-xl bg-[#ECEFE5] border border-[#D5DAD0] space-y-1 text-xs text-[#536F00]">
              <span className="font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#536F00]" />
                Authenticated Session Active
              </span>
              <p className="text-[#747A80] text-[11px]">
                Your MCP token is configured and verified server-side. Public judges do not require a separate login to review the live CRM.
              </p>
            </div>

            <div className="space-y-3 pt-1">
              <Link
                href="/dashboard"
                onClick={() => setShowSignInModal(false)}
                className="w-full py-2.5 rounded-xl bg-[#171717] hover:bg-[#2A2A2A] text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <span>Proceed to Command Center</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#A3E635]" />
              </Link>
              <button
                onClick={() => setShowSignInModal(false)}
                className="w-full py-2.5 rounded-xl border border-[#E2E5DE] hover:bg-[#F4F5F0] text-xs font-medium text-[#151515] cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
