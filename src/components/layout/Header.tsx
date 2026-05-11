import { CONTACT_INFO } from "@/lib/constants";
import { ilceler, klimaMarkalari, beyazEsyaMarkalari } from "@/lib/data";
import { allServicePages } from "@/lib/services";
import { buildWhatsAppUrl, WHATSAPP_PREFILL_GENERAL } from "@/lib/whatsapp";
import HeaderClient from "./HeaderClient";

export default function Header() {
  const menuData = {
    hizmet: allServicePages.map((s) => ({ name: s.title, href: `/hizmetler/${s.slug}` })),
    bolgeler: ilceler.slice(0, 6).map((i) => ({ name: i.name, href: `/bolgeler/${i.slug}` })),
    klimaMarkalar: klimaMarkalari.slice(0, 4).map((m) => ({ name: m.name, slug: m.slug })),
    beyazMarkalar: beyazEsyaMarkalari.slice(0, 4).map((m) => ({ name: m.name, slug: m.slug })),
  };

  return (
    <HeaderClient
      menuData={menuData}
      phone={CONTACT_INFO.phone}
      phoneFormatted={CONTACT_INFO.phoneFormatted}
      whatsappHref={buildWhatsAppUrl(WHATSAPP_PREFILL_GENERAL)}
    />
  );
}
