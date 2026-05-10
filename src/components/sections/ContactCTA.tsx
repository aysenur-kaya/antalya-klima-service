import { Phone, MessageCircle, Zap } from "lucide-react";
import { CONTACT_INFO } from "@/lib/constants";

/**
 * Slim conversion band — NOT a hero section.
 * Full-bleed dark strip with border separators.
 * Desktop: single row  [ label | pipe | text ] [ Ara ] [ WA ]
 * Mobile:  stacked     [ label + text ] [ Ara  WhatsApp ]
 */
export default function ContactCTA() {
  return (
    <section
      id="iletisim"
      aria-label="İletişim — hızlı erişim"
      className="relative overflow-hidden border-y border-white/[0.08]"
      style={{
        background:
          "linear-gradient(to right, #080c15 0%, #0f1624 40%, #111827 60%, #080c15 100%)",
      }}
    >
      {/* Hairline top accent */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(200,30,30,0.55) 30%, rgba(200,30,30,0.55) 55%, transparent 100%)",
        }}
      />

      {/* Ambient glow — tiny, centred, far below hero-sized */}
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-10 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(200,30,30,0.14) 0%, transparent 70%)",
        }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0 py-4 md:py-[13px]">

          {/* ── Label ── */}
          <div className="flex items-center gap-1.5 shrink-0 sm:pr-4 sm:mr-4 sm:border-r sm:border-white/[0.10]">
            <Zap
              className="w-3 h-3 text-orange-400 fill-orange-400 shrink-0"
              aria-hidden
            />
            <span className="text-[10px] font-black uppercase tracking-[0.18em] text-orange-400 whitespace-nowrap leading-none">
              Hızlı Teknik Destek
            </span>
          </div>

          {/* ── Copy ── */}
          <div className="flex-1 min-w-0 sm:pr-6">
            <p className="text-[13px] md:text-sm font-bold text-white leading-snug">
              Antalya genelinde aynı gün klima servisi desteği alın.
            </p>
            <p className="text-[10px] text-gray-500 mt-0.5 leading-none">
              Uzman ekip&nbsp;·&nbsp;Garantili işçilik&nbsp;·&nbsp;Hızlı müdahale
            </p>
          </div>

          {/* ── Buttons ── */}
          {/* flex-1 on each button → equal share of full width on mobile
              sm:flex-none   → auto-width on sm+ */}
          <div className="flex items-stretch gap-2 w-full sm:w-auto shrink-0">
            <a
              href={`tel:${CONTACT_INFO.phone}`}
              className="
                flex-1 sm:flex-none
                flex items-center justify-center gap-1.5
                bg-brand-red hover:bg-red-700
                text-white text-[13px] font-bold
                px-4 py-2 rounded-lg
                transition-all duration-150 active:scale-95
                shadow-[0_3px_12px_rgba(200,30,30,0.30)]
                whitespace-nowrap
              "
            >
              <Phone className="w-3.5 h-3.5 shrink-0" aria-hidden />
              Hemen Ara
            </a>

            <a
              href={CONTACT_INFO.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="
                flex-1 sm:flex-none
                flex items-center justify-center gap-1.5
                bg-[#25D366] hover:bg-[#20b858]
                text-white text-[13px] font-bold
                px-4 py-2 rounded-lg
                transition-all duration-150 active:scale-95
                shadow-[0_3px_12px_rgba(37,211,102,0.20)]
                whitespace-nowrap
              "
            >
              <MessageCircle className="w-3.5 h-3.5 shrink-0" aria-hidden />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
