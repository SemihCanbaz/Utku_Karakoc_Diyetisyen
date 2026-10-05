import { createClient } from "@supabase/supabase-js";
import { articles } from "../lib/articles.ts";
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) throw new Error("Supabase sunucu bağlantısı gerekli.");
const client = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
const rows = articles.map((a, i) => ({
  slug: a.slug, title: a.title, subtitle: a.subtitle, category: a.category,
  description: a.description, intro: a.intro, takeaway: a.takeaway,
  reading_time: a.readingTime, sections: a.sections, sources: a.sources,
  status: "published", published_at: new Date(Date.UTC(2026, 9, 3) - i * 1000).toISOString(),
}));
const { error } = await client.from("articles").upsert(rows, { onConflict: "slug", ignoreDuplicates: true });
if (error) throw new Error(error.message);
console.log(`${rows.length} makale kontrol edildi. Mevcut yönetici düzenlemeleri korundu.`);
