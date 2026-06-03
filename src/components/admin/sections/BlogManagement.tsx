"use client";

import { useState } from "react";
import { FilePlus, Pencil, Trash2 } from "lucide-react";
import SectionCard from "@/components/admin/ui/SectionCard";
import Badge from "@/components/admin/ui/Badge";
import Button from "@/components/admin/ui/Button";
import SimpleModal from "@/components/admin/ui/SimpleModal";
import EmptyState from "@/components/admin/ui/EmptyState";
import { StatusMessage, LoadingBlock } from "@/components/admin/ui/StatusMessage";
import { adminInputClass, adminTextareaClass } from "@/components/admin/ui/form-styles";
import MarkdownContentEditor from "@/components/admin/ui/MarkdownContentEditor";
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
import { blogStatusLabel, formatAdminDate, serviceTypeLabel } from "@/lib/admin/format";
import { useAdminDashboardSearch } from "@/components/admin/context/AdminDashboardContext";
import SearchNoResults from "@/components/admin/ui/SearchNoResults";
import AdminPagination from "@/components/admin/ui/AdminPagination";
import { usePaginatedAdminList } from "@/components/admin/hooks/usePaginatedAdminList";

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  status: "DRAFT" | "PUBLISHED";
  category: "KLIMA" | "BEYAZ_ESYA";
  views: number;
  excerpt?: string | null;
  updatedAt: string;
};

type BlogForm = {
  title: string;
  slug: string;
  status: "DRAFT" | "PUBLISHED";
  category: "KLIMA" | "BEYAZ_ESYA";
  excerpt: string;
  content: string;
  views: number;
};

const emptyForm: BlogForm = {
  title: "",
  slug: "",
  status: "DRAFT",
  category: "KLIMA",
  excerpt: "",
  content: "",
  views: 0,
};

export default function BlogManagement() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [loadingContent, setLoadingContent] = useState(false);
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
  } = usePaginatedAdminList<BlogPost>({
    path: "/api/admin/blog-posts",
    searchQuery,
  });

  function openCreate() {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  }

  async function openEdit(p: BlogPost) {
    setEditing(p);
    setForm({
      title: p.title,
      slug: p.slug,
      status: p.status,
      category: p.category ?? "KLIMA",
      excerpt: p.excerpt ?? "",
      content: "",
      views: p.views,
    });
    setModalOpen(true);
    setLoadingContent(true);
    const res = await adminApi<{ item: { content?: string | null; category?: "KLIMA" | "BEYAZ_ESYA" } }>(
      `/api/admin/blog-posts/${p.id}`
    );
    setLoadingContent(false);
    if (res.success) {
      setForm((f) => ({
        ...f,
        content: res.data.item.content ?? "",
        category: res.data.item.category ?? f.category,
      }));
    } else {
      setError(res.error);
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const payload = { ...form, views: Number(form.views) };
    const res = editing
      ? await adminApi(`/api/admin/blog-posts/${editing.id}`, {
          method: "PATCH",
          body: JSON.stringify(payload),
        })
      : await adminApi("/api/admin/blog-posts", { method: "POST", body: JSON.stringify(payload) });
    setSaving(false);
    if (!res.success) {
      setError(res.error);
      return;
    }
    setSuccess(editing ? "Yazı güncellendi." : "Yazı oluşturuldu.");
    setModalOpen(false);
    refresh();
  }

  async function handleDelete(p: BlogPost) {
    if (!confirm(`"${p.title}" silinsin mi?`)) return;
    const res = await adminApi(`/api/admin/blog-posts/${p.id}`, { method: "DELETE" });
    if (!res.success) {
      setError(res.error);
      return;
    }
    setSuccess("Yazı silindi.");
    refresh();
  }

  return (
    <>
      <SectionCard
        id="blog"
        title="Blog & İçerik Yönetimi"
        description="Rehber yazıları ve SEO içerikleri"
        action={
          <Button size="sm" onClick={openCreate} disabled={loading}>
            <FilePlus className="h-4 w-4" />
            Yeni Yazı
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
          <EmptyState message="Henüz blog yazısı yok." />
        ) : items.length === 0 ? (
          <SearchNoResults />
        ) : (
          <>
          <MobileCardList>
            {items.map((post) => (
              <MobileCard key={post.id}>
                <MobileCardField label="Başlık">
                  <p className="font-medium">{post.title}</p>
                  <code className="mt-1 block break-all text-xs text-slate-400">/rehber/{post.slug}</code>
                </MobileCardField>
                <MobileCardField label="Durum / Kategori">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant={post.status === "PUBLISHED" ? "success" : "warning"}>
                      {blogStatusLabel(post.status)}
                    </Badge>
                    <Badge variant={post.category === "KLIMA" ? "brand" : "default"}>
                      {serviceTypeLabel(post.category ?? "KLIMA")}
                    </Badge>
                  </div>
                </MobileCardField>
                <MobileCardField label="Görüntülenme / Güncelleme">
                  <span>{post.views.toLocaleString("tr-TR")} görüntülenme</span>
                  <span className="mt-1 block text-slate-500">{formatAdminDate(post.updatedAt)}</span>
                </MobileCardField>
                <MobileCardActions>
                  <button
                    type="button"
                    onClick={() => openEdit(post)}
                    className="inline-flex items-center gap-1 rounded-lg px-2 py-1.5 text-sm text-brand-red hover:bg-red-50"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                    Düzenle
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(post)}
                    className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-brand-red"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </MobileCardActions>
              </MobileCard>
            ))}
          </MobileCardList>
          <DataTable>
            <DataTableHead>
              <DataTableHeaderCell>Başlık</DataTableHeaderCell>
              <DataTableHeaderCell>Durum</DataTableHeaderCell>
              <DataTableHeaderCell>Görüntülenme</DataTableHeaderCell>
              <DataTableHeaderCell>Güncelleme</DataTableHeaderCell>
              <DataTableHeaderCell className="text-right">İşlem</DataTableHeaderCell>
            </DataTableHead>
            <DataTableBody>
              {items.map((post) => (
                <DataTableRow key={post.id}>
                  <DataTableCell>
                    <p className="font-medium text-brand-dark">{post.title}</p>
                    <code className="mt-0.5 block text-xs text-slate-400">/rehber/{post.slug}</code>
                  </DataTableCell>
                  <DataTableCell>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant={post.status === "PUBLISHED" ? "success" : "warning"}>
                        {blogStatusLabel(post.status)}
                      </Badge>
                      <Badge variant={post.category === "KLIMA" ? "brand" : "default"}>
                        {serviceTypeLabel(post.category ?? "KLIMA")}
                      </Badge>
                    </div>
                  </DataTableCell>
                  <DataTableCell>{post.views.toLocaleString("tr-TR")}</DataTableCell>
                  <DataTableCell className="text-slate-500">
                    {formatAdminDate(post.updatedAt)}
                  </DataTableCell>
                  <DataTableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => openEdit(post)}
                        className="inline-flex items-center gap-1 rounded-lg px-2 py-1.5 text-sm text-brand-red hover:bg-red-50"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                        Düzenle
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(post)}
                        className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-brand-red"
                      >
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

      <SimpleModal
        title={editing ? "Yazıyı Düzenle" : "Yeni Yazı"}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        size="lg"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Başlık</label>
            <input
              className={adminInputClass}
              placeholder="Başlık"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Slug</label>
            <input
              className={adminInputClass}
              placeholder="Slug"
              value={form.slug}
              onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">Durum</label>
              <select
                className={adminInputClass}
                value={form.status}
                onChange={(e) =>
                  setForm((f) => ({ ...f, status: e.target.value as "DRAFT" | "PUBLISHED" }))
                }
              >
                <option value="DRAFT">Taslak</option>
                <option value="PUBLISHED">Yayında</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Kategori</label>
              <select
                className={adminInputClass}
                value={form.category}
                onChange={(e) =>
                  setForm((f) => ({ ...f, category: e.target.value as "KLIMA" | "BEYAZ_ESYA" }))
                }
              >
                <option value="KLIMA">Klima</option>
                <option value="BEYAZ_ESYA">Beyaz Eşya</option>
              </select>
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Özet</label>
            <textarea
              className={adminTextareaClass}
              rows={3}
              placeholder="Kısa özet (liste ve SEO)"
              value={form.excerpt}
              onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
            />
          </div>
          <MarkdownContentEditor
            value={form.content}
            onChange={(content) => setForm((f) => ({ ...f, content }))}
            disabled={loadingContent || saving}
          />
          {loadingContent ? (
            <p className="text-xs text-slate-500">İçerik yükleniyor…</p>
          ) : null}
          <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
            <Button type="button" variant="secondary" onClick={() => setModalOpen(false)}>
              İptal
            </Button>
            <Button type="submit" disabled={saving || loadingContent}>
              {saving ? "Kaydediliyor…" : "Kaydet"}
            </Button>
          </div>
        </form>
      </SimpleModal>
    </>
  );
}
