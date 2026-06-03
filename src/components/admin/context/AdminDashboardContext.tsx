"use client";

import { createContext, useContext, useMemo, useState } from "react";

type AdminDashboardContextValue = {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  isSearching: boolean;
};

const AdminDashboardContext = createContext<AdminDashboardContextValue | null>(null);

export function AdminDashboardProvider({ children }: { children: React.ReactNode }) {
  const [searchQuery, setSearchQuery] = useState("");

  const value = useMemo(
    () => ({
      searchQuery,
      setSearchQuery,
      isSearching: searchQuery.trim().length > 0,
    }),
    [searchQuery]
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
