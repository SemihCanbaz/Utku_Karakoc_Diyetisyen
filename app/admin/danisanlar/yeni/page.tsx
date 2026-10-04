import { requireRole } from "@/lib/portal/auth";
import { ClientForm } from "@/components/portal/forms";
import { PageTitle } from "@/components/portal/display";
export default async function New() {
  await requireRole("admin");
  return (
    <>
      <PageTitle
        eyebrow="YENİ BAŞLANGIÇ"
        title="Danışan kaydı oluştur."
        description="Kaydettikten sonra danışana hesap daveti gönderebilirsiniz."
      />
      <section className="portal-card">
        <ClientForm />
      </section>
    </>
  );
}
