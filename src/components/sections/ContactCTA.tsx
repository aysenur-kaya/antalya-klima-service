import { Phone, MessageCircle, Zap, Clock, Shield, Wrench } from "lucide-react";
import { CONTACT_INFO } from "@/lib/constants";

const trustItems = [
  { icon: Clock,   label: "Aynı Gün Servis" },
  { icon: Shield,  label: "Garantili İşçilik" },
  { icon: Wrench,  label: "Hızlı Müdahale" },
];

export default function ContactCTA() {
  return (
    <section
      id="iletisim"
      aria-label="Servis talebi ve iletişim"
      className="py-12 md:py-16 bg-[#F4F4F6]"
    >
      <div className="container mx-auto px-4 md:px-6">
        {/* Premium card */}
        <div
          className="relative overflow-hidden rounded-3xl border border-white/[0.07] shadow-[0_24px_64px_rgba(0,0,0,0.45)]"
          style={{
            background:
              "linear-gradient(135deg, #0d1117 0%, #111827 45%, #130f1e 100%)",
          }}
        >
          {/* Glow — orange-red centre bloom */}
          <div
            aria-hidden
            className="absolute -top-16 left-1/2 -translate-x-1/2 w-[560px] h-48 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse, rgba(200,30,30,0.18) 0%, transparent 68%)",
            }}
          />
          {/* Bottom-right accent */}
          <div
            aria-hidden
            className="absolute bottom-0 right-0 w-64 h-32 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at bottom right, rgba(251,146,60,0.10) 0%, transparent 65%)",
            }}
          />
          {/* Top hairline */}
          <div
            aria-hidden
            className="absolute top-0 left-0 right-0 h-px pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(200,30,30,0.60) 35%, rgba(251,146,60,0.40) 60%, transparent 100%)",
            }}
          />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12 px-7 py-10 md:px-12 md:py-12">

            {/* ── Left: copy ── */}
            <div className="flex-1 min-w-0">
              {/* Label */}
              <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-3 py-1 mb-5">
                <Zap className="w-3.5 h-3.5 text-orange-400 fill-orange-400 shrink-0" aria-hidden />
                <span className="text-[11px] font-black uppercase tracking-[0.16em] text-orange-400">
                  Hızlı Teknik Destek
                </span>
              </div>

              {/* Headline */}
              <h2 className="text-2xl md:text-3xl font-bold text-white leading-snug mb-3">
                Antalya genelinde aynı gün<br className="hidden sm:block" />
                <span className="text-brand-red"> servis desteği</span> alın.
              </h2>

              {/* Supporting text */}
              <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6 max-w-lg">
                Klima bakım, tamir, montaj ve arıza talepleriniz için uzman ekibimiz hızlıca yanınızda.
              </p>

              {/* Trust indicators */}
              <div className="flex flex-wrap gap-x-5 gap-y-2">
                {trustItems.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-1.5">
                    <Icon className="w-3.5 h-3.5 text-orange-400/70 shrink-0" aria-hidden />
                    <span className="text-[12px] text-gray-500 font-medium">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right: buttons ── */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0 lg:min-w-[200px]">
              <a
                href={`tel:${CONTACT_INFO.phone}`}
                className="
                  flex items-center justify-center gap-2
                  bg-brand-red hover:bg-red-700
                  text-white font-bold text-sm
                  px-7 py-4 rounded-2xl
                  transition-all duration-200
                  active:scale-95 hover:scale-[1.02]
                  shadow-[0_8px_24px_rgba(200,30,30,0.35)]
                  whitespace-nowrap
                "
              >
                <Phone className="w-4 h-4 shrink-0" aria-hidden />
                Hemen Ara
              </a>

              <a
                href={CONTACT_INFO.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="
                  flex items-center justify-center gap-2
                  bg-[#25D366] hover:bg-[#20b858]
                  text-white font-bold text-sm
                  px-7 py-4 rounded-2xl
                  transition-all duration-200
                  active:scale-95 hover:scale-[1.02]
                  shadow-[0_8px_24px_rgba(37,211,102,0.25)]
                  whitespace-nowrap
                "
              >
                <MessageCircle className="w-4 h-4 shrink-0" aria-hidden />
                WhatsApp ile Yaz
              </a>

              <p className="text-[11px] text-gray-600 text-center lg:text-center mt-1 hidden lg:block">
                7/24 teknik destek hattı
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
