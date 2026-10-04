"use server";
import { redirect } from "next/navigation";
import { db, configured } from "../supabase/server";
import { session } from "./auth";
import type { ActionResult } from "./types";
export async function login(form: FormData): Promise<ActionResult> {
  if (!configured())
    return { error: "Danışan portalı henüz kullanıma açılmadı." };
  const email = String(form.get("email") || "").trim(),
    password = String(form.get("password") || "");
  if (!email || !password) return { error: "E-posta ve şifrenizi yazın." };
  const client = await db();
  const { error } = await client.auth.signInWithPassword({ email, password });
  if (error)
    return { error: "Giriş yapılamadı. E-posta ve şifrenizi kontrol edin." };
  const current = await session();
  if (!current) {
    await client.auth.signOut();
    return {
      error:
        "Hesabınız henüz etkinleştirilmedi. Diyetisyeninizle iletişime geçin.",
    };
  }
  redirect(current.profile.role === "admin" ? "/admin" : "/danisan");
}
export async function logout() {
  if (configured()) {
    const client = await db();
    await client.auth.signOut();
  }
  redirect("/giris");
}
export async function resetPassword(form: FormData): Promise<ActionResult> {
  if (!configured()) return { error: "Portal henüz kullanıma açılmadı." };
  const email = String(form.get("email") || "").trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return { error: "Geçerli e-posta adresinizi yazın." };
  const client = await db();
  const { error } = await client.auth.resetPasswordForEmail(email, {
    redirectTo: new URL(
      "/auth/callback",
      process.env.NEXT_PUBLIC_SITE_URL ||
        "https://diyetisyen-utku-karakoc.vercel.app",
    ).href,
  });
  if (error)
    return { error: "İstek gönderilemedi. Biraz sonra yeniden deneyin." };
  return {
    success:
      "Bu adrese bağlı bir hesap varsa şifre yenileme bağlantısı gönderilecektir.",
  };
}
export async function setPassword(form: FormData): Promise<ActionResult> {
  const password = String(form.get("password") || "");
  if (password.length < 12 || password.length > 128)
    return { error: "Şifre 12–128 karakter olmalı." };
  if (password !== form.get("confirm"))
    return { error: "Şifreler eşleşmiyor." };
  if (!configured()) return { error: "Portal henüz kullanıma açılmadı." };
  const client = await db();
  const {
    data: { user },
  } = await client.auth.getUser();
  if (!user)
    return {
      error: "Bağlantının süresi dolmuş. Yeni bir şifre bağlantısı isteyin.",
    };
  const { error } = await client.auth.updateUser({ password });
  if (error)
    return { error: "Şifre değiştirilemedi. Daha güçlü bir şifre deneyin." };
  await client.auth.signOut();
  return {
    success: "Şifreniz kaydedildi. Yeni şifrenizle giriş yapabilirsiniz.",
  };
}
