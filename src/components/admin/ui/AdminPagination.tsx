"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "@/components/admin/ui/Button";

type AdminPaginationProps = {
  total: number;
  offset: number;
  pageSize: number;
  page: number;
  totalPages: number;
  hasMore: boolean;
  onPrev: () => void;
  onNext: () => void;
  loading?: boolean;
};

export default function AdminPagination({
  total,
  offset,
  pageSize,
  page,
  totalPages,
  hasMore,
  onPrev,
  onNext,
  loading = false,
}: AdminPaginationProps) {
  if (total === 0) return null;

  const from = offset + 1;
  const to = Math.min(offset + pageSize, total);

  return (
    <div className="flex flex-col gap-3 border-t border-brand-border pt-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-slate-500">
        <span className="font-medium text-brand-dark">
          {from}–{to}
        </span>{" "}
        / {total} kayıt · Sayfa {page}/{totalPages}
      </p>
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={onPrev}
          disabled={loading || offset === 0}
          aria-label="Önceki sayfa"
        >
          <ChevronLeft className="h-4 w-4" />
          Önceki
        </Button>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={onNext}
          disabled={loading || !hasMore}
          aria-label="Sonraki sayfa"
        >
          Sonraki
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
