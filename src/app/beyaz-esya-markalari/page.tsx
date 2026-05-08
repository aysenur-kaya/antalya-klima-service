import type { Metadata } from "next";
import Link from "next/link";
import { beyazEsyaMarkalari } from "@/lib/data";
import ContactCTA from "@/components/sections/ContactCTA";
import { WashingMachine, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Antalya Beyaz Eşya Servisi Markaları | Tüm Beyaz Eşya Markaları",
  description:
    "Antalya genelinde hizmet verdiğimiz tüm beyaz eşya markaları. Arçelik, Beko, Bosch, Siemens, Samsung ve daha fazlası için garantili beyaz eşya servisi.",
  alternates: { canonical: "/beyaz-esya-markalari" },
};

export default function BeyazEsyaMarkalariPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative premium-gradient text-white pt-[128px] pb-16 lg:pt-[164px] lg:pb-20 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-brand-red/20 blur-[140px] rounded-full pointer-events-none" />
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-brand-red font-medium text-sm mb-6 border border-brand-red/20">
            <WashingMachine className="w-4 h-4" />
            Beyaz Eşya Markaları
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-5 leading-tight">
            Hizmet Verdiğimiz<br />
            <span className="text-brand-red">Beyaz Eşya Markaları</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Antalya genelinde aşağıdaki tüm beyaz eşya markalarına aynı gün, garantili ve
            profesyonel teknik servis sunuyoruz.
          </p>
        </div>
      </section>

      {/* Brand Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <p className="text-center text-gray-500 mb-10 text-sm">
            Toplam <strong className="text-brand-dark">{beyazEsyaMarkalari.length}</strong> beyaz eşya markasında yetkili servis
          </p>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {beyazEsyaMarkalari.map((brand) => (
              <Link
                key={brand.slug}
                href={`/antalya/${brand.slug}-beyaz-esya-servisi`}
                className="group relative px-5 py-3 bg-white border border-gray-200 rounded-xl shadow-sm hover:border-brand-red hover:shadow-lg hover:text-brand-red font-medium text-gray-700 transition-all text-sm md:text-base flex items-center gap-2"
              >
                <span>{brand.name}</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all text-brand-red" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
