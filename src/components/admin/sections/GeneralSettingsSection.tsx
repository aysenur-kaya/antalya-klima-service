"use client";

import { useCallback, useEffect, useState } from "react";
import SectionCard from "@/components/admin/ui/SectionCard";
import Button from "@/components/admin/ui/Button";
import { StatusMessage, LoadingBlock } from "@/components/admin/ui/StatusMessage";
import { adminInputClass } from "@/components/admin/ui/form-styles";
import { adminApi } from "@/lib/admin/api-client";
import { useAdminDashboardSearch } from "@/components/admin/context/AdminDashboardContext";
import { matchesSearchQuery } from "@/lib/admin/search";
import SearchNoResults from "@/components/admin/ui/SearchNoResults";

type GeneralForm = {
  siteName: string;
  defaultCity: string;
  maintenanceMode: boolean;
  showTestimonials: boolean;
  analyticsEnabled: boolean;
};

export default function GeneralSettingsSection() {
  const [form, setForm] = useState<GeneralForm | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { searchQuery, isSearching } = useAdminDashboardSearch();

  const formVisible =
    form &&
    (!isSearching ||
      matchesSearchQuery(
        searchQuery,
        form.siteName,
        form.defaultCity,
        "bakım",
        "yorum",
        "analytics",
        "genel",
        "ayar"
      ));

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const res = await adminApi<{ item: GeneralForm }>("/api/admin/site-settings");
    if (res.success) {
      setForm({
        siteName: res.data.item.siteName,
        defaultCity: res.data.item.defaultCity,
        maintenanceMode: res.data.item.maintenanceMode,
        showTestimonials: res.data.item.showTestimonials,
        analyticsEnabled: res.data.item.analyticsEnabled,
      });
    } else {
      setForm(null);
      setError(res.error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;
    setSaving(true);
    setError(null);
    const res = await adminApi("/api/admin/site-settings", {
      method: "PATCH",
      body: JSON.stringify(form),
    });
    setSaving(false);
    if (!res.success) {
      setError(res.error);
      return;
    }
    setSuccess("Genel ayarlar kaydedildi.");
    load();
  }

  const toggles = [
    { key: "maintenanceMode" as const, label: "Bakım modu" },
    { key: "showTestimonials" as const, label: "Yorumları sitede göster" },
    { key: "analyticsEnabled" as const, label: "Analytics entegrasyonu" },
  ];

  return (
    <SectionCard
      id="settings"
      title="Genel Ayarlar"
      description="Site adı, şehir ve görünürlük tercihleri"
      action={
        <Button
          size="sm"
          type="submit"
          form="general-form"
          disabled={saving || loading || !form}
        >
          {saving ? "Kaydediliyor…" : "Kaydet"}
        </Button>
      }
    >
      {error ? <StatusMessage type="error" message={error} className="mb-4" /> : null}
      {success ? <StatusMessage type="success" message={success} className="mb-4" /> : null}
      {loading ? (
        <LoadingBlock />
      ) : !form ? (
        <StatusMessage type="info" message="Site ayarları yüklenemedi. npm run db:seed çalıştırın." />
      ) : !formVisible ? (
        <SearchNoResults />
      ) : (
        <form id="general-form" onSubmit={handleSave}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-brand-dark">Site adı</label>
              <input
                className={adminInputClass}
                value={form.siteName}
                onChange={(e) => setForm((f) => f && { ...f, siteName: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-brand-dark">Varsayılan şehir</label>
              <input
                className={adminInputClass}
                value={form.defaultCity}
                onChange={(e) => setForm((f) => f && { ...f, defaultCity: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="mt-6 space-y-3">
            {toggles.map((item) => (
              <label
                key={item.key}
                className="flex items-center justify-between rounded-xl border border-brand-border bg-brand-light/60 px-4 py-3"
              >
                <span className="text-sm font-medium text-brand-dark">{item.label}</span>
                <input
                  type="checkbox"
                  checked={form[item.key]}
                  onChange={(e) =>
                    setForm((f) => f && { ...f, [item.key]: e.target.checked })
                  }
                  className="accent-brand-red"
                />
              </label>
            ))}
          </div>
        </form>
      )}
    </SectionCard>
  );
}
