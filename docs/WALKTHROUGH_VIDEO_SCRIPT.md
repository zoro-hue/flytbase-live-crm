# FlytBase CRM — 3-Minute Walkthrough Video Script

**Target Duration**: 02:50 – 03:00 (180 seconds maximum)  
**Tone**: Confident, crisp, authoritative enterprise product walkthrough.  
**Screen Setup**: Browser open at `https://your-crm.vercel.app` (or `http://localhost:3000`), in an Incognito / Private window. Fullscreen (1080p).

---

## TIMELINE BREAKDOWN

| Section | Timestamp | Focus |
| :--- | :--- | :--- |
| **1. Hook & Five Answers** | 0:00 – 1:05 (65s) | Core premise + answering all 5 questions for Eastern Counties Police Alliance |
| **2. One Number Traced to Source** | 1:05 – 1:40 (35s) | Click-through audit trail: from £800k At-Risk KPI straight into primary evidence |
| **3. Live Signals & Event Ingestion** | 1:40 – 2:20 (40s) | Ingesting 3 incoming field events without code changes & executing write-note |
| **4. Architectural Code Walkthrough** | 2:20 – 2:55 (35s) | MCP rate limiter (1 call/60s), server token isolation, SQLite/Postgres cache |
| **5. Conclusion & Monday Readiness** | 2:55 – 3:00 (5s) | Wrap-up |

---

## SCENE-BY-SCENE SCRIPT

### SCENE 1: THE FIVE QUESTIONS ANSWERED (0:00 – 1:05)

**[VISUAL]**: Start on the **Executive Command Center (`/dashboard`)**. The cursor hovers over the dual portfolio stats (£1.5M Confirmed, £800k+€320k Pipeline), then clicks **"Eastern Counties Police Alliance"** in the sidebar to navigate to `/accounts/eastern-counties`. The screen reveals the tabbed interface answering the 5 Core Questions.

**[SPEECH]**:
> *"Good morning. This is FlytBase CRM: an MCP-native intelligence platform built for our two mission-critical accounts—Eastern Counties Police Alliance and Aldermoor Industrial Group. It is designed for one specific user: the account director walking into Monday morning's board review.*
>
> *Let's answer the five required questions for Account A: Eastern Counties.*
>
> 1. **What is the book worth?** *We show £1.5M confirmed under the national 300-dock framework agreement, but critically isolate £800k as at-risk across Westmere and Tarn Valley—not as one big vanity number, but separated by contractual milestone.*
> 2. **Who holds the power?** *Our power matrix maps ACC Nadia Rahman as the economic buyer and final decision authority, while identifying retired DPO Ewan Brooks as the gatekeeper who bottlenecked operations.*
> 3. **What do we do first?** *Ranked, owned, and dated. Move #1: Reassign ticket FB-10412 to DPO Sarah Jenkins by Friday Nov 21 to unblock Tarn Valley flights. Move #2: Confirm Insp. Karen Mbeki's event SLA before Nov 24.*
> 4. **What is about to go wrong?** *Tarn Valley's 4 docks have sat idle for 4 months due to unassigned DPIA sign-off, jeopardizing £285k in hardware expansion.*
> 5. **What do we still not know?** *We explicitly flag our blind spot: whether Norwold's 4 training docks have formal budget authorization for the upcoming spring patrol rotation.*"

---

### SCENE 2: ONE NUMBER TRACED TO ITS SOURCE (1:05 – 1:40)

**[VISUAL]**: Click on the **£800k "At Risk Deal Value"** badge or the **"FB-10412"** pill on the Tarn Valley deal card. The **Evidence Vault Drawer** slides out from the right, highlighting the exact primary record: `jira_ticket_FB10412.json` and `paperwork_A.pdf`.

**[SPEECH]**:
> *"Judges, every single number on this CRM traces back to a verified primary source—no invented metrics, no unsupported claims.*
>
> *Watch this: clicking on the £800k at-risk figure instantly opens our Evidence Vault. Here is Ticket FB-10412: logged July 14, unassigned for 120 days following Ewan Brooks' departure. The flight log shows zero live dispatches despite 4 online docks.*
>
> *Our valuation engine doesn't just guess; it cross-references the draft tender specification clause 4.2 against real MCP dock telemetry to prove that this £800k is physically blocked until privacy compliance is certified."*

---

### SCENE 3: IT PICKING UP SOMETHING NEW (1:40 – 2:20)

**[VISUAL]**: Navigate to **Live Signals (`/signals`)**. Point to the 3 newly ingested live events:
1. Aldermoor: 3 docks stopped flying (Nov 30)
2. Eastern Counties: Insp. Karen Mbeki's urgent public event ticket ahead of Dec 5 (Nov 18)
3. Eastern Counties: Rhys Calder departure in January (Nov 17)
Click **"+ Add Note"** on Insp. Mbeki's signal to demonstrate calling `write_note`.

**[SPEECH]**:
> *"Things keep happening on these accounts. Our system ingests live challenge telemetry through MCP without requiring a single line of code change.*
>
> *Notice our Live Signals feed: it has captured all three real-time developments:*
> *First, at Aldermoor, three docks flying nightly suddenly dropped to zero flights between November 2 and 29 while remaining online—flagging a silent dock anomaly.*
> *Second, Insp. Karen Mbeki's urgent ticket before the December 5 public event requesting operator training and dispatch SLAs.*
> *Third, key-person risk: lead drone engineer Rhys Calder leaving in January.*
>
> *I can immediately log a field mitigation note—'Escalated Mbeki SLA request to flight operations team'—which writes back directly through the MCP `write_note` endpoint and updates our local cache."*

---

### SCENE 4: CODE ARCHITECTURE & MCP HARNESS (2:20 – 2:55)

**[VISUAL]**: Split screen or quick cut to VS Code showing `src/lib/mcp/rateLimiter.ts` and `src/lib/data/cache.ts`. Highlight the token environment variable safety check and the 60-second sliding rate window.

**[SPEECH]**:
> *"Let's briefly inspect the engineering.*
>
> *In `src/lib/mcp/rateLimiter.ts`, we enforce strict enterprise rate-limiting: exactly 1 call per 60 seconds per token. The CRM warms an SQLite/PostgreSQL cache on boot, guaranteeing sub-50ms UI response times with zero rate-limit breaches.*
>
> *Zero API keys or MCP tokens exist in browser code; everything runs through isolated Next.js server actions. Our AI Copilot utilizes strict retrieval-augmented constraints—every response requires factual verification against primary document IDs before it renders to the screen.*
>
> *The UI features a full light-mode design system with a 950ms optical glass dissolve transition and our reactive brand mascot."*

---

### SCENE 5: CLOSING (2:55 – 3:00)

**[VISUAL]**: Return to the **Command Center (`/dashboard`)** showing the complete portfolio health map, radar graph, and AI team network.

**[SPEECH]**:
> *"Hosted on Vercel, public on GitHub, zero client-side tokens, fully auditable. This is the CRM you hand your manager on Monday. Thank you."*

---

## PRO TIPS FOR RECORDING

1. **Clear Cookies / Incognito**: Always start your recording in a clean, private browser window to prove public access without session tokens.
2. **Audio Quality**: Use a dedicated microphone or headset; avoid room echo.
3. **Pacing**: Speak rhythmically; don't rush. 140–150 words per minute hits the 3-minute mark perfectly.
4. **Resolution**: Record at 1920×1080 at 60fps. Ensure zoom is set to 100% in your browser.
