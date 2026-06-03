import { cn } from "@/lib/utils";

export function StatusMessage({
  type,
  message,
  className,
}: {
  type: "error" | "success" | "info";
  message: string;
  className?: string;
}) {
  const styles = {
    error: "border-red-100 bg-red-50 text-brand-red",
    success: "border-emerald-100 bg-emerald-50 text-emerald-800",
    info: "border-amber-100 bg-amber-50 text-amber-800",
  };

  return (
    <div
      role={type === "error" ? "alert" : "status"}
      className={cn(
        "rounded-xl border px-4 py-3 text-sm",
        styles[type],
        className
      )}
    >
      {message}
    </div>
  );
}

export function LoadingBlock({ label = "Yükleniyor…" }: { label?: string }) {
  return (
    <div className="flex items-center justify-center py-12 text-sm text-slate-500">
      <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-brand-red border-t-transparent" />
      {label}
    </div>
  );
}
