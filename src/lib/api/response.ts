import { NextResponse } from "next/server";

export type ApiSuccess<T> = {
  success: true;
  data: T;
};

export type ApiErrorBody = {
  success: false;
  error: string;
  code?: string;
};

export function jsonSuccess<T>(data: T, status = 200) {
  return NextResponse.json({ success: true, data } satisfies ApiSuccess<T>, { status });
}

export function jsonError(
  message: string,
  status = 500,
  code?: string
) {
  return NextResponse.json(
    { success: false, error: message, ...(code ? { code } : {}) } satisfies ApiErrorBody,
    { status }
  );
}
