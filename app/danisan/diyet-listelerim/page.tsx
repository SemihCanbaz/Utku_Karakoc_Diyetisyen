import { requireRole } from "@/lib/portal/auth";
import { checked } from "@/lib/portal/queries";
import type { DietPlan } from "@/lib/portal/types";
import { PageTitle, PlanCard, Empty } from "@/components/portal/display";
export default async function Plans() {
  const { client, profile } = await requireRole("client");
  const rows = checked(
    await client
      .from("diet_plans")
      .select("*")
      .eq("client_id", profile.client_id)
      .eq("status", "published")
      .order("start_date", { ascending: false }),
  ) as DietPlan[];
  return (
    <>
      <PageTitle
        eyebrow="SİZE ÖZEL PLANLAR"
        title="Diyet listelerim."
        description="Yayınlanmış güncel ve geçmiş haftalarınıza buradan ulaşabilirsiniz."
      />
      {rows.length ? (
        <div className="portal-columns">
          {rows.map((p) => (
            <PlanCard
              key={p.id}
              plan={p}
              href={"/danisan/diyet-listelerim/" + p.id}
            />
          ))}
        </div>
      ) : (
        <Empty>Henüz yayınlanmış diyet listeniz yok.</Empty>
      )}
    </>
  );
}
