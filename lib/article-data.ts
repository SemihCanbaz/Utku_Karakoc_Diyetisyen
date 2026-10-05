import "server-only";
import { cache } from "react";
import { articles as localArticles, type Article } from "./articles";
import { configured, publicDb } from "./supabase/server";
import type { ArticleRecord } from "./portal/article-validation";
export function mapArticle(row: ArticleRecord, index = 0): Article {
  return { ...row, readingTime: row.reading_time, number: String(index + 1).padStart(2, "0"), coverImage: row.cover_image, imageAlt: row.image_alt, publishedAt: row.published_at || undefined, updatedAt: row.updated_at };
}
export const getPublicArticles = cache(async (): Promise<Article[]> => {
  if (!configured()) return localArticles;
  const { data, error } = await publicDb().from("articles").select("*").eq("status", "published").is("deleted_at", null).order("published_at", { ascending: false });
  if (error) throw new Error("Makaleler şu anda yüklenemiyor.");
  return (data as ArticleRecord[]).map(mapArticle);
});
export const getPublicArticle = cache(async (slug: string) => (await getPublicArticles()).find(article => article.slug === slug));
