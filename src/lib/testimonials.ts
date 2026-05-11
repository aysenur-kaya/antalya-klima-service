import { hashSeed } from "@/lib/local-content";

export type Testimonial = {
  quote: string;
  name: string;
  context: string;
};

const POOLS: Record<string, Testimonial[]> = {
  klima: [
    { quote: "Klimanın su akıtması için sabah aradım, öğleden sonra evdeydiler. Süreç boyunca ne yapılacağını adım adım anlattılar.", name: "E. Y.", context: "Muratpaşa, split klima" },
    { quote: "Bakımdan sonra hem ses hem de soğutma düzeldi. Fiyatı işe başlamadan öğrendim, sürpriz olmadı.", name: "M. K.", context: "Konyaaltı" },
    { quote: "Dış üniteye ulaşım zordu ama ekip çözüm buldu. Randevu saatine sadık kaldılar.", name: "S. T.", context: "Site dairesi" },
  ],
  klima_bakim: [
    { quote: "Sezon öncesi bakım yaptırdım; filtre ve drenaj temizliği sonrası cihaz eskisi gibi soğuttu.", name: "A. D.", context: "Kepez" },
    { quote: "Apartman dairesinde iç üniteye dikkatli müdahale ettiler, evi dağıtmadan bitirdiler.", name: "L. Ş.", context: "Muratpaşa" },
    { quote: "Bakım süresini ve neye bakıldığını kısaca yazılı özetlediler, içime sindi.", name: "J. F.", context: "Aksu" },
  ],
  klima_tamir: [
    { quote: "Arıza kodu vermiştim, yanlarında uygun parça ile geldiler. Onaydan sonra değiştirip test ettiler.", name: "R. B.", context: "Alanya" },
    { quote: "Gece çalışan klima gürültülendi; ertesi gün kontrol edip sorunu netleştirdiler.", name: "N. Ç.", context: "Konyaaltı" },
    { quote: "Tamir öncesi ve sonrası fotoğraf tuttuk, hem teşhis hem işçilik mantıklıydı.", name: "F. L.", context: "Manavgat" },
  ],
  beyaz_esya: [
    { quote: "Çamaşır makinesi suyu almıyordu; hortumdan pompaya kontrol ettiler, işlem öncesi ücreti konuştuk.", name: "H. A.", context: "Manavgat" },
    { quote: "Buzdolabı tam soğutmuyordu; teşhisten sonra fan kaynaklı olduğu ortaya çıktı.", name: "G. P.", context: "Serik" },
    { quote: "Bulaşık makinesi suyu ısıtmıyordu, rezistans tarafını ölçtüler; onay sonrası değiştirdiler.", name: "Z. K.", context: "Kepez" },
  ],
  buzdolabi: [
    { quote: "Derin dondurucu tarafı düzensiz çalışıyordu; termostat ayarı ve kontaktör tarafını incelediler.", name: "V. Ö.", context: "Kepez" },
    { quote: "No-frost modelde buzlanma vardı, ne yapılacağını adım adım anlattılar.", name: "İ. M.", context: "Muratpaşa" },
    { quote: "Kapı contasından hava kaçırıyordu, küçük değişimle düzeldi.", name: "T. B.", context: "Finike" },
  ],
  brand: [
    { quote: "Marka aramasıyla geldim; özel servis olduğu açıkça söylendi, işlem tutarı onayla ilerledi.", name: "C. U.", context: "Antalya" },
    { quote: "Cihazın modelini WhatsApp’tan attım, uygun mudur diye önden cevap verdiler.", name: "P. E.", context: "Aksu" },
    { quote: "Yedek parça bulunamayınca alternatif çözüm önerdiler; seçim bende kaldı.", name: "D. R.", context: "Serik" },
  ],
};

function pickPoolKey(args: {
  serviceName: string;
  serviceType: "klima" | "beyaz-esya";
  hasBrand: boolean;
}): string {
  if (args.hasBrand) return "brand";
  const n = args.serviceName.toLowerCase();
  if (args.serviceType === "klima") {
    if (n.includes("bakım")) return "klima_bakim";
    if (n.includes("tamir") || n.includes("arıza")) return "klima_tamir";
    return "klima";
  }
  if (n.includes("buzdolabı") || n.includes("dondurucu")) return "buzdolabi";
  return "beyaz_esya";
}

export function getTestimonialsForContext(args: {
  serviceName: string;
  serviceType: "klima" | "beyaz-esya";
  hasBrand: boolean;
  seed: string;
  count?: number;
}): Testimonial[] {
  const key = pickPoolKey(args);
  let primary = [...(POOLS[key] ?? POOLS.beyaz_esya)];
  if (primary.length < 3) {
    primary = [...primary, ...POOLS.klima, ...POOLS.beyaz_esya];
  }
  const h = hashSeed([args.seed, key]);
  const rotated = [...primary.slice(h % primary.length), ...primary.slice(0, h % primary.length)];
  const seen = new Set<string>();
  const unique = rotated.filter((t) => {
    if (seen.has(t.quote)) return false;
    seen.add(t.quote);
    return true;
  });
  return unique.slice(0, args.count ?? 2);
}
