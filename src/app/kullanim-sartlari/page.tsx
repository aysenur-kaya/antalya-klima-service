import React from "react";
import ContactCTA from "@/components/sections/ContactCTA";
import { SITE_URL } from "@/lib/constants";

export const metadata = {
  title: "Kullanım Şartları",
  description: "Antalya Servisi web sitesi kullanım şartları ve kuralları.",
  alternates: { canonical: `${SITE_URL}/kullanim-sartlari` },
};

export default function SartlarPage() {
  return (
    <div className="bg-white min-h-screen">
      <section className="py-20 bg-brand-light border-b border-gray-200 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4 text-neutral-900">Kullanım Şartları</h1>
          <p className="text-neutral-600">Sitemizi kullanarak bu şartları kabul etmiş sayılırsınız.</p>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-blue max-w-none text-gray-700">
            <h2 className="text-2xl font-bold mb-4">Hizmet Kapsamı</h2>
            <p className="mb-6">
              Web sitemizde sunulan bilgiler sadece genel bilgilendirme amaçlıdır. Teknik servis hizmetlerimiz yerinde inceleme sonrası netleşmektedir.
            </p>
            <h2 className="text-2xl font-bold mb-4">Fikri Mülkiyet</h2>
            <p className="mb-6">
              {"Sitede yer alan tüm içeriklerin telif hakları Antalya Servisi'ne aittir. İzinsiz kullanımı yasaktır."}
            </p>
          </div>
        </div>
      </section>
      <ContactCTA />
    </div>
  );
}
