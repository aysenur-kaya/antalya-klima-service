"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
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
import { adminApi } from "@/lib/admin/api-client";
import { formatAdminDate, requestStatusLabel } from "@/lib/admin/format";
import { useAdminDashboardSearch } from "@/components/admin/context/AdminDashboardContext";
import { filterBySearch } from "@/lib/admin/search";
import SearchNoResults from "@/components/admin/ui/SearchNoResults";

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
  const [items, setItems] = useState<RequestRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const { searchQuery, isSearching } = useAdminDashboardSearch();

  const displayItems = useMemo(
    () =>
      filterBySearch(items, searchQuery, (r) => [
        r.reference,
        r.name,
        r.phone,
        r.district,
        r.service,
        r.message,
        requestStatusLabel(r.status),
      ]),
    [items, searchQuery]
  );

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const res = await adminApi<{ items: RequestRow[] }>("/api/admin/customer-requests");
    if (res.success) {
      setItems(res.data.items);
    } else {
      setItems([]);
      setError(res.error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function updateStatus(id: string, status: RequestRow["status"]) {
    setUpdatingId(id);
    setError(null);
    const res = await adminApi(`/api/admin/customer-requests/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
    setUpdatingId(null);
    if (!res.success) {
      setError(res.error);
      return;
    }
    setSuccess(`Durum güncellendi: ${requestStatusLabel(status)}`);
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm("Bu talep silinsin mi?")) return;
    const res = await adminApi(`/api/admin/customer-requests/${id}`, { method: "DELETE" });
    if (!res.success) {
      setError(res.error);
      return;
    }
    setSuccess("Talep silindi.");
    load();
  }

  return (
    <SectionCard
      id="requests"
      title="Müşteri Talepleri & Mesajlar"
      description="Veritabanındaki iletişim talepleri"
      action={
        <Button variant="secondary" size="sm" onClick={load} disabled={loading}>
          Yenile
        </Button>
      }
    >
      {error ? <StatusMessage type="error" message={error} className="mb-4" /> : null}
      {success ? <StatusMessage type="success" message={success} className="mb-4" /> : null}
      {loading ? (
        <LoadingBlock />
      ) : items.length === 0 ? (
        <EmptyState message="Henüz müşteri talebi yok." />
      ) : isSearching && displayItems.length === 0 ? (
        <SearchNoResults />
      ) : (
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
            {displayItems.map((req) => (
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
      )}
    </SectionCard>
  );
}
