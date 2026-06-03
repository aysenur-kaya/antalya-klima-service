"use client";

import { X } from "lucide-react";

export default function SimpleModal({
  title,
  open,
  onClose,
  children,
}: {
  title: string;
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-brand-dark/40 backdrop-blur-sm" onClick={onClose} aria-hidden />
      <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-brand-border bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-brand-border px-5 py-4">
          <h3 className="text-lg font-semibold text-brand-dark">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-500 hover:bg-brand-gray"
            aria-label="Kapat"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}
