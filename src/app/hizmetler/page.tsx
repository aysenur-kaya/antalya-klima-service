import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Layers, BadgeCheck, MapPin } from "lucide-react";
import HeroSection from "@/components/sections/HeroSection";
import ContactCTA from "@/components/sections/ContactCTA";
import LocalTrustStrip from "@/components/sections/LocalTrustStrip";
import ServiceProcessSection from "@/components/sections/ServiceProcessSection";
import ContextTestimonials from "@/components/sections/ContextTestimonials";
import { allServicePages, beyazEsyaServicePages, klimaServicePages } from "@/lib/services";
import { getTestimonialsForContext } from "@/lib/testimonials";

export const metadata: Metadata = {
  title: "Hizmetlerimiz | Antalya Klima ve Beyaz Eşya Servisi",
  description: "Antalya genelinde klima servisi, bakım, tamir, montaj, gaz dolumu ve beyaz eşya servis kategorilerimizi inceleyin.",
  alternates: { canonical: "/hizmetler" },
};

const groups = [
  { title: "Klima Hizmetleri", services: klimaServicePages },
  { title: "Beyaz Eşya Hizmetleri", services: beyazEsyaServicePages },
];

const featureCards = [
  {
    icon: Layers,
    label: "HİZMETLER",
    title: `${allServicePages.length} Profesyonel Hizmet Kategorisi`,
    description:
      "Klima bakım, tamir, montaj, gaz dolumu ve teknik servis çözümlerine hızlı erişin.",
    href: "#hizmet-listesi",
    cta: "Kategorilere bak",
  },
  {
    icon: BadgeCheck,
    label: "MARKA SERVİSLERİ",
    title: "Marka Bazlı Servis Sayfaları",
    description:
      "Daikin, Mitsubishi, Arçelik, Bosch ve diğer markalar için marka özel servis bilgilerine ulaşın.",
    href: "/servis",
    cta: "Tüm markaları gör",
  },
  {
    icon: MapPin,
    label: "BÖLGE AĞI",
    title: "İlçe ve mahalle rehberi",
    description:
      "Antalya'daki ilçe ve mahalle sayfalarından hizmet ve fiyat bilgilerine geçiş yapabilirsiniz.",
    href: "/bolgeler",
    cta: "Bölgeleri incele",
  },
];

export default function HizmetlerPage() {
  const hizmetlerStories = getTestimonialsForContext({
    serviceName: "Beyaz Eşya Servisi",
    serviceType: "beyaz-esya",
    hasBrand: false,
    seed: "hizmetler-index",
    count: 2,
  });

  return (
    <>
      <HeroSection
        title="Antalya Teknik Servis Hizmetleri"
        subtitle="Bakım, tamir, montaj ve arıza tespiti için tüm hizmet kategorilerini tek yerde, kolay gezilebilir şekilde sunduk."
        primaryCtaText="Servis kaydı için hemen arayın"
        secondaryCtaText="WhatsApp üzerinden hızlı destek alın"
      />

      <LocalTrustStrip />

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-14">
            <div className="lg:col-span-1">
              <p className="text-sm font-bold uppercase tracking-widest text-brand-red mb-3">Hizmet mimarisi</p>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
                Servis türünü seçin, sonra bölge veya markaya ilerleyin.
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Bu sayfa ana kategori merkezidir. Her hizmet detayından Antalya geneli şehir sayfalarına, marka sayfalarına ve ilçe sayfalarına geçiş yapılabilir.
              </p>
            </div>

            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-5">
              {featureCards.map((card) => {
                const Icon = card.icon;
                return (
                  <Link
                    key={card.label}
                    href={card.href}
                    className="group relative flex flex-col rounded-3xl border border-gray-200 bg-white p-6 shadow-sm hover:border-brand-red/30 hover:shadow-xl transition-all duration-300 overflow-hidden"
                  >
                    {/* Corner accent */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-brand-red/5 rounded-bl-full pointer-events-none group-hover:bg-brand-red/10 transition-colors duration-300" />

                    {/* Icon */}
                    <div className="relative w-11 h-11 rounded-2xl bg-red-50 flex items-center justify-center mb-5 group-hover:bg-brand-red transition-all duration-300 shrink-0">
                      <Icon className="w-5 h-5 text-brand-red group-hover:text-white transition-colors duration-300" />
                    </div>

                    {/* Label */}
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand-red mb-2">
                      {card.label}
                    </p>

                    {/* Title */}
                    <h3 className="text-base font-bold text-brand-dark mb-3 group-hover:text-brand-red transition-colors leading-snug">
                      {card.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-gray-500 leading-relaxed flex-1">
                      {card.description}
                    </p>

                    {/* Bottom CTA */}
                    <div className="mt-5 flex items-center gap-1.5 text-xs font-bold text-brand-red">
                      {card.cta}
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          <div id="hizmet-listesi" className="space-y-12">
            {groups.map((group) => (
              <div key={group.title}>
                <h3 className="text-2xl font-bold text-brand-dark mb-6">{group.title}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {group.services.map((service, index) => (
                    <Link
                      key={service.slug}
                      href={`/hizmetler/${service.slug}`}
                      className="group rounded-3xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-xl hover:border-brand-red/30 transition-all"
                    >
                      <div className="text-sm font-bold text-brand-red mb-4">0{index + 1}</div>
                      <h4 className="text-xl font-bold text-brand-dark mb-3 group-hover:text-brand-red transition-colors">
                        {service.title}
                      </h4>
                      <p className="text-sm text-gray-600 leading-relaxed mb-6">{service.summary}</p>
                      <span className="inline-flex items-center gap-2 text-sm font-bold text-brand-red">
                        Detayları incele <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ServiceProcessSection />

      <ContextTestimonials items={hizmetlerStories} />

      <ContactCTA />
    </>
  );
}
