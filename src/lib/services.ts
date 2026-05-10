export type ServiceKind = "klima" | "beyaz-esya";

export interface ServicePage {
  title: string;
  shortTitle: string;
  slug: string;
  landingSlug: string;
  type: ServiceKind;
  summary: string;
  scope: string[];
  whenToCall: string;
  process: string;
  keywords: string[];
}

export const klimaServicePages: ServicePage[] = [
  {
    title: "Klima Servisi",
    shortTitle: "Klima Servisi",
    slug: "klima-servisi",
    landingSlug: "klima-servisi",
    type: "klima",
    summary: "Klima servisi; cihazın güvenli, verimli ve uzun ömürlü çalışması için yapılan kapsamlı saha kontrolü ve teknik müdahaledir.",
    scope: [
      "İç ve dış ünite çalışma performansı kontrolü",
      "Elektrik bağlantıları, drenaj ve hava akışı incelemesi",
      "Arıza belirtisi, ses, koku ve verim kaybı değerlendirmesi",
      "İşlem öncesi net bilgilendirme ve servis önerisi",
    ],
    whenToCall: "Soğutma veya ısıtma performansı düştüğünde, cihaz sesli çalıştığında, su akıttığında ya da sezon öncesi genel kontrol gerektiğinde servis talep edilmelidir.",
    process: "Randevu sonrası teknisyen cihazı test eder, ölçüm ve görsel kontrolleri tamamlar, gerekli işlem kalemlerini onayınıza sunar.",
    keywords: ["antalya klima servisi", "klima teknik servis", "acil klima servisi"],
  },
  {
    title: "Klima Bakımı",
    shortTitle: "Klima Bakımı",
    slug: "klima-bakimi",
    landingSlug: "klima-bakim-servisi",
    type: "klima",
    summary: "Düzenli klima bakımı enerji tüketimini düşürür, hava kalitesini iyileştirir ve sezon içinde ani arıza riskini azaltır.",
    scope: [
      "Filtre, serpantin ve drenaj hattı kontrolleri",
      "İç-dış ünite genel temizlik ve performans ölçümü",
      "Kumanda, sensör ve çalışma modu testleri",
      "Bakım sonrası kullanım ve periyodik kontrol önerileri",
    ],
    whenToCall: "Yoğun kullanım öncesinde yılda en az bir kez bakım yaptırmak, hem konfor hem de cihaz ömrü için en doğru adımdır.",
    process: "Bakım sırasında cihaz kapatılır, güvenlik kontrolleri yapılır, temizlik ve performans testleri tamamlandıktan sonra kısa bir işlem özeti paylaşılır.",
    keywords: ["antalya klima bakımı", "klima bakım servisi", "periyodik klima bakımı"],
  },
  {
    title: "Klima Tamiri",
    shortTitle: "Klima Tamiri",
    slug: "klima-tamiri",
    landingSlug: "klima-tamir-servisi",
    type: "klima",
    summary: "Klima tamiri; arızanın doğru teşhis edilmesi, güvenli onarım planının çıkarılması ve gerekli parçaların şeffaf şekilde sunulmasıyla ilerler.",
    scope: [
      "Soğutmama, çalışmama ve sesli çalışma arızaları",
      "Sensör, fan, kapasitör ve elektronik kart kontrolleri",
      "Kaçak, basınç ve gaz seviyesi değerlendirmesi",
      "Onay sonrası parça değişimi veya onarım",
    ],
    whenToCall: "Cihaz sık dur-kalk yapıyorsa, sigorta attırıyorsa, hata veriyorsa veya performans kaybı belirginleştiyse teknik kontrol gerekir.",
    process: "Önce belirti dinlenir, ardından ölçüm tabanlı teşhis yapılır. Onarım maliyeti ve süre bilgisi netleşmeden işlem başlatılmaz.",
    keywords: ["antalya klima tamiri", "klima arıza servisi", "klima kart tamiri"],
  },
  {
    title: "Klima Montajı",
    shortTitle: "Klima Montajı",
    slug: "klima-montaji",
    landingSlug: "klima-montaj-servisi",
    type: "klima",
    summary: "Doğru klima montajı; cihaz verimini, ses seviyesini, drenaj güvenliğini ve uzun dönem çalışma performansını doğrudan etkiler.",
    scope: [
      "İç ve dış ünite konum değerlendirmesi",
      "Bakır boru, drenaj ve elektrik hattı kontrolü",
      "Vakum, kaçak kontrolü ve ilk çalıştırma",
      "Sök-tak ve taşınma sonrası yeniden kurulum",
    ],
    whenToCall: "Yeni cihaz kurulumunda, taşınma sonrası sök-tak işleminde veya hat konumu değiştiğinde profesyonel montaj alınmalıdır.",
    process: "Keşif sonrası montaj noktası belirlenir, güvenli hat kurulumu yapılır ve cihaz test çalıştırmasıyla teslim edilir.",
    keywords: ["antalya klima montajı", "klima sök tak", "klima kurulum servisi"],
  },
  {
    title: "Klima Gaz Dolumu",
    shortTitle: "Gaz Dolumu",
    slug: "klima-gaz-dolumu",
    landingSlug: "klima-gaz-dolumu-servisi",
    type: "klima",
    summary: "Klima gaz dolumu, kaçak ve sistem bütünlüğü kontrol edilmeden yapılmamalıdır; doğru gaz türü ve miktarı cihaz plakasına göre belirlenir.",
    scope: [
      "Basınç ve sıcaklık ölçümü",
      "Kaçak kontrolü ve bağlantı değerlendirmesi",
      "Uygun refrigerant türüyle kontrollü dolum",
      "Dolum sonrası performans testi",
    ],
    whenToCall: "Cihaz uzun süre çalışmasına rağmen soğutmuyorsa, dış ünite devreye girip verim alamıyorsa veya geçmişte kaçak onarımı yapıldıysa kontrol gerekir.",
    process: "Önce kaçak ve basınç ölçümü yapılır. Sistem uygunsa, cihaz etiketindeki gaz türüne göre dolum tamamlanır.",
    keywords: ["antalya klima gaz dolumu", "klima gaz şarjı", "klima kaçak kontrolü"],
  },
];

export const beyazEsyaServicePages: ServicePage[] = [
  {
    title: "Beyaz Eşya Servisi",
    shortTitle: "Beyaz Eşya",
    slug: "beyaz-esya-servisi",
    landingSlug: "beyaz-esya-servisi",
    type: "beyaz-esya",
    summary: "Beyaz eşya servisi; buzdolabı, çamaşır makinesi, bulaşık makinesi, fırın ve kurutma makinesi arızalarında yerinde teknik destek sunar.",
    scope: [
      "Arıza tespiti ve işlem öncesi fiyat bilgilendirmesi",
      "Yaygın parça ve bağlantı kontrolleri",
      "Marka bağımsız özel servis yönlendirmesi",
      "Onarım sonrası kullanım önerileri",
    ],
    whenToCall: "Cihaz çalışmıyor, su almıyor, ısıtmıyor, ses yapıyor veya performansı düştüyse teknik servis kaydı oluşturulmalıdır.",
    process: "Servis talebi alınır, cihaz belirtisi değerlendirilir ve en yakın mobil ekip adresinize yönlendirilir.",
    keywords: ["antalya beyaz eşya servisi", "beyaz eşya tamiri", "özel beyaz eşya servisi"],
  },
  {
    title: "Buzdolabı Servisi",
    shortTitle: "Buzdolabı",
    slug: "buzdolabi-servisi",
    landingSlug: "buzdolabi-servisi",
    type: "beyaz-esya",
    summary: "Buzdolabı servisi; soğutmama, karlanma, su akıtma, sesli çalışma ve termostat sorunlarında hızlı arıza tespiti sağlar.",
    scope: ["Soğutma performansı kontrolü", "Fan, sensör ve termostat incelemesi", "Gaz ve kaçak değerlendirmesi", "Kapı fitili ve drenaj kontrolleri"],
    whenToCall: "Gıdalar hızlı bozuluyorsa, cihaz sürekli çalışıyorsa veya iç bölümde olağan dışı buzlanma varsa destek alınmalıdır.",
    process: "Öncelik gıda güvenliği ve hızlı teşhistir; gerekli parça veya işlem onayla ilerler.",
    keywords: ["antalya buzdolabı servisi", "buzdolabı tamiri", "buzdolabı soğutmuyor"],
  },
  {
    title: "Çamaşır Makinesi Servisi",
    shortTitle: "Çamaşır Makinesi",
    slug: "camasir-makinesi-servisi",
    landingSlug: "camasir-makinesi-servisi",
    type: "beyaz-esya",
    summary: "Çamaşır makinesi servisi; su almama, sıkma yapmama, ses, kazan ve pompa arızalarında yerinde çözüm üretir.",
    scope: ["Pompa ve filtre kontrolü", "Motor, kayış ve amortisör değerlendirmesi", "Su giriş ve tahliye hattı kontrolü", "Elektronik kart ve program testi"],
    whenToCall: "Makine programı tamamlamıyor, su boşaltmıyor veya sıkma sırasında aşırı ses yapıyorsa servis çağrılmalıdır.",
    process: "Belirtiye göre mekanik ve elektronik kontroller yapılır; onay sonrası onarım uygulanır.",
    keywords: ["antalya çamaşır makinesi servisi", "çamaşır makinesi tamiri", "çamaşır makinesi sıkmıyor"],
  },
];

export const allServicePages = [...klimaServicePages, ...beyazEsyaServicePages];

export const getServicePageBySlug = (slug: string) =>
  allServicePages.find((service) => service.slug === slug || service.landingSlug === slug);

export const servicePriceItems = [
  { name: "Klima montajı", price: "4.000 TL" },
  { name: "Klima sökümü", price: "2.000 TL" },
  { name: "Klima gaz şarjı (kg)", price: "1.500 TL" },
  { name: "Klima arıza tespiti", price: "1.500 TL" },
  { name: "Klima sensör değişimi", price: "2.000 TL" },
  { name: "Klima kapasitör değişimi", price: "2.500 TL" },
  { name: "Klima iç ünite fan değişimi", price: "2.500 TL" },
  { name: "Klima dış ünite fan değişimi", price: "3.500 TL" },
  { name: "Klima kart tamiri", price: "3.500 TL" },
  { name: "Klima kart değişimi", price: "5.500 TL" },
];
