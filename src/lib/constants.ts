// TODO: Gerçek telefon numarasını ve iş bilgilerini buraya girin.
// Bu dosya tek kaynak noktasıdır — tüm telefon, WhatsApp, tel: linkleri ve
// LocalBusiness schema değerleri buradan okunur.
// GBP (Google Business Profile) için: name, phone, addressFull, workingHours alanlarını güncelleyin.
// WhatsApp URL'si otomatik olarak phone numarasından türetilir.
export const CONTACT_INFO = {
  name: "Antalya Servisi",
  // TODO: Gerçek telefon numarasıyla değiştirin (örn: "+905321234567")
  phone: "+905555555555",
  // TODO: Formatlı numara (görüntüleme için): "0532 123 45 67"
  phoneFormatted: "0555 555 55 55",
  // TODO: Aşağıdaki whatsapp URL'si phone ile senkronize tutun
  whatsapp: "https://wa.me/905555555555",
  address: "Antalya, Türkiye",
  // TODO: GBP için tam adres girin (sokak, mahalle, ilçe)
  addressFull: "Antalya Geneli Gezici Teknik Servis Ağı",
  workingHours: "Pzt - Cts: 08:30 - 19:30",
  city: "Antalya",
};

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://antalya-klima-servis.com";
