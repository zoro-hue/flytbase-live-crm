async function testEndpoint(url: string, label: string) {
  try {
    const res = await fetch(url);
    console.log(`[${res.status} ${res.statusText}] ${label} (${url})`);
    if (res.headers.get("content-type")?.includes("application/json")) {
      const json = await res.json();
      console.log(`   Response JSON keys:`, Object.keys(json));
    } else {
      const text = await res.text();
      console.log(`   HTML response length: ${text.length} bytes`);
    }
    return res.status === 200;
  } catch (err: any) {
    console.error(`[FAILED] ${label}:`, err.message);
    return false;
  }
}

async function main() {
  console.log("=== TESTING ALL LOCAL APP ROUTES ===");
  const base = "http://localhost:3000";

  await testEndpoint(`${base}/api/sync`, "API Sync Status");
  await testEndpoint(`${base}/api/signals`, "API Signals");
  await testEndpoint(`${base}/api/notes`, "API Notes");
  await testEndpoint(`${base}/api/evidence?id=draft_tender_spec`, "API Single Evidence");
  await testEndpoint(`${base}/api/evidence?q=tender`, "API Evidence Search");

  await testEndpoint(`${base}/`, "Overview Page");
  await testEndpoint(`${base}/accounts/eastern-counties`, "Eastern Counties Page");
  await testEndpoint(`${base}/accounts/aldermoor`, "Aldermoor Page");
  await testEndpoint(`${base}/deals`, "Deals Page");
  await testEndpoint(`${base}/stakeholders`, "Stakeholders Page");
  await testEndpoint(`${base}/actions`, "Actions Page");
  await testEndpoint(`${base}/signals`, "Signals Page");
  await testEndpoint(`${base}/evidence`, "Evidence Page");
  await testEndpoint(`${base}/settings`, "Settings Page");
}

main();
