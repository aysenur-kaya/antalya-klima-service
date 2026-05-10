import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import HeroSection from "@/components/sections/HeroSection";
import ContactCTA from "@/components/sections/ContactCTA";
import { getIlceBySlug, ilceler } from "@/lib/data";
import { SITE_URL } from "@/lib/constants";
import { klimaServicePages, servicePriceItems } from "@/lib/services";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return ilceler.map((ilce) => ({ slug: ilce.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const ilce = getIlceBySlug(slug);

  if (!ilce) {
    return { title: "Fiyat Listesi Bulunamadı" };
  }

  return {
    title: `${ilce.name} Klima Servisi Fiyatları | Antalya Servisi`,
    description: `${ilce.name} klima gaz dolumu, bakım, tamir ve montaj fiyatları. Net fiyat keşif ve onay sonrası belirlenir.`,
    alternates: { canonical: `${SITE_URL}/bolgeler/${ilce.slug}/fiyatlar` },
  };
}

export default async function IlceFiyatlarPage({ params }: PageProps) {
  const { slug } = await params;
  const ilce = getIlceBySlug(slug);

  if (!ilce) {
    notFound();
  }

  return (
    <>
      <HeroSection
        title={`${ilce.name} Klima Servisi Fiyatları`}
        subtitle={`${ilce.name} için gaz dolumu, bakım, tamir ve montaj işlemlerinde taban fiyatları ve hizmet türlerini inceleyin.`}
      />

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-10 rounded-3xl border border-gray-200 bg-brand-light p-8">
            <Link href={`/bolgeler/${ilce.slug}`} className="text-sm font-bold text-brand-red hover:underline">
              {ilce.name} servis bölgesi sayfasına dön
            </Link>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Aşağıdaki fiyatlar taban bilgilendirme içindir. Cihaz modeli, arıza türü, parça ihtiyacı ve erişim koşulları keşif sonrası netleşir; onayınız olmadan işlem yapılmaz.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 overflow-hidden rounded-3xl border border-gray-200">
              <table className="w-full text-left">
                <thead className="bg-brand-dark text-white">
                  <tr>
                    <th className="px-5 py-4 text-sm font-bold">İşlem</th>
                    <th className="px-5 py-4 text-sm font-bold">Fiyat</th>
                  </tr>
                </thead>
                <tbody>
                  {servicePriceItems.map((item) => (
                    <tr key={item.name} className="border-t border-gray-100">
                      <td className="px-5 py-4 text-sm font-medium text-gray-700">{item.name}</td>
                      <td className="px-5 py-4 text-sm font-bold text-brand-dark">{item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <aside className="rounded-3xl border border-gray-200 p-8">
              <h2 className="text-xl font-bold text-brand-dark mb-4">Hizmete göre fiyat</h2>
              <div className="flex flex-col gap-3">
                {klimaServicePages.filter((service) => service.slug !== "klima-servisi").map((service) => (
                  <Link
                    key={service.slug}
                    href={`/bolgeler/${ilce.slug}/fiyatlar/${service.slug}`}
                    className="rounded-xl bg-brand-light px-4 py-3 text-sm font-semibold text-gray-700 hover:text-brand-red transition-colors"
                  >
                    {ilce.name} {service.shortTitle}
                  </Link>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
