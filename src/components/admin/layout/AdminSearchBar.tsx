"use client";

import { Search, X } from "lucide-react";
import { useAdminDashboardSearch } from "@/components/admin/context/AdminDashboardContext";

export default function AdminSearchBar() {
  const {
    searchQuery,
    setSearchQuery,
    isSearching,
    globalSearch,
    globalSearchLoading,
  } = useAdminDashboardSearch();

  if (!isSearching) return null;

  const showNoResults =
    !globalSearchLoading &&
    globalSearch.q === searchQuery.trim() &&
    globalSearch.total === 0;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3 rounded-xl border border-brand-red/20 bg-red-50/80 px-4 py-2.5 text-sm text-brand-dark">
        <span className="flex min-w-0 items-center gap-2">
          <Search className="h-4 w-4 shrink-0 text-brand-red" aria-hidden />
          <span className="truncate">
            Arama: <strong className="font-semibold">&quot;{searchQuery}&quot;</strong>
            {!globalSearchLoading && globalSearch.total > 0 ? (
              <span className="font-normal text-slate-600">
                {" "}
                · {globalSearch.total} sonuç
              </span>
            ) : null}
          </span>
        </span>
        <button
          type="button"
          onClick={() => setSearchQuery("")}
          className="inline-flex shrink-0 items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-brand-red hover:bg-white/80"
        >
          <X className="h-3.5 w-3.5" />
          Temizle
        </button>
      </div>
      {showNoResults ? (
        <p className="rounded-xl border border-dashed border-brand-border bg-white px-4 py-3 text-center text-sm text-slate-500">
          Sonuç bulunamadı
        </p>
      ) : null}
    </div>
  );
}
