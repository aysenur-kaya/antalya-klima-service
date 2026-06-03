"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, Menu, Search, LogOut, Loader2, X } from "lucide-react";
import Button from "@/components/admin/ui/Button";
import { useAdminDashboardSearch } from "@/components/admin/context/AdminDashboardContext";

const SAMPLE_NOTIFICATIONS = [
  {
    id: "1",
    title: "Yeni müşteri talebi",
    body: "Karşıyaka — Klima bakımı talebi alındı.",
    time: "5 dk önce",
    unread: true,
  },
  {
    id: "2",
    title: "Blog taslağı",
    body: "Yaz sezonu kontrol listesi taslak olarak kayıtlı.",
    time: "1 saat önce",
    unread: true,
  },
  {
    id: "3",
    title: "İlçe landing",
    body: "Bornova landing sayfası aktif.",
    time: "Dün",
    unread: false,
  },
];

type AdminTopbarProps = {
  onMenuClick: () => void;
  title?: string;
};

export default function AdminTopbar({ onMenuClick, title = "Dashboard" }: AdminTopbarProps) {
  const router = useRouter();
  const { searchQuery, setSearchQuery } = useAdminDashboardSearch();
  const [loggingOut, setLoggingOut] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!notificationsOpen) return;

    function handlePointerDown(e: MouseEvent | TouchEvent) {
      const target = e.target as Node;
      if (notificationsRef.current && !notificationsRef.current.contains(target)) {
        setNotificationsOpen(false);
      }
    }

    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setNotificationsOpen(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [notificationsOpen]);

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await fetch("/api/admin/auth/logout", { method: "POST", credentials: "same-origin" });
      router.push("/admin/login");
      router.refresh();
    } catch {
      setLoggingOut(false);
    }
  }

  function toggleNotifications(e: React.MouseEvent) {
    e.stopPropagation();
    setNotificationsOpen((open) => !open);
  }

  const hasNotifications = SAMPLE_NOTIFICATIONS.length > 0;

  return (
    <header className="sticky top-0 z-30 border-b border-brand-border bg-white/90 backdrop-blur-md">
      <div className="flex flex-col gap-2 px-4 py-3 sm:px-6">
        <div className="flex h-12 items-center gap-2 sm:h-auto sm:gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            className="shrink-0 rounded-xl border border-brand-border p-2 text-brand-dark hover:bg-brand-gray lg:hidden"
            aria-label="Menüyü aç"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="min-w-0 flex-1">
            <h1 className="truncate text-lg font-semibold text-brand-dark sm:text-xl">{title}</h1>
            <p className="hidden text-sm text-slate-500 sm:block">
              İzmir Klima Servisi · Yönetim özeti
            </p>
          </div>

          <div className="relative shrink-0" ref={notificationsRef}>
            <button
              type="button"
              onClick={toggleNotifications}
              className={`relative rounded-xl border p-2 transition-colors ${
                notificationsOpen
                  ? "border-brand-red/30 bg-red-50 text-brand-red"
                  : "border-brand-border text-slate-600 hover:bg-brand-gray"
              }`}
              aria-label="Bildirimler"
              aria-expanded={notificationsOpen}
              aria-haspopup="true"
            >
              <Bell className="h-5 w-5" />
              {hasNotifications ? (
                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-brand-red ring-2 ring-white" />
              ) : null}
            </button>

            {notificationsOpen ? (
              <div
                className="absolute right-0 top-full z-50 mt-2 w-[min(100vw-2rem,320px)] overflow-hidden rounded-xl border border-brand-border bg-white shadow-[0_12px_40px_-12px_rgba(15,23,42,0.2)]"
                role="menu"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between border-b border-brand-border px-4 py-3">
                  <p className="text-sm font-semibold text-brand-dark">Bildirimler</p>
                  <button
                    type="button"
                    onClick={() => setNotificationsOpen(false)}
                    className="rounded-lg p-1 text-slate-500 hover:bg-brand-gray"
                    aria-label="Bildirimleri kapat"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                {hasNotifications ? (
                  <ul className="max-h-72 overflow-y-auto py-1">
                    {SAMPLE_NOTIFICATIONS.map((n) => (
                      <li
                        key={n.id}
                        className="cursor-default border-b border-brand-border/80 px-4 py-3 last:border-0 hover:bg-brand-light/80"
                      >
                        <p className="text-sm font-medium text-brand-dark">{n.title}</p>
                        <p className="mt-0.5 text-xs text-slate-500">{n.body}</p>
                        <p className="mt-1 text-xs text-slate-400">{n.time}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="px-4 py-6 text-center text-sm text-slate-500">
                    Yeni bildiriminiz yok
                  </p>
                )}
              </div>
            ) : null}
          </div>

          <Button
            variant="secondary"
            size="sm"
            className="hidden shrink-0 sm:inline-flex"
            onClick={handleLogout}
            disabled={loggingOut}
            aria-label="Çıkış yap"
          >
            {loggingOut ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <LogOut className="h-4 w-4" />
            )}
            Çıkış
          </Button>
        </div>

        {/* Arama: tüm ekran genişliklerinde aktif */}
        <div className="flex w-full items-center gap-2 rounded-xl border border-brand-border bg-brand-light px-3 py-2 focus-within:border-brand-red/40 focus-within:ring-2 focus-within:ring-brand-red/10">
          <Search className="h-4 w-4 shrink-0 text-slate-400" aria-hidden />
          <input
            ref={searchInputRef}
            type="search"
            placeholder="Panelde ara (hizmet, blog, talep, ilçe…)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full min-w-0 bg-transparent text-sm text-brand-dark outline-none placeholder:text-slate-400"
            aria-label="Panelde ara"
          />
          {searchQuery ? (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="shrink-0 rounded-lg p-1 text-slate-500 hover:bg-white hover:text-brand-red"
              aria-label="Aramayı temizle"
            >
              <X className="h-4 w-4" />
            </button>
          ) : null}
        </div>
      </div>
    </header>
  );
}
