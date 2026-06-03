import { TrendingDown, TrendingUp, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DashboardStat } from "@/components/admin/types";

const trendConfig = {
  up: { icon: TrendingUp, className: "text-emerald-600", label: "artış" },
  down: { icon: TrendingDown, className: "text-brand-red", label: "düşüş" },
  neutral: { icon: Minus, className: "text-slate-500", label: "sabit" },
} as const;

export default function StatCard({ stat }: { stat: DashboardStat }) {
  const trend = trendConfig[stat.trend];
  const TrendIcon = trend.icon;

  return (
    <div className="rounded-2xl border border-brand-border bg-white p-5 shadow-[0_4px_24px_-8px_rgba(15,23,42,0.08)] transition-shadow hover:shadow-[0_8px_30px_-10px_rgba(198,40,40,0.12)]">
      <p className="text-sm font-medium text-slate-500">{stat.label}</p>
      <p className="mt-2 text-3xl font-semibold tracking-tight text-brand-dark">{stat.value}</p>
      <div className={cn("mt-3 flex items-center gap-1.5 text-sm font-medium", trend.className)}>
        <TrendIcon className="h-4 w-4" aria-hidden />
        <span>{stat.change}</span>
        <span className="text-slate-400 font-normal">geçen aya göre</span>
      </div>
    </div>
  );
}
