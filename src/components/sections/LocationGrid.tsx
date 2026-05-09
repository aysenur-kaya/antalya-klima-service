import Link from "next/link";
import { MapPin } from "lucide-react";

export default function LocationGrid({
  locations,
  basePath,
  serviceType = "klima",
  title = "Hizmet Bölgelerimiz",
  subtitle = "Antalya'nın tüm noktalarına hızlı ve kesintisiz servis hizmeti ulaştırıyoruz."
}: {
  locations: { name: string, slug: string }[];
  basePath: string;
  serviceType?: "klima" | "beyaz-esya";
  title?: string;
  subtitle?: string;
}) {
  return (
    <section id="tum-bolgeler" className="py-20 bg-brand-light">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
            {title}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
          {locations.map((loc, idx) => (
            <Link
              key={idx}
              href={`${basePath}/${loc.slug}-${serviceType}-servisi`}
              className="flex items-center gap-3 p-3 md:p-4 bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-200 hover:border-brand-red/40 hover:shadow-[0_10px_25px_rgba(0,0,0,0.08)] transition-all group"
            >
              <div className="w-10 h-10 rounded-full bg-red-50/50 border border-brand-red/5 flex items-center justify-center text-brand-red/70 group-hover:bg-brand-red group-hover:text-white group-hover:shadow-[0_0_15px_rgba(200,30,30,0.3)] transition-all duration-300">
                <MapPin className="w-4 h-4 transition-transform group-hover:scale-110" />
              </div>
              <span className="font-semibold text-gray-700 group-hover:text-brand-dark transition-colors text-sm md:text-base">
                {loc.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
