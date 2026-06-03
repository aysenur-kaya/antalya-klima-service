"use client";

import { useCallback, useEffect, useState } from "react";
import { adminApi } from "@/lib/admin/api-client";
import {
  ADMIN_LIST_PAGE_SIZE,
  buildAdminListUrl,
  type PaginatedResult,
} from "@/lib/admin/list-api";

type UsePaginatedAdminListOptions = {
  path: string;
  searchQuery: string;
  pageSize?: number;
  extraParams?: Record<string, string | undefined>;
  enabled?: boolean;
};

export function usePaginatedAdminList<T>({
  path,
  searchQuery,
  pageSize = ADMIN_LIST_PAGE_SIZE,
  extraParams,
  enabled = true,
}: UsePaginatedAdminListOptions) {
  const [items, setItems] = useState<T[]>([]);
  const [total, setTotal] = useState(0);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const q = searchQuery.trim();

  const load = useCallback(async () => {
    if (!enabled) return;
    setLoading(true);
    setError(null);

    const url = buildAdminListUrl(path, {
      limit: pageSize,
      offset,
      q,
      extra: extraParams,
    });

    const res = await adminApi<PaginatedResult<T>>(url);
    if (res.success) {
      setItems(res.data.items);
      setTotal(res.data.total);
    } else {
      setItems([]);
      setTotal(0);
      setError(res.error);
    }
    setLoading(false);
  }, [path, pageSize, offset, q, extraParams, enabled]);

  useEffect(() => {
    setOffset(0);
  }, [q, path, pageSize]);

  useEffect(() => {
    load();
  }, [load]);

  const hasMore = offset + items.length < total;
  const page = Math.floor(offset / pageSize) + 1;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  function goNext() {
    if (hasMore) setOffset((o) => o + pageSize);
  }

  function goPrev() {
    setOffset((o) => Math.max(0, o - pageSize));
  }

  function refresh() {
    load();
  }

  return {
    items,
    total,
    offset,
    page,
    totalPages,
    pageSize,
    loading,
    error,
    hasMore,
    isSearching: q.length > 0,
    goNext,
    goPrev,
    refresh,
    setOffset,
  };
}
