import Link from "next/link";
import { requireRole } from "@/lib/portal/auth";
import { date as dateSchema } from "@/lib/portal/validation";
import { checked, today } from "@/lib/portal/queries";
import type { Client, Appointment } from "@/lib/portal/types";
import { AppointmentForm, DeleteAppointmentButton } from "@/components/portal/forms";
import { PageTitle, AppointmentList, Badge } from "@/components/portal/display";
export default async function Appointments({
  searchParams,
}: {
  searchParams: Promise<{ view?: string; date?: string }>;
}) {
  const { client } = await requireRole("admin"),
    params = await searchParams,
    view = params.view ?? "upcoming",
    selectedDate = dateSchema.safeParse(params.date).success
      ? params.date
      : undefined,
    now = today();
  const date = new Date(now + "T12:00:00Z");
  date.setUTCDate(date.getUTCDate() + 7);
  const end = date.toISOString().slice(0, 10);
  const [a, c] = await Promise.all([
    client
      .from("appointments")
      .select("*")
      .order("appointment_date")
      .order("start_time"),
    client.from("clients").select("*").order("first_name"),
  ]);
  const clients = checked(c) as Client[],
    all = checked(a) as Appointment[];
  const rows = all.filter((r) =>
    selectedDate
      ? r.appointment_date === selectedDate
      : view === "all" || view === "today"
        ? view === "all" || r.appointment_date === now
        : view === "week"
          ? r.appointment_date >= now && r.appointment_date < end
          : r.appointment_date >= now && r.status === "scheduled",
  );
  const names = Object.fromEntries(
    clients.map((c) => [c.id, c.first_name + " " + c.last_name]),
  );
  return (
    <>
      <PageTitle
        eyebrow="GÖRÜŞME TAKVİMİ"
        title="Gününüzü birlikte planlayın."
        description="Tüm saatler İstanbul saat dilimindedir. Çakışan aktif randevular kaydedilmez."
      />
      <details className="portal-card portal-disclosure">
        <summary>+ Randevu oluştur</summary>
        {clients.length ? (
          <AppointmentForm
            clients={clients.filter((c) => c.status === "active")}
          />
        ) : (
          <p>Önce bir danışan ekleyin.</p>
        )}
      </details>
      <nav className="portal-tabs">
        {[
          ["today", "Bugün"],
          ["week", "7 gün"],
          ["upcoming", "Yaklaşan"],
          ["all", "Tümü"],
        ].map(([key, label]) => (
          <Link
            key={key}
            href={"?view=" + key}
            aria-current={view === key ? "page" : undefined}
          >
            {label}
          </Link>
        ))}
      </nav>
      <form className="portal-search">
        <label htmlFor="appointment-day">Belirli bir gün</label>
        <input
          id="appointment-day"
          name="date"
          type="date"
          defaultValue={selectedDate}
        />
        <button className="portal-button portal-button-secondary">
          Günü göster
        </button>
        {selectedDate && (
          <Link href="/admin/randevular" className="portal-link">
            Tarih filtresini kaldır
          </Link>
        )}
      </form>
      <AppointmentList rows={rows} names={names} />
      {rows.map((r) => (
        <details className="portal-disclosure" key={r.id}>
          <summary>
            {names[r.client_id]} · {r.appointment_date} ·{" "}
            {r.start_time.slice(0, 5)} · Düzenle <Badge status={r.status} />
          </summary>
          <AppointmentForm clients={clients} value={r} />
          <DeleteAppointmentButton id={r.id} />
        </details>
      ))}
    </>
  );
}
