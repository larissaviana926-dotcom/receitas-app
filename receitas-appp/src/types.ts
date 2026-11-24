// Dados resumidos de uma receita (usados em listas e favoritos)
export interface RecipeSummary {
  id: string;
  name: string;
  thumbnail: string;
  category?: string;
  area?: string;
}

export interface Ingredient {
  name: string;
  measure: string;
}

// Dados completos de uma receita (página de detalhes)
export interface RecipeDetail extends RecipeSummary {
  category: string;
  area: string;
  instructions: string;
  ingredients: Ingredient[];
  youtube?: string;
}
