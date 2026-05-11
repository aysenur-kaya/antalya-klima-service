import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, Link2, MapPin, MessageCircle, Phone, Wrench } from "lucide-react";
import JsonLd from "@/components/seo/JsonLd";
import FAQSection from "@/components/sections/FAQSection";
import ContactCTA from "@/components/sections/ContactCTA";
import { buildMetadata } from "@/lib/metadata";
import { CONTACT_INFO } from "@/lib/constants";
import { buildGuideWhatsappMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import { buildArticleSchema, buildBreadcrumbSchema } from "@/lib/schema";
import { getGuideBySlug, getRelatedGuides, getAllGuideSlugs, type GuideLink } from "@/lib/guides";

const DATE_PUBLISHED = "2026-05-01";
const DATE_MODIFIED = "2026-05-11";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllGuideSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) {
    return { title: "Rehber Bulunamadı" };
  }
  return buildMetadata({
    title: guide.title,
    description: guide.description,
    path: `/rehber/${guide.slug}`,
    type: "article",
  });
}

function LinkColumn({ title, links }: { title: string; links: GuideLink[] }) {
  if (!links.length) return null;
  return (
    <div className="rounded-2xl bg-white border border-gray-200 p-5 md:p-6 shadow-sm">
      <h3 className="text-lg font-bold text-brand-dark mb-4 flex items-center gap-2">
        <Link2 className="w-5 h-5 text-brand-red shrink-0" />
        {title}
      </h3>
      <ul className="flex flex-col gap-2">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-sm font-semibold text-gray-700 hover:text-brand-red transition-colors inline-flex items-center gap-1">
              {l.label}
              <span className="text-brand-red/80" aria-hidden>
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function RehberDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) {
    notFound();
  }

  const related = getRelatedGuides(guide);
  const h1Text = guide.title.split("|")[0].trim();
  const guideWaHref = buildWhatsAppUrl(buildGuideWhatsappMessage(h1Text));

  const breadcrumbItems = [
    { name: "Ana Sayfa", path: "/" },
    { name: "Teknik rehber", path: "/rehber" },
    { name: h1Text, path: `/rehber/${guide.slug}` },
  ];

  const articleSchema = buildArticleSchema({
    headline: guide.title,
    description: guide.description,
    path: `/rehber/${guide.slug}`,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
  });

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={buildBreadcrumbSchema(breadcrumbItems)} />

      <article className="bg-white min-h-screen">
        <header className="relative premium-gradient text-white pt-[128px] pb-14 lg:pt-[164px] lg:pb-20 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[640px] bg-brand-red/12 blur-[130px] rounded-full pointer-events-none" />
          <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-4xl">
            <nav aria-label="Breadcrumb" className="text-xs md:text-sm text-gray-400 mb-6">
              <ol className="flex flex-wrap gap-x-2 gap-y-1">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Ana Sayfa
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li>
                  <Link href="/rehber" className="hover:text-white transition-colors">
                    Teknik rehber
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li className="text-gray-300 line-clamp-1">{h1Text}</li>
              </ol>
            </nav>
            <p className="text-sm font-semibold text-brand-red/90 mb-3 uppercase tracking-wide">{guide.deviceType}</p>
            <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold tracking-tight leading-tight mb-6">{h1Text}</h1>
            <p className="text-lg text-gray-300 leading-relaxed">{guide.intro}</p>
          </div>
        </header>

        <div className="container mx-auto px-4 md:px-6 max-w-4xl py-12 md:py-16 space-y-12">
          <section aria-labelledby="symptoms-heading">
            <h2 id="symptoms-heading" className="text-xl font-bold text-brand-dark mb-3">
              Sık görülen belirtiler
            </h2>
            <ul className="flex flex-wrap gap-2">
              {guide.symptoms.map((s) => (
                <li key={s} className="rounded-full bg-brand-light border border-gray-200 px-3 py-1 text-sm font-medium text-gray-700">
                  {s}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="causes-heading">
            <h2 id="causes-heading" className="text-2xl font-bold text-brand-dark mb-6 flex items-center gap-2">
              <Wrench className="w-6 h-6 text-brand-red shrink-0" />
              Olası nedenler
            </h2>
            <div className="space-y-5">
              {guide.causes.map((c, i) => (
                <div key={c.heading} className="rounded-2xl border border-gray-100 bg-brand-light/50 p-5 md:p-6">
                  <p className="text-xs font-black text-brand-red mb-2 tabular-nums">{(i + 1).toString().padStart(2, "0")}</p>
                  <h3 className="text-lg font-bold text-brand-dark mb-2">{c.heading}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm md:text-[15px]">{c.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section
            aria-labelledby="natural-cta-heading"
            className="rounded-2xl border border-gray-200 bg-brand-light/60 p-5 md:p-6"
          >
            <h2 id="natural-cta-heading" className="text-lg font-bold text-brand-dark mb-3">
              Sorun sürüyor mu?
            </h2>
            <p className="text-sm md:text-[15px] text-gray-700 leading-relaxed mb-4">
              Sorun devam ediyorsa cihazı zorlamadan teknik destek almanız daha güvenli olur. İlgili hizmet
              sayfasından süreci netleştirebilir veya kısa bir arıza notuyla WhatsApp üzerinden yönlendirme
              alabilirsiniz.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3">
              {guide.relatedServiceLinks[0] ? (
                <Link
                  href={guide.relatedServiceLinks[0].href}
                  className="inline-flex items-center justify-center rounded-xl bg-white border border-gray-200 px-4 py-3 text-sm font-bold text-brand-dark hover:border-brand-red/40 hover:text-brand-red transition-colors"
                >
                  {guide.relatedServiceLinks[0].label}
                </Link>
              ) : null}
              <a
                href={guideWaHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-xl bg-[#25D366] px-4 py-3 text-sm font-bold text-white hover:bg-[#20b858] transition-colors"
              >
                WhatsApp&apos;tan Yaz
              </a>
            </div>
          </section>

          <section aria-labelledby="checks-heading" className="rounded-3xl border border-gray-200 bg-white p-6 md:p-8 shadow-sm">
            <h2 id="checks-heading" className="text-xl font-bold text-brand-dark mb-4">
              Güvenli kullanıcı kontrolleri
            </h2>
            <p className="text-gray-600 text-sm mb-5 leading-relaxed">
              Aşağıdaki maddeler çoğu cihazda riski düşük kontrollerdir. Kılavuzunuza aykırı ise veya emin değilseniz uygulamayın.
            </p>
            <ul className="space-y-3">
              {guide.userChecks.map((item) => (
                <li key={item} className="flex items-start gap-3 text-gray-700 text-sm md:text-[15px] leading-relaxed">
                  <CheckCircle2 className="w-5 h-5 text-brand-red shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="service-heading" className="rounded-3xl bg-brand-dark text-white p-6 md:p-8">
            <h2 id="service-heading" className="text-xl font-bold mb-4">
              Ne zaman teknik servis gerekir?
            </h2>
            <ul className="space-y-3 mb-8 text-gray-300 text-sm md:text-[15px] leading-relaxed">
              {guide.whenToCallService.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-brand-red font-bold shrink-0">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-gray-400 mb-6">
              Sorun devam ediyorsa veya güvenli şekilde ilerleyemiyorsanız{" "}
              <a href={guideWaHref} target="_blank" rel="noreferrer" className="text-white font-semibold underline underline-offset-2 hover:text-brand-red transition-colors">
                WhatsApp
              </a>{" "}
              üzerinden kısa arıza notu ve adres paylaşabilirsiniz.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`tel:${CONTACT_INFO.phone}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-red px-5 py-3.5 text-sm font-bold hover:bg-red-700 transition-colors"
              >
                <Phone className="w-4 h-4" />
                Hemen Ara
              </a>
              <a
                href={guideWaHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 px-5 py-3.5 text-sm font-bold hover:bg-white/15 transition-colors border border-white/20"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp&apos;tan Yaz
              </a>
            </div>
          </section>

          <section aria-labelledby="related-links" className="space-y-6">
            <h2 id="related-links" className="text-2xl font-bold text-brand-dark">
              İç bağlantılar
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <LinkColumn title="İlgili hizmetler" links={guide.relatedServiceLinks} />
              <LinkColumn title="İlgili marka servisleri" links={guide.relatedBrandLinks} />
              <LinkColumn title="Örnek ilçe servis sayfaları" links={guide.relatedLocationLinks} />
            </div>
          </section>

          {related.length > 0 ? (
            <section aria-labelledby="similar-guides" className="rounded-3xl border border-gray-200 bg-brand-light p-6 md:p-8">
              <h2 id="similar-guides" className="text-xl font-bold text-brand-dark mb-4">
                Benzer arızalar ve konular
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {related.map((g) => (
                  <li key={g.slug}>
                    <Link
                      href={`/rehber/${g.slug}`}
                      className="flex items-center gap-2 rounded-xl bg-white border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 hover:border-brand-red/40 hover:text-brand-red transition-colors"
                    >
                      <MapPin className="w-4 h-4 text-brand-red shrink-0 opacity-70" />
                      <span className="line-clamp-2">{g.title.split("|")[0].trim()}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <p className="text-sm text-gray-500 leading-relaxed border-t border-gray-100 pt-8">
            Bu içerik genel teknik bilgilendirme amaçlıdır; marka ve modele özel farklılıklar olabilir. İşlem öncesi net teşhis için yerinde kontrol gerekir.
          </p>
        </div>

        <FAQSection faqs={guide.faq} />

        <ContactCTA
          headline="Teknik destek ve servis planlaması"
          description="Antalya genelinde klima ve beyaz eşya için ekip yönlendirmesi almak üzere bize ulaşın."
          whatsappPrefill={buildGuideWhatsappMessage(h1Text)}
          primaryButtonLabel="Servis Talebi Oluştur"
          secondaryButtonLabel="WhatsApp'tan Yaz"
        />
      </article>
    </>
  );
}
