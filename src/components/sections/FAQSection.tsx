"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { CONTACT_INFO } from "@/lib/constants";
import JsonLd from "@/components/seo/JsonLd";
import { getDefaultPageFaqs, type FaqItem } from "@/lib/faqs";
import { buildFaqSchema } from "@/lib/schema";

type FAQSectionProps = {
  /** Verilmezse genel SSS; verilirse görünür içerik ve FAQPage schema aynı kaynaktan üretilir */
  faqs?: FaqItem[];
};

export default function FAQSection({ faqs: faqsProp }: FAQSectionProps) {
  const faqs = faqsProp ?? getDefaultPageFaqs();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 bg-white">
      <JsonLd data={buildFaqSchema(faqs)} />

      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
              Sıkça Sorulan Sorular
            </h2>
            <p className="text-gray-600">
              Aklınıza takılan soruların cevaplarını burada bulabilirsiniz.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={`${faq.question}-${idx}`}
                className="border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300"
              >
                <button
                  type="button"
                  className="w-full px-6 py-4 text-left flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                >
                  <span className="font-bold text-lg text-brand-dark pr-4">{faq.question}</span>
                  <ChevronDown
                    className={cn(
                      "w-5 h-5 text-brand-red transition-transform duration-300 shrink-0",
                      openIndex === idx ? "rotate-180" : ""
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "px-6 overflow-hidden transition-all duration-300 ease-in-out",
                    openIndex === idx ? "max-h-[28rem] pb-4 opacity-100" : "max-h-0 opacity-0"
                  )}
                >
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="text-gray-600 mb-4">Başka bir sorunuz mu var?</p>
            <a href={CONTACT_INFO.whatsapp} className="inline-flex items-center gap-2 text-brand-red font-bold hover:underline">
              {"WhatsApp'tan Bize Ulaşın →"}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
