import { z } from "zod";
z.config(z.locales.tr());
export const uuid = z.string().uuid("Geçersiz kayıt kimliği.");
export const date = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Geçerli tarih girin.")
  .refine((v) => {
    const d = new Date(v + "T12:00:00Z");
    return !isNaN(d.getTime()) && d.toISOString().slice(0, 10) === v;
  }, "Geçerli tarih girin.");
const text = (max = 5000) => z.string().trim().max(max);
const optionalNumber = (min: number, max: number) =>
  z.preprocess(
    (v) => (v === "" || v == null ? null : Number(v)),
    z.number().finite().min(min).max(max).nullable(),
  );
export const clientSchema = z.object({
  first_name: text(100).min(1, "Ad gerekli."),
  last_name: text(100).min(1, "Soyad gerekli."),
  email: z.email("Geçerli e-posta girin.").transform((v) => v.toLowerCase()),
  phone: text(30).refine(
    (v) => !v || (/^[+\d\s()-]+$/.test(v) && v.replace(/\D/g, "").length >= 10),
    "Geçerli telefon girin.",
  ),
  birth_date: z.union([date, z.literal("")]).transform((v) => v || null),
  gender: text(50),
  start_date: date,
  goal: text(2000),
  target_weight: optionalNumber(20, 400),
  notes: text(),
  status: z.enum(["active", "passive"]),
});
export const measurementSchema = z.object({
  client_id: uuid,
  measurement_date: date,
  weight: z.coerce.number().min(20).max(400),
  waist: optionalNumber(20, 300),
  hip: optionalNumber(20, 300),
  body_fat_percentage: optionalNumber(1, 75),
  note: text(),
});
export const planSchema = z
  .object({
    client_id: uuid,
    week_number: z.coerce.number().int().min(1).max(1000),
    title: text(200).min(2, "Plan başlığı gerekli."),
    start_date: date,
    end_date: date,
    notes: text(),
    status: z.enum(["draft", "published", "archived"]),
    content: z.object({
      meals: z
        .array(
          z.object({
            name: text(100).min(1),
            time: z.string().regex(/^$|^([01]\d|2[0-3]):[0-5]\d$/),
            items: z
              .array(
                text(500).min(1, "Boş besin satırını doldurun veya silin."),
              )
              .min(1)
              .max(40),
          }),
        )
        .min(1, "En az bir öğün ekleyin.")
        .max(20),
    }),
  })
  .refine((v) => v.end_date >= v.start_date, {
    message: "Bitiş tarihi başlangıçtan önce olamaz.",
    path: ["end_date"],
  });
export const appointmentSchema = z
  .object({
    client_id: uuid,
    appointment_date: date,
    start_time: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/),
    end_time: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/),
    appointment_type: z.enum([
      "İlk Görüşme",
      "Kontrol",
      "Online Görüşme",
      "Ölçüm",
      "Diğer",
    ]),
    status: z.enum(["scheduled", "completed", "cancelled", "no_show"]),
    note: text(),
  })
  .refine((v) => v.end_time > v.start_time, {
    message: "Bitiş saati başlangıçtan sonra olmalı.",
    path: ["end_time"],
  });
export const slugify = (s: string) =>
  s
    .toLocaleLowerCase("tr-TR")
    .replace(/ı/g, "i")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
export const recipeSchema = z.object({
  title: text(180).min(2, "Tarif adı gerekli."),
  slug: z
    .string()
    .regex(
      /^[a-z0-9]+(-[a-z0-9]+)*$/,
      "Slug yalnızca küçük harf, rakam ve tire içermeli.",
    )
    .max(200),
  subtitle: text(300),
  description: text(2000).min(10, "Açıklama en az 10 karakter olmalı."),
  hero_description: text(3000),
  category: z.enum(["Kahvaltı", "Ana Yemek", "Ara Öğün", "Tatlı"]),
  cover_image: z
    .string()
    .max(2000)
    .refine(
      (v) => v.startsWith("/images/recipes/") || v.startsWith("https://"),
      "Geçerli bir kapak görseli gerekli.",
    ),
  image_alt: text(250).min(2),
  servings: text(100).min(1),
  prep_time: text(80),
  cook_time: text(80),
  total_time: text(80),
  difficulty: text(80),
  ingredients: z.array(text(500).min(1)).min(1).max(100),
  steps: z.array(text(2000).min(1)).min(1).max(100),
  calories: optionalNumber(0, 20000),
  protein: optionalNumber(0, 2000),
  carbs: optionalNumber(0, 2000),
  fat: optionalNumber(0, 2000),
  fiber: optionalNumber(0, 2000),
  dietitian_note: text(),
  allergens: text(500),
  nutrition_type: text(100),
  serving_suggestion: text(2000),
  calculation_note: text(2000),
  tip: text(2000),
  tags: z.array(text(80)).max(20),
  micro_nutrients: z
    .array(z.object({ label: text(100).min(1), value: text(100).optional() }))
    .max(30),
  featured: z.boolean(),
  status: z.enum(["draft", "published", "archived"]),
});
export function stats(rows: { measurement_date: string; weight: number }[]) {
  const list = [...rows].sort((a, b) =>
    a.measurement_date.localeCompare(b.measurement_date),
  );
  const first = list[0]?.weight ?? null,
    last = list.at(-1)?.weight ?? null,
    prev = list.at(-2)?.weight ?? null;
  return {
    list,
    first,
    last,
    total:
      first !== null && last !== null
        ? Number((last - first).toFixed(2))
        : null,
    change:
      prev !== null && last !== null ? Number((last - prev).toFixed(2)) : null,
  };
}
