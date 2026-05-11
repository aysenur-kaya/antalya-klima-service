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

const dropPanel =
  "bg-white/95 backdrop-blur-xl border border-white/40 rounded-xl shadow-[0_20px_50px_-12px_rgba(198,40,40,0.22)] ring-1 ring-black/5";

const dropItem =
  "px-4 py-2 text-sm text-neutral-700 hover:text-brand-red hover:bg-red-50 rounded-lg transition-colors";

/** Masaüstü nav: açık kırmızı bar üzerinde */
function navOnRed(active: boolean, menuOpen: boolean, extra = "") {
  return cn(
    "flex items-center gap-1 font-medium transition-all duration-200 rounded-lg px-2 py-1 -mx-0.5",
    extra,
    active
      ? "text-white font-semibold bg-white/20 ring-1 ring-white/40 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.22)]"
      : menuOpen
        ? "text-white"
        : "text-white/90 hover:text-white hover:bg-white/12"
  );
}

function simpleLinkOnRed(active: boolean) {
  return cn(
    "transition-all duration-200 rounded-lg px-2 py-1 -mx-0.5 font-medium",
    active
      ? "text-white font-semibold bg-white/20 ring-1 ring-white/38"
      : "text-white/90 hover:text-white hover:bg-white/10"
  );
}

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

  const isHizmetPath = pathname === "/hizmetler" || pathname.startsWith("/hizmetler/");
  const isBolgePath = pathname === "/bolgeler" || pathname.startsWith("/bolgeler/");
  const isServisPath = pathname === "/servis" || pathname.startsWith("/servis/");

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 isolate transition-all duration-500 ease-out",
          "border-b border-white/25",
          isMobileMenuOpen && "z-[70]",
          isScrolled || isMobileMenuOpen
            ? "py-3 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.22)] backdrop-blur-xl backdrop-saturate-125"
            : "py-5 shadow-[0_8px_32px_-14px_rgba(0,0,0,0.16)] backdrop-blur-md backdrop-saturate-125"
        )}
      >
        {/* Tek renk kurumsal kırmızı; scroll’da hafif cam */}
        <div
          aria-hidden
          className={cn(
            "absolute inset-0 -z-20 bg-[#c62828] transition-[opacity,background-color] duration-500",
            isScrolled || isMobileMenuOpen ? "opacity-[0.96]" : "opacity-100"
          )}
        />
        <div
          aria-hidden
          className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none"
        />

        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="flex items-center justify-between">
            <Link href="/" onClick={closeAllMenus} className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-white/18 backdrop-blur-md border border-white/40 flex items-center justify-center text-white font-bold text-lg md:text-xl shadow-[0_6px_24px_rgba(0,0,0,0.12),inset_0_1px_0_0_rgba(255,255,255,0.45)] group-hover:scale-[1.04] transition-transform duration-300">
                A
              </div>
              <span className="text-xl md:text-2xl font-bold text-white tracking-tight drop-shadow-md">
                Antalya <span className="text-white/85 font-extrabold">Servisi</span>
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-7" onMouseLeave={closeAllMenus}>
              <div className="relative" onMouseEnter={() => setOpenDesktopMenu("hizmetler")}>
                <Link
                  href="/hizmetler"
                  onClick={closeAllMenus}
                  className={navOnRed(isHizmetPath, openDesktopMenu === "hizmetler")}
                >
                  Hizmetler
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 text-white/65 transition-transform pointer-events-none",
                      openDesktopMenu === "hizmetler" ? "rotate-180" : ""
                    )}
                  />
                </Link>
                {openDesktopMenu === "hizmetler" && (
                  <div className="absolute top-full left-0 z-50 w-56 pt-2" role="presentation">
                    <div className={dropPanel}>
                      <div className="p-2 flex flex-col gap-1">
                        <Link
                          href="/hizmetler"
                          onClick={closeAllMenus}
                          className="px-4 py-2 text-sm text-brand-red font-semibold rounded-lg hover:bg-red-50 transition-colors"
                        >
                          {"Tüm Hizmetler →"}
                        </Link>
                        <div className="my-1 border-t border-gray-100" />
                        {hizmetMenuItems.map((item) => (
                          <Link key={item.href} href={item.href} onClick={closeAllMenus} className={dropItem}>
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
                  className={navOnRed(isBolgePath, openDesktopMenu === "bolgeler")}
                >
                  Bölgeler
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 text-white/65 transition-transform pointer-events-none",
                      openDesktopMenu === "bolgeler" ? "rotate-180" : ""
                    )}
                  />
                </Link>
                {openDesktopMenu === "bolgeler" && (
                  <div className="absolute top-full left-0 z-50 w-52 pt-2" role="presentation">
                    <div className={dropPanel}>
                      <div className="p-2 flex flex-col gap-1">
                        {topBölgeler.map((bolge) => (
                          <Link key={bolge.href} href={bolge.href} onClick={closeAllMenus} className={dropItem}>
                            {bolge.name}
                          </Link>
                        ))}
                        <div className="my-1 border-t border-gray-100" />
                        <Link
                          href="/antalya"
                          onClick={closeAllMenus}
                          className="text-left px-4 py-2 text-sm text-brand-red hover:bg-red-50 font-medium rounded-lg transition-colors"
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
                  className={navOnRed(isServisPath, openDesktopMenu === "markalar")}
                >
                  Markalar
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 text-white/65 transition-transform pointer-events-none",
                      openDesktopMenu === "markalar" ? "rotate-180" : ""
                    )}
                  />
                </Link>
                {openDesktopMenu === "markalar" && (
                  <div className="absolute top-full left-0 z-50 w-56 pt-2" role="presentation">
                    <div className={dropPanel}>
                      <div className="p-2 flex flex-col gap-1">
                        <p className="px-4 pt-1 pb-0.5 text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Klima</p>
                        {topKlimaMarkalar.map((marka) => (
                          <Link
                            key={`desktop-klima-${marka.slug}`}
                            href={`/servis/${marka.slug}-klima-servisi`}
                            onClick={closeAllMenus}
                            className={dropItem}
                          >
                            {marka.name}
                          </Link>
                        ))}
                        <Link
                          href="/servis"
                          onClick={closeAllMenus}
                          className="px-4 py-1.5 text-sm text-brand-red font-semibold flex items-center gap-1 hover:bg-red-50 rounded-lg"
                        >
                          {"Tümünü Gör →"}
                        </Link>
                        <div className="my-1 border-t border-gray-100" />
                        <p className="px-4 pt-1 pb-0.5 text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Beyaz Eşya</p>
                        {topBeyazEsyaMarkalar.map((marka) => (
                          <Link
                            key={`desktop-beyaz-${marka.slug}`}
                            href={`/servis/${marka.slug}-beyaz-esya-servisi`}
                            onClick={closeAllMenus}
                            className={dropItem}
                          >
                            {marka.name}
                          </Link>
                        ))}
                        <Link
                          href="/servis"
                          onClick={closeAllMenus}
                          className="px-4 py-1.5 text-sm text-brand-red font-semibold flex items-center gap-1 hover:bg-red-50 rounded-lg"
                        >
                          {"Tümünü Gör →"}
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Link href="/rehber" onClick={closeAllMenus} className={simpleLinkOnRed(isRehberActive)}>
                Rehber
              </Link>

              <Link href="/iletisim" onClick={closeAllMenus} className={simpleLinkOnRed(isIletisimActive)}>
                İletişim
              </Link>
            </nav>

            <div className="hidden lg:flex items-center gap-3">
              <a
                href={`tel:${phone}`}
                onClick={closeAllMenus}
                className="flex items-center gap-2 text-white font-medium pr-1 transition-colors duration-200 hover:text-white"
              >
                <Phone className="w-5 h-5 text-white/90 shrink-0" aria-hidden />
                <span className="text-white/95">{phoneFormatted}</span>
              </a>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                onClick={closeAllMenus}
                className="border-2 border-white/90 text-white bg-white/10 hover:bg-white hover:text-[#c62828] hover:border-white px-5 py-2.5 rounded-full font-semibold flex items-center gap-2 transition-colors duration-200 shadow-[0_4px_18px_rgba(0,0,0,0.12)] backdrop-blur-sm"
              >
                <MessageCircle className="w-5 h-5 shrink-0" aria-hidden />
                WhatsApp
              </a>
            </div>

            <button
              type="button"
              className="lg:hidden text-white p-2 relative z-[70] rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#c62828] hover:bg-white/10 transition-colors"
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
          "lg:hidden fixed inset-0 z-[60] bg-white transition-all duration-300 overflow-y-auto",
          isMobileMenuOpen
            ? "opacity-100 visible pointer-events-auto"
            : "opacity-0 invisible pointer-events-none translate-y-full"
        )}
      >
        <div className="p-5 flex flex-col gap-6 min-h-full pt-24 pb-[calc(4rem+env(safe-area-inset-bottom))]">
          <div className="border-b border-gray-200">
            <div className="flex items-stretch min-h-[52px]">
              <Link
                href="/hizmetler"
                onClick={closeAllMenus}
                className="flex-1 flex items-center py-3.5 text-neutral-900 font-semibold text-base active:text-brand-red transition-colors"
              >
                Hizmetler
              </Link>
              <span className="w-px bg-gray-200 my-2.5 shrink-0" />
              <button
                type="button"
                onClick={() => toggleAccordion("hizmetler")}
                aria-label="Hizmetler alt menüsünü aç/kapat"
                aria-expanded={openAccordion === "hizmetler"}
                className="flex items-center justify-center w-14 text-neutral-500 hover:text-brand-red active:bg-gray-50 transition-colors shrink-0"
              >
                <ChevronDown
                  className={cn("w-4 h-4 transition-transform duration-300", openAccordion === "hizmetler" ? "rotate-180" : "")}
                />
              </button>
            </div>
            <div
              className={cn(
                "flex flex-col gap-1 overflow-hidden transition-all duration-300",
                openAccordion === "hizmetler" ? "max-h-[600px] pb-4 opacity-100" : "max-h-0 opacity-0"
              )}
            >
              {hizmetMenuItems.map((item) => (
                <Link
                  key={`mobile-hizmet-${item.href}`}
                  href={item.href}
                  onClick={closeAllMenus}
                  className="text-neutral-700 text-sm py-2.5 pl-4 pr-2 rounded-lg hover:bg-red-50 hover:text-brand-red active:text-brand-red transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="border-b border-gray-200">
            <div className="flex items-stretch min-h-[52px]">
              <Link
                href="/bolgeler"
                onClick={closeAllMenus}
                className="flex-1 flex items-center py-3.5 text-neutral-900 font-semibold text-base active:text-brand-red transition-colors"
              >
                Bölgeler
              </Link>
              <span className="w-px bg-gray-200 my-2.5 shrink-0" />
              <button
                type="button"
                onClick={() => toggleAccordion("bolgeler")}
                aria-label="Bölgeler alt menüsünü aç/kapat"
                aria-expanded={openAccordion === "bolgeler"}
                className="flex items-center justify-center w-14 text-neutral-500 hover:text-brand-red active:bg-gray-50 transition-colors shrink-0"
              >
                <ChevronDown
                  className={cn("w-4 h-4 transition-transform duration-300", openAccordion === "bolgeler" ? "rotate-180" : "")}
                />
              </button>
            </div>
            <div
              className={cn(
                "flex flex-col gap-1 overflow-hidden transition-all duration-300",
                openAccordion === "bolgeler" ? "max-h-[500px] pb-4 opacity-100" : "max-h-0 opacity-0"
              )}
            >
              {topBölgeler.map((bolge) => (
                <Link
                  key={`mobile-bolge-${bolge.href}`}
                  href={bolge.href}
                  onClick={closeAllMenus}
                  className="text-neutral-700 text-sm py-2.5 pl-4 pr-2 rounded-lg hover:bg-red-50 hover:text-brand-red transition-colors"
                >
                  {bolge.name}
                </Link>
              ))}
              <Link
                href="/antalya"
                onClick={closeAllMenus}
                className="text-brand-red font-semibold text-sm py-2.5 pl-4 pr-2 hover:bg-red-50 rounded-lg transition-colors"
              >
                {"Antalya Rehberi →"}
              </Link>
            </div>
          </div>

          <div className="border-b border-gray-200">
            <div className="flex items-stretch min-h-[52px]">
              <Link
                href="/servis"
                onClick={closeAllMenus}
                className="flex-1 flex items-center py-3.5 text-neutral-900 font-semibold text-base active:text-brand-red transition-colors"
              >
                Markalar
              </Link>
              <span className="w-px bg-gray-200 my-2.5 shrink-0" />
              <button
                type="button"
                onClick={() => toggleAccordion("markalar")}
                aria-label="Markalar alt menüsünü aç/kapat"
                aria-expanded={openAccordion === "markalar"}
                className="flex items-center justify-center w-14 text-neutral-500 hover:text-brand-red active:bg-gray-50 transition-colors shrink-0"
              >
                <ChevronDown
                  className={cn("w-4 h-4 transition-transform duration-300", openAccordion === "markalar" ? "rotate-180" : "")}
                />
              </button>
            </div>
            <div
              className={cn(
                "overflow-hidden transition-all duration-300",
                openAccordion === "markalar" ? "max-h-[800px] pb-4 opacity-100" : "max-h-0 opacity-0"
              )}
            >
              <div className="flex flex-col gap-1">
                <p className="pl-4 pt-1 pb-1 text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Klima</p>
                {topKlimaMarkalar.map((marka) => (
                  <Link
                    key={`mobile-klima-${marka.slug}`}
                    href={`/servis/${marka.slug}-klima-servisi`}
                    onClick={closeAllMenus}
                    className="text-neutral-700 text-sm py-2.5 pl-4 pr-2 rounded-lg hover:bg-red-50 hover:text-brand-red transition-colors"
                  >
                    {marka.name}
                  </Link>
                ))}
                <Link
                  href="/servis"
                  onClick={closeAllMenus}
                  className="text-brand-red font-semibold text-sm py-2 pl-4 pr-2 hover:bg-red-50 rounded-lg transition-colors"
                >
                  {"Tümünü Gör →"}
                </Link>
                <div className="my-2 border-t border-gray-100 mx-4" />
                <p className="pl-4 pt-1 pb-1 text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Beyaz Eşya</p>
                {topBeyazEsyaMarkalar.map((marka) => (
                  <Link
                    key={`mobile-beyaz-${marka.slug}`}
                    href={`/servis/${marka.slug}-beyaz-esya-servisi`}
                    onClick={closeAllMenus}
                    className="text-neutral-700 text-sm py-2.5 pl-4 pr-2 rounded-lg hover:bg-red-50 hover:text-brand-red transition-colors"
                  >
                    {marka.name}
                  </Link>
                ))}
                <Link
                  href="/servis"
                  onClick={closeAllMenus}
                  className="text-brand-red font-semibold text-sm py-2 pl-4 pr-2 hover:bg-red-50 rounded-lg transition-colors"
                >
                  {"Tümünü Gör →"}
                </Link>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-200">
            <Link
              href="/rehber"
              onClick={closeAllMenus}
              className={cn(
                "flex items-center min-h-[52px] py-3.5 font-semibold text-base transition-colors",
                isRehberActive ? "text-brand-red" : "text-neutral-900 active:text-brand-red"
              )}
            >
              Rehber
            </Link>
          </div>

          <div className="border-b border-gray-200">
            <Link
              href="/iletisim"
              onClick={closeAllMenus}
              className={cn(
                "flex items-center min-h-[52px] py-3.5 font-semibold text-base transition-colors",
                isIletisimActive ? "text-brand-red" : "text-neutral-900 active:text-brand-red"
              )}
            >
              İletişim
            </Link>
          </div>

          <div className="flex-1" />

          <div className="flex flex-col gap-3 mt-auto pt-10">
            <p className="text-center text-xs text-neutral-500 font-medium mb-1 uppercase tracking-widest">Acil Teknik Destek</p>
            <a
              href={`tel:${phone}`}
              onClick={closeAllMenus}
              className="flex items-center justify-center gap-3 bg-brand-red text-white p-4 rounded-xl font-bold transition-all active:scale-95 shadow-md shadow-brand-red/25"
            >
              <Phone className="w-5 h-5 shrink-0" aria-hidden />
              {phoneFormatted}
            </a>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              onClick={closeAllMenus}
              className="flex items-center justify-center gap-3 border-2 border-brand-red text-brand-red hover:bg-brand-red hover:text-white p-4 rounded-xl font-bold transition-all active:scale-95"
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
