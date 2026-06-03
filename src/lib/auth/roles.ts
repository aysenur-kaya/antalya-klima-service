import type { AdminRole } from "@prisma/client";
import type { AdminSessionPayload } from "@/lib/auth/session";

export type AdminPermission =
  | "read"
  | "write"
  | "delete"
  | "settings"
  | "seo";

const ROLE_PERMISSIONS: Record<AdminRole, AdminPermission[]> = {
  SUPER_ADMIN: ["read", "write", "delete", "settings", "seo"],
  EDITOR: ["read", "write", "delete"],
};

export function hasAdminPermission(
  session: AdminSessionPayload,
  permission: AdminPermission
): boolean {
  const role = session.role as AdminRole;
  if (!ROLE_PERMISSIONS[role]) return false;
  return ROLE_PERMISSIONS[role].includes(permission);
}

export function requireAdminRole(
  session: AdminSessionPayload,
  allowedRoles: AdminRole[]
): boolean {
  return allowedRoles.includes(session.role as AdminRole);
}

/** Site / SEO ayarları yalnızca süper admin */
export const SETTINGS_ROLES: AdminRole[] = ["SUPER_ADMIN"];
