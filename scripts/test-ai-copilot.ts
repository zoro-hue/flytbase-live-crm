async function testAi() {
  const questions = [
    "What is the confirmed book value?",
    "Who holds the power at Eastern Counties and controls the budget?",
    "What are the biggest risks across both accounts?",
    "What are the three most urgent actions?",
    "Explain Event A dock inactivity at Aldermoor",
    "What changed in the latest MCP sync?",
    "What evidence is missing for Aldermoor?",
  ];

  console.log("=== TESTING FLYTBASE AI COPILOT ENDPOINT ===");

  for (const q of questions) {
    const res = await fetch("http://localhost:3000/api/ai/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: q }),
    });

    if (!res.ok) {
      console.error(`FAILED (${res.status}): ${q}`);
      process.exit(1);
    }

    const data = await res.json();
    console.log(`\n[200 OK] Q: "${q}"`);
    console.log(`   Category: ${data.category}`);
    console.log(`   Reply Preview: ${data.reply.slice(0, 100).replace(/\n/g, " ")}...`);
    console.log(`   Verified Facts: ${data.verifiedFacts?.length || 0}`);
    console.log(`   Sources: ${(data.sourceIds || []).map((s: any) => s.id).join(", ")}`);
  }

  console.log("\nALL AI COPILOT TESTS PASSED SUCCESSFULLY!");
}

testAi().catch((err) => {
  console.error("Test error:", err);
  process.exit(1);
});
