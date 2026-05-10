import Link from "next/link";
import { Phone, MessageCircle, MapPin, Clock } from "lucide-react";
import { ilceler, klimaMarkalari, beyazEsyaMarkalari } from "@/lib/data";
import { cn } from "@/lib/utils";
import { CONTACT_INFO } from "@/lib/constants";
import { allServicePages } from "@/lib/services";

export default function Footer() {
  // Get highlighted data for footer
  const popularIlceler = ilceler.slice(0, 9);
  const popularKlimaMarkalari = klimaMarkalari.filter(b => ["mitsubishi", "daikin", "arcelik", "beko", "bosch", "samsung"].includes(b.slug));
  const popularBeyazEsyaMarkalari = beyazEsyaMarkalari.filter(b => ["bosch", "siemens", "profilo", "arcelik", "beko", "vestel"].includes(b.slug));

  return (
    <footer className="relative bg-brand-dark pt-20 pb-10 overflow-hidden text-gray-300">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-red/10 blur-[120px] pointer-events-none rounded-full" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Top Section / Brand only — telefon/WhatsApp CTA global ContactCTA bileşenindedir */}
        <div className="border-b border-white/10 pb-12 mb-12">
          <div className="flex flex-col items-start gap-4 max-w-xl">
            <Link href="/" className="flex items-center gap-2 group mb-2">
              <div className="w-12 h-12 rounded-xl bg-brand-red flex items-center justify-center text-white font-bold text-2xl shadow-[0_0_20px_rgba(200,30,30,0.4)] group-hover:scale-105 transition-transform">
                A
              </div>
              <span className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                Antalya <span className="text-brand-red">Servisi</span>
              </span>
            </Link>
            <p className="text-lg text-gray-400 max-w-md">
              Antalya genelinde klima ve beyaz eşya servis ihtiyaçlarınız için hızlı, güvenilir ve profesyonel teknik destek sunuyoruz.
            </p>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Hizmetler */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-brand-red rounded-full"></span>
              Hizmetlerimiz
            </h4>
            <ul className="flex flex-col gap-3">
              {allServicePages.map((service, index) => (
                <li key={service.slug} className={cn(index >= 5 ? "hidden md:block" : "block")}>
                  <Link href={`/hizmetler/${service.slug}`} className="hover:text-brand-red transition-all inline-block font-medium">
                    {service.title}
                  </Link>
                </li>
              ))}
              <li className="mt-2">
                <Link href="/hizmetler" className="text-brand-red hover:text-red-400 transition-all inline-block font-bold">
                  {"Tüm Hizmetler →"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Hizmet Bölgeleri */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-brand-red rounded-full"></span>
              Hizmet Bölgeleri
            </h4>
            <div className="flex flex-col gap-3">
              {popularIlceler.map((ilce, index) => (
                <Link 
                  key={`footer-loc-${ilce.slug}`} 
                  href={`/bolgeler/${ilce.slug}`}
                  className={cn(
                    "hover:text-brand-red transition-colors text-sm font-medium",
                    index >= 5 ? "hidden md:block" : "block"
                  )}
                >
                  {ilce.name}
                </Link>
              ))}
            </div>
            <Link 
              href="/antalya" 
              className="group inline-flex items-center mt-4 text-sm font-semibold text-brand-red hover:text-red-400 transition-colors"
            >
              Antalya Rehberini Gör 
              <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>

          {/* Markalar */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-brand-red rounded-full"></span>
              Öne Çıkan Markalar
            </h4>
            <div className="flex flex-col gap-6">
              <div>
                <p className="text-[10px] text-gray-500 uppercase font-bold mb-3 tracking-widest">Klima</p>
                <div className="grid grid-cols-2 lg:grid-cols-2 gap-2 md:flex md:flex-col md:gap-2">
                  {popularKlimaMarkalari.map((b, index) => (
                    <Link 
                      key={`footer-klima-${b.slug}`} 
                      href={`/servis/${b.slug}-klima-servisi`} 
                      className={`text-sm hover:text-brand-red transition-colors ${index >= 3 ? "hidden md:block" : "block"}`}
                    >
                      {b.name}
                    </Link>
                  ))}
                  <Link href="/servis" className="text-xs font-bold text-brand-red hover:text-red-400 mt-1">
                    {"Tümünü Gör →"}
                  </Link>
                </div>
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase font-bold mb-3 tracking-widest">Beyaz Eşya</p>
                <div className="grid grid-cols-2 lg:grid-cols-2 gap-2 md:flex md:flex-col md:gap-2">
                  {popularBeyazEsyaMarkalari.map((b, index) => (
                    <Link 
                      key={`footer-beyaz-${b.slug}`} 
                      href={`/servis/${b.slug}-beyaz-esya-servisi`} 
                      className={`text-sm hover:text-brand-red transition-colors ${index >= 3 ? "hidden md:block" : "block"}`}
                    >
                      {b.name}
                    </Link>
                  ))}
                  <Link href="/servis" className="text-xs font-bold text-brand-red hover:text-red-400 mt-1">
                    {"Tümünü Gör →"}
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* İletişim & NAP */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-brand-red rounded-full"></span>
              İletişim Bilgileri
            </h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-red shrink-0 mt-0.5" />
                <div className="text-sm">
                  <strong className="block text-white mb-1">{CONTACT_INFO.name}</strong>
                  {CONTACT_INFO.addressFull}<br />
                  Antalya / Türkiye
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-brand-red shrink-0 mt-0.5" />
                <div className="text-sm">
                  <strong className="block text-white mb-1">7/24 Teknik Destek</strong>
                  <a href={`tel:${CONTACT_INFO.phone}`} className="hover:text-brand-red transition-colors">
                    {CONTACT_INFO.phoneFormatted}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-brand-red shrink-0 mt-0.5" />
                <div className="text-sm">
                  <strong className="block text-white mb-1">Çalışma Saatleri</strong>
                  {CONTACT_INFO.workingHours}<br />
                  Pazar: Nöbetçi Ekip
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer / Trust Signal */}
        <div className="mb-10 p-6 bg-white/5 rounded-2xl border border-white/10">
          <p className="text-xs text-gray-400 leading-relaxed italic text-center">
            <strong>Yasal Uyarı:</strong> {CONTACT_INFO.name}, marka bağımsız çalışan <strong>özel bir teknik servistir</strong>. Sitemizde adı geçen markalar ve logolar ilgili firmaların tescilli markalarıdır ve sadece bilgilendirme amacıyla (marka bağımsız özel servis hizmeti verildiğini belirtmek için) kullanılmıştır. Firmamız bu markaların yetkili servisi değildir, <strong>garanti dışı cihazlara</strong> özel servis hizmeti vermektedir.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} {CONTACT_INFO.name}. Tüm hakları saklıdır.</p>
          <div className="flex gap-4">
            <Link href="/kvkk" className="hover:text-white transition-colors">KVKK</Link>
            <Link href="/gizlilik-politikasi" className="hover:text-white transition-colors">Gizlilik Politikası</Link>
            <Link href="/kullanim-sartlari" className="hover:text-white transition-colors">Kullanım Şartları</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
