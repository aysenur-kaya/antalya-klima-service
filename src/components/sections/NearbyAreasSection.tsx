import Link from "next/link";
import { MapPin } from "lucide-react";

export type NearbyLink = {
  href: string;
  label: string;
  hint?: string;
};

export default function NearbyAreasSection({
  title = "Yakın bölgeler",
  subtitle = "Komşu mahalle ve ilçelerden servis sayfalarına geçiş yapabilirsiniz.",
  links,
}: {
  title?: string;
  subtitle?: string;
  links: NearbyLink[];
}) {
  if (!links.length) return null;

  return (
    <section className="py-16 md:py-20 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-3">{title}</h2>
          <p className="text-gray-600 leading-relaxed">{subtitle}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 max-w-5xl mx-auto">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-start gap-3 rounded-2xl border border-gray-200 bg-brand-light p-4 md:p-5 hover:border-brand-red/35 hover:shadow-md transition-all group"
            >
              <div className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center text-brand-red shrink-0 group-hover:bg-brand-red group-hover:text-white transition-colors">
                <MapPin className="w-4 h-4" aria-hidden />
              </div>
              <div className="min-w-0 text-left">
                <span className="font-bold text-brand-dark group-hover:text-brand-red transition-colors block">
                  {item.label}
                </span>
                {item.hint ? <span className="text-xs text-gray-500 mt-1 block">{item.hint}</span> : null}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
