import {
  PrismaClient,
  AdminRole,
  BlogPostStatus,
  CustomerRequestStatus,
  ServiceType,
} from "@prisma/client";
import { hashPassword } from "../src/lib/auth/password";

const prisma = new PrismaClient();

const SEED_ADMIN_EMAIL = "admin@izmirklima.com";
const SEED_ADMIN_PASSWORD = "Admin123!";

async function main() {
  console.log("🌱 Seed başlıyor…");

  const passwordHash = await hashPassword(SEED_ADMIN_PASSWORD);

  await prisma.adminUser.upsert({
    where: { email: SEED_ADMIN_EMAIL },
    update: { passwordHash, active: true },
    create: {
      email: SEED_ADMIN_EMAIL,
      name: "İzmir Servisi Admin",
      passwordHash,
      role: AdminRole.SUPER_ADMIN,
      active: true,
    },
  });

  await prisma.seoSetting.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      siteTitle: "İzmir Servisi - Klima ve Beyaz Eşya Teknik Servisi",
      metaDescription:
        "İzmir bölgesinde klima ve beyaz eşya servisi için aynı gün garantili teknik destek. 7/24 profesyonel ekip ve uzman çözümler.",
      canonicalUrl: "https://izmir-klima-servis.com",
      googleVerification: "MwzSgDXu_x4ylgE8xGrHxqNSvXiBcHjx3A5rmBrA_S4",
      robotsIndex: true,
    },
  });

  await prisma.siteSetting.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      siteName: "İzmir Servisi",
      defaultCity: "İzmir",
      phone: "+905555555555",
      phoneFormatted: "0555 555 55 55",
      whatsappUrl: "https://wa.me/905555555555",
      workingHours: "Pzt - Cts: 08:30 - 19:30",
      stickyCtaEnabled: true,
      maintenanceMode: false,
      showTestimonials: true,
      analyticsEnabled: false,
    },
  });

  const services = [
    { title: "Klima Servisi", slug: "klima-servisi", type: ServiceType.KLIMA, active: true, sortOrder: 1 },
    { title: "Klima Bakımı", slug: "klima-bakimi", type: ServiceType.KLIMA, active: true, sortOrder: 2 },
    { title: "Klima Montaj", slug: "klima-montaj", type: ServiceType.KLIMA, active: true, sortOrder: 3 },
    { title: "Buzdolabı Servisi", slug: "buzdolabi-servisi", type: ServiceType.BEYAZ_ESYA, active: true, sortOrder: 4 },
    { title: "Çamaşır Makinesi Servisi", slug: "camasir-makinesi-servisi", type: ServiceType.BEYAZ_ESYA, active: false, sortOrder: 5 },
  ];

  for (const s of services) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: s,
      create: s,
    });
  }

  const blogPosts = [
    {
      title: "İzmir'de Klima Bakımı Ne Zaman Yapılmalı?",
      slug: "izmir-klima-bakimi-ne-zaman",
      category: ServiceType.KLIMA,
      excerpt:
        "Filtre temizliği, dış ünite kontrolü ve sezon öncesi bakım aralıkları — İzmir ikliminde klima bakımı ne zaman yapılmalı?",
      content:
        "## Bakım aralığı\n\nYoğun kullanımda **yılda en az bir kez** profesyonel bakım önerilir.\n\n## Evde kontrol\n\n- Filtreleri düzenli temizleyin\n- Dış ünite hava akışını kontrol edin\n\nSorun sürerse [klima servisi](/hizmetler/klima-servisi) sayfamızdan destek alabilirsiniz.",
      status: BlogPostStatus.PUBLISHED,
      views: 1240,
      publishedAt: new Date("2026-05-30"),
    },
    {
      title: "Klima Gaz Dolumu Fiyatları 2026",
      slug: "klima-gaz-dolumu-fiyatlari",
      category: ServiceType.KLIMA,
      excerpt: "Gaz dolumu fiyatını etkileyen faktörler ve ne zaman dolum yerine kaçak tespiti gerekir.",
      content:
        "## Fiyatı etkileyenler\n\nKapasite, gaz tipi ve **kaçak tespiti** ihtiyacı maliyeti belirler.\n\n## Dikkat\n\nKaçak varken yalnızca dolum geçici çözümdür; kalıcı onarım gerekir.",
      status: BlogPostStatus.PUBLISHED,
      views: 890,
      publishedAt: new Date("2026-05-22"),
    },
    {
      title: "Yaz Sezonu Öncesi Klima Kontrol Listesi",
      slug: "yaz-sezonu-klima-kontrol",
      category: ServiceType.KLIMA,
      excerpt: "Sezon öncesi kısa kontrol listesi — taslak örnek yazı.",
      status: BlogPostStatus.DRAFT,
      views: 0,
    },
  ];

  for (const post of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    });
  }

  const requests = [
    {
      reference: "REQ-1042",
      name: "Ayşe Yılmaz",
      phone: "0532 441 22 18",
      district: "Karşıyaka",
      service: "Klima Bakımı",
      message: "Salon kliması yaz öncesi bakım istiyorum, müsait günlerinizi yazabilir misiniz?",
      status: CustomerRequestStatus.NEW,
      createdAt: new Date("2026-06-03T09:14:00"),
    },
    {
      reference: "REQ-1041",
      name: "Mehmet Kaya",
      phone: "0555 902 33 44",
      district: "Bornova",
      service: "Klima Arıza",
      message: "Dış ünite çalışıyor ama soğutma yapmıyor.",
      status: CustomerRequestStatus.IN_PROGRESS,
      createdAt: new Date("2026-06-02T17:42:00"),
    },
    {
      reference: "REQ-1040",
      name: "Zeynep Demir",
      phone: "0544 118 90 02",
      district: "Konak",
      service: "Buzdolabı Servisi",
      message: "Buzdolabı motor sesi yapıyor, aynı gün mümkün mü?",
      status: CustomerRequestStatus.COMPLETED,
      createdAt: new Date("2026-06-01T11:05:00"),
    },
    {
      reference: "REQ-1039",
      name: "Can Öztürk",
      phone: "0530 776 55 10",
      district: "Buca",
      service: "Klima Montaj",
      message: "12000 BTU split klima montajı için fiyat alabilir miyim?",
      status: CustomerRequestStatus.NEW,
      createdAt: new Date("2026-06-01T08:30:00"),
    },
  ];

  for (const req of requests) {
    await prisma.customerRequest.upsert({
      where: { reference: req.reference },
      update: req,
      create: req,
    });
  }

  const districtSeed = [
    {
      name: "Karşıyaka",
      slug: "karsiyaka",
      landingActive: true,
      sortOrder: 1,
      neighborhoods: ["Bostanlı", "Alaybey", "Nergiz"],
    },
    {
      name: "Bornova",
      slug: "bornova",
      landingActive: true,
      sortOrder: 2,
      neighborhoods: ["Erzene", "Evka-3", "Işıkkent"],
    },
    {
      name: "Konak",
      slug: "konak",
      landingActive: true,
      sortOrder: 3,
      neighborhoods: ["Alsancak", "Güzelyalı", "Göztepe"],
    },
    {
      name: "Buca",
      slug: "buca",
      landingActive: false,
      sortOrder: 4,
      neighborhoods: ["Şirinyer", "Kaynaklar", "Kozağaç"],
    },
    {
      name: "Bayraklı",
      slug: "bayrakli",
      landingActive: true,
      sortOrder: 5,
      neighborhoods: ["Manavkuyu", "Soğukkuyu", "Onur"],
    },
  ];

  for (const d of districtSeed) {
    const district = await prisma.district.upsert({
      where: { slug: d.slug },
      update: { name: d.name, landingActive: d.landingActive, sortOrder: d.sortOrder },
      create: {
        name: d.name,
        slug: d.slug,
        landingActive: d.landingActive,
        sortOrder: d.sortOrder,
      },
    });

    for (const nName of d.neighborhoods) {
      const nSlug = nName
        .toLowerCase()
        .replace(/ı/g, "i")
        .replace(/ğ/g, "g")
        .replace(/ü/g, "u")
        .replace(/ş/g, "s")
        .replace(/ö/g, "o")
        .replace(/ç/g, "c")
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");

      await prisma.neighborhood.upsert({
        where: { districtId_slug: { districtId: district.id, slug: nSlug } },
        update: { name: nName },
        create: { name: nName, slug: nSlug, districtId: district.id, active: true },
      });
    }
  }

  const testimonials = [
    {
      author: "Elif S.",
      district: "Karşıyaka",
      rating: 5,
      excerpt: "Aynı gün geldiler, klima bakımı sonrası fark etti.",
      published: true,
      sortOrder: 1,
    },
    {
      author: "Murat A.",
      district: "Bornova",
      rating: 5,
      excerpt: "Arıza tespiti net anlatıldı, şeffaf fiyat.",
      published: true,
      sortOrder: 2,
    },
    {
      author: "Selin T.",
      district: "Konak",
      rating: 4,
      excerpt: "WhatsApp üzerinden hızlı randevu aldım.",
      published: false,
      sortOrder: 3,
    },
  ];

  await prisma.testimonial.deleteMany();
  await prisma.testimonial.createMany({ data: testimonials });

  console.log("✅ Seed tamamlandı.");
}

main()
  .catch((e) => {
    console.error("❌ Seed hatası:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
