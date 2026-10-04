import { requireRole } from "@/lib/portal/auth";
import { PortalShell } from "@/components/portal/shell";
import "../portal.css";
export const metadata = {
  title: "Yönetim paneli",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { profile } = await requireRole("admin");
  return (
    <PortalShell
      role="admin"
      name={profile.first_name + " " + profile.last_name}
    >
      {children}
    </PortalShell>
  );
}
