"use client";

import { useCallback, useEffect, useState } from "react";
import AdminSidebar from "@/components/admin/layout/AdminSidebar";
import AdminTopbar from "@/components/admin/layout/AdminTopbar";
import OverviewStats from "@/components/admin/sections/OverviewStats";
import CustomerRequestsTable from "@/components/admin/sections/CustomerRequestsTable";
import ServiceManagement from "@/components/admin/sections/ServiceManagement";
import BlogManagement from "@/components/admin/sections/BlogManagement";
import SeoSettingsSection from "@/components/admin/sections/SeoSettingsSection";
import DistrictManagement from "@/components/admin/sections/DistrictManagement";
import ContactSettingsSection from "@/components/admin/sections/ContactSettingsSection";
import TestimonialsManagement from "@/components/admin/sections/TestimonialsManagement";
import GeneralSettingsSection from "@/components/admin/sections/GeneralSettingsSection";
import { AdminDashboardProvider } from "@/components/admin/context/AdminDashboardContext";
import AdminSearchBar from "@/components/admin/layout/AdminSearchBar";

export default function AdminShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");

  const scrollToSection = useCallback((sectionId: string) => {
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  useEffect(() => {
    const sectionIds = [
      "overview",
      "requests",
      "services",
      "blog",
      "seo",
      "districts",
      "contact",
      "testimonials",
      "settings",
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0.1, 0.25, 0.5] }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <AdminDashboardProvider>
    <div className="flex min-h-screen bg-brand-light">
      <AdminSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <AdminTopbar onMenuClick={() => setSidebarOpen(true)} />

        <div className="premium-gradient flex-1">
          <div className="mx-auto max-w-6xl space-y-6 px-4 py-6 sm:px-6 sm:py-8 lg:space-y-8">
            <AdminSearchBar />
            <OverviewStats />
            <CustomerRequestsTable />
            <ServiceManagement />
            <BlogManagement />
            <SeoSettingsSection />
            <DistrictManagement />
            <ContactSettingsSection />
            <TestimonialsManagement />
            <GeneralSettingsSection />
          </div>
        </div>
      </div>
    </div>
    </AdminDashboardProvider>
  );
}
