"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Wind, Loader2 } from "lucide-react";
import Button from "@/components/admin/ui/Button";

export default function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error ?? "Giriş başarısız.");
        return;
      }

      const from = searchParams.get("from");
      router.push(from && from.startsWith("/admin") ? from : "/admin");
      router.refresh();
    } catch {
      setError("Bağlantı hatası. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center premium-gradient px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-red to-brand-red-dark text-white shadow-[0_8px_24px_-6px_rgba(198,40,40,0.55)]">
            <Wind className="h-7 w-7" aria-hidden />
          </div>
          <h1 className="text-2xl font-semibold text-brand-dark">İzmir Servisi</h1>
          <p className="mt-1 text-sm text-slate-500">Yönetim paneli girişi</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-brand-border bg-white p-6 shadow-[0_8px_30px_-12px_rgba(15,23,42,0.12)] sm:p-8"
        >
          {error ? (
            <div
              role="alert"
              className="mb-4 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-brand-red"
            >
              {error}
            </div>
          ) : null}

          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-brand-dark">
                E-posta
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 w-full rounded-xl border border-brand-border bg-brand-light px-3 text-sm text-brand-dark outline-none transition-colors focus:border-brand-red/50 focus:ring-2 focus:ring-brand-red/15"
                placeholder="admin@izmirklima.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-brand-dark">
                Şifre
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 w-full rounded-xl border border-brand-border bg-brand-light px-3 text-sm text-brand-dark outline-none transition-colors focus:border-brand-red/50 focus:ring-2 focus:ring-brand-red/15"
              />
            </div>
          </div>

          <Button type="submit" className="mt-6 w-full" size="lg" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Giriş yapılıyor…
              </>
            ) : (
              "Giriş Yap"
            )}
          </Button>
        </form>

        <p className="mt-6 text-center text-xs text-slate-400">
          Yetkisiz erişim yasaktır. Tüm oturumlar güvenli çerez ile korunur.
        </p>
      </div>
    </div>
  );
}
