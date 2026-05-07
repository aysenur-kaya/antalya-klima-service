import Link from "next/link";
import { Phone, MessageCircle, MapPin, Clock } from "lucide-react";
import { hizmetTipleri, ilceler, allBrands } from "@/lib/data";

export default function Footer() {
  // Get highlighted data for footer
  const popularIlceler = ilceler.slice(0, 9);
  const popularKlimaMarkalari = allBrands.filter(b => ["mitsubishi", "daikin", "arcelik", "beko", "bosch", "samsung"].includes(b.slug));
  const popularBeyazEsyaMarkalari = allBrands.filter(b => ["bosch", "siemens", "profilo", "arcelik", "beko", "vestel"].includes(b.slug));

  return (
    <footer className="relative bg-brand-dark pt-20 pb-10 overflow-hidden text-gray-300">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-red/10 blur-[120px] pointer-events-none rounded-full" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Top Section / Brand & CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 border-b border-white/10 pb-12 mb-12">
          <div className="flex flex-col items-start gap-4">
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
          
          <div className="flex flex-col sm:flex-row gap-4 items-center lg:justify-end">
            <div className="text-center sm:text-right mr-0 sm:mr-4">
              <p className="text-white font-medium text-lg">Aynı Gün Servis</p>
              <p className="text-sm text-gray-400">Hemen uzman ekibimizi çağırın</p>
            </div>
            <a href="tel:+905555555555" className="w-full sm:w-auto bg-brand-red hover:bg-red-700 text-white px-6 py-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-all hover:-translate-y-1 shadow-[0_10px_20px_rgba(200,30,30,0.3)]">
              <Phone className="w-5 h-5" />
              0555 555 55 55
            </a>
            <a href="https://wa.me/905555555555" className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20b858] text-white px-6 py-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-all hover:-translate-y-1 shadow-[0_10px_20px_rgba(37,211,102,0.3)]">
              <MessageCircle className="w-5 h-5" />
              WhatsApp
            </a>
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
              <li><Link href="/klima-servisi" className="hover:text-brand-red hover:pl-2 transition-all inline-block">Klima Servisi</Link></li>
              <li><Link href="/klima-bakim-servisi" className="hover:text-brand-red hover:pl-2 transition-all inline-block">Klima Bakım</Link></li>
              <li><Link href="/klima-tamir-servisi" className="hover:text-brand-red hover:pl-2 transition-all inline-block">Klima Tamir</Link></li>
              <li><Link href="/klima-montaj-servisi" className="hover:text-brand-red hover:pl-2 transition-all inline-block">Klima Montaj</Link></li>
              <li className="mt-2"><Link href="/beyaz-esya-servisi" className="hover:text-brand-red hover:pl-2 transition-all inline-block">Beyaz Eşya Servisi</Link></li>
              <li><Link href="/buzdolabi-servisi" className="hover:text-brand-red hover:pl-2 transition-all inline-block">Buzdolabı Servisi</Link></li>
              <li><Link href="/camasir-makinesi-servisi" className="hover:text-brand-red hover:pl-2 transition-all inline-block">Çamaşır Makinesi Servisi</Link></li>
            </ul>
          </div>

          {/* Hizmet Bölgeleri */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-brand-red rounded-full"></span>
              Hizmet Bölgeleri
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {popularIlceler.map(ilce => (
                <Link 
                  key={ilce.slug} 
                  href={`/${ilce.slug}-klima-servisi`}
                  className="hover:text-brand-red transition-colors text-sm"
                >
                  {ilce.name}
                </Link>
              ))}
            </div>
            <Link href="/" className="inline-block mt-4 text-sm text-brand-red hover:text-red-400">
              Tüm Bölgeleri Gör &rarr;
            </Link>
          </div>

          {/* Markalar */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-brand-red rounded-full"></span>
              Öne Çıkan Markalar
            </h4>
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold mb-2 tracking-wider">Klima</p>
                <div className="flex flex-wrap gap-2">
                  {popularKlimaMarkalari.map(b => (
                    <Link key={`klima-${b.slug}`} href={`/antalya/${b.slug}-klima-servisi`} className="text-xs border border-white/10 hover:border-brand-red hover:text-white px-2 py-1 rounded transition-colors bg-white/5">
                      {b.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold mb-2 tracking-wider">Beyaz Eşya</p>
                <div className="flex flex-wrap gap-2">
                  {popularBeyazEsyaMarkalari.map(b => (
                    <Link key={`beyaz-${b.slug}`} href={`/antalya/${b.slug}-beyaz-esya-servisi`} className="text-xs border border-white/10 hover:border-brand-red hover:text-white px-2 py-1 rounded transition-colors bg-white/5">
                      {b.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* İletişim */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-brand-red rounded-full"></span>
              İletişim
            </h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-red shrink-0 mt-0.5" />
                <span className="text-sm">Antalya, Türkiye<br />Tüm ilçelere aynı gün servis.</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-brand-red shrink-0 mt-0.5" />
                <span className="text-sm">0555 555 55 55<br />7/24 Çağrı Merkezi</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-brand-red shrink-0 mt-0.5" />
                <span className="text-sm">Pzt - Cts: 08:30 - 19:30<br />Pazar: Nöbetçi Ekip</span>
              </li>
            </ul>
            

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Antalya Servisi. Tüm hakları saklıdır.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-white transition-colors">KVKK</Link>
            <Link href="#" className="hover:text-white transition-colors">Gizlilik Politikası</Link>
            <Link href="#" className="hover:text-white transition-colors">Kullanım Şartları</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
