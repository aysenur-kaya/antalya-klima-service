"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import SectionCard from "@/components/admin/ui/SectionCard";
import Button from "@/components/admin/ui/Button";
import EmptyState from "@/components/admin/ui/EmptyState";
import { StatusMessage, LoadingBlock } from "@/components/admin/ui/StatusMessage";
import { adminInputClass } from "@/components/admin/ui/form-styles";
import {
  DataTable,
  DataTableHead,
  DataTableBody,
  DataTableRow,
  DataTableCell,
  DataTableHeaderCell,
} from "@/components/admin/ui/DataTable";
import {
  MobileCard,
  MobileCardActions,
  MobileCardField,
  MobileCardList,
} from "@/components/admin/ui/MobileCard";
import { adminApi } from "@/lib/admin/api-client";
import { formatAdminDate, requestStatusLabel } from "@/lib/admin/format";
import { useAdminDashboardSearch } from "@/components/admin/context/AdminDashboardContext";
import SearchNoResults from "@/components/admin/ui/SearchNoResults";
import AdminPagination from "@/components/admin/ui/AdminPagination";
import { usePaginatedAdminList } from "@/components/admin/hooks/usePaginatedAdminList";

type RequestRow = {
  id: string;
  reference: string | null;
  name: string;
  phone: string;
  district: string;
  service: string;
  message: string;
  status: "NEW" | "IN_PROGRESS" | "COMPLETED";
  createdAt: string;
};

export default function CustomerRequestsTable() {
  const [success, setSuccess] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const { searchQuery } = useAdminDashboardSearch();

  const {
    items,
    total,
    offset,
    page,
    totalPages,
    pageSize,
    loading,
    error: listError,
    hasMore,
    isSearching,
    goNext,
    goPrev,
    refresh,
  } = usePaginatedAdminList<RequestRow>({
    path: "/api/admin/customer-requests",
    searchQuery,
  });

  async function updateStatus(id: string, status: RequestRow["status"]) {
    setUpdatingId(id);
    setActionError(null);
    const res = await adminApi(`/api/admin/customer-requests/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
    setUpdatingId(null);
    if (!res.success) {
      setActionError(res.error);
      return;
    }
    setSuccess(`Durum güncellendi: ${requestStatusLabel(status)}`);
    refresh();
  }

  async function handleDelete(id: string) {
    if (!confirm("Bu talep silinsin mi?")) return;
    const res = await adminApi(`/api/admin/customer-requests/${id}`, { method: "DELETE" });
    if (!res.success) {
      setActionError(res.error);
      return;
    }
    setSuccess("Talep silindi.");
    refresh();
  }

  return (
    <SectionCard
      id="requests"
      title="Müşteri Talepleri & Mesajlar"
      description="Veritabanındaki iletişim talepleri"
      action={
        <Button variant="secondary" size="sm" onClick={refresh} disabled={loading}>
          Yenile
        </Button>
      }
    >
      {actionError || listError ? (
        <StatusMessage type="error" message={actionError ?? listError ?? ""} className="mb-4" />
      ) : null}
      {success ? <StatusMessage type="success" message={success} className="mb-4" /> : null}
      {loading ? (
        <LoadingBlock />
      ) : total === 0 && !isSearching ? (
        <EmptyState message="Henüz müşteri talebi yok." />
      ) : items.length === 0 ? (
        <SearchNoResults />
      ) : (
        <>
        <MobileCardList>
          {items.map((req) => (
            <MobileCard key={req.id}>
              <MobileCardField label="Talep">
                <span className="font-mono text-xs font-medium text-slate-500">
                  {req.reference ?? req.id.slice(0, 8)}
                </span>
                <p className="mt-0.5 text-xs text-slate-400">{formatAdminDate(req.createdAt)}</p>
              </MobileCardField>
              <MobileCardField label="Müşteri">
                <p className="font-medium">{req.name}</p>
                <p className="text-xs text-slate-500">{req.phone}</p>
                {req.message ? (
                  <p className="mt-1 text-xs text-slate-400">{req.message}</p>
                ) : null}
              </MobileCardField>
              <MobileCardField label="İlçe / Hizmet">
                {req.district} · {req.service}
              </MobileCardField>
              <MobileCardField label="Durum">
                <select
                  className={adminInputClass + " h-9 w-full text-sm"}
                  value={req.status}
                  disabled={updatingId === req.id}
                  onChange={(e) =>
                    updateStatus(req.id, e.target.value as RequestRow["status"])
                  }
                >
                  <option value="NEW">Yeni</option>
                  <option value="IN_PROGRESS">İşlemde</option>
                  <option value="COMPLETED">Tamamlandı</option>
                </select>
              </MobileCardField>
              <MobileCardActions>
                <button
                  type="button"
                  onClick={() => handleDelete(req.id)}
                  className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-brand-red"
                  aria-label="Sil"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </MobileCardActions>
            </MobileCard>
          ))}
        </MobileCardList>
        <DataTable>
          <DataTableHead>
            <DataTableHeaderCell>Talep</DataTableHeaderCell>
            <DataTableHeaderCell>Müşteri</DataTableHeaderCell>
            <DataTableHeaderCell>İlçe</DataTableHeaderCell>
            <DataTableHeaderCell>Hizmet</DataTableHeaderCell>
            <DataTableHeaderCell>Durum</DataTableHeaderCell>
            <DataTableHeaderCell className="text-right">İşlem</DataTableHeaderCell>
          </DataTableHead>
          <DataTableBody>
            {items.map((req) => (
              <DataTableRow key={req.id}>
                <DataTableCell>
                  <span className="font-mono text-xs font-medium text-slate-500">
                    {req.reference ?? req.id.slice(0, 8)}
                  </span>
                  <p className="mt-0.5 text-xs text-slate-400">{formatAdminDate(req.createdAt)}</p>
                </DataTableCell>
                <DataTableCell>
                  <p className="font-medium text-brand-dark">{req.name}</p>
                  <p className="text-xs text-slate-500">{req.phone}</p>
                  <p className="mt-1 max-w-[200px] truncate text-xs text-slate-400" title={req.message}>
                    {req.message}
                  </p>
                </DataTableCell>
                <DataTableCell>{req.district}</DataTableCell>
                <DataTableCell>{req.service}</DataTableCell>
                <DataTableCell>
                  <select
                    className={adminInputClass + " h-8 text-xs"}
                    value={req.status}
                    disabled={updatingId === req.id}
                    onChange={(e) =>
                      updateStatus(req.id, e.target.value as RequestRow["status"])
                    }
                  >
                    <option value="NEW">Yeni</option>
                    <option value="IN_PROGRESS">İşlemde</option>
                    <option value="COMPLETED">Tamamlandı</option>
                  </select>
                </DataTableCell>
                <DataTableCell className="text-right">
                  <button
                    type="button"
                    onClick={() => handleDelete(req.id)}
                    className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-brand-red"
                    aria-label="Sil"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </DataTableCell>
              </DataTableRow>
            ))}
          </DataTableBody>
        </DataTable>
        <AdminPagination
          total={total}
          offset={offset}
          pageSize={pageSize}
          page={page}
          totalPages={totalPages}
          hasMore={hasMore}
          onPrev={goPrev}
          onNext={goNext}
          loading={loading}
        />
        </>
      )}
    </SectionCard>
  );
}
