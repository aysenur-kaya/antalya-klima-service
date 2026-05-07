"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone, MessageCircle, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { hizmetTipleri, ilceler, allBrands } from "@/lib/data";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Get top 5 items for dropdowns
  const topBölgeler = ilceler.slice(0, 5);
  const topMarkalar = allBrands.slice(0, 5);

  // Mobile accordion state
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const toggleAccordion = (name: string) => {
    setOpenAccordion(openAccordion === name ? null : name);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-white/10",
        isScrolled
          ? "bg-[#111111]/90 backdrop-blur-md shadow-lg py-3"
          : "bg-brand-dark py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-brand-red flex items-center justify-center text-white font-bold text-xl shadow-[0_0_15px_rgba(200,30,30,0.5)] group-hover:scale-105 transition-transform">
              A
            </div>
            <span className="text-xl md:text-2xl font-bold text-white tracking-tight">
              Antalya <span className="text-brand-red">Servisi</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <div className="relative group">
              <button className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors font-medium">
                Hizmetler <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-[#1f1f1f] border border-white/10 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all translate-y-2 group-hover:translate-y-0">
                <div className="p-2 flex flex-col gap-1">
                  {hizmetTipleri.map((hizmet) => (
                    <Link
                      key={hizmet.slug}
                      href={`/${hizmet.slug}`}
                      className="px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                    >
                      {hizmet.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative group">
              <button className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors font-medium">
                Bölgeler <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-[#1f1f1f] border border-white/10 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all translate-y-2 group-hover:translate-y-0">
                <div className="p-2 flex flex-col gap-1">
                  {topBölgeler.map((bolge) => (
                    <Link
                      key={bolge.slug}
                      href={`/${bolge.slug}-klima-servisi`}
                      className="px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                    >
                      {bolge.name}
                    </Link>
                  ))}
                  <div className="my-1 border-t border-white/10" />
                  <Link href="/" className="px-4 py-2 text-sm text-brand-red hover:text-red-400 font-medium">
                    Tüm Bölgeler &rarr;
                  </Link>
                </div>
              </div>
            </div>

            <div className="relative group">
              <button className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors font-medium">
                Markalar <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-[#1f1f1f] border border-white/10 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all translate-y-2 group-hover:translate-y-0">
                <div className="p-2 flex flex-col gap-1">
                  {topMarkalar.map((marka) => (
                    <Link
                      key={marka.slug}
                      href={`/antalya/${marka.slug}-klima-servisi`}
                      className="px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                    >
                      {marka.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            
            <Link href="#iletisim" className="text-gray-300 hover:text-white transition-colors font-medium">
              İletişim
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a href="tel:+905555555555" className="flex items-center gap-2 text-white font-medium hover:text-brand-red transition-colors">
              <Phone className="w-5 h-5 text-brand-red" />
              <span>0555 555 55 55</span>
            </a>
            <a
              href="https://wa.me/905555555555"
              target="_blank"
              rel="noreferrer"
              className="bg-[#25D366] hover:bg-[#20b858] text-white px-5 py-2.5 rounded-full font-medium flex items-center gap-2 transition-all hover:scale-105 shadow-[0_0_15px_rgba(37,211,102,0.3)]"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "lg:hidden absolute top-full left-0 right-0 bg-[#111111] border-b border-white/10 transition-all duration-300 overflow-y-auto",
          isMobileMenuOpen 
            ? "opacity-100 visible pointer-events-auto h-[calc(100vh_-_70px)]" 
            : "opacity-0 invisible pointer-events-none h-0"
        )}
      >
        <div className="p-4 flex flex-col gap-4 min-h-[calc(100vh_-_80px)]">
          
          {/* Hizmetler Accordion */}
          <div className="flex flex-col border-b border-white/10">
            <button 
              onClick={() => toggleAccordion('hizmetler')}
              className="flex items-center justify-between py-4 text-white font-medium"
            >
              Hizmetler
              <ChevronDown className={cn("w-5 h-5 text-gray-400 transition-transform duration-300", openAccordion === 'hizmetler' ? "rotate-180" : "")} />
            </button>
            <div className={cn("flex flex-col gap-2 overflow-hidden transition-all duration-300", openAccordion === 'hizmetler' ? "max-h-[500px] pb-4 opacity-100" : "max-h-0 opacity-0")}>
              {hizmetTipleri.map((hizmet) => (
                <Link
                  key={hizmet.slug}
                  href={`/${hizmet.slug}`}
                  className="text-gray-300 text-sm py-2 px-4 rounded-lg hover:bg-white/5 hover:text-white transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {hizmet.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Bölgeler Accordion */}
          <div className="flex flex-col border-b border-white/10">
            <button 
              onClick={() => toggleAccordion('bolgeler')}
              className="flex items-center justify-between py-4 text-white font-medium"
            >
              Bölgeler
              <ChevronDown className={cn("w-5 h-5 text-gray-400 transition-transform duration-300", openAccordion === 'bolgeler' ? "rotate-180" : "")} />
            </button>
            <div className={cn("flex flex-col gap-2 overflow-hidden transition-all duration-300", openAccordion === 'bolgeler' ? "max-h-[500px] pb-4 opacity-100" : "max-h-0 opacity-0")}>
              {topBölgeler.map((bolge) => (
                <Link
                  key={bolge.slug}
                  href={`/${bolge.slug}-klima-servisi`}
                  className="text-gray-300 text-sm py-2 px-4 rounded-lg hover:bg-white/5 hover:text-white transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {bolge.name}
                </Link>
              ))}
              <Link href="/" className="text-brand-red font-medium text-sm py-2 px-4 hover:text-red-400" onClick={() => setIsMobileMenuOpen(false)}>
                Tüm Bölgeler &rarr;
              </Link>
            </div>
          </div>

          {/* Markalar Accordion */}
          <div className="flex flex-col border-b border-white/10">
            <button 
              onClick={() => toggleAccordion('markalar')}
              className="flex items-center justify-between py-4 text-white font-medium"
            >
              Markalar
              <ChevronDown className={cn("w-5 h-5 text-gray-400 transition-transform duration-300", openAccordion === 'markalar' ? "rotate-180" : "")} />
            </button>
            <div className={cn("flex flex-col gap-2 overflow-hidden transition-all duration-300", openAccordion === 'markalar' ? "max-h-[500px] pb-4 opacity-100" : "max-h-0 opacity-0")}>
              {topMarkalar.map((marka) => (
                <Link
                  key={marka.slug}
                  href={`/antalya/${marka.slug}-${marka.type}-servisi`}
                  className="text-gray-300 text-sm py-2 px-4 rounded-lg hover:bg-white/5 hover:text-white transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {marka.name}
                </Link>
              ))}
            </div>
          </div>

          {/* İletişim Link */}
          <div className="flex flex-col border-b border-white/10">
            <Link 
              href="#iletisim"
              className="py-4 text-white font-medium flex items-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              İletişim
            </Link>
          </div>
          
          <div className="flex-1" />
          
          <div className="flex flex-col gap-3 mt-6 pb-6">
            <a href="tel:+905555555555" className="flex items-center justify-center gap-2 bg-white/10 text-white p-3 rounded-xl font-medium transition-all active:scale-95">
              <Phone className="w-5 h-5 text-brand-red" />
              Hemen Ara: 0555 555 55 55
            </a>
            <a href="https://wa.me/905555555555" className="flex items-center justify-center gap-2 bg-[#25D366] text-white p-3 rounded-xl font-medium transition-all active:scale-95">
              <MessageCircle className="w-5 h-5" />
              WhatsApp'tan Yaz
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
