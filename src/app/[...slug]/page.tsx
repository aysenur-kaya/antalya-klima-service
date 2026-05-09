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

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

function parseSlug(slugs: string[]) {
  const lastPart = slugs[slugs.length - 1];
  
  const serviceMap = [
    { suffix: "klima-bakim-servisi", type: "klima", name: "Klima Bakım Servisi" },
    { suffix: "klima-tamir-servisi", type: "klima", name: "Klima Tamir Servisi" },
    { suffix: "klima-montaj-servisi", type: "klima", name: "Klima Montaj Servisi" },
    { suffix: "klima-gaz-dolumu-servisi", type: "klima", name: "Klima Gaz Dolumu Servisi" },
    { suffix: "klima-gaz-dolumu", type: "klima", name: "Klima Gaz Dolumu Servisi" },
    { suffix: "klima-ariza-servisi", type: "klima", name: "Klima Arıza Servisi" },
    { suffix: "camasir-makinesi-servisi", type: "beyaz-esya", name: "Çamaşır Makinesi Servisi" },
    { suffix: "bulasik-makinesi-servisi", type: "beyaz-esya", name: "Bulaşık Makinesi Servisi" },
    { suffix: "buzdolabi-servisi", type: "beyaz-esya", name: "Buzdolabı Servisi" },
    { suffix: "firin-servisi", type: "beyaz-esya", name: "Fırın Servisi" },
    { suffix: "derin-dondurucu-servisi", type: "beyaz-esya", name: "Derin Dondurucu Servisi" },
    { suffix: "kurutma-makinesi-servisi", type: "beyaz-esya", name: "Kurutma Makinesi Servisi" },
    { suffix: "klima-servisi", type: "klima", name: "Klima Servisi" },
    { suffix: "beyaz-esya-servisi", type: "beyaz-esya", name: "Beyaz Eşya Servisi" }
  ] as const;

  let matchedService = serviceMap.find(s => lastPart.endsWith("-" + s.suffix));
  let baseLastPart = "";

  if (matchedService) {
    baseLastPart = lastPart.substring(0, lastPart.length - matchedService.suffix.length - 1);
  } else {
    matchedService = serviceMap.find(s => lastPart === s.suffix);
    if (matchedService) {
      baseLastPart = "";
    }
  }

  if (!matchedService) return { isValid: false, serviceName: "" };

  const serviceType = matchedService.type;
  const serviceName = matchedService.name;

  let ilce: Ilce | undefined;
  let mahalle: Mahalle | undefined;
  let marka: Brand | undefined;

  if (slugs.length === 1) {
    if (baseLastPart === "antalya" || baseLastPart === "") {
      // Just antalya or global service
    } else {
      ilce = getIlceBySlug(baseLastPart);
      if (!ilce) {
        const parts = baseLastPart.split("-");
        for (let i = 1; i < parts.length; i++) {
          const potentialIlce = parts.slice(0, i).join("-");
          const potentialMarka = parts.slice(i).join("-");
          const foundIlce = getIlceBySlug(potentialIlce);
          const foundMarka = getBrandBySlug(potentialMarka);
          if (foundIlce && foundMarka) {
            ilce = foundIlce;
            marka = foundMarka;
            break;
          }
        }
        if (!ilce && !marka) {
          marka = getBrandBySlug(baseLastPart);
        }
      }
    }
  } else if (slugs.length === 2) {
    if (slugs[0] !== "antalya") {
      ilce = getIlceBySlug(slugs[0]);
    }
    
    if (baseLastPart !== "") {
      mahalle = ilce ? getMahalleBySlug(ilce.slug, baseLastPart) : undefined;
      if (!mahalle) {
        marka = getBrandBySlug(baseLastPart);
      }
    }
  } else if (slugs.length === 3) {
    if (slugs[0] !== "antalya") {
      ilce = getIlceBySlug(slugs[0]);
    }
    if (ilce) {
      mahalle = getMahalleBySlug(ilce.slug, slugs[1]);
    }
    marka = getBrandBySlug(baseLastPart);
  }

  return { ilce, mahalle, marka, serviceType, serviceName, isValid: true };
}

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const resolvedParams = await params;
  const parsed = parseSlug(resolvedParams.slug);

  if (!parsed.isValid) {
    return { title: "Sayfa Bulunamadı" };
  }

  const locationText = parsed.mahalle 
    ? `${parsed.ilce?.name} ${parsed.mahalle.name}` 
    : parsed.ilce 
      ? parsed.ilce.name 
      : "Antalya";

  const brandText = parsed.marka ? `${parsed.marka.name} ` : "";
  const serviceName = parsed.serviceName;
  
  const title = `${locationText} ${brandText}${serviceName} | 7/24 Teknik Servis`;
  const description = `${locationText} bölgesinde ${brandText}${serviceName.toLowerCase()} ihtiyacınız için aynı gün garantili ve profesyonel teknik destek. ${brandText ? `${brandText}marka bağımsız özel servis hizmeti.` : ""}`;

  const slugPath = resolvedParams.slug.join("/");

  return {
    title,
    description,
    alternates: {
      canonical: `/${slugPath}`
    },
    openGraph: {
      title,
      description,
      url: `/${slugPath}`,
      type: 'article',
    }
  };
}

import { SITE_URL, CONTACT_INFO } from "@/lib/constants";
import JsonLd from "@/components/seo/JsonLd";
import { CheckCircle2, ShieldCheck, Zap, Clock, MapPin } from "lucide-react";

// ... (rest of the imports)

export default async function DynamicServicePage({ params }: PageProps) {
  const resolvedParams = await params;
  const parsed = parseSlug(resolvedParams.slug);

  if (!parsed.isValid) {
    notFound();
  }

  const { ilce, mahalle, marka, serviceType, serviceName } = parsed;

  const locationText = mahalle 
    ? `${ilce?.name} ${mahalle.name}` 
    : ilce 
      ? ilce.name 
      : "Antalya";

  const brandText = marka ? `${marka.name} ` : "";
  
  const heroTitle = `${locationText} ${brandText}${serviceName}`;
  const heroSubtitle = `${locationText} bölgesinde garantili ve güvenilir ${brandText}${serviceName.toLowerCase()} için 7/24 bize ulaşın. Aynı gün servis imkanı!`;

  // Schemas
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Ana Sayfa",
        "item": SITE_URL
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": locationText,
        "item": `${SITE_URL}/${ilce?.slug || "antalya"}`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": `${brandText}${serviceName}`,
        "item": `${SITE_URL}/${resolvedParams.slug.join("/")}`
      }
    ]
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": heroTitle,
    "description": heroSubtitle,
    "provider": {
      "@type": "LocalBusiness",
      "name": "Antalya Servisi",
      "telephone": CONTACT_INFO.phone
    },
    "areaServed": {
      "@type": "City",
      "name": locationText
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": serviceName,
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": `${brandText}${serviceName}`
          }
        }
      ]
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `${locationText} bölgesinde ${serviceName} ne kadar sürer?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Servis süresi genellikle aynı gün içerisinde tamamlanmaktadır. Uzman ekibimiz adresinize ulaştıktan sonra 1-2 saat içinde işlemi bitirir."
        }
      },
      {
        "@type": "Question",
        "name": `${brandText || "Cihazım"} için garanti veriyor musunuz?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Evet, yaptığımız tüm tamir ve parça değişim işlemleri 1 yıl servis garantisi altındadır."
        }
      }
    ]
  };

  // Determine which lists to show based on current page
  const displayBrands = serviceType === "klima" ? klimaMarkalari : serviceType === "beyaz-esya" ? beyazEsyaMarkalari : [];
  
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema} />

      <HeroSection 
        title={heroTitle} 
        subtitle={heroSubtitle}
      />
      
      <ServiceCards type={serviceType || undefined} locationSlug={resolvedParams.slug.length === 1 ? resolvedParams.slug[0] : undefined} />
      
      {/* Unique SEO Content Section */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-brand-dark mb-6">
                {locationText} {brandText}{serviceName} Hizmeti
              </h2>
              <div className="prose prose-blue text-gray-600 max-w-none">
                <p className="mb-4">
                  {locationText} bölgesinde yaşayan değerli müşterilerimiz için <strong>{brandText}{serviceName.toLowerCase()}</strong> ihtiyaçlarında en hızlı ve güvenilir çözümleri sunuyoruz. Profesyonel teknik ekibimizle, cihazlarınızın performansını artırmak ve ömrünü uzatmak için çalışıyoruz.
                </p>
                <p className="mb-6">
                  {marka ? (
                    `Özel servis olarak ${marka.name} marka cihazlarınızda marka bağımsız, garantili ve uzman teknik destek sağlıyoruz. Orijinal yedek parça ve profesyonel işçilik ile cihazınız ilk günkü verimine kavuşur.`
                  ) : (
                    "Klima ve beyaz eşyalarınızda meydana gelen her türlü arıza, bakım ve montaj işlemleri için Antalya genelinde mobil ekiplerimizle kapınıza geliyoruz."
                  )}
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-red" />
                    <span className="font-medium">1 Yıl İşçilik Garantisi</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Zap className="w-5 h-5 text-brand-red" />
                    <span className="font-medium">Aynı Gün Hızlı Servis</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-brand-red" />
                    <span className="font-medium">Orijinal Yedek Parça</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-brand-red" />
                    <span className="font-medium">7/24 Çağrı Desteği</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-brand-light p-8 rounded-3xl border border-gray-200">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-brand-red" />
                {locationText} Servis Noktası
              </h3>
              <p className="text-gray-600 text-sm mb-6">
                Ekiplerimiz şu anda <strong>{locationText}</strong> ve çevresinde aktif olarak hizmet vermektedir. Size en yakın mobil ekibimizi yönlendirmemiz için hemen arayın.
              </p>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-xl flex justify-between items-center shadow-sm">
                  <span className="text-sm font-medium text-gray-500">Bölge:</span>
                  <span className="font-bold text-brand-dark">{locationText}</span>
                </div>
                <div className="bg-white p-4 rounded-xl flex justify-between items-center shadow-sm">
                  <span className="text-sm font-medium text-gray-500">Durum:</span>
                  <span className="text-green-600 font-bold flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
                    Aktif / Mobil Ekip Mevcut
                  </span>
                </div>
                <div className="bg-white p-4 rounded-xl flex justify-between items-center shadow-sm">
                  <span className="text-sm font-medium text-gray-500">Tahmini Varış:</span>
                  <span className="font-bold text-brand-dark">30 - 60 Dakika</span>
                </div>
              </div>
              <a 
                href={`tel:${CONTACT_INFO.phone}`}
                className="mt-8 w-full bg-brand-red text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-red-700 transition-colors shadow-lg shadow-red-200"
              >
                Hemen Tekniker Çağır
              </a>
            </div>
          </div>
        </div>
      </section>
      
      <WhyChooseUs />

      {!marka && displayBrands.length > 0 && (
        <BrandGrid 
          brands={displayBrands} 
          basePath={ilce ? (mahalle ? `/${ilce.slug}/${mahalle.slug}` : `/${ilce.slug}`) : "/antalya"} 
          title={`${locationText} Hizmet Verdiğimiz ${serviceType === "klima" ? "Klima" : "Beyaz Eşya"} Markaları`} 
        />
      )}

      {ilce && !mahalle ? (
        <LocationGrid 
          locations={ilce.mahalleler} 
          basePath={`/${ilce.slug}`} 
          title={`${ilce.name} Hizmet Bölgelerimiz (Mahalleler)`}
        />
      ) : (
        <LocationGrid 
          locations={ilceler.slice(0, 10)} 
          basePath="" 
          title="Antalya Geneli Hizmet Bölgelerimiz"
        />
      )}

      <FAQSection />
      
      <ContactCTA />
    </>
  );
}
