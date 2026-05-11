import { Clock, Users, MessageCircle, Wrench, MapPin } from "lucide-react";

const items = [
  { icon: Clock, text: "Aynı gün servis imkânı" },
  { icon: MessageCircle, text: "Hızlı telefon ve WhatsApp dönüşü" },
  { icon: Users, text: "Deneyimli teknik ekip" },
  { icon: Wrench, text: "Şeffaf arıza bilgilendirmesi" },
  { icon: MapPin, text: "Antalya geneli servis ağı" },
];

export default function LocalTrustStrip() {
  return (
    <section className="py-10 md:py-12 bg-white border-y border-gray-100">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-4 md:gap-x-10">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.text} className="flex items-center gap-2 text-sm md:text-[15px] text-gray-700 font-medium max-w-[280px]">
                <Icon className="w-4 h-4 text-brand-red shrink-0" aria-hidden />
                <span>{item.text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
