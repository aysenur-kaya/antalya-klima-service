export type PaginationParams = {
  limit: number;
  offset: number;
};

export type PaginatedResult<T> = {
  items: T[];
  total: number;
  limit: number;
  offset: number;
  hasMore: boolean;
};

const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 100;

export function parsePagination(searchParams: URLSearchParams): PaginationParams {
  const limitRaw = Number.parseInt(searchParams.get("limit") ?? "", 10);
  const offsetRaw = Number.parseInt(searchParams.get("offset") ?? "", 10);

  const limit = Number.isFinite(limitRaw)
    ? Math.min(Math.max(limitRaw, 1), MAX_LIMIT)
    : DEFAULT_LIMIT;
  const offset = Number.isFinite(offsetRaw) ? Math.max(offsetRaw, 0) : 0;

  return { limit, offset };
}

export function parseSearchQuery(searchParams: URLSearchParams): string {
  return (searchParams.get("q") ?? "").trim();
}

export function buildPaginatedResult<T>(
  items: T[],
  total: number,
  pagination: PaginationParams
): PaginatedResult<T> {
  const { limit, offset } = pagination;
  return {
    items,
    total,
    limit,
    offset,
    hasMore: offset + items.length < total,
  };
}
