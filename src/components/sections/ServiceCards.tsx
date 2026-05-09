import { Wind, Snowflake, Wrench, Settings, Droplets, Flame } from "lucide-react";
import Link from "next/link";

const services = [
  {
    title: "Klima Bakım",
    desc: "Periyodik klima bakımı ile enerji tasarrufu sağlayın.",
    icon: Wind,
    slug: "klima-bakim-servisi",
    type: "klima"
  },
  {
    title: "Klima Tamir",
    desc: "Arızalı klimalarınız için aynı gün garantili tamir.",
    icon: Wrench,
    slug: "klima-tamir-servisi",
    type: "klima"
  },
  {
    title: "Klima Montaj",
    desc: "Profesyonel ekibimizle güvenli ve temiz klima montajı.",
    icon: Settings,
    slug: "klima-montaj-servisi",
    type: "klima"
  },
  {
    title: "Klima Gaz Dolumu",
    desc: "Klima gazı ölçümü ve eksik gazın tamamlanması.",
    icon: Droplets,
    slug: "klima-gaz-dolumu",
    type: "klima"
  },
  {
    title: "Buzdolabı Servisi",
    desc: "Soğutmama, ses yapma gibi buzdolabı arızalarına çözüm.",
    icon: Snowflake,
    slug: "buzdolabi-servisi",
    type: "beyaz-esya"
  },
  {
    title: "Çamaşır Makinesi",
    desc: "Çamaşır makinesi onarım ve bakım hizmetleri.",
    icon: Settings,
    slug: "camasir-makinesi-servisi",
    type: "beyaz-esya"
  },
  {
    title: "Bulaşık Makinesi",
    desc: "Su almama, temiz yıkamama sorunlarına garantili onarım.",
    icon: Droplets,
    slug: "bulasik-makinesi-servisi",
    type: "beyaz-esya"
  },
  {
    title: "Fırın Servisi",
    desc: "Elektrikli ve gazlı fırın arızaları için uzman destek.",
    icon: Flame,
    slug: "firin-servisi",
    type: "beyaz-esya"
  }
];

export default function ServiceCards({ type, locationSlug }: { type?: string, locationSlug?: string }) {
  const filteredServices = type ? services.filter(s => s.type === type) : services;

  return (
    <section id="hizmetler" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
            Profesyonel Hizmetlerimiz
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            İhtiyacınıza özel, garantili ve aynı gün servis hizmeti sunduğumuz ana kategoriler.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredServices.map((service, idx) => {
            const Icon = service.icon;
            let href = "";
            if (locationSlug) {
              // locationSlug might be 'antalya-klima-servisi' or 'muratpasa'
              const cleanLoc = locationSlug.replace(/-klima-servisi$|-beyaz-esya-servisi$/, "");
              href = `/${cleanLoc}/${service.slug}`;
            } else {
              href = `/antalya-${service.slug}`;
            }
            return (
              <Link
                key={idx}
                href={href}
                className="group p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-red/5 rounded-bl-full -z-10 group-hover:bg-brand-red/10 transition-colors" />
                <div className="w-14 h-14 bg-red-50 text-brand-red rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-brand-dark mb-2 group-hover:text-brand-red transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {service.desc}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
