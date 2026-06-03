export const runtime = "nodejs";

import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { withApiHandler } from "@/lib/api/handler";
import { jsonError, jsonSuccess } from "@/lib/api/response";
import { validateContactInput } from "@/lib/contact/validation";
import { generateCustomerRequestReference } from "@/lib/contact/reference";

export async function POST(request: NextRequest) {
  const result = await withApiHandler(async () => {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      console.error("[api/contact] JSON parse hatası");
      return jsonError("Geçersiz istek.", 400, "INVALID_BODY");
    }

    const raw = body as Record<string, unknown>;
    const validated = validateContactInput({
      name: String(raw.name ?? raw.adSoyad ?? ""),
      phone: String(raw.phone ?? raw.telefon ?? ""),
      service: String(raw.service ?? raw.konu ?? ""),
      message: raw.message != null ? String(raw.message ?? raw.mesaj) : undefined,
      district: raw.district != null ? String(raw.district ?? raw.ilce) : undefined,
      website: raw.website != null ? String(raw.website) : undefined,
    });

    if (!validated.ok) {
      console.warn("[api/contact] Doğrulama hatası:", validated.code, validated.errors);
      return jsonError(validated.error, 400, validated.code);
    }

    const reference = await generateCustomerRequestReference();

    const item = await prisma.customerRequest.create({
      data: {
        reference,
        name: validated.data.name,
        phone: validated.data.phone,
        district: validated.data.district,
        service: validated.data.service,
        message: validated.data.message,
        status: "NEW",
      },
    });

    console.log("[api/contact] Yeni talep:", item.reference, item.name);

    return jsonSuccess({
      id: item.id,
      reference: item.reference,
    });
  });

  return result;
}
