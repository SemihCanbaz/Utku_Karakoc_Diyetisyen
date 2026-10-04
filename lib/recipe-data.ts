import "server-only";
import { cache } from "react";
import { recipes } from "./recipes";
import { configured, publicDb } from "./supabase/server";
import { rowToRecipe, type RecipeRow } from "./recipe-mapping";
export const recipesFromDatabase = () =>
  process.env.RECIPES_SOURCE === "supabase";
export const getPublicRecipes = cache(async () => {
  if (!recipesFromDatabase()) return recipes;
  if (!configured())
    throw new Error(
      "Supabase tarif kaynağı seçilmiş ancak yapılandırma eksik.",
    );
  const { data, error } = await publicDb()
    .from("recipes")
    .select("*")
    .eq("status", "published")
    .is("deleted_at", null)
    .order("created_at", { ascending: false });
  if (error) throw new Error("Tarifler yüklenemedi.");
  return (data as RecipeRow[]).map(rowToRecipe);
});
export async function getPublicRecipe(slug: string) {
  return (await getPublicRecipes()).find((r) => r.slug === slug);
}
