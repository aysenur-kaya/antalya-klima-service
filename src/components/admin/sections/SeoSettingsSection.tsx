"use client";

import { useCallback, useEffect, useState } from "react";
import SectionCard from "@/components/admin/ui/SectionCard";
import Button from "@/components/admin/ui/Button";
import { StatusMessage, LoadingBlock } from "@/components/admin/ui/StatusMessage";
import { adminInputClass, adminTextareaClass } from "@/components/admin/ui/form-styles";
import { adminApi } from "@/lib/admin/api-client";
import { useAdminDashboardSearch } from "@/components/admin/context/AdminDashboardContext";
import { matchesSearchQuery } from "@/lib/admin/search";
import SearchNoResults from "@/components/admin/ui/SearchNoResults";

type SeoForm = {
  siteTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  googleVerification: string;
  robotsIndex: boolean;
};

export default function SeoSettingsSection() {
  const [form, setForm] = useState<SeoForm | null>(null);
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
        form.siteTitle,
        form.metaDescription,
        form.canonicalUrl,
        form.googleVerification,
        "seo",
        "robots"
      ));

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const res = await adminApi<{ item: SeoForm }>("/api/admin/seo-settings");
    if (res.success) {
      setForm({
        siteTitle: res.data.item.siteTitle,
        metaDescription: res.data.item.metaDescription,
        canonicalUrl: res.data.item.canonicalUrl,
        googleVerification: res.data.item.googleVerification ?? "",
        robotsIndex: res.data.item.robotsIndex,
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
    const res = await adminApi("/api/admin/seo-settings", {
      method: "PATCH",
      body: JSON.stringify(form),
    });
    setSaving(false);
    if (!res.success) {
      setError(res.error);
      return;
    }
    setSuccess("SEO ayarları kaydedildi.");
    load();
  }

  return (
    <SectionCard
      id="seo"
      title="SEO Ayarları"
      description="Site geneli meta, canonical ve doğrulama"
      action={
        <Button
          size="sm"
          type="submit"
          form="seo-form"
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
        <StatusMessage
          type="info"
          message="SEO ayarları yüklenemedi. npm run db:seed çalıştırın."
        />
      ) : !formVisible ? (
        <SearchNoResults />
      ) : (
        <form id="seo-form" onSubmit={handleSave} className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-sm font-medium text-brand-dark">Site Başlığı</label>
            <input
              className={adminInputClass}
              value={form.siteTitle}
              onChange={(e) => setForm((f) => f && { ...f, siteTitle: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-brand-dark">Canonical URL</label>
            <input
              className={adminInputClass}
              value={form.canonicalUrl}
              onChange={(e) => setForm((f) => f && { ...f, canonicalUrl: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-brand-dark">Google Verification</label>
            <input
              className={adminInputClass}
              value={form.googleVerification}
              onChange={(e) => setForm((f) => f && { ...f, googleVerification: e.target.value })}
            />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-sm font-medium text-brand-dark">Meta Açıklama</label>
            <textarea
              className={adminTextareaClass}
              rows={3}
              value={form.metaDescription}
              onChange={(e) => setForm((f) => f && { ...f, metaDescription: e.target.value })}
              required
            />
          </div>
          <label className="flex items-center gap-3 sm:col-span-2">
            <input
              type="checkbox"
              checked={form.robotsIndex}
              onChange={(e) => setForm((f) => f && { ...f, robotsIndex: e.target.checked })}
              className="accent-brand-red"
            />
            <span className="text-sm text-brand-dark">Arama motorlarında index (robots)</span>
          </label>
        </form>
      )}
    </SectionCard>
  );
}
