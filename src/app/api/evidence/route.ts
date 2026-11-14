import { NextRequest, NextResponse } from "next/server";
import { searchEvidence, getEvidenceById } from "@/lib/data/provenance";

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    if (id) {
      const record = getEvidenceById(id);
      if (!record) {
        return NextResponse.json({ success: false, error: "Evidence record not found" }, { status: 404 });
      }
      return NextResponse.json({ success: true, record });
    }

    const query = req.nextUrl.searchParams.get("q") || "";
    const account = req.nextUrl.searchParams.get("account") || undefined;

    const results = searchEvidence(query, account);
    return NextResponse.json({ success: true, count: results.length, records: results });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
