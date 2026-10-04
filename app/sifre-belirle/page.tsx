import { LoginForm } from "@/components/portal/login-form";
import { configured } from "@/lib/supabase/server";
import "../portal.css";
export const metadata = {
  title: "Şifre belirle",
  robots: { index: false, follow: false },
};
export default function Password() {
  return (
    <div className="portal portal-login">
      <section className="portal-login-card">
        <p className="portal-eyebrow">HESABINIZI KORUYUN</p>
        <h1>Şifrenizi belirleyin.</h1>
        <p>
          En az 12 karakter içeren, başka yerde kullanmadığınız bir şifre seçin.
        </p>
        <LoginForm passwordMode enabled={configured()} />
      </section>
    </div>
  );
}
