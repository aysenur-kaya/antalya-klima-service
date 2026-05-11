import HeroSection from "@/components/sections/HeroSection";
import ServiceCards from "@/components/sections/ServiceCards";
import LocationGrid from "@/components/sections/LocationGrid";
import BrandGrid from "@/components/sections/BrandGrid";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import FAQSection from "@/components/sections/FAQSection";
import ContactCTA from "@/components/sections/ContactCTA";
import LocalTrustStrip from "@/components/sections/LocalTrustStrip";
import ServiceProcessSection from "@/components/sections/ServiceProcessSection";
import ContextTestimonials from "@/components/sections/ContextTestimonials";
import { ilceler, klimaMarkalari, beyazEsyaMarkalari } from "@/lib/data";
import { getTestimonialsForContext } from "@/lib/testimonials";
import { WHATSAPP_PREFILL_GENERAL } from "@/lib/whatsapp";

export default function Home() {
  const allAntalyaDistricts = ilceler;
  const homeStories = getTestimonialsForContext({
    serviceName: "Klima Servisi",
    serviceType: "klima",
    hasBrand: false,
    seed: "home",
    count: 3,
    preset: "homepage",
  });

  return (
    <>
      <HeroSection
        title="Antalya Klima ve Beyaz Eşya Servisi"
        subtitle="Antalya genelinde hızlı, garantili ve profesyonel beyaz eşya ve klima bakım, tamir, montaj hizmetleri."
        primaryCtaText="Hemen Ara"
        secondaryCtaText="WhatsApp'tan Yaz"
        whatsappPrefill={WHATSAPP_PREFILL_GENERAL}
        responseHint="Servis talebiniz için genellikle kısa sürede geri dönüş sağlanır; yoğunluğa ve uygunluk durumuna göre süre değişebilir."
      />
      <ServiceCards />
      <LocalTrustStrip />
      <WhyChooseUs />

      {/* All klima brands */}
      <BrandGrid
        brands={klimaMarkalari}
        basePath="/antalya"
        linkMode="canonical"
        title="Hizmet Verdiğimiz Klima Markaları"
        subtitle="Tüm klima markalarına aynı gün, garantili teknik servis hizmeti sunuyoruz."
      />

      {/* All beyaz eşya brands */}
      <BrandGrid
        brands={beyazEsyaMarkalari}
        basePath="/antalya"
        linkMode="canonical"
        title="Hizmet Verdiğimiz Beyaz Eşya Markaları"
        subtitle="Buzdolabı, çamaşır makinesi, bulaşık makinesi ve daha fazlası için tüm markalarda uzman servis."
      />

      <LocationGrid locations={allAntalyaDistricts} basePath="" title="Antalya Geneli Hizmet Bölgelerimiz" />
      <ServiceProcessSection />
      <ContextTestimonials items={homeStories} />
      <FAQSection includeFaqJsonLd />
      <ContactCTA
        whatsappPrefill={WHATSAPP_PREFILL_GENERAL}
        primaryButtonLabel="Servis Talebi Oluştur"
        secondaryButtonLabel="WhatsApp'tan Yaz"
        headline="Size en yakın ekibi yönlendirelim."
        description="Arıza notu ve adresinizi paylaşın; yoğunluğa göre genellikle kısa sürede dönüş sağlanır."
      />
    </>
  );
}
