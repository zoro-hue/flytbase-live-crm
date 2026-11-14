import { config } from "dotenv";
config({ path: ".env.local" });
import { Client } from "pg";

async function tryConnect(password: string, sslMode: any, label: string) {
  const user = "postgres.foktcxasifbbdgfhippw";
  const host = "aws-0-ap-northeast-1.pooler.supabase.com";
  const port = 6543;
  const database = "postgres";

  console.log(`Testing [${label}] with pass len=${password.length}...`);
  const client = new Client({
    user,
    password,
    host,
    port,
    database,
    ssl: sslMode,
  });

  try {
    await client.connect();
    console.log(`>>> SUCCESS with [${label}]!`);
    const res = await client.query("SELECT current_user, current_database()");
    console.log("Query:", res.rows[0]);
    await client.end();
    return true;
  } catch (e: any) {
    console.log(`Failed [${label}]: ${e.message} (code: ${e.code})`);
    return false;
  }
}

async function main() {
  const p1 = "@Jayanth57470";
  const p2 = "Jayanth57470";

  await tryConnect(p1, { rejectUnauthorized: false }, "@Jayanth57470 ssl=false");
  await tryConnect(p2, { rejectUnauthorized: false }, "Jayanth57470 ssl=false");
  await tryConnect(p1, false, "@Jayanth57470 no-ssl");
  await tryConnect(p2, false, "Jayanth57470 no-ssl");
  await tryConnect(p1, { rejectUnauthorized: false, servername: "aws-0-ap-northeast-1.pooler.supabase.com" }, "@Jayanth57470 sni");
}

main();
