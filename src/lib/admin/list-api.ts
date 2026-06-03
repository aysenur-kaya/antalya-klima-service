import type { PaginatedResult } from "@/lib/api/pagination";

export type { PaginatedResult };

export const ADMIN_LIST_PAGE_SIZE = 20;

export function buildAdminListUrl(
  basePath: string,
  options: {
    limit?: number;
    offset?: number;
    q?: string;
    extra?: Record<string, string | undefined>;
  }
): string {
  const params = new URLSearchParams();
  params.set("limit", String(options.limit ?? ADMIN_LIST_PAGE_SIZE));
  params.set("offset", String(options.offset ?? 0));
  if (options.q?.trim()) {
    params.set("q", options.q.trim());
  }
  if (options.extra) {
    for (const [key, value] of Object.entries(options.extra)) {
      if (value !== undefined && value !== "") {
        params.set(key, value);
      }
    }
  }
  return `${basePath}?${params.toString()}`;
}
