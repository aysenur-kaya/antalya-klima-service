"use client";

import { Loader2 } from "lucide-react";
import { useAdminDashboardSearch } from "@/components/admin/context/AdminDashboardContext";
import type { GlobalSearchHit } from "@/lib/api/admin-global-search";

const GROUPS: {
  key: "customerRequests" | "services" | "blogPosts" | "districts";
  label: string;
}[] = [
  { key: "customerRequests", label: "Müşteri talepleri" },
  { key: "services", label: "Hizmetler" },
  { key: "blogPosts", label: "Blog" },
  { key: "districts", label: "İlçeler" },
];

function ResultButton({
  hit,
  onSelect,
}: {
  hit: GlobalSearchHit;
  onSelect: (sectionId: string) => void;
}) {
  return (
    <button
      type="button"
      role="option"
      onClick={() => onSelect(hit.sectionId)}
      className="w-full border-b border-brand-border/80 px-4 py-2.5 text-left last:border-0 hover:bg-brand-light/80"
    >
      <p className="text-sm font-medium text-brand-dark line-clamp-1">{hit.title}</p>
      {hit.subtitle ? (
        <p className="mt-0.5 text-xs text-slate-500 line-clamp-1">{hit.subtitle}</p>
      ) : null}
    </button>
  );
}

export default function AdminSearchDropdown({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const {
    searchQuery,
    globalSearch,
    globalSearchLoading,
    navigateToSection,
  } = useAdminDashboardSearch();

  if (!open || !searchQuery.trim()) return null;

  function handleSelect(sectionId: string) {
    navigateToSection(sectionId);
    onClose();
  }

  const showEmpty =
    !globalSearchLoading && globalSearch.total === 0 && globalSearch.q === searchQuery.trim();

  return (
    <div
      className="absolute left-0 right-0 top-full z-50 mt-1 overflow-hidden rounded-xl border border-brand-border bg-white shadow-[0_12px_40px_-12px_rgba(15,23,42,0.2)]"
      role="listbox"
      aria-label="Arama sonuçları"
    >
      {globalSearchLoading ? (
        <div className="flex items-center justify-center gap-2 px-4 py-8 text-sm text-slate-500">
          <Loader2 className="h-4 w-4 animate-spin text-brand-red" aria-hidden />
          Aranıyor…
        </div>
      ) : showEmpty ? (
        <p className="px-4 py-6 text-center text-sm text-slate-500">Sonuç bulunamadı</p>
      ) : (
        <div className="max-h-[min(70vh,360px)] overflow-y-auto">
          {GROUPS.map(({ key, label }) => {
            const hits = globalSearch[key];
            if (!hits.length) return null;
            return (
              <div key={key}>
                <p className="sticky top-0 border-b border-brand-border bg-brand-light/95 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {label}
                </p>
                <ul>
                  {hits.map((hit) => (
                    <li key={`${key}-${hit.id}`}>
                      <ResultButton hit={hit} onSelect={handleSelect} />
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
