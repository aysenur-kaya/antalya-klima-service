import { Phone, MessageCircle, Zap } from "lucide-react";
import { CONTACT_INFO } from "@/lib/constants";

export default function ContactCTA() {
  return (
    <section className="py-10 md:py-12 bg-white" id="iletisim">
      <div className="container mx-auto px-4 md:px-6">
        <div className="relative rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.18)]"
          style={{ background: "linear-gradient(135deg, #141414 0%, #1c1212 60%, #200c0c 100%)" }}
        >
          {/* Subtle glow */}
          <div className="absolute top-1/2 -translate-y-1/2 left-1/3 w-80 h-32 bg-brand-red/12 blur-[60px] rounded-full pointer-events-none" />
          {/* Top hairline */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-red/35 to-transparent pointer-events-none" />
          {/* Left accent bar */}
          <div className="absolute left-0 top-4 bottom-4 w-[3px] bg-gradient-to-b from-transparent via-brand-red/60 to-transparent rounded-full pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6 px-7 py-7 md:px-10 md:py-8">

            {/* Left — text content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-2">
                <Zap className="w-3.5 h-3.5 text-brand-red fill-brand-red shrink-0" />
                <span className="text-[11px] font-bold uppercase tracking-[0.13em] text-brand-red">
                  Hızlı Teknik Destek
                </span>
              </div>
              <p className="text-base md:text-lg font-bold text-white leading-snug mb-1">
                Antalya genelinde aynı gün klima servisi desteği alın.
              </p>
              <p className="text-xs text-gray-500">
                Uzman ekip&nbsp;&nbsp;•&nbsp;&nbsp;Garantili işçilik&nbsp;&nbsp;•&nbsp;&nbsp;Hızlı müdahale
              </p>
            </div>

            {/* Divider (desktop only) */}
            <div className="hidden md:block w-px self-stretch bg-white/8 mx-2 shrink-0" />

            {/* Right — CTA buttons */}
            <div className="flex flex-col sm:flex-row md:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <a
                href={`tel:${CONTACT_INFO.phone}`}
                className="group inline-flex items-center justify-center gap-2 bg-brand-red hover:bg-red-700 text-white px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-[1.04] shadow-[0_4px_16px_rgba(200,30,30,0.3)] hover:shadow-[0_8px_24px_rgba(200,30,30,0.45)] whitespace-nowrap"
              >
                <Phone className="w-4 h-4 transition-transform group-hover:rotate-12 duration-300 shrink-0" />
                Hemen Ara
              </a>
              <a
                href={CONTACT_INFO.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center justify-center gap-2 bg-white/8 hover:bg-[#25D366] border border-white/12 hover:border-transparent text-gray-300 hover:text-white px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_8px_24px_rgba(37,211,102,0.3)] whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4 shrink-0" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
