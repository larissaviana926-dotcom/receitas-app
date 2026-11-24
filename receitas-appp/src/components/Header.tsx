import { NavLink } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";

export default function Header() {
  const { favorites } = useFavorites();

  return (
    <header className="header">
      <div className="container header__inner">
        <NavLink to="/" className="header__logo">
          🍳 Receitaria
        </NavLink>
        <nav className="header__nav">
          <NavLink to="/" end>
            Início
          </NavLink>
          <NavLink to="/receitas">Receitas</NavLink>
          <NavLink to="/favoritos">Favoritos ({favorites.length})</NavLink>
          <NavLink to="/sobre">Sobre</NavLink>
        </nav>
      </div>
    </header>
  );
}
