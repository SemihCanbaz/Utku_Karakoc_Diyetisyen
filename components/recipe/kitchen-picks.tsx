import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Coffee, Clock3 } from "lucide-react";
import type { Recipe } from "@/lib/recipes";
export function KitchenPicks({ recipes }: { recipes: Recipe[] }) {
  const picks = recipes
    .filter((r) => r.category === "Ara Öğün" || r.category === "Kahvaltı")
    .slice(0, 3);
  if (!picks.length) return null;
  return (
    <section
      className="container kitchen-picks"
      aria-labelledby="kitchen-picks-title"
    >
      <div className="kitchen-picks-intro">
        <span className="kitchen-icon">
          <Coffee size={27} aria-hidden="true" />
        </span>
        <p className="eyebrow">GÜNÜN KÜÇÜK MOLALARI</p>
        <h2 id="kitchen-picks-title">
          Biraz renk.
          <br />
          <em>Biraz lezzet.</em>
        </h2>
        <p>
          Kahvaltıdan ara öğüne, mutfağınızda deneyebileceğiniz küçük fikirler.
        </p>
        <Link href="/tarifler" className="text-link">
          Mutfağı keşfet <ArrowUpRight size={17} />
        </Link>
      </div>
      <div className="kitchen-picks-list">
        {picks.map((recipe) => (
          <Link
            className="kitchen-pick"
            href={"/tarifler/" + recipe.slug}
            key={recipe.slug}
          >
            <div className="kitchen-pick-image">
              <Image
                src={recipe.image}
                alt={recipe.imageAlt}
                fill
                sizes="(max-width: 700px) 96px, 130px"
                quality={85}
              />
            </div>
            <div>
              <small>{recipe.category}</small>
              <h3>{recipe.title}</h3>
              <span>
                <Clock3 size={14} aria-hidden="true" /> {recipe.totalTime}
              </span>
            </div>
            <ArrowUpRight size={20} aria-hidden="true" />
          </Link>
        ))}
      </div>
    </section>
  );
}
