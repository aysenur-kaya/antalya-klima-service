import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import HeroSection from "@/components/sections/HeroSection";
import ContactCTA from "@/components/sections/ContactCTA";
import JsonLd from "@/components/seo/JsonLd";
import ServiceProcessSection from "@/components/sections/ServiceProcessSection";
import LocalTrustStrip from "@/components/sections/LocalTrustStrip";
import ContextTestimonials from "@/components/sections/ContextTestimonials";
import { SITE_URL } from "@/lib/constants";
import { allServicePages, getServicePageBySlug } from "@/lib/services";
import { getTestimonialsForContext } from "@/lib/testimonials";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return allServicePages.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServicePageBySlug(slug);

  if (!service) {
    return { title: "Hizmet Bulunamadı" };
  }

  return {
    title: `${service.title} | Antalya Servisi`,
    description: `${service.title} için Antalya genelinde aynı gün, garantili ve profesyonel teknik servis. ${service.summary}`,
    alternates: { canonical: `${SITE_URL}/hizmetler/${service.slug}` },
    openGraph: {
      title: `${service.title} | Antalya Servisi`,
      description: service.summary,
      url: `${SITE_URL}/hizmetler/${service.slug}`,
      type: "article",
    },
  };
}

export default async function HizmetDetayPage({ params }: PageProps) {
  const { slug } = await params;
  const service = getServicePageBySlug(slug);

  if (!service) {
    notFound();
  }

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.summary,
    areaServed: {
      "@type": "City",
      name: "Antalya",
    },
    provider: {
      "@type": "LocalBusiness",
      name: "Antalya Servisi",
      url: SITE_URL,
    },
  };

  const stories = getTestimonialsForContext({
    serviceName: service.title,
    serviceType: service.type,
    hasBrand: false,
    seed: `hizmet-${service.slug}`,
    count: 2,
  });

  return (
    <>
      <JsonLd data={serviceSchema} />
      <HeroSection
        title={`Antalya ${service.title}`}
        subtitle={service.summary}
        primaryCtaText="Servis kaydı için hemen arayın"
        secondaryCtaText="WhatsApp üzerinden hızlı destek alın"
      />

      <LocalTrustStrip />

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <article className="lg:col-span-2">
              <div className="rounded-3xl border border-gray-200 bg-brand-light p-5 md:p-8 mb-8">
                <h2 className="text-3xl font-bold text-brand-dark mb-6">Hizmet kapsamı</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.scope.map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-2xl bg-white p-4 border border-gray-100">
                      <CheckCircle2 className="w-5 h-5 text-brand-red shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="rounded-3xl border border-gray-200 p-5 md:p-8">
                  <p className="text-sm font-bold text-brand-red mb-3">01</p>
                  <h3 className="text-xl font-bold text-brand-dark mb-3">Ne zaman almalısınız?</h3>
                  <p className="text-gray-600 leading-relaxed">{service.whenToCall}</p>
                </div>
                <div className="rounded-3xl border border-gray-200 p-5 md:p-8">
                  <p className="text-sm font-bold text-brand-red mb-3">02</p>
                  <h3 className="text-xl font-bold text-brand-dark mb-3">Süreç nasıl işler?</h3>
                  <p className="text-gray-600 leading-relaxed">{service.process}</p>
                </div>
              </div>

              <div className="rounded-3xl border border-gray-200 p-5 md:p-8">
                <h3 className="text-2xl font-bold text-brand-dark mb-4">İlgili aramalar</h3>
                <div className="flex flex-wrap gap-3">
                  {service.keywords.map((keyword) => (
                    <span key={keyword} className="rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-brand-red">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </article>

            <aside className="space-y-6">
              <div className="rounded-3xl bg-brand-dark text-white p-6 md:p-8">
                <h3 className="text-xl font-bold mb-3">Antalya geneli hizmet</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  Bu hizmet için şehir geneli sayfaya geçerek servis talebi oluşturabilir veya bölge seçebilirsiniz.
                </p>
                <Link
                  href={`/antalya-${service.landingSlug}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-brand-red px-5 py-3 text-sm font-bold"
                >
                  Antalya {service.shortTitle} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="rounded-3xl border border-gray-200 p-6 md:p-8">
                <h3 className="text-xl font-bold text-brand-dark mb-4">Sonraki adımlar</h3>
                <div className="flex flex-col gap-3">
                  <Link href="/servis" className="text-sm font-semibold text-gray-700 hover:text-brand-red">
                    Marka sayfalarını incele
                  </Link>
                  <Link href="/antalya" className="text-sm font-semibold text-gray-700 hover:text-brand-red">
                    İlçe ve mahalleleri gör
                  </Link>
                  <Link href="/bolgeler" className="text-sm font-semibold text-gray-700 hover:text-brand-red">
                    Bölge dizinine git
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <ServiceProcessSection />

      <ContextTestimonials items={stories} />

      <ContactCTA />
    </>
  );
}
