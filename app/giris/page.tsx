import Link from "next/link";
import { ClipboardList, CalendarDays, ChartNoAxesCombined } from "lucide-react";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/portal/login-form";
import { session } from "@/lib/portal/auth";
import { configured } from "@/lib/supabase/server";
import "../portal.css";
export const metadata = {
  title: "Danışan girişi",
  robots: { index: false, follow: false },
};
export default async function Login({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const current = await session();
  if (current)
    redirect(current.profile.role === "admin" ? "/admin" : "/danisan");
  return (
    <div className="portal portal-login">
      <div className="portal-login-story">
        <Link href="/">UTKU KARAKOÇ · DİYETİSYEN</Link>
        <h1>
          Size özel bir yolculuk.
          <br />
          <em>Her adımı birlikte.</em>
        </h1>
        <p>
          Beslenme planınız, ölçümleriniz ve yaklaşan görüşmeleriniz tek bir
          yerde.
        </p>
        <ul className="portal-login-features">
          <li>
            <ClipboardList size={22} />
            <span>
              <strong>Size özel plan</strong>Haftalık beslenme listeleriniz
            </span>
          </li>
          <li>
            <ChartNoAxesCombined size={22} />
            <span>
              <strong>Görünür gelişim</strong>Ölçüm geçmişiniz, tek bir yerde
            </span>
          </li>
          <li>
            <CalendarDays size={22} />
            <span>
              <strong>Düzenli görüşmeler</strong>Yaklaşan randevularınız
            </span>
          </li>
        </ul>
        <span>BİLİMSEL YAKLAŞIM · GERÇEK HAYAT</span>
      </div>
      <section className="portal-login-card">
        <p className="portal-eyebrow">KİŞİSEL ALANINIZ</p>
        <h2>Hoş geldiniz.</h2>
        <p>Hesabınıza güvenle giriş yapın.</p>
        <LoginForm
          enabled={configured()}
          invalidLink={(await searchParams).error === "link"}
        />
        <Link href="/gizlilik">Gizlilik</Link> ·{" "}
        <Link href="/kvkk">Aydınlatma metni</Link>
      </section>
    </div>
  );
}
