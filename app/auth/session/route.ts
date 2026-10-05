import { NextRequest, NextResponse } from "next/server";
import { configured, db } from "@/lib/supabase/server";
import { z } from "zod";
const tokens = z.object({ access_token: z.string().min(1).max(12000), refresh_token: z.string().min(1).max(2000) });
export async function POST(request: NextRequest) {
  const reply = (status: number) => NextResponse.json({ ok: status === 200 }, { status, headers: { "Cache-Control": "private, no-store" } });
  if (request.headers.get("origin") !== request.nextUrl.origin) return reply(403);
  if (!configured() || Number(request.headers.get("content-length") || 0) > 16000) return reply(400);
  const parsed = tokens.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return reply(400);
  const client = await db();
  const { data: { user }, error } = await client.auth.getUser(parsed.data.access_token);
  if (error || !user) return reply(401);
  const { error: sessionError } = await client.auth.setSession(parsed.data);
  return reply(sessionError ? 401 : 200);
}
