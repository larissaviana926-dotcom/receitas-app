import { useFavorites } from "../context/FavoritesContext";
import type { RecipeSummary } from "../types";

interface FavoriteButtonProps {
  recipe: RecipeSummary;
}

export default function FavoriteButton({ recipe }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(recipe.id);

  return (
    <button
      type="button"
      className={`fav ${active ? "fav--active" : ""}`}
      onClick={() => toggleFavorite(recipe)}
      aria-pressed={active}
      title={active ? "Remover dos favoritos" : "Adicionar aos favoritos"}
    >
      {active ? "♥ Favoritada" : "♡ Favoritar"}
    </button>
  );
}
