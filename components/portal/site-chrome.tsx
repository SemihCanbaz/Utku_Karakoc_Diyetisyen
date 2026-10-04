"use client";
import { usePathname } from "next/navigation";
export function SiteChrome({
  children,
  header,
  footer,
  contact,
}: {
  children: React.ReactNode;
  header: React.ReactNode;
  footer: React.ReactNode;
  contact: React.ReactNode;
}) {
  const path = usePathname();
  const portal = /^\/(admin|danisan|giris|sifre-belirle)(\/|$)/.test(path);
  return (
    <>
      {!portal && header}
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      {!portal && footer}
      {!portal && contact}
    </>
  );
}
