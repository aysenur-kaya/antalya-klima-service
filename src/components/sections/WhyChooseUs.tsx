import { Clock, ShieldCheck, Wrench, ThumbsUp } from "lucide-react";

const features = [
  {
    title: "Hızlı Ulaşım",
    desc: "Antalya'nın her noktasına aynı gün içerisinde hızlı servis imkanı.",
    icon: Clock
  },
  {
    title: "Garantili İşlem",
    desc: "Yaptığımız tüm onarım ve parça değişimleri 1 yıl garantilidir.",
    icon: ShieldCheck
  },
  {
    title: "Deneyimli Ekip",
    desc: "Sertifikalı ve yılların deneyimine sahip uzman teknik kadro.",
    icon: Wrench
  },
  {
    title: "Şeffaf Fiyatlandırma",
    desc: "Sürpriz masraflar yok. İşlem öncesi net fiyat bilgilendirmesi.",
    icon: ThumbsUp
  }
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-brand-dark text-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-red/10 blur-[100px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 blur-[100px] rounded-full" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Neden Bizi Tercih Etmelisiniz?</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {"Müşteri memnuniyeti odaklı çalışma prensibimizle Antalya'da sık tercih edilen servislerden biriyiz."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div key={idx} className="bg-[#1a1a1a] p-8 rounded-2xl border border-white/5 hover:border-brand-red/50 transition-colors">
                <div className="w-16 h-16 rounded-xl bg-brand-red/10 flex items-center justify-center text-brand-red mb-6">
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
