import Link from "next/link";
import { MapPin, Wrench, Home, ArrowRight } from "lucide-react";
import HeroSection from "@/components/sections/HeroSection";
import ContactCTA from "@/components/sections/ContactCTA";
import LocalTrustStrip from "@/components/sections/LocalTrustStrip";
import ServiceProcessSection from "@/components/sections/ServiceProcessSection";
import ContextTestimonials from "@/components/sections/ContextTestimonials";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import { ilceler } from "@/lib/data";
import { klimaServicePages } from "@/lib/services";
import { buildMetadata } from "@/lib/metadata";
import { getTestimonialsForContext } from "@/lib/testimonials";
import { WHATSAPP_PREFILL_GENERAL } from "@/lib/whatsapp";

export const metadata = buildMetadata({
  title: "Antalya Klima Servisi Bölgeleri | İlçe ve Mahalle Rehberi",
  description:
    "Antalya'nın tüm ilçeleri ve mahalleleri için klima servisi, bakım, tamir, montaj ve gaz dolumu sayfalarına ulaşın.",
  path: "/antalya",
});

export default function AntalyaPage() {
  const mahalleCount = ilceler.reduce((total, ilce) => total + ilce.mahalleler.length, 0);
  const antalyaStories = getTestimonialsForContext({
    serviceName: "Klima Servisi",
    serviceType: "klima",
    hasBrand: false,
    seed: "antalya-rehber",
    count: 2,
  });

  return (
    <>
      <HeroSection
        title="Antalya hizmet bölgesi rehberi"
        subtitle="İlçenizi veya mahallenizi seçerek size en yakın teknik ekibi yönlendirelim."
        primaryCtaText="Hemen Ara"
        secondaryCtaText="WhatsApp'tan Yaz"
        whatsappPrefill={WHATSAPP_PREFILL_GENERAL}
      />

      <LocalTrustStrip />

      <WhyChooseUs />

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14">
            {[
              { label: "İlçe", value: ilceler.length, icon: MapPin },
              { label: "Mahalle", value: mahalleCount, icon: Home },
              { label: "Klima hizmeti", value: klimaServicePages.length, icon: Wrench },
            ].map((stat) => {
              const Icon = stat.icon;

              return (
                <div key={stat.label} className="rounded-2xl border border-gray-200 bg-brand-light p-5 md:p-7">
                  <Icon className="w-7 h-7 text-brand-red mb-4" />
                  <p className="text-3xl md:text-4xl font-bold text-brand-dark mb-1">{stat.value}</p>
                  <p className="text-gray-600 font-medium text-sm md:text-base">{stat.label}</p>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-10">
            <aside className="lg:col-span-1 order-2 lg:order-1">
              <div className="sticky top-28 rounded-2xl bg-brand-dark text-white p-5 md:p-7">
                <h2 className="text-xl font-bold mb-3">Nasıl ilerlersiniz?</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-5">
                  Önce ilçenizi seçin; ardından mahalle veya hizmet türüyle servis talebinizi netleştirin.
                </p>
                <div className="flex flex-col gap-3">
                  <Link href="/hizmetler" className="text-sm font-semibold text-white/90 hover:text-brand-red transition-colors">Hizmetleri gör</Link>
                  <Link href="/servis" className="text-sm font-semibold text-white/90 hover:text-brand-red transition-colors">Markaları gör</Link>
                  <Link href="/bolgeler" className="text-sm font-semibold text-white/90 hover:text-brand-red transition-colors">Bölge dizini</Link>
                </div>
              </div>
            </aside>

            <div className="lg:col-span-3 order-1 lg:order-2">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-brand-dark mb-4">Antalya ilçeleri</h2>
                <p className="text-gray-600">
                  İlçe sayfaları; mahalle listesi, fiyat bilgisi ve ana hizmet sayfalarına giden bağlantıları bir arada sunar.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {ilceler.map((ilce) => (
                  <Link
                    key={ilce.slug}
                    href={`/bolgeler/${ilce.slug}`}
                    className="group rounded-2xl border border-gray-200 bg-white p-4 md:p-6 shadow-sm hover:border-brand-red/30 hover:shadow-xl transition-all"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-base md:text-xl font-bold text-brand-dark group-hover:text-brand-red transition-colors mb-1.5">
                          {ilce.name}
                        </h3>
                        <p className="text-sm text-gray-500">{ilce.mahalleler.length} mahalle</p>
                      </div>
                      <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-brand-red transition-transform group-hover:translate-x-1 shrink-0 mt-0.5" />
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-brand-red">Klima servisi</span>
                      <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-bold text-gray-600">Fiyatlar</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <ServiceProcessSection />

      <ContextTestimonials items={antalyaStories} />

      <ContactCTA
        whatsappPrefill={WHATSAPP_PREFILL_GENERAL}
        headline="İlçenizi seçtikten sonra servis talebine geçin."
        primaryButtonLabel="Hemen Ara"
        secondaryButtonLabel="WhatsApp'tan Yaz"
      />
    </>
  );
}
