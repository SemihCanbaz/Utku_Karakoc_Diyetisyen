import Link from "next/link";
import { notFound } from "next/navigation";
import { requireRole } from "@/lib/portal/auth";
import { uuid } from "@/lib/portal/validation";
import { RecipeForm, type RecipeRecord } from "@/components/portal/recipe-form";
import { PageTitle } from "@/components/portal/display";
export default async function Edit({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { client } = await requireRole("admin"),
    { id } = await params;
  if (!uuid.safeParse(id).success) notFound();
  const { data, error } = await client
    .from("recipes")
    .select("*")
    .eq("id", id)
    .is("deleted_at", null)
    .maybeSingle();
  if (error) throw new Error("Tarif yüklenemedi.");
  if (!data) notFound();
  return (
    <>
      <Link className="portal-link" href="/admin/tarifler">
        ← Tariflere dön
      </Link>
      <PageTitle eyebrow="TARİF DÜZENLE" title={data.title} />
      <section className="portal-card">
        <RecipeForm recipe={data as RecipeRecord} />
      </section>
    </>
  );
}
