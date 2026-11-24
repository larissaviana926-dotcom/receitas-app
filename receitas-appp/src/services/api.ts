import type { Ingredient, RecipeDetail, RecipeSummary } from "../types";

// API pública e gratuita: https://www.themealdb.com/api.php
const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

type RawMeal = Record<string, string | null>;

async function request<T>(path: string): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${BASE_URL}/${path}`);
  } catch {
    throw new Error("Não foi possível conectar à API de receitas.");
  }
  if (!response.ok) {
    throw new Error("A API de receitas retornou um erro.");
  }
  return (await response.json()) as T;
}

// Converte o formato "estranho" da API (strIngredient1..20) para o nosso tipo
function toDetail(raw: RawMeal): RecipeDetail {
  const ingredients: Ingredient[] = [];
  for (let i = 1; i <= 20; i++) {
    const name = raw[`strIngredient${i}`]?.trim();
    const measure = raw[`strMeasure${i}`]?.trim() ?? "";
    if (name) ingredients.push({ name, measure });
  }
  return {
    id: raw.idMeal ?? "",
    name: raw.strMeal ?? "",
    thumbnail: raw.strMealThumb ?? "",
    category: raw.strCategory ?? "",
    area: raw.strArea ?? "",
    instructions: raw.strInstructions ?? "",
    youtube: raw.strYoutube || undefined,
    ingredients,
  };
}

export async function searchRecipes(query: string): Promise<RecipeSummary[]> {
  const data = await request<{ meals: RawMeal[] | null }>(
    `search.php?s=${encodeURIComponent(query)}`
  );
  return (data.meals ?? []).map(toDetail);
}

// Lista inicial: busca as receitas por primeira letra (a-z) e junta tudo
export async function getAllRecipes(): Promise<RecipeSummary[]> {
  const letters = "abcdefghijklmnopqrstuvwxyz".split("");
  const results = await Promise.all(
    letters.map((letter) =>
      request<{ meals: RawMeal[] | null }>(`search.php?f=${letter}`)
    )
  );
  return results.flatMap((data) => (data.meals ?? []).map(toDetail));
}

export async function getRecipesByCategory(
  category: string
): Promise<RecipeSummary[]> {
  const data = await request<{ meals: RawMeal[] | null }>(
    `filter.php?c=${encodeURIComponent(category)}`
  );
  return (data.meals ?? []).map((m) => ({
    id: m.idMeal ?? "",
    name: m.strMeal ?? "",
    thumbnail: m.strMealThumb ?? "",
    category,
  }));
}

export async function getCategories(): Promise<string[]> {
  const data = await request<{ categories: { strCategory: string }[] }>(
    "categories.php"
  );
  return data.categories.map((c) => c.strCategory);
}

export async function getRecipe(id: string): Promise<RecipeDetail | null> {
  const data = await request<{ meals: RawMeal[] | null }>(
    `lookup.php?i=${encodeURIComponent(id)}`
  );
  const first = data.meals?.[0];
  return first ? toDetail(first) : null;
}

export async function getRandomRecipe(): Promise<RecipeDetail | null> {
  const data = await request<{ meals: RawMeal[] | null }>("random.php");
  const first = data.meals?.[0];
  return first ? toDetail(first) : null;
}
