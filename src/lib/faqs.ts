export type FaqItem = {
  question: string;
  answer: string;
};

/** Ana sayfa ve genel kullanım */
export function getDefaultPageFaqs(): FaqItem[] {
  return [
    {
      question: "Servis süresi ne kadardır?",
      answer:
        "Çoğu arıza için ekiplerimiz aynı gün adresinize ulaşır; uygun parça ve iş yüküne göre çözüm yerinde veya kısa randevu ile tamamlanır.",
    },
    {
      question: "Değişen parçalar garantili mi?",
      answer:
        "Onarımda kullanılan parçalar ve işçilik, size bildirilen koşullar çerçevesinde garanti kapsamındadır. İşlem öncesi net bilgi verilir.",
    },
    {
      question: "Servis ücreti alıyor musunuz?",
      answer:
        "Arıza tespiti için standart bir ücret uygulanabilir; onarımı onaylamanız hâlinde bu ücret genellikle toplam tutara mahsup edilir. Fiyatlar işlem öncesi netleştirilir.",
    },
    {
      question: "Hangi bölgelere hizmet veriyorsunuz?",
      answer:
        "Antalya’nın merkez ilçelerinden Kemer, Alanya, Manavgat, Serik ve diğer ilçelere kadar geniş bir mobil servis ağımız vardır.",
    },
  ];
}

type CatchAllFaqContext = {
  locationText: string;
  serviceName: string;
  serviceType: "klima" | "beyaz-esya";
  brandName?: string;
  /** örn. muratpasa — lokal SSS varyasyonu */
  ilceSlug?: string;
  /** URL suffix: klima-bakim-servisi vb. */
  serviceSuffix?: string;
};

function serviceSpecificFaqs(ctx: CatchAllFaqContext): FaqItem[] {
  const suf = ctx.serviceSuffix ?? "";
  const n = ctx.serviceName.toLowerCase();
  const out: FaqItem[] = [];

  if (suf.includes("klima-bakim") || n.includes("bakım")) {
    out.push({
      question: `${ctx.locationText} için klima bakımı ne kadar sürer?`,
      answer:
        "Standart bakımda iç-dış ünite kontrolleri, filtre ve drenaj hattı ile güvenlik kontrolleri genelde 45–90 dakika arasında tamamlanır. Cihaz sayısı ve erişim durumu süreyi değiştirebilir.",
    });
  }

  if (suf.includes("klima-tamir") || suf.includes("klima-ariza") || n.includes("tamir") || n.includes("arıza")) {
    out.push({
      question: "Arıza tespiti ücreti onarıma eklenir mi?",
      answer:
        "Tespit ücreti işletme politikasına göre alınabilir; onarımı onaylamanız hâlinde bu ücret çoğu zaman toplam tutara mahsup edilir. Çağrı sırasında güncel bilgi paylaşılır.",
    });
  }

  if (suf.includes("buzdolabi") || n.includes("buzdolabı")) {
    out.push({
      question: "Buzdolabı soğutmuyor; önce ne kontrol edilir?",
      answer:
        "Termostat ayarı, kapı kapanışı ve fiş/şebeke kontrolü gibi güvenli kullanıcı kontrollerinden sonra kompresör ve gaz tarafı saha testleriyle değerlendirilir.",
    });
  }

  if (suf.includes("camasir-makinesi") || n.includes("çamaşır")) {
    out.push({
      question: "Çamaşır makinesi su almıyor; sebep ne olabilir?",
      answer:
        "Su giriş vanaları, filtre tıkanıklığı veya pompa kaynaklı durumlar sık görülür. Teknisyen önce hortum ve elektrik sürekliliğini kontrol ederek ilerler.",
    });
  }

  if (suf.includes("klima-gaz") || n.includes("gaz")) {
    out.push({
      question: "Gaz dolumundan önce kaçak testi yapılır mı?",
      answer:
        "Evet; sistemde bariz kaçak şüphesi varsa veya performans testi bunu gerektiriyorsa önce uygun kontroller yapılır, sonra işlem seçenekleri onayınıza sunulur.",
    });
  }

  return out;
}

function ilceLocalFaqs(ilceSlug: string | undefined, locationText: string): FaqItem[] {
  if (!ilceSlug) return [];
  if (ilceSlug === "muratpasa") {
    return [
      {
        question: "Muratpaşa’da aynı gün servis var mı?",
        answer:
          "Yoğun merkez hattında çoğu talep aynı gün içinde planlanır; saat aralığı çağrı sırasında netleştirilir. Site güvenliği veya dış ünite erişimi bekleme yaratabilir.",
      },
    ];
  }
  if (ilceSlug === "konyaalti") {
    return [
      {
        question: "Konyaaltı’nda klima bakımı ne kadar sürer?",
        answer:
          "Tek ünite için tipik bakım genelde bir saat civarındadır. Birden fazla ünite veya zor erişimli dış ünite süreyi uzatabilir.",
      },
    ];
  }
  if (ilceSlug === "alanya") {
    return [
      {
        question: `${locationText} çevresinde uzak mahallelere ne zaman gelinir?`,
        answer:
          "Merkez dışı adreslerde rota birleştirme yapılır; yaklaşım günü ve dilimi randevuda netleştirilir.",
      },
    ];
  }
  return [];
}

/** Programatik lokasyon / marka sayfaları için bağlamlı SSS */
export function buildFaqsForCatchAll(ctx: CatchAllFaqContext): FaqItem[] {
  const { locationText, serviceName, serviceType, brandName } = ctx;
  const cihaz = serviceType === "klima" ? "klima" : "beyaz eşya";

  const base: FaqItem[] = [
    {
      question: `${locationText} bölgesinde ${serviceName.toLowerCase()} için ne kadar sürede gelirsiniz?`,
      answer: `${locationText} ve çevresinde aynı gün veya bir sonraki uygun dilimde mobil ekip yönlendirmesi yapılır. Yoğunluk ve konuma göre net saat aralığı çağrı sırasında paylaşılır.`,
    },
    {
      question: `${locationText} için ${cihaz} servis ücreti nasıl hesaplanır?`,
      answer:
        "Ücret; arıza tespiti, gereken parça ve işçilik kalemlerine göre şeffaf şekilde belirlenir. Onarım öncesi onayınız alınır; onaylamadığınız işlem yapılmaz.",
    },
  ];

  if (brandName) {
    base.push({
      question: `${brandName} ${cihaz} için yedek parça bulunur mu?`,
      answer: `${brandName} cihazlar için uyumlu parça tedariki ve marka bağımsız özel servis kapsamında teknik destek sağlanır. Parça müsaitliği modele göre değişir.`,
    });
  }

  base.push({
    question: `${locationText} dışına servis geliyor musunuz?`,
    answer: `Öncelik ${locationText} ve yakın mahallelerdir. Daha uzak noktalar için müsaitlik ve mobilite durumuna göre yönlendirme yapılır.`,
  });

  const extra = [
    ...ilceLocalFaqs(ctx.ilceSlug, locationText),
    ...serviceSpecificFaqs(ctx),
  ];

  const merged = [...extra, ...base];
  const seen = new Set<string>();
  const dedup = merged.filter((f) => {
    if (seen.has(f.question)) return false;
    seen.add(f.question);
    return true;
  });
  return dedup.slice(0, 6);
}

export function buildFaqsForDistrict(ilceName: string, ilceSlug: string): FaqItem[] {
  const loc = ilceName;
  return [
    {
      question: `${loc}’da hangi mahallelere mobil servis çıkıyor?`,
      answer: `${loc} ilçesinde listelenen mahalle adreslerine yönlendirme yapılır. Adres ve arıza notunu paylaşmanız en doğru ekip atamasını sağlar.`,
    },
    {
      question: `${loc} için klima ve beyaz eşya işlerinde süreç aynı mı?`,
      answer:
        "Evet; kayıt, teknisyen ataması, yerinde tespit ve onay sonrası işlem adımları aynı çerçevededir. Cihaz türüne göre kullanılan test ve parça farklılık gösterebilir.",
    },
    ...ilceLocalFaqs(ilceSlug, loc),
    {
      question: "Fiyat bilgisini nereden alabilirim?",
      answer: `${loc} fiyat ve hizmet sayfalarımızdan genel bilgiye ulaşabilir; net tutar için çağrı sırasında iş kalemleri paylaşılır.`,
    },
  ].slice(0, 6);
}
