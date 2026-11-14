async function testWriteNote() {
  const res = await fetch("http://localhost:3000/api/notes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: "Executive briefing note: confirmed 300-dock framework evaluation criteria and Karen Mbeki public event priority.",
      account: "A",
      kind: "deal",
      title: "Executive Framework Briefing",
    }),
  });

  console.log("Status:", res.status);
  const data = await res.json();
  console.log("Response:", JSON.stringify(data, null, 2));
}

testWriteNote();
