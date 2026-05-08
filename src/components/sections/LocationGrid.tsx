import Link from "next/link";
import { MapPin } from "lucide-react";
import { Ilce } from "@/lib/data";

export default function LocationGrid({
  locations,
  basePath,
  title = "Hizmet Bölgelerimiz",
  subtitle = "Antalya'nın tüm noktalarına hızlı ve kesintisiz servis hizmeti ulaştırıyoruz."
}: {
  locations: { name: string, slug: string }[];
  basePath: string;
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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {locations.map((loc, idx) => (
            <Link
              key={idx}
              href={`${basePath}/${loc.slug}-klima-servisi`} // Modify dynamically depending on the route later, but for now we link to klima as default or use a generic path if provided
              className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-brand-red hover:shadow-md transition-all group"
            >
              <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-brand-red group-hover:bg-brand-red group-hover:text-white transition-colors">
                <MapPin className="w-4 h-4" />
              </div>
              <span className="font-medium text-gray-700 group-hover:text-brand-dark">
                {loc.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
