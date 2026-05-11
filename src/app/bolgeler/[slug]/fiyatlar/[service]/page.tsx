import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import HeroSection from "@/components/sections/HeroSection";
import ContactCTA from "@/components/sections/ContactCTA";
import { getIlceBySlug, ilceler } from "@/lib/data";
import { getServicePageBySlug, klimaServicePages, servicePriceItems } from "@/lib/services";
import { SITE_URL } from "@/lib/constants";

interface PageProps {
  params: Promise<{ slug: string; service: string }>;
}

export async function generateStaticParams() {
  return ilceler.flatMap((ilce) =>
    klimaServicePages
      .filter((service) => service.slug !== "klima-servisi")
      .map((service) => ({ slug: ilce.slug, service: service.slug }))
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, service: serviceSlug } = await params;
  const ilce = getIlceBySlug(slug);
  const service = getServicePageBySlug(serviceSlug);

  if (!ilce || !service) {
    return { title: "Fiyat Sayfası Bulunamadı" };
  }

  return {
    title: `${ilce.name} ${service.shortTitle} Fiyatı | Antalya Servisi`,
    description: `${ilce.name} ${service.shortTitle.toLowerCase()} için fiyat bilgisi, kapsam ve servis süreci. Net fiyat keşif sonrası belirlenir.`,
    alternates: { canonical: `${SITE_URL}/bolgeler/${ilce.slug}/fiyatlar/${service.slug}` },
  };
}

export default async function IlceHizmetFiyatPage({ params }: PageProps) {
  const { slug, service: serviceSlug } = await params;
  const ilce = getIlceBySlug(slug);
  const service = getServicePageBySlug(serviceSlug);

  if (!ilce || !service || service.type !== "klima") {
    notFound();
  }

  const relatedPrices =
    service.slug === "klima-gaz-dolumu"
      ? servicePriceItems.filter((item) => item.name.toLowerCase().includes("gaz"))
      : service.slug === "klima-montaji"
        ? servicePriceItems.filter((item) => item.name.toLowerCase().includes("montaj") || item.name.toLowerCase().includes("söküm"))
        : servicePriceItems;

  return (
    <>
      <HeroSection
        title={`${ilce.name} ${service.shortTitle} Fiyatı`}
        subtitle={`${service.summary} ${ilce.name} bölgesinde net fiyat, cihaz kontrolü ve kullanıcı onayı sonrası belirlenir.`}
      />

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <article className="lg:col-span-2 rounded-3xl border border-gray-200 p-5 md:p-8">
              <Link href={`/bolgeler/${ilce.slug}/fiyatlar`} className="text-sm font-bold text-brand-red hover:underline">
                {ilce.name} tüm fiyat listesine dön
              </Link>
              <h2 className="text-3xl font-bold text-brand-dark mt-6 mb-4">{service.shortTitle} fiyat kapsamı</h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                {service.whenToCall} Servis kaydı sırasında cihaz markası, kapasite bilgisi ve arıza belirtisi paylaşıldığında keşif süreci daha hızlı ilerler.
              </p>

              <div className="overflow-hidden rounded-2xl border border-gray-200">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[280px] text-left">
                    <tbody>
                      {relatedPrices.map((item) => (
                        <tr key={item.name} className="border-t border-gray-100 first:border-t-0">
                          <td className="px-5 py-4 text-sm font-medium text-gray-700">{item.name}</td>
                          <td className="px-5 py-4 text-sm font-bold text-brand-dark">{item.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </article>

            <aside className="rounded-3xl bg-brand-dark text-white p-6 md:p-8">
              <h3 className="text-xl font-bold mb-4">Servis talebine devam</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Fiyat araştırmasından sonra ilçe bazlı hizmet sayfasına geçerek randevu veya kayıt adımına ilerleyebilirsiniz.
              </p>
              <Link
                href={`/${ilce.slug}-${service.landingSlug}`}
                className="inline-flex rounded-xl bg-brand-red px-5 py-3 text-sm font-bold"
              >
                {ilce.name} {service.shortTitle}
              </Link>
            </aside>
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
