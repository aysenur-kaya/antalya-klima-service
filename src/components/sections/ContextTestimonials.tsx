import type { Testimonial } from "@/lib/testimonials";
import { Quote } from "lucide-react";

export default function ContextTestimonials({
  items,
  heading = "Müşteri notları",
  sub = "Kısa geri bildirimler; isimler mahremiyet için baş harf ile gösterilir.",
}: {
  items: Testimonial[];
  heading?: string;
  sub?: string;
}) {
  if (!items.length) return null;

  return (
    <section className="py-16 md:py-20 bg-brand-light">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-3">{heading}</h2>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">{sub}</p>
        </div>
        <div
          className={`grid gap-5 max-w-5xl mx-auto ${items.length >= 3 ? "grid-cols-1 md:grid-cols-3" : "grid-cols-1 md:grid-cols-2"}`}
        >
          {items.map((t) => (
            <blockquote
              key={`${t.name}-${t.quote.slice(0, 24)}`}
              className="rounded-2xl bg-white border border-gray-200 p-6 md:p-7 relative"
            >
              <Quote className="w-8 h-8 text-brand-red/20 absolute top-4 right-4" aria-hidden />
              <p className="text-gray-700 leading-relaxed text-sm md:text-[15px] mb-5 pr-6">“{t.quote}”</p>
              <footer className="text-xs text-gray-500 flex flex-col gap-0.5">
                <span className="font-bold text-brand-dark">{t.name}</span>
                <span className="text-gray-500">{t.context}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
