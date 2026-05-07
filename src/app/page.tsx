import HeroSection from "@/components/sections/HeroSection";
import ServiceCards from "@/components/sections/ServiceCards";
import LocationGrid from "@/components/sections/LocationGrid";
import BrandGrid from "@/components/sections/BrandGrid";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import FAQSection from "@/components/sections/FAQSection";
import ContactCTA from "@/components/sections/ContactCTA";
import { ilceler, allBrands } from "@/lib/data";

export default function Home() {
  // Use a subset of regions and brands for the home page to avoid massive lists
  const popularLocations = ilceler.slice(0, 10);
  const popularBrands = allBrands.slice(0, 20);

  return (
    <>
      <HeroSection 
        title="Antalya Klima ve Beyaz Eşya Servisi" 
        subtitle="Antalya genelinde hızlı, garantili ve profesyonel beyaz eşya ve klima bakım, tamir, montaj hizmetleri."
      />
      <ServiceCards />
      <WhyChooseUs />
      <BrandGrid brands={popularBrands} basePath="/antalya" />
      <LocationGrid locations={popularLocations} basePath="" />
      <FAQSection />
      <ContactCTA />
    </>
  );
}
