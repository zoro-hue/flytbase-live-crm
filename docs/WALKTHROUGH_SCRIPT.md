# FlytBase Live CRM — 3-Minute Video Walkthrough Script & Plan

**Target Duration:** 3 minutes (180 seconds)  
**Presenter:** Full-Stack Architect / Product Lead  
**UI Setup:** Hosted production CRM running on dark mode at `http://localhost:3000` (or hosted Vercel deployment URL).  

---

## ⏱ Timing Breakdown & Step-by-Step Script

### [0:00 - 0:25] Step 1: Introduction & Overview Command Center
- **Visual:** Screen opens on the **Executive Command Center** (`/`). Cursor points out the Apple Dynamic Island-inspired floating navbar with the green MCP pulse and live rate-limit status.
- **Spoken Script:**
  > *"Welcome to FlytBase Live CRM, built for the Questathon Challenge. This is a complete, production-ready enterprise dashboard communicating directly with the official Questathon MCP server. Unlike static mockups, this platform is live, backed by primary source records, and strictly enforces the 1-call-per-minute rate limit. In this 3-minute walkthrough, we’ll demonstrate real-time telemetry, 5-question account intelligence, and bi-directional MCP write-back."*

### [0:25 - 0:50] Step 2 & 3: Account Selection & Answering the 5 Questions
- **Visual:** Click on **Eastern Counties Police Alliance (Account A)** in the top capsule navbar or target accounts widget. Show the 5 interactive question tabs.
- **Spoken Script:**
  > *"Let's drill into Account A: Eastern Counties Police Alliance. The CRM answers the five critical business questions:  
  > 1. **What is the book worth?** We see £1.5M confirmed in the 300-dock framework, £285k in active offers, and £800k severely at risk.  
  > 2. **Who holds the power?** Notice how we distinguish Insp. Karen Mbeki—our operational champion flying 14 docks daily—from Ewan Brooks in Finance and Fatima Osei, who holds statutory veto power.  
  > 3. **What do you do first?** Ranked top 3 actions, led by an urgent response to Karen Mbeki before 5 December.  
  > 4. **What is about to go wrong?** Highlights Rhys Calder’s departure and ticket FB-10412, unassigned for 4 months.  
  > 5. **What do you still not know?** Explicitly reveals missing successor data and unconfirmed CFO sign-off dates."*

### [0:50 - 1:15] Step 4: Deal Traceability to Original Source
- **Visual:** Under Tab 1 (Valuation), click on the deal **"300-Dock National Framework Tender (£1,500,000)"** or click the `[draft_tender_spec]` source badge. The **Evidence Drawer** slides in from the right.
- **Spoken Script:**
  > *"Every financial number is traceable. When we click on the £1.5M framework tender badge, the Evidence Drawer opens. Notice the primary quote extracted from `draft_tender_spec.txt`: Day 20 specification lock, indicative volume up to 300 docks, and a crucial 40% evaluation weighting on the costed operating model. We can view the raw text and limitations in one click without guessing."*

### [1:15 - 1:35] Step 5: Stakeholder Decision Authority
- **Visual:** Switch to Tab 2 (Who holds the power?) or `/stakeholders`. Hover over **Fatima Osei (DPO, Tarn Valley)** and **Rhys Calder**.
- **Spoken Script:**
  > *"Looking at stakeholder authority: Fatima Osei is classified as a Technical Blocker. The 8 docks in Tarn Valley and Norwold have recorded zero live missions because she cannot sign off the statutory DPIA without our data-flow pack. Meanwhile, Rhys Calder is flagged with a red 'Departing' warning—he leaves in January, creating a massive single-threaded relationship risk."*

### [1:35 - 1:55] Step 6: Top 3 Ranked Actions & Status Update
- **Visual:** Switch to Tab 3 (What do you do first?) or `/actions`. Show Action #1. Change status from "Proposed" to "In Progress".
- **Spoken Script:**
  > *"Action #1 is ranked critical: Respond to Karen Mbeki’s 18 November ticket for the 5 December public policing event. We can toggle status in real time and immediately see the assigned owner (Lead CSM Neel Sharma) and the exact expected outcome."*

### [1:55 - 2:20] Step 7 & 8: Live Signal Surfacing & Challenge Events A, B, C
- **Visual:** Navigate to `/signals`. Expand **EVENT-A (Aldermoor)** and **EVENT-B (Eastern Counties)**.
- **Spoken Script:**
  > *"Now to Live Signals. Look at Event A: our telemetry engine detected that 3 docks at Plants 3, 5, and 9 that previously logged 20+ flights a month suddenly recorded zero flights over the last two weeks (2–29 Nov), yet remain online! Notice the CRM flags that no support ticket was raised by the customer—alerting us to silent disengagement before contract renewal. Event B surfaces Karen Mbeki's unanswered event ticket, and Event C alerts us to Rhys Calder’s departure without requiring any code changes."*

### [2:20 - 2:40] Step 9: Notes Write-Back to MCP Server
- **Visual:** Click the **Write MCP Note** button in the floating navbar or sidebar. Type a note: *"Executive review: Confirmed operating model clarification for Hannah Doyle"*, select Account A, and click **Submit to MCP**. Show the green success message with live server note ID (e.g., Note #146102).
- **Spoken Script:**
  > *"Let's test live write-back. We click 'Write MCP Note', author an executive update, and submit. The request passes through our rate-limiter directly to the Questathon `write_note` tool. And right here—we get confirmation with a live server-assigned note ID, proving true two-way MCP communication."*

### [2:40 - 3:00] Step 10: Server-Side Security & Architectural Wrap-Up
- **Visual:** Open `/settings`. Point out the MCP Connection status, rate-limit queue status, and the green "Server Env Token: Never Exposed" badge. Briefly show the `.env.local` in `.gitignore` on screen or in code.
- **Spoken Script:**
  > *"Finally, security: navigating to Settings confirms our connection health, rate limiter status (1 call per 60s), and guarantees that `AQ_TOKEN` is strictly isolated server-side and never leaked to the client or GitHub. Thank you for exploring FlytBase Live CRM."*

---

## 🎥 Recording Checklist
- [ ] Browser window sized to 1920x1080 (1080p).
- [ ] Microphone audio clear with low background noise.
- [ ] Local server running on `npm start` with clean terminal logs.
- [ ] Verify note creation and evidence drawer animations are smooth.
- [ ] Keep presentation pace crisp to finish under 3:00.
