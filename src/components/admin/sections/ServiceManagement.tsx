"use client";

import { useCallback, useEffect, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import SectionCard from "@/components/admin/ui/SectionCard";
import Badge from "@/components/admin/ui/Badge";
import Button from "@/components/admin/ui/Button";
import SimpleModal from "@/components/admin/ui/SimpleModal";
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
import { formatAdminDate, serviceTypeLabel } from "@/lib/admin/format";

type Service = {
  id: string;
  title: string;
  slug: string;
  type: "KLIMA" | "BEYAZ_ESYA";
  active: boolean;
  sortOrder: number;
  updatedAt: string;
};

type ServiceForm = {
  title: string;
  slug: string;
  type: "KLIMA" | "BEYAZ_ESYA";
  active: boolean;
  sortOrder: number;
};

const emptyForm: ServiceForm = {
  title: "",
  slug: "",
  type: "KLIMA",
  active: true,
  sortOrder: 0,
};

export default function ServiceManagement() {
  const [items, setItems] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const res = await adminApi<{ items: Service[] }>("/api/admin/services");
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

  function openEdit(s: Service) {
    setEditing(s);
    setForm({
      title: s.title,
      slug: s.slug,
      type: s.type,
      active: s.active,
      sortOrder: s.sortOrder,
    });
    setModalOpen(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSuccess(null);
    setError(null);

    const payload = { ...form, sortOrder: Number(form.sortOrder) };
    const res = editing
      ? await adminApi<{ item: Service }>(`/api/admin/services/${editing.id}`, {
          method: "PATCH",
          body: JSON.stringify(payload),
        })
      : await adminApi<{ item: Service }>("/api/admin/services", {
          method: "POST",
          body: JSON.stringify(payload),
        });

    setSaving(false);
    if (!res.success) {
      setError(res.error);
      return;
    }
    setSuccess(editing ? "Hizmet güncellendi." : "Hizmet oluşturuldu.");
    setModalOpen(false);
    load();
  }

  async function handleDelete(s: Service) {
    if (!confirm(`"${s.title}" silinsin mi?`)) return;
    const res = await adminApi(`/api/admin/services/${s.id}`, { method: "DELETE" });
    if (!res.success) {
      setError(res.error);
      return;
    }
    setSuccess("Hizmet silindi.");
    load();
  }

  return (
    <>
      <SectionCard
        id="services"
        title="Hizmet Yönetimi"
        description="Klima ve beyaz eşya hizmet sayfalarını yönetin"
        action={
          <Button size="sm" onClick={openCreate} disabled={loading}>
            <Plus className="h-4 w-4" />
            Yeni Hizmet
          </Button>
        }
      >
        {error ? <StatusMessage type="error" message={error} className="mb-4" /> : null}
        {success ? <StatusMessage type="success" message={success} className="mb-4" /> : null}
        {loading ? (
          <LoadingBlock />
        ) : items.length === 0 ? (
          <EmptyState message="Henüz hizmet kaydı yok. Yeni Hizmet ile ekleyin." />
        ) : (
          <DataTable>
            <DataTableHead>
              <DataTableHeaderCell>Hizmet</DataTableHeaderCell>
              <DataTableHeaderCell>Slug</DataTableHeaderCell>
              <DataTableHeaderCell>Kategori</DataTableHeaderCell>
              <DataTableHeaderCell>Durum</DataTableHeaderCell>
              <DataTableHeaderCell>Güncelleme</DataTableHeaderCell>
              <DataTableHeaderCell className="text-right">İşlem</DataTableHeaderCell>
            </DataTableHead>
            <DataTableBody>
              {items.map((service) => (
                <DataTableRow key={service.id}>
                  <DataTableCell className="font-medium text-brand-dark">{service.title}</DataTableCell>
                  <DataTableCell>
                    <code className="rounded-lg bg-brand-gray px-2 py-0.5 text-xs text-slate-600">
                      {service.slug}
                    </code>
                  </DataTableCell>
                  <DataTableCell>
                    <Badge variant={service.type === "KLIMA" ? "brand" : "default"}>
                      {serviceTypeLabel(service.type)}
                    </Badge>
                  </DataTableCell>
                  <DataTableCell>
                    <Badge variant={service.active ? "success" : "default"}>
                      {service.active ? "Aktif" : "Pasif"}
                    </Badge>
                  </DataTableCell>
                  <DataTableCell className="text-slate-500">
                    {formatAdminDate(service.updatedAt)}
                  </DataTableCell>
                  <DataTableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => openEdit(service)}
                        className="inline-flex items-center gap-1 rounded-lg px-2 py-1.5 text-sm text-brand-red hover:bg-red-50"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                        Düzenle
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(service)}
                        className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-brand-red"
                        aria-label="Sil"
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
        title={editing ? "Hizmeti Düzenle" : "Yeni Hizmet"}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Başlık</label>
            <input
              className={adminInputClass}
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Slug</label>
            <input
              className={adminInputClass}
              value={form.slug}
              onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
              placeholder="Boş bırakılırsa başlıktan üretilir"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Kategori</label>
            <select
              className={adminInputClass}
              value={form.type}
              onChange={(e) =>
                setForm((f) => ({ ...f, type: e.target.value as "KLIMA" | "BEYAZ_ESYA" }))
              }
            >
              <option value="KLIMA">Klima</option>
              <option value="BEYAZ_ESYA">Beyaz Eşya</option>
            </select>
          </div>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.active}
                onChange={(e) => setForm((f) => ({ ...f, active: e.target.checked }))}
                className="accent-brand-red"
              />
              Aktif
            </label>
            <div className="flex-1">
              <label className="mb-1 block text-sm font-medium">Sıra</label>
              <input
                type="number"
                className={adminInputClass}
                value={form.sortOrder}
                onChange={(e) => setForm((f) => ({ ...f, sortOrder: Number(e.target.value) }))}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="secondary" onClick={() => setModalOpen(false)}>
              İptal
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? "Kaydediliyor…" : "Kaydet"}
            </Button>
          </div>
        </form>
      </SimpleModal>
    </>
  );
}
