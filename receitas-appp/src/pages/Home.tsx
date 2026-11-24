import { useState } from "react";
import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { getRandomRecipe } from "../services/api";
import RecipeCard from "../components/RecipeCard";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

export default function Home() {
  // Mudar `attempt` força o useFetch a buscar outra receita aleatória
  const [attempt, setAttempt] = useState(0);
  const { data, loading, error } = useFetch(getRandomRecipe, [attempt]);

  return (
    <>
      <section className="hero">
        <h1>Descubra sua próxima receita favorita</h1>
        <p>
          Pesquise centenas de receitas de todo o mundo, veja os ingredientes e
          salve as que você mais gostou.
        </p>
        <Link to="/receitas" className="btn">
          Explorar receitas
        </Link>
      </section>

      <section>
        <h2>Sugestão do momento</h2>
        {loading && <Loading />}
        {error && <ErrorMessage message={error} />}
        {data && (
          <div className="featured">
            <RecipeCard recipe={data} />
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() => setAttempt((n) => n + 1)}
            >
              🎲 Outra sugestão
            </button>
          </div>
        )}
      </section>
    </>
  );
}
