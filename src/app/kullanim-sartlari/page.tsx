import React from "react";
import ContactCTA from "@/components/sections/ContactCTA";

export const metadata = {
  title: "Kullanım Şartları",
  description: "Antalya Servisi web sitesi kullanım şartları ve kuralları.",
};

export default function SartlarPage() {
  return (
    <div className="bg-white min-h-screen">
      <section className="py-20 bg-brand-dark text-white text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Kullanım Şartları</h1>
          <p className="text-gray-400">Sitemizi kullanarak bu şartları kabul etmiş sayılırsınız.</p>
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
              Sitede yer alan tüm içeriklerin telif hakları Antalya Servisi&apos;ne aittir. İzinsiz kullanımı yasaktır.
            </p>
          </div>
        </div>
      </section>
      <ContactCTA />
    </div>
  );
}
