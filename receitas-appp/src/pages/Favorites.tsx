import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import RecipeList from "../components/RecipeList";

export default function Favorites() {
  const { favorites } = useFavorites();

  return (
    <section>
      <h1>Minhas receitas favoritas</h1>
      {favorites.length === 0 && (
        <p className="empty">
          Você ainda não favoritou nenhuma receita.{" "}
          <Link to="/receitas">Explore as receitas</Link> e clique em
          “Favoritar”.
        </p>
      )}
      {favorites.length > 0 && <RecipeList recipes={favorites} />}
    </section>
  );
}
