import type { FaqItem } from "@/lib/faqs";

export type GuideCategory = "klima" | "beyaz-esya";

export type GuideLink = {
  href: string;
  label: string;
};

export type Guide = {
  slug: string;
  title: string;
  description: string;
  category: GuideCategory;
  deviceType: string;
  symptoms: string[];
  intro: string;
  causes: { heading: string; body: string }[];
  userChecks: string[];
  whenToCallService: string[];
  faq: FaqItem[];
  relatedServiceLinks: GuideLink[];
  relatedBrandLinks: GuideLink[];
  relatedLocationLinks: GuideLink[];
  relatedGuideSlugs: string[];
};

export const GUIDES: Guide[] = [
  {
    slug: "klima-neden-sogutmuyor",
    title: "Klima Neden Soğutmuyor? En Yaygın 7 Sebep | İzmir Servisi",
    description:
      "Klima soğutmuyorsa filtreden gaz kaybına kadar yaygın nedenleri özetledik. Evde güvenle kontrol edebilecekleriniz ve ne zaman teknik servis çağırmanız gerektiği.",
    category: "klima",
    deviceType: "Klima (split / multi)",
    symptoms: ["Zayıf soğutma", "Hiç soğutmama", "Geç soğuma"],
    intro:
      "Soğutma gücü düşen klima yaz aylarında hem konforu hem de enerji tüketimini olumsuz etkiler. Aşağıdaki başlıklar sahadaki sık karşılaşım örüntülerine göre derlenmiştir; tek tek ele alıp güvenli kullanıcı kontrolleriyle başlamak faydalıdır.",
    causes: [
      {
        heading: "Kirli veya tıkalı filtre",
        body: "İç ünite filtresi hava akışını kısıyorsa evaporatör verimi düşer; cihaz “çalışıyor” gibi görünürken ortam yeterince soğumaz. Filtre bakım aralığı kullanım yoğunluğuna göre değişir.",
      },
      {
        heading: "Termostat veya sıcaklık ayarı",
        body: "Mod (soğutma-ısıtma), hedef sıcaklık ve kumanda pil seviyesi bazen gözden kaçar. Uyku veya fan-only modlarında soğutma beklentisi karşılanmayabilir.",
      },
      {
        heading: "Dış ünite hava akışı",
        body: "Dış ünite önünün kapanması, yaprak birikintisi veya sıkışık montaj; kondenserın ısı atamamasına ve sistem performansının düşmesine yol açar.",
      },
      {
        heading: "Gaz miktarı veya kaçak",
        body: "Soğutucu akışkan kaybı kademeli zayıflamaya neden olur. Kaçak varken sadece gaz eklemek geçici maskeler; kalıcı çözüm için sızıntının tespiti gerekir.",
      },
      {
        heading: "Sensör ve elektronik hataları",
        body: "Bazı modellerde buzlanma koruması, sensör veya kart kaynaklı sınırlamalar güç düşüşü gibi okunabilir. Ekranda hata kodu olabilir.",
      },
      {
        heading: "Kapasite ve ortam yükü",
        body: "Metrekare, güneş alan cam, kalabalık veya aşırı sıcak havalarda cihaz nominal sınırda kalır; beklenen sıcaklığa inmek uzun sürer ya da mümkün olmaz.",
      },
      {
        heading: "Bakım ihmaline bağlı kirli serpantin / verimsizlik",
        body: "Uzun süredir bakım yapılmayan iç-dış serpantin yüzeyleri verimi düşürür; profesyonel temizlik ve kontrol ile toparlanabilir.",
      },
    ],
    userChecks: [
      "Filtreyi kullanım kılavuzuna uygun şekilde temizleyin veya yenileyin.",
      "Kumandada soğutma modu ve sıcaklığı doğrulayın; pilleri değiştirmeyi deneyin.",
      "Dış ünite çevresini ve ön yüzeyi kontrol edin; hava giriş-çıkışı açık olsun.",
      "İç ünite üfleme gücünü ve louvre yönünü kontrol edin.",
    ],
    whenToCallService: [
      "Temel kontrollere rağmen soğutma belirgin şekilde zayıfsa veya giderek kötüleşiyorsa.",
      "Dış ünite yoğun buzlanma, sıvı hattında buğulaşma belirtileri veya tekrarlayan hata kodları varsa.",
      "Koku, yanık kokusu veya elektrik tesisatına dair şüphe varsa (güvenlik önceliklidir).",
    ],
    faq: [
      {
        question: "Filtre temizledim, hâlâ soğutmuyor; ne yapmalıyım?",
        answer:
          "Bir süre gözlemleyin; kısa süreli toparlanma olabilir. Değişme yoksa gaz, sensör veya elektronik taraf değerlendirilmelidir; teknik servis randevusu alın.",
      },
      {
        question: "Gaz dolumu tek başına yeterli olur mu?",
        answer:
          "Kaçak yoksa ve miktar üretici aralığındaysa yeterli olabilir. Kaçak varsa önce onarım veya sızdırmazlık gerekir; aksi hâlde gaz yeniden kaybedilir.",
      },
      {
        question: "İzmir sıcağında kapasite yetmiyor gibi; normal mi?",
        answer:
          "Aşırı sıcak ve yüksek güneş yükünde cihazlar sınırda çalışır. Yine de geçen yıla göre belirgin kötüleşme varsa bakım ve teknik kontrol önerilir.",
      },
    ],
    relatedServiceLinks: [
      { href: "/izmir-klima-servisi", label: "İzmir klima servisi" },
      { href: "/izmir-klima-tamir-servisi", label: "İzmir klima tamir servisi" },
      { href: "/izmir-klima-bakim-servisi", label: "İzmir klima bakım servisi" },
      { href: "/hizmetler/klima-tamiri", label: "Klima tamiri (bilgi sayfası)" },
    ],
    relatedBrandLinks: [
      { href: "/servis/arcelik-klima-servisi", label: "Arçelik klima servisi" },
      { href: "/servis/mitsubishi-klima-servisi", label: "Mitsubishi klima servisi" },
      { href: "/servis/daikin-klima-servisi", label: "Daikin klima servisi" },
    ],
    relatedLocationLinks: [
      { href: "/konak-klima-servisi", label: "Konak klima servisi" },
      { href: "/karsiyaka-klima-servisi", label: "Karşıyaka klima servisi" },
      { href: "/bornova-klima-servisi", label: "Bornova klima servisi" },
    ],
    relatedGuideSlugs: ["klima-gaz-dolumu-ne-zaman-yapilir", "klima-su-akitiyor", "klima-neden-ses-yapar"],
  },
  {
    slug: "klima-su-akitiyor",
    title: "Klima Su Akıtıyor mu? Drenaj ve Buharlaşma Kaynaklı Akışlar | Rehber",
    description:
      "İç ünite su damlatması çoğu zaman drenaj veya yoğuşma ile ilgilidir. Ne zaman endişelenmeli, ne zaman servis gerekir — özet rehber.",
    category: "klima",
    deviceType: "Klima",
    symptoms: ["İç üniteden su damlaması", "Duvar ıslanması", "Su birikintisi"],
    intro:
      "Klima çalışırken yoğuşma oluşması doğaldır; suyun kontrollü şekilde drenaj hortumundan uzaklaşması gerekir. Hortum tıkanıklığı veya yanlış eğim gibi durumlarda su içeride veya dışarıdan damlayabilir.",
    causes: [
      {
        heading: "Drenaj hattı tıkanıklığı",
        body: "Toz, küf veya böcek kalıntıları pan içi çıkışı tıkayabilir; su taşarak iç üniteye veya duvara süzülür.",
      },
      {
        heading: "Hortum eğimi veya bağlantı gevşekliği",
        body: "Montaj sonrası yer değişimi veya sıcaklık döngüleri bağlantılarda gevşeme yaratabilir.",
      },
      {
        heading: "Filtre kısıtlı akış",
        body: "Zayıf hava akışı evaporatör yüzeyinde aşırı soğumayı artırıp yoğuşmayı yükseltebilir; su üretimi gözlenenden fazla olur.",
      },
      {
        heading: "Buharlaşma tepsisi hasarı veya çatlak",
        body: "Aşınma veya darbe sonucu tepsi bütünlüğü bozulmuşsa kaçak yolu değişir; inceleme gerekir.",
      },
    ],
    userChecks: [
      "Cihaz kapalı ve güvence altında iken drenaj çıkışının görünen kısmını kontrol edin (kılavuza göre).",
      "Filtre temizliğini yapın; iç ünite üflemesi düzeliyor mu bakın.",
      "Taşan suyun sürekli olduğu ve şiddetlendiği durumları not edin (serviste paylaşın).",
    ],
    whenToCallService: [
      "Tavan veya duvar alanı geniş alanda ıslanıyorsa veya elektrik tesisatına su temas riski varsa.",
      "Temel temizlik sonrası tekrarlayan taşma veya koku (küf) şikâyeti oluşuyorsa.",
      "Cihaz içini sökmeden erişilemeyen tıkanıklık şüphesi varsa.",
    ],
    faq: [
      {
        question: "Yazın daha çok mu damlatır?",
        answer:
          "Yüksek nem ve yoğun çalışma dönemlerinde yoğuşma artabilir. Yine de düzenli damlama ve taşma normal değildir; drenaj kontrolü gerekir.",
      },
      {
        question: "Dış üniteden su akması normal mi?",
        answer:
          "Yoğuşma nedeniyle dış ünite altında su birikimi sık görülür; ancak şiddetli ve anormal debi teknik kontrol gerektirebilir.",
      },
    ],
    relatedServiceLinks: [
      { href: "/izmir-klima-servisi", label: "İzmir klima servisi" },
      { href: "/izmir-klima-montaj-servisi", label: "İzmir klima montaj servisi" },
      { href: "/hizmetler/klima-bakimi", label: "Klima bakımı" },
    ],
    relatedBrandLinks: [
      { href: "/servis/beko-klima-servisi", label: "Beko klima servisi" },
      { href: "/servis/vestel-klima-servisi", label: "Vestel klima servisi" },
    ],
    relatedLocationLinks: [
      { href: "/cesme-klima-servisi", label: "Çeşme klima servisi" },
      { href: "/odemis-klima-servisi", label: "Ödemiş klima servisi" },
      { href: "/torbali-klima-servisi", label: "Torbalı klima servisi" },
    ],
    relatedGuideSlugs: ["klima-neden-sogutmuyor", "klima-neden-ses-yapar", "klima-gaz-dolumu-ne-zaman-yapilir"],
  },
  {
    slug: "klima-gaz-dolumu-ne-zaman-yapilir",
    title: "Klima Gaz Dolumu Ne Zaman Yapılır? | Ölçüm ve Kaçak İlkeleri",
    description:
      "Gaz ekleme kararı basınç ölçümü ve kaçak değerlendirmesi ile verilir. Amatör müdahaleden kaçının; ne zaman uzman desteği almanız gerektiğini anlatıyoruz.",
    category: "klima",
    deviceType: "Klima",
    symptoms: ["Geç soğuma", "Buzlanma", "Düşük performans uyarıları"],
    intro:
      "Soğutucu akışkan bir ‘benzin doldurma’ işlemi gibi düşünülmemelidir. Miktar üretici ve model şartlarına göre belirlenir; hatalı doz cihaza zarar verebilir. Önce tespit, sonra onarım veya tamamlama mantığı izlenir.",
    causes: [
      {
        heading: "Mikro kaçaklar ve bağlantı gevşemesi",
        body: "Flare bağlantılar, valf bölgeleri ve uzun süreli titreşim kaynaklı gevşemeler kademeli gaz kaybına yol açabilir.",
      },
      {
        heading: "Montaj veya servis sonrası düşük şarj",
        body: "Eksik şarj ile devreye alınan sistem performansı düşük kalır; kısa sürede şikâyet oluşur.",
      },
      {
        heading: "Elektronik / sensör kaynaklı yanlış ‘gaz’ algısı",
        body: "Bazı belirtiler gazdan bağımsız da olabilir; ölçüm ve test ile ayrıştırma yapılır.",
      },
    ],
    userChecks: [
      "Filtre ve dış ünite hava akışı gibi temel kalemleri eleniz.",
      "Kumanda hata kodunu not edin; servis çağrısında paylaşın.",
      "Kişisel koruyucu ve cihaz üzerinde amatör valf müdahalesi yapmayın.",
    ],
    whenToCallService: [
      "Soğutma belirgin düştüyse ve geçen sezona göre fark hissediliyorsa.",
      "Buzlanma, buğulanma veya şüpheli ses eşlik ediyorsa.",
      "Cihaz garanti kapsamındaysa üretici koşullarını kontrol edin; özel servis tercihinde şeffaf teşhis isteyin.",
    ],
    faq: [
      {
        question: "Her yıl gaz eklemek gerekir mi?",
        answer:
          "Sağlıklı ve sızdırmaz sistemlerde rutin ‘yıllık gaz’ ihtiyacı olmamalıdır. Performans düşüklüğünde önce bakım ve ölçüm yapılır.",
      },
      {
        question: "Kendim gaz takviyesi yapabilir miyim?",
        answer:
          "Önerilmez. Yanlış gaz tipi, miktar veya güvenli işlem eksikliği hem cihaza hem kişisel güvenliğe risk oluşturur.",
      },
    ],
    relatedServiceLinks: [
      { href: "/izmir-klima-gaz-dolumu-servisi", label: "İzmir klima gaz dolumu" },
      { href: "/izmir-klima-servisi", label: "İzmir klima servisi" },
      { href: "/hizmetler/klima-gaz-dolumu", label: "Klima gaz dolumu bilgi" },
    ],
    relatedBrandLinks: [
      { href: "/servis/lg-klima-servisi", label: "LG klima servisi" },
      { href: "/servis/samsung-klima-servisi", label: "Samsung klima servisi" },
    ],
    relatedLocationLinks: [
      { href: "/cigli-klima-servisi", label: "Çiğli klima servisi" },
      { href: "/dosemealti-klima-servisi", label: "Döşemealtı klima servisi" },
    ],
    relatedGuideSlugs: ["klima-neden-sogutmuyor", "klima-e1-arizasi", "klima-neden-ses-yapar"],
  },
  {
    slug: "klima-neden-ses-yapar",
    title: "Klima Neden Ses Yapar? Fan, Montaj ve Mekanik Nedenler | Rehber",
    description:
      "Tıklama, vızıltı ve titreşim gibi seslerin olası kaynakları ve ne zaman onarım gerektiği — teknik servis perspektifinden özet.",
    category: "klima",
    deviceType: "Klima",
    symptoms: ["Tıklama", "Vızıltı", "Titreşim", "Rüzgar sesi dışı uğultu"],
    intro:
      "Ani başlayan veya giderek artan ses; fan, motor yatağı, kanat kırığı veya gevşek bağlantılardan kaynaklanabilir. Bazı kısa süreli çatlama sesleri ısınma-soğuma sırasında duyulabilir; kalıcı ve şiddetli olanlar değerlendirilmelidir.",
    causes: [
      {
        heading: "İç veya dış fan dengesizliği",
        body: "Toz birikimi, kanat çatlağı veya yabancı cisim fanın titreşim yapmasına yol açar.",
      },
      {
        heading: "Montaj ve taşıyıcı gevşekliği",
        body: "Vida ve braket gevşemesi çalışma sırasında metalik vuruntu üretebilir.",
      },
      {
        heading: "Kompresör ve hat iletim sesleri",
        body: "Bazı çalışma modlarında basınç dalgalanması ile birlikte uğultu artabilir; tanı için ölçüm gerekir.",
      },
    ],
    userChecks: [
      "Sesin iç ünite mi dış ünite mi yönünden geldiğini not edin.",
      "Filtre tıkanıklığı için temel kontrol yapın (ses ile ilişkili olabilir).",
      "Yeni başlayan şiddetli titreşimde cihazı güvenli şekilde durdurun ve destek alın.",
    ],
    whenToCallService: [
      "Metalik çarpma, sürekli gürültü veya performans düşüşü ile birlikte gelen seslerde.",
      "Elektrik kokusu veya düzensiz çalışma eşlik ediyorsa.",
    ],
    faq: [
      {
        question: "Gece daha mı gürültülü duyulur?",
        answer:
          "Ortam sessizliği algıyı artırabilir. Yine de seviye yükseliyorsa fan ve mekanik kontrol gerekir.",
      },
    ],
    relatedServiceLinks: [
      { href: "/izmir-klima-tamir-servisi", label: "İzmir klima tamir" },
      { href: "/izmir-klima-bakim-servisi", label: "İzmir klima bakım" },
      { href: "/hizmetler/klima-tamiri", label: "Klima tamiri" },
    ],
    relatedBrandLinks: [
      { href: "/servis/bosch-klima-servisi", label: "Bosch klima servisi" },
      { href: "/servis/mitsubishi-klima-servisi", label: "Mitsubishi klima servisi" },
    ],
    relatedLocationLinks: [
      { href: "/konak-klima-servisi", label: "Konak klima servisi" },
      { href: "/karsiyaka-klima-servisi", label: "Karşıyaka klima servisi" },
    ],
    relatedGuideSlugs: ["klima-neden-sogutmuyor", "klima-su-akitiyor", "klima-e1-arizasi"],
  },
  {
    slug: "klima-e1-arizasi",
    title: "Klima E1 Arızası Ne Anlama Gelir? Kumanda Kodlarını Doğru Okumak",
    description:
      "E1 kodu markadan markaya farklı anlamlar taşıyabilir. Güvenli yaklaşım: kullanıcı seviyesinde kontroller ve ne zaman teknik teşhis gerekir.",
    category: "klima",
    deviceType: "Klima",
    symptoms: ["E1 kodu", "Çalışmayı kesme", "Uyarı ışığı"],
    intro:
      "Hata kodları üretici yazılımına göre tanımlanır. E1 bazı markalarda iletişim veya sensör, bazılarında yüksek basınç / sıcaklık koruması anlamına gelebilir. Bu nedenle internetten genel yorumla parça değiştirmek risklidir; model ve marka bilgisi şarttır.",
    causes: [
      {
        heading: "İç-dış ünite iletişim hatası (markaya bağlı)",
        body: "Sinyal hattı veya kart ile ilgili sürüm uyumsuzluğu okunabilir.",
      },
      {
        heading: "Sıcaklık / buzlanma koruması",
        body: "Evaporatörde beklenenden düşük sıcaklık veya buzlanma şüphesinde koruma devreye girebilir.",
      },
      {
        heading: "Gerçek arıza ile ‘görünür kod’ ayrımı",
        body: "Elektriksel dalgalanma sonrası geçici kod silinebilir; tekrarlıyorsa saha testi gerekir.",
      },
    ],
    userChecks: [
      "Kullanım kılavuzunda E1 tanımını bulun veya üretici hızlı referans tablosunu kontrol edin.",
      "Cihazı güvenli şekilde resetleyebiliyorsanız kılavuzdaki adımı uygulayın; kod tekrar ederse kayıt altına alın.",
      "Filtre ve hava akışı gibi temel unsurları kontrol edin.",
    ],
    whenToCallService: [
      "Kod tekrarlı şekilde geliyorsa veya soğutma/ısıtmayı tamamen engelliyorsa.",
      "Elektrik tesisatı, sigorta veya priz ısınması gibi ek belirtiler varsa.",
    ],
    faq: [
      {
        question: "E1 her klima için aynı mıdır?",
        answer:
          "Hayır. Marka ve modele göre değişir; doğru yorum için teknik dokümantasyon veya yetkili/özel servis teşhisi gerekir.",
      },
    ],
    relatedServiceLinks: [
      { href: "/izmir-klima-servisi", label: "İzmir klima servisi" },
      { href: "/izmir-klima-tamir-servisi", label: "İzmir klima tamir" },
      { href: "/hizmetler/klima-servisi", label: "Klima servisi bilgi" },
    ],
    relatedBrandLinks: [
      { href: "/servis/arcelik-klima-servisi", label: "Arçelik klima" },
      { href: "/servis/beko-klima-servisi", label: "Beko klima" },
    ],
    relatedLocationLinks: [
      { href: "/bornova-klima-servisi", label: "Bornova klima servisi" },
      { href: "/konak-klima-servisi", label: "Konak klima servisi" },
    ],
    relatedGuideSlugs: ["klima-neden-sogutmuyor", "klima-gaz-dolumu-ne-zaman-yapilir", "klima-neden-ses-yapar"],
  },
  {
    slug: "camasir-makinesi-su-bosaltmiyor",
    title: "Çamaşır Makinesi Su Boşaltmıyor mu? Pompa ve Tahliye Kontrolleri",
    description:
      "Program bitmeden su kalması veya boşaltamama çoğunlukla tahliye hattı veya pompa ile ilişkilidir. Evde güvenle yapılabilecekler ve servis eşiği.",
    category: "beyaz-esya",
    deviceType: "Çamaşır makinesi",
    symptoms: ["Su duruyor", "Boşaltma yok", "Program takılıyor"],
    intro:
      "Boşaltma aşaması suyun pompa ile makineden uzaklaştırılmasına dayanır. Hortum kıvrımı, filtre tıkanıklığı veya pompa arızası sık görülen nedenlerdir. İşlem yapmadan önce cihazın fişini çekin ve su girişini güvenli şekilde değerlendirin.",
    causes: [
      {
        heading: "Tahliye hortumu sıkışması veya yüksek montaj",
        body: "Hortumun fazla yukarı çıkarılması sifon etkisini bozar; su yer çekimine karşı kalır.",
      },
      {
        heading: "Pompa filtresi tıkanıklığı",
        body: "Madeni para, düğme veya tekstil parçası filtrede sıkışabilir.",
      },
      {
        heading: "Pompa veya motor arızası",
        body: "Elektriksel veya mekanik arıza ile pompa devreye girmeyebilir.",
      },
      {
        heading: "Kontrol kartı / program hatası",
        body: "Sensör ve zamanlama kaynaklı boşaltma adımına geçilmemesi de mümkündür.",
      },
    ],
    userChecks: [
      "Tahliye hortumunun sıkışmadığından ve makine seviyesinin doğru olduğundan emin olun.",
      "Erişebiliyorsanız pompa filtresini kılavuza göre kontrol edin (fiş çekili olsun).",
      "Kapı kilidi düzgün kapanıyor mu kontrol edin; bazı modellerde güvenlik nedeniyle boşaltma bekletilir.",
    ],
    whenToCallService: [
      "Filtre temizliğine rağmen durum aynıysa.",
      "Su sızıntısı veya elektriksel koku eşlik ediyorsa.",
      "Program sürekli aynı dakikada takılı kalıyorsa.",
    ],
    faq: [
      {
        question: "Sıkma yapmadan önce mi boşaltmalı?",
        answer:
          "Standart döngüde önce boşaltma sonra sıkma gelir. Boşaltma tamamlanmıyorsa sıkma da güvenli şekilde yapılamaz.",
      },
    ],
    relatedServiceLinks: [
      { href: "/izmir-camasir-makinesi-servisi", label: "İzmir çamaşır makinesi servisi" },
      { href: "/izmir-beyaz-esya-servisi", label: "İzmir beyaz eşya servisi" },
      { href: "/hizmetler/camasir-makinesi-servisi", label: "Çamaşır makinesi servisi bilgi" },
    ],
    relatedBrandLinks: [
      { href: "/servis/bosch-beyaz-esya-servisi", label: "Bosch beyaz eşya" },
      { href: "/servis/siemens-beyaz-esya-servisi", label: "Siemens beyaz eşya" },
      { href: "/servis/arcelik-beyaz-esya-servisi", label: "Arçelik beyaz eşya" },
    ],
    relatedLocationLinks: [
      { href: "/konak-camasir-makinesi-servisi", label: "Konak çamaşır makinesi" },
      { href: "/karsiyaka-camasir-makinesi-servisi", label: "Karşıyaka çamaşır makinesi" },
    ],
    relatedGuideSlugs: ["buzdolabi-sogutmuyor", "bulasik-makinesi-temiz-yikamiyor", "firin-isitmiyor"],
  },
  {
    slug: "buzdolabi-sogutmuyor",
    title: "Buzdolabı Soğutmuyor: Termostat, Fan ve Soğutma Döngüsü | Rehber",
    description:
      "Gıda güvenliği açısından soğutmama ciddiye alınmalıdır. Kontrol edebileceğiniz basit maddeler ve servis gerektiren durumlar.",
    category: "beyaz-esya",
    deviceType: "Buzdolabı",
    symptoms: ["Yumuşak soğutma", "Sıcaklık yükselmesi", "Motor sürekli çalışıyor"],
    intro:
      "Buzdolabı termostat, fan ve kompresörün uyumlu çalışmasıyla hedef sıcaklıkta kalır. Kapı contası, hava sirkülasyonu ve dış sıcaklık da performansı etkiler. Belirtiler birkaç gün içinde kötüleşiyorsa en kısa sürede teşhis önemlidir.",
    causes: [
      {
        heading: "Kapı contası ve sık kapanmama",
        body: "Hava sızıntısı nem dengesini ve çalışma süresini bozar.",
      },
      {
        heading: "Buzlanma ve hava kanalı tıkanıklığı (no-frost modellerde)",
        body: "Buz birikimi fanı veya kanalı kısıyabilir.",
      },
      {
        heading: "Fan veya defrost devresi sorunları",
        body: "Soğuk hava dağılımı bozulur; kabin sıcaklığı yükselir.",
      },
      {
        heading: "Soğutucu devre / gaz tarafı",
        body: "Kompresör çalışıyor gibi görünse de verim düşüklüğü olabilir; ölçüm gerekir.",
      },
    ],
    userChecks: [
      "Termostat veya dijital ayarı üretici önerisine yakın tutun; havalandırma gözeneklerini kapatmayın.",
      "Kapı contasına görsel olarak bakın; gıda veya ambalaj sıkışması olmadığını kontrol edin.",
      "Cihazın arkasındaki ısı atımına mesafe bırakıldığını doğrulayın.",
    ],
    whenToCallService: [
      "İç sıcaklık güvenli aralığa dönmüyorsa veya hızla kötüleşiyorsa.",
      "Yanık kokusu, kesik ses veya sık sigorta atması varsa.",
    ],
    faq: [
      {
        question: "Motor sürekli çalışıyor ama soğutmuyor; ne olabilir?",
        answer:
          "Sensör, gaz veya fan kaynaklı bir dizi senaryo mümkündür; uzun süre boş yere çalıştırmak enerji ve kompresör yükü oluşturur; teşhis önerilir.",
      },
    ],
    relatedServiceLinks: [
      { href: "/izmir-buzdolabi-servisi", label: "İzmir buzdolabı servisi" },
      { href: "/izmir-beyaz-esya-servisi", label: "İzmir beyaz eşya" },
      { href: "/hizmetler/buzdolabi-servisi", label: "Buzdolabı servisi bilgi" },
    ],
    relatedBrandLinks: [
      { href: "/servis/beko-beyaz-esya-servisi", label: "Beko beyaz eşya" },
      { href: "/servis/vestel-beyaz-esya-servisi", label: "Vestel beyaz eşya" },
    ],
    relatedLocationLinks: [
      { href: "/konak-buzdolabi-servisi", label: "Konak buzdolabı" },
      { href: "/bornova-buzdolabi-servisi", label: "Bornova buzdolabı" },
    ],
    relatedGuideSlugs: ["camasir-makinesi-su-bosaltmiyor", "bulasik-makinesi-temiz-yikamiyor", "firin-isitmiyor"],
  },
  {
    slug: "bulasik-makinesi-temiz-yikamiyor",
    title: "Bulaşık Makinesi Temiz Yıkamıyor: Filtre, Püskürtme ve Deterjan Rehberi",
    description:
      "Cam ve çanaklarda tortu, leke veya yağ kalıntısı için sistematik kontrol listesi. Ne zaman parça veya teknik inceleme gerekir?",
    category: "beyaz-esya",
    deviceType: "Bulaşık makinesi",
    symptoms: ["Tortu kalıntısı", "Yağ izi", "Kötü koku"],
    intro:
      "Yıkama performansı suyun doğru basınçla sepetlere dağılmasına ve deterjanın uygun kullanımına bağlıdır. Püskürtme kolları, filtre ve tuz/parlatıcı rutinleri gözden geçirilmeden ‘arıza’ varsaymak yanlış olur.",
    causes: [
      {
        heading: "Alt/üst püskürtme kollarında tıkanıklık",
        body: "Delikler kireç veya gıda parçası ile tıkanabilir; su yönü bozulur.",
      },
      {
        heading: "Dolgu filtresi ve gider kısmında tortu",
        body: "Sirkülasyon zayıflar; özellikle alt sepet etkilenir.",
      },
      {
        heading: "Tuz ve parlatıcı ayarı / sert su",
        body: "Yumuşatma yetersizse kireç lekeleri oluşur.",
      },
      {
        heading: "Isıtma veya pompa zayıflığı",
        body: "Program çalışıyor gibi görünse de yeterli sıcaklık ve basınç oluşmayabilir.",
      },
    ],
    userChecks: [
      "Püskürtme kollarını çıkarıp delikleri yumuşak fırça ile temizleyin.",
      "Filtreleri kılavuza göre temizleyin.",
      "Tuz ve parlatıcı seviyesini kontrol edin; uygun deterjan kullanın.",
    ],
    whenToCallService: [
      "Temel temizlikten sonra aynı şikâyet tüm programlarda tekrarlanıyorsa.",
      "Su sızdırma, anormal ses veya programda takılma varsa.",
    ],
    faq: [
      {
        question: "Eco programda daha kötü yıkar mı?",
        answer:
          "Düşük sıcaklık ve süre nedeniyle zor kirlerde sonuç değişebilir. Ancak Eco ile de düzenli bakım sonrası düzelmiyorsa teknik kontrol gerekir.",
      },
    ],
    relatedServiceLinks: [
      { href: "/izmir-bulasik-makinesi-servisi", label: "İzmir bulaşık makinesi servisi" },
      { href: "/izmir-beyaz-esya-servisi", label: "İzmir beyaz eşya" },
    ],
    relatedBrandLinks: [
      { href: "/servis/profilo-beyaz-esya-servisi", label: "Profilo beyaz eşya" },
      { href: "/servis/bosch-beyaz-esya-servisi", label: "Bosch beyaz eşya" },
    ],
    relatedLocationLinks: [
      { href: "/konak-beyaz-esya-servisi", label: "Konak beyaz eşya" },
      { href: "/cesme-beyaz-esya-servisi", label: "Çeşme beyaz eşya" },
    ],
    relatedGuideSlugs: ["camasir-makinesi-su-bosaltmiyor", "buzdolabi-sogutmuyor", "firin-isitmiyor"],
  },
  {
    slug: "firin-isitmiyor",
    title: "Fırın Isıtmıyor: Rezistans, Termostat ve Güvenlik Senaryoları | Rehber",
    description:
      "Durgun ısı, uzun ön ısınma veya hiç ısınmama belirtilerinde kontrol listesi ve teknik servis eşiği.",
    category: "beyaz-esya",
    deviceType: "Fırın",
    symptoms: ["Az ısınma", "Hiç ısınmama", "Uzun pişirme süresi"],
    intro:
      "Elektrikli fırınlarda üst-alt rezistanslar, termostat ve kapı sızdırmazlığı sıcaklık hedefine ulaşmayı belirler. Gazlı modellerde farklı güvenlik ve ateşleme bileşenleri devrededir; model tipini bilmeden parça değiştirmeyin.",
    causes: [
      {
        heading: "Rezistans veya bağlantı arızası",
        body: "Bir rezistans devreden çıkmışsa pişirme düzensizleşir.",
      },
      {
        heading: "Termostat ölçüm sapması",
        body: "Erken kesme veya geç durdurma davranışı görülebilir.",
      },
      {
        heading: "Kapı contası ve ısı kaçağı",
        body: "Kalibrasyonu bozar; kullanıcı deneyimi düşer.",
      },
    ],
    userChecks: [
      "Pişirme modunu ve sıcaklık seçimini doğrulayın.",
      "Kapı contasında yırtık veya gevşeme var mı bakın.",
      "Gazlı cihazlarda görsel veya koku şüphesinde cihazı kullanmayın ve destek isteyin.",
    ],
    whenToCallService: [
      "Elektriksel kesinti kokusu, kıvılcım veya sıcak kontak hissi varsa.",
      "Isı belirgin şekilde yetersiz ve kalibrasyon önerisi işe yaramıyorsa.",
    ],
    faq: [
      {
        question: "Sadece üst veya alt ısınmıyorsa ne anlama gelir?",
        answer:
          "Seçilen mod ile rezistans kombinasyonu eşleşmeyebilir veya arıza tek taraflı olabilir; test ile netleştirilir.",
      },
    ],
    relatedServiceLinks: [
      { href: "/izmir-firin-servisi", label: "İzmir fırın servisi" },
      { href: "/izmir-beyaz-esya-servisi", label: "İzmir beyaz eşya" },
    ],
    relatedBrandLinks: [
      { href: "/servis/arcelik-beyaz-esya-servisi", label: "Arçelik beyaz eşya" },
      { href: "/servis/siemens-beyaz-esya-servisi", label: "Siemens beyaz eşya" },
    ],
    relatedLocationLinks: [
      { href: "/karsiyaka-beyaz-esya-servisi", label: "Karşıyaka beyaz eşya" },
      { href: "/torbali-beyaz-esya-servisi", label: "Torbalı beyaz eşya" },
    ],
    relatedGuideSlugs: ["buzdolabi-sogutmuyor", "bulasik-makinesi-temiz-yikamiyor", "camasir-makinesi-su-bosaltmiyor"],
  },
];

const GUIDE_MAP = new Map(GUIDES.map((g) => [g.slug, g]));

export function getGuideBySlug(slug: string): Guide | undefined {
  return GUIDE_MAP.get(slug);
}

export function getAllGuides(): Guide[] {
  return GUIDES;
}

export function getGuidesByCategory(category: GuideCategory): Guide[] {
  return GUIDES.filter((g) => g.category === category);
}

export function getRelatedGuides(guide: Guide): Guide[] {
  return guide.relatedGuideSlugs
    .map((s) => getGuideBySlug(s))
    .filter((g): g is Guide => Boolean(g));
}

/** Sitemap / generateStaticParams */
export function getAllGuideSlugs(): string[] {
  return GUIDES.map((g) => g.slug);
}
