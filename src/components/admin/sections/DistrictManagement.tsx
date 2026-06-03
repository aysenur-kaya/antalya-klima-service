"use client";

import { useCallback, useEffect, useState } from "react";
import { MapPinned, Plus, Pencil, Trash2 } from "lucide-react";
import SectionCard from "@/components/admin/ui/SectionCard";
import Badge from "@/components/admin/ui/Badge";
import Button from "@/components/admin/ui/Button";
import SimpleModal from "@/components/admin/ui/SimpleModal";
import EmptyState from "@/components/admin/ui/EmptyState";
import { StatusMessage, LoadingBlock } from "@/components/admin/ui/StatusMessage";
import { adminInputClass } from "@/components/admin/ui/form-styles";
import { adminApi } from "@/lib/admin/api-client";

type Neighborhood = {
  id: string;
  name: string;
  slug: string;
  active: boolean;
};

type District = {
  id: string;
  name: string;
  slug: string;
  landingActive: boolean;
  sortOrder: number;
  neighborhoods?: Neighborhood[];
  _count?: { neighborhoods: number };
};

const emptyDistrict = { name: "", slug: "", landingActive: false, sortOrder: 0 };
const emptyNeighborhood = { name: "", slug: "", active: true };

export default function DistrictManagement() {
  const [items, setItems] = useState<District[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const [districtModal, setDistrictModal] = useState(false);
  const [editingDistrict, setEditingDistrict] = useState<District | null>(null);
  const [districtForm, setDistrictForm] = useState(emptyDistrict);

  const [neighborhoodModal, setNeighborhoodModal] = useState(false);
  const [neighborhoodDistrictId, setNeighborhoodDistrictId] = useState<string | null>(null);
  const [editingNeighborhood, setEditingNeighborhood] = useState<Neighborhood | null>(null);
  const [neighborhoodForm, setNeighborhoodForm] = useState(emptyNeighborhood);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const res = await adminApi<{ items: District[] }>("/api/admin/districts");
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

  function openDistrictCreate() {
    setEditingDistrict(null);
    setDistrictForm(emptyDistrict);
    setDistrictModal(true);
  }

  function openDistrictEdit(d: District) {
    setEditingDistrict(d);
    setDistrictForm({
      name: d.name,
      slug: d.slug,
      landingActive: d.landingActive,
      sortOrder: d.sortOrder,
    });
    setDistrictModal(true);
  }

  async function saveDistrict(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const payload = { ...districtForm, sortOrder: Number(districtForm.sortOrder) };
    const res = editingDistrict
      ? await adminApi(`/api/admin/districts/${editingDistrict.id}`, {
          method: "PATCH",
          body: JSON.stringify(payload),
        })
      : await adminApi("/api/admin/districts", { method: "POST", body: JSON.stringify(payload) });
    setSaving(false);
    if (!res.success) {
      setError(res.error);
      return;
    }
    setSuccess(editingDistrict ? "İlçe güncellendi." : "İlçe eklendi.");
    setDistrictModal(false);
    load();
  }

  async function deleteDistrict(d: District) {
    if (!confirm(`"${d.name}" ve mahalleleri silinsin mi?`)) return;
    const res = await adminApi(`/api/admin/districts/${d.id}`, { method: "DELETE" });
    if (!res.success) {
      setError(res.error);
      return;
    }
    setSuccess("İlçe silindi.");
    if (expandedId === d.id) setExpandedId(null);
    load();
  }

  function openNeighborhoodCreate(districtId: string) {
    setNeighborhoodDistrictId(districtId);
    setEditingNeighborhood(null);
    setNeighborhoodForm(emptyNeighborhood);
    setNeighborhoodModal(true);
  }

  function openNeighborhoodEdit(n: Neighborhood, districtId: string) {
    setNeighborhoodDistrictId(districtId);
    setEditingNeighborhood(n);
    setNeighborhoodForm({ name: n.name, slug: n.slug, active: n.active });
    setNeighborhoodModal(true);
  }

  async function saveNeighborhood(e: React.FormEvent) {
    e.preventDefault();
    if (!neighborhoodDistrictId) return;
    setSaving(true);
    setError(null);
    const payload = editingNeighborhood
      ? neighborhoodForm
      : { ...neighborhoodForm, districtId: neighborhoodDistrictId };
    const res = editingNeighborhood
      ? await adminApi(`/api/admin/neighborhoods/${editingNeighborhood.id}`, {
          method: "PATCH",
          body: JSON.stringify(payload),
        })
      : await adminApi("/api/admin/neighborhoods", { method: "POST", body: JSON.stringify(payload) });
    setSaving(false);
    if (!res.success) {
      setError(res.error);
      return;
    }
    setSuccess(editingNeighborhood ? "Mahalle güncellendi." : "Mahalle eklendi.");
    setNeighborhoodModal(false);
    load();
  }

  async function deleteNeighborhood(id: string) {
    if (!confirm("Mahalle silinsin mi?")) return;
    const res = await adminApi(`/api/admin/neighborhoods/${id}`, { method: "DELETE" });
    if (!res.success) {
      setError(res.error);
      return;
    }
    setSuccess("Mahalle silindi.");
    load();
  }

  return (
    <>
      <SectionCard
        id="districts"
        title="İlçe & Mahalle Yönetimi"
        description="İzmir ilçe landing sayfaları ve mahalle SEO yapısı"
        action={
          <Button size="sm" onClick={openDistrictCreate} disabled={loading}>
            <Plus className="h-4 w-4" />
            İlçe Ekle
          </Button>
        }
      >
        {error ? <StatusMessage type="error" message={error} className="mb-4" /> : null}
        {success ? <StatusMessage type="success" message={success} className="mb-4" /> : null}
        {loading ? (
          <LoadingBlock />
        ) : items.length === 0 ? (
          <EmptyState message="Henüz ilçe kaydı yok." />
        ) : (
          <div className="space-y-4">
            {items.map((d) => (
              <div key={d.id} className="rounded-xl border border-brand-border overflow-hidden">
                <div className="flex flex-wrap items-center gap-3 bg-brand-light/50 px-4 py-3">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-brand-dark">{d.name}</p>
                    <code className="text-xs text-slate-500">/bolgeler/{d.slug}</code>
                  </div>
                  <Badge variant={d.landingActive ? "success" : "default"}>
                    {d.landingActive ? "Aktif" : "Taslak"}
                  </Badge>
                  <span className="text-sm text-slate-500">
                    {d._count?.neighborhoods ?? d.neighborhoods?.length ?? 0} mahalle
                  </span>
                  <button
                    type="button"
                    onClick={() => setExpandedId(expandedId === d.id ? null : d.id)}
                    className="inline-flex items-center gap-1 rounded-lg px-2 py-1.5 text-sm text-brand-red hover:bg-red-50"
                  >
                    <MapPinned className="h-3.5 w-3.5" />
                    Mahalleler
                  </button>
                  <button type="button" onClick={() => openDistrictEdit(d)} className="p-2 text-slate-500 hover:text-brand-red">
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button type="button" onClick={() => deleteDistrict(d)} className="p-2 text-slate-500 hover:text-brand-red">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                {expandedId === d.id ? (
                  <div className="border-t border-brand-border bg-white p-4">
                    <div className="mb-3 flex justify-end">
                      <Button size="sm" variant="secondary" onClick={() => openNeighborhoodCreate(d.id)}>
                        <Plus className="h-3.5 w-3.5" />
                        Mahalle Ekle
                      </Button>
                    </div>
                    {(d.neighborhoods?.length ?? 0) === 0 ? (
                      <p className="text-sm text-slate-500">Bu ilçede mahalle yok.</p>
                    ) : (
                      <ul className="divide-y divide-brand-border rounded-lg border border-brand-border">
                        {d.neighborhoods?.map((n) => (
                          <li key={n.id} className="flex items-center justify-between px-3 py-2 text-sm">
                            <span>
                              {n.name}{" "}
                              <code className="text-xs text-slate-400">({n.slug})</code>
                              {!n.active ? <span className="ml-2 text-xs text-slate-400">pasif</span> : null}
                            </span>
                            <div className="flex gap-2">
                              <button type="button" onClick={() => openNeighborhoodEdit(n, d.id)} className="text-brand-red text-xs">
                                Düzenle
                              </button>
                              <button type="button" onClick={() => deleteNeighborhood(n.id)} className="text-slate-500 text-xs">
                                Sil
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        )}
      </SectionCard>

      <SimpleModal title={editingDistrict ? "İlçe Düzenle" : "İlçe Ekle"} open={districtModal} onClose={() => setDistrictModal(false)}>
        <form onSubmit={saveDistrict} className="space-y-4">
          <input className={adminInputClass} placeholder="İlçe adı" value={districtForm.name} onChange={(e) => setDistrictForm((f) => ({ ...f, name: e.target.value }))} required />
          <input className={adminInputClass} placeholder="Slug" value={districtForm.slug} onChange={(e) => setDistrictForm((f) => ({ ...f, slug: e.target.value }))} />
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={districtForm.landingActive} onChange={(e) => setDistrictForm((f) => ({ ...f, landingActive: e.target.checked }))} className="accent-brand-red" />
            Landing aktif
          </label>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="secondary" onClick={() => setDistrictModal(false)}>İptal</Button>
            <Button type="submit" disabled={saving}>Kaydet</Button>
          </div>
        </form>
      </SimpleModal>

      <SimpleModal title={editingNeighborhood ? "Mahalle Düzenle" : "Mahalle Ekle"} open={neighborhoodModal} onClose={() => setNeighborhoodModal(false)}>
        <form onSubmit={saveNeighborhood} className="space-y-4">
          <input className={adminInputClass} placeholder="Mahalle adı" value={neighborhoodForm.name} onChange={(e) => setNeighborhoodForm((f) => ({ ...f, name: e.target.value }))} required />
          <input className={adminInputClass} placeholder="Slug" value={neighborhoodForm.slug} onChange={(e) => setNeighborhoodForm((f) => ({ ...f, slug: e.target.value }))} />
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={neighborhoodForm.active} onChange={(e) => setNeighborhoodForm((f) => ({ ...f, active: e.target.checked }))} className="accent-brand-red" />
            Aktif
          </label>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="secondary" onClick={() => setNeighborhoodModal(false)}>İptal</Button>
            <Button type="submit" disabled={saving}>Kaydet</Button>
          </div>
        </form>
      </SimpleModal>
    </>
  );
}
