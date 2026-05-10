import { Phone, MessageCircle, Zap } from "lucide-react";
import { CONTACT_INFO } from "@/lib/constants";

export default function ContactCTA() {
  return (
    <section
      id="iletisim"
      aria-label="Servis talebi ve iletişim"
      className="py-10 md:py-14 bg-[#F4F4F6]"
    >
      <div className="container mx-auto px-4 md:px-6 max-w-full">
        {/* Premium conversion card — medium height, separated from footer */}
        <div
          className="relative overflow-hidden rounded-3xl border border-white/[0.12] shadow-[0_22px_56px_rgba(0,0,0,0.42)] backdrop-blur-sm"
          style={{
            background:
              "linear-gradient(140deg, rgba(13,17,23,0.97) 0%, rgba(17,24,39,0.98) 45%, rgba(19,15,30,0.98) 100%)",
          }}
        >
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_55%_at_50%_-10%,rgba(200,30,30,0.16),transparent_62%)]"
          />
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none bg-[linear-gradient(120deg,transparent_40%,rgba(251,146,60,0.06)_75%,transparent_95%)]"
          />
          <div
            aria-hidden
            className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-red/55 to-transparent"
          />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center gap-7 lg:gap-10 px-6 py-8 md:px-10 md:py-10 min-w-0">
            {/* Copy */}
            <div className="flex-1 min-w-0">
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/25 bg-orange-500/10 px-3 py-1 mb-4">
                <Zap
                  className="w-3.5 h-3.5 text-orange-400 fill-orange-400 shrink-0"
                  aria-hidden
                />
                <span className="text-[11px] font-black uppercase tracking-[0.16em] text-orange-400">
                  Hızlı Teknik Destek
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl md:text-[1.65rem] font-bold text-white leading-snug mb-3">
                Antalya genelinde aynı gün servis desteği alın.
              </h2>

              <p className="text-sm md:text-[15px] text-gray-400 leading-relaxed mb-5 max-w-xl">
                Klima bakım, tamir, montaj ve arıza talepleriniz için uzman
                ekibimiz hızlıca yanınızda.
              </p>

              <p className="text-xs sm:text-[13px] text-gray-500 font-medium leading-relaxed">
                Aynı Gün Servis&nbsp;&nbsp;•&nbsp;&nbsp;Garantili İşçilik
                &nbsp;&nbsp;•&nbsp;&nbsp;Hızlı Müdahale
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 sm:gap-3 shrink-0 w-full lg:w-auto lg:min-w-[220px]">
              <a
                href={`tel:${CONTACT_INFO.phone}`}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-red px-5 py-3.5 text-sm font-bold text-white shadow-[0_8px_22px_rgba(200,30,30,0.32)] transition-all duration-200 hover:bg-red-700 hover:shadow-[0_10px_28px_rgba(200,30,30,0.38)] active:scale-[0.98] sm:py-3"
              >
                <Phone className="h-4 w-4 shrink-0" aria-hidden />
                Hemen Ara
              </a>
              <a
                href={CONTACT_INFO.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-5 py-3.5 text-sm font-bold text-white shadow-[0_8px_22px_rgba(37,211,102,0.22)] transition-all duration-200 hover:bg-[#20b858] active:scale-[0.98] sm:py-3"
              >
                <MessageCircle className="h-4 w-4 shrink-0" aria-hidden />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
