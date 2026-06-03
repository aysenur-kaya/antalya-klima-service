export type StatTrend = "up" | "down" | "neutral";

export interface DashboardStat {
  id: string;
  label: string;
  value: string;
  change: string;
  trend: StatTrend;
}
