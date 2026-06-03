import { prisma } from "@/lib/prisma";

function randomSuffix(): string {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

/** Benzersiz talep referansı: REQ-1234 */
export async function generateCustomerRequestReference(): Promise<string> {
  for (let attempt = 0; attempt < 8; attempt++) {
    const reference = `REQ-${randomSuffix()}`;
    const existing = await prisma.customerRequest.findUnique({
      where: { reference },
      select: { id: true },
    });
    if (!existing) return reference;
  }
  return `REQ-${Date.now().toString(36).toUpperCase()}`;
}
