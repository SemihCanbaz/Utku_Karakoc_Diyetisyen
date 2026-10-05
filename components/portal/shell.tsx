"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/lib/portal/login-actions";
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  Utensils,
  LogOut,
  ChartNoAxesCombined,
  ClipboardList,
  ArrowUpRight,
  Search,
  BookOpenText,
} from "lucide-react";
const adminLinks = [
  ["/admin", "Genel bakış", LayoutDashboard],
  ["/admin/danisanlar", "Danışanlar", Users],
  ["/admin/randevular", "Randevular", CalendarDays],
  ["/admin/tarifler", "Tarifler", Utensils],
  ["/admin/makaleler", "Makaleler", BookOpenText],
] as const;
const clientLinks = [
  ["/danisan", "Genel bakış", LayoutDashboard],
  ["/danisan/diyet-listelerim", "Diyet listelerim", ClipboardList],
  ["/danisan/gelisim", "Gelişimim", ChartNoAxesCombined],
  ["/danisan/randevularim", "Randevularım", CalendarDays],
] as const;
export function PortalShell({
  children,
  role,
  name,
}: {
  children: React.ReactNode;
  role: "admin" | "client";
  name: string;
}) {
  const path = usePathname();
  const links = role === "admin" ? adminLinks : clientLinks;
  return (
    <div className="portal portal-shell">
      <aside className="portal-sidebar">
        <Link className="portal-brand" href={links[0][0]}>
          UK
          <span>
            UTKU KARAKOÇ
            <small>
              {role === "admin" ? "YÖNETİM ALANI" : "DANIŞAN ALANI"}
            </small>
          </span>
        </Link>
        <nav aria-label="Panel menüsü">
          {links.map(([href, label, Icon], i) => (
            <Link
              key={href}
              href={href}
              aria-current={
                (i === 0 ? path === href : path.startsWith(href))
                  ? "page"
                  : undefined
              }
            >
              <Icon size={19} />
              {label}
            </Link>
          ))}
        </nav>
        <div className="portal-sidebar-bottom">
          <Link href="/" className="portal-link">
            Web sitesini gör <ArrowUpRight size={16} />
          </Link>
          <form action={logout}>
            <button>
              <LogOut size={18} /> Güvenli çıkış
            </button>
          </form>
        </div>
      </aside>
      <div className="portal-workspace">
        <header className="portal-topbar">
          <span>
            {role === "admin"
              ? "Diyetisyen çalışma alanı"
              : "Kişisel beslenme yolculuğunuz"}
          </span>
          <div className="portal-account">
            <span className="portal-avatar" aria-hidden="true">
              {name
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("")}
            </span>
            <strong>{name}</strong>
          </div>
        </header>
        {role === "admin" && (
          <form action="/admin/danisanlar" className="portal-command-search">
            <Search size={18} aria-hidden="true" />
            <label className="sr-only" htmlFor="quick-client">
              Danışan dosyasına hızlı erişim
            </label>
            <input
              id="quick-client"
              name="q"
              placeholder="Danışan dosyasına hızlı erişim…"
            />
            <button type="submit">Ara →</button>
          </form>
        )}
        <div key={path} className="portal-content portal-route-enter">
          {children}
        </div>
        <footer className="portal-footnote">
          Diyetisyen Utku Karakoç · Kişisel bilgileriniz yalnızca yetkili
          hesabınızla görüntülenir.
        </footer>
      </div>
    </div>
  );
}
