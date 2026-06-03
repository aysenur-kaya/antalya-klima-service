export function normalizeSearchText(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ı/g, "i")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c");
}

export function matchesSearchQuery(
  query: string,
  ...parts: (string | number | null | undefined)[]
): boolean {
  const q = normalizeSearchText(query.trim());
  if (!q) return true;
  return parts.some((part) => {
    if (part === null || part === undefined) return false;
    return normalizeSearchText(String(part)).includes(q);
  });
}

export function filterBySearch<T>(
  items: T[],
  query: string,
  getSearchableParts: (item: T) => (string | number | null | undefined)[]
): T[] {
  const q = query.trim();
  if (!q) return items;
  return items.filter((item) => matchesSearchQuery(q, ...getSearchableParts(item)));
}
