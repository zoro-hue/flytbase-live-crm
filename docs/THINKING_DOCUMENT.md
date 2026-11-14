# FlytBase Live CRM — Executive Thinking Document (One-Page Architectural Overview)

### Submission for FlytBase Questathon Challenge
**Author:** Lead Full-Stack Architect & Product Designer  
**Target Accounts:** Eastern Counties Police Alliance (Account A) & Aldermoor Industrial Group (Account B)  
**MCP Endpoint:** `https://questathon.aihackerscollective.com/api/public/mcp`  

---

### 1. What Was Built
A production-ready, full-stack enterprise CRM dashboard connecting directly to the Questathon MCP server. Built with Next.js 15 (App Router), TypeScript, Tailwind CSS, Lucide React, and Recharts. The application features a persistent rate-limited integration layer, bi-directional note write-back, interactive source provenance drawers, and an Apple Dynamic Island-inspired floating top navigation bar.

### 2. Who the CRM Is Designed For
Designed for FlytBase Customer Success Managers (CSMs), Account Executives (AEs), Solutions Engineers, and Executive Leadership managing high-stakes enterprise drone-in-a-box deployments across public safety and industrial security. It equips GTM teams with factual operational intelligence to protect renewals and win multi-million-pound framework tenders.

### 3. How the Five Questions Are Answered
Every account intelligence page features a dedicated engine answering the 5 critical business questions:
1. **What is the book worth?** Disaggregates confirmed framework contracts, active expansion offers, at-risk renewals, and unverified stakeholder projections into transparent financial buckets.
2. **Who holds the power?** Distinguishes operational champions (e.g., Insp. Karen Mbeki) from economic buyers and budget signers (Nadia Rahman, Ewan Brooks, Force CFOs), highlighting key-person departures and technical gatekeepers.
3. **What do you do first?** Generates the top 3 ranked actions per account with verified owners, explicit deadlines, expected outcomes, and direct links to unblocking revenue.
4. **What is about to go wrong?** Surfaces approaching deadlines (5 Dec Westmere public event, tender lock), 4-month unassigned tickets (FB-10412), single-threaded relationships, and silent flight drop-offs.
5. **What do you still not know?** Elevates missing information into first-class CRM objects, complete with prescribed discovery questions and business impact analyses.

### 4. How Deal Values Are Calculated and Verified
Financial figures are never fabricated or lumped into misleading aggregate totals:
- **Eastern Counties (Account A)**: Confirmed £1,500,000 national framework tender (Day 20 specification lock; 40% weighting on operating model/cost-per-flight); £285,000 active pipeline (Metro Central docks, priority support, pilot training); £800,000 at risk (£350k renewal blocked because 2 of 4 forces have never flown live missions + £200k Tarn/Norwold rollout blocked by unassigned DPIA ticket + £250k Westmere expansion); £300,000 unsupported projection (Rhys Calder's 30-dock stadium project flagged as unrealistic by Superintendent).
- **Aldermoor Industrial (Account B)**: €160,000 closed/won (Plant 15 & idle plant expansion); €50,000 active pipeline (Plant 7 night support); €320,000 at risk (€140k renewal blocked on savings proof + €180k idle plants adoption); €1,200,000 unverified claim (Stefan Roy's spreadsheet assumes replaceable guard hours, but `roi_spreadsheet.csv` confirms zero guard contracts reduced and zero savings booked by finance).

### 5. How Evidence and Source IDs Are Tracked
Every claim, deal value, and risk vector references an indexed MCP source ID (`flight_log_force_month`, `roi_spreadsheet`, `draft_tender_spec`, `support_ticket_history`, `tickets.json`, call notes, emails). Clicking any source badge opens an interactive **Evidence Drawer** showing the primary quotation, attributed speaker, verification source, repository path, and full raw file contents.

### 6. How Recommendations Are Prioritized
Actions are prioritized using a weighted matrix of **urgency** (event deadlines within 14 days), **revenue impact** (unblocking £1.5M framework or €140k renewal), and **relationship continuity** (departing champions). For example, Action #1 for Eastern Counties addresses Karen Mbeki's unanswered 18 Nov ticket for the 5 Dec public event, preventing champion churn.

### 7. How Unknowns and Assumptions Are Handled
Unknowns are treated as actionable risks rather than silently glossed over. The CRM flags missing successor information for Rhys Calder, the unconfirmed appetite of Norwold's Chief Constable, the missing plant install list from Stefan's deputy, and the absence of measured financial ROI at Aldermoor.

### 8. How Live Signals Update the Dashboard
The CRM queries `get_signals` and monitors telemetry against historical baselines:
- **Event A (Aldermoor)**: Detected 3 docks (AD-02, AD-05, AD-08 at Plants 3, 5, 9) with zero flights during 2–29 November despite remaining powered and online, with no support ticket raised.
- **Event B (Eastern Counties)**: Detected Insp. Karen Mbeki's 18 Nov ticket requesting training dates and failure protocol before 5 Dec, remaining unanswered in the queue.
- **Event C (Eastern Counties)**: Detected Rhys Calder's confirmed January departure, exposing a single-threaded relationship risk.

### 9. How MCP Notes Are Written Back
Users can write notes from any account, deal, action, or risk. The CRM invokes the MCP `write_note` tool using validated schemas (`kind: "note" | "task" | "risk" | "next_step"`). A server-side rate-limiter prevents 429 errors; successful writes immediately update local state with real server IDs (e.g. Note #146102).

### 10. Limitations and Current Data Constraints
- Flight logs for Aldermoor terminate at 2026-10-31 in historical CSV records; November events are surfaced via live telemetry signals.
- In-game personas represent simulated data; phone numbers and emails reflect sandbox routing.
- The 1-call-per-minute rate limit requires intelligent client caching and deferred background synchronization.

### 11. How AI Was Used
AI was utilized as an architectural co-pilot to parse unstructured call transcripts, extract cross-functional blockers, calculate financial pipelines according to strict provenance standards, and build the full-stack Next.js 15 interface. AI did not fabricate claims—all factual intelligence was anchored directly in retrieved MCP files.
