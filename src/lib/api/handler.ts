import { Prisma } from "@prisma/client";
import { jsonError } from "@/lib/api/response";

function prismaErrorMessage(error: Prisma.PrismaClientKnownRequestError): string {
  switch (error.code) {
    case "P2002":
      return "Bu kayıt zaten mevcut (benzersiz alan çakışması).";
    case "P2025":
      return "Kayıt bulunamadı.";
    default:
      return "Veritabanı işlemi başarısız oldu.";
  }
}

export async function withApiHandler<T>(
  handler: () => Promise<T>
): Promise<T | ReturnType<typeof jsonError>> {
  try {
    return await handler();
  } catch (error) {
    const label = error instanceof Error ? error.message : String(error);
    console.error("[api] Hata:", label);
    if (error instanceof Error && error.stack) {
      console.error("[api] Stack:", error.stack);
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return jsonError(prismaErrorMessage(error), 400, error.code);
    }

    if (error instanceof Prisma.PrismaClientInitializationError) {
      return jsonError(
        "Veritabanına bağlanılamadı. DATABASE_URL ve PostgreSQL servisini kontrol edin.",
        503,
        "DB_CONNECTION"
      );
    }

    if (error instanceof Error) {
      if (error.message.includes("DATABASE_URL")) {
        return jsonError("DATABASE_URL ortam değişkeni tanımlı değil.", 503, "ENV_MISSING");
      }
      if (error.message.includes("SESSION_SECRET")) {
        return jsonError(
          "Sunucu yapılandırması eksik: .env dosyasına en az 32 karakterlik SESSION_SECRET ekleyin.",
          503,
          "SESSION_SECRET_MISSING"
        );
      }
    }

    return jsonError("Beklenmeyen bir sunucu hatası oluştu.", 500, "INTERNAL");
  }
}
