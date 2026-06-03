import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  MessageSquare,
  Wrench,
  FileText,
  Search,
  MapPin,
  Phone,
  Star,
  Settings,
} from "lucide-react";

export type AdminNavItem = {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
};

export const adminNavItems: AdminNavItem[] = [
  { id: "overview", label: "Genel Bakış", href: "#overview", icon: LayoutDashboard },
  { id: "requests", label: "Müşteri Talepleri", href: "#requests", icon: MessageSquare },
  { id: "services", label: "Hizmet Yönetimi", href: "#services", icon: Wrench },
  { id: "blog", label: "Blog / İçerik", href: "#blog", icon: FileText },
  { id: "seo", label: "SEO Ayarları", href: "#seo", icon: Search },
  { id: "districts", label: "İlçe / Mahalle", href: "#districts", icon: MapPin },
  { id: "contact", label: "WhatsApp & Telefon", href: "#contact", icon: Phone },
  { id: "testimonials", label: "Yorumlar", href: "#testimonials", icon: Star },
  { id: "settings", label: "Genel Ayarlar", href: "#settings", icon: Settings },
];
