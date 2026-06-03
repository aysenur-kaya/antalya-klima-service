"use client";

import { useCallback, useEffect, useState } from "react";
import { MessageCircle, Phone } from "lucide-react";
import SectionCard from "@/components/admin/ui/SectionCard";
import Button from "@/components/admin/ui/Button";
import { StatusMessage, LoadingBlock } from "@/components/admin/ui/StatusMessage";
import { adminInputClass } from "@/components/admin/ui/form-styles";
import { adminApi } from "@/lib/admin/api-client";
import { useAdminDashboardSearch } from "@/components/admin/context/AdminDashboardContext";
import { matchesSearchQuery } from "@/lib/admin/search";
import SearchNoResults from "@/components/admin/ui/SearchNoResults";

type ContactForm = {
  siteName: string;
  phone: string;
  phoneFormatted: string;
  whatsappUrl: string;
  workingHours: string;
  stickyCtaEnabled: boolean;
};

export default function ContactSettingsSection() {
  const [form, setForm] = useState<ContactForm | null>(null);
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
        form.phone,
        form.phoneFormatted,
        form.whatsappUrl,
        form.workingHours,
        "telefon",
        "whatsapp",
        "iletişim"
      ));

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const res = await adminApi<{ item: ContactForm }>("/api/admin/site-settings");
    if (res.success) {
      setForm({
        siteName: res.data.item.siteName,
        phone: res.data.item.phone,
        phoneFormatted: res.data.item.phoneFormatted,
        whatsappUrl: res.data.item.whatsappUrl,
        workingHours: res.data.item.workingHours,
        stickyCtaEnabled: res.data.item.stickyCtaEnabled,
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
    setSuccess("İletişim ayarları kaydedildi.");
    load();
  }

  return (
    <SectionCard
      id="contact"
      title="WhatsApp & Telefon Ayarları"
      description="Site genelinde kullanılan iletişim bilgileri"
      action={
        <Button
          size="sm"
          type="submit"
          form="contact-form"
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
        <form id="contact-form" onSubmit={handleSave} className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-brand-border bg-brand-light/80 p-5 lg:col-span-2">
            <label className="mb-1 block text-sm font-medium">Şirket / site adı</label>
            <input
              className={adminInputClass}
              value={form.siteName}
              onChange={(e) => setForm((f) => f && { ...f, siteName: e.target.value })}
              required
            />
          </div>
          <div className="rounded-2xl border border-brand-border bg-brand-light/80 p-5">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-red/10 text-brand-red">
                <Phone className="h-5 w-5" />
              </span>
              <h3 className="font-semibold text-brand-dark">Telefon</h3>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-slate-500">E.164</label>
                <input
                  className={adminInputClass + " mt-1"}
                  value={form.phone}
                  onChange={(e) => setForm((f) => f && { ...f, phone: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500">Görünen format</label>
                <input
                  className={adminInputClass + " mt-1"}
                  value={form.phoneFormatted}
                  onChange={(e) => setForm((f) => f && { ...f, phoneFormatted: e.target.value })}
                  required
                />
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-brand-border bg-brand-light/80 p-5">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
                <MessageCircle className="h-5 w-5" />
              </span>
              <h3 className="font-semibold text-brand-dark">WhatsApp</h3>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-slate-500">WhatsApp URL</label>
                <input
                  className={adminInputClass + " mt-1"}
                  value={form.whatsappUrl}
                  onChange={(e) => setForm((f) => f && { ...f, whatsappUrl: e.target.value })}
                  required
                />
              </div>
              <label className="flex items-center gap-3 rounded-xl border border-brand-border bg-white px-4 py-3">
                <input
                  type="checkbox"
                  checked={form.stickyCtaEnabled}
                  onChange={(e) => setForm((f) => f && { ...f, stickyCtaEnabled: e.target.checked })}
                  className="accent-brand-red"
                />
                <span className="text-sm">Mobil sticky WhatsApp CTA aktif</span>
              </label>
            </div>
          </div>
          <div className="lg:col-span-2">
            <label className="text-xs font-medium text-slate-500">Çalışma saatleri</label>
            <input
              className={adminInputClass + " mt-1 max-w-md"}
              value={form.workingHours}
              onChange={(e) => setForm((f) => f && { ...f, workingHours: e.target.value })}
              required
            />
          </div>
        </form>
      )}
    </SectionCard>
  );
}
