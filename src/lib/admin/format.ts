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

export function formatRelativeTime(iso: string | Date): string {
  const date = typeof iso === "string" ? new Date(iso) : iso;
  const diffMs = Date.now() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return "Az önce";
  if (diffMin < 60) return `${diffMin} dk önce`;
  const diffHour = Math.floor(diffMin / 60);
  if (diffHour < 24) return `${diffHour} saat önce`;
  const diffDay = Math.floor(diffHour / 24);
  if (diffDay === 1) return "Dün";
  if (diffDay < 7) return `${diffDay} gün önce`;
  return formatAdminDate(date);
}

export function requestStatusLabel(status: string): string {
  const map: Record<string, string> = {
    NEW: "Yeni",
    IN_PROGRESS: "İşlemde",
    COMPLETED: "Tamamlandı",
  };
  return map[status] ?? status;
}
