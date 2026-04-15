import { NextRequest } from "next/server";

const MIUSE_API_URL =
  process.env.MIUSE_API_URL || "https://api.miuse.app";
const MIUSE_API_KEY = process.env.MIUSE_API_KEY || "";

async function proxyToMiuse(request: NextRequest, ctx: RouteContext<"/api/miuse/[...path]">) {
  const { path } = await ctx.params;
  const miusePath = "/" + path.join("/");
  const url = `${MIUSE_API_URL}${miusePath}`;

  try {
    const headers: Record<string, string> = {
      "X-API-Key": MIUSE_API_KEY,
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    const fetchOptions: RequestInit = {
      method: request.method,
      headers,
    };

    // Forward body for POST/PUT/PATCH
    if (["POST", "PUT", "PATCH"].includes(request.method)) {
      fetchOptions.body = await request.text();
    }

    const response = await fetch(url, fetchOptions);
    const data = await response.json();

    return Response.json(data, { status: response.status });
  } catch (error) {
    console.error("Erro no proxy Miuse:", error);
    return Response.json(
      { error: "Falha na comunicação com a Miuse" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest, ctx: RouteContext<"/api/miuse/[...path]">) {
  return proxyToMiuse(request, ctx);
}

export async function POST(request: NextRequest, ctx: RouteContext<"/api/miuse/[...path]">) {
  return proxyToMiuse(request, ctx);
}
