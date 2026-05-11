"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, MessageCircle, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type HeaderMenuData = {
  hizmet: { name: string; href: string }[];
  bolgeler: { name: string; href: string }[];
  klimaMarkalar: { name: string; slug: string }[];
  beyazMarkalar: { name: string; slug: string }[];
};

export default function HeaderClient({
  menuData,
  phone,
  phoneFormatted,
  whatsappHref,
}: {
  menuData: HeaderMenuData;
  phone: string;
  phoneFormatted: string;
  whatsappHref: string;
}) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [openDesktopMenu, setOpenDesktopMenu] = useState<string | null>(null);

  const closeAllMenus = useCallback(() => {
    setIsMobileMenuOpen(false);
    setOpenAccordion(null);
    setOpenDesktopMenu(null);
  }, []);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 10);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add("mobile-menu-open");
      document.body.style.overflow = "hidden";
    } else {
      document.body.classList.remove("mobile-menu-open");
      document.body.style.overflow = "";
    }
  }, [isMobileMenuOpen]);

  const { hizmet: hizmetMenuItems, bolgeler: topBölgeler, klimaMarkalar: topKlimaMarkalar, beyazMarkalar: topBeyazEsyaMarkalar } =
    menuData;

  const toggleAccordion = (name: string) => {
    setOpenAccordion((prev) => (prev === name ? null : name));
  };

  const isRehberActive = pathname === "/rehber" || pathname.startsWith("/rehber/");
  const isIletisimActive = pathname === "/iletisim";

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 transition-all duration-300 border-b border-white/15",
          isMobileMenuOpen ? "z-[70] bg-brand-dark" : "z-50",
          isScrolled || isMobileMenuOpen
            ? "bg-brand-dark/92 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.45)] py-3"
            : "bg-brand-dark py-5"
        )}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            <Link href="/" onClick={closeAllMenus} className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-brand-red flex items-center justify-center text-white font-bold text-xl border border-white/20 shadow-[0_0_18px_rgba(200,30,30,0.55)] group-hover:scale-105 transition-transform">
                A
              </div>
              <span className="text-xl md:text-2xl font-bold text-white tracking-tight">
                Antalya <span className="text-brand-red">Servisi</span>
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-8" onMouseLeave={closeAllMenus}>
              <div className="relative" onMouseEnter={() => setOpenDesktopMenu("hizmetler")}>
                <Link
                  href="/hizmetler"
                  onClick={closeAllMenus}
                  className="flex items-center gap-1 text-white/85 hover:text-white transition-colors font-medium"
                >
                  Hizmetler
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 text-white/55 transition-transform pointer-events-none",
                      openDesktopMenu === "hizmetler" ? "rotate-180" : ""
                    )}
                  />
                </Link>
                {openDesktopMenu === "hizmetler" && (
                  <div className="absolute top-full left-0 z-50 w-56 pt-2" role="presentation">
                    <div className="bg-[#1a1212] border border-white/15 rounded-xl shadow-xl ring-1 ring-brand-red/15">
                      <div className="p-2 flex flex-col gap-1">
                        <Link
                          href="/hizmetler"
                          onClick={closeAllMenus}
                          className="px-4 py-2 text-sm text-brand-red hover:text-red-300 font-semibold rounded-lg transition-colors"
                        >
                          {"Tüm Hizmetler →"}
                        </Link>
                        <div className="my-1 border-t border-white/10" />
                        {hizmetMenuItems.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={closeAllMenus}
                            className="px-4 py-2 text-sm text-white/85 hover:text-white hover:bg-brand-red/20 rounded-lg transition-colors"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="relative" onMouseEnter={() => setOpenDesktopMenu("bolgeler")}>
                <Link
                  href="/bolgeler"
                  onClick={closeAllMenus}
                  className="flex items-center gap-1 text-white/85 hover:text-white transition-colors font-medium"
                >
                  Bölgeler
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 text-white/55 transition-transform pointer-events-none",
                      openDesktopMenu === "bolgeler" ? "rotate-180" : ""
                    )}
                  />
                </Link>
                {openDesktopMenu === "bolgeler" && (
                  <div className="absolute top-full left-0 z-50 w-52 pt-2" role="presentation">
                    <div className="bg-[#1a1212] border border-white/15 rounded-xl shadow-xl ring-1 ring-brand-red/15">
                      <div className="p-2 flex flex-col gap-1">
                        {topBölgeler.map((bolge) => (
                          <Link
                            key={bolge.href}
                            href={bolge.href}
                            onClick={closeAllMenus}
                            className="px-4 py-2 text-sm text-white/85 hover:text-white hover:bg-brand-red/20 rounded-lg transition-colors"
                          >
                            {bolge.name}
                          </Link>
                        ))}
                        <div className="my-1 border-t border-white/10" />
                        <Link
                          href="/antalya"
                          onClick={closeAllMenus}
                          className="text-left px-4 py-2 text-sm text-brand-red hover:text-red-300 font-medium"
                        >
                          {"Antalya Rehberi →"}
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="relative" onMouseEnter={() => setOpenDesktopMenu("markalar")}>
                <Link
                  href="/servis"
                  onClick={closeAllMenus}
                  className="flex items-center gap-1 text-white/85 hover:text-white transition-colors font-medium"
                >
                  Markalar
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 text-white/55 transition-transform pointer-events-none",
                      openDesktopMenu === "markalar" ? "rotate-180" : ""
                    )}
                  />
                </Link>
                {openDesktopMenu === "markalar" && (
                  <div className="absolute top-full left-0 z-50 w-56 pt-2" role="presentation">
                    <div className="bg-[#1a1212] border border-white/15 rounded-xl shadow-xl ring-1 ring-brand-red/15">
                      <div className="p-2 flex flex-col gap-1">
                        <p className="px-4 pt-1 pb-0.5 text-[10px] uppercase tracking-widest text-white/45 font-bold">Klima</p>
                        {topKlimaMarkalar.map((marka) => (
                          <Link
                            key={`desktop-klima-${marka.slug}`}
                            href={`/servis/${marka.slug}-klima-servisi`}
                            onClick={closeAllMenus}
                            className="px-4 py-2 text-sm text-white/85 hover:text-white hover:bg-brand-red/20 rounded-lg transition-colors"
                          >
                            {marka.name}
                          </Link>
                        ))}
                        <Link
                          href="/servis"
                          onClick={closeAllMenus}
                          className="px-4 py-1.5 text-sm text-brand-red hover:text-red-300 font-semibold flex items-center gap-1"
                        >
                          {"Tümünü Gör →"}
                        </Link>
                        <div className="my-1 border-t border-white/10" />
                        <p className="px-4 pt-1 pb-0.5 text-[10px] uppercase tracking-widest text-white/45 font-bold">Beyaz Eşya</p>
                        {topBeyazEsyaMarkalar.map((marka) => (
                          <Link
                            key={`desktop-beyaz-${marka.slug}`}
                            href={`/servis/${marka.slug}-beyaz-esya-servisi`}
                            onClick={closeAllMenus}
                            className="px-4 py-2 text-sm text-white/85 hover:text-white hover:bg-brand-red/20 rounded-lg transition-colors"
                          >
                            {marka.name}
                          </Link>
                        ))}
                        <Link
                          href="/servis"
                          onClick={closeAllMenus}
                          className="px-4 py-1.5 text-sm text-brand-red hover:text-red-300 font-semibold flex items-center gap-1"
                        >
                          {"Tümünü Gör →"}
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/rehber"
                onClick={closeAllMenus}
                className={cn(
                  "transition-colors font-medium",
                  isRehberActive ? "text-brand-red" : "text-white/85 hover:text-white"
                )}
              >
                Rehber
              </Link>

              <Link
                href="/iletisim"
                onClick={closeAllMenus}
                className={cn(
                  "transition-colors font-medium",
                  isIletisimActive ? "text-brand-red" : "text-white/85 hover:text-white"
                )}
              >
                İletişim
              </Link>
            </nav>

            <div className="hidden lg:flex items-center gap-4">
              <a
                href={`tel:${phone}`}
                onClick={closeAllMenus}
                className="flex items-center gap-2 text-white font-medium hover:text-brand-red transition-colors"
              >
                <Phone className="w-5 h-5 text-brand-red" />
                <span>{phoneFormatted}</span>
              </a>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                onClick={closeAllMenus}
                className="border-2 border-white text-white hover:bg-white hover:text-brand-dark px-5 py-2.5 rounded-full font-medium flex items-center gap-2 transition-all hover:scale-105 shadow-[0_4px_20px_rgba(255,255,255,0.08)]"
              >
                <MessageCircle className="w-5 h-5 shrink-0" aria-hidden />
                WhatsApp
              </a>
            </div>

            <button
              type="button"
              className="lg:hidden text-white p-2 relative z-[70] rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#111111]"
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              aria-label={isMobileMenuOpen ? "Menüyü kapat" : "Menüyü aç"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="site-mobile-nav"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      <div
        id="site-mobile-nav"
        className={cn(
          "lg:hidden fixed inset-0 z-[60] bg-brand-dark transition-all duration-300 overflow-y-auto",
          isMobileMenuOpen
            ? "opacity-100 visible pointer-events-auto"
            : "opacity-0 invisible pointer-events-none translate-y-full"
        )}
      >
        <div className="p-5 flex flex-col gap-6 min-h-full pt-24 pb-[calc(4rem+env(safe-area-inset-bottom))]">
          <div className="border-b border-white/10">
            <div className="flex items-stretch min-h-[52px]">
              <Link
                href="/hizmetler"
                onClick={closeAllMenus}
                className="flex-1 flex items-center py-3.5 text-white font-semibold text-base active:text-brand-red transition-colors"
              >
                Hizmetler
              </Link>
              <span className="w-px bg-white/10 my-2.5 shrink-0" />
              <button
                type="button"
                onClick={() => toggleAccordion("hizmetler")}
                aria-label="Hizmetler alt menüsünü aç/kapat"
                aria-expanded={openAccordion === "hizmetler"}
                className="flex items-center justify-center w-14 text-white/50 hover:text-white active:bg-white/5 transition-colors shrink-0"
              >
                <ChevronDown className={cn("w-4 h-4 transition-transform duration-300", openAccordion === "hizmetler" ? "rotate-180" : "")} />
              </button>
            </div>
            <div className={cn("flex flex-col gap-1 overflow-hidden transition-all duration-300", openAccordion === "hizmetler" ? "max-h-[600px] pb-4 opacity-100" : "max-h-0 opacity-0")}>
              {hizmetMenuItems.map((item) => (
                <Link
                  key={`mobile-hizmet-${item.href}`}
                  href={item.href}
                  onClick={closeAllMenus}
                  className="text-white/75 text-sm py-2.5 pl-4 pr-2 rounded-lg hover:bg-brand-red/15 hover:text-white active:text-brand-red transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="border-b border-white/10">
            <div className="flex items-stretch min-h-[52px]">
              <Link
                href="/bolgeler"
                onClick={closeAllMenus}
                className="flex-1 flex items-center py-3.5 text-white font-semibold text-base active:text-brand-red transition-colors"
              >
                Bölgeler
              </Link>
              <span className="w-px bg-white/10 my-2.5 shrink-0" />
              <button
                type="button"
                onClick={() => toggleAccordion("bolgeler")}
                aria-label="Bölgeler alt menüsünü aç/kapat"
                aria-expanded={openAccordion === "bolgeler"}
                className="flex items-center justify-center w-14 text-white/50 hover:text-white active:bg-white/5 transition-colors shrink-0"
              >
                <ChevronDown className={cn("w-4 h-4 transition-transform duration-300", openAccordion === "bolgeler" ? "rotate-180" : "")} />
              </button>
            </div>
            <div className={cn("flex flex-col gap-1 overflow-hidden transition-all duration-300", openAccordion === "bolgeler" ? "max-h-[500px] pb-4 opacity-100" : "max-h-0 opacity-0")}>
              {topBölgeler.map((bolge) => (
                <Link
                  key={`mobile-bolge-${bolge.href}`}
                  href={bolge.href}
                  onClick={closeAllMenus}
                  className="text-white/75 text-sm py-2.5 pl-4 pr-2 rounded-lg hover:bg-brand-red/15 hover:text-white active:text-brand-red transition-colors"
                >
                  {bolge.name}
                </Link>
              ))}
              <Link
                href="/antalya"
                onClick={closeAllMenus}
                className="text-brand-red font-semibold text-sm py-2.5 pl-4 pr-2 hover:text-red-300 transition-colors"
              >
                {"Antalya Rehberi →"}
              </Link>
            </div>
          </div>

          <div className="border-b border-white/10">
            <div className="flex items-stretch min-h-[52px]">
              <Link
                href="/servis"
                onClick={closeAllMenus}
                className="flex-1 flex items-center py-3.5 text-white font-semibold text-base active:text-brand-red transition-colors"
              >
                Markalar
              </Link>
              <span className="w-px bg-white/10 my-2.5 shrink-0" />
              <button
                type="button"
                onClick={() => toggleAccordion("markalar")}
                aria-label="Markalar alt menüsünü aç/kapat"
                aria-expanded={openAccordion === "markalar"}
                className="flex items-center justify-center w-14 text-white/50 hover:text-white active:bg-white/5 transition-colors shrink-0"
              >
                <ChevronDown className={cn("w-4 h-4 transition-transform duration-300", openAccordion === "markalar" ? "rotate-180" : "")} />
              </button>
            </div>
            <div className={cn("overflow-hidden transition-all duration-300", openAccordion === "markalar" ? "max-h-[800px] pb-4 opacity-100" : "max-h-0 opacity-0")}>
              <div className="flex flex-col gap-1">
                <p className="pl-4 pt-1 pb-1 text-[10px] uppercase tracking-widest text-white/45 font-bold">Klima</p>
                {topKlimaMarkalar.map((marka) => (
                  <Link
                    key={`mobile-klima-${marka.slug}`}
                    href={`/servis/${marka.slug}-klima-servisi`}
                    onClick={closeAllMenus}
                    className="text-white/75 text-sm py-2.5 pl-4 pr-2 rounded-lg hover:bg-brand-red/15 hover:text-white active:text-brand-red transition-colors"
                  >
                    {marka.name}
                  </Link>
                ))}
                <Link href="/servis" onClick={closeAllMenus} className="text-brand-red font-semibold text-sm py-2 pl-4 pr-2 hover:text-red-300 transition-colors">
                  {"Tümünü Gör →"}
                </Link>
                <div className="my-2 border-t border-white/5 mx-4" />
                <p className="pl-4 pt-1 pb-1 text-[10px] uppercase tracking-widest text-white/45 font-bold">Beyaz Eşya</p>
                {topBeyazEsyaMarkalar.map((marka) => (
                  <Link
                    key={`mobile-beyaz-${marka.slug}`}
                    href={`/servis/${marka.slug}-beyaz-esya-servisi`}
                    onClick={closeAllMenus}
                    className="text-white/75 text-sm py-2.5 pl-4 pr-2 rounded-lg hover:bg-brand-red/15 hover:text-white active:text-brand-red transition-colors"
                  >
                    {marka.name}
                  </Link>
                ))}
                <Link href="/servis" onClick={closeAllMenus} className="text-brand-red font-semibold text-sm py-2 pl-4 pr-2 hover:text-red-300 transition-colors">
                  {"Tümünü Gör →"}
                </Link>
              </div>
            </div>
          </div>

          <div className="border-b border-white/10">
            <Link
              href="/rehber"
              onClick={closeAllMenus}
              className={cn(
                "flex items-center min-h-[52px] py-3.5 font-semibold text-base transition-colors",
                isRehberActive ? "text-brand-red" : "text-white active:text-brand-red"
              )}
            >
              Rehber
            </Link>
          </div>

          <div className="border-b border-white/10">
            <Link
              href="/iletisim"
              onClick={closeAllMenus}
              className={cn(
                "flex items-center min-h-[52px] py-3.5 font-semibold text-base transition-colors",
                isIletisimActive ? "text-brand-red" : "text-white active:text-brand-red"
              )}
            >
              İletişim
            </Link>
          </div>

          <div className="flex-1" />

          <div className="flex flex-col gap-3 mt-auto pt-10">
            <p className="text-center text-xs text-white/50 font-medium mb-1 uppercase tracking-widest">Acil Teknik Destek</p>
            <a
              href={`tel:${phone}`}
              onClick={closeAllMenus}
              className="flex items-center justify-center gap-3 bg-brand-red text-white border border-white/15 p-4 rounded-xl font-bold transition-all active:scale-95 shadow-[0_8px_24px_rgba(200,30,30,0.35)]"
            >
              <Phone className="w-5 h-5 shrink-0" aria-hidden />
              {phoneFormatted}
            </a>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              onClick={closeAllMenus}
              className="flex items-center justify-center gap-3 border-2 border-white text-white hover:bg-white hover:text-brand-dark p-4 rounded-xl font-bold transition-all active:scale-95"
            >
              <MessageCircle className="w-5 h-5 shrink-0" aria-hidden />
              {"WhatsApp'tan Yaz"}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
