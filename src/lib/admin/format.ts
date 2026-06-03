export function formatAdminDate(value: string | Date): string {
  const d = typeof value === "string" ? new Date(value) : value;
  return d.toLocaleString("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function serviceTypeLabel(type: string): string {
  return type === "KLIMA" ? "Klima" : "Beyaz Eşya";
}

export function blogStatusLabel(status: string): string {
  return status === "PUBLISHED" ? "Yayında" : "Taslak";
}

export function requestStatusLabel(status: string): string {
  const map: Record<string, string> = {
    NEW: "Yeni",
    IN_PROGRESS: "İşlemde",
    COMPLETED: "Tamamlandı",
  };
  return map[status] ?? status;
}
