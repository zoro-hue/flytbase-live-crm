import { NextRequest, NextResponse } from "next/server";
import { updateAction } from "@/lib/analysis/recommendations";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { status, owner, notes } = body;

    const updated = updateAction(id, { status, owner, notes });
    return NextResponse.json({ success: true, action: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
