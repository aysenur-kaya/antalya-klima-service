"use client";

import { useId, useState } from "react";
import { adminTextareaClass } from "@/components/admin/ui/form-styles";
import { markdownToPreviewHtml } from "@/lib/markdown/preview";

type Tab = "edit" | "preview";

export default function MarkdownContentEditor({
  value,
  onChange,
  label = "İçerik",
  placeholder = "Markdown ile yazın: ## Başlık, **kalın**, liste (- madde)",
  minRows = 12,
  disabled = false,
}: {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  minRows?: number;
  disabled?: boolean;
}) {
  const id = useId();
  const [tab, setTab] = useState<Tab>("edit");
  const previewHtml = markdownToPreviewHtml(value);

  return (
    <div className="space-y-2">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <label htmlFor={id} className="text-sm font-medium text-brand-dark">
          {label}
        </label>
        <div
          className="inline-flex w-full rounded-xl border border-brand-border bg-brand-light p-0.5 sm:w-auto"
          role="tablist"
          aria-label="İçerik görünümü"
        >
          <button
            type="button"
            role="tab"
            aria-selected={tab === "edit"}
            onClick={() => setTab("edit")}
            className={`flex-1 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors sm:flex-none ${
              tab === "edit" ? "bg-white text-brand-dark shadow-sm" : "text-slate-500 hover:text-brand-dark"
            }`}
          >
            Düzenle
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === "preview"}
            onClick={() => setTab("preview")}
            className={`flex-1 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors sm:flex-none ${
              tab === "preview" ? "bg-white text-brand-dark shadow-sm" : "text-slate-500 hover:text-brand-dark"
            }`}
          >
            Önizleme
          </button>
        </div>
      </div>

      {tab === "edit" ? (
        <textarea
          id={id}
          className={`${adminTextareaClass} min-h-[200px] resize-y font-mono text-[13px] leading-relaxed sm:min-h-[280px]`}
          rows={minRows}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
        />
      ) : (
        <div
          className="min-h-[200px] max-h-[min(50vh,420px)] overflow-y-auto rounded-xl border border-brand-border bg-white px-4 py-3 sm:min-h-[280px]"
          role="tabpanel"
        >
          {previewHtml ? (
            <div
              className="prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: previewHtml }}
            />
          ) : (
            <p className="text-sm text-slate-400">Önizleme için içerik yazın.</p>
          )}
        </div>
      )}

      <p className="text-xs text-slate-400">
        Markdown desteklenir: ## başlık, **kalın**, liste (- madde), [bağlantı](url)
      </p>
    </div>
  );
}
