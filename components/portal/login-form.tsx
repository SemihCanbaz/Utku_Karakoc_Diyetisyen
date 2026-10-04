"use client";
import { useState, useTransition, useEffect } from "react";
import Link from "next/link";
import {
  Eye,
  EyeOff,
  ArrowLeft,
  Mail,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { login, resetPassword, setPassword } from "@/lib/portal/login-actions";
import type { ActionResult } from "@/lib/portal/types";
export function LoginForm({
  passwordMode = false,
  enabled = true,
  invalidLink = false,
}: {
  passwordMode?: boolean;
  enabled?: boolean;
  invalidLink?: boolean;
}) {
  const [result, setResult] = useState<ActionResult>({});
  const [pending, start] = useTransition();
  const [forgot, setForgot] = useState(false);
  const [visible, setVisible] = useState(false);
  const [password, setPasswordValue] = useState("");
  const [confirm, setConfirm] = useState("");
  const [cooldown, setCooldown] = useState(0);
  useEffect(() => {
    if (!cooldown) return;
    const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);
  const saved = passwordMode && !!result.success;
  return (
    <form
      className="portal-form"
      aria-busy={pending}
      onSubmit={(event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        if (passwordMode && password !== confirm) {
          setResult({
            error: "Şifreler eşleşmiyor. İki alana da aynı şifreyi yazın.",
          });
          return;
        }
        setResult({});
        start(async () => {
          const answer = await (
            passwordMode ? setPassword : forgot ? resetPassword : login
          )(form);
          setResult(answer);
          if (forgot && answer.success) setCooldown(60);
        });
      }}
    >
      {!enabled && (
        <p className="portal-notice">
          Portal hazırlık aşamasında.{" "}
          <Link href="/iletisim">İletişime geçin.</Link>
        </p>
      )}
      {invalidLink && !forgot && (
        <p role="alert" className="portal-error">
          Bağlantı geçersiz veya süresi dolmuş. “Şifremi unuttum” ile yeni
          bağlantı isteyin.
        </p>
      )}
      {forgot && (
        <div className="portal-reset-intro">
          <Mail size={25} />
          <h3>Şifrenizi birlikte yenileyelim.</h3>
          <p>
            Hesabınıza kayıtlı e-postayı yazın. Gönderilen bağlantıyı isteği
            başlattığınız tarayıcıda açın; gelen kutusu ve gereksiz e-postaları
            kontrol edin.
          </p>
        </div>
      )}
      {!passwordMode && (
        <label>
          E-posta
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            maxLength={254}
            disabled={pending}
            placeholder="ornek@eposta.com"
          />
        </label>
      )}
      {!forgot && !saved && (
        <>
          <label>
            {passwordMode ? "Yeni şifre" : "Şifre"}
            <span className="portal-password-field">
              <input
                name="password"
                type={visible ? "text" : "password"}
                required
                minLength={passwordMode ? 12 : 1}
                maxLength={128}
                autoComplete={
                  passwordMode ? "new-password" : "current-password"
                }
                disabled={pending}
                value={password}
                onChange={(e) => setPasswordValue(e.target.value)}
              />
              <button
                type="button"
                aria-label={visible ? "Şifreyi gizle" : "Şifreyi göster"}
                aria-pressed={visible}
                onClick={() => setVisible(!visible)}
              >
                {visible ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </span>
          </label>
          {passwordMode && (
            <>
              <p className="portal-field-hint">
                {password.length >= 12
                  ? "✓ En az 12 karakter koşulu tamamlandı."
                  : "En az 12 karakter kullanın. Uzun ve size özel bir parola seçin."}
              </p>
              <label>
                Yeni şifre tekrar
                <input
                  name="confirm"
                  type={visible ? "text" : "password"}
                  required
                  minLength={12}
                  maxLength={128}
                  autoComplete="new-password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  disabled={pending}
                />
              </label>
              {confirm && confirm !== password && (
                <p className="portal-field-hint">Şifreler henüz eşleşmiyor.</p>
              )}
            </>
          )}
        </>
      )}
      {(result.error || result.success) && (
        <div
          className={
            result.error
              ? "portal-feedback portal-error"
              : "portal-feedback portal-success"
          }
          role={result.error ? "alert" : "status"}
        >
          {result.error ? (
            <AlertCircle size={20} />
          ) : (
            <CheckCircle2 size={20} />
          )}
          <span>{result.error || result.success}</span>
        </div>
      )}
      {!saved && (
        <button
          className="portal-button"
          disabled={pending || !enabled || (forgot && cooldown > 0)}
        >
          {pending && <span className="portal-spinner" aria-hidden="true" />}
          {pending
            ? forgot
              ? "Bağlantı isteniyor…"
              : passwordMode
                ? "Şifre kaydediliyor…"
                : "Giriş yapılıyor…"
            : forgot
              ? cooldown
                ? `Yeniden göndermek için ${cooldown} sn`
                : "Şifre yenileme bağlantısı gönder"
              : passwordMode
                ? "Şifremi kaydet"
                : "Giriş yap"}
        </button>
      )}
      {!passwordMode && (
        <button
          type="button"
          className="portal-link"
          disabled={pending || !enabled}
          onClick={() => {
            setForgot(!forgot);
            setResult({});
          }}
        >
          {forgot ? (
            <>
              <ArrowLeft size={16} /> Girişe dön
            </>
          ) : (
            "Şifremi unuttum"
          )}
        </button>
      )}
      {passwordMode && (
        <Link className={saved ? "portal-button" : "portal-link"} href="/giris">
          Girişe dön
        </Link>
      )}
      <p className="portal-muted">
        Hesaplar yalnızca diyetisyeninizin davetiyle oluşturulur.
      </p>
    </form>
  );
}
