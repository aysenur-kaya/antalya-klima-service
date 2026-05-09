import { Metadata } from "next";
import Link from "next/link";
import { MapPin, ChevronRight, Users } from "lucide-react";
import { ilceler } from "@/lib/data";
import HeroSection from "@/components/sections/HeroSection";
import ContactCTA from "@/components/sections/ContactCTA";

export const metadata: Metadata = {
  title: "Antalya Hizmet Bölgelerimiz | Tüm İlçeler ve Mahalleler",
  description: "Antalya geneli klima ve beyaz eşya servis hizmeti verdiğimiz tüm ilçeler ve mahalleler. Muratpaşa, Konyaaltı, Kepez ve tüm Antalya bölgeleri.",
};

export default function BolgelerPage() {
  return (
    <div className="bg-white min-h-screen">
      <HeroSection 
        title="Antalya Hizmet Bölgelerimiz" 
        subtitle="Antalya'nın 19 ilçesinde ve tüm mahallelerinde profesyonel teknik servis ekiplerimizle hizmetinizdeyiz."
      />

      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
              Tüm İlçelerimiz
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hizmet verdiğimiz bölgeyi seçerek mahalle bazlı servis noktalarımızı inceleyebilirsiniz.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {ilceler.map((ilce) => (
              <Link 
                key={ilce.slug}
                href={`/bolgeler/${ilce.slug}`}
                className="group relative bg-brand-light p-8 rounded-3xl border border-gray-200 hover:border-brand-red/30 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex flex-col h-full">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-brand-red mb-6 shadow-sm group-hover:bg-brand-red group-hover:text-white transition-all duration-300">
                    <MapPin className="w-6 h-6" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-brand-dark mb-2 group-hover:text-brand-red transition-colors">
                    {ilce.name}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                    <Users className="w-4 h-4" />
                    <span>{ilce.mahalleler.length} Mahalle</span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-8 flex-grow">
                    {ilce.name} bölgesinde klima ve beyaz eşya servis kaydı oluşturmak için hemen inceleyin.
                  </p>
                  
                  <div className="flex items-center gap-2 text-brand-red font-bold text-sm">
                    <span>Bölgeyi İncele</span>
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </div>
  );
}
