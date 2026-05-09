import { Phone, CheckCircle2 } from "lucide-react";
import { CONTACT_INFO } from "@/lib/constants";

export default function HeroSection({ 
  title, 
  subtitle 
}: { 
  title: string; 
  subtitle: string; 
}) {
  return (
    <section className="relative premium-gradient text-white pt-[128px] pb-20 lg:pt-[164px] lg:pb-32 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-red/20 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-brand-red font-medium text-sm mb-6 shadow-sm border border-brand-red/20">
            <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse"></span>
            {"Antalya'nın Güvenilir Servisi"}
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
            {title}
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed md:leading-loose opacity-90">
            {subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <a href={`tel:${CONTACT_INFO.phone}`} className="w-full sm:w-auto bg-brand-red hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all hover:scale-105 shadow-[0_10px_20px_rgba(200,30,30,0.3)] text-lg">
              <Phone className="w-6 h-6" />
              Hemen Servis Çağır
            </a>
            <a href={CONTACT_INFO.whatsapp} className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20b858] text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all hover:scale-105 shadow-[0_10px_20px_rgba(37,211,102,0.3)] text-lg">
              {"WhatsApp'tan Yaz"}
            </a>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-400 font-medium">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-brand-red" />
              <span>Aynı Gün Servis</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-brand-red" />
              <span>Garantili İşlem</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-brand-red" />
              <span>Uzman Ekip</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
