import { Metadata, ResolvingMetadata } from "next";
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
  { params }: PageProps,
  parent: ResolvingMetadata
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
  const title = `${locationText} ${brandText}${parsed.serviceName} | Hızlı & Garantili Servis`;
  const description = `${locationText} bölgesinde ${brandText}${parsed.serviceName.toLowerCase()} için aynı gün garantili teknik destek alın. 7/24 profesyonel ekip.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/${resolvedParams.slug.join("/")}`
    }
  };
}

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

  // Determine which lists to show based on current page
  const displayBrands = serviceType === "klima" ? klimaMarkalari : serviceType === "beyaz-esya" ? beyazEsyaMarkalari : [];
  
  // Let's create breadcrumbs internally for Schema or visual
  const currentPath = `/${resolvedParams.slug.join("/")}`;

  return (
    <>
      <HeroSection 
        title={heroTitle} 
        subtitle={heroSubtitle}
      />
      
      <ServiceCards type={serviceType || undefined} locationSlug={resolvedParams.slug.length === 1 ? resolvedParams.slug[0] : undefined} />
      
      <WhyChooseUs />

      {!marka && displayBrands.length > 0 && (
        <BrandGrid 
          brands={displayBrands} 
          basePath={ilce ? (mahalle ? `/${ilce.slug}/${mahalle.slug}` : `/${ilce.slug}`) : "/antalya"} 
          title={`${locationText} Hizmet Verdiğimiz ${serviceType === "klima" ? "Klima" : "Beyaz Eşya"} Markaları`} 
        />
      )}

      {/* If ilce is selected but not mahalle, show mahalleler. Otherwise show top ilceler */}
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
