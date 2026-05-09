import { Phone, MessageCircle } from "lucide-react";
import { CONTACT_INFO } from "@/lib/constants";

export default function ContactCTA() {
  return (
    <section className="py-20 bg-brand-light relative overflow-hidden" id="iletisim">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="bg-brand-red rounded-3xl p-8 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
          {/* Decorative Background */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[50px] rounded-full" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 blur-[50px] rounded-full" />
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Arıza Kaydı Oluşturun</h2>
            <p className="text-lg md:text-xl text-white/90 mb-10">
              {"Antalya geneli aynı gün servis garantisiyle uzman ekiplerimiz kapınızda. Hemen bizi arayın veya WhatsApp'tan yazın."}
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href={`tel:${CONTACT_INFO.phone}`} className="bg-white text-brand-red hover:bg-gray-50 px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all hover:scale-105 shadow-lg text-lg">
                <Phone className="w-6 h-6" />
                {CONTACT_INFO.phoneFormatted}
              </a>
              <a href={CONTACT_INFO.whatsapp} className="bg-[#25D366] text-white hover:bg-[#20b858] px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all hover:scale-105 shadow-lg text-lg">
                <MessageCircle className="w-6 h-6" />
                {"WhatsApp'tan Yaz"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
