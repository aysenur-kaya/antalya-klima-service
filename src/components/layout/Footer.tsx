import Link from "next/link";
import { Phone, MapPin, Clock } from "lucide-react";
import { ilceler } from "@/lib/data";
import { cn } from "@/lib/utils";
import { CONTACT_INFO } from "@/lib/constants";
import { allServicePages } from "@/lib/services";

export default function Footer() {
  const popularIlceler = ilceler.slice(0, 9);
  return (
    <footer className="relative bg-neutral-50 pt-20 pb-10 overflow-hidden text-neutral-700 border-t border-gray-200">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[240px] bg-brand-red/[0.018] blur-[90px] pointer-events-none rounded-full" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="border-b border-gray-200 pb-12 mb-12">
          <div className="flex flex-col items-start gap-4 max-w-xl">
            <Link href="/" className="flex items-center gap-2 group mb-2">
              <div className="w-12 h-12 rounded-xl bg-brand-red flex items-center justify-center text-white font-bold text-2xl shadow-md shadow-brand-red/20 group-hover:scale-105 transition-transform">
                A
              </div>
              <span className="text-2xl md:text-3xl font-bold text-neutral-900 tracking-tight">
                Antalya <span className="text-brand-red">Servisi</span>
              </span>
            </Link>
            <p className="text-lg text-neutral-600 max-w-md leading-relaxed">
              Antalya genelinde klima ve beyaz eşya servis ihtiyaçlarınız için hızlı, güvenilir ve profesyonel teknik destek sunuyoruz.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="text-neutral-900 font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-brand-red rounded-full" />
              Hizmetlerimiz
            </h4>
            <ul className="flex flex-col gap-3">
              {allServicePages.map((service, index) => (
                <li key={service.slug} className={cn(index >= 5 ? "hidden md:block" : "block")}>
                  <Link
                    href={`/hizmetler/${service.slug}`}
                    className="text-neutral-700 hover:text-brand-red transition-colors inline-block font-medium"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/rehber" className="text-neutral-700 hover:text-brand-red transition-colors inline-block font-medium">
                  Teknik rehber
                </Link>
              </li>
              <li className="mt-2">
                <Link href="/hizmetler" className="text-brand-red hover:text-[#9f1414] transition-colors inline-block font-bold">
                  {"Tüm Hizmetler →"}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-neutral-900 font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-brand-red rounded-full" />
              Hizmet Bölgeleri
            </h4>
            <div className="flex flex-col gap-3">
              {popularIlceler.map((ilce, index) => (
                <Link
                  key={`footer-loc-${ilce.slug}`}
                  href={`/bolgeler/${ilce.slug}`}
                  className={cn(
                    "text-sm font-medium text-neutral-700 hover:text-brand-red transition-colors",
                    index >= 5 ? "hidden md:block" : "block"
                  )}
                >
                  {ilce.name}
                </Link>
              ))}
            </div>
            <Link
              href="/antalya"
              className="group inline-flex items-center mt-4 text-sm font-semibold text-brand-red hover:text-[#9f1414] transition-colors"
            >
              Antalya Rehberini Gör
              <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>

          <div>
            <h4 className="text-neutral-900 font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-brand-red rounded-full" />
              Markalar
            </h4>
            <Link
              href="/servis"
              className="text-brand-red hover:text-[#9f1414] transition-colors inline-block font-bold"
            >
              {"Tüm Markalar →"}
            </Link>
          </div>

          <div>
            <h4 className="text-neutral-900 font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-brand-red rounded-full" />
              İletişim Bilgileri
            </h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-red shrink-0 mt-0.5" aria-hidden />
                <div className="text-sm text-neutral-700">
                  <strong className="block text-neutral-900 mb-1">{CONTACT_INFO.name}</strong>
                  {CONTACT_INFO.addressFull}
                  <br />
                  Antalya / Türkiye
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-brand-red shrink-0 mt-0.5" aria-hidden />
                <div className="text-sm text-neutral-700">
                  <strong className="block text-neutral-900 mb-1">7/24 Teknik Destek</strong>
                  <a href={`tel:${CONTACT_INFO.phone}`} className="text-brand-red hover:text-[#9f1414] transition-colors">
                    {CONTACT_INFO.phoneFormatted}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-brand-red shrink-0 mt-0.5" aria-hidden />
                <div className="text-sm text-neutral-700">
                  <strong className="block text-neutral-900 mb-1">Çalışma Saatleri</strong>
                  {CONTACT_INFO.workingHours}
                  <br />
                  Pazar: Nöbetçi Ekip
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mb-10 p-6 bg-white rounded-2xl border border-gray-200 shadow-sm">
          <p className="text-xs text-neutral-600 leading-relaxed italic text-center">
            <strong className="text-neutral-800">Yasal Uyarı:</strong> {CONTACT_INFO.name}, marka bağımsız çalışan{" "}
            <strong>özel bir teknik servistir</strong>. Sitemizde adı geçen markalar ve logolar ilgili firmaların tescilli markalarıdır ve
            sadece bilgilendirme amacıyla (marka bağımsız özel servis hizmeti verildiğini belirtmek için) kullanılmıştır. Firmamız bu
            markaların yetkili servisi değildir, <strong>garanti dışı cihazlara</strong> özel servis hizmeti vermektedir.
          </p>
        </div>

        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-neutral-500">
          <p>
            &copy; {new Date().getFullYear()} {CONTACT_INFO.name}. Tüm hakları saklıdır.
          </p>
          <div className="flex gap-4">
            <Link href="/kvkk" className="text-neutral-600 hover:text-brand-red transition-colors">
              KVKK
            </Link>
            <Link href="/gizlilik-politikasi" className="text-neutral-600 hover:text-brand-red transition-colors">
              Gizlilik Politikası
            </Link>
            <Link href="/kullanim-sartlari" className="text-neutral-600 hover:text-brand-red transition-colors">
              Kullanım Şartları
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
