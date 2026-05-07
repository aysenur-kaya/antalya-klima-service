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
  const fullPath = slugs.join("/");
  const lastPart = slugs[slugs.length - 1];
  
  let serviceType: "klima" | "beyaz-esya" | null = null;
  let serviceName = "";
  let baseLastPart = lastPart;

  if (lastPart.endsWith("-klima-servisi")) {
    serviceType = "klima";
    serviceName = "Klima Servisi";
    baseLastPart = lastPart.replace("-klima-servisi", "");
  } else if (lastPart.endsWith("-beyaz-esya-servisi")) {
    serviceType = "beyaz-esya";
    serviceName = "Beyaz Eşya Servisi";
    baseLastPart = lastPart.replace("-beyaz-esya-servisi", "");
  } else if (lastPart === "klima-servisi") {
    return { serviceType: "klima", serviceName: "Klima Servisi", isValid: true };
  } else if (lastPart === "beyaz-esya-servisi") {
    return { serviceType: "beyaz-esya", serviceName: "Beyaz Eşya Servisi", isValid: true };
  }

  if (!serviceType) return { isValid: false, serviceName: "" };

  // Parse ilce, mahalle, marka from slugs
  // Variations:
  // 1. /antalya-[service]
  // 2. /[ilce]-[service]
  // 3. /[ilce]-[marka]-[service] (e.g. kemer-mitsubishi-klima-servisi)
  // 4. /[ilce]/[mahalle]-[service]
  // 5. /[ilce]/[marka]-[service]
  // 6. /[ilce]/[mahalle]/[marka]-[service]
  
  let ilce: Ilce | undefined;
  let mahalle: Mahalle | undefined;
  let marka: Brand | undefined;

  if (slugs.length === 1) {
    if (baseLastPart === "antalya") {
      // Just antalya
    } else {
      // Try to find if baseLastPart is ilce
      ilce = getIlceBySlug(baseLastPart);
      if (!ilce) {
        // Try to split by '-' to see if it's ilce-marka
        const parts = baseLastPart.split("-");
        // We might need to iterate to find valid ilce and marka since names can have hyphens
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
      }
    }
  } else if (slugs.length === 2) {
    // [ilce]/[something]
    ilce = getIlceBySlug(slugs[0]);
    if (ilce) {
      // Something can be mahalle or marka
      mahalle = getMahalleBySlug(ilce.slug, baseLastPart);
      if (!mahalle) {
        marka = getBrandBySlug(baseLastPart);
      }
    }
  } else if (slugs.length === 3) {
    // [ilce]/[mahalle]/[marka]
    ilce = getIlceBySlug(slugs[0]);
    if (ilce) {
      mahalle = getMahalleBySlug(ilce.slug, slugs[1]);
      marka = getBrandBySlug(baseLastPart);
    }
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
