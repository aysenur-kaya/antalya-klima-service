import { cn } from "@/lib/utils";

export function MobileCardList({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("flex flex-col gap-3 md:hidden", className)}>{children}</div>;
}

export function MobileCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "space-y-3 rounded-xl border border-brand-border bg-white p-4 shadow-[0_2px_12px_-4px_rgba(15,23,42,0.06)]",
        className
      )}
    >
      {children}
    </div>
  );
}

export function MobileCardField({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</span>
      <div className="text-sm text-brand-dark">{children}</div>
    </div>
  );
}

export function MobileCardActions({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-end gap-2 border-t border-brand-border pt-3",
        className
      )}
    >
      {children}
    </div>
  );
}
