import React from "react";
import { Phone, MessageCircle, MapPin, Clock } from "lucide-react";
import { CONTACT_INFO } from "@/lib/constants";

export const metadata = {
  title: "İletişim | Antalya Servisi",
  description: "Antalya klima ve beyaz eşya servisi için bize ulaşın. 7/24 teknik destek ve servis kaydı hattı.",
};

export default function IletisimPage() {
  return (
    <div className="bg-white min-h-screen">
      <section className="py-20 bg-brand-dark text-white text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">İletişim</h1>
          <p className="text-gray-400">Size yardımcı olmak için buradayız.</p>
        </div>
      </section>
      
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-brand-light p-8 rounded-3xl text-center border border-gray-100">
              <div className="w-16 h-16 bg-brand-red/10 rounded-2xl flex items-center justify-center text-brand-red mx-auto mb-6">
                <Phone className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-xl mb-2">Telefon</h3>
              <a href={`tel:${CONTACT_INFO.phone}`} className="text-brand-red font-bold text-lg hover:underline">
                {CONTACT_INFO.phoneFormatted}
              </a>
            </div>
            
            <div className="bg-brand-light p-8 rounded-3xl text-center border border-gray-100">
              <div className="w-16 h-16 bg-[#25D366]/10 rounded-2xl flex items-center justify-center text-[#25D366] mx-auto mb-6">
                <MessageCircle className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-xl mb-2">WhatsApp</h3>
              <a href={CONTACT_INFO.whatsapp} className="text-[#25D366] font-bold text-lg hover:underline">
                Mesaj Gönder
              </a>
            </div>
            
            <div className="bg-brand-light p-8 rounded-3xl text-center border border-gray-100">
              <div className="w-16 h-16 bg-brand-red/10 rounded-2xl flex items-center justify-center text-brand-red mx-auto mb-6">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-xl mb-2">Adres</h3>
              <p className="text-gray-600">
                {CONTACT_INFO.addressFull}<br />
                Antalya, Türkiye
              </p>
            </div>
            
            <div className="bg-brand-light p-8 rounded-3xl text-center border border-gray-100">
              <div className="w-16 h-16 bg-brand-red/10 rounded-2xl flex items-center justify-center text-brand-red mx-auto mb-6">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-xl mb-2">Çalışma Saatleri</h3>
              <p className="text-gray-600">
                {CONTACT_INFO.workingHours}<br />
                Pazar: Nöbetçi Ekip
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Map Placeholder or Content */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Hizmet Bölgemiz</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-12">
            Antalya&apos;nın Muratpaşa, Konyaaltı, Kepez başta olmak üzere tüm ilçelerine aynı gün servis ulaştırıyoruz. Mobil ekiplerimiz sürekli sahada olup size en yakın teknisyeni yönlendirmekteyiz.
          </p>
          <div className="w-full h-[400px] bg-gray-200 rounded-3xl flex items-center justify-center text-gray-500 font-medium">
            Google Harita Görünümü (İlerleyen aşamada eklenecek)
          </div>
        </div>
      </section>
    </div>
  );
}
