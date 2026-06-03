export type StatTrend = "up" | "down" | "neutral";

export interface DashboardStat {
  id: string;
  label: string;
  value: string;
  change: string;
  trend: StatTrend;
}

export interface CustomerRequest {
  id: string;
  name: string;
  phone: string;
  district: string;
  service: string;
  message: string;
  status: "yeni" | "işlemde" | "tamamlandı";
  date: string;
}

export interface AdminService {
  id: string;
  title: string;
  slug: string;
  type: "klima" | "beyaz-esya";
  active: boolean;
  updatedAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  status: "yayında" | "taslak";
  views: number;
  updatedAt: string;
}

export interface DistrictRow {
  id: string;
  name: string;
  slug: string;
  neighborhoods: number;
  landingActive: boolean;
}

export interface TestimonialRow {
  id: string;
  author: string;
  district: string;
  rating: number;
  excerpt: string;
  published: boolean;
}

export const dashboardStats: DashboardStat[] = [
  { id: "1", label: "Bu Ay Talep", value: "128", change: "+12%", trend: "up" },
  { id: "2", label: "WhatsApp Tıklama", value: "342", change: "+8%", trend: "up" },
  { id: "3", label: "Aktif Hizmet", value: "14", change: "0", trend: "neutral" },
  { id: "4", label: "Yayında Blog", value: "9", change: "+1", trend: "up" },
];

export const customerRequests: CustomerRequest[] = [
  {
    id: "REQ-1042",
    name: "Ayşe Yılmaz",
    phone: "0532 441 22 18",
    district: "Karşıyaka",
    service: "Klima Bakımı",
    message: "Salon kliması yaz öncesi bakım istiyorum, müsait günlerinizi yazabilir misiniz?",
    status: "yeni",
    date: "03.06.2026 09:14",
  },
  {
    id: "REQ-1041",
    name: "Mehmet Kaya",
    phone: "0555 902 33 44",
    district: "Bornova",
    service: "Klima Arıza",
    message: "Dış ünite çalışıyor ama soğutma yapmıyor.",
    status: "işlemde",
    date: "02.06.2026 17:42",
  },
  {
    id: "REQ-1040",
    name: "Zeynep Demir",
    phone: "0544 118 90 02",
    district: "Konak",
    service: "Buzdolabı Servisi",
    message: "Buzdolabı motor sesi yapıyor, aynı gün mümkün mü?",
    status: "tamamlandı",
    date: "01.06.2026 11:05",
  },
  {
    id: "REQ-1039",
    name: "Can Öztürk",
    phone: "0530 776 55 10",
    district: "Buca",
    service: "Klima Montaj",
    message: "12000 BTU split klima montajı için fiyat alabilir miyim?",
    status: "yeni",
    date: "01.06.2026 08:30",
  },
];

export const adminServices: AdminService[] = [
  { id: "s1", title: "Klima Servisi", slug: "klima-servisi", type: "klima", active: true, updatedAt: "28.05.2026" },
  { id: "s2", title: "Klima Bakımı", slug: "klima-bakimi", type: "klima", active: true, updatedAt: "28.05.2026" },
  { id: "s3", title: "Klima Montaj", slug: "klima-montaj", type: "klima", active: true, updatedAt: "25.05.2026" },
  { id: "s4", title: "Buzdolabı Servisi", slug: "buzdolabi-servisi", type: "beyaz-esya", active: true, updatedAt: "20.05.2026" },
  { id: "s5", title: "Çamaşır Makinesi Servisi", slug: "camasir-makinesi-servisi", type: "beyaz-esya", active: false, updatedAt: "18.05.2026" },
];

export const blogPosts: BlogPost[] = [
  { id: "b1", title: "İzmir'de Klima Bakımı Ne Zaman Yapılmalı?", slug: "izmir-klima-bakimi-ne-zaman", status: "yayında", views: 1240, updatedAt: "30.05.2026" },
  { id: "b2", title: "Klima Gaz Dolumu Fiyatları 2026", slug: "klima-gaz-dolumu-fiyatlari", status: "yayında", views: 890, updatedAt: "22.05.2026" },
  { id: "b3", title: "Yaz Sezonu Öncesi Klima Kontrol Listesi", slug: "yaz-sezonu-klima-kontrol", status: "taslak", views: 0, updatedAt: "03.06.2026" },
];

export const districts: DistrictRow[] = [
  { id: "d1", name: "Karşıyaka", slug: "karsiyaka", neighborhoods: 12, landingActive: true },
  { id: "d2", name: "Bornova", slug: "bornova", neighborhoods: 10, landingActive: true },
  { id: "d3", name: "Konak", slug: "konak", neighborhoods: 8, landingActive: true },
  { id: "d4", name: "Buca", slug: "buca", neighborhoods: 9, landingActive: false },
  { id: "d5", name: "Bayraklı", slug: "bayrakli", neighborhoods: 7, landingActive: true },
];

export const testimonials: TestimonialRow[] = [
  { id: "t1", author: "Elif S.", district: "Karşıyaka", rating: 5, excerpt: "Aynı gün geldiler, klima bakımı sonrası fark etti.", published: true },
  { id: "t2", author: "Murat A.", district: "Bornova", rating: 5, excerpt: "Arıza tespiti net anlatıldı, şeffaf fiyat.", published: true },
  { id: "t3", author: "Selin T.", district: "Konak", rating: 4, excerpt: "WhatsApp üzerinden hızlı randevu aldım.", published: false },
];

export const seoSettings = {
  siteTitle: "İzmir Servisi - Klima ve Beyaz Eşya Teknik Servisi",
  metaDescription:
    "İzmir bölgesinde klima ve beyaz eşya servisi için aynı gün garantili teknik destek. 7/24 profesyonel ekip ve uzman çözümler.",
  canonicalUrl: "https://izmir-klima-servis.com",
  googleVerification: "MwzSgDXu_x4ylgE8xGrHxqNSvXiBcHjx3A5rmBrA_S4",
  robotsIndex: true,
};

export const contactSettings = {
  phone: "+905555555555",
  phoneFormatted: "0555 555 55 55",
  whatsapp: "https://wa.me/905555555555",
  workingHours: "Pzt - Cts: 08:30 - 19:30",
  stickyCtaEnabled: true,
};

export const generalSettings = {
  siteName: "İzmir Servisi",
  defaultCity: "İzmir",
  maintenanceMode: false,
  showTestimonials: true,
  analyticsEnabled: false,
};
