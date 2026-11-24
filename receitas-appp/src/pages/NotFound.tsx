import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="empty">
      <h1>404</h1>
      <p>Página não encontrada.</p>
      <Link to="/" className="btn">
        Voltar ao início
      </Link>
    </div>
  );
}
