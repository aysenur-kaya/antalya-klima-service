import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Wrench, Home, ArrowRight } from "lucide-react";
import HeroSection from "@/components/sections/HeroSection";
import ContactCTA from "@/components/sections/ContactCTA";
import { ilceler } from "@/lib/data";
import { klimaServicePages } from "@/lib/services";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Antalya Klima Servisi Bölgeleri | İlçe ve Mahalle Rehberi",
  description: "Antalya'nın tüm ilçeleri ve mahalleleri için klima servisi, bakım, tamir, montaj ve gaz dolumu sayfalarına ulaşın.",
  alternates: { canonical: `${SITE_URL}/antalya` },
};

export default function AntalyaPage() {
  const mahalleCount = ilceler.reduce((total, ilce) => total + ilce.mahalleler.length, 0);

  return (
    <>
      <HeroSection
        title="Antalya Hizmet Bölgesi Rehberi"
        subtitle="İlçe, mahalle, hizmet türü ve marka ilişkilerini tek merkezde toplayan şehir sayfası."
      />

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
                <h2 className="text-xl font-bold mb-3">Kullanıcı akışı</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-5">
                  Şehir sayfasından önce ilçe seçilir, sonra mahalle veya hizmet türüyle daha hedefli landing sayfasına geçilir.
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
                  İlçeye geçiş sayfaları; mahalle listesi, fiyat bağlantısı ve ana hizmet landing sayfalarını birbirine bağlar.
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

      <ContactCTA />
    </>
  );
}
