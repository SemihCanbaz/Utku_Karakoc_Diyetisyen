import { NextRequest, NextResponse } from "next/server";
import { db, configured } from "@/lib/supabase/server";
export async function GET(request: NextRequest) {
  const token_hash = request.nextUrl.searchParams.get("token_hash"),
    type = request.nextUrl.searchParams.get("type");
  if (
    configured() &&
    token_hash &&
    (type === "invite" || type === "recovery")
  ) {
    const client = await db();
    const { error } = await client.auth.verifyOtp({ token_hash, type });
    if (!error)
      return NextResponse.redirect(new URL("/sifre-belirle", request.url));
  }
  return NextResponse.redirect(new URL("/giris?error=link", request.url));
}
