export type ApiResult<T> =
  | { success: true; data: T }
  | { success: false; error: string; code?: string };

export async function adminApi<T>(
  path: string,
  options?: RequestInit
): Promise<ApiResult<T>> {
  try {
    const res = await fetch(path, {
      credentials: "same-origin",
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers ?? {}),
      },
    });
    const json = await res.json();
    if (!res.ok || !json.success) {
      return {
        success: false,
        error: json.error ?? "İstek başarısız.",
        code: json.code,
      };
    }
    return { success: true, data: json.data as T };
  } catch {
    return { success: false, error: "Ağ hatası. Bağlantınızı kontrol edin." };
  }
}
