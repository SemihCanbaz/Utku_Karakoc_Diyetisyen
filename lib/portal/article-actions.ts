"use server";
import { revalidatePath } from "next/cache";
import { requireRole } from "./auth";
import { uuid } from "./validation";
import { articleSchema } from "./article-validation";
import type { ActionResult } from "./types";
export async function saveArticle(input: unknown, id?: string, upload?: FormData): Promise<ActionResult> {
  const { client } = await requireRole("admin");
  if (id && !uuid.safeParse(id).success) return { error: "Geçersiz makale." };
  const parsed = articleSchema.safeParse(input);
  if (!parsed.success) return { error: parsed.error.issues.map(i => i.message).join(" ") };
  const values = parsed.data;
  let publishedAt: string | null = null;
  if (id) {
    const { data, error } = await client.from("articles").select("published_at,slug").eq("id", id).is("deleted_at", null).single();
    if (error || !data) return { error: "Makale bulunamadı." };
    publishedAt = data.published_at;
    if (publishedAt && data.slug !== values.slug) return { error: "Yayımlanmış makalenin URL'si korunur. Başlık ve içeriği düzenleyebilirsiniz." };
  }
  const prefix = process.env.NEXT_PUBLIC_SUPABASE_URL + "/storage/v1/object/public/article-images/";
  if (values.cover_image && !values.cover_image.startsWith(prefix)) return { error: "Makale kapağını dosya yükleme alanından seçin." };
  let uploaded: string | null = null;
  const file = upload?.get("image");
  if (file instanceof File && file.size) {
    if (file.size > 5242880 || !["image/jpeg", "image/png", "image/webp"].includes(file.type)) return { error: "En fazla 5 MB JPG, PNG veya WebP seçin." };
    if (values.image_alt.length < 3) return { error: "Fotoğrafın alternatif metnini yazın." };
    try {
      const sharp = (await import("sharp")).default;
      const source = Buffer.from(await file.arrayBuffer());
      const metadata = await sharp(source, { limitInputPixels: 40000000 }).metadata();
      if (!["jpeg", "png", "webp"].includes(metadata.format || "")) return { error: "Desteklenmeyen görsel içeriği." };
      const buffer = await sharp(source, { limitInputPixels: 40000000 }).rotate().resize(1800,1800,{ fit:"inside", withoutEnlargement:true }).webp({ quality:90 }).toBuffer();
      uploaded = crypto.randomUUID() + ".webp";
      const { error } = await client.storage.from("article-images").upload(uploaded, buffer, { contentType: "image/webp" });
      if (error) return { error: "Fotoğraf yüklenemedi. Tekrar deneyin." };
      values.cover_image = prefix + uploaded;
    } catch { return { error: "Fotoğraf okunamadı." }; }
  }
  const payload = { ...values, published_at: values.status === "published" ? publishedAt || new Date().toISOString() : publishedAt };
  const query = id ? client.from("articles").update(payload).eq("id",id).is("deleted_at",null) : client.from("articles").insert(payload);
  const { data, error } = await query.select("id").single();
  if (error) {
    if (uploaded) await client.storage.from("article-images").remove([uploaded]);
    return { error: error.code === "23505" ? "Bu URL başka bir makalede kullanılıyor." : "Makale kaydedilemedi." };
  }
  revalidatePath("/", "layout");
  return { success: values.status === "published" ? "Makale yayımlandı." : "Makale kaydedildi.", id: data.id };
}
export async function removeArticle(id: string): Promise<ActionResult> {
  const { client } = await requireRole("admin");
  if (!uuid.safeParse(id).success) return { error: "Geçersiz makale." };
  const { data, error } = await client.from("articles").update({ deleted_at:new Date().toISOString(), status:"archived" }).eq("id",id).is("deleted_at",null).select("id").maybeSingle();
  if (error || !data) return { error: "Makale kaldırılamadı veya zaten kaldırılmış." };
  revalidatePath("/", "layout");
  return { success: "Makale yayından ve listeden kaldırıldı." };
}
