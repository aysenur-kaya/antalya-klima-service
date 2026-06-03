"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, Menu, Search, LogOut, Loader2 } from "lucide-react";
import Button from "@/components/admin/ui/Button";

type AdminTopbarProps = {
  onMenuClick: () => void;
  title?: string;
};

export default function AdminTopbar({ onMenuClick, title = "Dashboard" }: AdminTopbarProps) {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch {
      setLoggingOut(false);
    }
  }

  return (
    <header className="sticky top-0 z-30 border-b border-brand-border bg-white/90 backdrop-blur-md">
      <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-xl border border-brand-border p-2 text-brand-dark hover:bg-brand-gray lg:hidden"
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

        <div className="hidden max-w-xs flex-1 items-center gap-2 rounded-xl border border-brand-border bg-brand-light px-3 py-2 md:flex">
          <Search className="h-4 w-4 shrink-0 text-slate-400" aria-hidden />
          <input
            type="search"
            placeholder="Panelde ara…"
            className="w-full bg-transparent text-sm text-brand-dark outline-none placeholder:text-slate-400"
            disabled
            aria-label="Arama (yakında)"
          />
        </div>

        <button
          type="button"
          className="relative rounded-xl border border-brand-border p-2 text-slate-600 hover:bg-brand-gray"
          aria-label="Bildirimler"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-brand-red ring-2 ring-white" />
        </button>

        <Button
          variant="secondary"
          size="sm"
          className="hidden sm:inline-flex"
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
    </header>
  );
}
