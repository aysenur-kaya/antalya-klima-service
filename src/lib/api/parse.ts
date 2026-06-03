import { NextResponse } from "next/server";
import { jsonError } from "@/lib/api/response";

export async function parseJsonBody<T extends Record<string, unknown>>(
  request: Request
): Promise<T | NextResponse> {
  try {
    return (await request.json()) as T;
  } catch {
    return jsonError("Geçersiz istek gövdesi.", 400, "INVALID_BODY");
  }
}

export function isJsonParseError(result: unknown): result is NextResponse {
  return result instanceof NextResponse;
}

export function parseIdParam(id: string): string | null {
  const trimmed = id?.trim();
  return trimmed && trimmed.length > 0 ? trimmed : null;
}
