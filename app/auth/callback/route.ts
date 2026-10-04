import { NextRequest, NextResponse } from "next/server";
import { configured, db } from "@/lib/supabase/server";
export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  if (configured() && code && code.length < 2048) {
    const client = await db();
    const { error } = await client.auth.exchangeCodeForSession(code);
    if (!error)
      return NextResponse.redirect(new URL("/sifre-belirle", request.url));
  }
  return NextResponse.redirect(new URL("/giris?error=link", request.url));
}
