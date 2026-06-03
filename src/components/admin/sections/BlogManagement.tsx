"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { FilePlus, Pencil, Trash2 } from "lucide-react";
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
import { adminApi } from "@/lib/admin/api-client";
import { blogStatusLabel, formatAdminDate } from "@/lib/admin/format";
import { useAdminDashboardSearch } from "@/components/admin/context/AdminDashboardContext";
import { filterBySearch } from "@/lib/admin/search";
import SearchNoResults from "@/components/admin/ui/SearchNoResults";

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  status: "DRAFT" | "PUBLISHED";
  views: number;
  excerpt?: string | null;
  updatedAt: string;
};

type BlogForm = {
  title: string;
  slug: string;
  status: "DRAFT" | "PUBLISHED";
  excerpt: string;
  views: number;
};

const emptyForm: BlogForm = {
  title: "",
  slug: "",
  status: "DRAFT",
  excerpt: "",
  views: 0,
};

export default function BlogManagement() {
  const [items, setItems] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const { searchQuery, isSearching } = useAdminDashboardSearch();

  const displayItems = useMemo(
    () =>
      filterBySearch(items, searchQuery, (p) => [
        p.title,
        p.slug,
        blogStatusLabel(p.status),
        p.excerpt ?? "",
      ]),
    [items, searchQuery]
  );

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const res = await adminApi<{ items: BlogPost[] }>("/api/admin/blog-posts");
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

  function openCreate() {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  }

  function openEdit(p: BlogPost) {
    setEditing(p);
    setForm({
      title: p.title,
      slug: p.slug,
      status: p.status,
      excerpt: p.excerpt ?? "",
      views: p.views,
    });
    setModalOpen(true);
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
    load();
  }

  async function handleDelete(p: BlogPost) {
    if (!confirm(`"${p.title}" silinsin mi?`)) return;
    const res = await adminApi(`/api/admin/blog-posts/${p.id}`, { method: "DELETE" });
    if (!res.success) {
      setError(res.error);
      return;
    }
    setSuccess("Yazı silindi.");
    load();
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
        {error ? <StatusMessage type="error" message={error} className="mb-4" /> : null}
        {success ? <StatusMessage type="success" message={success} className="mb-4" /> : null}
        {loading ? (
          <LoadingBlock />
        ) : items.length === 0 ? (
          <EmptyState message="Henüz blog yazısı yok." />
        ) : isSearching && displayItems.length === 0 ? (
          <SearchNoResults />
        ) : (
          <DataTable>
            <DataTableHead>
              <DataTableHeaderCell>Başlık</DataTableHeaderCell>
              <DataTableHeaderCell>Durum</DataTableHeaderCell>
              <DataTableHeaderCell>Görüntülenme</DataTableHeaderCell>
              <DataTableHeaderCell>Güncelleme</DataTableHeaderCell>
              <DataTableHeaderCell className="text-right">İşlem</DataTableHeaderCell>
            </DataTableHead>
            <DataTableBody>
              {displayItems.map((post) => (
                <DataTableRow key={post.id}>
                  <DataTableCell>
                    <p className="font-medium text-brand-dark">{post.title}</p>
                    <code className="mt-0.5 block text-xs text-slate-400">/rehber/{post.slug}</code>
                  </DataTableCell>
                  <DataTableCell>
                    <Badge variant={post.status === "PUBLISHED" ? "success" : "warning"}>
                      {blogStatusLabel(post.status)}
                    </Badge>
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
        )}
      </SectionCard>

      <SimpleModal
        title={editing ? "Yazıyı Düzenle" : "Yeni Yazı"}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      >
        <form onSubmit={handleSave} className="space-y-4">
          <input
            className={adminInputClass}
            placeholder="Başlık"
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            required
          />
          <input
            className={adminInputClass}
            placeholder="Slug"
            value={form.slug}
            onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
          />
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
          <textarea
            className={adminTextareaClass}
            rows={3}
            placeholder="Özet"
            value={form.excerpt}
            onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
          />
          <div className="flex justify-end gap-2">
            <Button type="button" variant="secondary" onClick={() => setModalOpen(false)}>
              İptal
            </Button>
            <Button type="submit" disabled={saving}>
              Kaydet
            </Button>
          </div>
        </form>
      </SimpleModal>
    </>
  );
}
