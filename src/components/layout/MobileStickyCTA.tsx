"use client";

import { Phone, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { CONTACT_INFO } from "@/lib/constants";

export default function MobileStickyCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200);
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

  return (
    <div
      className={cn(
        "lg:hidden fixed bottom-0 left-0 right-0 z-50 p-3 bg-brand-dark/95 backdrop-blur-md border-t border-white/10 transition-all duration-300 pb-[calc(12px+env(safe-area-inset-bottom))]",
        isVisible && !isMenuOpen
          ? "translate-y-0 opacity-100"
          : "translate-y-full opacity-0"
      )}
    >
      <div className="flex gap-3 max-w-md mx-auto">
        <a
          href={`tel:${CONTACT_INFO.phone}`}
          className="flex-1 bg-brand-red hover:bg-red-700 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95"
        >
          <Phone className="w-5 h-5" />
          <span>Ara</span>
        </a>

        <a
          href={CONTACT_INFO.whatsapp}
          className="flex-1 bg-[#25D366] hover:bg-[#20b858] text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95"
        >
          <MessageCircle className="w-5 h-5" />
          <span>WhatsApp</span>
        </a>
      </div>
    </div>
  );
}