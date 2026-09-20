import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { articles } from "../lib/articles.ts";
import { services } from "../lib/services.ts";
import { tools } from "../lib/tools.ts";
import { recipes } from "../lib/recipes.ts";
import { guides } from "../lib/guides.ts";
import { navigation } from "../lib/site-config.ts";

function unique(items, label) {
  const set = new Set(items);
  assert.equal(set.size, items.length, `${label} içinde mükerrer slug var`);
}
unique(articles.map((x) => x.slug), "articles");
unique(services.map((x) => x.slug), "services");
unique(tools.map((x) => x.slug), "tools");
unique(recipes.map((x) => x.slug), "recipes");
unique(guides.map((x) => x.slug), "guides");

for (const article of articles) {
  assert.ok(article.sections.length >= 3, `${article.slug} section`);
  assert.ok(article.sources.length >= 1, `${article.slug} source`);
}
for (const service of services) {
  assert.ok(service.highlights.length >= 3, `${service.slug} highlights`);
  assert.ok(service.process.length >= 3, `${service.slug} process`);
  if (service.relatedGuide) assert.ok(guides.some((g) => g.slug === service.relatedGuide), `${service.slug} relatedGuide`);
}
for (const recipe of recipes) assert.ok(existsSync(`public${recipe.image}`), `missing ${recipe.image}`);
for (const item of navigation) {
  const route = item.href === "/" ? "app/page.tsx" : `app${item.href}/page.tsx`;
  assert.ok(existsSync(route), `navigation route missing: ${item.href}`);
}
for (const file of [
  "app/makaleler/[slug]/page.tsx",
  "app/danismanlik/[slug]/page.tsx",
  "app/hesaplayicilar/[slug]/page.tsx",
  "app/tarifler/[slug]/page.tsx",
  "app/beslenme-rehberi/[slug]/page.tsx",
  "public/brand/botanical-line.svg",
]) assert.ok(existsSync(file), `missing ${file}`);

console.log(JSON.stringify({
  articles: articles.length,
  services: services.length,
  tools: tools.length,
  recipes: recipes.length,
  guides: guides.length,
  navigation: navigation.length,
  result: "PASS",
}, null, 2));
