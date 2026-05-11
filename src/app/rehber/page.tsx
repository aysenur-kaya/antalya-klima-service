import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, ChevronRight, Snowflake, WashingMachine } from "lucide-react";
import { buildMetadata } from "@/lib/metadata";
import { getAllGuides, getGuidesByCategory } from "@/lib/guides";
import ContactCTA from "@/components/sections/ContactCTA";
import { WHATSAPP_PREFILL_GENERAL } from "@/lib/whatsapp";

export const metadata: Metadata = buildMetadata({
  title: "Teknik Bilgi Merkezi | Antalya Klima ve Beyaz Eşya Rehberi",
  description:
    "Klima ve beyaz eşya arızalarında yaygın nedenler, güvenli kullanıcı kontrolleri ve ne zaman teknik destek almanız gerektiği. Blog değil; servis uzmanlığına odaklı kısa rehberler.",
  path: "/rehber",
  type: "website",
});

export default function RehberIndexPage() {
  const klima = getGuidesByCategory("klima");
  const beyaz = getGuidesByCategory("beyaz-esya");
  const total = getAllGuides().length;

  return (
    <div className="bg-white min-h-screen">
      <section className="relative premium-gradient text-neutral-900 pt-[128px] pb-16 lg:pt-[164px] lg:pb-24 overflow-hidden border-b border-gray-200">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-red/[0.08] blur-[120px] rounded-full pointer-events-none" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-red-100 text-brand-red font-medium text-sm mb-6">
              <BookOpen className="w-4 h-4" />
              Teknik rehber
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight text-neutral-900">
              Bilgi merkezi: klima ve beyaz eşya
            </h1>
            <p className="text-lg text-neutral-600 leading-relaxed max-w-2xl">
              Burada klasik blog yazıları yerine, saha deneyiminden derlenen kısa teknik notlar bulacaksınız. Amacımız arızayı anlamanıza yardımcı olmak; gerektiğinde{" "}
              <Link href="/iletisim" className="text-brand-red underline underline-offset-2 hover:text-[#9f1414] transition-colors">
                servis kaydı
              </Link>{" "}
              oluşturmanızı kolaylaştırmak.
            </p>
            <p className="mt-4 text-sm text-neutral-500">
              Toplam <strong className="text-neutral-800">{total}</strong> rehber · Antalya servisi altyapısı ile uyumlu iç linkler
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-brand-light border-y border-gray-100">
        <div className="container mx-auto px-4 md:px-6 space-y-16">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-white border border-gray-200 flex items-center justify-center text-brand-red shadow-sm">
                <Snowflake className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-brand-dark">Klima rehberleri</h2>
                <p className="text-gray-600 text-sm md:text-base mt-1">Soğutma, drenaj, gaz ve hata kodları</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {klima.map((g) => (
                <Link
                  key={g.slug}
                  href={`/rehber/${g.slug}`}
                  className="group flex items-start justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-5 md:p-6 shadow-sm hover:border-brand-red/35 hover:shadow-md transition-all"
                >
                  <div>
                    <h3 className="font-bold text-brand-dark group-hover:text-brand-red transition-colors leading-snug mb-2">
                      {g.title.split("|")[0].trim()}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">{g.description}</p>
                    <span className="mt-3 inline-flex text-xs font-semibold text-gray-500">{g.deviceType}</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-brand-red shrink-0 mt-1 transition-transform group-hover:translate-x-0.5" />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-white border border-gray-200 flex items-center justify-center text-brand-red shadow-sm">
                <WashingMachine className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-brand-dark">Beyaz eşya rehberleri</h2>
                <p className="text-gray-600 text-sm md:text-base mt-1">Çamaşır, buzdolabı, bulaşık ve fırın</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {beyaz.map((g) => (
                <Link
                  key={g.slug}
                  href={`/rehber/${g.slug}`}
                  className="group flex items-start justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-5 md:p-6 shadow-sm hover:border-brand-red/35 hover:shadow-md transition-all"
                >
                  <div>
                    <h3 className="font-bold text-brand-dark group-hover:text-brand-red transition-colors leading-snug mb-2">
                      {g.title.split("|")[0].trim()}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">{g.description}</p>
                    <span className="mt-3 inline-flex text-xs font-semibold text-gray-500">{g.deviceType}</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-brand-red shrink-0 mt-1 transition-transform group-hover:translate-x-0.5" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ContactCTA
        headline="Sorun devam ediyorsa teknik destek alın."
        description="Rehber adımları risk oluşturmadan uygulanamıyorsa veya belirti kötüleşiyorsa telefon veya WhatsApp ile servis kaydı oluşturun."
        whatsappPrefill={WHATSAPP_PREFILL_GENERAL}
        primaryButtonLabel="Hemen Ara"
        secondaryButtonLabel="WhatsApp'tan Yaz"
      />
    </div>
  );
}
