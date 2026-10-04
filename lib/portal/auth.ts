import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { configured, db } from "@/lib/supabase/server";
export const session = cache(async () => {
  if (!configured()) return null;
  const client = await db();
  const {
    data: { user },
    error,
  } = await client.auth.getUser();
  if (error || !user) return null;
  const { data: profile, error: profileError } = await client
    .from("profiles")
    .select("id,role,client_id,first_name,last_name")
    .eq("auth_user_id", user.id)
    .single();
  if (profileError || !profile) return null;
  if (profile.role === "client") {
    const { data: person } = await client
      .from("clients")
      .select("status,first_name,last_name")
      .eq("id", profile.client_id)
      .single();
    if (person?.status !== "active") return null;
    profile.first_name = person.first_name;
    profile.last_name = person.last_name;
  }
  return { client, user, profile };
});
export async function requireRole(role: "admin" | "client") {
  const current = await session();
  if (!current) redirect("/giris");
  if (current.profile.role !== role)
    redirect(current.profile.role === "admin" ? "/admin" : "/danisan");
  return current;
}
