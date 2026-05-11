import React from "react";
import ContactCTA from "@/components/sections/ContactCTA";
import { SITE_URL } from "@/lib/constants";

export const metadata = {
  title: "Gizlilik Politikası",
  description: "Antalya Servisi gizlilik politikası ve veri güvenliği bilgilendirmesi.",
  alternates: { canonical: `${SITE_URL}/gizlilik-politikasi` },
};

export default function GizlilikPage() {
  return (
    <div className="bg-white min-h-screen">
      <section className="py-20 bg-brand-light border-b border-gray-200 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4 text-neutral-900">Gizlilik Politikası</h1>
          <p className="text-neutral-600">Gizliliğinizi korumak önceliğimizdir.</p>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-blue max-w-none text-gray-700">
            <p className="mb-6">
              Bu gizlilik politikası, web sitemizi ziyaret ettiğinizde veya hizmetlerimizi kullandığınızda toplanan bilgilerin nasıl kullanıldığını açıklar.
            </p>
            <h2 className="text-2xl font-bold mb-4">Toplanan Bilgiler</h2>
            <p className="mb-6">
              Servis talebi oluşturduğunuzda adınız, telefon numaranız ve adresiniz gibi bilgiler hizmet sunumu için toplanır.
            </p>
            <h2 className="text-2xl font-bold mb-4">Çerezler</h2>
            <p className="mb-6">
              Sitemiz, kullanıcı deneyimini geliştirmek amacıyla standart çerezler kullanmaktadır.
            </p>
          </div>
        </div>
      </section>
      <ContactCTA />
    </div>
  );
}
