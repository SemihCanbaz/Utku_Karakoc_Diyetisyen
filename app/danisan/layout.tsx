import { requireRole } from "@/lib/portal/auth";
import { PortalShell } from "@/components/portal/shell";
import "../portal.css";
export const metadata = {
  title: "Danışan paneli",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { profile } = await requireRole("client");
  return (
    <PortalShell
      role="client"
      name={profile.first_name + " " + profile.last_name}
    >
      {children}
    </PortalShell>
  );
}
