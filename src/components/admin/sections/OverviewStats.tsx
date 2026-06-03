"use client";

import { useEffect, useState } from "react";
import StatCard from "@/components/admin/ui/StatCard";
import { StatusMessage, LoadingBlock } from "@/components/admin/ui/StatusMessage";
import type { DashboardStat } from "@/components/admin/types";
import { adminApi } from "@/lib/admin/api-client";
import { useAdminDashboardSearch } from "@/components/admin/context/AdminDashboardContext";

type OverviewStatsData = {
  customerRequests: { total: number; newCount: number };
  services: { total: number; activeCount: number };
  blogPosts: { total: number; publishedCount: number };
};

const emptyStats: DashboardStat[] = [
  { id: "1", label: "Toplam Talep", value: "—", change: "yüklenemedi", trend: "neutral" },
  { id: "2", label: "Yeni Talep", value: "—", change: "—", trend: "neutral" },
  { id: "3", label: "Aktif Hizmet", value: "—", change: "—", trend: "neutral" },
  { id: "4", label: "Yayında Blog", value: "—", change: "—", trend: "neutral" },
];

function mapStats(data: OverviewStatsData): DashboardStat[] {
  return [
    {
      id: "1",
      label: "Toplam Talep",
      value: String(data.customerRequests.total),
      change: "veritabanı",
      trend: "up",
    },
    {
      id: "2",
      label: "Yeni Talep",
      value: String(data.customerRequests.newCount),
      change: "bekleyen",
      trend: data.customerRequests.newCount > 0 ? "up" : "neutral",
    },
    {
      id: "3",
      label: "Aktif Hizmet",
      value: String(data.services.activeCount),
      change: `${data.services.total} toplam`,
      trend: "neutral",
    },
    {
      id: "4",
      label: "Yayında Blog",
      value: String(data.blogPosts.publishedCount),
      change: `${data.blogPosts.total} yazı`,
      trend: "up",
    },
  ];
}

export default function OverviewStats() {
  const [stats, setStats] = useState<DashboardStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isSearching } = useAdminDashboardSearch();

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);

      const res = await adminApi<OverviewStatsData>("/api/admin/stats/overview");

      if (!res.success) {
        setError(res.error ?? "Özet verileri yüklenemedi.");
        setStats(emptyStats);
      } else {
        setStats(mapStats(res.data));
      }
      setLoading(false);
    }
    load();
  }, []);

  if (isSearching) return null;

  return (
    <div id="overview" className="scroll-mt-24 space-y-4">
      <div>
        <h2 className="text-2xl font-semibold text-brand-dark">Genel Bakış</h2>
        <p className="mt-1 text-sm text-slate-500">Sunucu tarafı özet sayıları</p>
      </div>
      {error ? <StatusMessage type="error" message={error} className="mb-2" /> : null}
      {loading ? (
        <LoadingBlock />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <StatCard key={stat.id} stat={stat} />
          ))}
        </div>
      )}
    </div>
  );
}
