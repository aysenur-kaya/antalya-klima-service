const SENSITIVE_KEYS = new Set([
  "email",
  "password",
  "token",
  "authorization",
  "cookie",
  "set-cookie",
  "passwordhash",
  "session_secret",
]);

function redactValue(key: string, value: unknown): unknown {
  const k = key.toLowerCase();
  if (SENSITIVE_KEYS.has(k)) {
    return "[REDACTED]";
  }
  if (typeof value === "string" && k.includes("secret")) {
    return "[REDACTED]";
  }
  return value;
}

export function redactLogMeta(meta?: Record<string, unknown>): Record<string, unknown> | undefined {
  if (!meta) return undefined;
  if (process.env.NODE_ENV !== "production") return meta;

  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(meta)) {
    if (value && typeof value === "object" && !Array.isArray(value)) {
      out[key] = redactLogMeta(value as Record<string, unknown>);
    } else {
      out[key] = redactValue(key, value);
    }
  }
  return out;
}

export function authLog(
  level: "log" | "warn" | "error",
  message: string,
  meta?: Record<string, unknown>
) {
  const payload = redactLogMeta(meta);
  if (payload) {
    console[level](message, payload);
  } else {
    console[level](message);
  }
}

/** Üretimde e-posta loglanmaz; geliştirmede kısaltılmış gösterim */
export function maskEmail(email: string): string {
  if (process.env.NODE_ENV !== "production") return email;
  const [local, domain] = email.split("@");
  if (!domain) return "[REDACTED]";
  const visible = local.slice(0, 2);
  return `${visible}***@${domain}`;
}
