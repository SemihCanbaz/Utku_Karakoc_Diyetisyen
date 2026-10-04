import "server-only";
export function checked<T>(result: { data: T | null; error: unknown }): T {
  if (result.error || result.data === null)
    throw new Error("Veriler yüklenemedi.");
  return result.data;
}
export function today() {
  return new Date().toLocaleDateString("en-CA", {
    timeZone: "Europe/Istanbul",
  });
}
