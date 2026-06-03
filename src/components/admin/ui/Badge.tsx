import { cn } from "@/lib/utils";

const variants = {
  default: "bg-brand-gray text-brand-dark",
  success: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  warning: "bg-amber-50 text-amber-700 ring-amber-600/20",
  danger: "bg-red-50 text-brand-red ring-brand-red/20",
  brand: "bg-red-50 text-brand-red ring-brand-red/20",
} as const;

export default function Badge({
  children,
  variant = "default",
  className,
}: {
  children: React.ReactNode;
  variant?: keyof typeof variants;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
