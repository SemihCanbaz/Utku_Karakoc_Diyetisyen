import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock3 } from "lucide-react";
import { getPublicRecipes } from "@/lib/recipe-data";
export const revalidate = 60;
import { RecipeLibrary } from "@/components/recipe/recipe-library";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Tarif Kütüphanesi",
  "Porsiyon, süre, malzeme listesi ve yaklaşık besin değerleriyle günlük sofranıza ilham veren uygulanabilir tarifler.",
  "/tarifler",
);
export default async function Recipes() {
  const recipes = await getPublicRecipes();
  const featured = recipes.find((r) => r.featured) || recipes[0];
  return (
    <>
      <div className="container page-top">
        <p className="eyebrow">MUTFAKTAN İLHAM</p>
        <h1>
          Güzel bir sofra.
          <br />
          <em>Dengeli bir başlangıç.</em>
        </h1>
        <p className="intro">
          İyi beslenmek lezzetten uzaklaşmak değil. Malzemeleri, porsiyonları ve
          hazırlama adımlarıyla günlük hayatınıza uyarlayabileceğiniz tarifleri
          keşfedin.
        </p>
      </div>
      {featured && <section className="container">
        <div className="featured-recipe">
          <div className="featured-photo">
           <Image
  src={featured.image}
  alt={featured.imageAlt}
  fill
  priority
  quality={90}
  sizes="(max-width:767px) 90vw, 650px"
/>
            <span>{featured.tags.includes("Şef Tarifinden Uyarlama") ? "ŞEF TARİFİNDEN UYARLAMA" : "MUTFAKTAN BİR SEÇİM"}</span>
          </div>
          <div className="featured-copy">
            <p className="eyebrow">
              {featured.category} · {featured.nutritionType}
            </p>
            <h2>{featured.title}</h2>
            <p>{featured.heroDescription}</p>
            <div className="featured-meta">
              <span>
                <Clock3 size={15} />
                {featured.totalTime}
              </span>
              <span>{featured.servings}</span>
              {featured.calories != null && <span>≈ {featured.calories} kcal / porsiyon</span>}
            </div>
            <Link className="action" href={"/tarifler/" + featured.slug}>
              Tarifi İncele <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
      </section>}
      <RecipeLibrary recipes={recipes} />
    </>
  );
}
