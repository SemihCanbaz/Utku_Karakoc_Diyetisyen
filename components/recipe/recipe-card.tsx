import Image from "next/image";
import Link from "next/link";
import { Clock3, Flame, Utensils } from "lucide-react";
import type { Recipe } from "@/lib/recipes";
export function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Link href={"/tarifler/" + recipe.slug} className="recipe-card">
      <div className="recipe-card-image">
        <Image
          src={recipe.image}
          alt={recipe.imageAlt}
          fill
          quality={85}
          sizes="(max-width:767px) 90vw, (max-width:1099px) 45vw, 380px"
        />
        <span className="recipe-card-category">{recipe.category}</span>
      </div>
      <div className="recipe-card-content">
        <h3>{recipe.title}</h3>
        <p>{recipe.shortDescription}</p>
        <div className="recipe-card-tags">
          {recipe.tags.slice(0, 2).map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <div className="recipe-card-meta">
          {recipe.calories != null && (
            <span>
              <Flame />≈ {recipe.calories} kcal
            </span>
          )}
          {recipe.protein != null && <span>{recipe.protein} g protein</span>}
          <span>
            <Clock3 />
            {recipe.totalTime}
          </span>
          <span>
            <Utensils />
            {recipe.servings}
          </span>
        </div>
      </div>
    </Link>
  );
}
