import type { Metadata } from "next";
import Link from "next/link";
import { klimaMarkalari } from "@/lib/data";
import ContactCTA from "@/components/sections/ContactCTA";
import { Thermometer, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Antalya Klima Servisi Markaları | Tüm Klima Markaları",
  description:
    "Antalya genelinde hizmet verdiğimiz tüm klima markaları. Arçelik, Beko, Mitsubishi, Daikin, LG, Samsung ve daha fazlası için garantili klima servisi.",
  alternates: { canonical: "/klima-markalari" },
};

export default function KlimaMarkalariPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative premium-gradient text-white pt-[128px] pb-16 lg:pt-[164px] lg:pb-20 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-brand-red/20 blur-[140px] rounded-full pointer-events-none" />
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-brand-red font-medium text-sm mb-6 border border-brand-red/20">
            <Thermometer className="w-4 h-4" />
            Klima Markaları
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-5 leading-tight">
            Hizmet Verdiğimiz<br />
            <span className="text-brand-red">Klima Markaları</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Antalya genelinde aşağıdaki tüm klima markalarına aynı gün, garantili ve profesyonel
            teknik servis sunuyoruz.
          </p>
        </div>
      </section>

      {/* Brand Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <p className="text-center text-gray-500 mb-10 text-sm">
            Toplam <strong className="text-brand-dark">{klimaMarkalari.length}</strong> klima markasında yetkili servis
          </p>
          <div className="flex flex-wrap justify-center -m-1.5 md:-m-2 lg:-m-2.5">
            {klimaMarkalari.map((brand) => (
              <div key={brand.slug} className="p-1.5 md:p-2 lg:p-2.5 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6">
                <Link
                  href={`/antalya/${brand.slug}-klima-servisi`}
                  className="flex items-center justify-center text-center px-3 py-3 md:py-5 min-h-[56px] md:min-h-[72px] bg-white border border-gray-200 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:border-brand-red/40 hover:shadow-[0_10px_25px_rgba(0,0,0,0.08)] hover:text-brand-red font-semibold text-gray-700 transition-all text-xs md:text-base group h-full w-full"
                >
                  <span className="transition-transform group-hover:scale-105">
                    {brand.name}
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
