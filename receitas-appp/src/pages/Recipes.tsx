import { useMemo, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import {
  getAllRecipes,
  getCategories,
  getRecipesByCategory,
  searchRecipes,
} from "../services/api";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import RecipeList from "../components/RecipeList";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

export default function Recipes() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");

  const { data: categories } = useFetch(getCategories, []);

  const { data, loading, error } = useFetch(() => {
    if (query) return searchRecipes(query);
    if (category) return getRecipesByCategory(category);
    return getAllRecipes();
  }, [query, category]);

  // useMemo: só reordena/filtra quando os dados ou a categoria mudam
  const recipes = useMemo(() => {
    const list = data ?? [];
    const filtered = category
      ? list.filter((r) => !r.category || r.category === category)
      : list;
    return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
  }, [data, category]);

  return (
    <section>
      <h1>Receitas</h1>
      <SearchBar onSearch={setQuery} />
      <CategoryFilter
        categories={categories ?? []}
        selected={category}
        onChange={setCategory}
      />

      {loading && <Loading />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && (
        <>
          <p className="count">{recipes.length} receita(s) encontrada(s)</p>
          <RecipeList recipes={recipes} />
        </>
      )}
    </section>
  );
}
