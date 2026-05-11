import { CONTACT_INFO } from "@/lib/constants";

/** Genel servis talebi (sayfa bağlamı yoksa) */
export const WHATSAPP_PREFILL_GENERAL =
  "Merhaba, Antalya'da klima veya beyaz eşya için servis talebi oluşturmak istiyorum. Yardımcı olur musunuz?";

/**
 * WhatsApp sohbet URL'si. `message` verilmezse `CONTACT_INFO.whatsapp` aynen döner.
 * Mesaj varsa güvenli şekilde `text=` query parametresi eklenir.
 */
export function buildWhatsAppUrl(message?: string): string {
  const raw = CONTACT_INFO.whatsapp.trim();
  if (!message?.trim()) return raw;

  try {
    const u = new URL(raw);
    u.searchParams.set("text", message.trim());
    return u.toString();
  } catch {
    const base = raw.split("?")[0];
    return `${base}?text=${encodeURIComponent(message.trim())}`;
  }
}

/** Programatik landing / catch-all sayfaları için kısa, doğal mesaj */
export function buildLandingWhatsappMessage(args: {
  locationText: string;
  serviceName: string;
  brandName?: string;
}): string {
  const { locationText, serviceName, brandName } = args;
  const svc = serviceName.toLowerCase();

  if (brandName) {
    return `Merhaba, ${locationText} bölgesinde ${brandName} ${svc} için destek almak istiyorum.`;
  }

  if (locationText === "Antalya") {
    return `Merhaba, Antalya geneli ${svc} için servis talebi oluşturmak istiyorum.`;
  }

  return `Merhaba, ${locationText} için ${svc} talep etmek istiyorum.`;
}

/** Rehber sayfası: konu başlığına göre */
export function buildGuideWhatsappMessage(guideTitleShort: string): string {
  return `Merhaba, "${guideTitleShort}" konusunda teknik destek almak istiyorum. Antalya'da yardımcı olur musunuz?`;
}

/** İlçe bölge sayfası (/bolgeler/[slug]) */
export function buildDistrictPageWhatsappMessage(districtName: string): string {
  return `Merhaba, ${districtName} bölgesinde klima veya beyaz eşya için servis talebi oluşturmak istiyorum.`;
}

/** İlçe genel fiyat listesi */
export function buildDistrictFiyatListingWhatsappMessage(districtName: string): string {
  return `Merhaba, ${districtName} için klima servisi fiyatı ve servis kaydı hakkında bilgi almak istiyorum.`;
}

/** İlçe + hizmet fiyat sayfası */
export function buildDistrictServiceFiyatWhatsappMessage(
  districtName: string,
  serviceLabel: string
): string {
  return `Merhaba, ${districtName} bölgesinde ${serviceLabel} için fiyat ve servis talebi konusunda bilgi almak istiyorum.`;
}
