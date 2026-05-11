import { Phone, MessageCircle, CheckCircle2 } from "lucide-react";
import { CONTACT_INFO } from "@/lib/constants";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export default function HeroSection({
  title,
  subtitle,
  primaryCtaText = "Hemen Ara",
  secondaryCtaText = "WhatsApp'tan Yaz",
  whatsappPrefill,
  responseHint,
}: {
  title: string;
  subtitle: string;
  primaryCtaText?: string;
  secondaryCtaText?: string;
  /** WhatsApp `text=` ön doldurma; verilmezse yalnızca CONTACT_INFO.whatsapp kullanılır */
  whatsappPrefill?: string;
  /** Kahraman altı kısa güven/dönüş notu (isteğe bağlı) */
  responseHint?: string;
}) {
  const waHref = buildWhatsAppUrl(whatsappPrefill);

  return (
    <section className="relative premium-gradient text-white pt-[128px] pb-20 lg:pt-[164px] lg:pb-32 overflow-hidden border-b border-white/10">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-red/20 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-white font-medium text-sm mb-6 shadow-sm border border-white/25">
            <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse shadow-[0_0_8px_rgba(200,30,30,0.8)]"></span>
            {"Antalya'nın Güvenilir Servisi"}
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight text-white drop-shadow-sm">
            {title}
          </h1>
          
          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed md:leading-loose">
            {subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-6">
            <a href={`tel:${CONTACT_INFO.phone}`} className="w-full sm:w-auto bg-brand-red hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all hover:scale-105 shadow-[0_10px_28px_rgba(200,30,30,0.45)] text-lg border border-white/10">
              <Phone className="w-6 h-6" aria-hidden />
              {primaryCtaText}
            </a>
            <a
              href={waHref}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto bg-transparent border-2 border-white text-white hover:bg-white hover:text-brand-dark px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all hover:scale-105 shadow-[0_6px_24px_rgba(255,255,255,0.08)] text-lg"
            >
              <MessageCircle className="w-6 h-6 shrink-0" aria-hidden />
              {secondaryCtaText}
            </a>
          </div>

          {responseHint ? (
            <p className="text-sm text-white/70 max-w-xl mx-auto leading-relaxed mb-10">
              {responseHint}
            </p>
          ) : (
            <div className="mb-10" />
          )}
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-white/80 font-medium">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-brand-red shrink-0" aria-hidden />
              <span>Aynı gün servis imkânı</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-brand-red shrink-0" aria-hidden />
              <span>Hızlı iletişim</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-brand-red shrink-0" aria-hidden />
              <span>Deneyimli ekip</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
