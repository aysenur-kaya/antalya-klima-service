import type { Metadata } from "next";
import Link from "next/link";
import {
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  CheckCircle2,
  Zap,
  ShieldCheck,
  Wrench,
  Star,
  Users,
  AlertCircle,
} from "lucide-react";
import { CONTACT_INFO } from "@/lib/constants";
import { buildWhatsAppUrl, WHATSAPP_PREFILL_GENERAL } from "@/lib/whatsapp";
import ContactForm from "@/components/sections/ContactForm";
import JsonLd from "@/components/seo/JsonLd";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Antalya Klima Servisi İletişim | Antalya Servisi",
  description:
    "Antalya klima servisi için telefon, WhatsApp ve iletişim formu üzerinden hızlıca bize ulaşın. 7/24 teknik destek.",
  alternates: { canonical: "/iletisim" },
  openGraph: {
    title: "Antalya Klima Servisi İletişim | Antalya Servisi",
    description:
      "Antalya klima servisi için telefon, WhatsApp ve iletişim formu üzerinden hızlıca bize ulaşın.",
    url: `${SITE_URL}/iletisim`,
    type: "website",
  },
};

const ILETISIM_WHATSAPP_HREF = buildWhatsAppUrl(WHATSAPP_PREFILL_GENERAL);

const contactCards = [
  {
    icon: Phone,
    label: "Telefon",
    value: CONTACT_INFO.phoneFormatted,
    sub: "7/24 teknik destek hattı",
    href: `tel:${CONTACT_INFO.phone}`,
    cta: "Hemen Ara",
    color: "text-brand-red",
    bg: "bg-brand-red/10",
    ctaClass:
      "bg-brand-red hover:bg-red-700 text-white shadow-lg shadow-red-200",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Mesaj Gönder",
    sub: "Anlık yanıt için WhatsApp",
    href: ILETISIM_WHATSAPP_HREF,
    cta: "WhatsApp'tan Yaz",
    color: "text-[#25D366]",
    bg: "bg-[#25D366]/10",
    ctaClass:
      "bg-[#25D366] hover:bg-[#20b858] text-white shadow-lg shadow-green-200",
  },
  {
    icon: MapPin,
    label: "Hizmet Bölgesi",
    value: "Antalya Geneli",
    sub: "Tüm ilçe ve mahalleler",
    href: "/bolgeler",
    cta: "Bölgeleri Gör",
    color: "text-brand-red",
    bg: "bg-brand-red/10",
    ctaClass:
      "bg-white border border-gray-200 hover:border-brand-red/40 text-brand-dark hover:text-brand-red",
  },
  {
    icon: Clock,
    label: "Çalışma Saatleri",
    value: CONTACT_INFO.workingHours,
    sub: "Pazar: Nöbetçi Ekip",
    href: null,
    cta: null,
    color: "text-brand-red",
    bg: "bg-brand-red/10",
    ctaClass: "",
  },
];

const benefits = [
  { icon: Zap, text: "Aynı gün servis" },
  { icon: Star, text: "Şeffaf fiyatlandırma" },
  { icon: ShieldCheck, text: "Garantili işçilik" },
  { icon: Wrench, text: "Uzman teknik ekip" },
  { icon: Users, text: "Tüm klima markaları" },
  { icon: MapPin, text: "Antalya geneli hizmet" },
];

export default function IletisimPage() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: CONTACT_INFO.name,
    telephone: CONTACT_INFO.phone,
    url: SITE_URL,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Antalya",
      addressRegion: "Antalya",
      addressCountry: "TR",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "08:30",
      closes: "19:30",
    },
  };

  return (
    <>
      <JsonLd data={localBusinessSchema} />

      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className="relative premium-gradient text-white pt-[128px] pb-20 lg:pt-[164px] lg:pb-28 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-brand-red/20 blur-[150px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-brand-red font-medium text-sm mb-6 border border-brand-red/20">
              <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
              7/24 Teknik Destek
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
              Antalya Klima Servisi
              <span className="block text-brand-red">İletişim</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed opacity-90">
              Klima bakım, tamir, montaj ve arıza talepleriniz için hızlıca bize
              ulaşın. Antalya genelinde aynı gün servis.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`tel:${CONTACT_INFO.phone}`}
                className="w-full sm:w-auto bg-brand-red hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all hover:scale-105 shadow-[0_10px_20px_rgba(200,30,30,0.3)] text-lg"
              >
                <Phone className="w-6 h-6" />
                Hemen Ara
              </a>
              <a
                href={ILETISIM_WHATSAPP_HREF}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20b858] text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all hover:scale-105 shadow-[0_10px_20px_rgba(37,211,102,0.3)] text-lg"
              >
                <MessageCircle className="w-6 h-6" />
                {"WhatsApp'tan Yaz"}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact cards ───────────────────────────────────────── */}
      <section className="py-16 bg-brand-light border-b border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {contactCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.label}
                  className="rounded-3xl bg-white border border-gray-200 p-7 shadow-sm hover:shadow-md transition-shadow flex flex-col"
                >
                  <div
                    className={`w-14 h-14 rounded-2xl ${card.bg} flex items-center justify-center mb-5`}
                  >
                    <Icon className={`w-7 h-7 ${card.color}`} />
                  </div>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">
                    {card.label}
                  </p>
                  <p className="text-lg font-bold text-brand-dark mb-1">
                    {card.value}
                  </p>
                  <p className="text-sm text-gray-500 mb-5 flex-1">{card.sub}</p>
                  {card.href && card.cta && (
                    <a
                      href={card.href}
                      {...(card.href.startsWith("http")
                        ? { target: "_blank", rel: "noreferrer" }
                        : {})}
                      className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all active:scale-95 ${card.ctaClass}`}
                    >
                      {card.cta}
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Form + Sidebar ──────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Form — 2/3 width */}
            <div className="lg:col-span-2">
              <ContactForm />
            </div>

            {/* Sidebar — 1/3 width */}
            <aside className="flex flex-col gap-6">
              {/* Benefit card */}
              <div className="rounded-3xl border border-gray-200 bg-brand-light p-5 md:p-8">
                <h2 className="text-xl font-bold text-brand-dark mb-6">
                  Neden Antalya Servisi?
                </h2>
                <ul className="flex flex-col gap-4">
                  {benefits.map(({ icon: BIcon, text }) => (
                    <li key={text} className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-white border border-gray-200 flex items-center justify-center shrink-0 shadow-sm">
                        <BIcon className="w-4 h-4 text-brand-red" />
                      </div>
                      <span className="text-sm font-semibold text-gray-700">
                        {text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Emergency CTA card */}
              <div className="rounded-3xl bg-brand-dark text-white p-5 md:p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-red/20 blur-[60px] rounded-full pointer-events-none" />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-brand-red/20 flex items-center justify-center mb-5">
                    <AlertCircle className="w-6 h-6 text-brand-red" />
                  </div>
                  <p className="text-xs font-bold uppercase tracking-widest text-brand-red mb-2">
                    7/24 Acil Hat
                  </p>
                  <h3 className="text-xl font-bold mb-3">Acil Arıza Hattı</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    Klima arızaları için hızlı destek alın. Ekibimiz en kısa
                    sürede adresinizde.
                  </p>
                  <a
                    href={`tel:${CONTACT_INFO.phone}`}
                    className="w-full flex items-center justify-center gap-3 rounded-xl bg-brand-red hover:bg-red-700 px-5 py-3.5 text-sm font-bold transition-all active:scale-95 shadow-lg shadow-red-900/30"
                  >
                    <Phone className="w-4 h-4" />
                    Acil Ara
                  </a>
                </div>
              </div>

              {/* Internal nav card */}
              <div className="rounded-3xl border border-gray-200 bg-white p-5 md:p-8">
                <h3 className="text-lg font-bold text-brand-dark mb-4">
                  Hızlı bağlantılar
                </h3>
                <div className="flex flex-col gap-3">
                  {[
                    { href: "/hizmetler", label: "Tüm hizmetlerimiz" },
                    { href: "/bolgeler", label: "Hizmet bölgeleri" },
                    { href: "/servis", label: "Marka servis sayfaları" },
                  ].map(({ href, label }) => (
                    <Link
                      key={href}
                      href={href}
                      className="flex items-center justify-between rounded-xl bg-brand-light border border-gray-100 px-4 py-3 text-sm font-semibold text-gray-700 hover:text-brand-red hover:border-brand-red/30 transition-all group"
                    >
                      {label}
                      <span className="text-brand-red transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ── Hizmet bölgesi info strip ───────────────────────────── */}
      <section className="py-16 bg-brand-light border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-red mb-3">
            Hizmet bölgesi
          </p>
          <h2 className="text-3xl font-bold text-brand-dark mb-4">
            {"Antalya'nın her noktasındayız"}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
            Muratpaşa, Konyaaltı, Kepez başta olmak üzere Antalya&apos;nın tüm ilçe
            ve mahallelerine aynı gün servis ulaştırıyoruz. Mobil ekiplerimiz
            sahada, en yakın teknisyen adresinize yönlendirilir.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/bolgeler"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-red px-6 py-3 text-sm font-bold text-white hover:bg-red-700 transition-all"
            >
              <MapPin className="w-4 h-4" />
              Hizmet bölgelerini gör
            </Link>
            <Link
              href="/hizmetler"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-bold text-brand-dark hover:border-brand-red/40 hover:text-brand-red transition-all"
            >
              <CheckCircle2 className="w-4 h-4" />
              Tüm hizmetleri incele
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
