import Link from "next/link";
import { notFound } from "next/navigation";
import { requireRole } from "@/lib/portal/auth";
import { uuid } from "@/lib/portal/validation";
import type { DietPlan } from "@/lib/portal/types";
import { PageTitle, PlanCard } from "@/components/portal/display";
import { PrintButton } from "@/components/portal/print-button";
export default async function Plan({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { client, profile } = await requireRole("client"),
    { id } = await params;
  if (!uuid.safeParse(id).success) notFound();
  const { data, error } = await client
    .from("diet_plans")
    .select("*")
    .eq("id", id)
    .eq("client_id", profile.client_id)
    .eq("status", "published")
    .maybeSingle();
  if (error) throw new Error("Plan yüklenemedi.");
  if (!data) notFound();
  return (
    <>
      <Link className="portal-link" href="/danisan/diyet-listelerim">
        ← Listelerime dön
      </Link>
      <PageTitle
        eyebrow="HAFTALIK BESLENME PLANI"
        title={profile.first_name + " için beslenme planı."}
        action={<PrintButton />}
      />
      <PlanCard plan={data as DietPlan} />
    </>
  );
}
