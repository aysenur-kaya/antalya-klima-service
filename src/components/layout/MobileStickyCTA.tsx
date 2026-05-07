"use client";

import { Phone, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function MobileStickyCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show after scrolling down a bit
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={cn(
        "lg:hidden fixed bottom-0 left-0 right-0 z-50 p-3 bg-brand-dark/95 backdrop-blur-md border-t border-white/10 transition-transform duration-300",
        isVisible ? "translate-y-0" : "translate-y-full"
      )}
    >
      <div className="flex gap-3 max-w-md mx-auto">
        <a
          href="tel:+905555555555"
          className="flex-1 bg-brand-red hover:bg-red-700 text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 shadow-lg transition-colors"
        >
          <Phone className="w-5 h-5" />
          Ara
        </a>
        <a
          href="https://wa.me/905555555555"
          className="flex-1 bg-[#25D366] hover:bg-[#20b858] text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 shadow-lg transition-colors"
        >
          <MessageCircle className="w-5 h-5" />
          WhatsApp
        </a>
      </div>
    </div>
  );
}
