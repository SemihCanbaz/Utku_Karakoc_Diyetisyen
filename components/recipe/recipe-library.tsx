"use client";
import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { RecipeCard } from "./recipe-card";
import { AnimatedSection } from "@/components/shared/animated-section";
import { recipes, recipeCategories } from "@/lib/recipes";
export function RecipeLibrary() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Tümü");
  const matches = useMemo(() => {
    const term = query.trim().toLocaleLowerCase("tr-TR");
    return recipes.filter(
      (r) =>
        (category === "Tümü" || r.category === category) &&
        [r.title, r.subtitle, r.shortDescription, ...r.tags, ...r.ingredients]
          .join(" ")
          .toLocaleLowerCase("tr-TR")
          .includes(term),
    );
  }, [query, category]);
  return (
    <div className="container recipe-library" id="tarif-listesi">
      <div className="library-toolbar">
        <div className="library-search">
          <Search size={18} />
          <label className="sr-only" htmlFor="recipe-search">
            Tarif veya malzeme ara
          </label>
          <input
            id="recipe-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tarif veya malzeme ara…"
            type="search"
          />
          {query && (
            <button onClick={() => setQuery("")} aria-label="Aramayı temizle">
              <X size={16} />
            </button>
          )}
        </div>
        <div
          className="category-filter"
          role="group"
          aria-label="Tarif kategorileri"
        >
          {recipeCategories.map((c) => (
            <button
              key={c}
              aria-pressed={c === category}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
      <div className="library-summary">
        <h2>Tarifleri keşfedin</h2>
        <p role="status" aria-live="polite">
          {matches.length} tarif{category !== "Tümü" ? " · " + category : ""}
        </p>
      </div>
      <div className="recipe-grid">
        {matches.map((r, i) => (
          <AnimatedSection key={r.slug} delay={i * 0.04}>
            <RecipeCard recipe={r} />
          </AnimatedSection>
        ))}
      </div>
      {!matches.length && (
        <div className="empty-state">
          <Search />
          <h3>Bu aramada henüz bir tarif yok.</h3>
          <p>Farklı bir malzeme deneyin veya tüm tariflere göz atın.</p>
          <button
            className="action action-outline"
            onClick={() => {
              setQuery("");
              setCategory("Tümü");
            }}
          >
            Filtreleri temizle
          </button>
        </div>
      )}
      <p className="recipe-disclaimer">
        Besin değerleri bir porsiyon için yaklaşık değerlerdir. Kullanılan ürün,
        miktar ve pişirme yöntemiyle değişebilir.
      </p>
    </div>
  );
}
