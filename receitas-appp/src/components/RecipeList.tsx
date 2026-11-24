import RecipeCard from "./RecipeCard";
import type { RecipeSummary } from "../types";

interface RecipeListProps {
  recipes: RecipeSummary[];
  emptyMessage?: string;
}

export default function RecipeList({
  recipes,
  emptyMessage = "Nenhuma receita encontrada.",
}: RecipeListProps) {
  if (recipes.length === 0) {
    return <p className="empty">{emptyMessage}</p>;
  }

  return (
    <div className="grid">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}
