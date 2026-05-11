/**
 * Marka servis sayfalarında title/description ve görünür metin çeşitlendirmesi (ince içerik riskini azaltır).
 */

export function brandPageVariantIndex(brandSlug: string): number {
  let h = 0;
  for (let i = 0; i < brandSlug.length; i++) {
    h = (h * 31 + brandSlug.charCodeAt(i)) >>> 0;
  }
  return h % 3;
}

export function brandServisMetaTitle(
  brandName: string,
  _serviceLabel: string,
  brandSlug: string,
  type: "klima" | "beyaz-esya"
): string {
  const v = brandPageVariantIndex(brandSlug);
  if (type === "klima") {
    const opts = [
      `${brandName} klima servisi Antalya | Özel teknik destek`,
      `Antalya ${brandName} klima bakım ve arıza | Özel servis`,
      `${brandName} Antalya klima onarımı | Servis yönlendirme`,
    ];
    return opts[v];
  }
  const opts = [
    `${brandName} beyaz eşya servisi Antalya | Özel teknik destek`,
    `Antalya ${brandName} beyaz eşya tamiri | Özel servis`,
    `${brandName} Antalya buzdolabı & çamaşır servisi | Yönlendirme`,
  ];
  return opts[v];
}

export function brandServisMetaDescription(
  brandName: string,
  _serviceLabel: string,
  brandSlug: string,
  type: "klima" | "beyaz-esya"
): string {
  const v = brandPageVariantIndex(brandSlug);
  if (type === "klima") {
    const opts = [
      `${brandName} klima cihazları için Antalya genelinde arıza tespiti, bakım ve onarım yönlendirmesi. İlçe ve hizmet sayfalarına hızlı geçiş.`,
      `${brandName} duvar tipi ve multi split sistemlerde teknik destek akışı: ölçüm, şeffaf işlem kalemleri ve onay sonrası ilerleme.`,
      `${brandName} klima şikâyetlerinde performans, kaçak ve elektronik kontroller; randevu ve rota için ilçe bazlı sayfalarla devam.`,
    ];
    return opts[v];
  }
  const opts = [
    `${brandName} buzdolabı, çamaşır ve bulaşık gibi ürünlerde Antalya genelinde özel servis yönlendirmesi ve arıza netleştirme.`,
    `${brandName} beyaz eşyada su almama, ısıtmama ve program hatalarında güvenli teşhis sırası; onaysız parça işlemi yapılmaz.`,
    `${brandName} cihazlarda model ve belirtiye göre saha kontrolleri; merkez–ilçe iç bağlantılarıyla süreci sürdürün.`,
  ];
  return opts[v];
}

export function brandServisHeroSubtitle(
  brandName: string,
  brandSlug: string,
  type: "klima" | "beyaz-esya"
): string {
  const v = brandPageVariantIndex(brandSlug);
  if (type === "klima") {
    const opts = [
      `${brandName} klima için Antalya geneli bakım, arıza tespiti ve özel servis yönlendirmesi.`,
      `${brandName} split sistemlerde verim, ses ve sızdırma şikâyetlerinde önce güvenli kontroller, sonra onaylı işlem.`,
      `${brandName} klimanız için şehir geneli ekip rotası; ilçe veya marka detayına iç linklerle ilerleyin.`,
    ];
    return opts[v];
  }
  const opts = [
    `${brandName} beyaz eşya için Antalya'da özel servis: teşhis, kullanıcı onayı ve net işlem adımları.`,
    `${brandName} çamaşır, bulaşık ve soğutma ürünlerinde tipik arızalar için düzenli, anlaşılır süreç.`,
    `${brandName} cihazınızda ev içi kullanım notlarına göre planlama; gereksiz müdahaleden kaçınma.`,
  ];
  return opts[v];
}

export function brandServisBodyLead(
  brandName: string,
  brandSlug: string,
  type: "klima" | "beyaz-esya"
): string {
  const v = brandPageVariantIndex(brandSlug);
  if (type === "klima") {
    const opts = [
      `${brandName} klima ürünlerinde iç–dış ünite erişimi, drenaj hattı ve güç bağlantıları gibi saha değişkenlerini baştan not almak, doğru teşhis için kritiktir.`,
      `${brandName} sistemlerinde sık rastlanan senaryolarda önce filtre–drenaj ve temel elektrik kontrolleri tamamlanır; ardından derinleşen ölçümlere geçilir.`,
      `Yoğun sezonda ${brandName} cihazlarında önceden model/yıl ve arıza belirtisi paylaşmak, müsait teknisyen ve rota eşlemesini hızlandırır.`,
    ];
    return opts[v];
  }
  const opts = [
    `${brandName} beyaz eşyasında program, kapı sensörü ve su hatları gibi kullanıcı tarafında düşük riskli kontroller önce konuşulur; emin olunmayan adımlar önerilmez.`,
    `${brandName} ürün gamında rezistans, pompa ve termostat hatları ayrı ayrı değerlendirilir; parça ihtiyacı önden ifade edilir.`,
    `Apartman ve site dairelerinde ${brandName} cihazına müdahalede erişim ve güvenlik kuralları iş önceliğini belirler.`,
  ];
  return opts[v];
}
