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
  DeletePlanButton,
  DeleteAppointmentButton,
  InviteButton,
  AppointmentForm,
  DeleteClientButton,
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
  const { client } = await requireRole("admin");
  const { id } = await params;

  if (!uuid.safeParse(id).success) {
    notFound();
  }

  const { data: person, error } = await client
    .from("clients")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error("Danışan yüklenemedi.");
  }

  if (!person) {
    notFound();
  }

  const p = person as Client;
  const tab = (await searchParams).tab ?? "genel";

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
        .order("measurement_date", {
          ascending: false,
        }),
    ) as Measurement[];

    content = (
      <>
        <Measurements
          rows={rows}
          target={p.target_weight}
        />

        <details className="portal-card portal-disclosure">
          <summary>
            + Yeni ölçüm ekle
          </summary>

          <MeasurementForm
            clientId={id}
          />
        </details>

        {rows.map((row) => (
          <MeasurementEditor
            key={row.id}
            row={row}
          />
        ))}
      </>
    );
  } else if (tab === "planlar") {
    const rows = checked(
      await client
        .from("diet_plans")
        .select("*")
        .eq("client_id", id)
        .order("week_number", {
          ascending: false,
        }),
    ) as DietPlan[];

    const nextWeek =
      Math.max(
        0,
        ...rows.map(
          (plan) =>
            plan.week_number,
        ),
      ) + 1;

    content = (
      <>
        <details className="portal-card portal-disclosure">
          <summary>
            + Yeni haftalık plan
          </summary>

          <PlanForm
            key={nextWeek}
            clientId={id}
            nextWeek={nextWeek}
          />
        </details>

        {!rows.length && (
          <Empty>
            Henüz diyet planı oluşturulmadı.
          </Empty>
        )}

        {rows.map((plan) => (
          <details
            className="portal-card portal-disclosure"
            key={plan.id}
          >
            <summary>
              {plan.week_number}. hafta
              {" · "}
              {plan.title}{" "}
              <Badge
                status={plan.status}
              />
            </summary>

            <PlanForm
              clientId={id}
              plan={plan}
            />

            <div className="portal-actions">
              <DuplicatePlanButton
                id={plan.id}
              />

              <DeletePlanButton
                id={plan.id}
                title={`${plan.week_number}. hafta · ${plan.title}`}
              />
            </div>
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
        .order("appointment_date", {
          ascending: false,
        }),
    ) as Appointment[];

    content = (
      <>
        <details className="portal-card portal-disclosure">
          <summary>
            + Randevu oluştur
          </summary>

          <AppointmentForm
            clients={[p]}
            clientId={id}
          />
        </details>

        {!rows.length && (
          <Empty>
            Henüz randevu bulunmuyor.
          </Empty>
        )}

        {rows.map((appointment) => (
          <details
            className="portal-card portal-disclosure"
            key={appointment.id}
          >
            <summary>
              {appointment.appointment_date}
              {" · "}
              {appointment.start_time.slice(
                0,
                5,
              )}
              {" · "}
              {appointment.appointment_type}{" "}
              <Badge
                status={
                  appointment.status
                }
              />
            </summary>

            <AppointmentForm
              clients={[p]}
              value={appointment}
            />

            <DeleteAppointmentButton
              id={appointment.id}
            />
          </details>
        ))}
      </>
    );
  } else {
    const {
      data: profile,
      error: profileError,
    } = await client
      .from("profiles")
      .select("id")
      .eq("client_id", id)
      .maybeSingle();

    if (profileError) {
      throw new Error(
        "Danışan giriş hesabı kontrol edilemedi.",
      );
    }

    const fullName =
      `${p.first_name} ${p.last_name}`.trim();

    content = (
      <>
        <section className="portal-card">
          <h2>
            İletişim ve danışmanlık bilgileri
          </h2>

          <ClientForm
            client={p}
          />

          <hr />

          {profile ? (
            <p className="portal-notice">
              Danışan giriş hesabı
              bağlı. E-posta değişikliği
              giriş adresini otomatik
              değiştirmez.
            </p>
          ) : (
            <p className="portal-muted">
              Bu danışana henüz portal
              giriş hesabı
              oluşturulmamış.
            </p>
          )}

          <InviteButton
            id={id}
            linked={!!profile}
          />
        </section>

        <section
          className="portal-card"
          style={{
            borderColor: "#edc6ba",
            background: "#fffaf8",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: 12,
              fontWeight: 800,
              letterSpacing: "0.08em",
              color: "#a02b22",
            }}
          >
            TEHLİKELİ İŞLEMLER
          </p>

          <h2
            style={{
              marginTop: 8,
            }}
          >
            Danışan kaydını sil
          </h2>

          <p className="portal-muted">
            Bu işlem danışanın ölçümlerini,
            diyet planlarını, randevularını,
            portal profilini ve varsa bağlı
            giriş hesabını kalıcı olarak
            kaldırır.
          </p>

          <DeleteClientButton
            id={id}
            name={fullName}
          />
        </section>
      </>
    );
  }

  return (
    <>
      <Link
        href="/admin/danisanlar"
        className="portal-link"
      >
        ← Danışanlara dön
      </Link>

      <PageTitle
        eyebrow="DANIŞAN DOSYASI"
        title={`${p.first_name} ${p.last_name}`}
        action={
          <Badge
            status={p.status}
          />
        }
      />

      <nav
        className="portal-tabs"
        aria-label="Danışan dosyası bölümleri"
      >
        {tabs.map(
          ([key, label]) => (
            <Link
              key={key}
              aria-current={
                tab === key
                  ? "page"
                  : undefined
              }
              href={`/admin/danisanlar/${id}?tab=${key}`}
            >
              {label}
            </Link>
          ),
        )}
      </nav>

      {content}
    </>
  );
}