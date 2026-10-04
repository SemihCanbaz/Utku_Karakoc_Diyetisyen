import { requireRole } from "@/lib/portal/auth";
import { RecipeForm } from "@/components/portal/recipe-form";
import { PageTitle } from "@/components/portal/display";
export default async function New() {
  await requireRole("admin");
  return (
    <>
      <PageTitle eyebrow="YENİ TARİF" title="Yeni bir lezzet paylaşın." />
      <section className="portal-card">
        <RecipeForm />
      </section>
    </>
  );
}
