import { slugify } from "@/lib/utils";

export function requireString(
  value: unknown,
  field: string,
  min = 1,
  max = 500
): string | null {
  if (typeof value !== "string") return `${field} metin olmalıdır.`;
  const trimmed = value.trim();
  if (trimmed.length < min) return `${field} en az ${min} karakter olmalıdır.`;
  if (trimmed.length > max) return `${field} en fazla ${max} karakter olabilir.`;
  return null;
}

export function optionalString(value: unknown, max = 5000): string | undefined {
  if (value === undefined || value === null) return undefined;
  if (typeof value !== "string") return undefined;
  return value.trim().slice(0, max);
}

export function requireSlug(value: unknown, fallbackTitle?: string): string | null {
  const raw =
    typeof value === "string" && value.trim()
      ? slugify(value.trim())
      : fallbackTitle
        ? slugify(fallbackTitle)
        : "";
  if (!raw) return "Geçerli bir slug gerekli.";
  if (raw.length > 120) return "Slug çok uzun.";
  return null;
}

export function resolveSlug(value: unknown, title: string): string {
  if (typeof value === "string" && value.trim()) return slugify(value.trim());
  return slugify(title);
}

export function requireEnum<T extends string>(
  value: unknown,
  allowed: readonly T[],
  field: string
): T | null {
  if (typeof value !== "string" || !allowed.includes(value as T)) {
    return null;
  }
  return value as T;
}

export function optionalBoolean(value: unknown): boolean | undefined {
  if (typeof value === "boolean") return value;
  return undefined;
}

export function optionalInt(value: unknown, min = 0, max = 999999): number | undefined {
  if (value === undefined || value === null) return undefined;
  const n = Number(value);
  if (!Number.isInteger(n) || n < min || n > max) return undefined;
  return n;
}

export function requireRating(value: unknown): number | null {
  const n = Number(value);
  if (!Number.isInteger(n) || n < 1 || n > 5) return null;
  return n;
}
