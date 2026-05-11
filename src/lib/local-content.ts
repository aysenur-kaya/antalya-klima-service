import type { Ilce, Mahalle } from "@/lib/data";
import { ilceler, getIlceBySlug } from "@/lib/data";

/** İlçe komşulukları (slug): iç link için; kabaca coğrafi / mobilite mantığı */
const NEIGHBOR_ILCE_SLUGS: Record<string, string[]> = {
  muratpasa: ["konyaalti", "kepez", "aksu"],
  konyaalti: ["muratpasa", "kepez", "dosemealti"],
  kepez: ["muratpasa", "konyaalti", "aksu", "dosemealti"],
  aksu: ["kepez", "muratpasa", "serik"],
  serik: ["aksu", "manavgat"],
  manavgat: ["serik", "alanya"],
  alanya: ["manavgat", "gazipasa"],
  gazipasa: ["alanya", "manavgat"],
  kemer: ["konyaalti", "kumluca"],
  kumluca: ["kemer", "finike"],
  finike: ["kumluca", "demre"],
  demre: ["finike", "kas"],
  kas: ["demre"],
  dosemealti: ["konyaalti", "kepez", "muratpasa"],
  korkuteli: ["kepez", "elmali"],
  elmali: ["korkuteli", "finike", "dosemealti"],
  akseki: ["manavgat", "ibradi"],
  ibradi: ["akseki", "gundogmus"],
  gundogmus: ["manavgat", "ibradi"],
};

export function hashSeed(parts: string[]): number {
  const s = parts.join("|");
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

type DistrictVoice = { heroExtra: string; intro: string[] };

const DISTRICT_VOICE: Record<string, DistrictVoice> = {
  muratpasa: {
    heroExtra: "Merkezde yoğun adres dağılımına alışkın ekiplerimizle çoğu çağrıyı aynı gün içinde planlamayı hedefleriz.",
    intro: [
      "Muratpaşa, iş merkezleri ve sık site yoğunluğuyla kısa mesafeli servis rotalarının önemli olduğu bir ilçedir. Adres detayını net vermeniz, ekibin güzergâh planını hızlandırır.",
      "Klima bakım ve ani arıza talepleri özellikle yaz sezonunda artar; çağrı sırasında cihaz tipi ve arıza belirtisini paylaşmanız teknik hazırlığı kolaylaştırır.",
    ],
  },
  konyaalti: {
    heroExtra: "Sahilden iç bölgelere uzanan hatta ekipler hızlı rota ile hareket eder; site ve müstakil adreslerde yoğun talep alırız.",
    intro: [
      "Konyaaltı’nda deniz bandına yakın konutlar ile iç mahalleler arasında adres yapısı farklılık gösterir; konumunuzu tarif ederken site/kapı bilgisini eklemeniz randevu netliğini artırır.",
      "Klima bakım talepleri sezon dönüşlerinde yüzdelik olarak yüksektir; beyaz eşya tarafında buzdolabı ve çamaşır makinesi arızaları sık gelen başlıklardandır.",
    ],
  },
  kepez: {
    heroExtra: "Geniş yerleşim alanında gün içinde çok noktaya yönlendirme yapılır; müsait teknisyen size en yakın zaman diliminde atanır.",
    intro: [
      "Kepez’in geniş mahalle ağı, planlı mobil servis yönlendirmesi gerektirir. Randevu oluştururken orta ölçekli caddeler ve yeni yapı bölgelerinde trafik yoğunluğu dikkate alınarak aralık verilir.",
      "Klima montaj sonrası ilk bakım ve beyaz eşya su kaçağı şikâyetleri ilçede sık karşılaşılan konulardır; telefonda kısa görüntü veya arıza açıklaması teşhisi hızlandırır.",
    ],
  },
  alanya: {
    heroExtra: "Merkezden çevre mahallelere mesafe değiştiği için yaklaşım süresi konuma göre netleştirilir; planlı randevu önerilir.",
    intro: [
      "Alanya’da sahil şeridi ile iç ovaya uzanan mesafeler servis planını etkiler. Adres tarifinde mahalle ve cadde eşleşmesi, ekibin doğru rotaya çıkmasını sağlar.",
      "Yaz aylarında klima bakım ve gaz dolumu talepleri belirgin şekilde artar; rezidans tipi binalarda dış ünite erişimi için site yönetimi izin sürecini sorabiliriz.",
    ],
  },
  aksu: {
    heroExtra: "Havalimanı ve yoğun yerleşim bölgelerine yakın hatlarda adres yoğunluğu artabilir; gün içi dilimlerde rutin planlama yapılır.",
    intro: [
      "Aksu’da yeni konut alanları ve turizm yoğunluğu bir arada bulunur. Bakım ve tamir çağrılarında site güvenliği kapısı ve iç ünite konumu hakkında kısa bilgi eklemek süreci hızlandırır.",
      "Klima dış ünite temizliği ve filtre tıkanıklığı gibi periyodik işler, ani soğutma kaybını önlemek için düzenli aralıklarla talep edilir.",
    ],
  },
  serik: {
    heroExtra: "Merkez ve çevre yerleşimler arasında mesafe farkı olduğundan yaklaşım süresi adres üzerinden netleştirilir.",
    intro: [
      "Serik’te bağ ve turizm bölgelerine yakın adreslerde servis rotaları gün içinde gruplanır. Rezervasyon sırasında konut tipi (müstakil, site dairesi) bilgisi yönlendirmeyi kolaylaştırır.",
      "Klima bakımı ile çamaşır makinesi su almama şikâyetleri bölgede sık gelen talepler arasındadır.",
    ],
  },
  manavgat: {
    heroExtra: "İlçe genişliği nedeniyle gün içi planlama adres sırasına göre yapılır; çağrıda konum netliği önemlidir.",
    intro: [
      "Manavgat ve çevresinde merkez ile kırsal hattın uzunluğu servis sürelerini etkileyebilir. Yaklaşım aralığı randevu anında paylaşılır.",
      "Beyaz eşya ve klima tarafında yaz aylarında yüksek sıcaklığa bağlı arızalar ve filtresiz çalışma kaynaklı performans düşüşleri sık görülür.",
    ],
  },
  kemer: {
    heroExtra: "Bölge turizm ve konut hattında dağınık adreslerde planlı yönlendirme yapılır.",
    intro: [
      "Kemer çevresinde site ve müstakil yapıların dağılımı rotayı uzatabilir; çağrı sırasında cadde ve işaret noktası eklemeniz faydalıdır.",
      "Klima gaz ve dış ünite havalandırması gibi konular yaz sezonunda ön plandadır.",
    ],
  },
  dosemealti: {
    heroExtra: "Gelişen konut bölgelerinde adres numarası ve site adı doğru eşleştiğinde aynı gün içinde plan yapılabilir.",
    intro: [
      "Döşemealtı’nda yeni yerleşim alanlarında sokak isimleri bazen navigasyonu zorlaştırır; mümkünse konum paylaşımı yönlendirmeyi hızlandırır.",
      "Klima bakım ve montaj sonrası ilk kontrol talepleri yeni yerleşimde sık görülür.",
    ],
  },
  kumluca: {
    heroExtra: "Kıyı ve iç kesim arasındaki mesafeye göre zaman aralığı belirlenir.",
    intro: [
      "Kumluca’da seralara yakın bölgeler ile sahil hattı arasında uzun mesafeler çıkabilir; servis sırası ve müsaitlik durumu çağrıda netleştirilir.",
      "Beyaz eşya nem ve sıcaklık değişimlerinden etkilenebilir; buzdolabı performans şikâyetleri kontrol edilmeye değerdir.",
    ],
  },
  finike: {
    heroExtra: "Sahil bandı ile iç mahalle arasında rota uzunluğu değişir; randevu saatinde konum teyidi istenebilir.",
    intro: [
      "Finike’de turizm döneminde talep dalgalı seyredebilir; acil çağrılarda müsait en yakın ekip yönlendirilir.",
      "Klima bakımında drenaj ve iç ünite temizliği rutin işlerdendir.",
    ],
  },
  demre: {
    heroExtra: "Merkez ve çevre köy hatlarında yaklaşım süresi farklılık gösterebilir.",
    intro: [
      "Demre’de adres tarifinde köy/mahalle ayrımı servis planını netleştirir.",
      "Yaşlı cihazlarda arıza tespiti sonrası parça bulunabilirliği modele göre değişir; işlem öncesi bilgi verilir.",
    ],
  },
  kas: {
    heroExtra: "Dar sokak ve eğimli bölgelerde ekip erişimi adres detayına bağlıdır.",
    intro: [
      "Kaş’ta site ve apart yapılarında dış üniteye erişim bazen site düzeni ile ilişkilidir.",
      "Klima verim düşüklüğü ve gaz şikâyetleri sezon geçişlerinde artar.",
    ],
  },
  gazipasa: {
    heroExtra: "Uçuş ve yerleşim bölgesi çevresinde talep dalgalanır; gün içi plan adres sırasına göre yapılır.",
    intro: [
      "Gazipaşa’da yeni konut alanlarıyla merkez arasında mesafe farkı vardır.",
      "Klima filtre ve dış ünite kirliliği sık kontrol gerektiren noktalardır.",
    ],
  },
  akseki: {
    heroExtra: "Dağlık kesimlerde mesafe ve yol durumu yaklaşım süresini etkileyebilir.",
    intro: [
      "Akseki ve çevresinde çağrı alındığında müsait ekip ve rota birlikte değerlendirilir.",
      "Mevsimsel sıcaklık değişimi klima kullanımını artırır; bakım talepleri planlanmalıdır.",
    ],
  },
  korkuteli: {
    heroExtra: "Plato yerleşiminde adresler arası mesafe uzun olabilir; randevu aralığı buna göre ayarlanır.",
    intro: [
      "Korkuteli’nde talepler genelde bakım ve ani arıza üzerinedir; konumu net tarif etmek süreci hızlandırır.",
    ],
  },
  elmali: {
    heroExtra: "Merkez ve çevre mahalle hattında servis rotaları gün içinde planlanır.",
    intro: [
      "Elmalı’da yaşlı beyaz eşya parkları için yedek parça durumu model bazında değişebilir.",
    ],
  },
  ibradi: {
    heroExtra: "Kırsal hatlarda zaman planı rota ve müsaitlik ile birlikte netleştirilir.",
    intro: [
      "İbradı çevresinde çağrılar daha seyrek ama planlı şekilde karşılanır.",
    ],
  },
  gundogmus: {
    heroExtra: "Dağ köyleri ile merkez arasında süre farkı olabilir.",
    intro: [
      "Gündoğmuş’ta teknik ekip yönlendirmesi konuma göre yapılır; çağrıda köy/mahalle adı önemlidir.",
    ],
  },
};

function defaultDistrictVoice(ilceName: string): DistrictVoice {
  return {
    heroExtra: `${ilceName} genelinde mobil servis yönlendirmesi yapılır; adres ve cihaz bilgisini paylaşmanız teknik hazırlığı kolaylaştırır.`,
    intro: [
      `${ilceName} bölgesinde klima ve beyaz eşya talepleri genelde aynı gün veya bir sonraki uygun dilimde planlanır.`,
      "Arıza tespiti sonrası onayınız olmadan işlem yapılmaz; değişen parçalar hakkında bilgilendirilirsiniz.",
    ],
  };
}

export function getDistrictVoice(ilceSlug: string, ilceName: string): DistrictVoice {
  return DISTRICT_VOICE[ilceSlug] ?? defaultDistrictVoice(ilceName);
}

export function getDistrictHeroSubtitle(ilceName: string, ilceSlug: string): string {
  const v = getDistrictVoice(ilceSlug, ilceName);
  return `${ilceName} mahalle ve adreslerinde klima ile beyaz eşya için teknik destek taleplerinizi karşılıyoruz. ${v.heroExtra}`;
}

export function getNeighborIlceler(currentSlug: string, limit = 5): Ilce[] {
  const preferred = NEIGHBOR_ILCE_SLUGS[currentSlug] ?? [];
  const resolved = preferred
    .map((s) => getIlceBySlug(s))
    .filter((x): x is Ilce => Boolean(x));

  if (resolved.length >= limit) return resolved.slice(0, limit);

  const rest = ilceler.filter((i) => i.slug !== currentSlug && !resolved.find((r) => r.slug === i.slug));
  const seed = hashSeed([currentSlug]);
  const rotated = [...rest.slice(seed % rest.length), ...rest.slice(0, seed % rest.length)];

  return [...resolved, ...rotated].slice(0, limit);
}

export function getNearbyMahalleler(ilce: Ilce, currentMahalleSlug: string, limit = 5): Mahalle[] {
  const list = ilce.mahalleler;
  const idx = list.findIndex((m) => m.slug === currentMahalleSlug);
  if (idx === -1) {
    const others = list.filter((m) => m.slug !== currentMahalleSlug);
    if (!others.length) return [];
    const h = hashSeed([ilce.slug, currentMahalleSlug]);
    const start = h % others.length;
    return [...others.slice(start), ...others.slice(0, start)].slice(0, limit);
  }

  const out: Mahalle[] = [];
  let step = 1;
  while (out.length < limit && step < list.length + 2) {
    const a = list[(idx + step) % list.length];
    const b = list[(idx - step + list.length * 10) % list.length];
    if (a && a.slug !== currentMahalleSlug && !out.includes(a)) out.push(a);
    if (b && b.slug !== currentMahalleSlug && !out.includes(b) && out.length < limit) out.push(b);
    step++;
  }
  return out.slice(0, limit);
}

const RESPONSE_SNIPPETS = [
  "Çoğu adrese gün içinde 2–4 saat bandında yönlendirme yapılır; yoğun saatlerde kısa gecikme olabilir.",
  "Randevu sırasında size yaklaşım aralığı dakika dilimiyle paylaşılır; konum netliği süreyi kısaltır.",
  "Aynı gün içinde planlanmayan nadir durumlarda bir sonraki uygun gün için ücretsiz ön kayıt alınır.",
  "Site güvenliği veya dış ünite erişimi geciktiğiyse teknik ekip durumu telefonda günceller.",
];

export function getResponseTimeSnippet(seedKey: string): string {
  const i = hashSeed([seedKey]) % RESPONSE_SNIPPETS.length;
  return RESPONSE_SNIPPETS[i];
}

export function getFrequentDeviceLines(args: {
  serviceName: string;
  serviceType: "klima" | "beyaz-esya";
}): string[] {
  const n = args.serviceName.toLowerCase();
  if (args.serviceType === "klima") {
    if (n.includes("bakım")) {
      return [
        "Duvar tipi split ünitelerde filtre ve drenaj hattı kontrolü",
        "Salon ve yoğun kullanılan odalarda iç ünite temizliği",
        "Gaz basıncı ve performans testi (ihtiyaç halinde)",
      ];
    }
    if (n.includes("montaj")) {
      return ["Yeni split kurulumları ve bağlantı kontrolleri", "Montaj sonrası ilk çalıştırma testi", "Kullanım ve bakım önerileri"];
    }
    if (n.includes("gaz")) {
      return ["Soğutma zayıflığı şikâyetli cihazlarda kaçak ve basınç kontrolü", "Uygun ise gaz tamamlama işlemi"];
    }
    return [
      "Küçük kapasiteli odalık splitler ve salon üniteleri",
      "Multi split sistemlerde iç ünite bazlı arıza tespiti",
      "Uzun süredir bakımı yapılmayan ünitelerde verim kontrolü",
    ];
  }

  if (n.includes("buzdolabı") || n.includes("derin dondurucu")) {
    return [
      "No-frost ve statik buzluların soğutma zayıflığı kontrolleri",
      "Motor-kompresör sesi ve titreme şikâyetleri",
      "Kapı contası ve termostat davranışı gözlemi",
    ];
  }
  if (namaService(n, "camasir") || n.includes("çamaşır")) {
    return ["Su almama/sürekli boşaltma döngüsü", "Sıkma aşamasında dengesizlik ve gürültü", "Kapı kilidi ve motor kaplin kontrolleri"];
  }
  if (namaService(n, "bulaşık")) {
    return ["Su sızdırma ve tortu birikimi", "Yıkama pompası ve rezistans davranışı", "Programın yarıda kalması"];
  }
  return [
    "Buzdolabı ve derin dondurucu soğutma şikâyetleri",
    "Çamaşır ve bulaşık makinelerinde su ve motor kaynaklı arızalar",
    "Kurutma ve fırın tipi cihazlarda pişirme/ısınma sorunları",
  ];
}

function namaService(n: string, frag: string): boolean {
  const f = frag.replace("ş", "s");
  return n.includes(frag) || n.includes(f);
}

export function getCatchAllHeroSubtitle(args: {
  ilce?: Ilce;
  mahalle?: Mahalle;
  marka?: { name: string };
  serviceName: string;
  serviceType: "klima" | "beyaz-esya";
}): string {
  const brand = args.marka ? `${args.marka.name} ` : "";
  const loc = args.mahalle && args.ilce
    ? `${args.ilce.name} ${args.mahalle.name}`
    : args.ilce
      ? args.ilce.name
      : "Antalya";

  if (args.ilce && !args.mahalle) {
    const v = getDistrictVoice(args.ilce.slug, args.ilce.name);
    return `${loc} için ${brand}${args.serviceName.toLowerCase()} talebinde teknik ekip yönlendirmesi yapıyoruz. ${v.heroExtra}`;
  }

  if (args.mahalle && args.ilce) {
    return `${loc} adreslerinde ${brand}${args.serviceName.toLowerCase()} için çağrınızı hızlıca değerlendirip size uygun teknik ekibi yönlendiriyoruz. WhatsApp veya telefon ile kısa arıza notu paylaşmanız yeterli.`;
  }

  return `${loc} genelinde ${brand}${args.serviceName.toLowerCase()} için aynı gün planlama imkânı sunuyoruz. İlçenizi veya mahallenizi seçerek daha net yönlendirme alabilirsiniz.`;
}

export function getCatchAllIntroParagraphs(args: {
  ilce?: Ilce;
  mahalle?: Mahalle;
  marka?: { name: string };
  serviceName: string;
  serviceType: "klima" | "beyaz-esya";
}): string[] {
  const brand = args.marka;
  const sn = args.serviceName.toLowerCase();
  const loc = args.mahalle && args.ilce
    ? `${args.ilce.name} ${args.mahalle.name}`
    : args.ilce
      ? args.ilce.name
      : "Antalya";

  if (args.mahalle && args.ilce) {
    const v = getDistrictVoice(args.ilce.slug, args.ilce.name);
    const p1 = `${args.mahalle.name}’da ${sn} kapsamında önce çağrınızdaki şikâyeti netleştiriyor, ardından adresinize en yakın müsait ekibe yönlendirme yapıyoruz. ${v.intro[0]}`;
    const p2 = brand
      ? `${brand.name} cihazınızda marka bağımsız özel servis kapsamında arıza tespiti yapılır; işlem kalemleri onayınızdan sonra uygulanır. Değişecek parça hakkında önceden bilgi verilir.`
      : `${loc} çevresinde sık aranan işler arasında periyodik bakım, filtre temizliği ve ani performans düşüklüğü müdahaleleri yer alır. Teknisyen cihazınızı ölçüm ve kontrol adımlarıyla değerlendirir.`;
    return [p1, p2];
  }

  if (args.ilce) {
    const v = getDistrictVoice(args.ilce.slug, args.ilce.name);
    const p1 = `${args.ilce.name} ilçesinde ${sn} hizmetinde ${brand ? `${brand.name} ` : ""}öncelik adresinize yakın müsait ekip bulunmasıdır. ${v.intro[0]}`;
    const p2 = brand
      ? `${brand.name} cihazlarınızda doğru teşhis için model ve seri bilgisi paylaşmanız faydalıdır. ${v.intro[1]}`
      : `${v.intro[1]} Şeffaf fiyat ve onay sonrası işlem ilkesiyle çalışırız.`;
    return [p1, p2];
  }

  const p1 = `Antalya genelinde ${sn} için çağrılarınızı tek merkezden karşılıyoruz; ilçe veya mahalle seçerek size daha yakın ekip atanır.${brand ? ` ${brand.name} cihazlarınızda aynı süreç geçerlidir.` : ""}`;
  const p2 =
    "Servis kaydı sonrası teknik ekip yönlendirmesi, arıza tespiti ve onay sonrası işlem adımları tüm Antalya’daki sayfalarımızda aynı düzenle ilerler.";

  return [p1, p2];
}

export function getProcessSummaryBullets(): string[] {
  return [
    "Telefon veya WhatsApp ile kısa arıza notu ve adres paylaşımı",
    "Size uygun müsait teknisyen ve zaman dilimi atanır",
    "Yerinde test ve görsel kontrol ile arıza tespiti yapılır",
    "Onayladığınız işlemler uygulanır; parça değişiminde bilgilendirme yapılır",
  ];
}
