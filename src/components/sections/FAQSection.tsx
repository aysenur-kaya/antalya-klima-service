"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { buildWhatsAppUrl, WHATSAPP_PREFILL_GENERAL } from "@/lib/whatsapp";
import JsonLd from "@/components/seo/JsonLd";
import { getDefaultPageFaqs, type FaqItem } from "@/lib/faqs";
import { buildFaqSchema } from "@/lib/schema";

type FAQSectionProps = {
  /** Verilmezse genel SSS görünür içerik olarak kullanılır */
  faqs?: FaqItem[];
  /**
   * FAQPage JSON-LD: varsayılan SSS ile gereksiz tekrarı önlemek için yalnızca
   * `faqs` verildiğinde veya açıkça true yapıldığında basılır (örn. ana sayfa, rehber).
   * Programmatic catch-all ve ilçe hub’larında allowlist (yüksek değer / indexable)
   * mantığı çağıran sayfada `includeFaqJsonLd` ile kontrol edilir.
   */
  includeFaqJsonLd?: boolean;
};

export default function FAQSection({ faqs: faqsProp, includeFaqJsonLd }: FAQSectionProps) {
  const faqs = faqsProp ?? getDefaultPageFaqs();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const emitJsonLd =
    faqs.length > 0 &&
    includeFaqJsonLd !== false &&
    (faqsProp !== undefined || includeFaqJsonLd === true);

  return (
    <section className="py-20 bg-white" aria-labelledby="faq-heading">
      {emitJsonLd ? <JsonLd data={buildFaqSchema(faqs)} /> : null}

      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 id="faq-heading" className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
              Sıkça Sorulan Sorular
            </h2>
            <p className="text-gray-600">
              Aklınıza takılan soruların cevaplarını burada bulabilirsiniz.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const expanded = openIndex === idx;
              const panelId = `faq-panel-${idx}`;
              const triggerId = `faq-trigger-${idx}`;
              return (
                <div
                  key={`${faq.question}-${idx}`}
                  className="border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300"
                >
                  <button
                    id={triggerId}
                    type="button"
                    className="w-full px-6 py-4 text-left flex items-center justify-between bg-white hover:bg-gray-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red/50 focus-visible:ring-offset-2"
                    onClick={() => setOpenIndex(expanded ? null : idx)}
                    aria-expanded={expanded}
                    aria-controls={panelId}
                  >
                    <span className="font-bold text-lg text-brand-dark pr-4">{faq.question}</span>
                    <ChevronDown
                      className={cn(
                        "w-5 h-5 text-brand-red transition-transform duration-300 shrink-0",
                        expanded ? "rotate-180" : ""
                      )}
                      aria-hidden
                    />
                  </button>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={triggerId}
                    className={cn(
                      "px-6 overflow-hidden transition-all duration-300 ease-in-out",
                      expanded ? "max-h-[28rem] pb-4 opacity-100" : "max-h-0 opacity-0"
                    )}
                  >
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <p className="text-gray-600 mb-4">Başka bir sorunuz mu var?</p>
            <a
              href={buildWhatsAppUrl(WHATSAPP_PREFILL_GENERAL)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-brand-red font-bold hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red/40 focus-visible:rounded-sm"
            >
              {"WhatsApp'tan Yaz →"}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
