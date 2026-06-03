"use client";

import { useEffect, useState } from "react";
import StatCard from "@/components/admin/ui/StatCard";
import { StatusMessage, LoadingBlock } from "@/components/admin/ui/StatusMessage";
import type { DashboardStat } from "@/components/admin/types";
import { adminApi } from "@/lib/admin/api-client";

const emptyStats: DashboardStat[] = [
  { id: "1", label: "Toplam Talep", value: "—", change: "yüklenemedi", trend: "neutral" },
  { id: "2", label: "Yeni Talep", value: "—", change: "—", trend: "neutral" },
  { id: "3", label: "Aktif Hizmet", value: "—", change: "—", trend: "neutral" },
  { id: "4", label: "Yayında Blog", value: "—", change: "—", trend: "neutral" },
];

export default function OverviewStats() {
  const [stats, setStats] = useState<DashboardStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);

      const [reqRes, svcRes, blogRes] = await Promise.all([
        adminApi<{ total: number; items: { status: string }[] }>("/api/admin/customer-requests"),
        adminApi<{ items: { active: boolean }[]; total: number }>("/api/admin/services"),
        adminApi<{ items: { status: string }[]; total: number }>("/api/admin/blog-posts"),
      ]);

      const failures: string[] = [];
      if (!reqRes.success) failures.push(reqRes.error);
      if (!svcRes.success) failures.push(svcRes.error);
      if (!blogRes.success) failures.push(blogRes.error);

      if (
        failures.length > 0 ||
        !reqRes.success ||
        !svcRes.success ||
        !blogRes.success
      ) {
        setError(failures[0] ?? "Özet verileri yüklenemedi.");
        setStats(emptyStats);
      } else {
        const newRequests = reqRes.data.items.filter((r) => r.status === "NEW").length;
        const activeServices = svcRes.data.items.filter((s) => s.active).length;
        const publishedBlog = blogRes.data.items.filter((b) => b.status === "PUBLISHED").length;

        setStats([
          {
            id: "1",
            label: "Toplam Talep",
            value: String(reqRes.data.total),
            change: "veritabanı",
            trend: "up",
          },
          {
            id: "2",
            label: "Yeni Talep",
            value: String(newRequests),
            change: "bekleyen",
            trend: newRequests > 0 ? "up" : "neutral",
          },
          {
            id: "3",
            label: "Aktif Hizmet",
            value: String(activeServices),
            change: `${svcRes.data.total} toplam`,
            trend: "neutral",
          },
          {
            id: "4",
            label: "Yayında Blog",
            value: String(publishedBlog),
            change: `${blogRes.data.total} yazı`,
            trend: "up",
          },
        ]);
      }
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div id="overview" className="scroll-mt-24 space-y-4">
      <div>
        <h2 className="text-2xl font-semibold text-brand-dark">Genel Bakış</h2>
        <p className="mt-1 text-sm text-slate-500">Veritabanından canlı özet</p>
      </div>
      {error ? <StatusMessage type="error" message={error} className="mb-2" /> : null}
      {loading ? (
        <LoadingBlock />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <StatCard key={stat.id} stat={stat} />
          ))}
        </div>
      )}
    </div>
  );
}
