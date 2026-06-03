import {
  CONTACT_SERVICE_TOPICS,
  DEFAULT_DISTRICT_LABEL,
  type ContactServiceTopic,
} from "@/lib/contact/constants";

export type ContactFormInput = {
  name: string;
  phone: string;
  service: string;
  message?: string;
  district?: string;
  /** Honeypot — dolu ise bot */
  website?: string;
};

export type ContactFormErrors = Partial<
  Record<
    | "name"
    | "phone"
    | "service"
    | "message"
    | "district"
    | "_form"
    | "adSoyad"
    | "telefon"
    | "konu"
    | "mesaj"
    | "ilce",
    string
  >
>;

export function normalizePhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.startsWith("90") && digits.length >= 12) {
    return digits.slice(2);
  }
  if (digits.startsWith("0") && digits.length >= 11) {
    return digits.slice(1);
  }
  return digits;
}

export function isValidTurkishMobile(digits: string): boolean {
  return /^5\d{9}$/.test(digits);
}

export function validateContactInput(
  input: ContactFormInput
): { ok: true; data: Required<Pick<ContactFormInput, "name" | "phone" | "service" | "message" | "district">> } | { ok: false; errors: ContactFormErrors; error: string; code: string } {
  const errors: ContactFormErrors = {};

  if (input.website?.trim()) {
    return {
      ok: false,
      errors: { _form: "Gönderim reddedildi." },
      error: "Gönderim reddedildi.",
      code: "SPAM",
    };
  }

  const name = input.name?.trim() ?? "";
  if (name.length < 2) {
    errors.name = "Ad soyad en az 2 karakter olmalıdır.";
  } else if (name.length > 120) {
    errors.name = "Ad soyad çok uzun.";
  }

  const phoneDigits = normalizePhone(input.phone ?? "");
  if (!phoneDigits) {
    errors.phone = "Telefon numarası zorunludur.";
  } else if (!isValidTurkishMobile(phoneDigits)) {
    errors.phone = "Geçerli bir cep telefonu girin (ör. 05XX XXX XX XX).";
  }

  const service = input.service?.trim() ?? "";
  if (!service) {
    errors.service = "Lütfen bir hizmet konusu seçin.";
  } else if (!CONTACT_SERVICE_TOPICS.includes(service as ContactServiceTopic)) {
    errors.service = "Geçersiz hizmet seçimi.";
  }

  const message = (input.message ?? "").trim();
  if (message.length > 2000) {
    errors.message = "Mesaj en fazla 2000 karakter olabilir.";
  }

  const district = (input.district?.trim() || DEFAULT_DISTRICT_LABEL).slice(0, 80);
  if (district.length < 1) {
    errors.district = "İlçe bilgisi geçersiz.";
  }

  if (Object.keys(errors).length > 0) {
    const first = errors.name ?? errors.phone ?? errors.service ?? errors.message ?? errors.district;
    return {
      ok: false,
      errors,
      error: first ?? "Lütfen formu kontrol edin.",
      code: "VALIDATION",
    };
  }

  return {
    ok: true,
    data: {
      name,
      phone: phoneDigits,
      service,
      message: message || "—",
      district,
    },
  };
}
