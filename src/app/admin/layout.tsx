import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Yönetim Paneli",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-brand-light text-brand-dark antialiased">{children}</div>
  );
}
