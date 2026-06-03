"use client";

import { useState } from "react";
import Link from "next/link";
import { MessageCircle, CheckCircle2, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { CONTACT_SERVICE_TOPICS } from "@/lib/contact/constants";
import {
  validateContactInput,
  type ContactFormErrors,
} from "@/lib/contact/validation";

type FormState = {
  adSoyad: string;
  telefon: string;
  ilce: string;
  konu: string;
  mesaj: string;
  website: string;
};

const initialForm: FormState = {
  adSoyad: "",
  telefon: "",
  ilce: "",
  konu: "",
  mesaj: "",
  website: "",
};

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [reference, setReference] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [form, setForm] = useState<FormState>(initialForm);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormErrors]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name as keyof ContactFormErrors];
        return next;
      });
    }
  };

  function openWhatsAppOptional() {
    const lines = [
      `*Servis Talebi — İzmir Servisi*`,
      reference ? `Referans: ${reference}` : null,
      `Ad Soyad: ${form.adSoyad}`,
      `Telefon: ${form.telefon}`,
      form.ilce ? `İlçe: ${form.ilce}` : null,
      form.konu ? `Konu: ${form.konu}` : null,
      form.mesaj ? `Mesaj: ${form.mesaj}` : null,
    ].filter(Boolean) as string[];
    window.open(buildWhatsAppUrl(lines.join("\n")), "_blank", "noopener,noreferrer");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});

    const validation = validateContactInput({
      name: form.adSoyad,
      phone: form.telefon,
      service: form.konu,
      message: form.mesaj,
      district: form.ilce,
      website: form.website,
    });

    if (!validation.ok) {
      const fieldErrors: ContactFormErrors = {};
      if (validation.errors.name) fieldErrors.adSoyad = validation.errors.name;
      if (validation.errors.phone) fieldErrors.telefon = validation.errors.phone;
      if (validation.errors.service) fieldErrors.konu = validation.errors.service;
      if (validation.errors.message) fieldErrors.mesaj = validation.errors.message;
      if (validation.errors.district) fieldErrors.ilce = validation.errors.district;
      if (validation.errors._form) fieldErrors._form = validation.errors._form;
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: validation.data.name,
          phone: form.telefon,
          service: validation.data.service,
          message: validation.data.message,
          district: validation.data.district,
          website: form.website,
        }),
      });

      const raw = await res.text();
      let data: { success?: boolean; error?: string; data?: { reference?: string } } = {};
      try {
        data = raw ? JSON.parse(raw) : {};
      } catch {
        console.error("[ContactForm] JSON parse:", raw.slice(0, 200));
        setErrors({
          _form: "Sunucu yanıtı okunamadı. Lütfen tekrar deneyin.",
        });
        return;
      }

      if (!res.ok || !data.success) {
        console.error("[ContactForm] API hata:", res.status, data);
        setErrors({
          _form:
            data.error ??
            "Talebiniz kaydedilemedi. Lütfen bilgileri kontrol edip tekrar deneyin.",
        });
        return;
      }

      const ref = data.data?.reference ?? null;
      setReference(ref);
      setSent(true);
      console.log("[ContactForm] Talep kaydedildi:", ref);
    } catch (err) {
      console.error("[ContactForm] Ağ hatası:", err);
      setErrors({
        _form: "Bağlantı hatası. İnternet bağlantınızı kontrol edip tekrar deneyin.",
      });
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setSent(false);
    setReference(null);
    setForm(initialForm);
    setErrors({});
  }

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center gap-6 rounded-3xl border border-gray-200 bg-white p-8 sm:p-12 text-center shadow-sm">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-50">
          <CheckCircle2 className="h-10 w-10 text-green-500" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-brand-dark mb-2">Talebiniz alındı!</h3>
          <p className="text-gray-600 leading-relaxed max-w-md">
            Servis talebiniz kaydedildi. Ekibimiz en kısa sürede sizinle iletişime geçecektir.
          </p>
          {reference ? (
            <p className="mt-4 inline-block rounded-xl bg-brand-light px-4 py-2 text-sm font-semibold text-brand-dark">
              Talep referansı: <span className="font-mono text-brand-red">{reference}</span>
            </p>
          ) : null}
        </div>
        <div className="flex w-full max-w-sm flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={openWhatsAppOptional}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-brand-border bg-white px-5 py-3 text-sm font-semibold text-brand-dark transition hover:border-brand-red/30 hover:bg-red-50/50"
          >
            <MessageCircle className="h-4 w-4 text-brand-red" />
            WhatsApp ile de yazın
          </button>
          <button
            type="button"
            onClick={resetForm}
            className="text-sm font-semibold text-brand-red hover:underline"
          >
            Yeni talep oluştur
          </button>
        </div>
      </div>
    );
  }

  const inputErrorClass = "border-red-300 focus:border-red-400 focus:ring-red-200";

  return (
    <form
      onSubmit={handleSubmit}
      className="relative rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm"
      noValidate
    >
      <h2 className="text-2xl font-bold text-brand-dark mb-2">Servis Talebi Oluştur</h2>
      <p className="text-gray-500 text-sm mb-6">
        Formunuzu doldurun; talebiniz panele kaydedilir ve ekibimiz sizi arar.
      </p>

      {errors._form ? (
        <div
          role="alert"
          className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-brand-red"
        >
          {errors._form}
        </div>
      ) : null}

      {/* Honeypot */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="adSoyad" className="text-sm font-semibold text-brand-dark">
            Ad Soyad <span className="text-brand-red">*</span>
          </label>
          <input
            id="adSoyad"
            name="adSoyad"
            type="text"
            required
            autoComplete="name"
            value={form.adSoyad}
            onChange={handleChange}
            placeholder="Adınız Soyadınız"
            aria-invalid={Boolean(errors.adSoyad)}
            aria-describedby={errors.adSoyad ? "adSoyad-error" : undefined}
            className={cn(
              "rounded-xl border border-gray-200 bg-brand-light px-4 py-3 text-sm text-brand-dark placeholder:text-gray-400 focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/20 transition",
              errors.adSoyad && inputErrorClass
            )}
          />
          {errors.adSoyad ? (
            <p id="adSoyad-error" className="text-xs font-medium text-brand-red">
              {errors.adSoyad}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="telefon" className="text-sm font-semibold text-brand-dark">
            Telefon <span className="text-brand-red">*</span>
          </label>
          <input
            id="telefon"
            name="telefon"
            type="tel"
            required
            autoComplete="tel"
            value={form.telefon}
            onChange={handleChange}
            placeholder="05XX XXX XX XX"
            aria-invalid={Boolean(errors.telefon)}
            aria-describedby={errors.telefon ? "telefon-error" : undefined}
            className={cn(
              "rounded-xl border border-gray-200 bg-brand-light px-4 py-3 text-sm text-brand-dark placeholder:text-gray-400 focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/20 transition",
              errors.telefon && inputErrorClass
            )}
          />
          {errors.telefon ? (
            <p id="telefon-error" className="text-xs font-medium text-brand-red">
              {errors.telefon}
            </p>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col gap-2 mb-5">
        <label htmlFor="ilce" className="text-sm font-semibold text-brand-dark">
          İlçe <span className="text-gray-400 font-normal">(isteğe bağlı)</span>
        </label>
        <input
          id="ilce"
          name="ilce"
          type="text"
          autoComplete="address-level2"
          value={form.ilce}
          onChange={handleChange}
          placeholder="Örn. Karşıyaka, Bornova"
          aria-invalid={Boolean(errors.ilce)}
          className={cn(
            "rounded-xl border border-gray-200 bg-brand-light px-4 py-3 text-sm text-brand-dark placeholder:text-gray-400 focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/20 transition",
            errors.ilce && inputErrorClass
          )}
        />
        {errors.ilce ? (
          <p className="text-xs font-medium text-brand-red">{errors.ilce}</p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2 mb-5">
        <label htmlFor="konu" className="text-sm font-semibold text-brand-dark">
          Konu <span className="text-brand-red">*</span>
        </label>
        <select
          id="konu"
          name="konu"
          required
          value={form.konu}
          onChange={handleChange}
          aria-invalid={Boolean(errors.konu)}
          className={cn(
            "rounded-xl border border-gray-200 bg-brand-light px-4 py-3 text-sm focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/20 transition",
            form.konu ? "text-brand-dark" : "text-gray-400",
            errors.konu && inputErrorClass
          )}
        >
          <option value="" disabled>
            Hizmet seçin…
          </option>
          {CONTACT_SERVICE_TOPICS.map((k) => (
            <option key={k} value={k}>
              {k}
            </option>
          ))}
        </select>
        {errors.konu ? (
          <p className="text-xs font-medium text-brand-red">{errors.konu}</p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2 mb-8">
        <label htmlFor="mesaj" className="text-sm font-semibold text-brand-dark">
          Mesaj
        </label>
        <textarea
          id="mesaj"
          name="mesaj"
          rows={4}
          value={form.mesaj}
          onChange={handleChange}
          placeholder="Cihazınız, arıza belirtisi veya sormak istediklerinizi kısaca yazabilirsiniz."
          aria-invalid={Boolean(errors.mesaj)}
          className={cn(
            "resize-none rounded-xl border border-gray-200 bg-brand-light px-4 py-3 text-sm text-brand-dark placeholder:text-gray-400 focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/20 transition",
            errors.mesaj && inputErrorClass
          )}
        />
        {errors.mesaj ? (
          <p className="text-xs font-medium text-brand-red">{errors.mesaj}</p>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-3 rounded-xl bg-brand-red hover:bg-[#9f1414] py-4 text-sm font-bold text-white transition active:scale-95 disabled:opacity-60 shadow-md shadow-brand-red/20"
      >
        {loading ? (
          <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
        ) : (
          <Send className="h-4 w-4" />
        )}
        {loading ? "Gönderiliyor…" : "Talebi Gönder"}
      </button>

      <p className="mt-4 text-center text-xs text-gray-400">
        Verileriniz yalnızca servis talebi amacıyla işlenir. İsterseniz gönderim sonrası WhatsApp ile de
        yazabilirsiniz.{" "}
        <Link href="/gizlilik-politikasi" className="underline hover:text-brand-red">
          Gizlilik Politikası
        </Link>
      </p>
    </form>
  );
}
