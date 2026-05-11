import { Metadata } from "next";
import { notFound } from "next/navigation";
import HeroSection from "@/components/sections/HeroSection";
import ServiceCards from "@/components/sections/ServiceCards";
import LocationGrid from "@/components/sections/LocationGrid";
import BrandGrid from "@/components/sections/BrandGrid";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import FAQSection from "@/components/sections/FAQSection";
import ContactCTA from "@/components/sections/ContactCTA";
import { 
  ilceler, 
  klimaMarkalari, 
  beyazEsyaMarkalari, 
  getIlceBySlug, 
  getMahalleBySlug, 
  getBrandBySlug,
  Brand,
  Ilce,
  Mahalle
} from "@/lib/data";
import { CONTACT_INFO } from "@/lib/constants";
import { buildLandingWhatsappMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import { buildMetadata } from "@/lib/metadata";
import { computeCatchAllIndexing } from "@/lib/programmatic-seo";
import { buildFaqsForCatchAll } from "@/lib/faqs";
import {
  buildBreadcrumbSchema,
  buildServiceSchema,
} from "@/lib/schema";
import JsonLd from "@/components/seo/JsonLd";
import { CheckCircle2, ShieldCheck, Zap, Clock, MapPin, MessageCircle } from "lucide-react";
import {
  CATCH_ALL_SERVICE_MAP,
  getServiceSuffixFromSlugSegments,
} from "@/lib/catch-all-service";
import {
  getCatchAllHeroSubtitle,
  getCatchAllIntroParagraphs,
  getFrequentDeviceLines,
  getResponseTimeSnippet,
  getNeighborIlceler,
  getNearbyMahalleler,
} from "@/lib/local-content";
import { getTestimonialsForContext } from "@/lib/testimonials";
import ServiceProcessSection from "@/components/sections/ServiceProcessSection";
import NearbyAreasSection from "@/components/sections/NearbyAreasSection";
import LocalTrustStrip from "@/components/sections/LocalTrustStrip";
import ContextTestimonials from "@/components/sections/ContextTestimonials";

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

type ServiceEntry = (typeof CATCH_ALL_SERVICE_MAP)[number];

type ParsedSlug =
  | { isValid: false }
  | {
      isValid: true;
      ilce: Ilce | undefined;
      mahalle: Mahalle | undefined;
      marka: Brand | undefined;
      serviceType: "klima" | "beyaz-esya";
      serviceName: string;
    };

const SERVICE_MAP = CATCH_ALL_SERVICE_MAP;

function parseSlug(slugs: string[]): ParsedSlug {
  if (!slugs.length || slugs.length > 3) return { isValid: false };

  const lastPart = slugs[slugs.length - 1];

  let matchedService: ServiceEntry | undefined;
  let baseLastPart = "";

  // Try matching "prefix-suffix" pattern first
  matchedService = SERVICE_MAP.find((s) => lastPart.endsWith("-" + s.suffix));
  if (matchedService) {
    baseLastPart = lastPart.slice(0, lastPart.length - matchedService.suffix.length - 1);
  } else {
    // Try exact match (URL *is* the suffix, no location prefix)
    matchedService = SERVICE_MAP.find((s) => lastPart === s.suffix);
    baseLastPart = "";
  }

  if (!matchedService) return { isValid: false };

  const serviceType = matchedService.type;
  const serviceName = matchedService.name;

  let ilce: Ilce | undefined;
  let mahalle: Mahalle | undefined;
  let marka: Brand | undefined;

  if (slugs.length === 1) {
    if (baseLastPart === "" || baseLastPart === "antalya") {
      // Generic Antalya-level page — valid, no location constraint
    } else {
      // baseLastPart must resolve to a known ilce, marka, or ilce+marka compound
      ilce = getIlceBySlug(baseLastPart);
      if (!ilce) {
        // Try splitting "ilce-marka" compound prefix
        const parts = baseLastPart.split("-");
        let found = false;
        for (let i = 1; i < parts.length; i++) {
          const potentialIlce = parts.slice(0, i).join("-");
          const potentialMarka = parts.slice(i).join("-");
          const foundIlce = getIlceBySlug(potentialIlce);
          const foundMarka = getBrandBySlug(potentialMarka, serviceType);
          if (foundIlce && foundMarka) {
            ilce = foundIlce;
            marka = foundMarka;
            found = true;
            break;
          }
        }
        if (!found) {
          marka = getBrandBySlug(baseLastPart, serviceType);
          if (!marka) {
            // Prefix matches nothing in our data — hard 404
            return { isValid: false };
          }
        }
      }
    }
  } else if (slugs.length === 2) {
    // First segment must be "antalya" or a valid ilce
    if (slugs[0] !== "antalya") {
      ilce = getIlceBySlug(slugs[0]);
      if (!ilce) return { isValid: false };
    }

    if (baseLastPart !== "") {
      if (ilce) {
        // Prefix must be a mahalle of that ilce, or a valid marka
        mahalle = getMahalleBySlug(ilce.slug, baseLastPart);
        if (!mahalle) {
          marka = getBrandBySlug(baseLastPart, serviceType);
          if (!marka) return { isValid: false };
        }
      } else {
        // slugs[0] === "antalya": prefix must be a valid marka
        marka = getBrandBySlug(baseLastPart, serviceType);
        if (!marka) return { isValid: false };
      }
    }
  } else {
    // slugs.length === 3
    // First segment must be a valid ilce ("antalya" has no mahalleler in our data model)
    ilce = getIlceBySlug(slugs[0]);
    if (!ilce) return { isValid: false };

    // Second segment must be a valid mahalle under that ilce
    mahalle = getMahalleBySlug(ilce.slug, slugs[1]);
    if (!mahalle) return { isValid: false };

    // Optional marka prefix on the last segment
    if (baseLastPart !== "") {
      marka = getBrandBySlug(baseLastPart, serviceType);
      if (!marka) return { isValid: false };
    }
  }

  return { ilce, mahalle, marka, serviceType, serviceName, isValid: true };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const parsed = parseSlug(resolvedParams.slug);

  if (!parsed.isValid) {
    return { title: "Sayfa Bulunamadı" };
  }

  const { ilce, mahalle, marka, serviceName, serviceType } = parsed;
  const slugs = resolvedParams.slug;
  const slugPath = slugs.join("/");

  const locationText = mahalle
    ? `${ilce?.name ?? ""} ${mahalle.name}`.trim()
    : ilce
      ? ilce.name
      : "Antalya";

  const brandText = marka ? `${marka.name} ` : "";

  const title = `${locationText} ${brandText}${serviceName} | 7/24 Teknik Servis`;
  const description = `${locationText} bölgesinde ${brandText}${serviceName.toLowerCase()} ihtiyacınız için aynı gün garantili ve profesyonel teknik destek.${brandText ? ` ${brandText}marka bağımsız özel servis hizmeti.` : ""}`;

  const { noindex, pagePath, canonicalPath } = computeCatchAllIndexing(
    { ilce, mahalle, marka, serviceType },
    slugs,
    slugPath
  );

  return buildMetadata({
    title,
    description,
    path: pagePath,
    canonicalPath,
    type: "article",
    noindex,
  });
}

export default async function DynamicServicePage({ params }: PageProps) {
  const resolvedParams = await params;
  const parsed = parseSlug(resolvedParams.slug);

  if (!parsed.isValid) {
    notFound();
  }

  // TypeScript narrowed to the valid branch; all fields guaranteed defined
  const { ilce, mahalle, marka, serviceType, serviceName } = parsed;

  const locationText = mahalle
    ? `${ilce?.name ?? ""} ${mahalle.name}`.trim()
    : ilce
      ? ilce.name
      : "Antalya";

  const brandText = marka ? `${marka.name} ` : "";
  
  const heroTitle = `${locationText} ${brandText}${serviceName}`;
  const heroSubtitle = getCatchAllHeroSubtitle({
    ilce,
    mahalle,
    marka,
    serviceName,
    serviceType,
  });

  const introParagraphs = getCatchAllIntroParagraphs({
    ilce,
    mahalle,
    marka,
    serviceName,
    serviceType,
  });

  const deviceLines = getFrequentDeviceLines({ serviceName, serviceType });
  const serviceSuffix = getServiceSuffixFromSlugSegments(resolvedParams.slug);
  const responseSnippet = getResponseTimeSnippet(
    [locationText, mahalle?.slug ?? "", serviceSuffix, marka?.slug ?? ""].join("|")
  );

  const pageFaqs = buildFaqsForCatchAll({
    locationText,
    serviceName,
    serviceType,
    brandName: marka?.name,
    ilceSlug: ilce?.slug,
    serviceSuffix,
  });

  const slugPath = resolvedParams.slug.join("/");
  const catchAllSeoFlags = computeCatchAllIndexing(
    { ilce, mahalle, marka, serviceType },
    resolvedParams.slug,
    slugPath
  );
  const testimonialItems = getTestimonialsForContext({
    serviceName,
    serviceType,
    hasBrand: Boolean(marka),
    seed: slugPath,
    count: 2,
  });

  const spotlightSlugs = ["muratpasa", "konyaalti", "kepez", "alanya", "manavgat", "serik"];
  let nearbyLinks: { href: string; label: string; hint?: string }[] = [];
  if (mahalle && ilce) {
    nearbyLinks = getNearbyMahalleler(ilce, mahalle.slug, 6).map((m) => ({
      href: `/${ilce.slug}/${m.slug}-${serviceSuffix}`,
      label: `${m.name}, ${ilce.name}`,
      hint: "Aynı hizmet sayfası",
    }));
  } else if (ilce) {
    nearbyLinks = getNeighborIlceler(ilce.slug, 6).map((n) => ({
      href: `/${n.slug}-${serviceSuffix}`,
      label: n.name,
      hint: "İlçe geneli servis",
    }));
  } else {
    nearbyLinks = spotlightSlugs
      .map((s) => getIlceBySlug(s))
      .filter((x): x is Ilce => Boolean(x))
      .map((n) => ({
        href: `/${n.slug}-${serviceSuffix}`,
        label: n.name,
        hint: "İlçe servis",
      }));
  }

  const breadcrumbItems = [{ name: "Ana Sayfa", path: "/" }];
  if (ilce) {
    breadcrumbItems.push({
      name: ilce.name,
      path: `/${ilce.slug}-${serviceType}-servisi`,
    });
  }
  breadcrumbItems.push({
    name: `${brandText}${serviceName}`.trim(),
    path: `/${slugPath}`,
  });

  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);
  const serviceSchema = buildServiceSchema({
    name: heroTitle,
    description: heroSubtitle,
    areaName: locationText,
  });

  const landingWaMessage = buildLandingWhatsappMessage({
    locationText,
    serviceName,
    brandName: marka?.name,
  });
  const landingWaHref = buildWhatsAppUrl(landingWaMessage);

  const displayBrands =
    serviceType === "klima" ? klimaMarkalari : serviceType === "beyaz-esya" ? beyazEsyaMarkalari : [];

  const brandGridLinkMode =
    ilce || mahalle ? ("geo" as const) : ("canonical" as const);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={serviceSchema} />

      <HeroSection
        title={heroTitle}
        subtitle={heroSubtitle}
        primaryCtaText="Hemen Ara"
        secondaryCtaText="WhatsApp'tan Yaz"
        whatsappPrefill={landingWaMessage}
        responseHint="Telefon ve WhatsApp üzerinden genellikle kısa sürede geri dönüş hedeflenir; yoğunluğa ve uygunluk durumuna göre değişir."
      />

      <ServiceCards
        type={serviceType || undefined}
        locationSlug={ilce ? ilce.slug : resolvedParams.slug[0] === "antalya" ? "antalya" : undefined}
      />

      <LocalTrustStrip />

      <section className="py-16 bg-white border-y border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-brand-dark mb-6">
                {locationText} {brandText}
                {serviceName} hizmeti
              </h2>
              <div className="prose prose-blue text-gray-600 max-w-none">
                {introParagraphs.map((para, idx) => (
                  <p key={idx} className="mb-4 last:mb-0 leading-relaxed">
                    {para}
                  </p>
                ))}

                <h3 className="text-lg font-bold text-brand-dark mt-8 mb-3 not-prose">
                  Sık servis verilen cihaz türleri
                </h3>
                <ul className="list-disc pl-5 space-y-2 mb-6 not-prose">
                  {deviceLines.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>

                <p className="text-sm md:text-[15px] bg-brand-light/80 border border-gray-100 rounded-2xl p-4 not-prose leading-relaxed">
                  <strong className="text-brand-dark">Ortalama dönüş:</strong> {responseSnippet}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 not-prose">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-red shrink-0" />
                    <span className="font-medium">İşlem öncesi net bilgi</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Zap className="w-5 h-5 text-brand-red shrink-0" />
                    <span className="font-medium">Hızlı ekip yönlendirmesi</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-brand-red shrink-0" />
                    <span className="font-medium">Parça değişiminde ön bilgilendirme</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-brand-red shrink-0" />
                    <span className="font-medium">WhatsApp ile hızlı iletişim</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-brand-light p-5 md:p-8 rounded-3xl border border-gray-200">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-brand-red shrink-0" />
                {locationText} servis hattı
              </h3>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                <strong>{locationText}</strong> için teknik ekip yönlendirmesi yapıyoruz. {brandText ? `${brandText} marka ` : ""}
                cihazınızda arıza notunu kısaca paylaşmanız, doğru teşhis için yeterli başlangıç olur.
              </p>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-xl flex flex-wrap justify-between items-center gap-2 shadow-sm">
                  <span className="text-sm font-medium text-gray-500 shrink-0">Hizmet bölgesi</span>
                  <span className="font-bold text-brand-dark text-right">{locationText}</span>
                </div>
                <div className="bg-white p-4 rounded-xl flex flex-wrap justify-between items-center gap-2 shadow-sm">
                  <span className="text-sm font-medium text-gray-500 shrink-0">Ekip durumu</span>
                  <span className="text-green-600 font-bold flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse" aria-hidden />
                    Müsait / yakın rota
                  </span>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm text-sm text-gray-600 leading-relaxed">
                  <span className="font-medium text-gray-500 block mb-1">Planlama notu</span>
                  {responseSnippet}
                </div>
              </div>
              <a
                href={`tel:${CONTACT_INFO.phone}`}
                className="mt-6 w-full bg-brand-red text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-red-700 transition-colors shadow-lg shadow-red-200"
              >
                Hemen Ara
              </a>
              <a
                href={landingWaHref}
                target="_blank"
                rel="noreferrer"
                className="mt-3 w-full border-2 border-brand-red/40 text-brand-dark bg-white py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-red-50 transition-colors"
              >
                <MessageCircle className="w-5 h-5 text-brand-red" />
                WhatsApp ile devam
              </a>
            </div>
          </div>
        </div>
      </section>

      <ServiceProcessSection />

      <WhyChooseUs />

      {!marka && displayBrands.length > 0 && (
        <BrandGrid
          brands={displayBrands}
          basePath={ilce ? (mahalle ? `/${ilce.slug}/${mahalle.slug}` : `/${ilce.slug}`) : "/antalya"}
          linkMode={brandGridLinkMode}
          title={`${locationText} hizmet verdiğimiz ${serviceType === "klima" ? "klima" : "beyaz eşya"} markaları`}
        />
      )}

      {ilce && !mahalle ? (
        <LocationGrid
          locations={ilce.mahalleler}
          basePath={`/${ilce.slug}`}
          serviceType={serviceType as "klima" | "beyaz-esya"}
          title={`${ilce.name} mahalleleri`}
          subtitle="Mahallenizi seçerek aynı hizmet türünde detaylı sayfaya geçebilirsiniz."
        />
      ) : (
        <LocationGrid
          locations={ilceler}
          basePath=""
          serviceType={serviceType as "klima" | "beyaz-esya"}
          title="Antalya geneli hizmet bölgelerimiz"
          subtitle="İlçe seçerek servis sayfalarına devam edebilirsiniz."
        />
      )}

      <NearbyAreasSection
        title="Yakın bölgeler"
        subtitle="Komşu mahalle veya ilçelerde aynı hizmet türü için sayfalarımıza geçiş yapın."
        links={nearbyLinks}
      />

      <ContextTestimonials items={testimonialItems} />

      <FAQSection faqs={pageFaqs} includeFaqJsonLd={!catchAllSeoFlags.noindex} />

      <ContactCTA
        headline={`${locationText} için size en yakın ekibi yönlendirelim.`}
        description="Servis kaydı oluşturmak üzere arayın veya WhatsApp üzerinden adres ve arıza notunu paylaşın."
        whatsappPrefill={landingWaMessage}
        primaryButtonLabel="Arıza İçin Destek Al"
        secondaryButtonLabel="WhatsApp'tan Yaz"
      />
    </>
  );
}
