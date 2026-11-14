import { NextRequest, NextResponse } from "next/server";
import { getUserNotes, saveUserNote, getMcpNotes } from "@/lib/data/cache";
import { mcpLimiter } from "@/lib/mcp/rate-limiter";

export async function GET(req: NextRequest) {
  try {
    const userNotes = getUserNotes();
    const mcpRaw = getMcpNotes();
    const mcpNotes = mcpRaw?.notes || [];

    const account = req.nextUrl.searchParams.get("account");

    let combined = [
      ...userNotes.map((n) => ({ ...n, source: "user_live" })),
      ...mcpNotes.map((n: any, idx: number) => ({
        id: `mcp_${idx}`,
        account: n.account || "General",
        kind: n.kind || "note",
        title: n.title || "MCP Server Note",
        text: n.text || n.content || "",
        createdAt: n.timestamp || new Date().toISOString(),
        syncedToMcp: true,
        source: "mcp_server",
      })),
    ];

    if (account && account !== "All") {
      combined = combined.filter((n) => !n.account || n.account === account || n.account === "General");
    }

    return NextResponse.json({ success: true, notes: combined });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { text, account, kind, title } = body;

    if (!text || typeof text !== "string" || !text.trim()) {
      return NextResponse.json({ success: false, error: "Note text is required" }, { status: 400 });
    }

    let sanitizedKind = "note";
    if (kind === "task") sanitizedKind = "task";
    else if (kind === "risk") sanitizedKind = "risk";
    else if (kind === "next_step" || kind === "action") sanitizedKind = "next_step";

    const noteId = `note_${Date.now()}`;
    const newNote = {
      id: noteId,
      account: account || "General",
      kind: sanitizedKind,
      title: title || (text.slice(0, 30) + "..."),
      text: text.trim(),
      createdAt: new Date().toISOString(),
      syncedToMcp: false,
    };

    // Attempt to call MCP write_note tool through the rate-limiter
    try {
      const status = mcpLimiter.getStatus();
      if (status.canCallNow) {
        const mcpRes = await mcpLimiter.executeTool("write_note", {
          text: newNote.text,
          account: newNote.account,
          kind: newNote.kind,
          title: newNote.title,
        }, { bypassQueueIfReady: true });

        newNote.syncedToMcp = true;
        saveUserNote(newNote);
        return NextResponse.json({ success: true, note: newNote, mcpResult: mcpRes });
      } else {
        // Enqueue or save locally with pending sync
        saveUserNote(newNote);
        return NextResponse.json({
          success: true,
          note: newNote,
          queued: true,
          message: `Note saved locally. Scheduled for MCP write-back in ${Math.ceil(status.timeUntilNextMs / 1000)}s to respect the 1-call-per-minute rate limit.`,
        });
      }
    } catch (mcpErr: any) {
      // Still persist locally so no user input is lost
      saveUserNote(newNote);
      return NextResponse.json({
        success: true,
        note: newNote,
        warning: `Saved locally; MCP tool returned: ${mcpErr.message}`,
      });
    }
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
