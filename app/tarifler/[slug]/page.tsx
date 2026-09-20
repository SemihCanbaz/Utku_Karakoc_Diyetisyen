import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock3, Users, ChefHat, Timer, ArrowUpRight } from "lucide-react";
import { getRecipeBySlug, recipes } from "@/lib/recipes";
import { RecipeCard } from "@/components/recipe/recipe-card";
import { RecipeActions } from "@/components/recipe/recipe-actions";
import { pageMetadata, jsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return recipes.map((recipe) => ({ slug: recipe.slug }));
}
export async function generateMetadata({ params }: Props) {
  const recipe = getRecipeBySlug((await params).slug);
  if (!recipe) return { title: "Tarif bulunamadı", robots: { index: false } };
  return pageMetadata(
    recipe.title,
    recipe.shortDescription,
    "/tarifler/" + recipe.slug,
    recipe.image,
  );
}
function duration(value: string) {
  const match = value.match(/\d+/g);
  return match ? "PT" + match.at(-1) + "M" : undefined;
}
export default async function RecipeDetail({ params }: Props) {
  const recipe = getRecipeBySlug((await params).slug);
  if (!recipe) notFound();
  const nutrients = [
    { label: "Enerji", value: recipe.calories, unit: "kcal", key: "calories" },
    {
      label: "Protein",
      value: recipe.protein,
      unit: "g",
      key: "proteinContent",
    },
    {
      label: "Karbonhidrat",
      value: recipe.carbs,
      unit: "g",
      key: "carbohydrateContent",
    },
    { label: "Yağ", value: recipe.fat, unit: "g", key: "fatContent" },
    { label: "Lif", value: recipe.fiber, unit: "g", key: "fiberContent" },
  ].filter((n) => n.value != null);
  const nutrition = Object.fromEntries(
    nutrients.map((n) => [n.key, n.value + " " + n.unit]),
  );
  const schema = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: recipe.title,
    description: recipe.shortDescription,
    image: siteConfig.url + recipe.image,
    recipeYield: recipe.servings,
    recipeCategory: recipe.category,
    keywords: recipe.tags.join(", "),
    prepTime: duration(recipe.prepTime),
    cookTime: duration(recipe.cookTime),
    totalTime: duration(recipe.totalTime),
    ...(nutrients.length
      ? {
          nutrition: {
            "@type": "NutritionInformation",
            servingSize: "1 porsiyon",
            ...nutrition,
          },
        }
      : {}),
    recipeIngredient: recipe.ingredients,
    recipeInstructions: recipe.steps.map((text) => ({
      "@type": "HowToStep",
      text,
    })),
  };
  return (
    <article className="recipe-detail">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(schema) }}
      />
      <div className="container page-top">
        <nav className="breadcrumb" aria-label="Sayfa yolu">
          <Link href="/">Ana sayfa</Link>
          <span>/</span>
          <Link href="/tarifler">Tarifler</Link>
          <span>/</span>
          <span aria-current="page">{recipe.title}</span>
        </nav>
        <div className="detail-hero">
          <div className="detail-photo">
            <Image
              src={recipe.image}
              alt={recipe.imageAlt}
              fill
              quality={90}
              sizes="(max-width:767px) 90vw, 590px"
            />
          </div>
          <div className="detail-intro">
            <p className="eyebrow">
              {recipe.category} · {recipe.difficulty}
            </p>
            <h1>{recipe.title}</h1>
            <p className="detail-subtitle">{recipe.subtitle}</p>
            <p className="intro">{recipe.heroDescription}</p>
            <div className="recipe-card-tags">
              {recipe.tags.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            <div className="detail-meta">
              {[
                { icon: Users, label: "Porsiyon", value: recipe.servings },
                { icon: Timer, label: "Hazırlık", value: recipe.prepTime },
                { icon: ChefHat, label: "Pişirme", value: recipe.cookTime },
                { icon: Clock3, label: "Toplam", value: recipe.totalTime },
              ].map((m) => (
                <div key={m.label}>
                  <m.icon size={18} />
                  <span>
                    {m.label}
                    <strong>{m.value}</strong>
                  </span>
                </div>
              ))}
            </div>
            <RecipeActions />
          </div>
        </div>
      </div>
      <div className="container detail-body">
        <div className="detail-main">
          <section className="ingredients-section">
            <p className="eyebrow">01 · MUTFAĞA HAZIRLIK</p>
            <h2>Malzemeler</h2>
            <p className="small-note">Tarif miktarı: {recipe.servings}.</p>
            <ul className="ingredients-list">
              {recipe.ingredients.map((ingredient) => (
                <li key={ingredient}>
                  <label>
                    <input type="checkbox" />
                    <span>{ingredient}</span>
                  </label>
                </li>
              ))}
            </ul>
          </section>
          <section className="preparation-section">
            <p className="eyebrow">02 · ADIM ADIM</p>
            <h2>Birlikte hazırlayalım.</h2>
            <ol className="preparation-list">
              {recipe.steps.map((step, i) => (
                <li key={step}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <p>{step}</p>
                </li>
              ))}
            </ol>
          </section>
        </div>
        <aside className="nutrition-aside">
          <div className="nutrition-panel">
            <p className="eyebrow">BİR PORSİYONDA</p>
            <h2>Besin değerleri</h2>
            <dl>
              {nutrients.map((n) => (
                <div key={n.label}>
                  <dt>{n.label}</dt>
                  <dd>
                    ≈ {n.value?.toLocaleString("tr-TR")} <small>{n.unit}</small>
                  </dd>
                </div>
              ))}
            </dl>
            <p>
              {recipe.calculationNote ||
                "Değerler yaklaşık olup ürün, gramaj ve pişirme yöntemine göre değişebilir. Kişisel gereksinimleriniz farklı olabilir."}
            </p>
          </div>
          <div className="nutrition-notes">
            <h3>Tarife yakından bakış</h3>
            <p>
              <strong>Beslenme tipi</strong>
              {recipe.nutritionType}
            </p>
            {recipe.allergens && (
              <p>
                <strong>Alerjenler</strong>
                {recipe.allergens}
              </p>
            )}
            <p className="small-note">
              Ürün etiketlerini ve çapraz temas uyarılarını da kontrol edin.
            </p>
            {recipe.microNutrients.length > 0 && (
              <>
                <h3>Besin öne çıkanları</h3>
                <ul>
                  {recipe.microNutrients.map((n) => (
                    <li key={n.label}>
                      <span>{n.label}</span>
                      {n.value && <span>{n.value}</span>}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </aside>
      </div>
      <div className="container">
        <section className="dietitian-note">
          <p className="eyebrow">DİYETİSYEN NOTU</p>
          <h2>Sofranızda dengeye yer açın.</h2>
          <p>{recipe.dietitianNote}</p>
          {recipe.servingSuggestion && (
            <div>
              <h3>Servis önerisi</h3>
              <p>{recipe.servingSuggestion}</p>
            </div>
          )}
          {recipe.tip && (
            <div>
              <h3>Püf noktası</h3>
              <p>{recipe.tip}</p>
            </div>
          )}
        </section>
      </div>
      <section className="container section-space no-print">
        <div className="section-row">
          <h2 className="font-heading text-3xl">
            Mutfağınız için başka fikirler.
          </h2>
          <Link className="text-link" href="/tarifler">
            Tüm tarifler <ArrowUpRight size={16} />
          </Link>
        </div>
        <div className="recipe-grid">
          {recipes
            .filter((r) => r.slug !== recipe.slug)
            .slice(0, 3)
            .map((r) => (
              <RecipeCard key={r.slug} recipe={r} />
            ))}
        </div>
      </section>
    </article>
  );
}
