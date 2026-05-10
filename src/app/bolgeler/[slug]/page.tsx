import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, ChevronRight, Phone, MessageCircle } from "lucide-react";
import { getIlceBySlug, ilceler } from "@/lib/data";
import { SITE_URL, CONTACT_INFO } from "@/lib/constants";
import HeroSection from "@/components/sections/HeroSection";
import ContactCTA from "@/components/sections/ContactCTA";
import JsonLd from "@/components/seo/JsonLd";
import { klimaServicePages } from "@/lib/services";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const resolvedParams = await params;
  const ilce = getIlceBySlug(resolvedParams.slug);

  if (!ilce) {
    return { title: "Bölge Bulunamadı" };
  }

  return {
    title: `${ilce.name} Servis Bölgeleri ve Mahalleler | Antalya Servisi`,
    description: `${ilce.name} ilçesindeki tüm mahallelerde klima ve beyaz eşya teknik servis hizmeti. ${ilce.mahalleler.slice(0, 3).map(m => m.name).join(", ")} ve tüm bölgeler.`,
    alternates: {
      canonical: `${SITE_URL}/bolgeler/${ilce.slug}`
    }
  };
}

export async function generateStaticParams() {
  return ilceler.map((ilce) => ({
    slug: ilce.slug,
  }));
}

export default async function DistrictRegionsPage({ params }: PageProps) {
  const resolvedParams = await params;
  const ilce = getIlceBySlug(resolvedParams.slug);

  if (!ilce) {
    notFound();
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Ana Sayfa",
        "item": SITE_URL
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Bölgeler",
        "item": `${SITE_URL}/bolgeler`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": ilce.name,
        "item": `${SITE_URL}/bolgeler/${ilce.slug}`
      }
    ]
  };

  return (
    <div className="bg-white min-h-screen">
      <JsonLd data={breadcrumbSchema as Record<string, unknown>} />
      
      <HeroSection 
        title={`${ilce.name} Hizmet Bölgelerimiz`} 
        subtitle={`${ilce.name} ilçesindeki ${ilce.mahalleler.length} mahallenin tamamına aynı gün teknik servis hizmeti sunuyoruz.`}
      />

      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            
            {/* Sidebar Services */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-brand-light p-6 rounded-3xl border border-gray-100">
                <h3 className="font-bold text-lg mb-4 text-brand-dark flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-brand-red" />
                  Hızlı Servis
                </h3>
                <div className="flex flex-col gap-3">
                  <Link 
                    href={`/${ilce.slug}-klima-servisi`}
                    className="p-4 bg-white rounded-2xl border border-gray-200 hover:border-brand-red/30 transition-all font-medium text-sm text-gray-700 hover:text-brand-red"
                  >
                    {ilce.name} Klima Servisi
                  </Link>
                  <Link 
                    href={`/${ilce.slug}-beyaz-esya-servisi`}
                    className="p-4 bg-white rounded-2xl border border-gray-200 hover:border-brand-red/30 transition-all font-medium text-sm text-gray-700 hover:text-brand-red"
                  >
                    {ilce.name} Beyaz Eşya Servisi
                  </Link>
                  <Link
                    href={`/bolgeler/${ilce.slug}/fiyatlar`}
                    className="p-4 bg-white rounded-2xl border border-gray-200 hover:border-brand-red/30 transition-all font-medium text-sm text-gray-700 hover:text-brand-red"
                  >
                    {ilce.name} Fiyat Listesi
                  </Link>
                </div>
              </div>

              <div className="bg-brand-dark text-white p-6 rounded-3xl">
                <h4 className="font-bold mb-2">Acil Destek Hattı</h4>
                <p className="text-gray-400 text-sm mb-6">Müsait ekiplerimiz için hemen arayın.</p>
                <div className="space-y-3">
                  <a href={`tel:${CONTACT_INFO.phone}`} className="flex items-center gap-3 bg-brand-red py-3 px-4 rounded-xl font-bold text-sm">
                    <Phone className="w-4 h-4" />
                    {CONTACT_INFO.phoneFormatted}
                  </a>
                  <a href={CONTACT_INFO.whatsapp} className="flex items-center gap-3 bg-white/10 py-3 px-4 rounded-xl font-bold text-sm">
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>

            {/* Neighborhood Grid */}
            <div className="lg:col-span-3">
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-brand-dark mb-4">
                  {ilce.name} Mahalle Listesi
                </h2>
                <p className="text-gray-600">
                  Aşağıdaki listeden mahallenizi seçerek o bölgeye özel teknik servis sayfamıza ulaşabilir ve detaylı bilgi alabilirsiniz.
                </p>
              </div>

              <div className="mb-10 rounded-3xl bg-brand-light p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-brand-dark mb-4">{ilce.name} hizmet türleri</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
                  {klimaServicePages.map((service) => (
                    <Link
                      key={service.slug}
                      href={`/${ilce.slug}-${service.landingSlug}`}
                      className="rounded-2xl bg-white border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 hover:text-brand-red hover:border-brand-red/30 transition-colors"
                    >
                      {service.shortTitle}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {ilce.mahalleler.map((mahalle) => (
                  <Link 
                    key={mahalle.slug}
                    href={`/${ilce.slug}/${mahalle.slug}-klima-servisi`}
                    className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl hover:border-brand-red/20 hover:shadow-md transition-all group shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:text-brand-red transition-colors">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <span className="font-medium text-gray-700 group-hover:text-brand-dark">
                        {mahalle.name}
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-brand-red transition-all group-hover:translate-x-1" />
                  </Link>
                ))}
              </div>

              <div className="mt-12 p-8 bg-brand-light rounded-3xl border border-gray-200">
                <h3 className="text-xl font-bold mb-4">{ilce.name} Sakinleri İçin Teknik Servis Çözümleri</h3>
                <div className="prose prose-gray text-gray-600 max-w-none">
                  <p>
                    {ilce.name} ilçesinin her bir köşesine, merkezden en uzak mahallelerine kadar uzman teknik ekiplerimizle hizmet ulaştırıyoruz. Klima bakımı, arıza tamiri, gaz dolumu ve montaj işlemlerinin yanı sıra; çamaşır makinesi, buzdolabı ve bulaşık makinesi gibi beyaz eşyalarınız için de 1 yıl garantili servis desteği sağlıyoruz.
                  </p>
                  <p>
                    Mobil servis ağımız sayesinde {ilce.name} bölgesinden gelen talepleri aynı gün içerisinde karşılıyor, orijinal yedek parça desteği ile cihazlarınızın ömrünü uzatıyoruz.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <ContactCTA />
    </div>
  );
}
