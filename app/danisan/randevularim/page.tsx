import { requireRole } from "@/lib/portal/auth";
import { checked, today } from "@/lib/portal/queries";
import type { Appointment } from "@/lib/portal/types";
import { PageTitle, AppointmentList } from "@/components/portal/display";
export default async function Appointments() {
  const { client, profile } = await requireRole("client");
  const all = checked(
    await client
      .from("appointments")
      .select("*")
      .eq("client_id", profile.client_id)
      .order("appointment_date")
      .order("start_time"),
  ) as Appointment[];
  return (
    <>
      <PageTitle
        eyebrow="BİRLİKTE GÖRÜŞELİM"
        title="Randevularım."
        description="Görüşme saatleri İstanbul saat dilimindedir. Değişiklik taleplerinizi diyetisyeninize iletebilirsiniz."
      />
      <h2>Yaklaşan görüşmeler</h2>
      <AppointmentList
        rows={all.filter(
          (r) => r.appointment_date >= today() && r.status === "scheduled",
        )}
      />
      <h2>Geçmiş ve diğer görüşmeler</h2>
      <AppointmentList
        rows={all
          .filter(
            (r) => r.appointment_date < today() || r.status !== "scheduled",
          )
          .reverse()}
      />
    </>
  );
}
