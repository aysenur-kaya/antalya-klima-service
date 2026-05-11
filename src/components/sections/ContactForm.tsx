"use client";

import { useState } from "react";
import Link from "next/link";
import { MessageCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const konular = [
  "Klima Bakım",
  "Klima Tamir / Arıza",
  "Klima Montaj",
  "Klima Gaz Dolumu",
  "Beyaz Eşya Servisi",
  "Buzdolabı Servisi",
  "Çamaşır Makinesi Servisi",
  "Diğer",
];

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    adSoyad: "",
    telefon: "",
    konu: "",
    mesaj: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Formdaki bilgileri WhatsApp mesajına dönüştür ve yönlendir.
    // Backend email/CRM entegrasyonu yapılana kadar bu yöntem lead kaybını önler.
    const lines = [
      `*Servis Talebi — Antalya Servisi*`,
      `Ad Soyad: ${form.adSoyad}`,
      `Telefon: ${form.telefon}`,
      form.konu ? `Konu: ${form.konu}` : null,
      form.mesaj ? `Mesaj: ${form.mesaj}` : null,
    ].filter(Boolean) as string[];

    const waUrl = buildWhatsAppUrl(lines.join("\n"));

    // Kısa gecikme ile UX akışını koruyalım, sonra WhatsApp aç
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      window.open(waUrl, "_blank", "noopener,noreferrer");
    }, 600);
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center gap-6 rounded-3xl border border-gray-200 bg-white p-12 text-center shadow-sm">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-50">
          <CheckCircle2 className="h-10 w-10 text-green-500" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-brand-dark mb-2">WhatsApp açıldı!</h3>
          <p className="text-gray-600 leading-relaxed">
            Bilgileriniz WhatsApp mesajına aktarıldı. Göndermek için WhatsApp&apos;ta &ldquo;Gönder&rdquo;e basın.
          </p>
        </div>
        <button
          onClick={() => { setSent(false); setForm({ adSoyad: "", telefon: "", konu: "", mesaj: "" }); }}
          className="text-sm font-semibold text-brand-red hover:underline"
        >
          Yeni talep oluştur
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm"
      noValidate
    >
      <h2 className="text-2xl font-bold text-brand-dark mb-2">Servis Talebi Oluştur</h2>
      <p className="text-gray-500 text-sm mb-8">
        Formunuzu doldurun, ekibimiz sizi arasın.
      </p>

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
            className="rounded-xl border border-gray-200 bg-brand-light px-4 py-3 text-sm text-brand-dark placeholder:text-gray-400 focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/20 transition"
          />
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
            className="rounded-xl border border-gray-200 bg-brand-light px-4 py-3 text-sm text-brand-dark placeholder:text-gray-400 focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/20 transition"
          />
        </div>
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
          className={cn(
            "rounded-xl border border-gray-200 bg-brand-light px-4 py-3 text-sm focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/20 transition",
            form.konu ? "text-brand-dark" : "text-gray-400"
          )}
        >
          <option value="" disabled>Hizmet seçin…</option>
          {konular.map((k) => (
            <option key={k} value={k}>{k}</option>
          ))}
        </select>
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
          className="resize-none rounded-xl border border-gray-200 bg-brand-light px-4 py-3 text-sm text-brand-dark placeholder:text-gray-400 focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/20 transition"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-3 rounded-xl bg-brand-red hover:bg-[#9f1414] py-4 text-sm font-bold text-white transition active:scale-95 disabled:opacity-60 shadow-md shadow-brand-red/20"
      >
        {loading ? (
          <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
        ) : (
          <MessageCircle className="h-4 w-4" />
        )}
        {loading ? "Hazırlanıyor…" : "WhatsApp ile Gönder"}
      </button>

      <p className="mt-4 text-center text-xs text-gray-400">
        Verileriniz yalnızca servis talebi amacıyla işlenir.{" "}
        <Link href="/gizlilik-politikasi" className="underline hover:text-brand-red">
          Gizlilik Politikası
        </Link>
      </p>
    </form>
  );
}
