import React from "react";
import ContactCTA from "@/components/sections/ContactCTA";

export const metadata = {
  title: "KVKK Aydınlatma Metni",
  description: "Antalya Servisi Kişisel Verilerin Korunması Kanunu (KVKK) aydınlatma metni.",
};

export default function KVKKPage() {
  return (
    <div className="bg-white min-h-screen">
      <section className="py-20 bg-brand-dark text-white text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">KVKK Aydınlatma Metni</h1>
          <p className="text-gray-400">Verilerinizin güvenliği bizim için önemlidir.</p>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-blue max-w-none text-gray-700">
            <p className="mb-6">
              6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) uyarınca, Antalya Servisi olarak, veri sorumlusu sıfatıyla, kişisel verilerinizin aşağıda açıklanan çerçevede işlenebileceğini bildiririz.
            </p>
            <h2 className="text-2xl font-bold mb-4">1. Kişisel Verilerin İşlenme Amacı</h2>
            <p className="mb-6">
              Kişisel verileriniz; teknik servis hizmetlerimizin sunulması, randevu oluşturulması, müşteri memnuniyetinin takibi ve yasal yükümlülüklerimizin yerine getirilmesi amaçlarıyla işlenmektedir.
            </p>
            <h2 className="text-2xl font-bold mb-4">2. Veri Sahibi Hakları</h2>
            <p className="mb-6">
              KVKK uyarınca kişisel verilerinizin işlenip işlenmediğini öğrenme, işlenmişse bilgi talep etme, silinmesini veya düzeltilmesini isteme haklarına sahipsiniz.
            </p>
            <p>Daha fazla bilgi için bizimle iletişime geçebilirsiniz.</p>
          </div>
        </div>
      </section>
      <ContactCTA />
    </div>
  );
}
