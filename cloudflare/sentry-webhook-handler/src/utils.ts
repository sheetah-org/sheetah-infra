import * as crypto from "node:crypto";

export async function verifySignature(
  signature: string,
  rawBody: string,
  secret = "",
) {
  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(rawBody, "utf8");
  const digest = hmac.digest("hex");
  return digest === signature;
}

type LogLevel = "debug" | "info" | "warning" | "error";

export function levelAtOrAbove(
  level: string | undefined,
  min: string | undefined,
): boolean {
  if (!level) return false;
  const order: readonly LogLevel[] = ["debug", "info", "warning", "error"];
  const current = order.indexOf(level as LogLevel);
  const threshold = order.indexOf((min as LogLevel) ?? "warning");
  if (current === -1) return false;
  return current >= threshold;
}

export function safeString(value: unknown, fallback = "-"): string {
  if (typeof value === "string" && value.trim().length > 0) return value;
  return fallback;
}
