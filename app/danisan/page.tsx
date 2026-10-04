import Link from "next/link";
import { requireRole } from "@/lib/portal/auth";
import { checked, today } from "@/lib/portal/queries";
import { stats } from "@/lib/portal/validation";
import {
  PageTitle,
  Metric,
  PlanCard,
  AppointmentList,
  Empty,
} from "@/components/portal/display";
import type { Measurement, DietPlan, Appointment } from "@/lib/portal/types";
export default async function Dashboard() {
  const { client, profile } = await requireRole("client"),
    id = profile.client_id;
  const [m, p, a] = await Promise.all([
    client
      .from("client_measurements")
      .select("*")
      .eq("client_id", id)
      .order("measurement_date"),
    client
      .from("diet_plans")
      .select("*")
      .eq("client_id", id)
      .eq("status", "published")
      .order("start_date", { ascending: false }),
    client
      .from("appointments")
      .select("*")
      .eq("client_id", id)
      .gte("appointment_date", today())
      .eq("status", "scheduled")
      .order("appointment_date")
      .order("start_time")
      .limit(3),
  ]);
  const s = stats(checked(m) as Measurement[]),
    plans = checked(p) as DietPlan[],
    appointments = checked(a) as Appointment[];
  const current = plans.find(
    (p) => p.start_date <= today() && p.end_date >= today(),
  );
  return (
    <>
      <PageTitle
        eyebrow="BESLENME YOLCULUĞUNUZ"
        title={"Merhaba, " + profile.first_name + "."}
        description="Planınız, gelişiminiz ve görüşmeleriniz burada. Küçük adımlarla, kendi ritminizde."
      />
      <div className="portal-metrics">
        <Metric
          label="Son ölçüm"
          value={s.last === null ? "—" : s.last + " kg"}
        />
        <Metric
          label="Başlangıca göre değişim"
          value={
            s.total === null ? "—" : (s.total > 0 ? "+" : "") + s.total + " kg"
          }
        />
        <Metric label="Ölçüm sayısı" value={s.list.length} />
      </div>
      <div className="portal-columns">
        <section>
          <h2>Güncel beslenme planınız</h2>
          {current ? (
            <PlanCard
              plan={current}
              href={"/danisan/diyet-listelerim/" + current.id}
            />
          ) : (
            <Empty>
              Bugün için yayınlanmış bir planınız yok. Diyetisyeniniz planı
              yayınladığında burada görebilirsiniz.
            </Empty>
          )}
          <Link className="portal-link" href="/danisan/diyet-listelerim">
            Tüm listelerimi gör →
          </Link>
        </section>
        <section className="portal-card">
          <h2>Yaklaşan görüşmeler</h2>
          <AppointmentList rows={appointments} />
          <Link className="portal-link" href="/danisan/randevularim">
            Randevularımı gör →
          </Link>
        </section>
      </div>
      <div className="portal-notice">
        Planlarınız diyetisyeniniz tarafından size özel hazırlanır.
        Listelerinizdeki değişiklikler için görüşmelerinizde iletişime
        geçebilirsiniz.
      </div>
    </>
  );
}
