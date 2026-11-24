import { useEffect, useRef, useState, type FormEvent } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [text, setText] = useState("");
  // useRef: guarda a referência do input para controlar o foco
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSearch(text.trim());
  }

  function handleClear() {
    setText("");
    onSearch("");
    inputRef.current?.focus();
  }

  return (
    <form className="searchbar" onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Buscar receita (ex: chicken, pasta, cake)..."
        aria-label="Buscar receita"
      />
      <button type="submit" className="btn">
        Buscar
      </button>
      <button type="button" className="btn btn--ghost" onClick={handleClear}>
        Limpar
      </button>
    </form>
  );
}
