import HeroSection from "@/components/sections/HeroSection";
import ServiceCards from "@/components/sections/ServiceCards";
import LocationGrid from "@/components/sections/LocationGrid";
import BrandGrid from "@/components/sections/BrandGrid";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import FAQSection from "@/components/sections/FAQSection";
import ContactCTA from "@/components/sections/ContactCTA";
import { ilceler, klimaMarkalari, beyazEsyaMarkalari } from "@/lib/data";

export default function Home() {
  // Show top 10 regions on homepage
  const popularLocations = ilceler.slice(0, 10);

  return (
    <>
      <HeroSection
        title="Antalya Klima ve Beyaz Eşya Servisi"
        subtitle="Antalya genelinde hızlı, garantili ve profesyonel beyaz eşya ve klima bakım, tamir, montaj hizmetleri."
      />
      <ServiceCards />
      <WhyChooseUs />

      {/* All klima brands */}
      <BrandGrid
        brands={klimaMarkalari}
        basePath="/antalya"
        title="Hizmet Verdiğimiz Klima Markaları"
        subtitle="Tüm klima markalarına aynı gün, garantili teknik servis hizmeti sunuyoruz."
      />

      {/* All beyaz eşya brands */}
      <BrandGrid
        brands={beyazEsyaMarkalari}
        basePath="/antalya"
        title="Hizmet Verdiğimiz Beyaz Eşya Markaları"
        subtitle="Buzdolabı, çamaşır makinesi, bulaşık makinesi ve daha fazlası için tüm markalarda uzman servis."
      />

      <LocationGrid locations={popularLocations} basePath="" title="Antalya Geneli Hizmet Bölgelerimiz" />
      <FAQSection />
      <ContactCTA />
    </>
  );
}
