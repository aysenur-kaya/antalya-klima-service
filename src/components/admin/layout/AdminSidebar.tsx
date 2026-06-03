"use client";

import Link from "next/link";
import { X, Wind, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { adminNavItems } from "@/components/admin/layout/admin-nav";

type AdminSidebarProps = {
  open: boolean;
  onClose: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
};

export default function AdminSidebar({
  open,
  onClose,
  activeSection,
  onNavigate,
}: AdminSidebarProps) {
  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-40 bg-brand-dark/40 backdrop-blur-sm transition-opacity lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={onClose}
        aria-hidden
      />

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[min(100%,280px)] flex-col border-r border-brand-border bg-white shadow-xl transition-transform duration-300 lg:static lg:z-auto lg:w-64 lg:translate-x-0 lg:shadow-none",
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-brand-border px-4">
          <Link href="/admin" className="flex items-center gap-2.5" onClick={onClose}>
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-red to-brand-red-dark text-white shadow-[0_4px_14px_-4px_rgba(198,40,40,0.5)]">
              <Wind className="h-5 w-5" aria-hidden />
            </span>
            <div>
              <p className="text-sm font-semibold text-brand-dark">İzmir Servisi</p>
              <p className="text-xs text-slate-500">Yönetim Paneli</p>
            </div>
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 hover:bg-brand-gray lg:hidden"
            aria-label="Menüyü kapat"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Menü
          </p>
          <ul className="space-y-0.5">
            {adminNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(item.id);
                      onClose();
                    }}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                      isActive
                        ? "bg-gradient-to-r from-brand-red to-brand-red-dark text-white shadow-[0_4px_14px_-6px_rgba(198,40,40,0.55)]"
                        : "text-slate-600 hover:bg-red-50 hover:text-brand-red"
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0" aria-hidden />
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-brand-border p-4">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-center gap-2 rounded-xl border border-brand-border bg-brand-light px-3 py-2.5 text-sm font-medium text-brand-dark transition-colors hover:border-brand-red/30 hover:bg-red-50/50"
          >
            <ExternalLink className="h-4 w-4 text-brand-red" aria-hidden />
            Siteyi Görüntüle
          </Link>
          <p className="mt-3 text-center text-xs text-slate-400">Önizleme · Auth yok</p>
        </div>
      </aside>
    </>
  );
}
