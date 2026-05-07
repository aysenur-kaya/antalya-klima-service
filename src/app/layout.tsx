import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileStickyCTA from "@/components/layout/MobileStickyCTA";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Antalya Servisi - Klima ve Beyaz Eşya Teknik Servisi",
  description: "Antalya bölgesinde klima ve beyaz eşya servisi için hızlı, güvenilir ve garantili teknik destek.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="scroll-smooth" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${inter.className} min-h-screen bg-brand-light text-brand-dark flex flex-col pt-[88px] md:pt-[104px]`}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <MobileStickyCTA />
      </body>
    </html>
  );
}
