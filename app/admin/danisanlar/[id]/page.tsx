import Link from "next/link";
import { notFound } from "next/navigation";
import { requireRole } from "@/lib/portal/auth";
import { checked } from "@/lib/portal/queries";
import { uuid } from "@/lib/portal/validation";
import type {
  Client,
  Measurement,
  DietPlan,
  Appointment,
} from "@/lib/portal/types";
import {
  ClientForm,
  MeasurementForm,
  MeasurementEditor,
  PlanForm,
  DuplicatePlanButton,
  InviteButton,
  AppointmentForm,
} from "@/components/portal/forms";
import {
  PageTitle,
  Badge,
  Measurements,
  Empty,
} from "@/components/portal/display";
export default async function Detail({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ tab?: string }>;
}) {
  const { client } = await requireRole("admin"),
    { id } = await params;
  if (!uuid.safeParse(id).success) notFound();
  const { data: person, error } = await client
    .from("clients")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw new Error("Danışan yüklenemedi.");
  if (!person) notFound();
  const p = person as Client,
    tab = (await searchParams).tab ?? "genel";
  const tabs = [
    ["genel", "Genel bilgiler"],
    ["olcumler", "Ölçümler"],
    ["planlar", "Diyet planları"],
    ["randevular", "Randevular"],
  ];
  let content: React.ReactNode;
  if (tab === "olcumler") {
    const rows = checked(
      await client
        .from("client_measurements")
        .select("*")
        .eq("client_id", id)
        .order("measurement_date", { ascending: false }),
    ) as Measurement[];
    content = (
      <>
        <Measurements rows={rows} target={p.target_weight} />
        <details className="portal-card portal-disclosure">
          <summary>+ Yeni ölçüm ekle</summary>
          <MeasurementForm clientId={id} />
        </details>
        {rows.map((row) => (
          <MeasurementEditor key={row.id} row={row} />
        ))}
      </>
    );
  } else if (tab === "planlar") {
    const rows = checked(
      await client
        .from("diet_plans")
        .select("*")
        .eq("client_id", id)
        .order("week_number", { ascending: false }),
    ) as DietPlan[];
    content = (
      <>
        <details className="portal-card portal-disclosure">
          <summary>+ Yeni haftalık plan</summary>
          <PlanForm
            clientId={id}
            nextWeek={Math.max(0, ...rows.map((p) => p.week_number)) + 1}
          />
        </details>
        {!rows.length && <Empty>Henüz diyet planı oluşturulmadı.</Empty>}
        {rows.map((plan) => (
          <details className="portal-card portal-disclosure" key={plan.id}>
            <summary>
              {plan.week_number}. hafta · {plan.title}{" "}
              <Badge status={plan.status} />
            </summary>
            <PlanForm clientId={id} plan={plan} />
            <DuplicatePlanButton id={plan.id} />
          </details>
        ))}
      </>
    );
  } else if (tab === "randevular") {
    const rows = checked(
      await client
        .from("appointments")
        .select("*")
        .eq("client_id", id)
        .order("appointment_date", { ascending: false }),
    ) as Appointment[];
    content = (
      <>
        <details className="portal-card portal-disclosure">
          <summary>+ Randevu oluştur</summary>
          <AppointmentForm clients={[p]} clientId={id} />
        </details>
        {rows.map((r) => (
          <details className="portal-card portal-disclosure" key={r.id}>
            <summary>
              {r.appointment_date} · {r.start_time.slice(0, 5)} ·{" "}
              {r.appointment_type} <Badge status={r.status} />
            </summary>
            <AppointmentForm clients={[p]} value={r} />
          </details>
        ))}
      </>
    );
  } else {
    const { data: profile } = await client
      .from("profiles")
      .select("id")
      .eq("client_id", id)
      .maybeSingle();
    content = (
      <section className="portal-card">
        <h2>İletişim ve danışmanlık bilgileri</h2>
        <ClientForm client={p} />
        <hr />
        {profile ? (
          <p className="portal-notice">
            Danışan giriş hesabı bağlı. E-posta değişikliği giriş adresini
            otomatik değiştirmez.
          </p>
        ) : (
          <InviteButton id={id} />
        )}
      </section>
    );
  }
  return (
    <>
      <Link href="/admin/danisanlar" className="portal-link">
        ← Danışanlara dön
      </Link>
      <PageTitle
        eyebrow="DANIŞAN DOSYASI"
        title={p.first_name + " " + p.last_name}
        action={<Badge status={p.status} />}
      />
      <nav className="portal-tabs" aria-label="Danışan dosyası bölümleri">
        {tabs.map(([key, label]) => (
          <Link
            key={key}
            aria-current={tab === key ? "page" : undefined}
            href={"/admin/danisanlar/" + id + "?tab=" + key}
          >
            {label}
          </Link>
        ))}
      </nav>
      {content}
    </>
  );
}
