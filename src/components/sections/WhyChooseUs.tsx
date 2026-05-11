import { Clock, ShieldCheck, Wrench, Headphones, MapPin, BadgeInfo } from "lucide-react";

const features = [
  {
    title: "Aynı gün planlama imkânı",
    desc: "Yoğunluğa bağlı olarak gün içinde veya en yakın uygun slotta servis planlaması hedeflenir.",
    icon: Clock,
  },
  {
    title: "Hızlı telefon ve WhatsApp dönüşü",
    desc: "Talebinizi kısa notla ilettiğinizde uygunluk durumuna göre genellikle kısa sürede geri dönüş sağlanır.",
    icon: Headphones,
  },
  {
    title: "Deneyimli teknik ekip",
    desc: "Sahada sık karşılaşılan arıza senaryolarına alışkın teknisyen yönlendirmesi.",
    icon: Wrench,
  },
  {
    title: "Şeffaf arıza bilgilendirmesi",
    desc: "Teşhis ve önerilen işlem kalemleri sözlü olarak netleştirilir; onayınız olmadan ilerlenmez.",
    icon: BadgeInfo,
  },
  {
    title: "Antalya geneli servis ağı",
    desc: "İlçe ve mahalle bazlı yönlendirme ile adresinize uygun rota seçimi.",
    icon: MapPin,
  },
  {
    title: "İşlem sonrası kontroller",
    desc: "Parça değişimi veya onarım sonrası temel çalışma testi ile süreci kapatma yaklaşımı.",
    icon: ShieldCheck,
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-white relative overflow-hidden border-y border-gray-100">
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-red/[0.04] blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-900">Neden Bizi Seçmelisiniz?</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Karar verirken ihtiyaç duyduğunuz netlik: süreç, iletişim ve bilgilendirme tarafında sade bir çerçeve sunarız.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:border-brand-red/35 hover:shadow-md transition-all"
              >
                <div className="w-16 h-16 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-brand-red mb-6">
                  <Icon className="w-8 h-8" aria-hidden />
                </div>
                <h3 className="text-xl font-bold mb-3 text-neutral-900">{feature.title}</h3>
                <p className="text-neutral-600 leading-relaxed">{feature.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
