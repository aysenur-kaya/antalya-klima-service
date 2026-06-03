"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { adminApi } from "@/lib/admin/api-client";
import { useDebouncedValue } from "@/components/admin/hooks/useDebouncedValue";
import type { GlobalSearchResult } from "@/lib/api/admin-global-search";
import type { AdminNotification } from "@/lib/admin/notifications";

const emptySearch: GlobalSearchResult = {
  q: "",
  total: 0,
  customerRequests: [],
  services: [],
  blogPosts: [],
  districts: [],
};

type AdminDashboardContextValue = {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  isSearching: boolean;
  globalSearch: GlobalSearchResult;
  globalSearchLoading: boolean;
  navigateToSection: (sectionId: string) => void;
  notifications: AdminNotification[];
  notificationsLoading: boolean;
  unreadNotificationCount: number;
  refreshNotifications: () => void;
};

const AdminDashboardContext = createContext<AdminDashboardContextValue | null>(null);

export function AdminDashboardProvider({
  children,
  onNavigateSection,
}: {
  children: React.ReactNode;
  onNavigateSection: (sectionId: string) => void;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedQuery = useDebouncedValue(searchQuery.trim(), 300);
  const [globalSearch, setGlobalSearch] = useState<GlobalSearchResult>(emptySearch);
  const [globalSearchLoading, setGlobalSearchLoading] = useState(false);
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);
  const [notificationsLoading, setNotificationsLoading] = useState(true);
  const [unreadNotificationCount, setUnreadNotificationCount] = useState(0);

  const refreshNotifications = useCallback(async () => {
    setNotificationsLoading(true);
    const res = await adminApi<{ items: AdminNotification[]; unreadCount: number }>(
      "/api/admin/notifications?limit=20"
    );
    if (res.success) {
      setNotifications(res.data.items);
      setUnreadNotificationCount(res.data.unreadCount);
    }
    setNotificationsLoading(false);
  }, []);

  useEffect(() => {
    refreshNotifications();
    const interval = window.setInterval(refreshNotifications, 60_000);
    return () => window.clearInterval(interval);
  }, [refreshNotifications]);

  useEffect(() => {
    if (!debouncedQuery) {
      setGlobalSearch(emptySearch);
      setGlobalSearchLoading(false);
      return;
    }

    let cancelled = false;
    setGlobalSearchLoading(true);

    (async () => {
      const res = await adminApi<GlobalSearchResult>(
        `/api/admin/search?q=${encodeURIComponent(debouncedQuery)}`
      );
      if (cancelled) return;
      if (res.success) {
        setGlobalSearch(res.data);
      } else {
        setGlobalSearch({ ...emptySearch, q: debouncedQuery });
      }
      setGlobalSearchLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, [debouncedQuery]);

  const value = useMemo(
    () => ({
      searchQuery,
      setSearchQuery,
      isSearching: searchQuery.trim().length > 0,
      globalSearch,
      globalSearchLoading,
      navigateToSection: onNavigateSection,
      notifications,
      notificationsLoading,
      unreadNotificationCount,
      refreshNotifications,
    }),
    [
      searchQuery,
      globalSearch,
      globalSearchLoading,
      onNavigateSection,
      notifications,
      notificationsLoading,
      unreadNotificationCount,
      refreshNotifications,
    ]
  );

  return (
    <AdminDashboardContext.Provider value={value}>{children}</AdminDashboardContext.Provider>
  );
}

export function useAdminDashboardSearch() {
  const ctx = useContext(AdminDashboardContext);
  if (!ctx) {
    throw new Error("useAdminDashboardSearch AdminDashboardProvider içinde kullanılmalıdır.");
  }
  return ctx;
}
