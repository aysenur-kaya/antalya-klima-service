import { clearSessionCookie } from "@/lib/auth/session";
import { jsonSuccess } from "@/lib/api/response";

export async function POST() {
  const response = jsonSuccess({ ok: true });
  clearSessionCookie(response);
  return response;
}
