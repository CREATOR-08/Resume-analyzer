


export type StringRecord = Record<string, unknown>;

export function asRecord(value: unknown): StringRecord {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value as StringRecord;
  }

  return {};
}
export function asArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

export function asString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export function firstNumber(...values: unknown[]) {
  for (const value of values) {
    const number = Number(value);

    if (Number.isFinite(number)) {
      return Math.round(number);
    }
  }

  return 0;
}

export function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}