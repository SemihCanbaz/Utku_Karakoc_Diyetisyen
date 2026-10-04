import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });
  response.headers.set("Cache-Control", "private, no-store");
  const protectedRoute = /^\/(admin|danisan)(\/|$)/.test(
    request.nextUrl.pathname,
  );
  const go = (path: string) => {
    const target = NextResponse.redirect(new URL(path, request.url));
    response.cookies.getAll().forEach((cookie) => target.cookies.set(cookie));
    target.headers.set("Cache-Control", "private, no-store");
    return target;
  };
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
    return protectedRoute ? go("/giris") : response;
  const client = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookieOptions: {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      },
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll(values) {
          values.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          values.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
          response.headers.set("Cache-Control", "private, no-store");
        },
      },
    },
  );
  const {
    data: { user },
    error,
  } = await client.auth.getUser();
  if (protectedRoute) {
    if (error || !user) return go("/giris");
    const { data: profile } = await client
      .from("profiles")
      .select("role,client_id")
      .eq("auth_user_id", user.id)
      .single();
    if (!profile || !["admin", "client"].includes(profile.role))
      return go("/giris");
    if (profile.role === "client") {
      const { data: person } = await client
        .from("clients")
        .select("status")
        .eq("id", profile.client_id)
        .single();
      if (person?.status !== "active") return go("/giris");
    }
    const expected = request.nextUrl.pathname.startsWith("/admin")
      ? "admin"
      : "client";
    if (profile.role !== expected)
      return go(profile.role === "admin" ? "/admin" : "/danisan");
  }
  return response;
}
export const config = {
  matcher: [
    "/admin/:path*",
    "/danisan/:path*",
    "/giris",
    "/sifre-belirle",
    "/auth/:path*",
  ],
};
