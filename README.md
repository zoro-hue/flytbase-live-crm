# FlytBase Live CRM — Questathon Challenge

[![Production Build](https://img.shields.io/badge/build-passing-brightgreen.svg)]()
[![Framework](https://img.shields.io/badge/framework-Next.js%2015-black.svg)]()
[![Protocol](https://img.shields.io/badge/protocol-Model%20Context%20Protocol%20(MCP)-blue.svg)]()
[![License](https://img.shields.io/badge/license-MIT-green.svg)]()

A production-ready, evidence-backed, live enterprise CRM built for FlytBase autonomous drone operations across two core enterprise accounts:
1. **Eastern Counties Police Alliance** (Account A) — UK Public Safety Consortium (35 docks across 4 county forces).
2. **Aldermoor Industrial Group** (Account B) — European Industrial Manufacturing & Perimeter Security (14 docks across 15 European plants).

Connected directly to the official **Questathon MCP Server** via JSON-RPC 2.0 over HTTPS.

---

## 🌟 Key Features

- **Public Landing Page & 3D Interactive Showcase**:
  - Matches the official FlytBase brand identity with warm off-white canvas (`#F4F5F0`), deep charcoal typography (`#151515`), and olive-green accents (`#536F00`).
  - Interactive 3D perspective dashboard showcase running live CRM telemetry.
  - Fully functional smooth-scroll navigation: `#home`, `#features`, `#solutions`, `#intelligence`, `#security`, `#about`.
  - Working **Ask AI**, **Watch Overview**, **Sign In**, and **Enter CRM** CTAs.

- **Real-Time MCP Synchronization**:
  - Server-side JSON-RPC protocol implementation communicating with the live Questathon endpoint (`https://questathon.aihackerscollective.com/api/public/mcp`).
  - Strict **1-call-per-60-seconds** sliding rate limiter enforced via a persistent server queue to prevent HTTP 429 throttling.
  - Sub-50ms UI response times via local SQLite/PostgreSQL caching.

- **Reactive AI Robot Mascot Copilot**:
  - Persistent bottom-left AI mascot with 3 reactive cognitive states:
    - **Idle**: Gentle breathing float, glowing cyan circular eyes (`#38BDF8`), friendly smile, antenna star beacon.
    - **Thinking**: Animated three-dot LED sequence (`• • •`), spinning star beacon while synthesizing MCP telemetry.
    - **Speaking**: Expressive happy crescent eyes (`^ ^`), talking mouth animation, and sound wave particles.
  - Strictly grounded AI Copilot that cites primary documentary records with zero hallucinated statistics.

- **Glass Optical Section Transitions**:
  - 950ms optical glass dissolve transition with horizontal motion blur (`10px`), subtle 3D perspective fold (`rotateY: ±10deg`), and a central olive-green refraction line (`#536F00`).

- **Five Foundational Answers Per Account**:
  1. *What is the book worth?* — Strict separation between confirmed framework revenue (£1.5M) and at-risk pipeline (£800k + €320k).
  2. *Who holds the power?* — Authority mapping (ACC Nadia Rahman, CFO Marcus Vance) with single-threaded relationship alerts.
  3. *What do you do first?* — Chronologically ranked next moves with named owners, deadlines, and deal impact.
  4. *What is about to go wrong?* — Risk vectors tracking 120-day unassigned DPIA tickets (FB-10412) and silent dock drop-offs.
  5. *What do you still not know?* — Empirical blind spots (unverified €1.2M fuel reduction claims, Norwold patrol budgets).

- **Real-Time Ingestion of Challenge Field Signals**:
  - **Account B (30 Nov)**: 3 docks (Plants 3, 5, 9) stopped flying during 2–29 November despite remaining online; silent disengagement with zero tickets raised.
  - **Account A (18 Nov)**: Unanswered ticket from Insp. Karen Mbeki requiring operator training dates and failover protocol ahead of 5 Dec VIP event.
  - **Account A (17 Nov)**: Alliance drone lead Rhys Calder departing in January; single-threaded relationship risk and lack of central successor.

- **Bi-Directional Notes Writeback**:
  - Authenticated calls to the official MCP `write_note` endpoint (`note`, `task`, `risk`, `next_step`), verified with live server-assigned note IDs.

---

## 🛠 Technology Stack

- **Framework**: Next.js 15 (App Router, Server Actions, Client Components)
- **Language**: TypeScript 5 (Strict Mode)
- **Styling**: Tailwind CSS with custom light-theme tokens
- **Animations**: Framer Motion & CSS 3D Transforms
- **Icons**: Lucide React & Custom Brand Vectors
- **Visualizations**: Recharts (Custom SVG Radar Health Map, Sankey Flow, Multi-Track Runway, Deal Scatter)
- **Database / Cache**: PostgreSQL with Prisma ORM + local persistent SQLite cache
- **Protocol**: Model Context Protocol (MCP) JSON-RPC 2.0 over HTTPS POST

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/zoro-hue/flytbase-live-crm.git
cd flytbase-live-crm
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Populate the required credentials in `.env.local` (placeholders only in source control):
```env
AQ_TOKEN=your_questathon_mcp_token_here
DATABASE_URL=postgresql://user:password@host:port/database
```

> **Security Note**: `AQ_TOKEN` is strictly consumed server-side in API routes and never exposed to client-side bundles, GitHub, or build artifacts. `.env.local` is permanently ignored via `.gitignore`.

### 3. Install Dependencies
```bash
npm install
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Production Build & Start
```bash
npm run build
npm start
```

---

## 📡 MCP Integration Mechanics

### JSON-RPC Request Structure
Requests to the MCP endpoint use HTTP POST with Bearer authentication:
```json
{
  "jsonrpc": "2.0",
  "id": 1794645636222,
  "method": "tools/call",
  "params": {
    "name": "get_signals",
    "arguments": {}
  }
}
```

### Supported Tools
- `get_my_accounts`: Discovers account metadata, facts, opportunities, and offers.
- `get_all_paperwork`: Retrieves call transcripts, email logs, tickets, and contracts.
- `get_file`: Fetches raw CSV and text files (`flight_log_by_plant`, `roi_spreadsheet`, `dataflow_pack`, etc.).
- `get_signals`: Live change and telemetry detection.
- `get_flytbase_team`: Team roles and ownership directory.
- `list_notes`: Fetches persisted notes from MCP server.
- `write_note`: Creates notes on the server (`kind: "note" | "task" | "risk" | "next_step"`).

### Rate-Limiter Architecture
To obey the **one call per 60 seconds** token quota:
1. `McpRateLimiter` maintains a persistent timestamp of the last executed request.
2. If another request arrives within 60 seconds, it is either safely enqueued or returned from persistent local cache.
3. The UI TopNavbar and Command Center display live connection pulse and sync freshness status.

---

## 📊 Account Intelligence Summary

| Dimension | Eastern Counties Police Alliance (A) | Aldermoor Industrial Group (B) |
|---|---|---|
| **Confirmed Framework** | £1,500,000 (300-dock national tender) | €160,000 (Won docks expansion) |
| **Active Pipeline** | £285,000 (Metro Central, support, training) | €50,000 (Plant 7 night support offer) |
| **At-Risk Value** | £800,000 (35-dock renewal + Tarn/Norwold) | €320,000 (14-dock renewal + 9 idle plants) |
| **Unverified Claims** | £300,000 (Stadium project 30-dock claim) | €1,200,000 (Stefan Roy spreadsheet ROI) |
| **Key Champions** | Insp. Karen Mbeki (Westmere), Rhys Calder | Stefan Roy (Head of Security), Beatriz Alonso |
| **Key Gatekeepers** | Sarah Jenkins (DPO), Ewan Brooks (Finance) | Marcus Vance (Group CFO) |
| **Top Blocker** | DPIA unassigned 4 mos (Ticket FB-10412) | Finance cannot verify savings claim |
| **Key Person Risk** | Rhys Calder leaving in January | Stefan's Deputy leaving in Nov/Dec |
| **Live Alert** | Karen Mbeki unanswered 5 Dec event ticket | 3 docks stopped flying 2–29 Nov (silent) |

---

## ☁️ Deployment Instructions

### Deploy to Vercel
1. Push this repository to GitHub: `https://github.com/zoro-hue/flytbase-live-crm`.
2. Import the project in your [Vercel Dashboard](https://vercel.com).
3. In **Project Settings &rarr; Environment Variables**, add:
   - `AQ_TOKEN`: Your Questathon MCP token.
   - `DATABASE_URL`: Your PostgreSQL connection string (Supabase, Neon, or Railway).
4. Click **Deploy**. The site will build statically and dynamically handle API routes without exposing tokens.

---

## 🔒 Security Compliance

- Server-side environment isolation for `AQ_TOKEN`.
- Zero credentials or tokens committed to version control.
- Input validation and sanitization prior to MCP `write_note` submission.
- Complete audit trails in `data/mcp_rate_state.json`.

---

## 📄 License & Attribution

Built for the **FlytBase Questathon Challenge**. All account personas, logs, and files are simulated enterprise records powered by the official Hackers Collective MCP endpoint.
