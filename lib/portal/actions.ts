"use server";
import { revalidatePath } from "next/cache";
import { requireRole } from "./auth";
import { adminDb } from "../supabase/server";
import {
  clientSchema,
  measurementSchema,
  planSchema,
  appointmentSchema,
  recipeSchema,
  uuid,
} from "./validation";
import type { ActionResult } from "./types";
import { z } from "zod";
import { addDays } from "./workflow";
const errorText = (code?: string) =>
  code === "23505"
    ? "Bu e-posta, tarih, hafta veya URL zaten kullanılıyor."
    : code === "23P01"
      ? "Bu saatlerde başka bir randevu var. Lütfen farklı saat seçin."
      : "Kayıt tamamlanamadı. Bilgileri kontrol edip tekrar deneyin.";
async function save(
  table: string,
  schema: z.ZodType,
  input: unknown,
  id?: string,
): Promise<ActionResult> {
  const { client } = await requireRole("admin");
  if (id && !uuid.safeParse(id).success) return { error: "Geçersiz kayıt." };
  const parsed = schema.safeParse(input);
  if (!parsed.success)
    return { error: parsed.error.issues.map((i) => i.message).join(" ") };
  const data = parsed.data as Record<string, unknown>;
  const query = id
    ? client.from(table).update(data).eq("id", id)
    : client.from(table).insert(data);
  const { data: row, error } = await query.select("id").single();
  if (error) return { error: errorText(error.code) };
  revalidatePath("/admin", "layout");
  revalidatePath("/danisan", "layout");
  return { success: "Kaydedildi.", id: row.id };
}
export async function saveClient(input: unknown, id?: string) {
  return save("clients", clientSchema, input, id);
}
export async function saveMeasurement(input: unknown, id?: string) {
  return save("client_measurements", measurementSchema, input, id);
}
export async function savePlan(input: unknown, id?: string) {
  return save("diet_plans", planSchema, input, id);
}
export async function deletePlan(id: string): Promise<ActionResult> {
  const { client } = await requireRole("admin");
  if (!uuid.safeParse(id).success) return { error: "Geçersiz plan." };
  const { data, error } = await client.from("diet_plans").delete().eq("id", id).select("id").maybeSingle();
  if (error) return { error: errorText(error.code) };
  if (!data) return { error: "Plan bulunamadı; başka bir oturumda kaldırılmış olabilir." };
  revalidatePath("/admin", "layout");
  revalidatePath("/danisan", "layout");
  return { success: "Plan silindi." };
}
export async function deleteAppointment(id: string): Promise<ActionResult> {
  const { client } = await requireRole("admin");
  if (!uuid.safeParse(id).success) return { error: "Geçersiz randevu." };
  const { data, error } = await client.from("appointments").delete().eq("id", id).select("id").maybeSingle();
  if (error || !data) return { error: "Randevu silinemedi veya zaten kaldırılmış." };
  revalidatePath("/admin", "layout");
  revalidatePath("/danisan", "layout");
  return { success: "Randevu silindi." };
}
export async function duplicatePlan(id: string): Promise<ActionResult> {
  const { client } = await requireRole("admin");
  if (!uuid.safeParse(id).success) return { error: "Geçersiz plan." };
  const { data: source, error } = await client
    .from("diet_plans")
    .select("*")
    .eq("id", id)
    .single();
  if (error || !source) return { error: "Kaynak plan bulunamadı." };
  const { data: latest, error: latestError } = await client
    .from("diet_plans")
    .select("week_number,end_date")
    .eq("client_id", source.client_id)
    .order("week_number", { ascending: false })
    .limit(1)
    .single();
  if (latestError || !latest) return { error: "Hafta bilgisi okunamadı." };
  const start = addDays(latest.end_date, 1);
  return savePlan({
    client_id: source.client_id,
    week_number: latest.week_number + 1,
    title: source.title,
    start_date: start,
    end_date: addDays(start, 6),
    content: source.content,
    notes: source.notes,
    status: "draft",
  });
}
export async function saveAppointment(input: unknown, id?: string) {
  return save("appointments", appointmentSchema, input, id);
}
export async function deleteMeasurement(id: string): Promise<ActionResult> {
  const { client } = await requireRole("admin");
  if (!uuid.safeParse(id).success) return { error: "Geçersiz kayıt." };
  const { error } = await client
    .from("client_measurements")
    .delete()
    .eq("id", id);
  if (error) return { error: errorText(error.code) };
  revalidatePath("/admin", "layout");
  revalidatePath("/danisan", "layout");
  return { success: "Ölçüm silindi." };
}
export async function inviteClient(id: string): Promise<ActionResult> {
  const { client } = await requireRole("admin");
  if (!uuid.safeParse(id).success) return { error: "Geçersiz danışan." };
  const { data: person } = await client
    .from("clients")
    .select("*")
    .eq("id", id)
    .single();
  if (!person || person.status !== "active")
    return { error: "Önce aktif bir danışan kaydı oluşturun." };
  const { data: profile } = await client
    .from("profiles")
    .select("id,auth_user_id")
    .eq("client_id", id)
    .maybeSingle();
  let service;
  try {
    service = adminDb();
  } catch {
    return { error: "Hesap daveti için sunucu anahtarı henüz ayarlanmadı." };
  }
  const redirectTo = new URL("/sifre-belirle", process.env.NEXT_PUBLIC_SITE_URL || "https://utkukarakoc.com.tr").href;
  if (profile) {
    const { data: existing, error: lookupError } = await service.auth.admin.getUserById(profile.auth_user_id);
    if (lookupError || existing.user?.email?.toLowerCase() !== person.email.toLowerCase()) return { error: "Giriş e-postası ile danışan dosyasındaki adres uyuşmuyor. Hesap adresini kontrol edin." };
    const { error: resetError } = await service.auth.resetPasswordForEmail(person.email, { redirectTo });
    return resetError ? { error: "Bağlantı gönderilemedi. Biraz sonra yeniden deneyin." } : { success: "Yeni şifre belirleme bağlantısı danışanın e-posta adresine gönderildi." };
  }
  const { data, error } = await service.auth.admin.inviteUserByEmail(
    person.email,
    { redirectTo },
  );
  if (error || !data.user)
    return {
      error:
        "Davet gönderilemedi. E-posta, Supabase e-posta ayarı ve mevcut Auth hesabını kontrol edin.",
    };
  const { error: linkError } = await service.from("profiles").insert({
    auth_user_id: data.user.id,
    client_id: id,
    role: "client",
    first_name: person.first_name,
    last_name: person.last_name,
  });
  if (linkError) {
    return {
      error:
        "Davet oluşturuldu fakat hesap danışanla eşleştirilemedi. Giriş yetkisi verilmedi. Kurulum belgesindeki hesap eşleştirme adımını uygulayın.",
    };
  }
  revalidatePath("/admin", "layout");
  return {
    success:
      "Hesap daveti e-posta sağlayıcısına iletildi. Danışan gelen bağlantıdan şifresini belirleyebilir.",
  };
}
export async function deleteClient(id: string): Promise<ActionResult> {
  await requireRole("admin");

  if (!uuid.safeParse(id).success) {
    return { error: "Geçersiz danışan." };
  }

  let service;
  try {
    service = adminDb();
  } catch {
    return {
      error: "Danışan silme işlemi için sunucu yetkisi bulunamadı.",
    };
  }

  const { data: person, error: personError } = await service
    .from("clients")
    .select("id,first_name,last_name")
    .eq("id", id)
    .maybeSingle();

  if (personError || !person) {
    return { error: "Danışan bulunamadı." };
  }

  const { data: profile, error: profileError } = await service
    .from("profiles")
    .select("id,auth_user_id")
    .eq("client_id", id)
    .maybeSingle();

  if (profileError) {
    return { error: "Danışanın giriş hesabı kontrol edilemedi." };
  }

  const relatedTables = [
    "appointments",
    "client_measurements",
    "diet_plans",
  ] as const;

  for (const table of relatedTables) {
    const { error } = await service.from(table).delete().eq("client_id", id);

    if (error) {
      return {
        error: "Danışana bağlı kayıtlar silinirken işlem durduruldu.",
      };
    }
  }

  if (profile) {
    const { error: profileDeleteError } = await service
      .from("profiles")
      .delete()
      .eq("id", profile.id);

    if (profileDeleteError) {
      return {
        error: "Danışanın portal hesabı kaldırılamadı.",
      };
    }
  }

  const { data: deletedClient, error: clientDeleteError } = await service
    .from("clients")
    .delete()
    .eq("id", id)
    .select("id")
    .maybeSingle();

  if (clientDeleteError || !deletedClient) {
    return {
      error: "Danışan kaydı silinemedi.",
    };
  }

  if (profile?.auth_user_id) {
    const { error: authDeleteError } =
      await service.auth.admin.deleteUser(profile.auth_user_id);

    if (authDeleteError) {
      revalidatePath("/admin", "layout");

      return {
        success:
          "Danışan ve bağlı kayıtları silindi. Eski giriş hesabı Auth tarafında ayrıca kontrol edilmeli.",
      };
    }
  }

  revalidatePath("/admin", "layout");
  revalidatePath("/danisan", "layout");

  return {
    success: `${person.first_name} ${person.last_name} ve tüm bağlı kayıtları kalıcı olarak silindi.`,
  };
}
function imagePath(url: string) {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!base) return null;
  const prefix =
    base.replace(/\/$/, "") + "/storage/v1/object/public/recipe-images/";
  return url.startsWith(prefix) ? url.slice(prefix.length) : null;
}
export async function saveRecipe(
  input: unknown,
  id?: string,
  upload?: FormData,
): Promise<ActionResult> {
  const { client } = await requireRole("admin");
  if (id && !uuid.safeParse(id).success) return { error: "Geçersiz tarif." };
  const parsed = recipeSchema.safeParse(input);
  if (!parsed.success)
    return { error: parsed.error.issues.map((i) => i.message).join(" ") };
  const data = parsed.data;
  let oldImage = "",
    oldPublished: string | null = null;
  if (id) {
    const { data: old } = await client
      .from("recipes")
      .select("cover_image,published_at")
      .eq("id", id)
      .is("deleted_at", null)
      .single();
    if (!old) return { error: "Tarif bulunamadı." };
    oldImage = old.cover_image;
    oldPublished = old.published_at;
  }
  const file = upload?.get("image");
  let newPath: string | null = null;
  if (file instanceof File && file.size) {
    if (
      file.size > 5 * 1024 * 1024 ||
      !["image/jpeg", "image/png", "image/webp"].includes(file.type)
    )
      return {
        error: "JPG, PNG veya WebP kullanın; dosya en fazla 5 MB olabilir.",
      };
    const buffer = Buffer.from(await file.arrayBuffer());
    const sharp = (await import("sharp")).default;
    try {
      const meta = await sharp(buffer, {
        limitInputPixels: 40000000,
      }).metadata();
      if (!["jpeg", "png", "webp"].includes(meta.format || ""))
        return { error: "Görselin içeriği desteklenmiyor." };
    } catch {
      return { error: "Görsel okunamadı. Başka bir dosya seçin." };
    }
    const image = await sharp(buffer)
      .rotate()
      .resize(1800, 1800, { fit: "inside", withoutEnlargement: true })
      .webp({ quality: 90 })
      .toBuffer();
    newPath = crypto.randomUUID() + ".webp";
    const { error } = await client.storage
      .from("recipe-images")
      .upload(newPath, image, { contentType: "image/webp", upsert: false });
    if (error) return { error: "Görsel yüklenemedi. Eski görsel korunuyor." };
    data.cover_image = client.storage
      .from("recipe-images")
      .getPublicUrl(newPath).data.publicUrl;
  }
  if (
    !/^\/images\/recipes\/[a-zA-Z0-9_-]+\.(webp|png|jpe?g)$/.test(
      data.cover_image,
    ) &&
    !imagePath(data.cover_image)
  )
    return {
      error:
        "Yalnızca proje görseli veya bu projenin yükleme alanı kullanılabilir.",
    };
  if (data.cover_image.startsWith("/images/recipes/")) {
    const { existsSync } = await import("node:fs");
    if (!existsSync(process.cwd() + "/public" + data.cover_image))
      return { error: "Kapak görseli bulunamadı. Bir fotoğraf yükleyin." };
  }
  const values = {
    ...data,
    published_at:
      data.status === "published"
        ? oldPublished || new Date().toISOString()
        : oldPublished,
  };
  const query = id
    ? client.from("recipes").update(values).eq("id", id).is("deleted_at", null)
    : client.from("recipes").insert(values);
  const { data: row, error } = await query.select("id").single();
  if (error) {
    if (newPath) await client.storage.from("recipe-images").remove([newPath]);
    return { error: errorText(error.code) };
  }
  if (oldImage && oldImage !== data.cover_image) {
    const path = imagePath(oldImage);
    if (path) {
      const { count, error: checkError } = await client
        .from("recipes")
        .select("id", { count: "exact", head: true })
        .eq("cover_image", oldImage);
      if (!checkError && count === 0)
        await client.storage.from("recipe-images").remove([path]);
    }
  }
  revalidatePath("/", "layout");
  return { success: "Tarif kaydedildi.", id: row.id };
}
export async function removeRecipe(id: string): Promise<ActionResult> {
  const { client } = await requireRole("admin");
  if (!uuid.safeParse(id).success) return { error: "Geçersiz tarif." };
  const { error } = await client
    .from("recipes")
    .update({ status: "archived", deleted_at: new Date().toISOString() })
    .eq("id", id);
  if (error) return { error: errorText(error.code) };
  revalidatePath("/", "layout");
  return { success: "Tarif silindi ve yayından kaldırıldı." };
}
