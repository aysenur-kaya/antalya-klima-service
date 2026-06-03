import { Suspense } from "react";
import AdminLoginForm from "@/components/admin/auth/AdminLoginForm";

export const metadata = {
  title: "Admin Girişi",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center premium-gradient">
          <p className="text-sm text-slate-500">Yükleniyor…</p>
        </div>
      }
    >
      <AdminLoginForm />
    </Suspense>
  );
}
