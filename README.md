# FlytBase Live CRM — Questathon Challenge

Production-ready, evidence-backed, live enterprise CRM dashboard built for FlytBase autonomous drone deployments across two key enterprise accounts:
1. **Eastern Counties Police Alliance** (Account A) — UK Public Safety Consortium
2. **Aldermoor Industrial Group** (Account B) — European Industrial Manufacturing & Perimeter Security

Connected directly to the official **Questathon MCP Server** via JSON-RPC over HTTPS.

---

## 🌟 Architecture & Core Capabilities

- **Real-Time MCP Server Integration**: Server-side JSON-RPC protocol implementation communicating with the live Questathon endpoint (`https://questathon.aihackerscollective.com/api/public/mcp`).
- **Strict 1-Call-Per-Minute Rate Limiter**: Persistent token-bucket queue enforcing a 60-second cooldown across reads and write operations to prevent HTTP 429 throttling.
- **Bi-Directional Notes Write-Back**: Real MCP write-back using the official `write_note` tool (`note`, `task`, `risk`, `next_step`), verified with live server-assigned note IDs.
- **Evidence Provenance & Traceability**: Every financial number, stakeholder authority claim, and risk vector is backed by an indexed MCP source ID (`flight_log_force_month`, `roi_spreadsheet`, `draft_tender_spec`, `tickets.json`, `support_ticket_history`, etc.).
- **Five Critical Business Questions Answered for Both Accounts**:
  1. *What is the book worth?* — Strict pipeline audit distinguishing confirmed contracts, active expansion offers, at-risk renewals, and unsupported projections.
  2. *Who holds the power?* — Detailed stakeholder authority mapping (Economic Buyer, Champion, Technical Blocker, Finance) with departure and single-threaded relationship alerts.
  3. *What do you do first?* — Ranked top-3 next steps with assigned owners, urgency indicators, expected outcomes, and MCP note logging.
  4. *What is about to go wrong?* — Field risk vectors tracking approaching deadlines, unanswered customer tickets, and silent adoption drop-offs.
  5. *What do you still not know?* — First-class knowledge gaps with prescribed discovery questions and impact analysis (no silent assumptions).
- **Surfacing Questathon Field Events**:
  - **Event A (Aldermoor)**: 3 docks (Plants 3, 5, 9) stopped flying during 2–29 November despite remaining online; silent disengagement with zero tickets raised.
  - **Event B (Eastern Counties)**: Unanswered 18 Nov ticket from Insp. Karen Mbeki requiring training dates and failover protocol before a high-profile 5 Dec public policing event.
  - **Event C (Eastern Counties)**: Alliance drone lead Rhys Calder departing in January; single-threaded relationship risk and lack of central successor.
- **Pitch-Dark Minimal Design System**:
  - Apple Dynamic Island-inspired floating capsule navbar with live MCP connection pulse and rate limit countdown.
  - Charcoal and dark obsidian surfaces (`#08090B`, `#101216`, `#15181D`, `#272C34`).
  - Restrained enterprise orange accents (`#FF762E`), Inter typography, and zero neon/glow effects.

---

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router, Server & Client Components)
- **Language**: TypeScript 5 (Strict Typing)
- **Styling**: Tailwind CSS with custom CRM design tokens
- **Icons**: Lucide React
- **Data Visualization**: Recharts (Responsive SVG Bar & Distribution Charts)
- **Database & Persistence**: PostgreSQL with Prisma ORM + local persistent JSON fallback
- **Protocol**: Model Context Protocol (MCP) JSON-RPC 2.0 over HTTPS POST

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/flytbase-live-crm.git
cd flytbase-live-crm
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Populate the required credentials in `.env.local`:
```env
AQ_TOKEN=your_questathon_mcp_token_here
DATABASE_URL=postgresql://user:password@host:port/database
```

> **Security Note**: `AQ_TOKEN` is strictly consumed server-side in API routes and never exposed to the browser client, GitHub repository, build artifacts, or client components. `.env.local` is included in `.gitignore`.

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
To strictly obey the **one call per minute** token quota:
1. `McpRateLimiter` maintains a timestamp of the last executed request.
2. If another request arrives within 60 seconds, it is either safely enqueued or returned from persistent local cache.
3. The UI Dynamic Island navbar displays a live countdown timer (`WAIT 42s`) informing the user of the exact next permitted call window.

---

## 📊 Account Intelligence Summary

| Dimension | Eastern Counties Police Alliance (A) | Aldermoor Industrial Group (B) |
|---|---|---|
| **Confirmed Framework** | £1,500,000 (300-dock national tender) | €160,000 (Won docks expansion) |
| **Active Pipeline** | £285,000 (Metro Central, support, training) | €50,000 (Plant 7 night support offer) |
| **At-Risk Value** | £800,000 (35-dock renewal + Tarn/Norwold) | €320,000 (14-dock renewal + 9 idle plants) |
| **Unverified Claims** | £300,000 (Stadium project 30-dock claim) | €1,200,000 (Stefan Roy spreadsheet ROI) |
| **Key Champions** | Insp. Karen Mbeki (Westmere), Rhys Calder | Stefan Roy (Head of Security), Beatriz Alonso |
| **Key Gatekeepers** | Fatima Osei (DPO), Ewan Brooks (Finance) | Nadia Rahman (Group Finance Controller) |
| **Top Blocker** | DPIA unassigned 4 mos (Ticket FB-10412) | Finance cannot verify savings claim |
| **Key Person Risk** | Rhys Calder leaving in January | Stefan's Deputy leaving in Nov/Dec |
| **Live Alert** | Karen Mbeki unanswered 5 Dec event ticket | 3 docks stopped flying 2–29 Nov (silent) |

---

## 🔒 Security Compliance

- Server-side environment isolation for `AQ_TOKEN`.
- Zero credentials committed to version control.
- Sanitize user input before MCP note submission.
- Complete audit trails in `data/mcp_rate_state.json`.

---

## 📄 License & Attribution

Built for the **FlytBase Questathon Challenge** by senior full-stack engineering standards. All account personas, logs, and files are simulated enterprise records powered by the official Hackers Collective MCP endpoint.
