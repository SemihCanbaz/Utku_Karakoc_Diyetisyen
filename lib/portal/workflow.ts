import type { Client, DietPlan, Measurement } from "./types";

export function addDays(date: string, days: number) {
  const result = new Date(date + "T12:00:00Z");
  result.setUTCDate(result.getUTCDate() + days);
  return result.toISOString().slice(0, 10);
}
export function followUps(
  clients: Client[],
  plans: Pick<DietPlan, "client_id" | "status" | "start_date" | "end_date">[],
  measurements: Pick<Measurement, "client_id" | "measurement_date">[],
  today: string,
) {
  return clients
    .filter((c) => c.status === "active")
    .flatMap((c) => {
      const current = plans.some(
        (p) =>
          p.client_id === c.id &&
          p.status === "published" &&
          p.start_date <= today &&
          p.end_date >= today,
      );
      const latest = measurements
        .filter((m) => m.client_id === c.id)
        .map((m) => m.measurement_date)
        .filter((d) => d <= today)
        .sort()
        .at(-1);
      const reasons = [];
      if (!current)
        reasons.push({ label: "Güncel plan bekliyor", tab: "planlar" });
      if (!latest || latest < addDays(today, -14))
        reasons.push({
          label: latest ? "Ölçümü 14 günü geçti" : "İlk ölçüm bekliyor",
          tab: "olcumler",
        });
      return reasons.map((reason) => ({
        id: c.id + reason.tab,
        name: c.first_name + " " + c.last_name,
        href: `/admin/danisanlar/${c.id}?tab=${reason.tab}`,
        label: reason.label,
      }));
    });
}
export function paginate<T>(rows: T[], input?: string, size = 12) {
  const pages = Math.max(1, Math.ceil(rows.length / size));
  const parsed = Number(input);
  const page =
    Number.isInteger(parsed) && parsed > 0 ? Math.min(parsed, pages) : 1;
  return {
    page,
    pages,
    rows: rows.slice((page - 1) * size, page * size),
    total: rows.length,
  };
}
