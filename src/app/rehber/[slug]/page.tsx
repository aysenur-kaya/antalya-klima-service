import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, MessageCircle, Phone } from "lucide-react";
import JsonLd from "@/components/seo/JsonLd";
import ContactCTA from "@/components/sections/ContactCTA";
import MarkdownArticleBody from "@/components/blog/MarkdownArticleBody";
import { buildMetadata } from "@/lib/metadata";
import { CONTACT_INFO } from "@/lib/constants";
import { buildGuideWhatsappMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import { buildArticleSchema, buildBreadcrumbSchema } from "@/lib/schema";
import {
  getPublishedRehberBySlug,
  getRelatedRehberPosts,
  rehberCategoryLabel,
} from "@/lib/blog/public";
import { formatRehberDate } from "@/lib/blog/format";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedRehberBySlug(slug);
  if (!post) {
    return { title: "Rehber Bulunamadı" };
  }
  return buildMetadata({
    title: post.title,
    description: post.summary ?? `${post.title} — İzmir klima ve beyaz eşya teknik rehberi.`,
    path: `/rehber/${post.slug}`,
    type: "article",
  });
}

export default async function RehberDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPublishedRehberBySlug(slug);
  if (!post) {
    notFound();
  }

  const related = await getRelatedRehberPosts(post.slug, post.category);
  const h1Text = post.title.split("|")[0].trim();
  const guideWaHref = buildWhatsAppUrl(buildGuideWhatsappMessage(h1Text));
  const datePublished = post.publishedAt ?? post.createdAt;
  const dateModified = post.updatedAt;

  const breadcrumbItems = [
    { name: "Ana Sayfa", path: "/" },
    { name: "Teknik rehber", path: "/rehber" },
    { name: h1Text, path: `/rehber/${post.slug}` },
  ];

  const articleSchema = buildArticleSchema({
    headline: post.title,
    description: post.summary ?? h1Text,
    path: `/rehber/${post.slug}`,
    datePublished: datePublished.slice(0, 10),
    dateModified: dateModified.slice(0, 10),
  });

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={buildBreadcrumbSchema(breadcrumbItems)} />

      <article className="bg-white min-h-screen">
        <header className="relative premium-gradient text-neutral-900 pt-[128px] pb-14 lg:pt-[164px] lg:pb-20 overflow-hidden border-b border-gray-200">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[640px] bg-brand-red/[0.021] blur-[130px] rounded-full pointer-events-none" />
          <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-4xl">
            <nav aria-label="Breadcrumb" className="text-xs md:text-sm text-neutral-500 mb-6">
              <ol className="flex flex-wrap gap-x-2 gap-y-1">
                <li>
                  <Link href="/" className="hover:text-brand-red transition-colors">
                    Ana Sayfa
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li>
                  <Link href="/rehber" className="hover:text-brand-red transition-colors">
                    Teknik rehber
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li className="text-neutral-700 line-clamp-1">{h1Text}</li>
              </ol>
            </nav>
            <p className="text-sm font-semibold text-brand-red mb-3 uppercase tracking-wide">
              {rehberCategoryLabel(post.category)}
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold tracking-tight leading-tight mb-4 text-neutral-900">
              {h1Text}
            </h1>
            {post.summary ? (
              <p className="text-lg text-neutral-600 leading-relaxed">{post.summary}</p>
            ) : null}
            <p className="mt-4 text-sm text-neutral-500">
              <time dateTime={post.createdAt}>{formatRehberDate(post.createdAt)}</time>
              <span className="mx-2" aria-hidden>
                ·
              </span>
              <code className="text-xs text-neutral-400">/rehber/{post.slug}</code>
            </p>
          </div>
        </header>

        <div className="container mx-auto px-4 md:px-6 max-w-4xl py-12 md:py-16 space-y-12">
          <section aria-labelledby="rehber-content">
            <MarkdownArticleBody content={post.content ?? ""} />
          </section>

          <section
            aria-labelledby="natural-cta-heading"
            className="rounded-2xl border border-gray-200 bg-brand-light/60 p-5 md:p-6"
          >
            <h2 id="natural-cta-heading" className="text-lg font-bold text-brand-dark mb-3">
              Sorun sürüyor mu?
            </h2>
            <p className="text-sm md:text-[15px] text-gray-700 leading-relaxed mb-4">
              Rehber adımları yeterli değilse veya emin değilseniz cihazı zorlamadan teknik destek alın.
              Kısa bir arıza notuyla WhatsApp üzerinden yönlendirme alabilirsiniz.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3">
              <a
                href={`tel:${CONTACT_INFO.phone}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-red px-5 py-3.5 text-sm font-bold text-white hover:bg-[#9f1414] transition-colors"
              >
                <Phone className="w-4 h-4" aria-hidden />
                Hemen Ara
              </a>
              <a
                href={guideWaHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-brand-red bg-white px-5 py-3.5 text-sm font-bold text-brand-red hover:bg-red-50 transition-colors"
              >
                <MessageCircle className="w-4 h-4" aria-hidden />
                WhatsApp&apos;tan Yaz
              </a>
            </div>
          </section>

          {related.length > 0 ? (
            <section aria-labelledby="similar-guides" className="rounded-3xl border border-gray-200 bg-brand-light p-6 md:p-8">
              <h2 id="similar-guides" className="text-xl font-bold text-brand-dark mb-4">
                Benzer rehberler
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

        <ContactCTA
          headline="Teknik destek ve servis planlaması"
          description="İzmir genelinde klima ve beyaz eşya için ekip yönlendirmesi almak üzere bize ulaşın."
          whatsappPrefill={buildGuideWhatsappMessage(h1Text)}
          primaryButtonLabel="Servis Talebi Oluştur"
          secondaryButtonLabel="WhatsApp'tan Yaz"
        />
      </article>
    </>
  );
}
