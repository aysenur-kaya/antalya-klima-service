import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import BrandGrid from "@/components/sections/BrandGrid";
import ContactCTA from "@/components/sections/ContactCTA";
import HeroSection from "@/components/sections/HeroSection";
import JsonLd from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/metadata";
import { buildBreadcrumbSchema } from "@/lib/schema";
import LocalTrustStrip from "@/components/sections/LocalTrustStrip";
import ServiceProcessSection from "@/components/sections/ServiceProcessSection";
import ContextTestimonials from "@/components/sections/ContextTestimonials";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import { allBrands, beyazEsyaMarkalari, getBrandBySlug, ilceler, klimaMarkalari } from "@/lib/data";
import { SITE_URL } from "@/lib/constants";
import { getTestimonialsForContext } from "@/lib/testimonials";
import { buildLandingWhatsappMessage } from "@/lib/whatsapp";
import {
  brandServisBodyLead,
  brandServisHeroSubtitle,
  brandServisMetaDescription,
  brandServisMetaTitle,
} from "@/lib/brand-page-copy";

interface PageProps {
  params: Promise<{ slug: string }>;
}

function parseBrandServiceSlug(slug: string) {
  const suffixes = [
    { suffix: "-klima-servisi", type: "klima" as const, serviceName: "Klima Servisi" },
    { suffix: "-beyaz-esya-servisi", type: "beyaz-esya" as const, serviceName: "Beyaz Eşya Servisi" },
  ];

  const match = suffixes.find((item) => slug.endsWith(item.suffix));
  if (!match) return null;

  const brandSlug = slug.slice(0, -match.suffix.length);
  const brand = getBrandBySlug(brandSlug, match.type);
  if (!brand) return null;

  return { brand, ...match };
}

export async function generateStaticParams() {
  return allBrands.map((brand) => ({
    slug: `${brand.slug}-${brand.type}-servisi`,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const parsed = parseBrandServiceSlug(slug);

  if (!parsed) {
    return { title: "Marka Bulunamadı" };
  }

  const title = brandServisMetaTitle(
    parsed.brand.name,
    parsed.serviceName,
    parsed.brand.slug,
    parsed.type
  );
  const description = brandServisMetaDescription(
    parsed.brand.name,
    parsed.serviceName,
    parsed.brand.slug,
    parsed.type
  );

  return buildMetadata({
    title,
    description,
    path: `/servis/${slug}`,
    type: "article",
  });
}

export default async function ServisMarkaDetayPage({ params }: PageProps) {
  const { slug } = await params;
  const parsed = parseBrandServiceSlug(slug);

  if (!parsed) {
    notFound();
  }

  const { brand, serviceName, type } = parsed;
  const relatedBrands = type === "klima" ? klimaMarkalari : beyazEsyaMarkalari;
  const highlightedDistricts = ilceler.slice(0, 12);
  const landingHref = `/antalya/${brand.slug}-${type}-servisi`;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Antalya ${brand.name} ${serviceName}`,
    description: `${brand.name} marka cihazlar için Antalya genelinde marka bağımsız özel servis hizmeti.`,
    areaServed: "Antalya",
    provider: {
      "@type": "LocalBusiness",
      name: "Antalya Servisi",
      url: SITE_URL,
    },
  };

  const stories = getTestimonialsForContext({
    serviceName: serviceName,
    serviceType: type,
    hasBrand: true,
    seed: `servis-brand-${brand.slug}-${type}`,
    count: 2,
  });

  const brandWaMsg = buildLandingWhatsappMessage({
    locationText: "Antalya",
    serviceName,
    brandName: brand.name,
  });

  const brandWaHeroSub = brandServisHeroSubtitle(brand.name, brand.slug, type);
  const brandBodyLead = brandServisBodyLead(brand.name, brand.slug, type);

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Ana Sayfa", path: "/" },
    { name: "Marka servisleri", path: "/servis" },
    { name: `${brand.name} ${serviceName}`, path: `/servis/${slug}` },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={serviceSchema} />
      <HeroSection
        title={`Antalya ${brand.name} ${serviceName}`}
        subtitle={brandWaHeroSub}
        primaryCtaText="Hemen Ara"
        secondaryCtaText="WhatsApp'tan Yaz"
        whatsappPrefill={brandWaMsg}
        responseHint="Çağrı ve mesajlara genellikle kısa sürede dönüş hedeflenir; yoğunluğa göre süre değişebilir."
      />

      {/* Yasal uyarı — marka bağımsız özel servis bildirimi */}
      <div
        role="note"
        aria-label="Özel servis açıklaması"
        className="bg-amber-50 border-y border-amber-200 py-3.5 px-4"
      >
        <div className="container mx-auto px-4 md:px-6">
          <p className="text-sm text-amber-950 text-center leading-snug max-w-3xl mx-auto">
            <strong className="font-semibold">Özel servis:</strong> Bu sayfa marka bağımsız özel teknik servis hizmeti içindir.{" "}
            <span className="font-medium">Yetkili servis değildir.</span> Garanti kapsamındaki cihazlar için markanın resmi yetkili servisini tercih edin.
          </p>
        </div>
      </div>

      <LocalTrustStrip />

      <WhyChooseUs />

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <article className="lg:col-span-2">
              <div className="rounded-3xl border border-gray-200 bg-brand-light p-5 md:p-8 mb-8">
                <h2 className="text-3xl font-bold text-brand-dark mb-4">
                  {brand.name} cihazlarınız için özel servis akışı
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">{brandBodyLead}</p>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {brand.name} cihazlarda özel servis yaklaşımımız; doğru arıza tespiti, kullanıcıya açık işlem kalemleri ve onay sonrası onarım adımlarına dayanır. Antalya genelinde cihaz modeli, arıza belirtisi ve konum bilgisine göre en uygun ekip yönlendirilir.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    "Bakım, tamir ve arıza tespiti",
                    "İlçe bazlı hızlı ekip yönlendirmesi",
                    "Marka bağımsız özel servis bilgilendirmesi",
                    "İşlem öncesi net fiyat ve onay süreci",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-2xl bg-white p-4">
                      <CheckCircle2 className="w-5 h-5 text-brand-red shrink-0 mt-0.5" />
                      <span className="text-sm font-medium text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-gray-200 p-5 md:p-8">
                <h3 className="text-2xl font-bold text-brand-dark mb-4">
                  {brand.name} servisini ilçenizde arıyorsanız
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  İlçenizi seçerek {brand.name} servisi için yönlendirme alabilir; marka ve cihaz türünü netleştirebilirsiniz. Aşağıdaki ilçeler sık erişilen bölgelerdir; tüm liste Antalya bölge rehberindedir.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {highlightedDistricts.map((ilce) => (
                    <Link
                      key={ilce.slug}
                      href={`/${ilce.slug}-${brand.slug}-${type}-servisi`}
                      className="rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 hover:border-brand-red/30 hover:text-brand-red transition-colors"
                    >
                      {ilce.name}
                    </Link>
                  ))}
                </div>
              </div>
            </article>

            <aside className="space-y-6">
              <div className="rounded-3xl bg-brand-dark text-white p-6 md:p-8">
                <h3 className="text-xl font-bold mb-3">Antalya geneli marka sayfası</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  Şehir geneli sayfaya geçerek ilçe veya mahalle bazlı servis yönlendirmesine devam edebilirsiniz.
                </p>
                <Link href={landingHref} className="inline-flex items-center gap-2 rounded-xl bg-brand-red px-5 py-3 text-sm font-bold">
                  Antalya {brand.name} servisi <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="rounded-3xl border border-gray-200 p-6 md:p-8">
                <h3 className="text-xl font-bold text-brand-dark mb-4">İlgili sayfalar</h3>
                <div className="flex flex-col gap-3">
                  <Link href="/servis" className="text-sm font-semibold text-gray-700 hover:text-brand-red">Tüm markalar</Link>
                  <Link href="/hizmetler" className="text-sm font-semibold text-gray-700 hover:text-brand-red">Tüm hizmetler</Link>
                  <Link href="/antalya" className="text-sm font-semibold text-gray-700 hover:text-brand-red">Antalya ilçeleri</Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <BrandGrid brands={relatedBrands.filter((item) => item.slug !== brand.slug).slice(0, 18)} basePath="/servis" title="Diğer Marka Servis Sayfaları" />
      <ServiceProcessSection />
      <ContextTestimonials items={stories} />
      <ContactCTA
        whatsappPrefill={brandWaMsg}
        headline="Markaya özel yönlendirme ile devam edin."
        description="Model ve arıza notunu paylaşın; uygun rota için kısa sürede geri dönüş hedeflenir."
        primaryButtonLabel="Servis Talebi Oluştur"
        secondaryButtonLabel="WhatsApp'tan Yaz"
      />
    </>
  );
}
