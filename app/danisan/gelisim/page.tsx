import { requireRole } from "@/lib/portal/auth";
import { checked } from "@/lib/portal/queries";
import type { Measurement } from "@/lib/portal/types";
import { PageTitle, Measurements } from "@/components/portal/display";
export default async function Progress() {
  const { client, profile } = await requireRole("client");
  const [m, p] = await Promise.all([
    client
      .from("client_measurements")
      .select("*")
      .eq("client_id", profile.client_id)
      .order("measurement_date"),
    client
      .from("clients")
      .select("target_weight")
      .eq("id", profile.client_id)
      .single(),
  ]);
  return (
    <>
      <PageTitle
        eyebrow="KENDİ RİTMİNİZDE İLERLEYİN"
        title="Gelişimim."
        description="Diyetisyeniniz tarafından kaydedilen ölçümleriniz."
      />
      <Measurements
        rows={checked(m) as Measurement[]}
        target={checked(p).target_weight}
      />
    </>
  );
}
