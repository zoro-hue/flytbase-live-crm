import { NextRequest, NextResponse } from "next/server";
import { getAccountSignals } from "@/lib/analysis/signals";

export async function GET(req: NextRequest) {
  try {
    const account = req.nextUrl.searchParams.get("account") as "A" | "B" | null;
    const signals = getAccountSignals(account || undefined);
    return NextResponse.json({ success: true, signals });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
