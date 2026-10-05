import { z } from "zod";
const text = (max: number) => z.string().trim().max(max);
export const articleSchema = z.object({
  title: text(180).min(3, "Başlık en az 3 karakter olmalı."),
  slug: text(200).regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "URL küçük harf, rakam ve tire içermeli."),
  subtitle: text(300), category: text(100).min(2),
  description: text(320).min(20, "SEO açıklaması en az 20 karakter olmalı."),
  intro: text(5000).min(20, "Giriş paragrafı en az 20 karakter olmalı."),
  takeaway: text(3000), reading_time: text(40).min(1),
  cover_image: text(2000), image_alt: text(250),
  status: z.enum(["draft", "published", "archived"]),
  sections: z.array(z.object({ title: text(200).min(2), paragraphs: z.array(text(8000).min(1)).min(1).max(30), bullets: z.array(text(1000).min(1)).max(40).optional() })).min(1, "En az bir bölüm ekleyin.").max(40),
  sources: z.array(z.object({ label: text(1000).min(3), url: z.union([z.url().refine(v => /^https?:\/\//.test(v), "Kaynak bağlantısı http veya https olmalı."), z.literal("")]).optional() })).max(60),
}).refine(v => !v.cover_image || v.image_alt.length >= 3, { message: "Kapak fotoğrafı için açıklayıcı alternatif metin yazın.", path: ["image_alt"] });
export type ArticleRecord = z.infer<typeof articleSchema> & { id: string; published_at: string | null; updated_at: string; deleted_at: string | null };
