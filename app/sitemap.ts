import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { getPublicRecipes } from "@/lib/recipe-data";
export const revalidate = 60;
import { guides } from "@/lib/guides";
import { getPublicArticles } from "@/lib/article-data";
import { services } from "@/lib/services";
import { tools } from "@/lib/tools";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (!siteConfig.allowIndexing) return [];
  const [recipes, articles] = await Promise.all([getPublicRecipes(), getPublicArticles()]);
  return [
    "",
    "/hakkimda",
    "/vip-diyet",
    "/danismanlik",
    "/makaleler",
    "/hesaplayicilar",
    "/tarifler",
    "/beslenme-rehberi",
    "/iletisim",
    "/randevu",
    "/gizlilik",
    "/cerez-politikasi",
    "/kvkk",
    "/kullanim-kosullari",
    ...recipes.map((r) => "/tarifler/" + r.slug),
    ...guides.map((g) => "/beslenme-rehberi/" + g.slug),
    ...articles.map((a) => "/makaleler/" + a.slug),
    ...services.map((s) => "/danismanlik/" + s.slug),
    ...tools.map((tool) => "/hesaplayicilar/" + tool.slug),
  ].map((path) => ({ url: siteConfig.url + path }));
}
