"use client";
import { useEffect, useState } from "react";
import { legacyAuthTokens } from "@/lib/portal/auth-links";

// Older Supabase invitations return credentials in the fragment, invisible to SSR.
export function AuthLinkBridge() {
  const [opening, setOpening] = useState(false);
  useEffect(() => {
    const hash = window.location.hash;
    const tokens = legacyAuthTokens(hash);
    if (!tokens) return;
    window.history.replaceState(null, "", window.location.pathname);
    // One-time synchronization with a credential fragment received outside React.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpening(true);
    fetch("/auth/session", {
      method: "POST", headers: { "Content-Type": "application/json" },
      credentials: "same-origin", body: JSON.stringify(tokens),
    }).then(response => {
      window.location.replace(response.ok ? "/sifre-belirle" : "/giris?error=link");
    }).catch(() => window.location.replace("/giris?error=link"));
  }, []);
  if (!opening) return null;
  return <div className="auth-link-overlay" role="status" aria-live="polite"><span className="auth-link-loader" /><h1>Hesabınızı hazırlıyoruz.</h1><p>Şifrenizi belirlemeniz için güvenli bağlantınız doğrulanıyor.</p></div>;
}
