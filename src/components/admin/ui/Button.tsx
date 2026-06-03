import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-brand-red text-white hover:bg-brand-red-dark shadow-[0_4px_14px_-4px_rgba(198,40,40,0.45)]",
  secondary:
    "bg-white text-brand-dark border border-brand-border hover:bg-brand-light shadow-sm",
  ghost: "text-brand-dark hover:bg-brand-gray",
  danger: "bg-red-50 text-brand-red hover:bg-red-100 border border-red-100",
} as const;

const sizes = {
  sm: "h-8 px-3 text-xs",
  md: "h-9 px-4 text-sm",
  lg: "h-10 px-5 text-sm",
} as const;

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  type = "button",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
}) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
