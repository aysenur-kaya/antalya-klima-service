"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Wind, Loader2 } from "lucide-react";
import Button from "@/components/admin/ui/Button";

type LoginApiBody = {
  success?: boolean;
  error?: string;
  code?: string;
  data?: { user?: { email: string } };
};

function resolveRedirectPath(from: string | null): string {
  if (from && from.startsWith("/admin") && from !== "/admin/login") {
    return from;
  }
  return "/admin";
}

export default function AdminLoginForm() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const loginUrl = "/api/admin/auth/login";

    try {
      console.log("[admin/login] İstek gönderiliyor:", loginUrl, { email: email.trim() });

      const res = await fetch(loginUrl, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      let data: LoginApiBody = {};
      const rawText = await res.text();
      try {
        data = rawText ? (JSON.parse(rawText) as LoginApiBody) : {};
      } catch (parseErr) {
        console.error("[admin/login] JSON parse hatası:", parseErr, "body:", rawText.slice(0, 200));
        setError("Sunucu yanıtı okunamadı. Konsolu kontrol edin.");
        return;
      }

      console.log("[admin/login] Yanıt:", {
        status: res.status,
        ok: res.ok,
        success: data.success,
        code: data.code,
      });

      if (!res.ok || !data.success) {
        const message =
          data.error ??
          (res.status === 401
            ? "E-posta veya şifre hatalı."
            : res.status >= 500
              ? "Sunucu hatası. Veritabanı ve .env ayarlarını kontrol edin."
              : "Giriş başarısız.");
        console.error("[admin/login] Hata:", message, data);
        setError(message);
        return;
      }

      const target = resolveRedirectPath(searchParams.get("from"));
      console.log("[admin/login] Başarılı, yönlendiriliyor:", target);

      // Çerez middleware’e gitsin diye tam sayfa yönlendirme (mobil/LAN için güvenilir)
      window.location.assign(target);
    } catch (networkErr) {
      console.error("[admin/login] Ağ hatası:", networkErr);
      setError(
        "Sunucuya bağlanılamadı. Aynı ağda olduğunuzdan ve adresin doğru olduğundan emin olun."
      );
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
              className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-brand-red"
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
