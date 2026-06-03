"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, Menu, Search, LogOut, Loader2, X } from "lucide-react";
import Button from "@/components/admin/ui/Button";
import AdminSearchDropdown from "@/components/admin/layout/AdminSearchDropdown";
import { useAdminDashboardSearch } from "@/components/admin/context/AdminDashboardContext";
import { formatRelativeTime } from "@/lib/admin/format";

type AdminTopbarProps = {
  onMenuClick: () => void;
  title?: string;
};

export default function AdminTopbar({ onMenuClick, title = "Dashboard" }: AdminTopbarProps) {
  const router = useRouter();
  const {
    searchQuery,
    setSearchQuery,
    notifications,
    notificationsLoading,
    unreadNotificationCount,
    refreshNotifications,
    navigateToSection,
  } = useAdminDashboardSearch();
  const [loggingOut, setLoggingOut] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (!searchOpen) return;

    function handlePointerDown(e: MouseEvent | TouchEvent) {
      const target = e.target as Node;
      if (searchRef.current && !searchRef.current.contains(target)) {
        setSearchOpen(false);
      }
    }

    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setSearchOpen(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [searchOpen]);

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
    const next = !notificationsOpen;
    setNotificationsOpen(next);
    if (next) {
      setSearchOpen(false);
      refreshNotifications();
    }
  }

  const hasNotifications = notifications.length > 0;

  return (
    <header className="sticky top-0 z-30 border-b border-brand-border bg-white/90 backdrop-blur-md">
      <div className="flex flex-col gap-2 px-4 py-3 sm:px-6">
        <div className="flex min-h-12 flex-wrap items-center gap-2 sm:h-auto sm:flex-nowrap sm:gap-3">
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
              {unreadNotificationCount > 0 ? (
                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-brand-red ring-2 ring-white" />
              ) : null}
            </button>

            {notificationsOpen ? (
              <div
                className="absolute right-0 top-full z-50 mt-2 w-80 max-w-[320px] overflow-hidden rounded-xl border border-brand-border bg-white shadow-[0_12px_40px_-12px_rgba(15,23,42,0.2)] max-sm:fixed max-sm:right-4 max-sm:top-[4.75rem] max-sm:mt-0 max-sm:w-[calc(100vw-32px)] max-sm:max-w-[calc(100vw-32px)] sm:mt-2"
                role="menu"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between border-b border-brand-border px-4 py-3">
                  <p className="min-w-0 text-sm font-semibold text-brand-dark">Bildirimler</p>
                  <button
                    type="button"
                    onClick={() => setNotificationsOpen(false)}
                    className="rounded-lg p-1 text-slate-500 hover:bg-brand-gray"
                    aria-label="Bildirimleri kapat"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                {notificationsLoading ? (
                  <div className="flex items-center justify-center gap-2 px-4 py-8 text-sm text-slate-500">
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                    Yükleniyor…
                  </div>
                ) : hasNotifications ? (
                  <ul className="max-h-[min(50vh,18rem)] overflow-y-auto overscroll-contain py-1 sm:max-h-72">
                    {notifications.map((n) => (
                      <li key={n.id} className="min-w-0">
                        <button
                          type="button"
                          className="w-full min-w-0 border-b border-brand-border/80 px-4 py-3 text-left last:border-0 hover:bg-brand-light/80"
                          onClick={() => {
                            navigateToSection(n.sectionId);
                            setNotificationsOpen(false);
                          }}
                        >
                          <p className="break-words whitespace-normal text-sm font-medium text-brand-dark">
                            {n.title}
                          </p>
                          <p className="mt-0.5 line-clamp-3 break-words whitespace-normal text-xs leading-relaxed text-slate-500">
                            {n.body}
                          </p>
                          <p className="mt-1 break-words whitespace-normal text-xs text-slate-400">
                            {formatRelativeTime(n.createdAt)}
                          </p>
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="break-words whitespace-normal px-4 py-6 text-center text-sm text-slate-500">
                    Yeni bildiriminiz yok
                  </p>
                )}
              </div>
            ) : null}
          </div>

          <Button
            variant="secondary"
            size="sm"
            className="inline-flex shrink-0 gap-1.5 px-2.5 sm:px-3"
            onClick={handleLogout}
            disabled={loggingOut}
            aria-label="Çıkış yap"
          >
            {loggingOut ? (
              <Loader2 className="h-4 w-4 shrink-0 animate-spin" />
            ) : (
              <LogOut className="h-4 w-4 shrink-0" />
            )}
            <span className="text-xs sm:text-sm">Çıkış</span>
          </Button>
        </div>

        <div className="relative w-full" ref={searchRef}>
          <div className="flex w-full items-center gap-2 rounded-xl border border-brand-border bg-brand-light px-3 py-2 focus-within:border-brand-red/40 focus-within:ring-2 focus-within:ring-brand-red/10">
            <Search className="h-4 w-4 shrink-0 text-slate-400" aria-hidden />
            <input
              type="search"
              placeholder="Panelde ara (hizmet, blog, talep, ilçe…)"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSearchOpen(true);
              }}
              onFocus={() => setSearchOpen(true)}
              className="w-full min-w-0 bg-transparent text-sm text-brand-dark outline-none placeholder:text-slate-400"
              aria-label="Panelde ara"
              aria-expanded={searchOpen && !!searchQuery.trim()}
              aria-controls="admin-search-results"
              autoComplete="off"
            />
            {searchQuery ? (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSearchOpen(false);
                }}
                className="shrink-0 rounded-lg p-1 text-slate-500 hover:bg-white hover:text-brand-red"
                aria-label="Aramayı temizle"
              >
                <X className="h-4 w-4" />
              </button>
            ) : null}
          </div>
          <div id="admin-search-results">
            <AdminSearchDropdown open={searchOpen} onClose={() => setSearchOpen(false)} />
          </div>
        </div>
      </div>
    </header>
  );
}
