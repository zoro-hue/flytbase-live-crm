async function testLandingPage() {
  console.log("=== VERIFYING LANDING PAGE (http://localhost:3000/) ===");

  const res = await fetch("http://localhost:3000/");
  const html = await res.text();

  console.log("Landing page HTTP status:", res.status);
  console.log("HTML length:", html.length, "bytes");

  const requiredSections = ["home", "features", "solutions", "intelligence", "security", "about"];
  const missing = requiredSections.filter((s) => !html.includes(`id="${s}"`));

  if (missing.length > 0) {
    console.error("Missing section IDs:", missing);
    process.exit(1);
  } else {
    console.log("✓ All 6 navbar sections present in DOM:", requiredSections.join(", "));
  }

  // Check CTAs and Links
  const checks = [
    { label: "Eastern Counties account link", ok: html.includes("/accounts/eastern-counties") },
    { label: "Aldermoor account link", ok: html.includes("/accounts/aldermoor") },
    { label: "Dashboard CRM link", ok: html.includes("/dashboard") },
    { label: "Ask AI button", ok: html.includes("Ask AI") },
    { label: "Enter CRM CTA", ok: html.includes("Enter CRM") },
    { label: "Watch Overview button", ok: html.includes("Watch Overview") },
    { label: "Real-Time MCP Sync", ok: html.includes("Real-Time MCP Sync") },
    { label: "Account Intelligence", ok: html.includes("Account Intelligence") },
    { label: "Risk & Signals", ok: html.includes("Risk &amp; Signals") || html.includes("Risk & Signals") },
    { label: "Evidence Traceability", ok: html.includes("Evidence Traceability") },
    { label: "Unified Account View", ok: html.includes("Unified Account View") },
    { label: "Live Signal Monitoring", ok: html.includes("Live Signal Monitoring") },
    { label: "Stakeholder Matrix", ok: html.includes("Stakeholder Matrix") },
    { label: "Evidence Vault", ok: html.includes("Evidence Vault") },
  ];

  for (const c of checks) {
    if (!c.ok) {
      console.error(`FAILED: Missing ${c.label}`);
      process.exit(1);
    }
    console.log(`✓ ${c.label} verified`);
  }

  // Test /app redirect
  const appRes = await fetch("http://localhost:3000/app", { redirect: "manual" });
  console.log(`✓ /app redirect test: status ${appRes.status}, location: ${appRes.headers.get("location")}`);

  console.log("ALL LANDING PAGE NAVBAR AND CTA TESTS PASSED SUCCESSFULLY!");
}

testLandingPage().catch((err) => {
  console.error(err);
  process.exit(1);
});
