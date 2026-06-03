import {
  TrendingDown,
  TrendingUp,
  Minus,
  ClipboardList,
  Inbox,
  Wrench,
  FileText,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { DashboardStat } from "@/components/admin/types";

const trendConfig = {
  up: {
    icon: TrendingUp,
    iconClass: "text-[#9f2418]",
    pillClass: "bg-[#fff7f5] text-[#9f2418]",
  },
  down: {
    icon: TrendingDown,
    iconClass: "text-[#9f2418]",
    pillClass: "bg-[#fff7f5] text-[#9f2418]",
  },
  neutral: {
    icon: Minus,
    iconClass: "text-[#6b7280]",
    pillClass: "bg-slate-50 text-[#6b7280]",
  },
} as const;

const statIcons: Record<string, LucideIcon> = {
  "1": ClipboardList,
  "2": Inbox,
  "3": Wrench,
  "4": FileText,
};

export default function StatCard({ stat }: { stat: DashboardStat }) {
  const trend = trendConfig[stat.trend];
  const TrendIcon = trend.icon;
  const CardIcon = statIcons[stat.id] ?? ClipboardList;

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-[#f0d6d1] bg-white",
        "p-6 shadow-[0_2px_12px_-4px_rgba(17,24,39,0.06)]",
        "transition-all duration-300 ease-out",
        "hover:-translate-y-1 hover:border-[#e8c4be]",
        "hover:shadow-[0_12px_32px_-8px_rgba(159,36,24,0.14)]"
      )}
    >
      <div
        className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[#fff7f5] opacity-80 transition-opacity group-hover:opacity-100"
        aria-hidden
      />

      <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff7f5] text-[#9f2418] ring-1 ring-[#f0d6d1]">
        <CardIcon className="h-[18px] w-[18px] stroke-[2]" aria-hidden />
      </div>

      <p className="relative mt-5 text-sm font-medium text-[#6b7280]">{stat.label}</p>
      <p className="relative mt-1.5 text-4xl font-bold leading-none tracking-tight text-[#111827] sm:text-[2.5rem]">
        {stat.value}
      </p>

      <div
        className={cn(
          "relative mt-5 inline-flex max-w-full items-center gap-1.5 rounded-lg px-2.5 py-1.5",
          trend.pillClass
        )}
      >
        <TrendIcon className={cn("h-3.5 w-3.5 shrink-0", trend.iconClass)} aria-hidden />
        <span className="truncate text-xs font-medium leading-snug">{stat.change}</span>
      </div>
    </div>
  );
}
