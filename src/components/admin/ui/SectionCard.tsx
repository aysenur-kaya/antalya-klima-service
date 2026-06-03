import { cn } from "@/lib/utils";

export default function SectionCard({
  id,
  title,
  description,
  action,
  children,
  className,
}: {
  id?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-24 rounded-2xl border border-brand-border bg-white shadow-[0_4px_24px_-8px_rgba(15,23,42,0.06)]",
        className
      )}
    >
      <div className="flex flex-col gap-3 border-b border-brand-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <h2 className="text-lg font-semibold text-brand-dark">{title}</h2>
          {description ? (
            <p className="mt-0.5 text-sm text-slate-500">{description}</p>
          ) : null}
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
      <div className="p-5 sm:p-6">{children}</div>
    </section>
  );
}
