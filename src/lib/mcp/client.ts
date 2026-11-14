const MCP_URL = "https://questathon.aihackerscollective.com/api/public/mcp";

export function getSanitizedToken(): string {
  let token = process.env.AQ_TOKEN?.trim() || "";
  if (token.startsWith("yaq1.")) {
    token = token.slice(1);
  }
  return token;
}

export interface McpRpcResponse<T = any> {
  jsonrpc: "2.0";
  id: number | string;
  result?: {
    content?: Array<{
      type: string;
      text?: string;
    }>;
    isError?: boolean;
    [key: string]: any;
  };
  error?: {
    code: number;
    message: string;
    data?: any;
  };
}

export async function callMcpTool<T = any>(name: string, args: Record<string, unknown> = {}): Promise<T> {
  const token = getSanitizedToken();

  if (!token) {
    throw new Error("AQ_TOKEN is not configured in server environment");
  }

  const response = await fetch(MCP_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json, text/event-stream",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: Date.now(),
      method: "tools/call",
      params: {
        name,
        arguments: args,
      },
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`MCP request failed with HTTP ${response.status}: ${response.statusText}`);
  }

  const payload: McpRpcResponse = await response.json();

  if (payload.error || payload.result?.isError) {
    const errMsg =
      payload.error?.message ??
      payload.result?.content?.[0]?.text ??
      "MCP tool returned an error";
    throw new Error(errMsg);
  }

  const resultText = payload.result?.content?.find((item) => item.type === "text")?.text;

  if (!resultText) {
    return payload.result as T;
  }

  try {
    return JSON.parse(resultText) as T;
  } catch {
    return resultText as unknown as T;
  }
}
