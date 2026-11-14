import { NextRequest, NextResponse } from "next/server";
import { mcpLimiter } from "@/lib/mcp/rate-limiter";
import { getSyncMetadata } from "@/lib/data/cache";

export async function GET() {
  try {
    const rateStatus = mcpLimiter.getStatus();
    const syncMeta = getSyncMetadata();

    return NextResponse.json({
      success: true,
      connection: {
        status: syncMeta.status,
        lastSync: syncMeta.lastSync,
        cachedFilesCount: syncMeta.cachedFilesCount,
        endpoint: "https://questathon.aihackerscollective.com/api/public/mcp",
        rateLimit: {
          maxCallsPerMinute: 1,
          canCallNow: rateStatus.canCallNow,
          timeUntilNextMs: rateStatus.timeUntilNextMs,
          nextPermittedTime: rateStatus.nextPermittedTime,
          totalCallsExecuted: rateStatus.totalCalls,
          queueLength: rateStatus.queueLength,
        },
        environment: {
          tokenConfigured: !!process.env.AQ_TOKEN,
          databaseConfigured: !!process.env.DATABASE_URL,
        },
      },
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const status = mcpLimiter.getStatus();
    if (!status.canCallNow) {
      return NextResponse.json(
        {
          success: false,
          error: `Rate limit active. Next call permitted in ${Math.ceil(status.timeUntilNextMs / 1000)} seconds.`,
          nextPermittedTime: status.nextPermittedTime,
        },
        { status: 429 }
      );
    }

    // Call get_signals safely through rate limiter
    const signalsResult = await mcpLimiter.executeTool("get_signals", {}, { bypassQueueIfReady: true });

    return NextResponse.json({
      success: true,
      message: "Synchronized signals with MCP server successfully.",
      result: signalsResult,
      syncedAt: new Date().toISOString(),
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
