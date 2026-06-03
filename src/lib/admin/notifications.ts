import { CustomerRequestStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export type AdminNotificationType = "customer_request" | "system";

export type AdminNotification = {
  id: string;
  type: AdminNotificationType;
  title: string;
  body: string;
  createdAt: string;
  unread: boolean;
  sectionId: string;
  entityId?: string;
};

/** Bildirim kaynağı — ileride e-posta, blog vb. genişletilebilir. */
export async function fetchAdminNotifications(limit = 20): Promise<AdminNotification[]> {
  const newRequests = await prisma.customerRequest.findMany({
    where: { status: CustomerRequestStatus.NEW },
    orderBy: { createdAt: "desc" },
    take: limit,
  });

  return newRequests.map((r) => ({
    id: `customer_request:${r.id}`,
    type: "customer_request" as const,
    title: "Yeni müşteri talebi",
    body: [r.name, r.district, r.service].filter(Boolean).join(" · "),
    createdAt: r.createdAt.toISOString(),
    unread: true,
    sectionId: "requests",
    entityId: r.id,
  }));
}
