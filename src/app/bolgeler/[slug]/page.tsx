import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, ChevronRight, Phone, MessageCircle } from "lucide-react";
import { getIlceBySlug, ilceler } from "@/lib/data";
import { SITE_URL, CONTACT_INFO } from "@/lib/constants";
import HeroSection from "@/components/sections/HeroSection";
import ContactCTA from "@/components/sections/ContactCTA";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import JsonLd from "@/components/seo/JsonLd";
import { klimaServicePages } from "@/lib/services";
import { getDistrictHeroSubtitle, getDistrictVoice, getNeighborIlceler } from "@/lib/local-content";
import ServiceProcessSection from "@/components/sections/ServiceProcessSection";
import NearbyAreasSection from "@/components/sections/NearbyAreasSection";
import LocalTrustStrip from "@/components/sections/LocalTrustStrip";
import ContextTestimonials from "@/components/sections/ContextTestimonials";
import FAQSection from "@/components/sections/FAQSection";
import { buildFaqsForDistrict } from "@/lib/faqs";
import { getTestimonialsForContext } from "@/lib/testimonials";
import { buildDistrictPageWhatsappMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

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

  const districtVoice = getDistrictVoice(ilce.slug, ilce.name);
  const neighborBolgeLinks = getNeighborIlceler(ilce.slug, 6).map((n) => ({
    href: `/bolgeler/${n.slug}`,
    label: n.name,
    hint: "Servis bölgeleri ve mahalleler",
  }));
  const districtTestimonials = getTestimonialsForContext({
    serviceName: "Klima Servisi",
    serviceType: "klima",
    hasBrand: false,
    seed: `bolge-${ilce.slug}`,
    count: 2,
  });
  const districtFaqs = buildFaqsForDistrict(ilce.name, ilce.slug);
  const districtWaMsg = buildDistrictPageWhatsappMessage(ilce.name);
  const districtWaHref = buildWhatsAppUrl(districtWaMsg);

  return (
    <div className="bg-white min-h-screen">
      <JsonLd data={breadcrumbSchema as Record<string, unknown>} />
      
      <HeroSection
        title={`${ilce.name} hizmet bölgelerimiz`}
        subtitle={getDistrictHeroSubtitle(ilce.name, ilce.slug)}
        primaryCtaText="Hemen Ara"
        secondaryCtaText="WhatsApp'tan Yaz"
        whatsappPrefill={districtWaMsg}
        responseHint="Telefon ve WhatsApp üzerinden genellikle kısa sürede dönüş sağlanır; yoğunluğa göre süre değişebilir."
      />

      <LocalTrustStrip />

      <WhyChooseUs />

      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-12">
            
            {/* Sidebar Services */}
            <div className="lg:col-span-1 space-y-6 order-2 lg:order-1">
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
                  <a href={districtWaHref} target="_blank" rel="noreferrer" className="flex items-center gap-3 bg-white/10 py-3 px-4 rounded-xl font-bold text-sm">
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp&apos;tan Yaz
                  </a>
                </div>
              </div>
            </div>

            {/* Neighborhood Grid */}
            <div className="lg:col-span-3 order-1 lg:order-2">
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-brand-dark mb-4">
                  {ilce.name} Mahalle Listesi
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  <strong>{ilce.name}</strong> genelinde {ilce.mahalleler.length} mahalle için klima ve beyaz eşya teknik servis yönlendirmesi yapıyoruz. Mahallenize tıklayarak o bölgeye özel sayfadan arıza notunuzu iletebilirsiniz.
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

              <div className="mt-10 p-5 md:p-8 bg-brand-light rounded-3xl border border-gray-200">
                <h3 className="text-xl font-bold mb-4">{ilce.name} için yerinde servis</h3>
                <div className="prose prose-gray text-gray-600 max-w-none">
                  {districtVoice.intro.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <NearbyAreasSection
        title="Yakın ilçeler"
        subtitle="Komşu ilçelerin mahalle listeleri ve servis bağlantılarına buradan geçebilirsiniz."
        links={neighborBolgeLinks}
      />

      <ServiceProcessSection />

      <ContextTestimonials items={districtTestimonials} />

      <FAQSection faqs={districtFaqs} />

      <ContactCTA
        headline={`${ilce.name} için size en yakın teknik ekibi yönlendirelim.`}
        description="Servis kaydı oluşturmak üzere arayın veya WhatsApp üzerinden adres ve arıza notunu paylaşın."
        whatsappPrefill={districtWaMsg}
        primaryButtonLabel="Hemen Ara"
        secondaryButtonLabel="WhatsApp'tan Yaz"
      />
    </div>
  );
}
