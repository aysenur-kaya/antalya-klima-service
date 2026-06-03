"use client";

import { useState } from "react";
import { Star, Plus, Pencil, Trash2 } from "lucide-react";
import SectionCard from "@/components/admin/ui/SectionCard";
import Badge from "@/components/admin/ui/Badge";
import Button from "@/components/admin/ui/Button";
import SimpleModal from "@/components/admin/ui/SimpleModal";
import EmptyState from "@/components/admin/ui/EmptyState";
import { StatusMessage, LoadingBlock } from "@/components/admin/ui/StatusMessage";
import { adminInputClass, adminTextareaClass } from "@/components/admin/ui/form-styles";
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
import { useAdminDashboardSearch } from "@/components/admin/context/AdminDashboardContext";
import SearchNoResults from "@/components/admin/ui/SearchNoResults";
import AdminPagination from "@/components/admin/ui/AdminPagination";
import { usePaginatedAdminList } from "@/components/admin/hooks/usePaginatedAdminList";

type Testimonial = {
  id: string;
  author: string;
  district: string;
  rating: number;
  excerpt: string;
  published: boolean;
  sortOrder: number;
};

const emptyForm = {
  author: "",
  district: "",
  rating: 5,
  excerpt: "",
  published: false,
  sortOrder: 0,
};

function Stars({ count }: { count: number }) {
  return (
    <span className="inline-flex gap-0.5 text-amber-500">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`h-3.5 w-3.5 ${i < count ? "fill-current" : "text-slate-200"}`} />
      ))}
    </span>
  );
}

export default function TestimonialsManagement() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const { searchQuery, isSearching: dashboardSearchActive } = useAdminDashboardSearch();

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
  } = usePaginatedAdminList<Testimonial>({
    path: "/api/admin/testimonials",
    searchQuery,
  });

  function openCreate() {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  }

  function openEdit(t: Testimonial) {
    setEditing(t);
    setForm({
      author: t.author,
      district: t.district,
      rating: t.rating,
      excerpt: t.excerpt,
      published: t.published,
      sortOrder: t.sortOrder,
    });
    setModalOpen(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const payload = { ...form, rating: Number(form.rating), sortOrder: Number(form.sortOrder) };
    const res = editing
      ? await adminApi(`/api/admin/testimonials/${editing.id}`, {
          method: "PATCH",
          body: JSON.stringify(payload),
        })
      : await adminApi("/api/admin/testimonials", { method: "POST", body: JSON.stringify(payload) });
    setSaving(false);
    if (!res.success) {
      setError(res.error);
      return;
    }
    setSuccess(editing ? "Yorum güncellendi." : "Yorum eklendi.");
    setModalOpen(false);
    refresh();
  }

  async function handleDelete(t: Testimonial) {
    if (!confirm("Bu yorum silinsin mi?")) return;
    const res = await adminApi(`/api/admin/testimonials/${t.id}`, { method: "DELETE" });
    if (!res.success) {
      setError(res.error);
      return;
    }
    setSuccess("Yorum silindi.");
    refresh();
  }

  if (dashboardSearchActive) return null;

  return (
    <>
      <SectionCard
        id="testimonials"
        title="Müşteri Yorumları"
        description="İlçe ve hizmet sayfalarında gösterilen referanslar"
        action={
          <Button size="sm" onClick={openCreate} disabled={loading}>
            <Plus className="h-4 w-4" />
            Yorum Ekle
          </Button>
        }
      >
        {error || listError ? (
          <StatusMessage type="error" message={error ?? listError ?? ""} className="mb-4" />
        ) : null}
        {success ? <StatusMessage type="success" message={success} className="mb-4" /> : null}
        {loading ? (
          <LoadingBlock />
        ) : total === 0 && !isSearching ? (
          <EmptyState message="Henüz yorum kaydı yok." />
        ) : items.length === 0 ? (
          <SearchNoResults />
        ) : (
          <>
          <MobileCardList>
            {items.map((t) => (
              <MobileCard key={t.id}>
                <MobileCardField label="Müşteri / İlçe">
                  <p className="font-medium">{t.author}</p>
                  <p className="text-slate-500">{t.district}</p>
                </MobileCardField>
                <MobileCardField label="Puan">
                  <Stars count={t.rating} />
                </MobileCardField>
                <MobileCardField label="Yorum">
                  <p className="text-slate-600">{t.excerpt}</p>
                </MobileCardField>
                <MobileCardField label="Yayın">
                  <Badge variant={t.published ? "success" : "default"}>
                    {t.published ? "Yayında" : "Beklemede"}
                  </Badge>
                </MobileCardField>
                <MobileCardActions>
                  <button
                    type="button"
                    onClick={() => openEdit(t)}
                    className="p-2 text-brand-red hover:bg-red-50 rounded-lg"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(t)}
                    className="p-2 text-slate-500 hover:text-brand-red rounded-lg"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </MobileCardActions>
              </MobileCard>
            ))}
          </MobileCardList>
          <DataTable>
            <DataTableHead>
              <DataTableHeaderCell>Müşteri</DataTableHeaderCell>
              <DataTableHeaderCell>İlçe</DataTableHeaderCell>
              <DataTableHeaderCell>Puan</DataTableHeaderCell>
              <DataTableHeaderCell>Yorum</DataTableHeaderCell>
              <DataTableHeaderCell>Yayın</DataTableHeaderCell>
              <DataTableHeaderCell className="text-right">İşlem</DataTableHeaderCell>
            </DataTableHead>
            <DataTableBody>
              {items.map((t) => (
                <DataTableRow key={t.id}>
                  <DataTableCell className="font-medium">{t.author}</DataTableCell>
                  <DataTableCell>{t.district}</DataTableCell>
                  <DataTableCell>
                    <Stars count={t.rating} />
                  </DataTableCell>
                  <DataTableCell className="max-w-xs text-slate-600">{t.excerpt}</DataTableCell>
                  <DataTableCell>
                    <Badge variant={t.published ? "success" : "default"}>
                      {t.published ? "Yayında" : "Beklemede"}
                    </Badge>
                  </DataTableCell>
                  <DataTableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <button type="button" onClick={() => openEdit(t)} className="p-2 text-brand-red hover:bg-red-50 rounded-lg">
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button type="button" onClick={() => handleDelete(t)} className="p-2 text-slate-500 hover:text-brand-red rounded-lg">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
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

      <SimpleModal title={editing ? "Yorumu Düzenle" : "Yorum Ekle"} open={modalOpen} onClose={() => setModalOpen(false)}>
        <form onSubmit={handleSave} className="space-y-4">
          <input className={adminInputClass} placeholder="Müşteri adı" value={form.author} onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))} required />
          <input className={adminInputClass} placeholder="İlçe" value={form.district} onChange={(e) => setForm((f) => ({ ...f, district: e.target.value }))} required />
          <input type="number" min={1} max={5} className={adminInputClass} value={form.rating} onChange={(e) => setForm((f) => ({ ...f, rating: Number(e.target.value) }))} />
          <textarea className={adminTextareaClass} rows={3} placeholder="Yorum" value={form.excerpt} onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))} required />
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.published} onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))} className="accent-brand-red" />
            Yayında
          </label>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="secondary" onClick={() => setModalOpen(false)}>İptal</Button>
            <Button type="submit" disabled={saving}>Kaydet</Button>
          </div>
        </form>
      </SimpleModal>
    </>
  );
}
