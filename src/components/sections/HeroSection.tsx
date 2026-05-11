import { Phone, CheckCircle2 } from "lucide-react";
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
    <section className="relative premium-gradient text-white pt-[128px] pb-20 lg:pt-[164px] lg:pb-32 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-red/20 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-brand-red font-medium text-sm mb-6 shadow-sm border border-brand-red/20">
            <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse"></span>
            {"Antalya'nın Güvenilir Servisi"}
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
            {title}
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed md:leading-loose opacity-90">
            {subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-6">
            <a href={`tel:${CONTACT_INFO.phone}`} className="w-full sm:w-auto bg-brand-red hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all hover:scale-105 shadow-[0_10px_20px_rgba(200,30,30,0.3)] text-lg">
              <Phone className="w-6 h-6" aria-hidden />
              {primaryCtaText}
            </a>
            <a
              href={waHref}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20b858] text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all hover:scale-105 shadow-[0_10px_20px_rgba(37,211,102,0.3)] text-lg"
            >
              {secondaryCtaText}
            </a>
          </div>

          {responseHint ? (
            <p className="text-sm text-gray-400 max-w-xl mx-auto leading-relaxed mb-10">
              {responseHint}
            </p>
          ) : (
            <div className="mb-10" />
          )}
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-400 font-medium">
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
