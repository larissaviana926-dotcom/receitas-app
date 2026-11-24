import { Link } from "react-router-dom";
import FavoriteButton from "./FavoriteButton";
import type { RecipeSummary } from "../types";

interface RecipeCardProps {
  recipe: RecipeSummary;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <article className="card">
      <Link to={`/receitas/${recipe.id}`}>
        <img src={recipe.thumbnail} alt={recipe.name} loading="lazy" />
      </Link>
      <div className="card__body">
        <h3>{recipe.name}</h3>
        {recipe.category && <span className="tag">{recipe.category}</span>}
        <div className="card__actions">
          <Link to={`/receitas/${recipe.id}`} className="btn btn--small">
            Ver receita
          </Link>
          <FavoriteButton recipe={recipe} />
        </div>
      </div>
    </article>
  );
}
