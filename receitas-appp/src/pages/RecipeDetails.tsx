import { Link, useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { getRecipe } from "../services/api";
import FavoriteButton from "../components/FavoriteButton";
import IngredientList from "../components/IngredientList";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

export default function RecipeDetails() {
  const { id } = useParams<{ id: string }>();
  const { data: recipe, loading, error } = useFetch(
    () => getRecipe(id ?? ""),
    [id]
  );

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;
  if (!recipe) {
    return (
      <div className="empty">
        <p>Receita não encontrada.</p>
        <Link to="/receitas" className="btn">
          Voltar às receitas
        </Link>
      </div>
    );
  }

  const steps = recipe.instructions
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <article className="details">
      <Link to="/receitas" className="back">
        ← Voltar
      </Link>
      <div className="details__top">
        <img src={recipe.thumbnail} alt={recipe.name} />
        <div>
          <h1>{recipe.name}</h1>
          <p>
            <span className="tag">{recipe.category}</span>{" "}
            <span className="tag">{recipe.area}</span>
          </p>
          <FavoriteButton recipe={recipe} />
          {recipe.youtube && (
            <p>
              <a href={recipe.youtube} target="_blank" rel="noreferrer">
                ▶ Ver vídeo no YouTube
              </a>
            </p>
          )}
        </div>
      </div>

      <h2>Ingredientes</h2>
      <IngredientList ingredients={recipe.ingredients} />

      <h2>Modo de preparo</h2>
      {steps.map((step, index) => (
        <p key={index}>{step}</p>
      ))}
    </article>
  );
}
