"use client";

import { Phone, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { CONTACT_INFO } from "@/lib/constants";
import { buildWhatsAppUrl, WHATSAPP_PREFILL_GENERAL } from "@/lib/whatsapp";

export default function MobileStickyCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 120);
    };

    const handleMenuState = () => {
      setIsMenuOpen(document.body.classList.contains("mobile-menu-open"));
    };

    handleScroll();
    handleMenuState();

    const observer = new MutationObserver(handleMenuState);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const waHref = buildWhatsAppUrl(WHATSAPP_PREFILL_GENERAL);

  return (
    <div
      className={cn(
        "lg:hidden fixed bottom-0 left-0 right-0 z-[55] p-2.5 bg-[#111111]/92 backdrop-blur-lg border-t border-white/5 transition-all duration-300 pb-[calc(10px+env(safe-area-inset-bottom))]",
        isVisible && !isMenuOpen
          ? "translate-y-0 opacity-100 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]"
          : "translate-y-full opacity-0 pointer-events-none"
      )}
    >
      <div className="flex gap-2.5 max-w-md mx-auto">
        <a
          href={`tel:${CONTACT_INFO.phone}`}
          className="flex-1 bg-brand-red hover:bg-red-700 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-brand-red/10"
        >
          <Phone className="w-4 h-4 shrink-0" aria-hidden />
          <span className="text-sm">Hemen Ara</span>
        </a>

        <a
          href={waHref}
          target="_blank"
          rel="noreferrer"
          className="flex-1 bg-[#25D366] hover:bg-[#20b858] text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-green-500/10"
        >
          <MessageCircle className="w-4 h-4 shrink-0" aria-hidden />
          <span className="text-sm">WhatsApp&apos;tan Yaz</span>
        </a>
      </div>
    </div>
  );
}
