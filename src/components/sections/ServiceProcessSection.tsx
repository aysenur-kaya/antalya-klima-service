import { ClipboardList, Info, Navigation, Stethoscope, BadgeCheck } from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    title: "Talep oluşturma",
    description: "Telefon veya WhatsApp ile arıza notu, adres ve mümkünse cihaz modelini paylaşın.",
  },
  {
    icon: Info,
    title: "Ön bilgilendirme",
    description: "Yoğunluk ve rota uygunluğuna göre yaklaşım penceresi ve sizden istenebilecek ek bilgiler netleştirilir.",
  },
  {
    icon: Navigation,
    title: "Teknik ekip yönlendirme",
    description: "Bölgenize uygun müsait teknisyen atanır; çağrı sırasında süre ve erişim notları konuşulur.",
  },
  {
    icon: Stethoscope,
    title: "Arıza tespiti",
    description: "Yerinde test ve kontrollerle sorun kaynağı belirlenir; bulgular sade şekilde paylaşılır.",
  },
  {
    icon: BadgeCheck,
    title: "Onay sonrası işlem",
    description: "Onayladığınız kalemler uygulanır; parça değişiminde önceden bilgilendirme ve temel test yapılır.",
  },
];

export default function ServiceProcessSection({ className = "" }: { className?: string }) {
  return (
    <section className={`py-16 md:py-20 bg-brand-light border-y border-gray-100 ${className}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">Servis süreci</h2>
          <p className="text-gray-600 leading-relaxed">
            Tüm taleplerde aynı adımları izleriz; sürpriz işlem yapılmaz, onayınız olmadan ilerlenmez.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                className="rounded-2xl bg-white border border-gray-200 p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-black text-brand-red tabular-nums">0{idx + 1}</span>
                  <div className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center text-brand-red">
                    <Icon className="w-5 h-5" aria-hidden />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-brand-dark mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
