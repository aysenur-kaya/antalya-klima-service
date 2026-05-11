import { Phone, MessageCircle, Zap } from "lucide-react";
import { CONTACT_INFO } from "@/lib/constants";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export default function ContactCTA(
  props?: {
    headline?: string;
    description?: string;
    whatsappPrefill?: string;
    primaryButtonLabel?: string;
    secondaryButtonLabel?: string;
  }
) {
  const {
    headline = "Size en yakın teknik ekibi yönlendirelim.",
    description = "Servis talebi oluşturmak için arayın veya WhatsApp üzerinden kısa arıza notu ve adres paylaşın.",
    whatsappPrefill,
    primaryButtonLabel = "Hemen Ara",
    secondaryButtonLabel = "WhatsApp'tan Yaz",
  } = props ?? {};

  const waHref = buildWhatsAppUrl(whatsappPrefill);

  return (
    <section
      id="iletisim"
      aria-label="Servis talebi ve iletişim"
      className="py-10 md:py-14 bg-brand-light border-t border-gray-200"
    >
      <div className="container mx-auto px-4 md:px-6 max-w-full">
        <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_75%_55%_at_85%_0%,rgba(200,30,30,0.06),transparent_55%)]"
          />
          <div
            aria-hidden
            className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-red/40 to-transparent"
          />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center gap-7 lg:gap-10 px-6 py-8 md:px-10 md:py-10 min-w-0">
            <div className="flex-1 min-w-0">
              <div className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-3 py-1 mb-4">
                <Zap className="w-3.5 h-3.5 text-brand-red shrink-0 fill-brand-red" aria-hidden />
                <span className="text-[11px] font-black uppercase tracking-[0.16em] text-brand-red">
                  Hızlı Teknik Destek
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl md:text-[1.65rem] font-bold text-neutral-900 leading-snug mb-3">
                {headline}
              </h2>

              <p className="text-sm md:text-[15px] text-neutral-600 leading-relaxed mb-4 max-w-xl">{description}</p>

              <p className="text-xs sm:text-[13px] text-neutral-500 font-medium leading-relaxed mb-4 max-w-xl">
                Telefon ve WhatsApp üzerinden genellikle kısa sürede geri dönüş sağlanır; yoğunluğa ve uygunluk durumuna göre süre
                değişebilir.
              </p>

              <p className="text-xs sm:text-[13px] text-neutral-500 font-medium leading-relaxed">
                Aynı gün servis imkânı&nbsp;&nbsp;•&nbsp;&nbsp;Şeffaf bilgilendirme &nbsp;&nbsp;•&nbsp;&nbsp;Antalya geneli
                yönlendirme
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 sm:gap-3 shrink-0 w-full lg:w-auto lg:min-w-[220px]">
              <a
                href={`tel:${CONTACT_INFO.phone}`}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-red px-5 py-3.5 text-sm font-bold text-white shadow-md shadow-brand-red/20 transition-all duration-200 hover:bg-[#9f1414] active:scale-[0.98] sm:py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red/40 focus-visible:ring-offset-2"
              >
                <Phone className="h-4 w-4 shrink-0" aria-hidden />
                {primaryButtonLabel}
              </a>
              <a
                href={waHref}
                target="_blank"
                rel="noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-brand-red bg-white px-5 py-3.5 text-sm font-bold text-brand-red transition-all duration-200 hover:bg-red-50 active:scale-[0.98] sm:py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red/30 focus-visible:ring-offset-2"
              >
                <MessageCircle className="h-4 w-4 shrink-0" aria-hidden />
                {secondaryButtonLabel}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
