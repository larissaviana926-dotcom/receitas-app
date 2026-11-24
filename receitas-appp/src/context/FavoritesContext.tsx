import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import type { RecipeSummary } from "../types";

interface FavoritesContextValue {
  favorites: RecipeSummary[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (recipe: RecipeSummary) => void;
}

const FavoritesContext = createContext<FavoritesContextValue | undefined>(
  undefined
);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useLocalStorage<RecipeSummary[]>(
    "receitas-favoritas",
    []
  );

  const isFavorite = useCallback(
    (id: string) => favorites.some((f) => f.id === id),
    [favorites]
  );

  const toggleFavorite = useCallback(
    (recipe: RecipeSummary) => {
      setFavorites((prev) =>
        prev.some((f) => f.id === recipe.id)
          ? prev.filter((f) => f.id !== recipe.id)
          : [
              ...prev,
              {
                id: recipe.id,
                name: recipe.name,
                thumbnail: recipe.thumbnail,
                category: recipe.category,
                area: recipe.area,
              },
            ]
      );
    },
    [setFavorites]
  );

  const value = useMemo(
    () => ({ favorites, isFavorite, toggleFavorite }),
    [favorites, isFavorite, toggleFavorite]
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

// Hook de conveniência para consumir o contexto
export function useFavorites(): FavoritesContextValue {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites deve ser usado dentro de FavoritesProvider");
  }
  return context;
}
