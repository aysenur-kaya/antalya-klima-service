import type { Metadata } from "next";
import Link from "next/link";
import { Thermometer, WashingMachine } from "lucide-react";
import HeroSection from "@/components/sections/HeroSection";
import ContactCTA from "@/components/sections/ContactCTA";
import LocalTrustStrip from "@/components/sections/LocalTrustStrip";
import ServiceProcessSection from "@/components/sections/ServiceProcessSection";
import ContextTestimonials from "@/components/sections/ContextTestimonials";
import { beyazEsyaMarkalari, klimaMarkalari } from "@/lib/data";
import { getTestimonialsForContext } from "@/lib/testimonials";

export const metadata: Metadata = {
  title: "Servis Markaları | Antalya Klima ve Beyaz Eşya Servisi",
  description: "Antalya genelinde klima ve beyaz eşya için hizmet verdiğimiz marka sayfaları. Markanızı seçerek servis detaylarına ulaşın.",
  alternates: { canonical: "/servis" },
};

const groups = [
  {
    title: "Klima Markaları",
    description: "Klima markanızı seçerek Antalya geneli marka servis sayfasına geçin.",
    icon: Thermometer,
    brands: klimaMarkalari,
    suffix: "klima-servisi",
  },
  {
    title: "Beyaz Eşya Markaları",
    description: "Beyaz eşya markanız için özel servis ve arıza yönlendirme sayfasını açın.",
    icon: WashingMachine,
    brands: beyazEsyaMarkalari,
    suffix: "beyaz-esya-servisi",
  },
];

export default function ServisMarkalariPage() {
  const servisStories = getTestimonialsForContext({
    serviceName: "Klima Servisi",
    serviceType: "klima",
    hasBrand: true,
    seed: "servis-markalar",
    count: 2,
  });

  return (
    <>
      <HeroSection
        title="Antalya servis markaları"
        subtitle="Marka ve cihaz türünü seçerek servis bilgilerine hızlıca ulaşabilirsiniz."
        primaryCtaText="Servis kaydı için hemen arayın"
        secondaryCtaText="WhatsApp üzerinden hızlı destek alın"
      />

      <LocalTrustStrip />

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="space-y-14">
            {groups.map((group) => {
              const Icon = group.icon;

              return (
                <div key={group.title}>
                  <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
                    <div>
                      <div className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-bold text-brand-red mb-4">
                        <Icon className="w-4 h-4" />
                        {group.brands.length} marka
                      </div>
                      <h2 className="text-3xl font-bold text-brand-dark mb-3">{group.title}</h2>
                      <p className="text-gray-600 max-w-2xl">{group.description}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap justify-center -m-1.5 md:-m-2 lg:-m-2.5">
                    {group.brands.map((brand) => (
                      <div key={`${group.suffix}-${brand.slug}`} className="p-1.5 md:p-2 lg:p-2.5 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6">
                        <Link
                          href={`/servis/${brand.slug}-${group.suffix}`}
                          className="flex h-full min-h-[56px] md:min-h-[64px] items-center justify-center rounded-xl border border-gray-200 bg-white px-3 py-3 md:py-4 text-center text-sm font-semibold text-gray-700 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all hover:border-brand-red/40 hover:text-brand-red hover:shadow-[0_10px_25px_rgba(0,0,0,0.08)] md:text-base active:scale-95"
                        >
                          {brand.name}
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <ServiceProcessSection />

      <ContextTestimonials items={servisStories} />

      <ContactCTA />
    </>
  );
}
