import Link from "next/link";
import { Brand } from "@/lib/data";

export default function BrandGrid({
  brands,
  basePath,
  title = "Hizmet Verdiğimiz Markalar",
  subtitle = "Alanında uzman ekiplerimizle tüm dünya markalarına garantili servis hizmeti sunuyoruz."
}: {
  brands: Brand[];
  basePath: string;
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
            {title}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          {brands.map((brand, idx) => (
            <Link
              key={idx}
              href={`${basePath}/${brand.slug}-${brand.type}-servisi`}
              className="px-4 py-2 md:px-6 md:py-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:border-brand-red hover:shadow-md hover:text-brand-red font-medium text-gray-700 transition-all text-sm md:text-base"
            >
              {brand.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
